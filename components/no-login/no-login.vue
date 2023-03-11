<template>
	<view class="noLogin">
			<image src="/static/noLogin.png" style="width: 350rpx;height: 350rpx;"></image>
			<text class="text-muted font my-2">登录后才可以查看我的学习哦</text>
			<button type="default" size="mini" plain @click="handleLogin">立即登录</button>
	</view>
</template>

<script>
	export default {
		name:"no-login",
		data() {
			return {
				
			};
		},
		methods:{
			handleLogin(){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}
		}
	}
</script>

<style lang="scss">
.noLogin {
	display:flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #FFFFFF;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}
</style>