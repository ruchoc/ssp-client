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
      @change='pageChange'
    />
  </div>
</template>

<script setup>
import { pageSize } from "@/global/config";
import Share from "@/components/Share";
import { shareData, getFavoriteShareList,getShareTotal } from "@/hooks/share";
import { onMounted, ref } from "@vue/runtime-core";
import { message } from "ant-design-vue";

const current = ref(1);
const total = ref(0);
onMounted(() => {
  getSharePage();
});
const getSharePage = async () => {
  try {
    await getFavoriteShareList(current.value, pageSize);
    await getShareTotal();
    total.value = shareData.shareTotal;
  } catch (err) {
    console.error(err);
    message.error("获取分享列表失败");
  }
};
const pageChange=()=>{
  getSharePage()
}
</script>

<style lang="less" scoped>
.pagination {
  float: right;
  padding: 16px 0 125px;
}
</style>
