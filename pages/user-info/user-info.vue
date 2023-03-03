<template>
	<view>
		<uni-list :border="false">
			<uni-list-item clickable title="头像" :border="false"  class="py-1" @click="handleAvatar">
				<image slot="footer" :src="form.avatar" style="width: 75rpx;height: 75rpx;border-radius: 50%;"></image>
			</uni-list-item>
			<uni-list-item clickable title="昵称" :border="false"  class="py-1">
				<input type="text" slot="footer" style="text-align: right;" placeholder="请设置" placeholder-style="color:#ccc;" v-model="user.nickname">
			</uni-list-item>
			<uni-list-item clickable title="性别" :border="false"  class="py-1" @click="handleSex">
				<text slot="footer">{{form.sex || '未知'}}</text>
			</uni-list-item>
			<uni-list-item clickable title="手机" :border="false"  class="py-1">
				<text slot="footer">{{form.phone}}</text>
			</uni-list-item>
		</uni-list>
		<view class="px-3">
			<main-button @click="handleLogout" bClass="mt-2">
				<text>退出登录</text>
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
					nikename:'',
					sex:'未知',
					phone:''
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
					nikename:this.user.nikename,
					sex:this.user.sex,
					phone:this.user.phone
				}
			},
			handleLogout(){
				this.$api.logout().then(() => {
					this.$store.commit('clearUserInfo')
					uni.navigateTo({
						url:'/pages/tabbar/home/home'
					})
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
