<template>
  <div class="create-post">
    <Panel>
      <template #header>
        <router-link to="/">主页</router-link><span>/</span
        ><span>发布话题</span>
      </template>
      <template #content>
        <form action="">
          <div>
            <span>请选择板块:</span>
            <select v-model="post.tab" name="" id="">
              <!-- <option value="type">请选择</option> -->
              <option value="ask">问答</option>
              <option value="share">分享</option>
              <option value="job">招聘</option>
              <option value="dev">客户端测试</option>
            </select>
          </div>
          <div>
            <input v-model="post.title" type="text" />
          </div>
          <div>
            <!-- md编辑器 -->
            <!-- 用了md编辑器，向后端发送content发送的是md字符串，也就是写md语法，最后发的是html字符串，要注意，字符串最外层的div.markdown-text的 -->
            <textarea
              v-model="post.content"
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <button @click="submit" type="primary">提交</button>
        </form>
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from "../containers/Panel.vue";
import axios from '../plugins/axios'
export default {
  components: { Panel },
  data() {
    return {
      post: {
        title: "",
        tab: "",
        content: "",
      },
    };
  },
  methods: {
      async submit() {
        //   首先要判断输入的内容是否合理

        let {tab,title,content} = this.post
        // content = "<div class='markdown-tetx'>"+content+'</div>'

        // 取本地的token
        const accesstoken = localStorage.getItem('token')
        const res=await axios.post('/topics',{tab,title,content,accesstoken})
        console.log(res);
        this.$router.push(`/post/${res.topic_id}`)


      }
  },
};
</script>

<style>
</style>