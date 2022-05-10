<template>
  <div class="recommend">
    <div v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div class="title">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
name:"HomeRecommend",
props:{
  recommends:{
    type:Array,
    default(){
      return []
    }
  }
}
}
</script>

<style>
.recommend{
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;

  padding: 10px 0 20px;
  border-bottom: 8px solid #eee;
}
.recommend-item{
  flex:1
}
.recommend img{
  margin-bottom: 10px;
  width: 80%;
  height: 80%;
}
</style>