<template>
  <div class="wrap" ref="wrap">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BetterScroll from 'better-scroll';
export default {
name: "Scroll",
  mounted() {
    const bScroll = new BetterScroll('.wrap',{
      click:true
    });

  }
}
</script>

<style scoped>
  .wrap{
   /*height: 100vh;*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }


  .content{

  }
</style>