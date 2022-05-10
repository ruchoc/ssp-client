<template>
  <a-layout>
    <a-layout-header class="header">
      <home-filled @click="$router.push('/')" style="font-size: 32px" />
      <UserBox></UserBox>
    </a-layout-header>
    <a-layout-content>
      <a-space class="space" :size="20" direction="vertical">
        <a-card>
          <a-avatar
            class="avatar"
            v-if="userData.searchInfo.avatarUrl"
            size="large"
            :src="getAvatarUrl(userData.searchInfo.avatarUrl)"
          ></a-avatar>
          <span class="username">{{ userData.searchBasicInfo.name }}</span>
          <div
            v-if="userData.isLogin && userData.userBasicInfo.id != id"
            style="float: right"
          >
            <a-button v-if="!isIdol(id)" type="primary" @click="onFollow(id)"
              >关注</a-button
            >
            <a-button v-else @click="offFollow(id)">取消关注</a-button>
          </div>
        </a-card>
        <a-card>
          <a-descriptions title="账号信息" bordered>
            <a-descriptions-item label="账号名">{{
              userData.searchBasicInfo.name
            }}</a-descriptions-item>
            <a-descriptions-item label="性别">{{
              userData.searchInfo.gender ? userData.searchInfo.gender : "未填写"
            }}</a-descriptions-item>
            <a-descriptions-item label="生日">{{
              userData.searchInfo.birthday
                ? dayjs(userData.searchInfo.birthday).format("YYYY年MM月DD日")
                : "未填写"
            }}</a-descriptions-item>
            <a-descriptions-item label="自我介绍">{{
              userData.searchInfo.selfIntroduction
                ? userData.searchInfo.selfIntroduction
                : "未填写"
            }}</a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-space>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { HomeFilled } from "@ant-design/icons-vue";
import UserBox from "@/components/UserBox";
import { useRoute } from "vue-router";
import { onMounted, ref } from "@vue/runtime-core";
import { userData, getUser, getUserInfo, getAvatarUrl } from "@/hooks/user";
import { message } from "ant-design-vue";
import { isIdol, onFollow, offFollow } from "@/hooks/follow";
import dayjs from "dayjs";

const route = useRoute();
const id = ref("");
onMounted(() => {
  try {
    id.value = route.query.id;
    getUser(id.value);
    getUserInfo(id.value);
  } catch (err) {
    console.error(err);
    message.error("获取账号信息失败");
  }
});
</script>

<style lang="less">
.header {
  display: flex;
  align-items: center;
  background-color: #eee !important;
  justify-content: space-between;
}

.space {
  width: 100%;
  padding: 15px 25px;

  .avatar {
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  .username {
    padding-left: 16px;
    display: inline-block;
    line-height: 40px;
    height: 40px;
  }
}
</style>
