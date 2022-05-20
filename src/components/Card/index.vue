<template>
  <a-card size="small" :title="title" :bodyStyle="{ padding: 0 }">
    <a-list item-layout="horizontal" :data-source="dataSource" size="small">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta>
            <template #title>
              <div
                @click="
                  $router.push({
                    path: '/share',
                    query: { id: item.id },
                  })
                "
                class="content"
              >
                {{ item.content }}
              </div>
            </template>
            <template #description>
              <span class="description">点赞数：{{ item.likeNum }}</span>
              <span class="description">评论数：{{ item.commentNum }}</span>
            </template>
            <template #avatar v-if="item.pictureList.length > 0">
              <div class="img-box">
                <img :src="getImageUrl(item.pictureList[0].url)" />
              </div>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </a-card>
</template>

<script setup>
import { defineProps, onMounted, ref, toRefs } from "vue";
import {
  getNewestShareList,
  getFavoriteShareList,
  getImageUrl,
} from "@/hooks/share";
import { message } from "ant-design-vue";
import dayjs from "@/global/dayjs";
import { listLength } from "@/global/config";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  isNewest: {
    type: Boolean,
    required: true,
  },
});
const { title, isNewest } = toRefs(props);
const dataSource = ref([]);

onMounted(async () => {
  try {
    if (isNewest.value) {
      dataSource.value = await getNewestShareList(1, listLength);
    } else {
      dataSource.value = await getFavoriteShareList(1, listLength);
    }
    console.log(dataSource.value);
  } catch (err) {
    console.error(err);
    message.error("获取分享信息失败");
  }
});
</script>

<style lang="less" scoped>
.content {
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.description {
  font-size: 12px;
  padding-right: 16px;
}
.img-box {
  position: relative;
  top: 5px;
  width: 40px;
  height: 40px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
