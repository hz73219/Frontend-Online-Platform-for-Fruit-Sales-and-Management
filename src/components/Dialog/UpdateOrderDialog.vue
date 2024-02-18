<template>
    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">Chỉnh sửa</span>
            </v-card-title>
            <v-card-text>
                <v-form @submit.prevent ref="formRef">
                    <div>
                        <div class="text-subtitle-1 text-medium-emphasis">Loại</div>
                        <v-select :items="ListDataStatus" v-model="this.order.status" density="compact" variant="outlined" item-title="name" item-value="value"
                            clearable></v-select>
                    </div>

                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDialog">
                    CLOSE
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="updateOrder">
                    SAVE
                </v-btn>
            </v-card-actions>
        </v-card>
        <NotiDialog :content="dialogContent" ref="dialogNotiRef"></NotiDialog>
    </v-dialog>
</template>
  
<script>
import { mapActions } from 'vuex';
import NotiDialog from '../../components/Dialog/NotiDialog.vue'
export default {
    components:
    {
        NotiDialog
    },
    data() {
        return {
            dialog: false,
            listDeleteImage: [],
            linkServer: "https://localhost:7202/",
            dialogContent: "",
            order: {
                id: "",         
                status: 0,
            },
            ListDataStatus: [
                { value: 1, name: "Khởi tạo" },
                { value: 2, name: "Chuẩn bị hàng" },
                { value: 3, name: "Đang giao" },
                { value: 4, name: "Giao thành công" },
                { value: 5, name: "Đã huỷ" }, 
            ],
        };
    },
    methods: {
        openDialog() {
            this.dialog = true;
        },
        closeDialog() {

            this.dialog = false;

        },
        async updateOrder() {
            console.log(this.order)
            var result = await this.updateStatus(this.order);
            if (result == true) {
                this.dialogContent = "Cập nhật thành công!";
                this.$refs.dialogNotiRef.openDialog();
            }
            else {
                this.dialogContent = "Cập nhật thất bại!";
                this.$refs.dialogNotiRef.openDialog();
            }
        },
        setData(item) {
            this.order.id = item.id;
            this.order.status = item.status;
        },
        ...mapActions('orderModules', ['updateStatus']),
    }
};
</script>
  