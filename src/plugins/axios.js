//封装axios

import axios from 'axios'


// 请求基地址
axios.defaults.baseURL='https://cnodejs.org/api/v1'


// 请求超时时间

// axios.defaults.timeout=3000

// 请求响应拦截器
axios.interceptors.response.use((res)=>res.data)

export default axios
