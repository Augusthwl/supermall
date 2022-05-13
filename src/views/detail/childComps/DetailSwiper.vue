<template>
      <swiper class="detail-swiper">
          <swiper-item v-for="(item,index) in topImgs" :key="index">
              <img :src="item" alt="">
          </swiper-item>
      </swiper>
</template>

<script>
import { Swiper, SwiperItem} from 'components/common/swiper/index'

export default {
name:"DetailSwiper",
props:{
    topImgs:{
        type:Array,
        default(){
            return []
        }
    }
},
components:{
    Swiper,
    SwiperItem
}


}
</script>

<style scoped>
.detail-swiper{
    height: 300px;
    overflow: hidden;
}
</style>