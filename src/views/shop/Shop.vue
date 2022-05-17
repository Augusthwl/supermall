<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list/>
    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

//将 vuex 中的 getters 直接转为计算属性
import {mapGetters} from 'vuex'
export default {
  name:"Shop",
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
    // ...mapGetters(['cartLength', 'cartList'])
    ...mapGetters({
      length:'cartLength',
      list:'cartList'
    })
  }
}
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  /* font-weight: 700; */
}
</style>