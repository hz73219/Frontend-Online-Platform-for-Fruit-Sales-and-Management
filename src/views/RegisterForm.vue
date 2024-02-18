<template>
  <v-container>
    <v-form @submit.prevent ref="form">
      <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="600" rounded="lg">
        <h2>Đăng kí</h2>
        <div class="text-subtitle-1 text-medium-emphasis">Tài khoản</div>
        <v-text-field v-model="userObj.userName" :rules="userRule.userName" density="compact" placeholder="Tài khoản"
          prepend-inner-icon="mdi-account" variant="outlined" clearable></v-text-field>
        <div class="text-subtitle-1 text-medium-emphasis">Mật khẩu</div>
        <v-text-field v-model="userObj.password" :rules="userRule.password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'" density="compact"
          placeholder="Nhập mật khẩu" prepend-inner-icon="mdi-lock-outline" variant="outlined"
          @click:append-inner="togglePasswordVisibility" clearable></v-text-field>
        <div class="text-subtitle-1 text-medium-emphasis">Nhập lại mật khẩu</div>
        <v-text-field :rules="userRule.passwordConf" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'" density="compact" placeholder="Nhập lại mật khẩu"
          prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="togglePasswordVisibility"
          clearable></v-text-field>
        <div class="text-subtitle-1 text-medium-emphasis">Tên người dùng</div>
        <v-text-field :rules="userRule.fullName" v-model="userObj.fullName" density="compact" placeholder="Tên người dùng"
          prepend-inner-icon="mdi-account" variant="outlined" clearable></v-text-field>
        <div class="text-subtitle-1 text-medium-emphasis">Email</div>
        <v-text-field :rules="userRule.email" v-model="userObj.email" density="compact" placeholder="Email"
          prepend-inner-icon="mdi-email" variant="outlined" clearable></v-text-field>
        <div class="text-subtitle-1 text-medium-emphasis">Số điện thoại</div>
        <v-text-field :rules="userRule.phone" v-model="userObj.phone" density="compact" placeholder="Số điện thoại"
          prepend-inner-icon="mdi-phone" variant="outlined" clearable></v-text-field>
        <div class="text-subtitle-1 text-medium-emphasis">Địa chỉ</div>
        <v-text-field :rules="userRule.address" v-model="userObj.address" density="compact" placeholder="Địa chỉ"
          prepend-inner-icon="mdi-map" variant="outlined" clearable></v-text-field>
        <v-btn block class="mb-8" color="blue" size="large" variant="tonal" type="submit" @click="register">
          Đăng ký
        </v-btn>
        <v-card-text class="text-center">
          <a class="text-blue text-decoration-none" href="/login" rel="noopener noreferrer">
            Đăng nhập ngay <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
      </v-card>
    </v-form>
    <NotiDialog :content="this.dialogContent" ref="dialogRef"></NotiDialog>
  </v-container>
</template>
  
<script>
import { mapActions } from 'vuex';
import NotiDialog from '../components/Dialog/NotiDialog.vue'
export default {
  components: {
    NotiDialog
  },
  data() {
    return {
      visible: false,
      dialogContent: "",
      userObj: {
        id: "",
        userName: "",
        password: "",
        fullName: "",
        email: "",
        phone: "",
        address: "",
        role: ""
      },
      userRule: {
        userName: [
          value => {
            if (value?.length > 5) { return true; }
            this.validate = false;
            return 'Tên tài khoản ít nhất 6 kí tự!'
          },
        ],
        password: [
          value => {
            if (value?.length > 5) { return true; }
            return 'Tên người dùng ít nhất 6 kí tự!'
          },
        ],
        passwordConf: [
          value => {
            if (value?.length > 5 && this.userObj.password == value) {
              return true;
            }
            return 'Chưa trùng hợp mật khẩu!'
          },
        ],
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
  methods: {
    togglePasswordVisibility() {
      this.visible = !this.visible;
    },
    ...mapActions('userModules', ['createUser']),
    async register() {
      const { valid } = await this.$refs.form.validate()
      if (!valid) {
        this.dialogContent = "Vui lòng điền dầy đủ thông tin!"
        this.$refs.dialogRef.openDialog();
        return;
      }
      var result = await  this.createUser(this.userObj);
      if (result) {
       alert( "Thêm mới tài khoản thành công!");
        this.$router.push('/login');
      }
      else {
        this.dialogContent = "Đã xảy ra lỗi"
        this.$refs.dialogRef.openDialog();
      }
    }
  },
};
</script>
  
<style></style>
  