<template>
  <a-layout class="layout">
    <a-layout-header>
      <a-input-search
        v-model:value="searchWords"
        placeholder="输入关键字"
        style="width: 45%"
      />
      <div v-if="!isLogin" class="btn-box">
        <a-button @click="$router.push('/register')">注册</a-button>
        <a-button type="primary" @click="$router.push('/login')">登录</a-button>
      </div>
      <div v-else class="user-box">
        <a-avatar>
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <span id="hello">您好，</span>
        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link" @click.prevent> username </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;">个人空间</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">发布分享</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">我的关注</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">设置</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="signout">登出</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </a-layout-header>
    <a-layout-content>
      <a-tabs v-model:activeKey="activeKey" type="card" @change="onTabChange">
        <a-tab-pane v-for="one in tabList" :key="one.key" :tab="one.tab">
          <a-card
            v-for="item in shareList"
            :key="item.id"
            style="margin-bottom: 10px"
          >
            <template #title
              ><span class="title">{{ item.title }}</span></template
            >
            <template #extra
              ><a href="javascript:;">{{ item.author }}</a></template
            >
            <p class="content">{{ item.content }}</p>
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { message } from "ant-design-vue";

// 用户栏
import { UserOutlined } from "@ant-design/icons-vue";
import { isLogin, getCurrentUser } from "@/hooks/user";
function signout() {
  isLogin.value = false;
}
watchEffect(() => {
  if (isLogin.value) {
    getCurrentUser();
  }
});

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
let searchWords = ref("");
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

    .ant-btn {
      margin-right: 15px;
    }

    .user-box {
      #hello {
        padding-left: 15px;
      }
    }
  }

  .ant-layout-content {
    background-color: #fff;
    padding: 25px 20%;

    .title {
      cursor: pointer;
    }

    .content {
      font-size: 24px;
      padding-left: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
