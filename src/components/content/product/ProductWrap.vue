<template>
  <div class="productWrap">
    <product-item
        v-for="item in proLists"
        :item-data="item"/>
  </div>
</template>

<script>
import ProductItem from "./ProductItem";
export default {
name: "ProductWrap",
  components:{
  ProductItem
  },
  props:{
   proLists:{
     type:Array,
     default(){
       return [];
     }
   }
  },
}
</script>

<style scoped>
  .productWrap{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: #fff;
  }
</style>