<template>
  <div class="tabless">
    <!-- 头像 -->
    <router-link :to="`/User/${author.loginname}`">
      <el-avatar
        class="avatar"
        size="medium"
        :src="author.avatar_url"
        shape="square"
      ></el-avatar>
    </router-link>

    <!-- 阅读量 -->
    <div v-if="reply_count" class="count-wrap">
      <span class="reply-count">{{ reply_count }}</span>
      <span>/</span>
      <span class="visit-count">{{ visit_count }}</span>
    </div>
    <!-- 置顶部分 -->
    <span v-if="isHasTag" :class="['tag', { active: top || good }]">{{
      tagText
    }}</span>
    <!-- 标题 -->

    <h3>
      <router-link :to="{ name: 'post', params: { id: id } }">{{
        title
      }}</router-link>
    </h3>

    <!-- 时间部分 -->
    <span class="last-reply-count">{{
      last_reply_at | moment("from", "now")
    }}</span>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions } from "vuex";

export default {
  props: [
    "author",
    "reply_count",
    "visit_count",
    "title",
    "last_reply_at",
    "top",
    "good",
    "tab",
    "id",
  ],
  // created () {
  //   console.log(this.author);
  // },
  computed: {
    //   是否有tag
    isHasTag() {
      const page = this.$route.path;
      const isAllGoodPage = page === "/" || page === "/all" || page === "/good";
      return this.top ? true : isAllGoodPage ? true : false;

      //   pageTab是当前页面是什么
      // const pageTab = this.$route.params.tab || "all";
      // 是不是全部或good页面，全部页面和精华页面存在tag
      // 判断当前页面是不是all或good
      // const isAllOrGoodPage = pageTab === "all" || pageTab === "good";
      // 是的话，置顶，否则，不置顶
      // return this.top ? true : isAllOrGoodPage ? true : false;
    },
    // 置顶文本
    tagText() {
      return this.top
        ? "置顶"
        : this.good
        ? "精华"
        : Vue.filter("transformTab")(this.tab);
    },
  },
};
</script>

<style lang="less">
.tabless {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  &:hover {
    background-color: #f5f5f5;
  }
  h3 {
    margin: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 16px;
    color: #333;
    flex-grow: 1;
    margin-left: 10px;
    font-weight: normal;
    a {
      color: #333;
      &:visited {
        color: #999;
      }
      &:visited{
        color: #999;
      }
      &:hover{
        text-decoration: underline;
      }
    }
  }
  .avatar,
  .count-wrap,
  .tag,
  .last-reply-count {
    flex-shrink: 0;
  }
  .tag {
    font-size: 12px;
    padding: 2px 4px;
    border-radius: 3px;
    background-color: #e5e5e5;
    color: #999;
    &.active {
      color: #fff;
      background-color: #80bd01;
    }
  }
  .count-wrap {
    width: 80px;
    font-size: 14px;
    margin: 0 10px;
    text-align: center;
    .reply-count {
      font-size: 16px;
      color: #9e78c0;
    }
  }
}
</style>