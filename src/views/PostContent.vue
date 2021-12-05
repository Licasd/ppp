<template>
  <div v-if="content" class="postContent">
    <Panel>
      <template #content>
        <div class="post-header">
          <!-- 设置标题前置顶 -->
          <h2>
            <span class="tag" v-if="content.top || content.good"
              >{{ content.top ? "置顶" : "精华" }} </span
            >{{ content.title }}
          </h2>
          <div>
            <p>
              <span class="disc">·</span>
              <span>发布于{{ content.create_at | moment("from", "now") }}</span>
              <span>作者{{ content.author.loginname }}</span>
              <span class="disc">·</span>
              <span>{{ content.visit_count }}次浏览</span>
              <span class="disc">·</span>
              <span>来自{{ content.tab | transformTab }}</span>
            </p>
            <el-button
              @click="collect"
              size="mini"
              :type="content.is_collect ? 'info' : 'success'"
              v-if="login"
              >{{ content.is_collect ? "取消收藏" : "收藏" }}</el-button
            >
          </div>
        </div>
        <div class="post-content" v-html="content.content"></div>
      </template>
    </Panel>
    <Panel>
      <template #header>
        <span>{{ content.reply_count }}个回复</span>
      </template>
      <template v-if="content.replies.length" #content>
        <PostCommentItem
          v-for="(comment, index) in content.replies"
          :key="comment.id"
          v-bind="{ ...comment, index }"
        />
      </template>
    </Panel>
    <Panel>
      <template #header>
        <span> 添加回复 </span>
      </template>
      <template #content>
        <!-- 写一个md编辑器 -->
        <!-- <mavon-editor
          defaultOpen="edit"
          :subfield="false"
          :toolbars="toolbars"
        /> -->
        <textarea v-model="contents" cols="30" rows="10"></textarea>
        <el-button @click="add" type="primary">回复</el-button>
      </template>
    </Panel>
  </div>
  <el-skeleton v-else :rows="8" animated />
</template>

<script>
import { mapActions, mapState } from "vuex";
import PostCommentItem from "../components/PostCommentItem.vue";

import Panel from "../containers/Panel.vue";
export default {
  components: { Panel, PostCommentItem },
  data() {
    return {
      contents: "",
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
    };
  },
  created() {
    // 调用，传id，触发mutions
    this.getPostContent(this.$route.params.id);
  },
  computed: {
    ...mapState({
      content: (state) => state.postContent.content,
      login: (state) => state.login.login,
    }),
  },

  methods: {
    // 取actions
    ...mapActions(["getPostContent", "collectHandle", "addComment"]),
    collect() {
      this.collectHandle({
        id: this.content.id,
        is_collect: !this.content.is_collect,
      });
    },
    add() {
      if (this.contents.trim()) {
        this.addComment({ id: this.content.id, content: this.contents });
      }
    },
  },
};
</script>

<style lang="less">
.post-header {
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tag {
    font-size: 12px;
    color: #fff;
    background-color: #80bd01;
    padding: 2px 4px;
    border-radius: 3px;
    margin-right: 7px;
  }
  .disc {
    margin: 0 10px;
    font-weight: bold;
  }
  p {
    font-size: 14px;
    color: #999;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
}
.post-content {
  img {
    width: 100%;
  }
}
</style>