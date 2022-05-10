<template>
  <a-space v-if="!userData.isLogin">
    <a-button @click="$router.push('/register')">注册</a-button>
    <a-button type="primary" @click="$router.push('/login')">登录</a-button>
  </a-space>
  <!-- {path: '/pagePath', query: {queryData: "2"} -->
  <div v-else>
    <a-avatar
      style="cursor: pointer"
      @click="$router.push({path:'/person',query:{id:userData.userBasicInfo.id}})"
      v-if="userData.userInfo.avatarUrl"
      :src="getAvatarUrl()"
    ></a-avatar>
    <span id="hello">您好，</span>
    <a-dropdown :trigger="['click']">
      <a class="ant-dropdown-link" @click.prevent>
        {{ userData.userBasicInfo.name }}
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item @click="$router.push('/user/personalInfo')">
            <span>个人空间</span>
          </a-menu-item>
          <a-menu-item>
            <span>发布分享</span>
          </a-menu-item>
          <a-menu-item @click="$router.push('/user/myIdols')">
            <span>我的关注</span>
          </a-menu-item>
          <a-menu-item>
            <span>我的收藏</span>
          </a-menu-item>
          <a-menu-item @click="$router.push('/user/account')">
            <span>设置</span>
          </a-menu-item>
          <a-menu-item @click="signout">
            <span>登出</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup>
import { watchEffect } from "vue";
import {
  userData,
  getCurrentUser,
  getCurrentUserInfo,
  getAvatarUrl
} from "@/hooks/user";
function signout() {
  userData.isLogin = false;
}
watchEffect(async () => {
  if (userData.isLogin) {
    await getCurrentUser();
    await getCurrentUserInfo();
    console.log(userData);
  }
});
</script>

<style lang="less" scoped>
#hello {
  padding-left: 15px;
}
</style>
