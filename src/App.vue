<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>
import Footer from './components/footer/footer.vue'

export default {
  name: 'app',
  components: {
    Footer
  }
}
</script>

<style>
  @import './assets/layout/layout.css';
</style>
<style>
  @import './assets/fontawesome/css/all.min.css';

  .vue-monthly-picker .input{
    width: 200px !important;
  }
</style>