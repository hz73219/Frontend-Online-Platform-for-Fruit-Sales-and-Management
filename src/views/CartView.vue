<template>
    <div>
        <div class="background" :style="{ backgroundImage: 'url(' + images + ')' }">
            <h2 class="text-center" style="padding-top: 50px;font-size: 30px;color: white;">Shopping Cart</h2>
        </div>
        <v-table v-if="getListData.length > 0">
            <thead>
                <tr>
                    <th class="text-center"> Sản phẩm</th>
                    <th class="text-left">Số lượng (Kg)</th>
                    <th class="text-left">Đơn giá</th>
                    <th class="text-left">Thành tiền</th>
                    <th class="text-left">Action</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="item in getListData" :key="item.name">
                    <td>
                        <v-row>
                            <v-col cols="7"> <v-img max-height="200px"
                                    :src="linkServer + item.product.images[0].path"></v-img></v-col>
                            <v-col cols="5">
                                <p style="margin-top: 90px;">{{ item.product.name }}</p>
                            </v-col>
                        </v-row>
                    </td>
                    <td>
                        <v-text-field style="width: 100px;" density="compact" v-model="item.quantity" type="number"
                            variant="outlined"></v-text-field>
                    </td>
                    <td>{{ item.product.price.toLocaleString('vi-VN') }} VNĐ</td>
                    <td> {{ (item.quantity * item.product.price).toLocaleString('vi-VN') }} VNĐ</td>
                    <td>
                        <v-btn color="red" small @click="Delete(item)">Xoá</v-btn>
                    </td>
                </tr>
            </tbody>
        </v-table>
        <v-row v-if="getListData.length > 0">
            <v-col cols="4"></v-col>
            <v-col cols="2">
                <h3 class="mb-3">Voucher Code</h3>
                <v-text-field v-model="voucherCode" density="compact" placeholder="Voucher" type="text" variant="outlined"
                    clearable></v-text-field>
                <v-btn color="#333" small @click="CheckVoucher()">Xác nhận</v-btn>

            </v-col>
            <v-col cols="6">
                <h3 class="mb-4">Thông tin đặt hàng</h3>
                <v-row>
                    <v-col cols="3">
                        <h3>Tổng tiền</h3>
                    </v-col>
                    <v-col cols="8">
                        <h3 style="float: right; color: blue">{{ tongTien().toLocaleString('vi-VN') }} VNĐ</h3>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="3">
                        <h3>Giảm giá</h3>
                    </v-col>
                    <v-col cols="8">
                        <h3 style="float: right; color: red">{{ giamGia() }} %</h3>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="3">
                        <h3>Thành tiền</h3>
                    </v-col>
                    <v-col cols="8">
                        <h3 style="float: right; color: blue;">{{ thanhTien().toLocaleString('vi-VN') }} VNĐ </h3>
                    </v-col>
                </v-row>
                <v-row style="margin-bottom: -30px;">
                    <v-col cols="3">
                        <h3>Tên người nhận</h3>
                    </v-col>
                    <v-col cols="8">
                        <v-text-field style="float: right; width: 500px;" v-model="this.order.fullName" density="compact"
                            placeholder="Tên người nhận" type="text" variant="outlined" clearable></v-text-field>
                    </v-col>
                </v-row>
                <v-row style="margin-bottom: -30px;">
                    <v-col cols="3">
                        <h3>Địa chỉ</h3>
                    </v-col>
                    <v-col cols="8">
                        <v-text-field style="float: right; width: 500px;" v-model="this.order.address" density="compact"
                            placeholder="Địa chỉ" type="text" variant="outlined" clearable></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="3">
                        <h3>Số điện thoại</h3>
                    </v-col>
                    <v-col cols="8">
                        <v-text-field style="float: right; width: 500px;" v-model="this.order.phoneNumber" density="compact"
                            placeholder="Số điện thoaị" type="text" variant="outlined" clearable></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="3">
                    </v-col>
                    <v-col cols="8">
                        <v-btn style="float: right;" color="red" small @click="Order()">Đặt hàng</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <h2 style="margin-left: 35%;" v-if="getListData.length <= 0">Chưa có sản phẩm nào trong giỏ hàng!</h2>
        <NotiDialog :content="this.dialogContent" ref="dialogNotiRef"></NotiDialog>

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
import NotiDialog from '@/components/Dialog/NotiDialog.vue';
export default {
    components: {
        NotiDialog: NotiDialog
    },
    data() {
        return {
            couponCode: "",
            linkServer: "https://localhost:7202",
            totalPrice: 0,
            dialogContent: "",
            images: require('../image/breadcrumb.jpg'),
            voucher: "",
            voucherCode: "",
            idUser: "",
            order: {
                id: "",
                totalPrice: 0,
                priceDiscount: 0,
                listOrderDetail: [],
                idVoucher: "",
                fullName: "",
                address: "",
                phoneNumber: ""
            },
            listCart: [],
        };
    },
    async created() {
        await this.fetchListData();
        this.fetchData();
    },
    computed: {
        ...mapGetters('cartModules', ['getListData']),
    },
    methods: {
        ...mapActions('cartModules', ['createObj', 'fetchListData', 'updateObj', 'deleteObj']),
        ...mapActions('orderModules', { createOrder: 'createObj' }),

        async Order() {
            console.log(this.getListData);
            this.order.listOrderDetail = [];
            this.order.listOrderDetail = this.getListData.map(item => ({
                idProduct: item.product.id,
                quantity: item.quantity,
                price: item.product.price
            }));
            this.order.totalPrice = this.tongTien();
            this.order.priceDiscount = this.thanhTien();
            console.log("orderrrrrrrrrr");
            console.log(this.order);
            var resut = await this.createOrder(this.order);
            console.log(resut);
            if (resut == true) {
                this.getListData.forEach(element => {
                    this.deleteObj(element);
                });
                this.dialogContent = "Đặt hàng thành công!";
                this.$refs.dialogNotiRef.openDialog();

            }
            else {
                this.dialogContent = "Đặt hàng thất bại!";
                this.$refs.dialogNotiRef.openDialog();
            }


        },
        tongTien() {
            return this.getListData.reduce((total, item) => {
                return total + item.quantity * item.product.price;
            }, 0);
        },
        giamGia() {
            if (this.voucher == "") {
                return 0;
            }
            else {
                return this.voucher.discount;
            }
        },
        thanhTien() {
            return this.tongTien() - ((this.tongTien() * this.giamGia()) / 100);

        },
        async Delete(item) {
            const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa không?");
            if (isConfirmed) {
                var result = await this.deleteObj(item);
                console.log(result);
                if (result == true) {
                    this.dialogContent = "Xoá thành thành công!";
                    this.$refs.dialogNotiRef.openDialog();
                }
                else {
                    this.dialogContent = "Xoá thất bại!";
                    this.$refs.dialogNotiRef.openDialog();
                }
            }
        },
        async CheckVoucher() {
            axios
                .get('https://localhost:7202/api/Voucher/Get/' + this.voucherCode)
                .then(response => {
                    console.log(response.data)
                    this.voucher = response.data;
                    this.order.idVoucher = response.data.id;
                })
                .catch(error => {
                    console.error('Error fetching:', error);
                    this.order.idVoucher = "";
                    alert("Voicher bạn chưa đúng!")
                });
        },
        async fetchData() {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1") || '';
            if (token != "") {
                const config = {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Authorization': `Bearer ${token}`
                    }
                };
                axios
                    .get('https://localhost:7202/api/User/Get', config)
                    .then(response => {
                        console.log(response.data)
                        //this.listCart = response.data.listCart;
                        this.order.address = response.data.address;
                        this.order.phoneNumber = response.data.phone;
                        this.order.fullName = response.data.fullName;

                    })
                    .catch(error => {
                        console.error('Error fetching:', error);
                    });
            }
            else {
                console.error('Token not found.');
                return "NoToken";
            }
        }
    },
};
</script>

<style scoped>
.background {
    width: 100%;
    height: 200px;
}
</style>