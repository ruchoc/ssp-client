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
      <a-tabs v-model:activeKey="activeKey" type="card" @change="onTabChange">
        <a-tab-pane v-for="one in tabList" :key="one.key" :tab="one.tab">
          <a-card
            v-for="item in shareList"
            :key="item.id"
            style="margin-bottom: 10px"
          >
            <a-card-meta>
              <template #title>
                <span class="content-title">{{ item.title }}</span></template
              >
              <template #avatar>
                <div class="author">
                  <a-avatar>
                    <template #icon></template> </a-avatar
                  >{{ item.author }}
                </div></template
              >
              <template #description>
                <div class="content-text">
                  {{ item.content }}<img :src="item.picUrlList[0]" /></div
              ></template>
            </a-card-meta>
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { ref } from "vue";
import { message } from "ant-design-vue";
import { HomeFilled } from "@ant-design/icons-vue";
import UserBox from "@/components/UserBox";


// 分享列表
import { shareList } from "@/hooks/share";
const tabList = [
  {
    key: "1",
    tab: "搜一搜",
  },
  {
    key: "2",
    tab: "点赞榜",
  },
  {
    key: "3",
    tab: "最新",
  },
];
let searchText = ref("");
let activeKey = ref("1");
function onTabChange(activeKey) {}
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
    padding: 25px 20%;

    .author {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .content-title {
      font-size: 18px;
      font-weight: 1100;
    }

    .content-text {
      color: #333;
      font-size: 16px;
      img {
        float: right;
        max-height: 200px;
        max-width: 240px;
      }
    }
  }
}
</style>
