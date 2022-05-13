<template>
  <div>
    <h2>详情页</h2>
  </div>
</template>

<script>
export default {
  name:"Detail",
  data(){
      return{
          iid:null
      }
  },
  created(){
      this.iid = this.$route.params.id
  }
}
</script>

<style>

</style>