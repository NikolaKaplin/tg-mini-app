import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import IndexPage from '@/pages/IndexPage.vue';
import InitDataPage from '@/pages/InitDataPage.vue';
import ThemeParamsPage from '@/pages/ThemeParamsPage.vue';
import LaunchParamsPage from '@/pages/LaunchParamsPage.vue';
import TonConnectPage from '@/pages/TonConnectPage.vue';
import IconTonConnect from '@/components/IconTonConnect.vue';
import RegisterPage from '@/pages/auth/RegisterPage.vue';
import BasicLayout from '@/layouts/BasicLayout.vue';
import HomePage from '@/pages/HomePage.vue';
import ProfilePage from '@/pages/ProfilePage.vue';
import WalletPage from '@/pages/WalletPage.vue';
import PostPage from '@/pages/post/PostPage.vue';
import AddPostPage from '@/pages/post/AddPostPage.vue';


export const routes: RouteRecordRaw[] = [
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
  {
    path: "/error",
    name: 'error',
    component: () => import("@/pages/ErrorPage.vue")
  },
  {
    path: '/',
    name: 'baseLayout',
    component: BasicLayout,
    children: [
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
      },
      {
        path: '/wallet',
        name: "wallet",
        component: () => import("@/pages/WalletPage.vue")
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import("@/pages/ProfilePage.vue"),
      },
      {
        path: '/profile/:id',
        name: "profileOther",
        component: () => import("@/pages/ProfilePage.vue")
      },
      {
        path: "/posts",
        name: 'posts',
        component: () => import("@/pages/post/PostPage.vue"),
      },
      {
        path: '/posts/add',
        name: 'add-post',
        component: () => import("@/pages/post/AddPostPage.vue")
      }
    ]
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


export default router;

