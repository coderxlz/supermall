<template>
  <div class="productWrap">
    <product-item
        v-for="(item,proType) in proLists"
        :item-data="item" :key="setKey()+proType"/>
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
  methods: {
    setKey(){
      return new Date().getTime();
    }
  }
}
</script>

<style scoped>
  .productWrap{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: #fff;
    width: 100vw;
    border-radius: 5px;
  }
</style>