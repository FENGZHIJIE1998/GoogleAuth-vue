import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Login',
        component: () =>
            import ('../views/Login.vue'),
        meta: {
            requireAuth: false
        }
    }, {
        path: '/Home',
        name: 'Home',
        component: () =>
            import ('../views/Home.vue'),
        children: [{
                path: '/addCode',
                name: 'AddCode',
                component: () =>
                    import ('../views/AddCode.vue'),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/listCode',
                name: 'ListCode',

                component: () =>
                    import ('../views/ListCode.vue'),
                meta: {
                    requireAuth: true
                }
            }
        ],
        meta: {
            requireAuth: true
        }
    },


]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router