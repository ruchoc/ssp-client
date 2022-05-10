import axios from "@/global/axios";

async function uploadAvatar(userId, avatar) {
  const formData = new FormData();
  formData.append("avatar", avatar);
  formData.append("userId", userId);
  const res = await axios.post("/file/uoloadavatar", formData);
  // console.log(res);
}

export { uploadAvatar };
