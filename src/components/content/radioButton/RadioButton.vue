<template>
  <div class="radioButton" :class="{active:check}" @click="changeChecked">
    <img src="~assets/img/shopcar/tick.svg" alt="">
  </div>
</template>

<script>
export default {
name: "RadioButton",
  props:{
    ifChecked:true
  },
  data(){
    return{
      check:true
    }
  },
  //点击单选按钮时，改变按钮选中状态
  methods:{
    changeChecked(){
      this.check = !this.check;
    }
  },
  mounted() {
    this.check = this.ifChecked;
  },
  //父组件中传值时，进行数据更新
  watch:{
    ifChecked(){
      this.check = this.ifChecked;
    }
  }
}
</script>

<style scoped>
  .radioButton{
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border: 1px solid #aaa;
    border-radius: 50%;
  }

  .active{
    background-color: red;
  }
  
</style>