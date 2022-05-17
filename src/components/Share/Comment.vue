<template>
  <a-comment>
    <template #author>{{ comment.username }}</template>
    <template #avatar>
      <a-avatar
        @click="
          $router.push({
            path: '/person',
            query: { id: comment.userId },
          })
        "
        :src="getAvatarUrl(comment.avatarUrl)"
      />
    </template>
    <template #content>
      <p>
        {{ comment.content }}
      </p>
    </template>
    <template #datetime>
      <a-tooltip :title="dayjs(comment.time).format('YYYY-MM-DD HH:mm:ss')">
        <span>{{ dayjs(comment.time).fromNow() }}</span>
      </a-tooltip>
    </template>
    <template #actions>
      <span @click="replyVisible = true">回复</span>
      <span @click="getReplyPage">共{{ total }}条回复</span>
    </template>
  </a-comment>
  <a-modal
    v-model:visible="replyVisible"
    title="回复"
    @ok="onReply"
    okText="提交"
    cancelText="取消"
  >
    <a-textarea
      v-model:value="replyContent"
      :maxlength="100"
      placeholder="输入内容"
    ></a-textarea>
  </a-modal>
  <a-modal v-model:visible="replyModalVisible" title="回复列表" :footer="null">
    <Reply
      v-for="reply in replyList"
      :key="reply.id"
      :reply="reply"
      :commentId="comment.id"
      @reply="pageChange"
    ></Reply>
    <div class="clearfix">
      <div class="pagination">
        <a-pagination
          v-model:current="current"
          v-model:total="total"
          v-model:pageSize="pageSize"
          show-less-items
          hideOnSinglePage
          @change="pageChange"
        />
      </div>
    </div>
  </a-modal>
</template>

<script setup>
import Reply from "./Reply.vue";
import dayjs from "@/global/dayjs";
import { defineProps, onMounted, ref, toRefs } from "vue";
import { getAvatarUrl, userData } from "@/hooks/user";
import {
  getReply,
  publishReply,
  getReplyTotal,
  replyData,
} from "@/hooks/action";
import { message } from "ant-design-vue";
import { pageSize } from "@/global/config";

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
});
const { comment } = toRefs(props);
const replyVisible = ref(false);
const replyContent = ref("");
const replyModalVisible = ref(false);
const current = ref(1);
const total = ref(0);
const replyList = ref([]);

const pageChange = () => {
  getReplyPage();
};
const getReplyPage = async () => {
  replyModalVisible.value = true;
  try {
    replyList.value = await getReply(comment.value.id, current.value, pageSize);
    total.value = await getReplyTotal(comment.value.id);
  } catch (err) {
    console.error(err);
    message.error("获取回复信息失败");
  }
};
const onReply = async () => {
  if (!userData.isLogin) {
    message.info("请先登录");
    return;
  }
  replyContent.value = replyContent.value.trim();
  if (replyContent.value.length === 0) {
    message.info("请先输入内容");
    return;
  }
  try {
    await publishReply(replyContent.value, comment.value.id);
    total.value++;
  } catch (err) {
    console.error(err);
    message.error("发布回复失败");
  } finally {
    replyVisible.value = false;
  }
};
onMounted(async () => {
  try {
    await getReplyTotal(comment.value.id);
    total.value = replyData.replyTotal;
  } catch (err) {
    console.error(err);
    message.error("获取回复信息失败");
  }
});
</script>

<style lang="less" scoped>
.pagination {
  float: right;
  padding: 12px 0 0;
}
.ant-comment {
  border-bottom: 1px solid #eee;
}
</style>
