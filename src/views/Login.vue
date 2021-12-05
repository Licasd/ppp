<template>
  <Panel>
    <template #header>
      <router-link to="/">主页</router-link>
      <span>/</span>
      <span>登录</span>
    </template>
    <template #content>
      <el-form
        :model="ruleForm"
        hide-required-asterisk
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            placeholder="用户名随便输入"
            style="width: 260px"
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            placeholder="密码需要输入用户token"
            type="password"
            style="width: 260px"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </template>
  </Panel>
</template>

<script>
import { mapActions } from "vuex";
import Panel from "../containers/Panel.vue";
export default {
  components: { Panel },
  data() {
    return {
      ruleForm: {
        username: "",
        //
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            trigger: "blur",
            message: "用户不能为空",
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: "密码不能为空",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["getInfo"]),
    login() {
      this.$refs.ruleForm.validate((boolean) => {
        if (boolean) {
          this.getInfo(this.ruleForm.password)
            .then(() => {
              this.$router.push("/");
            })
            .catch(() => {
              this.$message.error("错了哦，token有误");
            });
        }
      });
     
    },
  },
};
</script>

<style>
</style>