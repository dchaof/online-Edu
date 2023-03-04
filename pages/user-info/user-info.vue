<template>
	<view>
		<uni-list :border="false">
			<uni-list-item clickable title="头像" :border="false"  class="py-1" @click="handleAvatar">
				<image slot="footer" :src="form.avatar" style="width: 75rpx;height: 75rpx;border-radius: 50%;"></image>
			</uni-list-item>
			<uni-list-item clickable title="昵称" :border="false"  class="py-1">
				<input type="text" slot="footer" style="text-align: right;" placeholder="请设置" placeholder-style="color:#ccc;" v-model="form.nickname">
			</uni-list-item>
			<uni-list-item clickable title="性别" :border="false"  class="py-1" @click="handleSex">
				<text slot="footer">{{form.sex || '未知'}}</text>
			</uni-list-item>
			<uni-list-item clickable title="手机" :border="false"  class="py-1" @click="handlePhone">
				<text slot="footer">{{user.phone}}</text>
			</uni-list-item>
		</uni-list>
		<view class="px-3">
			<main-button @click="handleUpdate" bClass="mt-2">
				<text>提 交</text>
			</main-button>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				form:{
					avatar:'',
					nickname:'',
					sex:'未知'
				}
			};
		},
		created(){
			this.init()
		},
		computed:{
			...mapState({
				user:state => state.user
			})
		},
		methods:{
			init(){
				this.form = {
					avatar:this.user.avatar,
					nickname:this.user.nickname,
					sex:this.user.sex
				}
			},
			handleUpdate(){
				uni.showLoading({
					title:'绑定中',
					mask:false
				})
				this.$api.updateUserInfo(this.form).then(() => {
					this.$store.commit('updateUserInfo',this.form)
					this.$showToast('修改成功')
				}).finally(() => {
					uni.hideLoading()
				})
			},
			handleSex(){
				const itemList = ['未知','男','女']
				uni.showActionSheet({
					itemList,
					success:res => {
						this.form.sex =itemList[res.tapIndex]
					}
				})
			},
			handlePhone(){
				uni.navigateTo({
					url:'/pages/bind-phone/bind-phone'
				})
			},
			handleAvatar(){
				uni.chooseImage({
					count:1,
					success:res => {
						this.$api.uploadImage({filePath:res.tempFilePaths[0]},progress => {
							console.log('进度',progress)
						}).then(url => {
							this.form.avatar = url
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
