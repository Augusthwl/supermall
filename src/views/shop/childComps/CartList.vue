<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll" :probe-type="3">
      <cart-list-item 
          v-for="(item, index) in cartList" 
          :key="index" 
          :product="item"/>
    </scroll>
  </div>
</template>

<script>

import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'

import { mapGetters } from 'vuex'

export default {
name:"CartList",
data(){
  return {
  }
},
components:{
  Scroll,
  CartListItem
},
computed:{
  ...mapGetters(['cartList'])
},
activated(){
  this.$refs.scroll.refresh()
}
}
</script>

<style scoped>

.content{
 /* top: 50px; */
  height:435px;
  overflow: hidden;
  z-index: 10;
}
</style>