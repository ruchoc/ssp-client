import axios from "@/global/axios";

async function uploadAvatar(userId, avatar) {
  const formData = new FormData();
  formData.append("avatar", avatar);
  formData.append("userId", userId);
  const res = await axios.post("/file/uoloadavatar", formData);
  // console.log(res);
}

async function uploadShare(shareId, fileList) {
  const formData = new FormData();
  formData.append("shareId", shareId);
  fileList.forEach((file) => formData.append("pic", file.originFileObj));
  const res = await axios.post("/file/uoloadpic", formData);
  // console.log(res);
}

export { uploadAvatar, uploadShare };
