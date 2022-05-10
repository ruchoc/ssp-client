<template>
  <a-tabs v-model:activeKey="activeKey" centered>
    <a-tab-pane key="1" tab="我的关注"
      ><a-space direction="vertical">
        <a-card
          style="min-width: 480px"
          :bodyStyle="{ width: '100%' }"
          v-for="user in followData.idolList"
          :key="user.userId"
        >
          <router-link
            target="_blank"
            :to="{ name: 'person', query: { id: user.userId } }"
            ><a-avatar
              style="border: 1px solid rgba(0, 0, 0, 0.1)"
              :src="getAvatarUrl(user.avatarUrl)"
            /><span class="username">{{ user.username }}</span></router-link
          >
          <a-button
            v-if="!isIdol(user.userId)"
            type="primary"
            style="float: right; width: 88px"
            @click="onFollow(user.userId)"
            >关注</a-button
          >
          <a-button
            v-else
            style="float: right; width: 88px"
            @click="offFollow(user.userId)"
            >取消关注</a-button
          >
        </a-card>
      </a-space></a-tab-pane
    >
    <a-tab-pane key="2" tab="我的粉丝"
      ><a-space direction="vertical">
        <a-card
          style="min-width: 480px"
          :bodyStyle="{ width: '100%' }"
          v-for="user in followData.fanList"
          :key="user.userId"
        >
          <router-link
            target="_blank"
            :to="{ name: 'person', query: { id: user.userId } }"
            ><a-avatar
              style="border: 1px solid rgba(0, 0, 0, 0.1)"
              :src="getAvatarUrl(user.avatarUrl)"
            /><span class="username">{{ user.username }}</span></router-link
          >
          <a-button
            v-if="!isIdol(user.userId)"
            type="primary"
            style="float: right; width: 88px"
            @click="onFollow(user.userId)"
            >关注</a-button
          >
          <a-button
            v-else
            style="float: right; width: 88px"
            @click="offFollow(user.userId)"
            >取消关注</a-button
          >
        </a-card>
      </a-space></a-tab-pane
    >
  </a-tabs>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { userData, getAvatarUrl } from "@/hooks/user";
import {
  getIdols,
  isIdol,
  onFollow,
  offFollow,
  getFans,
  followData,
} from "@/hooks/follow";
import { message } from "ant-design-vue";

const activeKey = ref("1");
onMounted(() => {
  try {
    getIdols();
    getFans();
  } catch (err) {
    console.error(err);
    message.error("获取关注信息失败");
  }
});
</script>

<style lang="less" scoped>
.username {
  display: inline-block;
  padding-left: 16px;
  color: #666;
  height: 32px;
  line-height: 32px;
}
</style>
