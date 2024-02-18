import { createStore } from 'vuex';

import userModules from './modules/User'
import originModules from './modules/Origin'
import statusModules from './modules/Status'
import categoryModules from "./modules/Category"
import productModules from "./modules/Product"
import voucherModules from './modules/Voucher';
import cartModules from './modules/Cart';
import orderModules from './modules/Order'
const store  = createStore({
  modules: {
    userModules: userModules,
    originModules: originModules,
    statusModules: statusModules,
    categoryModules: categoryModules,
    productModules: productModules,
    voucherModules: voucherModules,
    cartModules: cartModules,
    orderModules:orderModules
  },
  state(){
    return {};
  },
  getters: {},
  mutations: {},
  actions: {},
});
export default store;
