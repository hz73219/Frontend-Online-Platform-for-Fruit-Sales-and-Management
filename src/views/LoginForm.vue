<template>
    <v-container>
        <v-form @submit.prevent ref="form">

            <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
                <h2>Đăng Nhập</h2>
                <div class="text-subtitle-1 text-medium-emphasis">Tài khoản</div>
                <v-text-field v-model="userObj.userName" :rules="userRule.userName" density="compact"
                    placeholder="Tài khoản" prepend-inner-icon="mdi-account" variant="outlined" clearable></v-text-field>
                <div class="text-subtitle-1 text-medium-emphasis">Mật khẩu</div>
                <v-text-field v-model="userObj.password" :rules="userRule.password"
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                    density="compact" placeholder="Nhập mật khẩu" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                    @click:append-inner="togglePasswordVisibility" clearable></v-text-field>
                <p class=" text-center mb-3" v-if="check" style="color: red;">{{ errorContent }}
                </p>
                <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="login">
                    Đăng nhập
                </v-btn>

                <v-card-text class="text-center">
                    <a class="text-blue text-decoration-none" href="/register" rel="noopener noreferrer">
                        Đăng ký ngay <v-icon icon="mdi-chevron-right"></v-icon>
                    </a>
                </v-card-text>
            </v-card>
        </v-form>
        <NotiDialog :content="this.dialogContent" ref="dialogRef"></NotiDialog>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import NotiDialog from '../components/Dialog/NotiDialog.vue'

export default {
    components: {
        NotiDialog
    },
    computed: {
        ...mapGetters('statusModules', ['getMessage','getLink']),

    },
    mounted() {
        const message = this.getMessage;
        if (message != "") {
            this.dialogContent = message;
            this.$refs.dialogRef.openDialog();
            this.deleteMessage();
        }
    },
    data() {
        return {
            dialogContent: "",
            visible: false,
            check: false,
            errorContent: "",
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
                        return 'Mật khẩu ít nhất 6 kí tự!'
                    },
                ]
            },
        };
    },
    methods: {
        togglePasswordVisibility() {
            this.visible = !this.visible;
        },
        ...mapActions('userModules', ['loginUser']),
        ...mapActions('statusModules', ['deleteMessage','deleteLink']),
        async login() {
            const { valid } = await this.$refs.form.validate()
            if (!valid) {
                return;
            }
            var result = await this.loginUser(this.userObj)
            console.log('login'+result);
            if (result) {
                var link = this.getLink;
                console.log("link");
                console.log(link);
                if (link != "") {
  
                    window.location.href =link;
                    this.deleteLink();
                }
                else
                {
                    window.location.href = '/';
                }
            }
            else {
                this.check = true;
                this.errorContent = "Đăng nhập không thành công!"
            }
        },
    },
};
</script>
  

<style></style>