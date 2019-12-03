<template>
  <!-- <div class="header">{{title}} - Title</div> -->
  <div class="header">Title</div>
</template>


<script>
export default {
  props: {
    title: String
  }
};
</script>

<style scoped>
.header {
  background-image: linear-gradient(
    to right bottom,
    #59cf90,
    #41c597,
    #2bba9c,
    #1aaf9e,
    #15a39e
  );
  height: 6em;
  display: flex;
  vertical-align: ce;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: bold;
  color: #fff;
  position: relative;
  margin-bottom: 1em;
}
</style>