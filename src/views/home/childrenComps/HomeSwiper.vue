<template>
  <div>
    <swiper>
      <swiper-item v-for="(item,index) in cbanners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
name:"HomeSwiper",
components:{
  Swiper,
  SwiperItem
},
props:{
  cbanners:{
    type:Array,
    default(){
      return []
    }
  }
},
data(){
  return {
    isLoad: false
  }
},
methods:{
  imgLoad(){
    if(!this.isLoad){
      this.$emit('swiperImgLoad')
      this.isLoad = true
    }
  }
  
}
}
</script>

<style>

</style>