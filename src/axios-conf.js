/**
 * @module Axios 配置信息
 */

import axios from 'axios';
import VueAxios from 'vue-axios';
import Qs from 'qs';

export default (Vue) => {
    axios.interceptors.request.use(res => {
        /* ------------ 序列化参数 ------------- */
        if (res.method === 'post') res.data = Qs.stringify(res.data);
        res.timeout = 10000;
        res.withCredentials=true;
        return res;
    });

    /* ----------------- 返回结果拦截, 如未登录直接跳转到登录页 ----------------- */
    axios.interceptors.response.use(res => {
        if (res.data.code && res.data.code == 1003) {
            // router.push('/login');
            // window.location.href = 'http://192.168.1.205:8800/';
            //window.location.href = 'http://tusercenter.beibeiyue.cn/c/';
            window.location.href = 'http://usercenter.beibeiyue.com/c/';
        }
        return res;
    }, err => {
        // return Promise.reject(err);
        return err;
    })

    /* ------------------------- 默认请求格式, 和全局请求地址 ------------------------- */
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    const Env = process.env.NODE_ENV === 'production' ? 'build' : 'dev';
    axios.defaults.baseURL = 'http://192.168.1.110:8181/';

    Vue.use(VueAxios, axios);
}
