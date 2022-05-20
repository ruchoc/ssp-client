import axios from "@/global/axios";
import { reactive } from "vue";
import { message } from "ant-design-vue";

const followData = reactive({
  idolList: [],
  fanList: [],
});

async function follow(toUserId) {
  const res = await axios.post("/follow/follow", { toUserId });
  // console.log(res);
}

async function unFollow(toUserId) {
  const res = await axios.delete(`/follow/cancel/${toUserId}`);
  // console.log(res);
}

async function getIdols() {
  const res = await axios.get("/follow/getfollowinguser");
  // console.log(res);
  const { data } = res;
  followData.idolList = data;
}

async function getFans() {
  const res = await axios.get("/follow/getfans");
  // console.log(res);
  const { data } = res;
  followData.fanList = data;
}

const isIdol = async (id) => {
  await getIdols();
  return followData.idolList.findIndex((user) => user.userId == id) >= 0;
};

const onFollow = async (id) => {
  try {
    await follow(id);
    message.success("关注成功");
    getIdols();
  } catch (err) {
    console.error(err);
    message.error("关注失败");
  }
};
const offFollow = async (id) => {
  try {
    await unFollow(id);
    message.success("取关成功");
    getIdols();
  } catch (err) {
    console.error(err);
    message.error("取关失败");
  }
};

export { follow, getFans, getIdols, isIdol, onFollow, offFollow, followData };
