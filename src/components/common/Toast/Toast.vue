<template>
  <div class="toast" v-show="ifShow">
    {{ message }}
  </div>
</template>

<script>
export default {
name: "Toast",
  data(){
    return{
      ifShow:false,
      message:''
    }
  },
  methods:{
    show(message,duration){
      //设置duration的默认值为2000
      duration = 2000 || duration;
      this.ifShow = true;

      this.message = message;

      //在显示duration时间段之后，土司消失
      setTimeout(() => {
        this.ifShow = false;
      },duration)

    }
  }
}
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 10px 10px;
    background-color: rgba(0,0,0,.6);
    color: #fff;
    z-index: 999;
  }
</style>