import axios from "@/global/axios";
import { reactive } from "vue";

const userData = reactive({
  isLogin: false,
  userBasicInfo: {},
  userInfo: {},
  searchUserList: [],
  searchBasicInfo: {},
  searchInfo: {},
});

async function register(name, password) {
  const res = await axios.post("/user/register", {
    name,
    password,
  });
  // console.log(res);
}

async function login(name, password) {
  const res = await axios.post("/user/signin", {
    name,
    password,
  });
  // console.log(res);
  const { data } = res;
  if (!data) throw new Error("登录失败");
  userData.isLogin = data;
}

async function getCurrentUser() {
  const res = await axios.get("/user/getcurrentuser");
  // console.log(res);
  const { data } = res;
  userData.userBasicInfo = { ...data };
}

async function getCurrentUserInfo() {
  const res = await axios.get("/user/getcurrentuserinfo");
  // console.log(res);
  const { data } = res;
  userData.userInfo = { ...data };
}

async function getUser(id) {
  const res = await axios.get(`/user/getuser?userId=${id}`);
  // console.log(res);
  const {data}=res
  userData.searchBasicInfo={...data}
}

async function searchUser(name) {
  const res = await axios.get(`/user/searchuser?username=${name}`);
  // console.log(res);
  const { data } = res;
  userData.searchUserList = data;
}

async function getUserInfo(id) {
  const res = await axios.get(`/user/getuserinfo?userId=${id}`);
  // console.log(res);
  const {data} = res
  userData.searchInfo={...data}
}

async function updateUserName(name) {
  const res = await axios.post("/user/updateusername", { name });
  // console.log(res);
}

async function updateUserInfo(userInfo) {
  const res = await axios.post("/user/updateuserinfo", userInfo);
  // console.log(res);
}

async function updatePassword(password) {
  const res = await axios.post("/user/updateuserpassword", { password });
  // console.log(res);
}

const avatarPathPrefix = "/api/file/get?url=";
function getAvatarUrl(url = "") {
  if (!url) return avatarPathPrefix + userData.userInfo.avatarUrl;
  return avatarPathPrefix + url;
}

export {
  login,
  register,
  getCurrentUser,
  getCurrentUserInfo,
  getUser,
  getUserInfo,
  updateUserName,
  updatePassword,
  updateUserInfo,
  searchUser,
  userData,
  getAvatarUrl,
};
