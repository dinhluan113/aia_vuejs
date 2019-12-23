<template>
    <div id="app">
        <component :is="layout">
            <router-view></router-view>
        </component>
        <v-dialog />
    </div>
</template>

<script>
const default_layout = "default";

export default {
    name: 'app',
    computed: {
        layout(){
            return (this.$route.meta.layout || default_layout) + '-layout';
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