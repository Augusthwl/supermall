<template>
<div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
        <span class="n-price">{{goods.newPrice}}</span>
        <span class="o-price">{{goods.oldPrice}}</span>
        <span class="discount" v-if="goods.discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
        <span>{{goods.columns[0]}}</span>
        <span>{{goods.columns[1]}}</span>
        <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
        <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
            <img :src="goods.services[index-1].icon" alt="">
            <span>{{goods.services[index-1].name}}</span>
        </span>
    </div>
</div>
</template>

<script>
export default {
name:'DetailBaseinfo',
props:{
    goods:{
        type:Object,
        default(){
            return {}
        }
    }
},
}
</script>

<style scoped>
.info-title {
    margin: 10px 0;
	padding: 0 4px;
	font-size: 14px;
	line-height: 20px;
}
.info-price {
	display: flex;
	padding:0 4px 10px;
}
.n-price {
	color: var(--color-high-text)
}
.o-price {
	color: #999;
	font-size: 12px;
	margin: 0 4px;
	text-decoration: line-through;
}
.discount {
	color: #fff;
	font-size: 12px;
	border-radius: 100px;
	padding: 2px 6px;
	background-color: var(--color-high-text);
} 
.other-info {
	display: flex;
	color: #999;
	font-size: 12px;
	padding: 10px 4px;
	border-bottom: 1px solid #ededed;
	border-top: 1px solid #ededed;
}
div {
    flex: 1;
}
.info-service {
	display: flex;
	font-size: 12px;
	color: #333;
	padding: 10px 4px;
	justify-content: space-between;
	border-bottom: 4px solid #ededed;
}
 .info-service img {
	width: 12px;
	height: 12px;
	vertical-align: middle;
} 
</style>