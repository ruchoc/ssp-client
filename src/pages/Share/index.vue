<template>
  <a-layout>
    <a-layout-header class="header">
      <home-filled @click="$router.push('/')" style="font-size: 32px" />
      <UserBox></UserBox>
    </a-layout-header>
    <a-layout-content>
      <a-card class="card">
        <Share v-if="share" :share="share"></Share>
      </a-card>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import Share from "@/components/Share";
import { HomeFilled } from "@ant-design/icons-vue";
import UserBox from "@/components/UserBox";
import { useRoute } from "vue-router";
import { onMounted, ref } from "@vue/runtime-core";
import { getShareById } from "@/hooks/share";
import { message } from "ant-design-vue";

const route = useRoute();
const id = ref("");
const share=ref(null)
onMounted(async () => {
  try {
    id.value = route.query.id;
    share.value = await getShareById(id.value);
  } catch (err) {
    console.error(err);
    message.error("获取分享信息失败");
  }
});
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  background-color: #eee !important;
  justify-content: space-between;
}
.card{
  padding: 0 15%;
  min-height: 85vh;
}
</style>
