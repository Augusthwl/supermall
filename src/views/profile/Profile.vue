<template>
  <div>
    <scroll class="content">
      <ul>
        <li>列表1</li>
        <li>列表1</li>
        <li>列表1</li>
        <li>列表1</li>
        <li>列表1</li>
        <li>列表1</li>
        <li>列表1</li>
        <li>列表1</li>
        <li>列表1</li>
        <li>列表1</li>
        <li>列表1</li>
        <li>列表1</li>
        <li>列表1</li>
        <li>列表1</li>
        <li>列表1</li>
        <li>列表1</li>
        <li>列表1</li>
        <li>列表1</li>
        <li>列表1</li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

export default {
  name:"Profile",
  components:{
    Scroll
  }
}
</script>

<style scoped>
.content{
  height:300px;
  background-color:pink;
  overflow:hidden;
}
</style>