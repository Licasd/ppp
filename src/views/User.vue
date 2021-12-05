<template>
  <div v-if="user" class="user">
    <Panel>
      <template #header>
        <router-link to="/">主页/</router-link>
      </template>
      <template #content>
        <div class="user-name">
          <el-avatar
            class="avatar"
            size="medium"
            :src="user.avatar_url"
            shape="square"
          ></el-avatar>
          <span>{{ user.loginname }}</span>
        </div>
        <!-- 积分 -->
        <p class="user-score">{{ user.score }}积分</p>
        <!-- 话题收藏 -->
        <a href="#" class="user-topics"
          >{{ user.recent_topics.length }}个话题收藏</a
        >
        <!-- github -->
        <p>
          <a target="_blank" href="`https://github.com`" class="user-github"
            >^_^{{ user.githubUsername }}</a
          >
        </p>
        <!-- 注册时间 -->
        <p class="user-create-time">
          注册时间{{ user.create_at | moment("from", "now") }}
        </p>
      </template>
    </Panel>
    <Panel>
      <template #header> 最近创建的话题 </template>
      <template #content>
        <Tabless v-bind="item" v-for="item in recent_topics" :key="item.id" />
        <router-link :to="`/User/${user.loginname}/more`">查看更多>></router-link>
      </template>

    </Panel>
    <Panel>
      <template #header> 最近参与的话题 </template>
      <template #content>
        <Tabless v-bind="item" v-for="item in recent_replies" :key="item.id" />
      </template>
      
    </Panel>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Tabless from "../components/Tabless.vue";
import Panel from "../containers/Panel.vue";
import axios from "../plugins/axios";
export default {
  components: { Panel, Tabless },
  data() {
    return {
      recent_replies: [],
      recent_topics: [],
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  // created() {
  //   this.getUser(this.$route.params.loginname);
  //   // console.log(this.$route);
  // },
  watch: {
    "$route.params.loginname": {
      handler(newValue) {
        this.getUser(newValue);
      },
      immediate: true,
    },
    // 当user发生改变的时候，需要重新获取相关的 参与的话题 和创建的话题 详情
    user: {
      // 监听user的变化
      // 其实就改变一次
      // 1.首次进入user页，默认user是null然后action触发之后user更新了
      // 2.在当前页切换其他用户
      async handler(newValue) {
        // 要注意请求需要发多个，而且要等待所有请求结束才能执行其他操作
        const res1 = await axios.all(
          newValue.recent_replies.map((topic) =>
            axios.get(`/topic/${topic.id}`)
          )
        );
        this.recent_replies = res1.map((ele) => ele.data);

        const res2 = await axios.all(
          newValue.recent_topics.map((topic) => axios.get(`/topic/${topic.id}`))
        );
        this.recent_topics = res2.map((ele) => ele.data);
      },
    },
  },
  methods: {
    ...mapActions(["getUser"]),
  },
};
</script>

<style lang="less">
.user {
  .panel {
    margin-bottom: 10px;
    .user-name {
      display: flex;
      span {
        font-size: 14px;
      }
      .el-avatar--medium {
        margin-right: 10px;
      }
    }
    .user-score {
      font-size: 14px;
    }
    .user-topics,
    .user-github,
    .user-name span {
      color: #778087;
    }
    .user-create-time {
      color: #ababab;
    }
  }
}
</style>