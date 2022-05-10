<template>
  <a-input-search
    v-model:value="searchText"
    enter-button
    placeholder="输入关键词"
    @search="onSearch"
  />
  <a-divider />
  <a-space direction="vertical">
    <a-card
      style="min-width: 480px"
      :bodyStyle="{ width: '100%' }"
      v-for="user in searchUserList"
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
  </a-space>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { searchUser, userData, getAvatarUrl } from "@/hooks/user";
import {
  getIdols,
  followData,
  isIdol,
  onFollow,
  offFollow,
} from "@/hooks/follow";
import { message } from "ant-design-vue";

const searchText = ref("");
onMounted(() => {
  try {
    getIdols();
  } catch (err) {
    console.error(err);
    message.error("获取关注信息失败");
  }
});

const onSearch = () => {
  searchText.value = searchText.value.trim();
  if (searchText.value.length === 0) return;
  searchUser(searchText.value);
};
const searchUserList = computed(() =>
  userData.searchUserList.filter(
    (item) => item.userId !== userData.userBasicInfo.id
  )
);
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
