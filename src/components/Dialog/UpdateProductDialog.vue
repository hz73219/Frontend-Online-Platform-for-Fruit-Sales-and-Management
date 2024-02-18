<template>
    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">Chỉnh sửa</span>
            </v-card-title>
            <v-card-text>
                <v-form @submit.prevent ref="formRef">
                    <div>
                        <div class="text-subtitle-1 text-medium-emphasis">Tên sản phẩm</div>
                        <v-text-field v-model="model.name" density="compact" placeholder="Tên sản phẩm" variant="outlined"
                            clearable></v-text-field>
                    </div>
                    <div>
                        <div class="text-subtitle-1 text-medium-emphasis">Giá</div>
                        <v-text-field v-model="model.price" density="compact" placeholder="Giá" type="number"
                            variant="outlined" clearable></v-text-field>
                    </div>
                    <div>
                        <div class="text-subtitle-1 text-medium-emphasis">Số lượng</div>
                        <v-text-field v-model="model.quantity" density="compact" placeholder="Số lượng" type="number"
                            variant="outlined" clearable></v-text-field>
                    </div>
                    <div>
                        <div class="text-subtitle-1 text-medium-emphasis">Ghi chú</div>
                        <v-text-field v-model="model.note" density="compact" placeholder="Ghi chú" type="text"
                            variant="outlined" clearable></v-text-field>
                    </div>
                    <div>
                        <div class="text-subtitle-1 text-medium-emphasis">Chi tiết</div>
                        <v-text-field v-model="model.detail" density="compact" placeholder="model.detail" type="text"
                            variant="outlined" clearable></v-text-field>
                    </div>
                    <div>
                        <div class="text-subtitle-1 text-medium-emphasis">Nơi xuất xứ</div>
                        <v-select :items="originListData" v-model="model.idOrigin" item-title="name" item-value="id"
                            density="compact" variant="outlined" clearable></v-select>
                    </div>
                    <div>
                        <div class="text-subtitle-1 text-medium-emphasis">Loại</div>
                        <v-select :items="categoryListData" v-model="model.idCategory" item-title="name" item-value="id"
                            density="compact" variant="outlined" clearable></v-select>
                    </div>
                    <div>
                        <div class="text-subtitle-1 text-medium-emphasis">Ảnh sản phẩm</div>
                        <v-file-input ref="fileInput" variant="outlined" clearable density="compact" chips multiple
                            label="Chọn ảnh sản phẩm"></v-file-input>
                    </div>
                    <v-row class="ml-2 mt-2" v-for="item in model.images" :key="item.id" v-show="!item.hideRow">
                        <v-row>
                            <v-col cols="8">
                                <v-img :src="linkServer + item.path" cover></v-img>
                            </v-col>
                            <v-col cols="4">
                                <v-btn class="ml-10" color="red" @click="DeleteImageProduct(item)">Xoá</v-btn>
                            </v-col>
                        </v-row>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDialog">
                    CLOSE
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="updateProduct">
                    SAVE
                </v-btn>
            </v-card-actions>
        </v-card>
        <NotiDialog :content="dialogContent" ref="dialogNotiRef"></NotiDialog>
    </v-dialog>
</template>
  
<script>
import { mapGetters, mapActions } from 'vuex';
import NotiDialog from '../../components/Dialog/NotiDialog.vue'
export default {
    components:
    {
        NotiDialog
    },
    data() {
        return {
            dialog: false,
            model: {
                id: "",
                name: "",
                idImage: "",
                price: 0,
                quantity: 0,
                note: "",
                detail: "",
                idCategory: "",
                idOrigin: "",
                images: []
            },
            listDeleteImage: [],
            linkServer: "https://localhost:7202/",
            dialogContent: "",
        };
    },

    computed: {
        ...mapGetters('originModules', {
            originListData: 'getListData',
        }),
        ...mapGetters('categoryModules', {
            categoryListData: 'getListData',
        }),
    },
    methods: {
        openDialog() {
            this.dialog = true;
        },
        closeDialog() {
            this.listDeleteImage = []
            this.model.images.forEach(element => {
                element.hideRow = false;
            });
            this.dialog = false;

        },
        setData(item) {
            this.model = { ...item }
            this.model.images.forEach(element => {
                element.hideRow = false;
            });
            this.listDeleteImage = []
        },
        async updateProduct() {
            console.log(this.model);
            const formData = new FormData();
            formData.append('id', this.model.id);
            formData.append('idImage', this.model.idImage);
            formData.append('name', this.model.name);
            formData.append('price', this.model.price);
            formData.append('quantity', this.model.quantity);
            formData.append('note', this.model.note);
            formData.append('detail', this.model.detail);
            formData.append('idCategory', this.model.idCategory);
            formData.append('idOrigin', this.model.idOrigin);
            const files = this.$refs.fileInput.files;
            for (let i = 0; i < files.length; i++) {
                formData.append('listFile', files[i]);
            }
            for (let i = 0; i < this.listDeleteImage.length; i++) {
                console.log("update"+this.listDeleteImage[i].id)
                formData.append(`imagesUpdate[${i}].id`, this.listDeleteImage[i].id);
                formData.append(`imagesUpdate[${i}].path`, this.listDeleteImage[i].path);
                formData.append(`imagesUpdate[${i}].parent`, this.listDeleteImage[i].parent);
                formData.append(`imagesUpdate[${i}].name_Old`, this.listDeleteImage[i].name_Old);


            }
            console.log("capnhat filexoa");
            console.log(this.listDeleteImage)
            var result = await this.updateObj(formData);
            if (result == true) {
                this.dialogContent = "Cập nhật thành công!";
                this.$refs.dialogNotiRef.openDialog();
            }
            else {
                this.dialogContent = "Cập nhật thất bại!";
                this.$refs.dialogNotiRef.openDialog();
            }
        },
        DeleteImageProduct(item) {
            if (item && item.id) {
                this.listDeleteImage.push({ ...item });
                console.log("12");
                console.log(this.listDeleteImage);
                const index = this.model.images.findIndex((image) => image.id === item.id);
                if (index !== -1) {
                    this.model.images[index] = { ...item, hideRow: true };
                }

            }
        },
        ...mapActions('productModules', ['createObj', 'fetchListData', 'updateObj', 'deleteObj']),
        ...mapActions('originModules', { fetchOriginList: 'fetchListData', }),
        ...mapActions('categoryModules', { fetchCategoryList: 'fetchListData', }),
    }
};
</script>
  