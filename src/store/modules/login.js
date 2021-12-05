// 用户登录模块
import axios from '../../plugins/axios'
export default {
    state: () => ({
        login: null
    }),
    mutations: {
        getInfo(state, info) {
            state.login = info
        }
    },
    actions: {
        getInfo({ commit }, token) {
            return new Promise((resolve, reject) => {
                axios.post('/accesstoken', { accesstoken: token }).then((res) => {
                    commit('getInfo', res)
                    localStorage.setItem('info',JSON.stringify(res))
                    localStorage.setItem('token',token)
                    resolve()
                }).catch(() => {
                    reject()
                })
            })
        }
    },
}