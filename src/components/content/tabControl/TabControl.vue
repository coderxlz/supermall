<template>
    <div  class="tabControl">
      <a href="javascript:;" v-for="(item,index) in tabs" class="controlItem" @click="itemClick(index)">
        <div :class="{itemOnClick:currentIndex === index}">
          <span>{{item}}</span>
        </div>
      </a>
    </div>
</template>

<script>
export default {
name: "TabControl",
  props:{
  tabs:{
    type:Array,
    default:[]
  }
  },
  data(){
    return {
      currentIndex:0,
    }
  },

  methods:{
    itemClick(index){
      this.currentIndex = index;
      this.$emit('productChange',index);
    }
  }
}
</script>

<!--scoped表示当前样式只在当前页面生效-->
<style scoped>
  .tabControl{
    width: 100%;
    height: 44px;
    display: flex;
    text-align: center;
    justify-content: space-around;
    background-color: #fff;
  /*  使用stickey设置控制栏吸附效果
   当top达到指定值时，stickey会自动变成fixed*/
    /*position: sticky;*/
    /*top:44px;*/
  }

  .controlItem{
    flex-grow: 1;
    line-height: 44px;
  }

  .controlItem span{

    padding: 0 5px;
  }

  .itemOnClick span{
    color: var(--color-tint);
    border-bottom: 3px solid var(--color-tint);
  }
</style>