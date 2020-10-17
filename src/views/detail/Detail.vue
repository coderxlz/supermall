<template>
  <h2>当前商品iid:{{setiid}}</h2>
</template>

<script>
export default {
name: "Detail",
  data(){
    return{
      //iid用来保存当前页面商品iid
      iid:null
    }
  },
  created() {

  },
  computed:{
    setiid(){
      this.iid = this.$route.params.iid;
      return this.iid;
    }
  }
}
</script>

<style scoped>

</style>