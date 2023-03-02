<template>
	<view>
		<button @click="handleLogin" type="primary">登录</button>
		<view>{{user ? user.username : '未登录'}}</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				user:null
			};
		},
		created(){ 
			this.user = this.$store.state.user
		},
		computed:{
			
		},
		methods:{
			handleLogin(){
				uni.navigateTo({
					url:"/pages/login/login"
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
