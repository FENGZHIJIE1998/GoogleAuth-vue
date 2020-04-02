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
        console.log("BE :" + token);
        if (token === "" || token == null) {
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

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')