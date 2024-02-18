<template>
    <div>
        <div style="margin: 30px;">
            <v-data-table :headers="headers" :items-per-page="10" :items="getListData" item-value="id" class="elevation-10">
                <template v-slot:item="{ item }">
                    <tr>
                        <td class="border-right border-bot" style="width: 50px;">{{ getIndex(item) }}</td>
                        <td class="border-right border-bot">{{ item.userName }}</td>
                        <td class="border-right border-bot">{{ item.fullName }}</td>
                        <td class="border-right border-bot" style="width: 250px;">
                            <v-btn v-if="item.role=='user'" color="yellow" small class="mr-4" @click="NangCap(item)">Nâng cấp tài khoản</v-btn>
                            <v-btn v-if="item.role!='user'" color="red" small class="mr-4" @click="HaCap(item)">Hạ cấp tài khoản</v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </div>
        <NotiDialog :content="this.dialogContent" ref="dialogNotiRef"></NotiDialog>
    </div>
</template>
  
<script>
import { VDataTable } from 'vuetify/labs/VDataTable';
import { mapActions, mapGetters } from 'vuex';
import NotiDialog from '../../components/Dialog/NotiDialog.vue'
export default {
    components: {
        VDataTable,
        NotiDialog
    },
    computed: {
        ...mapGetters('userModules', ['getListData']),
    },
    created() {
        this.fetchListData();
    },
    data() {
        return {
            isDialogOpen: false,
            dialogContent: "",
            headers: [
                { title: 'STT', key: 'id' },
                { title: 'Username', key: 'userName' },
                { title: 'Fullname', key: 'FullName' },
                { title: 'Action', key: '', sortable: false, },
            ],
        };
    },
    methods: {
        async NangCap(item)
        {
            item.role = 'admin';
            console.log(item)
            var result = await this.updateUser(item);
            if(result)
            {
                this.dialogContent = "Cập nhật thành thành công!";
                this.$refs.dialogNotiRef.openDialog();
            }
            else
            {
                this.dialogContent = "Cập nhật thất bại!";
                this.$refs.dialogNotiRef.openDialog();
            }

        },
        async HaCap(item)
        {
            item.role = 'user';
            console.log(item)
            var result = await this.updateUser(item);
            if(result)
            {
                this.dialogContent = "Cập nhật thành thành công!";
                this.$refs.dialogNotiRef.openDialog();
            }
            else
            {
                this.dialogContent = "Cập nhật thất bại!";
                this.$refs.dialogNotiRef.openDialog();
            }

        },
        getIndex(item) {
            return this.getListData.indexOf(item) + 1;
        },
        ...mapActions('userModules', [ 'fetchListData','updateUser']),
    }
};
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
  