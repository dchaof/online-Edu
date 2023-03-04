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
				<send-code :form="form"></send-code>
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
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			submit(){
				uni.showLoading({
					title:'绑定中',
					mask:false
				})
				let data = Object.assign(this.form,{})
				this.$api.bindMobile(data).then(res => {
					//提示
					this.$showToast('绑定成功')
					this.$store.commit('updateUserInfo',{phone:data.phone})
					setTimeout(()=>{
						this.handleBack()
					},350)
					console.log(this.$store.state.user)
				}).finally(() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss">
	
</style>
