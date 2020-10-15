<template>
  <div>
    <product-item v-for="item in proLists" :item-data="item" />
  </div>
</template>

<script>
import ProductItem from "./ProductItem";
import BetterScroll from "better-scroll";
export default {
name: "ProductWrap",
  components:{
  ProductItem
  },
  props:{
   proLists:{
     type:Array,
     default(){
       return []
     }
   }
  },
}
</script>

<style scoped>

</style>