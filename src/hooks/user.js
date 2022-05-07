import axios from "@/global/axios";
import { ref, reactive } from "vue";

const isLogin = ref(false);
const userBasicInfo = reactive({});
const userInfo = reactive({});

async function register(name, password) {
  const res = await axios.post("/user/register", {
    name,
    password,
  });
  console.log(res);
}

async function login(name, password) {
  const { data } = await axios.post("/user/signin", {
    name,
    password,
  });
  isLogin.value = data;
}

async function getCurrentUser() {
  const res = await axios.get("/user/getcurrentuser");
  console.log(res);
}

async function getCurrentUserInfo() {
  const res = await axios.get("/user/getcurrentuserinfo");
  console.log(res);
}

async function getUser(id) {
  const res = await axios.get(`/user/getuser?userId=${id}`);
  console.log(res);
}

async function searchUser(name) {
  const res = await axios.get(`/user/searchuser?username=${name}`);
  console.log(res);
}

async function getUserInfo(id) {
  const res = await axios.get(`/user/getuserinfo?userId=${id}`);
  console.log(res);
}

async function updateUserName(name) {
  const res = await axios.post("/user/updateusername", { name });
  console.log(res);
}

async function updateUserInfo(userInfo) {
  const res = await axios.post("/user/updateuserinfo", userInfo);
  console.log(res);
}

async function updatePassword(password) {
  const res = await axios.post("/user/updateuserpassword", { password });
  console.log(res);
}

export {
  login,
  register,
  getCurrentUser,
  getCurrentUserInfo,
  getUser as getuser,
  getUserInfo,
  updateUserName,
  updatePassword,
  updateUserInfo,
  searchUser,
  isLogin,
  userBasicInfo,
  userInfo,
};
