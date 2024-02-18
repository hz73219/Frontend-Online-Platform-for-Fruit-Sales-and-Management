<template>
    <v-row>
        <v-col cols="1"></v-col>
        <v-col cols="4">
            <h2>Thông tin cá nhân </h2>
            <div class="text-subtitle-1 text-medium-emphasis">Tên người dùng</div>
            <v-text-field :disabled="!this.edit" :rules="userRule.fullName" v-model="userObj.fullName" density="compact"
                placeholder="Tên người dùng" prepend-inner-icon="mdi-account" variant="outlined" clearable></v-text-field>
            <div class="text-subtitle-1 text-medium-emphasis">Email</div>
            <v-text-field :disabled="!this.edit" :rules="userRule.email" v-model="userObj.email" density="compact"
                placeholder="Email" prepend-inner-icon="mdi-email" variant="outlined" clearable></v-text-field>
            <div class="text-subtitle-1 text-medium-emphasis">Số điện thoại</div>
            <v-text-field :disabled="!this.edit" :rules="userRule.phone" v-model="userObj.phone" density="compact"
                placeholder="Số điện thoại" prepend-inner-icon="mdi-phone" variant="outlined" clearable></v-text-field>
            <div class="text-subtitle-1 text-medium-emphasis">Địa chỉ</div>
            <v-text-field :disabled="!this.edit" :rules="userRule.address" v-model="userObj.address" density="compact"
                placeholder="Địa chỉ" prepend-inner-icon="mdi-map" variant="outlined" clearable></v-text-field>
            <v-row>
                <v-col cols="5">
                    <v-btn block color="blue" size="large" variant="tonal" type="submit" @click="this.edit = !this.edit">
                        Sửa thông tin
                    </v-btn>
                </v-col>
                <v-col cols="2"></v-col>

                <v-col cols="5">
                    <v-btn v-show="this.edit" block color="blue" size="large" variant="tonal" type="submit"
                        @click="editUser">
                        Xác nhận
                    </v-btn>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="7">
            <h2>Thông tin đặt hàng</h2>
            <div style="margin: 30px;">
            <h3  v-if="!userObj.listOrder" >Chưa có thông tin đặt hàng nào!</h3>
            <v-data-table  v-if="userObj.listOrder" :headers="headers" :items-per-page="10" :items="userObj.listOrder" item-value="id" class="elevation-10">
                <template v-slot:item="{ item }">
                    <tr>
                        <td class="border-right border-bot" style="width: 50px;">
                            <p class="text-center">{{ getIndex(item) }}</p>
                        </td>
                        <td class="border-right border-bot" style="width: 200px;">{{ item.totalPrice.toLocaleString('vi-VN')
                        }} VNĐ</td>
                        <td class="border-right border-bot" style="width:200px ;">{{
                            item.priceDiscount.toLocaleString('vi-VN') }} VNĐ</td>
                        <td class="border-right border-bot">{{ item.fullName }} </td>
                        <td class="border-right border-bot">{{ item.address }}</td>
                        <td class="border-right border-bot">{{ item.phoneNumber }}</td>
                        <td class="border-right border-bot" style="width: 150px;">{{ convertStatus(item.status) }}</td>
                        <td class="border-right border-bot" style="width: 250px;">
                            <v-btn color="blue" small @click="Detail(item.listOrderDetail)">Detail</v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
            <OrderDetail :orderObj="this.selectedItem" ref="dialogOrderRef"></OrderDetail>
        </div>
        </v-col>
        <NotiDialog :content="this.dialogContent" ref="dialogRef"></NotiDialog>
    </v-row>
</template>
<script>
import  axios  from 'axios';
import { VDataTable } from 'vuetify/labs/VDataTable';
import OrderDetail from '../components/Dialog/DetailOrderDialog.vue'
import NotiDialog from '../components/Dialog/NotiDialog.vue'
export default {
    components: {
        NotiDialog,
        OrderDetail,
        
        VDataTable
    },
    data() {
        return {
            headers: [
                { title: 'STT', key: 'id' },
                { title: 'Tổng tiền', key: 'totalPrice' },
                { title: 'Giá thanh toán', key: 'priceDiscount' },
                { title: 'Người nhận', key: 'fullName' },
                { title: 'Địa chỉ', key: 'address' },
                { title: 'Số điện thoại', key: 'phoneNumber' },
                { title: 'Trạng thái', key: 'status' },
                { title: 'Action', key: '', sortable: false, },
            ],
            selectedItem: null,
            visible: false,
            edit: false,
            dialogContent: "",
            userObj: {
                fullName: '',
                email: '',
                phone: '',
                address: '',
            },
            userRule: {
                fullName: [
                    value => {
                        if (value?.length > 5) { return true; }
                        return 'Vui lòng nhập tên người dùng!'
                    },
                ],
                email: [
                    value => {
                        if (value?.length > 5) { return true; }
                        return 'Vui lòng nhập email!'
                    },
                ],
                phone: [
                    value => {
                        if (value?.length > 5) { return true; }
                        return 'Vui lòng nhập số điện thoại'
                    },
                ],
                address: [
                    value => {
                        if (value?.length > 5) { return true; }
                        return 'Vui lòng nhập địa chỉ'
                    },
                ],
            },
        };
    },
    async created()
    {
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
                        this.userObj= response.data;
                    })
                    .catch(error => {
                        console.error('Error fetching:', error);
                    });
            }
    },
    methods: {
        async Detail(item) {
            this.selectedItem = item;
            console.log(item)
            this.$refs.dialogOrderRef.openDialog();
        },
        getIndex(item) {
            return this.userObj.listOrder.indexOf(item) + 1;
        },
        convertStatus(status) {
            switch (status) {
                case 1:
                    return 'Khởi tạo';
                case 2:
                    return 'Chuẩn bị hàng';
                case 3:
                    return 'Đang giao';
                case 4:
                    return 'Giao thành công';
                default:
                    return 'Đã huỷ';
            }
        },
        editUser() {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1") || '';
            if (token != "") {
                const config = {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Authorization': `Bearer ${token}`
                    }
                };
                 axios
                    .put('https://localhost:7202/api/User/Update',this.userObj, config)
                    .then(response => {
                        console.log(response);
                        this.dialogContent = "Cập nhật thành công!";
                        this.$refs.dialogRef.openDialog();
                        this.edit = false;
                    })
                    .catch(error => {
                        this.dialogContent = "Cập nhật thất bại!";
                         this.$refs.dialogRef.openDialog();
                        console.error('Error fetching:', error);
                    });
            }
        },
    }

}
</script>

<style></style>