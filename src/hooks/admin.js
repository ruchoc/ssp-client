import { reactive } from "vue";
import axios from "@/global/axios";
import { pageSize } from "@/global/config";
import { getCurrentUser } from "@/hooks/user";

const userData = reactive({
	isLogin:false,
  userList: [],
  userTotal: 0,
});

const banData = reactive({
  banList: [],
  banTotal: 0,
});

async function login(name, password) {
  const res = await axios.post("/admin/signin", { name, password });
	userData.isLogin=true
  // console.log(res);
}

async function setUserStatus(id, locked) {
  const res = await axios.post("/admin/updateuserlockstatus", { id, locked });
  // console.log(res);
}

async function getAllUsers(begin, length) {
  begin--;
  begin *= pageSize;
  const res = await axios.get(
    `/admin/getuserlist?begin=${begin}&length=${length}`
  );
  // console.log(res);
  const { data } = res;
  userData.userList = data;
}

async function getUserTotal() {
  const res = await axios.get("/admin/getusernum");
  // console.log(res);
  const { data } = res;
  userData.userTotal = data;
}

async function getBannedWords(begin, length) {
  begin--;
  begin *= pageSize;
  const res = await axios.get(
    `/admin/getsensitivekeyword?begin=${begin}&length=${length}`
  );
  // console.log(res);
  const { data } = res;
  banData.banList = data;
}

async function getBannedWordTotal() {
  const res = await axios.get("/admin/getsensitivekeywordnum");
  // console.log(res);
  const { data } = res;
  banData.banTotal = data;
}

async function addBannedWord(keyword) {
  const res = await axios.post("/admin/insertsensitivekeyword", { keyword });
  // console.log(res);
}

async function deleteBannerWord(id) {
  const res = await axios.delete(`/admin/deletesensitivekeyword?id=${id}`);
  // console.log(res);
}

const whetherLogin = async () => {
  const userBasicInfo = await getCurrentUser();
  return userBasicInfo && userBasicInfo.role == "admin";
};

export {
  userData,
  banData,
  whetherLogin,
  login,
  getAllUsers,
  getUserTotal,
  setUserStatus,
  getBannedWords,
  getBannedWordTotal,
	addBannedWord,
	deleteBannerWord
};
