import axios from "@/global/axios";
import { reactive } from "vue";
import { pageSize } from "@/global/config";

const commentData = reactive({
  commentList: [],
  commentTotal: 0,
});
const replyData = reactive({
  replyList: [],
  replyTotal: 0,
});

async function addLike(shareId) {
  const res = await axios.post("/like/add", { shareId });
  // console.log(res);
}

async function deleteLike(shareId) {
  const res = await axios.delete(`/like/cancel/${shareId}`);
  // console.log(res);
}

async function publishComment(shareId, content) {
  const res = await axios.post("/comment/publish", { shareId, content });
  // console.log(res);
}

async function getComment(shareId, begin, length) {
  begin--;
  begin *= pageSize;
  const res = await axios.get(
    `/comment/getcomment?shareId=${shareId}&begin=${begin}&length=${length}`
  );
  // console.log(res);
  const { data } = res;
  commentData.commentList = data;
  return data
}

async function getCommentTotal(shareId) {
  const res = await axios.get(`/comment/getcommentnum?shareId=${shareId}`);
  // console.log(res);
  const { data } = res;
  commentData.commentTotal = data;
  return data
}

async function publishReply(content, commentId, acceptUserId) {
  const res = await axios.post("/reply/publish", {
    content,
    commentId,
    acceptUserId,
  });
  // console.log(res);
}

async function getReply(commentId, begin, length) {
  begin--;
  begin *= pageSize;
  const res = await axios.get(
    `/reply/getreply?commentId=${commentId}&begin=${begin}&length=${length}`
  );
  // console.log(res);
  const { data } = res;
  replyData.replyList = data;
  return data
}

async function getReplyTotal(commentId) {
  const res = await axios.get(`/reply/getreplynum?commentId=${commentId}`);
  // console.log(res);
  const { data } = res;
  replyData.replyTotal = data;
  return data
}

export {
  commentData,
  replyData,
  deleteLike,
  getCommentTotal,
  getReplyTotal,
  addLike,
  publishComment,
  getComment,
  publishReply,
  getReply,
};
