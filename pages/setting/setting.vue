<template>
	<view>
		<uni-list :border="false">
			<uni-list-item clickable title="账户安全" :border="false" showArrow class="py-1" @click="goUserSafe"></uni-list-item>
			<uni-list-item clickable title="清除缓存" :border="false"  class="py-1" @click="clear">
				<text slot="footer">{{size | formateSize}}</text>
			</uni-list-item>
			<uni-list-item clickable title="检查更新" :border="false"  showArrow class="py-1"></uni-list-item>
			<uni-list-item clickable title="当前版本" :border="false"  class="py-1">
				<text slot="footer">1.0.0</text>
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
	import tool from '../../common/tool.js'
	export default {
		data() {
			return {
				size:0,
				keys:[]
			};
		},
		created(){
			this.getSize()
		},
		filters:{
			formateSize(num){
				return tool.bytesToSize(num)
			}
		},
		methods:{
			handleLogout(){
				this.$api.logout().then(() => {
					this.$store.commit('clearUserInfo')
					uni.navigateTo({
						url:'/pages/tabbar/home/home'
					})
				})
			},
			goUserSafe(){
				uni.navigateTo({
					url:'/pages/user-safe/user-safe'
				})
			},
			clear(){
				uni.showModal({
					content:'你是否需要清除',
					success:(res) => {
						if(res.cancel){
							return
						}
						this.keys.forEach(item => {
							uni.removeStorageSync(item)
						})
						this.$showToast('清除成功')
						this.getSize()
					}
				})
				
			},
			//获取内存的大小
			getSize(){
				uni.getStorageInfo({
					success:res => {
						this.size = res.currentSize
						this.keys = res.keys.filter(k=>k != 'user')
					}
				})
			}
			
		}
	}
</script>

<style lang="scss">

</style>
