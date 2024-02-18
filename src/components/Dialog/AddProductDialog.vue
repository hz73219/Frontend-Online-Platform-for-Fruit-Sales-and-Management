<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Tạo mới</span>
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
            <v-text-field v-model="model.price" density="compact" placeholder="Giá" type="number" variant="outlined"
              clearable></v-text-field>
          </div>
          <div>
            <div class="text-subtitle-1 text-medium-emphasis">Số lượng</div>
            <v-text-field v-model="model.quantity" density="compact" placeholder="Số lượng" type="number"
              variant="outlined" clearable></v-text-field>
          </div>
          <div>
            <div class="text-subtitle-1 text-medium-emphasis">Ghi chú</div>
            <v-text-field v-model="model.note" density="compact" placeholder="Ghi chú" type="text" variant="outlined"
              clearable></v-text-field>
          </div>
          <div>
            <div class="text-subtitle-1 text-medium-emphasis">Chi tiết</div>
            <v-text-field v-model="model.detail" density="compact" placeholder="Chi tiết" type="text" variant="outlined"
              clearable></v-text-field>
          </div>
          <div>
            <div class="text-subtitle-1 text-medium-emphasis">Nơi xuất xứ</div>
            <v-select :items="originListData" v-model="model.idOrigin" item-title="name" item-value="id" density="compact"
              variant="outlined" clearable></v-select>
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

        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
          Đóng
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="CreateProduct">
          Tạo mới
        </v-btn>
      </v-card-actions>
    </v-card>
    <NotiDialog :content="this.dialogContent" ref="dialogNotiRef"></NotiDialog>
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
        name: "",
        price: 0,
        quantity: 0,
        note: "",
        detail: "",
        idCategory: "",
        idOrigin: "",
      },
      dialogContent: ""
    };
  },
  created() {
    this.fetchOriginList();
    this.fetchCategoryList();
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
      console.log(this.originListData);
    },
    async CreateProduct() {
      console.log(this.model);
      const formData = new FormData();
      formData.append('id', "1");
      formData.append('idImage', "1");
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
      var result = await this.createObj(formData);
      if (result == true) {
        this.dialogContent = "Tạo mới thành công!";
        this.$refs.dialogNotiRef.openDialog();
        this.$refs.formRef.reset();
      }
      else {
        this.dialogContent = "Tạo mới thất bại!";
        this.$refs.dialogNotiRef.openDialog();
      }
    },
    ...mapActions('productModules', ['createObj', 'fetchListData', 'updateObj', 'deleteObj']),
    ...mapActions('originModules', { fetchOriginList: 'fetchListData', }),
    ...mapActions('categoryModules', { fetchCategoryList: 'fetchListData', }),
  }
};
</script>
