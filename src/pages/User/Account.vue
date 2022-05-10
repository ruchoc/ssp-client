<template>
  <a-form
    :model="formState"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onSave"
  >
		<a-form-item label="是否锁定">
			<a-switch v-model:checked="formState.locked" disabled/>
		</a-form-item>
    <a-form-item
      label="账号"
      :rules="[{ required: true, message: '请输入账号名' }]"
    >
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item
      label="密码"
      :rules="[{ required: true, message: '请输入密码' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 16, span: 4 }">
      <a-button type="primary" html-type="submit">保存</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { userData, updateUserName, updatePassword } from "@/hooks/user";
import { onMounted, reactive } from "vue";
import { message } from "ant-design-vue";

const formState = reactive({
  name: "",
  password: "",
  locked: false,
});
onMounted(() => {
  if (!userData.isLogin) {
    message.error("账户尚未登录");
    return;
  }
  const { name, password, locked } = userData.userBasicInfo;
  formState.name = name;
  formState.password = password;
  formState.locked = locked;
});

const onSave = async () => {
  try {
    const { name, password } = formState;
    await updateUserName(name);
    await updatePassword(password);
    message.success("修改账号信息成功");
  } catch (err) {
    console.error(err);
    message.error("修改账号信息失败");
  }
};
</script>
