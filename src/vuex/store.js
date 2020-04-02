import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('token')
    },
    mutations: {
        setToken(state, t) {
            console.log("setToken :" + t)
            localStorage.setItem('token', t)
            state.token = t
        }
    }
})

export default store;