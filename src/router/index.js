import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PostContent from '../views/PostContent.vue'
import User from '../views/User.vue'
import Login from '../views/Login.vue'
import CreatePost from '../views/CreatePost.vue'
import Err from '../views/Err.vue'
import Information from '../views/Information.vue'
import More from '../views/More.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path:"/err",
    name:"err",
    component:Err
  },
  {
    path: '/User/:loginname',
    component: User,
  },
  {
    path:'/User/:loginname/more',
    component:More,
    name:'more'
  },
  {
    path: '/post/create',
    component: CreatePost,
  },
  {
    path:'/information',
    component:Information,
    name:'information'
  },
  {
    path: '/PostContent/:id',
    component: PostContent,
    name: "post"
  },
  {
    path: "/",
    component: Home,
    children: [
      {
        path: '',
        component: () => import('../views/PostList.vue')
      },
      {
        path: ':tab',
        component: () => import('../views/PostList.vue')
      }
    ]
  },
  {
    path:"*",
    component:Err
  }


]


// 如果不对vue进行配置的恶化，上面这个服务器地址是找不到index.html的，因为默认的vue去




// 如果路由是history模式，那么上面两个服务器地址，相对与vue项目来说，'/'表示的都是https://Licasd.github.io
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
