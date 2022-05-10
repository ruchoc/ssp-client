<template>
  <a-layout>
    <a-layout-header class="header">
      <home-filled @click="$router.push('/')" style="font-size: 32px" />
      <UserBox></UserBox>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu mode="vertical">
          <a-menu-item
            style="margin-top: 0"
            key="1"
            @click="$router.push('/user/personalInfo')"
          >
            <template #icon>
              <edit-outlined />
            </template>
            个人信息
          </a-menu-item>
          <a-menu-item key="2" @click="$router.push('/user/account')">
            <template #icon>
              <lock-outlined />
            </template>
            账号设置
          </a-menu-item>
          <a-menu-item key="3" @click="$router.push('/user/myShares')">
            <template #icon>
              <message-outlined />
            </template>
            我的分享
          </a-menu-item>
          <a-menu-item key="4" @click="$router.push('/user/myFavorites')">
            <template #icon>
              <read-outlined />
            </template>
            我的收藏
          </a-menu-item>
          <a-menu-item key="5" @click="$router.push('/user/myIdols')">
            <template #icon>
              <heart-outlined />
            </template>
            关注信息
          </a-menu-item>
          <a-menu-item key="6" @click="$router.push('/user/searchUsers')">
            <template #icon>
              <aim-outlined />
            </template>
            搜索用户
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
import {
  HomeFilled,
  EditOutlined,
  LockOutlined,
  MessageOutlined,
  ReadOutlined,
  HeartOutlined,
  AimOutlined,
} from "@ant-design/icons-vue";
import UserBox from "@/components/UserBox";
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  background-color: #eee;
  justify-content: space-between;
}
</style>
