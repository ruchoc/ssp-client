<template>
  <a-card>
    <a-card-meta>
      <template #avatar>
        <a-avatar
          style="cursor: pointer"
          @click="
            $router.push({
              path: '/person',
              query: { id: share.userId },
            })
          "
          :src="getAvatarUrl(share.userAvatarUrl)"
      /></template>
      <template #title
        >{{ share.username }}
        <div class="time">
          <a-tooltip :title="dayjs(share.time).format('YYYY-MM-DD HH:mm:ss')">
            <span>{{ dayjs(share.time).fromNow() }}</span>
          </a-tooltip>
        </div>
      </template>
      <template #description
        ><p
          class="share-content"
          style="cursor: pointer"
          @click="
            $router.push({
              path: '/share',
              query: { id: share.id },
            })
          "
        >
          {{ share.content }}
        </p>
        <div class="imageBox">
          <a-image-preview-group>
            <a-image
              v-for="pic in share.pictureList"
              :key="pic.id"
              :height="80"
              :width="80"
              :src="getImageUrl(pic.url)"
            />
          </a-image-preview-group>
        </div>
      </template>
    </a-card-meta>
    <template #actions>
      <div @click="onLike">
        <like-filled v-if="share.liked" />
        <like-outlined v-else /><span>{{ share.likeNum }}</span>
      </div>
      <div @click="onComment">
        <comment-outlined /><span>{{ share.commentNum }}</span>
      </div>
      <div @click="onCollect">
        <star-filled v-if="share.collected" />
        <star-outlined v-else /><span>{{ share.collectNum }}</span>
      </div>
    </template>
  </a-card>
  <a-card v-if="commentVisible">
    <div class="comment clearfix">
      <a-textarea
        v-model:value="commentContent"
        :maxlength='100'
        placeholder="输入内容"
      ></a-textarea>
      <a-button type="primary" @click="onPublishComment">发表</a-button>
    </div>
    <Comment
      v-for="comment in commentList"
      :key="comment.id"
      :comment="comment"
    ></Comment>
    <div class="pagination">
      <a-pagination
        v-model:current="current"
        v-model:total="total"
        v-model:pageSize="pageSize"
        hideOnSinglePage
        show-less-items
        @change="pageChange"
      />
    </div>
  </a-card>
</template>

<script setup>
import Comment from "./Comment.vue";
import dayjs from "@/global/dayjs";
import {
  LikeFilled,
  LikeOutlined,
  CommentOutlined,
  StarOutlined,
  StarFilled,
} from "@ant-design/icons-vue";
import { defineProps, ref, reactive, toRefs } from "vue";
import { getAvatarUrl, userData } from "@/hooks/user";
import { getImageUrl } from "@/hooks/share";
import {
  commentData,
  deleteLike,
  addLike,
  publishComment,
  getComment,
  getCommentTotal,
} from "@/hooks/action";
import { deleteCollect, collect } from "@/hooks/share";
import { message } from "ant-design-vue";
import { pageSize } from "@/global/config";

const props = defineProps({
  share: {
    type: Object,
    required: true,
  },
});
const { share } = toRefs(props);
const commentVisible = ref(false);
const commentContent = ref("");
const current = ref(1);
const total = ref(0);
const commentList=ref([])

const getCommentPage = async () => {
  commentList.value= await getComment(share.value.id, current.value, pageSize);
  total.value= await getCommentTotal(share.value.id);
};
const pageChange = () => {
  getCommentPage();
};
const onPublishComment = async () => {
  if (!userData.isLogin) {
    message.info("请先登录");
    return;
  }
  commentContent.value = commentContent.value.trim();
  if (commentContent.value.length === 0) {
    message.info("请先输入内容");
    return;
  }
  try {
    await publishComment(share.value.id, commentContent.value);
    commentContent.value = "";
    share.value.commentNum++;
    await getCommentPage();
  } catch (err) {
    console.error(err);
    message.error("发布评论失败");
  }
};
const onLike = async () => {
  try {
    if (!userData.isLogin) {
      message.info("请先登录");
      return;
    }
    if (share.value.liked) {
      cancleLike();
      return;
    }
    await addLike(share.value.id);
    share.value.likeNum++;
    share.value.liked = true;
  } catch (err) {
    console.error(err);
    message.info("点赞失败");
  }
};
const cancleLike = async () => {
  try {
    await deleteLike(share.value.id);
    share.value.likeNum--;
    share.value.liked = false;
  } catch (err) {
    console.error(err);
    message.error("取消点赞失败");
  }
};
const onComment = () => {
  commentVisible.value = !commentVisible.value;
  getCommentPage();
};
const onCollect = async () => {
  try {
    if (!userData.isLogin) {
      message.info("请先登录");
      return;
    }
    if (share.value.collected) {
      cancleCollect();
      return;
    }
    await collect(share.value.id);
    share.value.collectNum++;
    share.value.collected = true;
  } catch (err) {
    console.error(err);
    message.error("收藏失败");
  }
};
const cancleCollect = async () => {
  try {
    await deleteCollect(share.value.id);
    share.value.collectNum--;
    share.value.collected = false;
  } catch (err) {
    console.error(err);
    message.error("取消收藏失败");
  }
};
</script>

<style lang="less" scoped>
.pagination {
  float: right;
  padding: 12px 0 0;
}
.comment {
  .ant-btn {
    float: right;
    margin-top: 12px;
  }
}
.share-content {
  font-size: 16px;
  color: #333;
}
.imageBox {
  display: flex;
  gap: 8px;
}
.time {
  float: right;
  color: #999;
  font-size: 12px;
}
</style>
