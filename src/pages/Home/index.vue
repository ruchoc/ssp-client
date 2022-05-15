<template>
  <a-layout class="layout">
    <a-layout-header>
      <home-filled @click="$router.push('/')" style="font-size: 32px" />
      <a-input-search
        v-model:value="searchText"
        placeholder="输入关键字"
        style="width: 45%"
      />
      <UserBox></UserBox>
    </a-layout-header>
    <a-layout-content>
      <a-menu v-model:selectedKeys="selectedKeys" mode="horizontal">
        <a-menu-item key="all"> 全部 </a-menu-item>
        <a-menu-item key="new"> 最新 </a-menu-item>
        <a-menu-item key="like"> 点赞排行 </a-menu-item>
        <a-menu-item key="search"> 搜一搜 </a-menu-item>
      </a-menu>
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { ref, watch } from "vue";
import { message } from "ant-design-vue";
import { HomeFilled } from "@ant-design/icons-vue";
import UserBox from "@/components/UserBox";
import { useRouter } from "vue-router";

const searchText = ref("");
const selectedKeys = ref(["all"]);
const $router = useRouter();

watch(
  selectedKeys,
  (selectedKeys) => {
    const key = selectedKeys[0];
    switch (key) {
      case "all":
        $router.push("/allShares");
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
</style>
