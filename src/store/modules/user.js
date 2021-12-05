// 个人中心
import axios from "../../plugins/axios"

export default {
    state: () => ({
        user: null
    }),
    mutations: {
        getUser(state, loginname) {
            state.user = loginname
        }

    },
    actions: {
        async getUser({ commit }, loginname) {
            const users = await axios.get(`/user/${loginname}`)
            // console.log(users.data);
            commit('getUser', users.data)
        }
        // 39cad244-aa60-4728-9a9d-13abc5a54d7d
    },

}