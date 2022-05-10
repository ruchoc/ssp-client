import { ref, reactive } from "vue";
import axios from "@/global/axios";

const shareList = ref([{
  id:'1',
  author:'asd',
  title:'asd',
  content:'ddd',
  picUrlList:['https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'],
}]);
const share = reactive({});

async function getShareById(id) {
  const res = axios.get(`/share/get?shareId=${id}`);
  console.log(res);
}

async function getPublicShareList(begin, length) {
  const res = axios.get(
    `/share/getpublicsharelist?begin=${begin}&length=${length}`
  );
  console.log(res);
}

async function getNewestShareList(begin, length) {
  const res = axios.get(
    `/share/getnewestshare?begin=${begin}&length=${length}`
  );
  console.log(res);
}

async function getFavoriteShareList(begin, length) {
  const res = axios.get(
    `/share/getfavoriteshare?begin=${begin}&length=${length}`
  );
  console.log(res);
}

async function getMyShareList(begin, length) {
  const res = axios.get(
    `/share/getmysharelist?begin=${begin}&length=${length}`
  );
  console.log(res);
}

async function searchShare(content) {
  const res = axios.get(`/share/searchshare?content=${content}`);
  console.log(res);
}

async function publishShare(share) {
  const res = axios.post("/share/publish", share);
  console.log(res);
}

async function updateShare(share) {
  const res = axios.post("/share/updatecontent", share);
  console.log(res);
}

async function setShareState(id, state) {
  const res = axios.get(`/share/setsharestate?shareId=${id}&state=${state}`);
  console.log(res);
}

export {
  share,
  shareList,
  getShareById,
  getPublicShareList,
  getNewestShareList,
  getFavoriteShareList,
  getMyShareList,
  searchShare,
  publishShare,
  updateShare,
  setShareState,
};
