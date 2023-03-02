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
				<text class="title">{{type === 'login' ? '登录' : '注册'}}</text>
			</view>
			<view class="login-form">
				<uni-icons type="person"></uni-icons>
				<input type="text" class="rounded font-md" placeholder="请输入用户名" v-model="form.username">
			</view>
			<view class="login-form">
				<uni-icons type="locked"></uni-icons>
				<input type="password" class="font-md" placeholder="请输入密码" v-model="form.password">
			</view>
			
			<view class="login-form" v-if="type === 'reg'">
				<uni-icons type="locked"></uni-icons>
				<input type="password" class="font-md" placeholder="请确认密码" v-model="form.repassword">
			</view>
			<view class="login-button bg-main" hover-class="bg-main-hover" @click="submit">{{type === 'login' ? '登 录' : '注 册'}}</view>
			
			<view class="flex my-3 justify-between align-center">
				<text class="py-3 text-main" @click="changeType">{{type === 'login' ? '注册账号' : '去登录'}}</text>
				<text class="py-3 text-light-muted" @click="handleForget">忘记密码?</text>
			</view>
			
			<view class="flex justify-center align-center">
				<uni-icons class="weixinLogin" type="weixin" color="rgb(92, 204, 132)" size="25"></uni-icons>
			</view>
			
			<checkbox-group class="flex justify-center align-center mt-3" @change="checkboxChange">
				<label class="text-light-muted">
					<checkbox color="#48c574" style="transform: scale(0.7);"/><text class="font">已阅读并同意用户协议&隐私声明</text>
				</label>
			</checkbox-group>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:"login",
				form:{
					username:"",
					password:"",
					repassword:""
				},
				//同意用户协议
				confirm:false
			};
		},
		methods:{
			handleBack(){
				uni.navigateBack({
					delta:1
				})
			},
			changeType(){
				this.clearForm()
				this.type = this.type === 'login' ? 'reg' : 'login'
			},
			submit(){
				if(!this.confirm){
					uni.showToast({
						title:"请阅读并同意用户协议&隐私声明",
						icon:'none'
					})
					return 
				}
				let data = Object.assign(this.form,{})
				uni.showLoading({
					title:"提交中",
					mask:false
				})
				let key = this.type === 'reg' ? 'userReg' : 'userLogin'
				this.$api[key](data).then(res => {
					//清空表单
					this.clearForm()
					if(this.type === 'reg'){
						//提示
						this.$showToast('注册完成')
						//返回登录页
						this.changeType()
					}else{
						this.$store.commit('setUserInfo',res)
						//提示
						this.$showToast('登录成功')
						if(!res.phone){
							uni.navigateTo({
								url:'/pages/bind-phone/bind-phone'
							})
						}
					}
				}).finally(() => {
					uni.hideLoading()
				})
			},
			clearForm(){
				this.form = {
					username:"",
					password:"",
					repassword:""
				}
			},
			checkboxChange(e){
				this.confirm = !!e.detail.value.length
			},
			//点击忘记密码
			handleForget(){
				uni.navigateTo({
					url:'/pages/forget/forget'
				})
			}
		}
	}
</script>

<style lang="scss">
</style>
