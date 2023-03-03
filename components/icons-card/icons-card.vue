<template>
	<!-- 个人中心中间的icon图标 -->
	<view>
		<view class="px-3">
			<view class="flex bg-white shadow rounded ">
				<view hover-class="bg-light" class="py-3 flex flex-column align-center justify-center flex-1" v-for="(item,index) in icons" :key="index">
					<text class="iconfont font-weight-bolder" :class="item.icon" style="font-size: 20px;color: #febd00;"></text>
					<text class="font-sm mt-1">{{item.name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"icons-card",
		props:{
			icons:{
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

<style lang="scss">

</style>