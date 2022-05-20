<template>
  <a-layout class="layout">
    <a-layout-header>
      <home-filled
        @click="$router.push('/allShares')"
        style="font-size: 32px"
      />
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
              @click="onHotSearch(item.content)"
              v-for="(item, index) in hotSearch"
              :key="index"
            >
              <div class="hot-box">
                <span :class="{ 'hot-order': true, 'top-3': index < 3 }">{{
                  index + 1
                }}</span>
                <span class="hot-content">{{ item.content }}</span>
                <span class="hot-times">{{ item.times }}次</span>
              </div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <UserBox />
    </a-layout-header>
    <a-layout-content>
      <div class="card-box">
        <Card style="margin-bottom:20px" title="最受欢迎" :isNewest="false" />
        <Card title="最新分享" :isNewest="true" />
      </div>
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
import Card from "@/components/Card";
import { nextTick, onMounted, ref, watch } from "vue";
import { message } from "ant-design-vue";
import { HomeFilled } from "@ant-design/icons-vue";
import UserBox from "@/components/UserBox";
import { useRouter } from "vue-router";
import { getHotSearch } from "@/hooks/share";

const searchText = ref("");
const selectedKeys = ref(["all"]);
const $router = useRouter();
const hotSearch = ref([]);

const onHotSearch = (content) => {
  searchText.value = content;
  search();
};
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
    padding: 25px 30% 0 10%;
    position: relative;
  }

  .card-box {
    width: 21%;
    position: fixed;
    right: 7%;
    top: 85px;
  }
}

.hot-box {
  display: flex;
  justify-items: center;
  font-size: 16px;

  .hot-times {
    padding-left: 16px;
    color: #aaa;
    font-size: 14px;
  }

  .hot-content {
    font-weight: 450;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 500px;
  }

  .hot-order {
    padding-right: 10px;
    font-size: 20px;
    font-weight: bold;
    color: #ff8b11;
  }
  .hot-order.top-3 {
    color: #f26d5f;
  }
}
</style>
