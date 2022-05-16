<template>
  <div class="add-ban">
    <a-input
      v-model:value="banText"
      placeholder="输入屏蔽词"
      @pressEnter="addBan"
    ></a-input>
    <a-button type="primary" @click="addBan">添加屏蔽词</a-button>
  </div>
  <a-space direction="vertical">
    <a-card
      style="min-width: 480px"
      :bodyStyle="{ width: '100%' }"
      v-for="banWord in banData.banList"
      :key="banWord.id"
    >
      <div class="ban-word">
        <span>{{ banWord.keyword }}</span>
        <a-button type="primary" danger @click="deleteBan(banWord.id)"
          >删除</a-button
        >
      </div>
    </a-card>
    <div class="clearfix">
      <div class="pagination">
        <a-pagination
          v-model:current="current"
          v-model:total="banData.banTotal"
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
import { onMounted, ref } from "vue";
import {
  banData,
  userData,
  getBannedWords,
  getBannedWordTotal,
  addBannedWord,
  deleteBannerWord,
} from "@/hooks/admin";
import { message } from "ant-design-vue";
import { pageSize } from "@/global/config";

const current = ref(1);
const banText = ref("");

onMounted(() => {
  getPage();
});
const pageChange = () => {
  getPage();
};
const getPage = async () => {
  if (!userData.isLogin) {
    message.info("请先登录");
    return;
  }
  try {
    await getBannedWords(current.value, pageSize);
    await getBannedWordTotal();
  } catch (err) {
    console.error(err);
    message.error("获取屏蔽字失败");
  }
};
const addBan = async () => {
  if (!userData.isLogin) {
    message.info("请先登录");
    return;
  }
  banText.value = banText.value.trim();
  if (banText.value.length === 0) return;
  try {
    await addBannedWord(banText.value);
    getPage();
    banText.value = "";
  } catch (err) {
    console.error(err);
    message.error("增加屏蔽词失败");
  }
};
const deleteBan = async (id) => {
  try {
    await deleteBannerWord(id);
    getPage();
  } catch (err) {
    console.error(err);
    message.error("删除屏蔽词失败");
  }
};
</script>

<style lang="less" scoped>
.ban-word {
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > span {
    font-size: 18px;
    color: #333;
  }
}
.add-ban {
  display: flex;
  gap: 16px;
  padding-bottom: 24px;

  .ant-input {
    width: 400px;
  }
}
.pagination {
  float: right;
  padding: 16px 0 125px;
}
</style>
