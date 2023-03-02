<template>
	<view class="p-2">
		<scroll-view scroll-x="true" class="scroll-row">
			<!-- 将view组件设置为inline-flex 并且把scroll添加上scroll-row的类名就可以水平排列  .scroll-row{ width: 100%;white-space: nowrap; }-->
			<view class="text-white mr-3" style="width: 310rpx;height: 125rpx;display: inline-flex;" v-for="item in 3" :key="item">
				<view class="flex px-3 py-2 flex-column justify-center align-center bg-hover-warning" style="border-right: 4rpx dashed white;">
					<text>￥100</text>
					<text class="font-sm">满￥200可用</text>
				</view>
				<view hover-class="bg-hover-warning" class="flex justify-center align-center bg-warning" style="width: 110rpx;">
					<text>领取</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"coupon-list",
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>