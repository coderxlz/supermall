<template>
  <div class="tabWrap">
    <slot></slot>
  </div>
</template>

<script>
import TabBarItem from "../../content/TabBarItem";
export default {
name: "TabWrap",
  components:{
  TabBarItem
  },
}
</script>

<style scoped>
  .tabWrap{
    height: 49px;
    background-color: rgb(245,244,245);
    display: flex;
    /*justify-content: space-around;*/
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
