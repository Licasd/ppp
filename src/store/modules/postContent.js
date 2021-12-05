// vuex 详情页

import axios from "../../plugins/axios"


export default {
    state: () => ({
        // 对象的初始值一般写成null不写成{}
        content: null
    }),
    mutations: {
        getPostContent(state, postContent) {
            state.content = postContent
        },
        changeCollect(state, bool) {
            state.content.is_collect = bool
        },
        // action是点赞行为  up的话就是点赞，down就是取消点赞
        // id是评论的id
        changeUps(state, { id, action }) {
            const userId = JSON.parse(localStorage.getItem('info')).id
            // 点击的那个评论
            const currentReply = state.content.replies.find(ele => ele.id === id)
            // 除了要修改is_uped之外，点赞的个数也要变化，就是要修改ups，ups里面存的是点赞用户的id，那么点赞时，需要将当前用户的id  push到ups数组，反之需要删除。
            if (action === 'up') {
                currentReply.is_uped = true
                currentReply.ups.push(userId)

            } else {
                currentReply.is_uped = false
                currentReply.ups = currentReply.ups.filter(ele => ele !== userId)
            }
        },
        
    },
    actions: {
        //    获取详情页数据
        async getPostContent({ commit }, id) {
            const token = localStorage.getItem('token')
            const url = token ? `/topic/${id}?accesstoken=${token}` : `/topic/${id}`
            const postContent = await axios.get(url)
            console.log(postContent);
            commit('getPostContent', postContent.data)

        },
        // 收藏或者取消收藏
        // id是文章id  is_collect是true就去做收藏请求 是false就做取消收藏
        async collectHandle({ commit }, { id, is_collect }) {
            const token = localStorage.getItem('token')
            if (is_collect) {
                // 收藏主题
                await axios.post('/topic_collect/collect', { topic_id, accesstoken: token })
                commit('changeCollect', true)
            } else {
                // 取消收藏主题
                await axios.post('/topic_collect/de_collect', { topic_id, accesstoken: token })
                commit('changeCollect', false)
            }
        },
        // 点赞
        async upsHandle({ commit }, id) {
            const token = localStorage.getItem('token')
            const res = await axios.post(`/reply/${id}/ups`, { accesstoken: token })
            commit('changeUps', { id: id, action: res.action })
        },
        // 新建评论
        async addComment({dispatch},{id,content}){
            const token = localStorage.getItem('token')
            const res = await axios.post(`/topic/${id}/replies`,{accesstoken:token,content:content})
            // 请求的返回值() 基本上只有一个
            // 请求成功之后后台就更新了
            // 其实前端只需要展示出来添加了就可以了,但是有的时候信息较少无法添加
            dispatch('getPostContent',id)
        }

    },


}