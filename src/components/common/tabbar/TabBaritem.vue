<template>
  <div class="tab-bar-item" @click="itemClick" >
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot :class="{active: isActive}" name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name:"TabBaritem",
  props:{
    path: String,
    activeColor:{
      type: String,
      default:'red'
    }
  },
  data(){
    return{
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods:{
    itemClick(){
      this.$router.replace(this.path);
    }
  }
}
</script>

<style scoped>
.tab-bar-item{
  /* 均等分 */
  flex: 1; 
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img{
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;/* 去除图片下默认的三个像素 */
}
</style>>