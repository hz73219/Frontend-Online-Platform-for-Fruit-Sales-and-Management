<template>
  <div>
    <v-row class="elevation-10 full-width pt-2 mb-8 justify-space-between align-center">
      <v-col cols="2" class="ml-5">
        <v-sheet>
          <router-link to="/">
            <img style="cursor: pointer;" src="../../image/logo.png">
          </router-link>
        </v-sheet>
      </v-col>
      <v-col cols="5">
        <router-link to="/">
          <v-btn size="large" flat>Trang chủ</v-btn>
        </router-link>
        <router-link to="/product">
          <v-btn size="large" flat>Sản phẩm</v-btn>
        </router-link>
        <span class="routerHover">
          <v-btn size="large" flat>Loại sản phẩm</v-btn>
          <ul class="ulNav elevation-10">
            <li v-for="item in categoryListData" :key="item.id">
              <a :href="'/product?category=' + item.id"><v-btn size="small" flat>{{ item.name }}</v-btn></a>
            </li>
          </ul>
        </span>

        <span class="routerHover">
          <v-btn size="large" flat>Xuất xứ</v-btn>
          <ul class="ulNav elevation-10">
            <li v-for="item in originListData" :key="item.id">
              <a :href="'/product?origin=' + item.id"><v-btn size="small" flat>{{ item.name }}</v-btn></a>
            </li>
          </ul>
        </span>

      </v-col>
      <v-col cols="2">
        <div class="input-group">
          <div class="form-outline" data-mdb-input-init>
            <input v-model="name" id="search-focus" type="search" class="form-control" placeholder="Tìm kiếm" />
          </div>
          <button @click="searchName" style="color:#fff;" type="button" class="btn btn-success" data-mdb-ripple-init>
            Tìm kiếm
          </button>
        </div>
      </v-col>
      <v-col cols="2">
        <v-tooltip v-if="checkLogin()" text="Giỏ hàng">
          <template v-slot:activator="{ props }">
            <router-link to="/cart"> <span class="material-icons mr-5" v-bind="props"
              style="font-size: 30px;cursor: pointer;">shopping_cart</span>
            </router-link>
          </template>
        </v-tooltip>
        <v-tooltip v-if="checkLogin()" text="Trang cá nhân">
          <template v-slot:activator="{ props }">
            <span @click="profile()" class="material-icons mr-5" v-bind="props" style="font-size: 30px;cursor: pointer;">person</span>
          </template>
        </v-tooltip>
        <v-tooltip v-if="!checkLogin()" text="Đăng nhập">
          <template v-slot:activator="{ props }">
            <span @click="login" class="material-icons mr-5" v-bind="props" style="font-size: 30px;cursor: pointer;">login</span>
          </template>
        </v-tooltip>
        <v-tooltip v-if="checkLogin()" text="Đăng xuất">
          <template v-slot:activator="{ props }">
            <span @click="logout" class="material-icons" v-bind="props" style="font-size: 30px;cursor: pointer;">logout</span>
          </template>
        </v-tooltip>
      </v-col>
    </v-row>
  </div>
</template>
  
<script>
import { mapGetters, mapActions } from 'vuex';
import auth from '@/services/auth';
export default {
  name: "NavigationLayout",
  data() {
    return {
      sidebar: false,
      name: ""
    }
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
    searchName() {
      window.location.href = '/product?name=' + this.name;
    },
    checkLogin() {
      var result = auth.token;
      if (result == undefined) {
        return false;
      }
      else {
        return true;
      }
    },
    login(){
      window.location.href = '/login'
    },
    logout(){
      auth.removeToken();
      window.location.reload();
    },
    profile()
    {
      window.location.href = '/profile'

    },
    ...mapActions('originModules', { fetchOriginList: 'fetchListData', }),
    ...mapActions('categoryModules', { fetchCategoryList: 'fetchListData', }),
  }
};
</script>
<style>
.routerHover {
  position: relative;
}

.routerHover .ulNav {
  display: none;
  position: absolute;
  top: 100%;
  /* Đặt vị trí phía dưới thanh cha */
  left: 0;
  background-color: #fff;
  z-index: 100;
  padding: 0 20px 20px 20px;
  margin-top: 10px;
}

.routerHover:hover .ulNav {
  display: block;
}

.ulNav li {
  padding: 10px;
  list-style: none;
}
</style>