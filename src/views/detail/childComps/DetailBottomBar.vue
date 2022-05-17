px<template>
  <div class="bottom-bar">
      <div class="bar-item bar-left">
          <div>
              <i class="icon service"><img src="@/assets/img/detail/icon01.png"></i>
              <span class="text">客服</span>
          </div>
          <div>
              <i class="icon shop"><img src="@/assets/img/detail/icon02.png"></i>
              <span class="text">店铺</span>
          </div>
          <div>
              <i class="icon select"><img src="@/assets/img/detail/icon03.png"></i>
              <span class="text">收藏</span>
          </div>
      </div>
      <div class="bar-item bar-right">
          <div class="cart" @click="addToCart">加入购物车</div>
          <div class="buy">购买</div>
      </div>
  </div>
</template>

<script>
export default {
name:"DetailBottomBar",
data(){
    return{

    }
},
methods:{
    addToCart(){
        this.$emit('addCart')
    }
}
}
</script>

<style scoped>
.bottom-bar{
    height:58px;
    background-color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    text-align: center;
}
.bar-item{
    flex: 1;
    display: flex;
}
.bar-item>div{
    flex: 1;
}
.bar-left .text{
    font-size: 13px;
}
.bar-left .icon{
    display: block;
    width: 22px;
    height:22px;
    margin: 6px auto 3px;
}
.bar-left .service{
    background-position: 0 -54px;
}
.bar-left .service img{
    width: 22px;
    height:22px;
}

.bar-left .shop{
    background-position: 0 --98px;
}
.bar-left .shop img{
    width: 22px;
    height:22px;
}
.bar-left .select img{
    width: 22px;
    height:22px; 
}
.bar-right{
    font-size: 15px;
    color: #fff;
    line-height: 58px;
}
.bar-right .cart{
    background-color: #ffe817;
    color: #333;
}
.bar-right .buy{
    background-color: #f69;
}
</style>