// vuex文章列表模块

import axios from "../../plugins/axios"

export default {
    state: () => ({
        list: [],
        loading:false,
    }),
    mutations: {
        // 列表数据
        getPosts(state, list) {
            state.list = list
        },
        loadMorePosts(state,list){
            state.list=[...state.list,...list]
        }

    },
    actions: {
        // 获取文章列表数据
        // 请求文章列表有两种情况
        // 1.初始请求
        // 2.加载更多请求
        // 依据参数带不带page属性，不带那就是初始请求，带参数就是加载更多
        async getPosts({ commit,state}, query) {
            state.loading=true
            // console.log(state.lodaing);
            const {page,tab}=query;
            const queryStr=page ? `?tab=${tab}&limit=20&page=${page}` : `?tab=${tab}`
            const list = await axios.get(`/topics${queryStr}`)
            state.loading=false
            page ? commit('loadMorePosts', list.data) : commit('getPosts', list.data)
            // console.log(state.lodaing);
         
        },

     
    },

}