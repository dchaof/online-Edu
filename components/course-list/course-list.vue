<template>
	<view class="scroll-row-item course" :class="'course-'+this.type">
		<view class="position-relative" >
			<image :src="item.cover"></image>
			<view class="p-1 font-sm">{{item.type | formatType}}</view>
		</view>
		<view class="flex flex-column">
			<text class="text-ellipsis">{{item.title}}</text>
			<view class="font-sm text-light-muted pt-1">10人已抢</view>
			<view class="flex flex-1 justify-start align-center">
				<text class="font-md text-danger">￥{{item.price}}</text>
				<text class="font-sm text-light-muted">￥{{item.t_price}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	const opt = {
		media:'图文',
		audio:'音频',
		video:'视频',
		column:'专栏'
	}
	export default {
		name:"course-list",
		props:{
			item:{
				type:Object,
				default:() => {}
			},
			type:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				
			};
		},
		filters:{
			formatType(k){
				return opt[k]
			}
		}
	}
</script>

<style>
.course {
	
}
.course-two {
	width: 340rpx;
	margin-left: 20rpx;
	margin-bottom: 20rpx;
}
.course-one {
	display: flex !important;
	padding: 20rpx 0;
}
.course-two image,.course-two view:first-child {
	width: 340rpx;
	height: 180rpx;
}
.course-two view:last-child>text:first-child {
	margin-top: 10rpx;
}
.course-one image,.course-one>view:first-child {
	width: 300rpx;
	height: 170rpx;
}
.course-one>view:first-child {
	margin-right: 20rpx;
}
.course view:first-child>view {
	position: absolute;
	bottom: 20rpx;
	right: 10rpx;
	background-color: rgba(0,0,0,.5);
	color: white;
}
.course-one>view:last-child{
	width: 400rpx;
}
</style>