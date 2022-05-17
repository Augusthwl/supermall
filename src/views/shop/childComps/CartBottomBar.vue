<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :isChecked="isSelectAll" 
                    class="check-button" 
                    @click.native="selectClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calClick">
      去结算（{{getLength}}）
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
name:"CartBottomBar",
components:{
  CheckButton
},
computed:{
  totalPrice(){
    return '￥' + this.$store.state.cartList.filter(item => {
      return item.checked
    }).reduce((preValue, item) => {
      return preValue + item.price * item.count
    },0).toFixed(2)
  },
  getLength(){
    return this.$store.getters.cartList.filter(item => item.checked).length
  },
  isSelectAll(){
    // return !(this.$store.getters.cartList.filter(item => !item.checked).length)
    if(this.$store.getters.cartList.length ===0){
      return false
    }else{
      return  !this.$store.getters.cartList.find(item => !item.checked)
    }
  }
},
methods:{
  selectClick(){
    if(this.isSelectAll){
      this.$store.getters.cartList.forEach(item => item.checked = false);
    }else{
      this.$store.getters.cartList.forEach(item => item.checked = true);
    }
    // this.$store.getters.cartList.forEach(item => item.checked = !this.isSelectAll);
    
  },
  calClick(){
    if(!this.isSelectAll){
      this.$toast.show('请选择购买的商品',2000)
    }
  }
}
}
</script>

<style scoped>
.bottom-bar{
  position: fixed;
  right: 0;
  left: 0;
  bottom: 49px;
  display: flex;

  height: 40px;
  line-height: 40px;

  background-color: #eee;
  font-size: 14px;
  
}
.check-content{
  display: flex;
  align-items: center;
  margin-left: 20px;
  width: 60px;
}
.check-button{
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price{
  flex: 1;
  margin-left: 40px;
}
.calculate{
  background-color: red;
  text-align: center;
  color: #fff;
}
</style>