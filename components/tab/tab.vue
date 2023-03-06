<template>
	<view class="flex" style="border-bottom: 1rpx solid #f4f4f4;">
		<view class="tab-item" v-for="(item,index) in tabs" :key="index" @click="$emit('change',index)">
			<text class="font-md" :class="index === current ? 'tab-item-active' : ''">{{item.name}}</text>
			<view v-if="index === current" class="tab-line animate__animated animate__fadeIn animate__faster"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"tab",
		data() {
			return {
				
			};
		},
		props:{
			current:{
				type:Number,
				default:0
			},
			tabs:{
				type:Array
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	.tab-item {
		position: relative;
		padding: 20rpx;
		color: #888888;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
	.tab-line {
		width: 50rpx;
		height: 10rpx;
		background-color: #00CF8A;
		border-radius: 10rpx;
		position: absolute;
		bottom: 0;
	}
	.tab-item-active{
		color: #00CF8A;
		font-weight: bold;
	}
</style>