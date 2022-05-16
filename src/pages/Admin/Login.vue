<template>
  <a-card title="登录">
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      v-bind="layout"
      @finish="handleFinish"
    >
      <a-form-item has-feedback label="用户名" name="user">
        <a-input v-model:value="formState.user" autocomplete="off" />
      </a-form-item>
      <a-form-item has-feedback label="密码" name="pass">
        <a-input
          v-model:value="formState.pass"
          type="password"
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" html-type="submit">确认</a-button>
        <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
const router = useRouter();
import { login, whetherLogin } from "@/hooks/admin";
import { HomeFilled } from "@ant-design/icons-vue";

const formRef = ref(null);

const formState = reactive({
  user: "",
  pass: "",
});

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

const rules = {
  user: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

onMounted(async () => {
  if (await whetherLogin()) {
    router.push("/admin/userManager");
  }
});
const handleFinish = async (values) => {
  try {
    await login(formState.user, formState.pass);
    router.push("/admin/userManager");
  } catch (err) {
    console.error(err);
    message.error("用户名或密码错误");
  }
};

const resetForm = () => {
  formRef.value.resetFields();
};
</script>
