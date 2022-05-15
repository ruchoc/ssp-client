import { reactive } from "vue";
import axios from "@/global/axios";
import { pageSize } from "@/global/config";

const shareData = reactive({
  shareList: [],
  shareTotal: 0,
});

async function getShareById(id) {
  const res = await axios.get(`/share/get?shareId=${id}`);
  // console.log(res);
  const { data } = res;
  return data;
}

async function getPublicShareList(begin, length) {
  begin--;
  begin *= pageSize;
  const res = await axios.get(
    `/share/getpublicsharelist?begin=${begin}&length=${length}`
  );
  // console.log(res);
  const { data } = res;
  shareData.shareList = data;
}

async function getNewestShareList(begin, length) {
  begin--;
  begin *= pageSize;
  const res = await axios.get(
    `/share/getnewestshare?begin=${begin}&length=${length}`
  );
  // console.log(res);
  const { data } = res;
  shareData.shareList = data;
}

async function getFavoriteShareList(begin, length) {
  begin--;
  begin *= pageSize;
  const res = await axios.get(
    `/share/getfavoriteshare?begin=${begin}&length=${length}`
  );
  // console.log(res);
  const { data } = res;
  shareData.shareList = data;
}

async function getMyShareList(begin, length) {
  begin--;
  begin *= pageSize;
  const res = await axios.get(
    `/share/getmysharelist?begin=${begin}&length=${length}`
  );
  // console.log(res);
  const { data } = res;
  shareData.shareList = data;
}

async function searchShare(begin, length, content) {
  begin--;
  begin *= pageSize;
  const res = await axios.get(
    `/share/searchshare?begin=${begin}&length=${length}&content=${content}`
  );
  // console.log(res);
  const { data } = res;
  shareData.shareList = data;
}

async function getSearchShareTotal(content) {
  const res = await axios.get(`/share/getsearchsharenum?content=${content}`);
  // console.log(res);
  const { data } = res;
  shareData.shareTotal = data;
}

async function getHotSearch(content) {
  const res = await axios.get("/hotsearch/getlist");
  // console.log(res);
  const { data } = res;
  return data
}

async function publishShare(share) {
  const { data: id } = await axios.post("/share/publish", share);
  return id;
}

async function deleteShare(shareId) {
  const res = await axios.delete(`/share/delete/${shareId}`);
  // console.log(res);
}

async function updateShare(id, content) {
  const res = await axios.post("/share/updatecontent", { id, content });
  // console.log(res);
}

async function setShareState(id, state) {
  const res = await axios.get(
    `/share/setsharestate?shareId=${id}&state=${state}`
  );
  // console.log(res);
}

const ImagePathPrefix = "/api/file/get?url=";
function getImageUrl(url) {
  return ImagePathPrefix + url;
}

async function getShareTotal() {
  const res = await axios.get("/share/getpublicsharenum");
  // console.log(res);
  const { data } = res;
  shareData.shareTotal = data;
}

async function getMyShareTotal() {
  const res = await axios.get("/share/getmysharenum");
  // console.log(res);
  const { data } = res;
  shareData.shareTotal = data;
}

async function collect(shareId) {
  const res = await axios.post("/collect/add", { shareId });
  // console.log(res);
}

async function deleteCollect(shareId) {
  const res = await axios.delete(`/collect/cancel/${shareId}`);
  // console.log(res);
}

async function getMyCollect(begin, length) {
  begin--;
  begin *= pageSize;
  const res = await axios.get(`/collect/get?begin=${begin}&length=${length}`);
  // console.log(res);
  const { data } = res;
  shareData.shareList = data;
}

async function getCollectTotal() {
  const res = await axios.get("/collect/getcollectnum");
  // console.log(res);
  const { data } = res;
  shareData.shareTotal = data;
}

export {
  shareData,
  getHotSearch,
  getSearchShareTotal,
  collect,
  deleteCollect,
  getCollectTotal,
  getMyCollect,
  deleteShare,
  getShareTotal,
  getMyShareTotal,
  getShareById,
  getPublicShareList,
  getNewestShareList,
  getFavoriteShareList,
  getMyShareList,
  searchShare,
  publishShare,
  updateShare,
  setShareState,
  getImageUrl,
};
