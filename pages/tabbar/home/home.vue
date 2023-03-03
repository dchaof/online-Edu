<template>
	<view>
		<view class="home-bg position-relative">
			<view class="flex px-3 py-4 justify-center align-center" v-if="user">
				<image src="/static/uni.png" style="width:120rpx;height:120rpx;border-radius: 50%;"></image>
				<view class="flex flex-column justify-center align-left text-white ml-3 flex-1">
					<text>{{user.nickname || user.username || user.phone}}</text>
					<text class="font-sm mt-2">{{user.desc || '暂无介绍'}}</text>
				</view>
				<view>
					<text class="iconfont icon-leimupinleifenleileibie" style="color: white;font-size: 22px;" @click="goSetting"></text>
				</view>
			</view>
			<view class="flex px-3 py-4" v-else @click="handleLogin">
				<image src="/static/uni.png" style="width:120rpx;height:120rpx;border-radius: 50%;"></image>
				<view class="flex flex-column justify-center align-left text-white ml-3" >
					<text>立即登录</text>
					<text class="font-sm mt-2">登录解锁更多功能</text>
				</view>
			</view>
			
			
			<icons-card :icons="icons"></icons-card>
			
			<view class="px-3">
				<uni-list-item clickable title="我的优惠券" showArrow class="py-1" @click="authJump('/pages/my-coupon/my-coupon')">
					<text slot="header" class="iconfont icon-9 mr-2" style="font-size: 20px;color: #4396ec;"></text>
				</uni-list-item>
				<uni-list-item clickable title="常见问题" showArrow class="py-1">
					<text slot="header" class="iconfont icon-help mr-2" style="font-size: 20px;color: #4396ec;"></text>
				</uni-list-item>
				<uni-list-item clickable title="设置" showArrow class="py-1" @click="goSetting">
					<text slot="header" class="iconfont icon-leimupinleifenleileibie mr-2" style="font-size: 20px;color: #4396ec;"></text>
				</uni-list-item>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				icons:[{
					icon:"icon-OrderHistory",
					name:"订单"
				},{
					icon:"icon-pinglun2",
					name:"消息"
				},{
					icon:"icon-shoucang1",
					name:"收藏"
				},{
					icon:"icon-e-learning-monitor",
					name:"在学",
					type:"switchTab"
				}]
			};
		},
		computed:{
			...mapState({
				user:state => state.user
			})
		},
		methods:{
			handleLogin(){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			},
			goSetting(){
				uni.navigateTo({
					url:"/pages/setting/setting"
				})
			}
		},
		onNavigationBarButtonTap(){
			this.goSetting()
		}
	}
</script>

<style lang="scss">
	.home-bg {
		height: 310rpx;
		background-color: #5ccc84;
		border-bottom-right-radius: 30rpx;
		border-bottom-left-radius: 30rpx;
	}
</style>
