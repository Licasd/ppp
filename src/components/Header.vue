<template>
  <header>
    <div class="header-inner">
      <h1>
        <router-link to="/"
          ><img
            src="https://static2.cnodejs.org/public/images/cnodejs_light.svg"
            alt=""
        /></router-link>
      </h1>
      <div class="header-right">
        <router-link to="/">首页</router-link>
        <router-link v-if="!login" to="/login">登录</router-link>

        <div v-else>
          <el-badge v-if="information" :value="information" type="primary" class="count">
            <router-link to="/information">未读消息</router-link>
          </el-badge>
            <router-link v-else to="/information">未读消息</router-link>
          <el-avatar
            class="avatar"
            size="medium"
            :src="login.avatar_url"
            shape="square"
            style="margin-left:20px;"
          ></el-avatar>
          <span @click="logout">退出</span>
          <router-link to="/post/create">
            <el-button type="success" size="small">发布话题</el-button>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      login: (state) => state.login.login,
      information: (state) => state.information.information,
    }),
  },
  created() {
    this.getCount();
  },
  methods: {
    ...mapMutations(["getInfo"]),
    ...mapActions(['getCount']),
    logout() {
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
      localStorage.removeItem("info");
      this.getInfo(null);
    },
  },
};
</script>

<style lang="less">
header {
  background-color: rgb(71, 69, 69);
  .header-inner {
    height: 50px;
    display: flex;
    justify-content: space-between;
    max-width: 1400px;
    width: 90%;
    margin: 0 auto;
    h1 {
      width: 120px;
      margin: 0;
      .img {
        width: 100%;
      }
    }
    .header-right {
      display: flex;
      align-items: center;
      > div {
        display: flex;
        align-items: center;
        color: #fff;
        margin-left: 20px;
        font-size: 12px;
        span {
          margin-right: 20px;
          cursor: pointer;
        }
      }
      a {
        color: #fff;
        margin-left: 20px;
        font-size: 14px;
      }
    }
  }
}
</style>