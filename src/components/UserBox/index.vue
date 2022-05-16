<template>
  <a-space v-if="!userData.isLogin">
    <a-button @click="$router.push('/register')">注册</a-button>
    <a-button type="primary" @click="$router.push('/login')">登录</a-button>
  </a-space>
  <!-- {path: '/pagePath', query: {queryData: "2"} -->
  <div v-else>
    <a-avatar
      style="cursor: pointer"
      @click="
        $router.push({
          path: '/person',
          query: { id: userData.userBasicInfo.id },
        })
      "
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
          <a-menu-item @click="$router.push('/user/publishShare')">
            <span>发布分享</span>
          </a-menu-item>
          <a-menu-item @click="$router.push('/user/myIdols')">
            <span>我的关注</span>
          </a-menu-item>
          <a-menu-item @click="$router.push('/user/myFavorites')">
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
import { onMounted, watchEffect } from "vue";
import { message } from "ant-design-vue";
import {
  userData,
  getCurrentUser,
  getCurrentUserInfo,
  getAvatarUrl,
  logout,
  whetherLogin,
} from "@/hooks/user";
import { whetherLogin as whetherAdmin } from "@/hooks/admin";
async function signout() {
  try {
    await logout();
  } catch (err) {
    console.error(err);
    message.error("登出错误");
  }
}
onMounted(async () => {
  if (await whetherAdmin()) await signout();
  if (await whetherLogin()) userData.isLogin = true;
  else userData.isLogin = false;
});
watchEffect(async () => {
  if (userData.isLogin) {
    await getCurrentUser();
    await getCurrentUserInfo();
  }
});
</script>

<style lang="less" scoped>
#hello {
  padding-left: 15px;
}
</style>
