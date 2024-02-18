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
          <v-btn size="large" flat v-for="item in menuItems" :key="item.title" :to="item.path">
            {{ item.title }}
          </v-btn>
        </v-col>
        <v-col cols="1">
          <v-tooltip text="Đăng xuất">
            <template v-slot:activator="{ props }">
              <span class="material-icons" v-bind="props" style="font-size: 30px;cursor: pointer;" @click="logout()" >logout</span>
            </template>
          </v-tooltip>
        </v-col>
      </v-row>
    </div>
  </template>
    
  <script>
  import auth from '@/services/auth';
  import store from '@/store';
  export default {
    name: "NavigationLayout",
    data() {
      return {
        sidebar: false,
        menuItems: [
          { title: 'Product', path: '/admin/product' },
          { title: 'Origin', path: '/admin/origin' },
          { title: 'Category', path: '/admin/category' },
          { title: 'Voucher', path: '/admin/voucher'},
          { title: 'Order', path: '/admin/order'},
          { title: 'User', path: '/admin/user'}
        ],
        dialogContent: "",
      }
    },
    methods:{
      logout()
      {
        auth.removeToken();
        store.dispatch('statusModules/createMessage', 'Đăng xuất thành công!');
        this.$router.push('/login');
      }
    }
  };
  </script>
  <style></style>
  