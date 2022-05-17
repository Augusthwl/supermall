<template>
  <div class="check-button" :class="{check: isChecked}">
      <img src="@/assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
name:"CheckButton",
props:{
    isChecked:{
        type:Boolean,
        default:false
    }
},
methods:{

}
}
</script>

<style scoped>
.check-button{
    border-radius: 50%;
    border: 2px solid #aaa;
}
.check-button img{
    height: 22px;
    width: 22px;
}
.check{
    background-color: red;
    border-color: red;
}
</style>