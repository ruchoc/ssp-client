<template>
  <a-form
    :model="formState"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
  >
    <a-form-item label="头像">
      <avatar ref="avatar"></avatar>
    </a-form-item>
    <a-form-item label="生日">
      <a-date-picker v-model:value="formState.birthday" />
    </a-form-item>
    <a-form-item label="性别">
      <a-radio-group v-model:value="formState.gender" button-style="solid">
        <a-radio-button value="男">男</a-radio-button>
        <a-radio-button value="女">女</a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="自我介绍">
      <a-textarea
        style="height: 200px"
        v-model:value="formState.selfIntroduction"
      />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 16, span: 4 }">
      <a-button type="primary" @click="onSave">保存</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import Avatar from "@/components/Update/Avatar.vue";
import { userData, updateUserInfo } from "@/hooks/user";
import { onMounted, reactive, ref } from "vue";
import { message } from "ant-design-vue";
import dayjs from "dayjs";

const formState = reactive({
  gender: "",
  birthday: null,
  selfIntroduction: "",
});
onMounted(() => {
  if (!userData.isLogin) {
    message.error("账户尚未登录");
    return;
  }
  const { gender, birthday, selfIntroduction } = userData.userInfo;
  formState.gender = gender;
  formState.birthday = birthday ? dayjs(birthday) : dayjs();
  formState.selfIntroduction = selfIntroduction;
});

const avatar = ref(null);
const onSave = async () => {
  try {
    const { gender, selfIntroduction } = formState;
    const userInfo = {
      gender,
      selfIntroduction,
      birthday: formState.birthday.format("YYYY-MM-DD"),
    };
    await updateUserInfo(userInfo);
    message.success("修改个人信息成功");
    avatar.value.handleUpload();
  } catch (err) {
    console.error(err);
    message.error("修改个人信息失败");
  }
};
</script>
