<template>
  <a-comment>
    <template #author>{{ reply.sendUserName }}</template>
    <template #avatar>
      <a-avatar
        @click="
          $router.push({
            path: '/person',
            query: { id: reply.sendUserId },
          })
        "
        :src="getAvatarUrl(reply.sendUserAvatarUrl)"
      />
    </template>
    <template #content>
      <p>
        <span v-if="reply.acceptUserName"
          >回复@{{ reply.acceptUserName }}：</span
        >
        {{ reply.content }}
      </p>
    </template>
    <template #datetime>
      <a-tooltip :title="dayjs(reply.time).format('YYYY-MM-DD HH:mm:ss')">
        <span>{{ dayjs().fromNow() }}</span>
      </a-tooltip>
    </template>
    <template #actions>
      <span @click="replyVisible = true">回复</span>
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
      :maxlength='100'
      placeholder="输入内容"
    ></a-textarea>
  </a-modal>
</template>

<script setup>
import dayjs from "@/global/dayjs";
import { defineProps, defineEmits, onMounted, ref, toRefs } from "vue";
import { getAvatarUrl,userData } from "@/hooks/user";
import { getReply, publishReply, replyData } from "@/hooks/action";
import { message } from "ant-design-vue";

const emit = defineEmits(["reply"]);
const props = defineProps({
  reply: {
    type: Object,
    required: true,
  },
  commentId: {
    type: Number,
    required: true,
  },
});
const { reply, commentId } = toRefs(props);
const replyVisible = ref(false);
const replyContent = ref("");

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
    await publishReply(
      replyContent.value,
      commentId.value,
      reply.value.sendUserId
    );
		replyContent.value=''
    emit("reply");
  } catch (err) {
    console.error(err);
    message.error("发布回复失败");
  } finally {
    replyVisible.value = false;
  }
};
onMounted(async () => {});
</script>

<style lang="less" scoped>
.ant-comment {
  border-bottom: 1px solid #eee;
}
</style>
