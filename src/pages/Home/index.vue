<template>
  <a-layout class="layout">
    <a-layout-header>
      <home-filled @click="$router.push('/')" style="font-size: 32px" />
      <a-dropdown :trigger="['click']">
        <a-input-search
          v-model:value="searchText"
          placeholder="输入关键字"
          style="width: 45%"
          @search="search"
        />
        <template #overlay>
          <a-menu>
            <a-menu-item
              @click="searchText = item.content"
              v-for="(item, index) in hotSearch"
              :key="index"
            >
              <span class="hot-search">{{ item.content }}</span>
              <span>{{ item.times }}次</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <UserBox></UserBox>
    </a-layout-header>
    <a-layout-content>
      <a-menu v-model:selectedKeys="selectedKeys" mode="horizontal">
        <a-menu-item key="all"> 全部 </a-menu-item>
        <a-menu-item key="new"> 最新 </a-menu-item>
        <a-menu-item key="like"> 点赞排行 </a-menu-item>
      </a-menu>
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { message } from "ant-design-vue";
import { HomeFilled } from "@ant-design/icons-vue";
import UserBox from "@/components/UserBox";
import { useRouter } from "vue-router";
import { getHotSearch } from "@/hooks/share";

const searchText = ref("");
const selectedKeys = ref(["all"]);
const $router = useRouter();
const hotSearch = ref([]);

onMounted(async () => {
  try {
    hotSearch.value = await getHotSearch();
  } catch (err) {
    console.error(err);
    message.error("获取热搜失败");
  }
});
const search = () => {
  searchText.value = searchText.value.trim();
  $router.push({
    path: "/searchShares",
    query: { content: searchText.value },
  });
  searchText.value = "";
};
watch(
  selectedKeys,
  (selectedKeys) => {
    const key = selectedKeys[0];
    switch (key) {
      case "all":
        $router.push("/allShares");
        break;
      case "new":
        $router.push("/newShares");
        break;
      case "like":
        $router.push("/likeShares");
        break;
    }
  },
  { immediate: true }
);
</script>

<style lang="less" scoped>
.layout {
  .ant-layout-header {
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .ant-layout-content {
    background-color: #fff;
    padding: 25px 15%;
  }
}

.hot-search {
  display: inline-block;
  width: 80px;
  padding-right: 20px;
  overflow: hidden;
}
</style>
