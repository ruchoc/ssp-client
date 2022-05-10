import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/pages/Home";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import User from "@/pages/User";
import Admin from "@/pages/Admin";
import Share from "@/pages/Share";
import PersonalInfo from "@/pages/User/PersonalInfo.vue";
import Account from "@/pages/User/Account.vue";
import MyShares from "@/pages/User/MyShares.vue";
import MyFavorites from "@/pages/User/MyFavorites.vue";
import MyIdols from "@/pages/User/MyIdols.vue";
import SearchUsers from '@/pages/User/SearchUsers.vue'
import Person from "@/pages/Person";
import Test from "@/pages/Test";

import {userData} from '@/hooks/user'

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/user",
    name: "user",
    component: User,
    children: [
      { path: "personalInfo", name: "personalInfo", component: PersonalInfo },
      { path: "account", name: "account", component: Account },
      { path: "myShares", name: "myShares", component: MyShares },
      { path: "myFavorites", name: "myFavorites", component: MyFavorites },
      { path: "myIdols", name: "myIdols", component: MyIdols },
      { path: "searchUsers", name: "searchUsers", component: SearchUsers },
    ],
  },
  {
    path: "/share",
    name: "share",
    component: Share,
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
  },
  {
    path: "/person",
    name: "person",
    component: Person,
  },
  {
    path: "/test",
    name: "test",
    component: Test,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const nextRoute = [
    "personalInfo",
    'user',
    'account',
    'searchUsers',
    'myIdols',
  ];
  let isLogin = userData.isLogin
  if (nextRoute.indexOf(to.name) >= 0 && !isLogin) {
    next({
      path: "/login",
    });
  } else {
    next();
  }
});

export default router;
