import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import IndexPage from '@/pages/IndexPage.vue';
import InitDataPage from '@/pages/InitDataPage.vue';
import ThemeParamsPage from '@/pages/ThemeParamsPage.vue';
import LaunchParamsPage from '@/pages/LaunchParamsPage.vue';
import TonConnectPage from '@/pages/TonConnectPage.vue';
import IconTonConnect from '@/components/IconTonConnect.vue';
import RegisterPage from '@/pages/auth/RegisterPage.vue';
import BasicLayout from '@/layouts/BasicLayout.vue';
import LicenseAgreement from '@/pages/auth/LicenseAgreement.vue';
import HomePage from '@/pages/HomePage.vue';


export const routes = [
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: "/license",
    name: "license",
    component: LicenseAgreement
  },
  {
    path: '/',
    name: 'baseLayout',
    component: BasicLayout,
    children: [
      {
        path: '',
        name: 'home', // Добавляем имя для главной
        component: HomePage
      },
      {
        path: '/init-data',
        name: 'init-data',
        component: InitDataPage,
        meta: {
          title: 'Init Data',
        },
      },
      {
        path: '/theme-params',
        name: 'theme-params',
        component: ThemeParamsPage,
        meta: {
          title: 'Theme Params',
        },
      },
      {
        path: '/launch-params',
        name: 'launch-params',
        component: LaunchParamsPage,
        meta: {
          title: 'Launch Params',
        },

      },
      {
        path: '/ton-connect',
        name: 'ton-connect',
        component: TonConnectPage,
        meta: {
          icon: IconTonConnect,
          title: 'TON Connect',
        },
      }
    ]
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


export default router;

