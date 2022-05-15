<template>
  <a-form
    :model="formState"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish='onPublish'
  >
    <a-form-item
      label="内容"
      name="content"
      :rules="[{ required: true, message: '请输入分享内容', trigger: 'blur' }]"
    >
      <a-textarea style="height: 200px" v-model:value="formState.content" />
    </a-form-item>
    <a-form-item label="是否公开">
      <a-switch v-model:checked="checked"></a-switch>
    </a-form-item>
    <a-form-item label="上传图片">
      <Image ref="image"></Image>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 16, offset: 4 }">
      <a-button type="primary" html-type="submit">发布</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import Image from "@/components/Update/Image.vue";
import { computed, reactive, ref } from "vue";
import { publishShare } from "@/hooks/share";
import { message } from "ant-design-vue";

const checked = computed({
  get() {
    return formState.state !== "private";
  },
  set(v) {
    formState.state = v ? "public" : "private";
  },
});
const formState = reactive({
  content: "",
  state: "public",
});
const image = ref(null);
const onPublish = async () => {
  try {
    const param = {
      content: formState.content,
      state: formState.state,
    };
    const id = await publishShare(param);
    message.success("上传分享内容成功");
    image.value.handleUpload(id);
  } catch (err) {
    console.error(err);
    message.error("上传分享失败");
  }
};
</script>

<style></style>
