import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuelidate from "vuelidate";

import routes from './routes.js'

import Default from './components/layout/layout-default.vue'
import NoFooter from './components/layout/layout-nofooter.vue'

Vue.component('default-layout', Default)
Vue.component('no-footer-layout', NoFooter)

Vue.config.productionTip = false

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('jwt') == null) {
            next()
        } else {
            next({ path: '/' })
        }
    } else {
        next()
    }
})

Vue.use(VueRouter)
Vue.use(Vuelidate)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')