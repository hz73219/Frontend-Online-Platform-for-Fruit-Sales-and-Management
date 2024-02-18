<template>
    <div class="mt-4">
        <div style="margin: 30px;">
            <v-data-table :headers="headers" :items-per-page="10" :items="getListData" item-value="id" class="elevation-10">
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
                            <v-btn v-if="item.status!=4" color="yellow" small class="mr-4" @click="Update(item)">Update</v-btn>
                            <v-btn color="blue" small @click="Detail(item.listOrderDetail)">Detail</v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
            <OrderDetail :orderObj="this.selectedItem" ref="dialogOrderRef"></OrderDetail>
            <OrderUpdate :orderObj="this.selectedItem" ref="dialogOrderUpdateRef"></OrderUpdate>

        </div>
    </div>
</template>
  
<script>
import { VDataTable } from 'vuetify/labs/VDataTable';
import OrderDetail from '../../components/Dialog/DetailOrderDialog.vue'
import OrderUpdate from '../../components/Dialog/UpdateOrderDialog.vue'

import { mapActions, mapGetters } from 'vuex';

export default {
    components:
    {
        VDataTable,
        OrderUpdate,
        OrderDetail
    },
    computed: {
        ...mapGetters('orderModules', ['getListData']),
    },
    created() {
        this.fetchListData();
    }
    ,
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
            linkServer: "https://localhost:7202",
            dataDialog: {},
            dialogContent: "",
            selectedItem: null,
        };
    },
    methods: {
        getIndex(item) {
            return this.getListData.indexOf(item) + 1;
        },
        async Detail(item) {
            this.selectedItem = item;
            console.log(item)
            this.$refs.dialogOrderRef.openDialog();
        },
        async Update(item) {
            this.$refs.dialogOrderUpdateRef.setData(item);
            this.$refs.dialogOrderUpdateRef.openDialog();
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
        ...mapActions('orderModules', ['createObj', 'fetchListData', 'updateObj', 'deleteObj']),

    }
}
</script>
  
<style scoped>
.border-right {
    border-right: 1px solid #ccc;
    /* Màu của đường gạch dọc */
}

.border-bot {
    border-bottom: 1px solid #ccc;
    /* Màu của đường gạch dọc */
}
</style>
    