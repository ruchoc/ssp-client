<template>
  <a-upload
    :maxCount="1"
    list-type="picture-card"
    class="avatar-uploader"
    :show-upload-list="false"
    :before-upload="beforeUpload"
  >
    <img :src="imageUrl" />
  </a-upload>
</template>

<script setup>
import { getBase64 } from "@/global/utils";
import { userData, getAvatarUrl, getCurrentUserInfo } from "@/hooks/user";
import { uploadAvatar } from "@/hooks/file";
import { ref, defineExpose } from "vue";
import { message } from "ant-design-vue";

let imageUrl = ref("");
imageUrl.value = getAvatarUrl();
let avatar,isPass

const beforeUpload = async (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  const isSmall = file.size / 1024 < 500;
  if (!isJpgOrPng) {
    message.error("你只能上传图片");
    isPass = false;
  }
  if (!isSmall) {
    message.error("图片必需小于500KB!");
    isPass = false;
  } else {
    imageUrl.value = await getBase64(file);
    isPass = true;
  }
  avatar=file
  return false;
};

const handleUpload = async () => {
  if (!isPass||avatar) {
    isPass=true
    return
  }
  if (!userData.isLogin) {
    message.error("您尚未登录");
    return;
  }
  try {
    await uploadAvatar(userData.userBasicInfo.id, avatar);
    message.success("上传头像成功");
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
</style>
