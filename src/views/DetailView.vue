<template>
    <div>
        <div class="background" :style="{ backgroundImage: 'url(' + images + ')' }">
            <h2 class="text-center" style="padding-top: 50px;font-size: 30px;color: white;">Chi tiết sản phẩm</h2>
        </div>
        <div v-if="productDetail!=null">
            <v-row>
                <v-col cols="1"></v-col>
                <v-col cols="5">
                    <v-carousel cycle hide-delimiter-background show-arrows="hover" style="height: 500px;">
                <v-carousel-item v-for="(image, i) in productDetail.images" :key="i">
                  <v-sheet height="100%">
                    <div class="d-flex fill-height justify-center align-center" style="min-width: 200px;">
                      <v-img :src="linkServer + image.path" cover></v-img>
                    </div>
                  </v-sheet>
                </v-carousel-item>
              </v-carousel>
                </v-col>
                <v-col cols="5">
                    <h2>{{ productDetail.name }}</h2>
                    <h3 style="color: red;margin: 20px 0 10px 10px;">{{ productDetail.price.toLocaleString('vi-VN') }} VNĐ</h3>
                    <p>{{ productDetail.detail }}</p>
                    <h5>Số lượng</h5>
                    <v-text-field style="width: 100px;" density="compact" v-model="cart.quantity" type="number"
                            variant="outlined"></v-text-field>
                    <v-btn style="background-color: #198754;color: white;" @click="addToCart(productDetail)">Thêm vào giỏ hàng</v-btn>
                </v-col>
            </v-row>

        </div>
        <NotiDialog :content="this.dialogContent" ref="dialogNotiRef"></NotiDialog>

    </div>
</template>

<script>
import NotiDialog from '@/components/Dialog/NotiDialog.vue';
import { mapActions } from 'vuex';
import axios from 'axios';
export default {
    components: {
        NotiDialog: NotiDialog
    },
    data() {
        return {
            linkServer: "https://localhost:7202",
            images: require('../image/breadcrumb.jpg'),
            productDetail: null,
            cart: {
                id: "",
                idProduct: "",
                idUser: "",
                quantity: 1,
            },
            dialogContent: ""
        }
    },
    created() {
        var id = this.$route.query.id;
        const config = {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        };
        axios
            .get('https://localhost:7202/api/Product/Get/' + id, config)
            .then(response => {
                console.log(response.data)
                this.productDetail = response.data;
            })
            .catch(error => {
                console.error('Error fetching:', error);
            });

    },
    methods: {
        async addToCart(item) {
            this.cart.idProduct = item.id;
            var result = await this.createObj(this.cart);
            console.log("resut" + result);
            if (result === true) {
                this.dialogContent = "Thêm vào giỏ hàng thành công!";
                this.$refs.dialogNotiRef.openDialog();

            }
            else {
                if (result === false) {
                    this.dialogContent = "Thêm vào giỏ hàng thất bại!";
                    this.$refs.dialogNotiRef.openDialog();
                }
                else {
                    alert("Vui lòng đăng nhập để thêm vào giỏ hàng!")
                    window.location = "/login";
                }
            }



        },
        ...mapActions('cartModules', ['createObj', 'fetchListData', 'updateObj', 'deleteObj']),
    }
};
</script>

<style scoped>
.background {
    width: 100%;
    height: 200px;
}
</style>