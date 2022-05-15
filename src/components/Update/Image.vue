<template>
  <div class="clearfix">
    <a-upload
      v-model:file-list="fileList"
      list-type="picture-card"
      :beforeUpload="beforeUpload"
      multiple
      :showUploadList="{ showPreviewIcon: false }"
      :maxCount="9"
    >
      <div v-if="fileList.length < 9">
        <plus-outlined />
        <div style="margin-top: 8px">Upload</div>
      </div>
    </a-upload>
  </div>
</template>

<script setup>
import { message, Upload } from "ant-design-vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { ref, defineExpose } from "vue";
import { uploadShare } from "@/hooks/file";
import { userData } from "@/hooks/user";
const fileList = ref([]);
let isPass;

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  const isSmall = file.size / 1024 / 1024 < 5;
  if (!isJpgOrPng) {
    message.error("你只能上传图片");
    isPass = false;
    return Upload.LIST_IGNORE;
  }
  if (!isSmall) {
    message.error("图片必需小于5MB!");
    isPass = false;
    return Upload.LIST_IGNORE;
  }
  isPass = true;
  return false;
};
const handleUpload = async (shareId) => {
  if (!isPass||fileList.value.length==0) {
    isPass = true;
    return;
  }
  if (!userData.isLogin) {
    message.error("您尚未登录");
    return;
  }
  try {
    await uploadShare(shareId, fileList.value);
    message.success("上传图像成功");
  } catch (err) {
    console.error(err);
    message.error("上传图像失败");
  }
};
defineExpose({ handleUpload });
</script>

<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
