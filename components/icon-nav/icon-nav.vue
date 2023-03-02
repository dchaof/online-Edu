<template>
	<view class="flex flex-wrap justify-center py-1">
		<view class="py-3 flex flex-column justify-center align-center" hover-class="bg-light"
		 style="width: 25%;"
		 v-for="item in list" :key="item.name" >
		 <image
			:src="item.src" mode="widthFix" style="width: 70rpx;height: 70rpx;border-radius: 50%;"></image>
		 <text class="font-sm text-muted mt-2">{{item.name}}</text>
		 </view>
	</view>
</template>

<script>
	export default {
		name:"icon-nav",
		props:{
			list:{
				type:Array,
				default:() => []
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>