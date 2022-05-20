<template>
  <a-list item-layout="horizontal" :data-source="shareData.shareList">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-comment style="width: 100%">
          <template #author>{{ item.username }}</template>
          <template #avatar>
            <a-avatar
              @click="
                $router.push({
                  path: '/person',
                  query: { id: item.userId },
                })
              "
              :src="getAvatarUrl(item.userAvatarUrl)"
            />
          </template>
          <template #content>
            <p class="content">
              {{ item.content }}
            </p>
          </template>
          <template #datetime>
            <a-tooltip :title="dayjs(item.time).format('YYYY-MM-DD HH:mm:ss')">
              <span>{{ dayjs(item.time).fromNow() }}</span>
            </a-tooltip>
          </template>
          <template #actions>
            <span
              @click="
                $router.push({
                  path: '/share',
                  query: { id: item.id },
                })
              "
              >详情</span
            >
          </template>
          <div class="but-box">
            <a-button
              v-if="item.collected"
              type="primary"
              danger
              @click="onDelete(item)"
              >删除</a-button
            >
            <a-button v-else type="primary" @click="onCollect(item)"
              >收藏</a-button
            >
          </div>
        </a-comment>
      </a-list-item>
    </template>
  </a-list>
  <div class="clearfix">
    <div class="pagination">
      <a-pagination
        v-model:current="current"
        v-model:total="shareData.shareTotal"
        v-model:pageSize="pageSize"
        show-less-items
        @change="pageChange"
        hideOnSinglePage
      />
    </div>
  </div>
</template>
<script setup>
import dayjs from "@/global/dayjs";
import { onMounted, ref, reactive, computed } from "vue";
import {
  getCollectTotal,
  getMyCollect,
  shareData,
  deleteCollect,
  collect,
} from "@/hooks/share";
import { message } from "ant-design-vue";
import { pageSize } from "@/global/config";
import { getAvatarUrl, userData } from "@/hooks/user";

const current = ref(1);

const onCollect = async (share) => {
  if (!userData.isLogin) {
    message.info("请先登录");
    return;
  }
  try {
    await collect(share.id);
    share.collected = true;
  } catch (err) {
    console.error(err);
    message.error("收藏失败");
  }
};
const onDelete = async (share) => {
  if (!userData.isLogin) {
    message.info("请先登录");
    return;
  }
  try {
    await deleteCollect(share.id);
    share.collected = false;
  } catch (err) {
    console.error(err);
    message.error("取消收藏失败");
  }
};
const getPage = async () => {
  if (!userData.isLogin) {
    message.info("请先登录");
    return;
  }
  try {
    await getMyCollect(current.value, pageSize);
    await getCollectTotal();
  } catch (err) {
    console.error(err);
    message.error("获取收藏列表失败");
  }
};
const pageChange = () => {
  getPage();
};
onMounted(() => {
  getPage();
});
</script>

<style lang="less" scoped>
.content {
  margin-right: 160px;
}
.pagination {
  float: right;
  padding: 16px 0 125px;
}
.but-box {
  position: absolute;
  right: 0;
  top: 18px;
  display: flex;
  gap: 10px;
}
</style>
