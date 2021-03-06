import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/pages/Home";
import AllShares from "@/pages/Home/AllShares.vue";
import NewShares from "@/pages/Home/NewShares.vue";
import LikeShares from "@/pages/Home/LikeShares.vue";
import SearchShares from "@/pages/Home/SearchShares.vue";

import Register from "@/pages/Register";
import Login from "@/pages/Login";
import User from "@/pages/User";

import Admin from "@/pages/Admin";
import UserManager from "@/pages/Admin/UserManager.vue";
import BanSetting from "@/pages/Admin/BanSetting.vue";
import AdminLogin from "@/pages/Admin/Login.vue";

import PublishShare from "@/pages/User/PublishShare.vue";
import PersonalInfo from "@/pages/User/PersonalInfo.vue";
import Account from "@/pages/User/Account.vue";
import MyShares from "@/pages/User/MyShares.vue";
import MyFavorites from "@/pages/User/MyFavorites.vue";
import MyIdols from "@/pages/User/MyIdols.vue";
import SearchUsers from "@/pages/User/SearchUsers.vue";

import Person from "@/pages/Person";
import Share from "@/pages/Share";

import Test from "@/pages/Test";

import { userData } from "@/hooks/user";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    children: [
      { path: "allShares", name: "allShares", component: AllShares },
      { path: "newShares", name: "newShares", component: NewShares },
      { path: "likeShares", name: "likeShares", component: LikeShares },
      { path: "searchShares", name: "searchShares", component: SearchShares },
    ],
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
      { path: "publishShare", name: "publishShare", component: PublishShare },
    ],
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    children: [
      { path: "userManager", name: "userManager", component: UserManager },
      { path: "banSetting", name: "banSetting", component: BanSetting },
      { path: "login", name: "adminLogin", component: AdminLogin },
    ],
  },
  {
    path: "/person",
    name: "person",
    component: Person,
  },
  {
    path: "/share",
    name: "share",
    component: Share,
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
    "user",
    "account",
    "searchUsers",
    "myIdols",
    "publishShare",
    "myShares",
    "myFavorites",
  ];
  let isLogin = userData.isLogin;
  if (nextRoute.indexOf(to.name) >= 0 && !isLogin) {
    next({
      path: "/login",
    });
  } else {
    next();
  }
});

export default router;
