import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuelidate from "vuelidate";

import routes from './routes.js'

import Default from './components/layout/layout-default.vue'
import NoFooter from './components/layout/layout-nofooter.vue'

import VModal from 'vue-js-modal'


Vue.component('default-layout', Default)
Vue.component('no-footer-layout', NoFooter)

Vue.config.productionTip = false

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwtv2') == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            next()
        }
    }
    else {
        next()
    }
})

Vue.use(VueRouter)
Vue.use(Vuelidate)
Vue.use(VModal, { dialog: true })

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')