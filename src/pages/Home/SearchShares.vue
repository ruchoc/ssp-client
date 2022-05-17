<template>
  <a-space
    style="padding-top: 16px; width: 100%"
    direction="vertical"
    size="middle"
  >
    <Share
      v-for="share in shareData.shareList"
      :key="share.id"
      :share="share"
    ></Share>
  </a-space>
  <div class="pagination">
    <a-pagination
      v-model:current="current"
      v-model:total="total"
      v-model:pageSize="pageSize"
      show-less-items
      @change="pageChange"
    />
  </div>
</template>

<script setup>
import { pageSize } from "@/global/config";
import Share from "@/components/Share";
import { shareData, searchShare, getSearchShareTotal } from "@/hooks/share";
import { onMounted, ref, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { message } from "ant-design-vue";

const route = useRoute();
const current = ref(1);
const total = ref(0);
const content = ref("");

watch(
  () => route.query.content,
  (value) => {
    content.value = value;
    getSharePage();
  }
);
onMounted(() => {
  try {
    content.value = route.query.content;
    getSharePage();
  } catch (err) {
    console.error(err);
    message.error("获取分享列表失败");
  }
});
const getSharePage = async () => {
  if (!content.value) return;
  await searchShare(current.value, pageSize, content.value);
  await getSearchShareTotal();
  total.value = shareData.shareTotal;
};
const pageChange = () => {
  getSharePage();
};
</script>

<style lang="less" scoped>
.pagination {
  float: right;
  padding: 16px 0 125px;
}
</style>
