<template>
  <div class="app">
    <Header/>
    <div class="main">
    <router-view></router-view>
    </div>
    <Footer />
    
  </div>
</template>

<script>


// 首页的到底功能，没有更多的话题了   ×
// 回复评论的回复 content--> "@xxx 你写的评论"  可选  ×


// 编辑话题功能  可选 ×
// 1.当在文章详情页看到了自己的话题的时候，标题后面会有一个编辑按钮，做编辑话题用
// 2.点击编辑按钮到编辑话题页面
// 3.展示文章内容，然后编辑，编辑之后发请求更新，请求成功之后回到文章详情页


// 文章类别切换是等待效果，还有取消请求功能   √

// 个人中心页  查看更多  可选 √

// 404页面  √
//  /xxx 会访问POSTList，我们做个判断push到404
// 如果 /xxx/x/xx   会匹配到*跳转到404

// 未读消息功能  √
// 1.获取未读消息数，发对应的请求到header组件内展示
// 2.获取已读和未读消息，在消息页面展示
// 3.展示消息之后，直接在消息页面看到了所有未读消息之后，就直接标记全部消息为已读(发全部已读的请求)  √


import { mapMutations } from 'vuex';
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'


export default {
  components: {
    Footer,
    Header

  },
  created () {
    const info = localStorage.getItem('info');
    if(info) this.getInfo(JSON.parse(info))
  },
  methods: {
    ...mapMutations(['getInfo'])
  },

}
</script>

<style>
.app{
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
  .main{
    width: 90%;
    margin: 20px auto;
    max-width: 1400px;
    /* min-height: 600px; */
    flex-grow: 1;
  }
</style>
