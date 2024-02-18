<template>
    <div>
        <v-hover v-slot="{ isHovering, props }">
            <v-card v-bind="props" :elevation="isHovering ? 12 : 4" class="mx-auto pa-6 rounded-lg" style="height: 90%;">
                <div class="mix fastfood vegetables">
                    <div class="featured__item">
                        <div class="featured__item__pic set-bg"
                            :style="'background: url(' + (linkServer + product.images[0].path) + ') center center no-repeat; background-size: cover;'">
                            <ul class="featured__item__pic__hover">
                                <li>
                                    <a href="#">
                                        <i @click="addToCart(product)" class="material-icons"
                                            style="font-size: 25px;cursor: pointer;padding-top: 5px;">
                                            shopping_cart
                                        </i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="featured__item__text">
                            <router-link style=" text-decoration: none;" :to="'/detail?id='+product.id"><h6 style="font-size: 20px;">{{ product.name }}</h6></router-link>
                            <h5 style="font-size: 18px; color: red;">{{ product.price.toLocaleString('vi-VN') }} VND</h5>
                            <v-btn @click="addToCart(product)" style="margin-bottom: -40px;">Thêm giỏ vào hàng</v-btn>
                        </div>
                    </div>
                </div>
            </v-card>
        </v-hover>
        <NotiDialog :content="this.dialogContent" ref="dialogNotiRef"></NotiDialog>

    </div>
</template>
  
<script>
import NotiDialog from './Dialog/NotiDialog.vue'

import { mapActions } from 'vuex';
export default {
    components: {
        NotiDialog
    },
    props: {
        product: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            linkServer: "https://localhost:7202/",
            cart: {
                id: "",
                idProduct: "",
                idUser: "",
                quantity: 1,
            },
            dialogContent: "",

        }
    },
    methods:
    {
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
.featured__item {
    margin-bottom: 50px;
}

.featured__item:hover .featured__item__pic .featured__item__pic__hover {
    bottom: 20px;
}

.featured__item__pic {
    height: 270px;
    position: relative;
    overflow: hidden;
    background-position: center center;
}

.featured__item__pic__hover {
    position: absolute;
    left: 0;
    bottom: -50px;
    width: 100%;
    text-align: center;
    -webkit-transition: all, 0.5s;
    -moz-transition: all, 0.5s;
    -ms-transition: all, 0.5s;
    -o-transition: all, 0.5s;
    transition: all, 0.5s;
}

.featured__item__pic__hover li {
    list-style: none;
    display: inline-block;
    margin-right: 6px;
}

.featured__item__pic__hover li:last-child {
    margin-right: 0;
}

.featured__item__pic__hover li:hover a {
    background: #FF0000;
    border-color: #FF0000;
}

.featured__item__pic__hover li:hover a i {
    color: #ffffff;
    transform: rotate(360deg);
}

.featured__item__pic__hover li a {
    font-size: 16px;
    color: #1c1c1c;
    height: 40px;
    width: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #ebebeb;
    background: #ffffff;
    display: block;
    border-radius: 50%;
    -webkit-transition: all, 0.5s;
    -moz-transition: all, 0.5s;
    -ms-transition: all, 0.5s;
    -o-transition: all, 0.5s;
    transition: all, 0.5s;
}

.featured__item__pic__hover li a i {
    position: relative;
    transform: rotate(0);
    -webkit-transition: all, 0.3s;
    -moz-transition: all, 0.3s;
    -ms-transition: all, 0.3s;
    -o-transition: all, 0.3s;
    transition: all, 0.3s;
}

.featured__item__text {
    text-align: center;
    padding-top: 15px;
}

.featured__item__text h6 {
    margin-bottom: 10px;
}

.featured__item__text h6 a {
    color: #252525;
}

.featured__item__text h5 {
    color: #252525;
    font-weight: 700;
}
</style>
  