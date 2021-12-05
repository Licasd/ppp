//未读消息

import axios from '../../plugins/axios'


export default{
    state:()=>({
        information:null,
        has_read_messages:[],
        hasnot_read_messages:[],
    }),
    mutations:{
        getInformation(state,res){
            state.has_read_messages=res.has_read_messages,
            state.hasnot_read_messages=res.hasnot_read_messages
        },
        getCount(state,res){
            state.information=res
        }
    },
    actions:{
        async getInformation({commit}){
            const token = localStorage.getItem('token')
            const res = await axios.get(`messages?accesstoken=${token}`);
            console.log(res);
            commit('getInformation',res.data)
        },
        async allInformation(){
            const token = localStorage.getItem('token')
            await axios.post('/message/mark_all',{accesstoken:token})
        },
        async getCount({commit}){
            const token = localStorage.getItem('token')
            const res=await axios.get(`message/count?accesstoken=${token}`)
            commit('getCount',res.data)

        }
    }
}