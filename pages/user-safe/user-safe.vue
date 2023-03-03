<template>
	<view>
		<uni-list>
			<uni-list-item class="font-md" :border="false" title="原密码">
				<input v-model="form.opassword" type="text" slot="footer" placeholder="请输入原密码" style="text-align: right;" placeholder-style="color:#ccc">
			</uni-list-item>
			<uni-list-item class="font-md" :border="false" title="新密码">
				<input v-model="form.password" type="text" slot="footer" placeholder="请输入新密码" style="text-align: right;" placeholder-style="color:#ccc">
			</uni-list-item>
			<uni-list-item class="font-md" :border="false" title="确认密码">
				<input v-model="form.repassword" type="text" slot="footer" placeholder="请重新输入新密码" style="text-align: right;" placeholder-style="color:#ccc">
			</uni-list-item>
		</uni-list>
		
		<main-button @click="handleSave">
			<text>保存</text>
		</main-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					opassword:'',
					password:'',
					repassword:''
				}
			};
		},
		methods:{
			handleSave(){
				uni.showLoading({
					title:'提交中',
					mask:true
				})
				let data = Object.assign(this.form,{})
				this.$api.updatePassword(data).then(res => {
					uni.hideLoading()
					this.$showToast('修改成功')
					this.$store.commit('clearUserInfo')
					this.navigateTo('/pages/tabbar/home/home')
				})
				
			}
		}
	}
</script>

<style lang="scss">

</style>
