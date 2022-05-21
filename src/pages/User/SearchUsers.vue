<template>
  <a-input-search
    v-model:value="searchText"
    enter-button
    placeholder="输入关键词"
    @search="onSearch"
  />
  <a-divider />
  <a-space direction="vertical" style="width:100%">
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
  <div class="clearfix">
    <div class="pagination">
      <a-pagination
        v-model:current="current"
        v-model:total="userData.userTotal"
        v-model:pageSize="pageSize"
        show-less-items
        @change="pageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import {
  searchUser,
  getSearchUserTotal,
  userData,
  getAvatarUrl,
} from "@/hooks/user";
import {
  getIdols,
  followData,
  isIdol,
  onFollow,
  offFollow,
} from "@/hooks/follow";
import { message } from "ant-design-vue";
import { pageSize } from "@/global/config";

const current = ref(1);
const searchText = ref("");

onMounted(async () => {
  try {
    await getIdols();
  } catch (err) {
    console.error(err);
    message.error("获取关注信息失败");
  }
});
const pageChange = () => {
  onSearch();
};
const onSearch = async () => {
  searchText.value = searchText.value.trim();
  if (searchText.value.length === 0) return;
  try {
    await searchUser(searchText.value, current.value, pageSize);
    await getSearchUserTotal(searchText.value);
  } catch (err) {
    console.error(err);
    message.error("获取用户失败");
  }
};
const searchUserList = computed(() =>
  userData.userList.filter(
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
.pagination {
  float: right;
  padding: 16px 0 125px;
}
</style>
