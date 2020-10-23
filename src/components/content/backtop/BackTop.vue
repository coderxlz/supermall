<template>
  <div class="backTop">
    <img src='~assets/img/common/top.png' alt="">
  </div>
</template>

<script>
export default {
name: "BackTop"
}
</script>

<style scoped>
  .backTop{
    position: fixed;
    bottom: 55px;
    right: 6px;
    z-index: 9999;
  }

  .backTop img{
    width: 43px;
    height: 43px;
  }
</style>