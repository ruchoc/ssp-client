<template>
  <a-layout>
    <a-layout-header class="header">
      <home-filled @click="$router.push('/')" style="font-size: 32px" />
      <div class="user-box">
        <a-button type="primary" @click="$router.push('/admin/login')" v-if="!userData.isLogin">登录</a-button>
        <div v-else>
          <span>您好，</span>
          <a-dropdown :trigger="['click']">
            <a @click.prevent> 管理员 </a>
            <template #overlay>
              <a-menu>
                <a-menu-item @click="signout">
                  <span>登出</span>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu mode="vertical">
          <a-menu-item
            style="margin-top: 0"
            key="1"
            @click="$router.push('/admin/userManager')"
          >
            <template #icon>
              <edit-outlined />
            </template>
            用户管理
          </a-menu-item>
          <a-menu-item key="2" @click="$router.push('/admin/banSetting')">
            <template #icon>
              <lock-outlined />
            </template>
            屏蔽设置
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px',
          }"
        >
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { HomeFilled, EditOutlined, LockOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { whetherLogin,userData } from "@/hooks/admin";
import { logout } from "@/hooks/user";
import { message } from "ant-design-vue";
const router = useRouter();


function signout() {
  try {
    logout();
		userData.isLogin=false
		router.push('/admin')
  } catch (err) {
    console.error(err);
    message.error("登出错误");
  }
}
onMounted(async () => {
  if (await whetherLogin()) {
    userData.isLogin=true
  } else {
    userData.isLogin=false
    router.push("/admin/login");
  }
});
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  background-color: #eee;
  justify-content: space-between;
}
</style>
