import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import auth from '@/services/auth'
import store from '@/store';
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/CartView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin/ProductAdmin.vue'),
    meta: { requiresAuth: true } 
  },
  {
    path: '/admin/product',
    name: 'adminProduct',
    component: () => import('../views/Admin/ProductAdmin.vue'),
    meta: { requiresAuth: true } 
  },
  {
    path: '/admin/origin',
    name: 'adminOrigin',
    component: () => import('../views/Admin/OriginAdmin.vue'),
    meta: { requiresAuth: true } 

  },
  {
    path: '/admin/category',
    name: 'adminCategory',
    component: () => import('../views/Admin/CategoryAdmin.vue'),
    meta: { requiresAuth: true } 
  },
  {
    path: '/admin/voucher',
    name: 'adminVoucher',
    component: () => import('../views/Admin/VoucherAdmin.vue'),
    meta: { requiresAuth: true } 
  },
  {
    path: '/admin/order',
    name: 'adminOrder',
    component: () => import('../views/Admin/OrderAdmin.vue'),
    meta: { requiresAuth: true } 
  },
  {
    path: '/admin/user',
    name: 'adminUser',
    component: () => import('../views/Admin/UserAdmin.vue'),
    meta: { requiresAuth: true } 
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginForm.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterForm.vue')
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('../views/ProductView.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/DetailView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/UserView.vue'),
    meta: { requiresUser: true } 
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach(async (to, from, next) => {
  var check = await  auth.validateToken();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (check!="admin") {
      store.dispatch('statusModules/createMessage', 'Bạn không có quyền truy cập trang này. Hãy đăng nhập để tiếp tục.');
      store.dispatch('statusModules/createLink', to.fullPath);
      next({ name: 'login'});
    } else {
        next();
    }
  } 
  if (to.matched.some(record => record.meta.requiresUser)) {
    if (check=="admin"||check=="user") {
      next();
    } else {
      store.dispatch('statusModules/createMessage', 'Bạn không có quyền truy cập trang này. Hãy đăng nhập để tiếp tục.');
      store.dispatch('statusModules/createLink', to.fullPath);
      next({ name: 'login'});
    }
  }
  next();

});

export default router
