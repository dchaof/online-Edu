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
				<text class="title">找回密码</text>
			</view>
			<view class="login-form">
				<uni-icons type="person"></uni-icons>
				<input type="text" class="rounded font-md" placeholder="手机号" v-model="form.phone">
			</view>
			<view class="login-form">
				<uni-icons type="locked"></uni-icons>
				<input type="text" class="font-md" placeholder="验证码" v-model="form.code">
				<send-code :form="form"></send-code>
			</view>
			<view class="login-form">
				<uni-icons type="locked"></uni-icons>
				<input type="password" class="font-md" placeholder="请输入密码" v-model="form.password">
			</view>
			
			<view class="login-form">
				<uni-icons type="locked"></uni-icons>
				<input type="password" class="font-md" placeholder="请确认密码" v-model="form.repassword">
			</view>
			<view class="login-button bg-main" hover-class="bg-main-hover" @click="submit">找 回</view>
			
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
					password:'',
					repassword:""
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
				uni.showLoading({
					title:'提交中',
					mask:false
				})
				let data = Object.assign(this.form,{})
				this.$api.forget(data).then(res => {
					//提示
					this.$showToast('修改成功')
					setTimeout(()=>{
						this.handleBack()
					},350)
				}).finally(() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss">
	
</style>
