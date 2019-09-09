<template>
  <ul class="footer">
    <li>
      <router-link to="/">
      <i class="fa fa-home"></i>Home</router-link>
    </li>
    <li>
      <router-link to="/contracts">
      <i class="fa fa-file-contract"></i>Hợp đồng</router-link>
    </li>
    <li>
      <router-link to="/employees">
      <i class='fa fa-user-friends'></i>Nhân viên</router-link>
    </li>
    <li>
      <router-link to="/test">
      <i class='fa fa-fingerprint'></i>Tài khoản</router-link></li>
  </ul>
</template>


<script>
export default {

}
</script>

<style>
  @import 'footer.css';
</style>