<template>
  <a-layout>
    <a-layout-header>
      <home-filled @click="$router.push('/')" style="font-size: 32px" />
    </a-layout-header>
    <a-card title="注册">
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
        <a-form-item has-feedback label="确认密码" name="checkPass">
          <a-input
            v-model:value="formState.checkPass"
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
  </a-layout>
</template>

<script setup>
import { reactive, ref } from "vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { register } from "@/hooks/user";
import { HomeFilled } from "@ant-design/icons-vue";
const router = useRouter();

const formRef = ref(null);

const formState = reactive({
  user: "",
  pass: "",
  checkPass: "",
});

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

const validatePass = (_, value) => {
  if (value === "") {
    return Promise.reject("请确认密码");
  } else if (value !== formState.pass) {
    return Promise.reject("输入密码不相等");
  } else {
    return Promise.resolve();
  }
};

const rules = {
  user: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
  checkPass: [{ required: true, validator: validatePass, trigger: "blur" }],
};

const handleFinish = async (values) => {
  try {
    register(formState.user, formState.pass);
    router.push("/login");
  } catch (err) {
    message.error("该账号已注册");
    console.error(err);
  }
};

const resetForm = () => {
  formRef.value.resetFields();
};
</script>

<style lang="less" scoped>
.ant-layout {
  .ant-layout-header {
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  height: 100%;
  .ant-card {
    width: 50%;
    margin: 100px auto;
  }
}
</style>
