<template>
  <!-- 评论的每一条小组件 -->
  <div class="comment-item" :id="id">
    <!-- 头像 -->
    <el-avatar
      class="avatar"
      size="medium"
      :src="author.avatar_url"
      shape="square"
    ></el-avatar>
    <div class="comment-right">
      <div>
          <!-- 人名 -->
        <span>{{ author.loginname }}</span
        >
        <!-- 几楼 -->
        <span class="position"
          ><a :href="`#${id}`">{{ index + 1 }}楼 · {{ create_at | moment("from", "now") }}</a></span
        >
        <!-- 点赞 -->
        <span @click="upsClick" class="like">
          <i v-if="is_uped" class="iconfont icon-dianzan1"></i>
          <i v-else class="iconfont icon-dianzan"></i>
          {{ups.length ? ups.length : '' }}</span>
      </div>
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: ["author", "index","create_at","content","ups","id","is_uped"],
  methods: {
    ...mapActions(['upsHandle']),
    upsClick() {
      this.upsHandle(this.id)
    }
  },
};
</script>

<style lang="less">
.comment-item {
  display: flex;
  border-bottom:1px solid #ccc;
  margin-top: 10px;
  .comment-right {
    margin-left: 10px;
    flex-grow: 1;
    img {
      width: 100%;
    }
    >div {
      display: flex;
      .position{
          flex-grow: 1;
          color: rgb(95, 123, 247);
      }
    }
  }
}
</style>