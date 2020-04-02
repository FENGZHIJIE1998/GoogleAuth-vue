import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
Vue.use(store)
Vue.prototype.$axios = axios
Vue.use(ElementUI);
Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) {
        // 判断跳转的路由是否需要登录
        const token = store.state.token;

        if (token === "" || token == null) {
            Vue.prototype.$message({
                showClose: true,
                message: "您未登录，请先登录",
                type: "error",
                duration: "3000"
            })
            next({
                path: '/'
            })
        } else {
            next()
        }
    } else {
        next()
    }
})


// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.token = `${store.state.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });
axios.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        console.log("res:" + response);
        if (response.data.status === 200) {

            return Promise.resolve(response);
        } else if (response.data.status == 400) {
            Vue.prototype.$message({
                showClose: true,
                message: response.data.msg,
                type: "error",
                duration: "3000"
            })
            router.push({
                    path: '/'
                })
                //alert(response.data.msg)
            return Promise.reject(response);
        }
    },
    err => {
        console.log("err:" + err);

        // if (err.response.status == 400) {
        //     router.push({
        //         path: '/'
        //     })
        // }
        return Promise.reject(err);
    });

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')