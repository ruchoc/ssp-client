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
      v-for="user in userList"
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
        v-if="!user.locked"
        style="float: right; width: 88px"
        @click="onLock(user)"
        >锁定</a-button
      >
      <a-button
        v-else
        danger
        type="primary"
        style="float: right; width: 88px"
        @click="offLock(user)"
        >解锁</a-button
      >
    </a-card>
    <div class="clearfix">
      <div class="pagination">
        <a-pagination
          v-model:current="current"
          v-model:total="userTotal"
          v-model:pageSize="pageSize"
          show-less-items
          hideOnSinglePage
          @change="pageChange"
        />
      </div>
    </div>
  </a-space>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import {
  userData,
  searchUser,
  getSearchUserTotal,
  getAvatarUrl,
} from "@/hooks/user";
import {
  userData as allUserData,
  getAllUsers,
  getUserTotal,
	setUserStatus,
} from "@/hooks/admin";
import { message } from "ant-design-vue";
import { pageSize } from "@/global/config";

const current = ref(1);
const searchText = ref("");
const userList = computed(() => {
  return isAll.value ? allUserData.userList : userData.userList;
});
const userTotal = computed(() => {
  return isAll.value ? allUserData.userTotal : userData.userTotal;
});
const isAll = ref(true);

onMounted(()=>{
	onSearch()
})
const pageChange = () => {
  onSearch();
};
const onSearch = async () => {
  if(!allUserData.isLogin) {
    message.info('请先登录')
    return
  }
  searchText.value = searchText.value.trim();
  try {
    if (searchText.value.length !== 0) {
      if (isAll.value) current.value = 1;
      isAll.value = false;
      await searchUser(searchText.value, current.value, pageSize);
      await getSearchUserTotal(searchText.value);
    } else {
      if (!isAll.value) current.value = 1;
      isAll.value = true;
      await getAllUsers(current.value, pageSize);
      await getUserTotal();
    }
  } catch (err) {
    console.error(err);
    message.error("获取用户失败");
  }
};
const onLock =async (user) => {
	try{
		await setUserStatus(user.userId,1)
		user.locked=true
	}catch(err){
		console.error(err);
		message.error('锁定用户失败')
	}
};
const offLock =async (user) => {
	try{
		await setUserStatus(user.userId,0)
		user.locked=false
	}catch(err){
		console.error(err);
		message.error('解锁用户失败')
	}};
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
