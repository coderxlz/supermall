<template>
  <div class = "tab-bar-item" @click="btnClick">
    <div class="tabBarImg">
      <slot name = 'img1' v-if = '!isActive'></slot>
      <slot name = 'img2' v-else></slot>
    </div>
    <div :style = "activeStyle">
      <slot name = 'tag'></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
    },
    //将字体颜色也从组件中抽离，使得外部可以设置
    activeStyle(){
      return this.isActive? {color:this.setColor} : {};
    }
  },
  props:{
    path: {
      type:String,
    },
    setColor:String
  },
  methods:{
    btnClick(){
      this.active = false;
      this.$router.replace(this.path);
    }
  }
}
</script>

<style scoped>

  .tab-bar-item{
    font-size: 12px;
    text-align: center;
    margin-top: 5px;
    flex-grow: 1;
  }

  .tabBarImg img{
    width: 24px;
    height: 24px;
    text-align: center;
    /*通过vertical-align去除图片底部间距*/
    vertical-align: bottom;
  }
</style>
