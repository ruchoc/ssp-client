<template>
  <a-upload
    :maxCount="1"
    :fileList="fileList"
    list-type="picture-card"
    class="avatar-uploader"
    :show-upload-list="false"
    :before-upload="beforeUpload"
  >
    <img :src="imageUrl" />
  </a-upload>
</template>

<script setup>
import { userData, getAvatarUrl ,getCurrentUserInfo} from "@/hooks/user";
import { uploadAvatar } from "@/hooks/file";
import { ref, defineExpose } from "vue";
import { message } from "ant-design-vue";

let imageUrl = ref('');
imageUrl.value=getAvatarUrl()
const fileList = ref([]);
let isJpgOrPng, isLt2M;


const beforeUpload = (file) => {
  fileList.value = [file];
  isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  isLt2M = file.size / 1024 / 1024 < 2;
  return false;
};

const handleUpload = async () => {
  if (!userData.isLogin) {
    message.error("您尚未登录");
    return;
  }
  if (!isJpgOrPng) {
    message.error("你只能上传图片");
    return;
  }
  if (!isLt2M) {
    message.error("图片必需小于2MB!");
    return;
  }
  const file = fileList.value[0];
  try {
    await uploadAvatar(userData.userBasicInfo.id, file);
    message.success('上传头像成功')
    await getCurrentUserInfo()
    imageUrl.value=getAvatarUrl()
  } catch (err) {
    console.error(err);
    message.error("上传头像失败");
  }
};
defineExpose({ handleUpload });
</script>

<style lang="less" scoped>
img {
  width: 100%;
  height: 100%;
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}
.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
