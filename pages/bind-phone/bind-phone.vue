<template>
	<view>
		<view class="back-icon flex justify-center align-center" @click="handleBack">
			<uni-icons type="back" size="30" color="#fff"></uni-icons>
		</view>
		<!-- 背景 -->
		<view class="bg-login"></view>
		<!-- 白色背景 -->
		<view class="login">
			<view class="flex">
				<text class="title">绑定手机号</text>
			</view>
			<view class="login-form">
				<uni-icons type="person"></uni-icons>
				<input type="text" class="rounded font-md" placeholder="手机号" v-model="form.phone">
			</view>
			<view class="login-form">
				<uni-icons type="locked"></uni-icons>
				<input type="text" class="font-md" placeholder="验证码" v-model="form.code">
				<send-code></send-code>
			</view>
			<view class="login-button bg-main" hover-class="bg-main-hover" @click="submit">绑 定</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:"login",
				form:{
					phone:"",
					code:"",
				},
			};
		},
		methods:{
			handleBack(){
				uni.navigateBack({
					delta:1
				})
			},
			submit(){
				let data = Object.assign(this.form,{})
				// this.$api.userLogin(data).then(res => {
				// 	this.$store.commit('setUserInfo',res)
				// 	//清空表单
				// 	//提示
				// 	this.$showToast('登录成功')
				// 	if(!res.phone){
				// 		uni.navigateTo({
				// 			url:'/pages/bind-phone/bind-phone'
				// 		})
				// 	}
				// })
			}
		}
	}
</script>

<style lang="scss">
	
</style>
