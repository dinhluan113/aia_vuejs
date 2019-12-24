<template>
  <ul class="footer">
    <li>
      <router-link to="/">
      <i class="fa fa-home"></i>Home</router-link>
    </li>
    <li>
      <router-link to="/contracts">
      <i class="fa fa-file-contract"></i>Contracts</router-link>
    </li>
    <li>
      <router-link to="/employees">
      <i class='fa fa-user-friends'></i>Employees</router-link>
    </li>
    <li>
      <router-link to="/profile">
      <i class='fa fa-fingerprint'></i>Account</router-link></li>
  </ul>
</template>


<script>
export default {

}
</script>

<style>
  @import 'footer.css';
</style>