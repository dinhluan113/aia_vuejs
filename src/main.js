import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import MonthPicker from 'vue-month-picker'
import MonthPickerInput from 'vue-month-picker'


import routes from './routes.js'

Vue.config.productionTip = false

const router = new VueRouter({
    mode: 'history',
    routes
})
Vue.use(VueRouter)
Vue.use(MonthPicker)
Vue.use(MonthPickerInput)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')