<template>
    <div id="app">
        <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
        <router-view></router-view>
        <Footer :style="{ 'display': this.isShowFooter}" />
    </div>
</template>

<script>
import Footer from './components/layout/footer.vue'

export default {
    name: 'app',
    components: {
        Footer
    },
    data: function() {
        return {
            isShowFooter: 'flex'
        }
    },
    created: function() {
        if (window.location.href.indexOf('login') > -1) {
            this.isShowFooter = 'none';
        }
    },
}
</script>

<style>
@import './assets/layout/layout.css';
</style>

<style>
@import './assets/fontawesome/css/all.min.css';
.vue-monthly-picker .input {
    width: 200px !important;
}
</style>