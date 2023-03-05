<template>
	<view>
		<!-- #ifdef MP -->
		<search-bar v-model="keyword" @confirm="handleSearchEvent()"></search-bar>
		<!-- #endif -->
		
		<view>
			<view class="flex justify-between align-center py-3 px-2">
				<text class="font-md font-weight-bold">搜索记录</text>
				<text class="font-sm text-light-muted" @click="clear">清除全部</text>
			</view>
			
			<view class="flex flex-wrap px-2" style="margin-right: -30rpx;">
				<text class="bg-hover-light px-2 py-1 font-sm rounded-circle historyItem" v-for="(item,index) in list" :key="index" @click="handleSearchEvent(item)">{{ item }}</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword:'',
				list:[]
			};
		},
		onNavigationBarSearchInputChanged(e){
			this.keyword = e.text
		},
		onNavigationBarSearchInputConfirmed(){
			this.handleSearchEvent()
		},
		onNavigationBarButtonTap(){
			this.handleSearchEvent()
		},
		onLoad() {
			let list = uni.getStorageSync('historyKeyword')
			if(list){
				this.list = JSON.parse(list)
			}
		},
		methods:{
			handleSearchEvent(value = ""){
				if(value){
					this.keyword = value
				}
				if(this.keyword === ''){
					return this.$showToast('请输入关键字')
				}
				uni.navigateTo({
					url:`/pages/search-result/search-result?keyword=${this.keyword}`
				})
				this.addHistory()
			},
			addHistory(){
				let index = this.list.findIndex(item => item === this.keyword)
				if(index !== -1){
					this.objToFirst(this.list,index)
				} else {
					this.list.unshift(this.keyword)
				}
				uni.setStorageSync('historyKeyword',JSON.stringify(this.list))
			},
			clear(){
				uni.showModal({
					content: '是否要清除搜索记录？',
					success: (res)=> {
						if (res.confirm) {
							this.list = []
							uni.removeStorageSync('historyKeyword')
						}
					}
				});
			},
			//将记录置顶
			objToFirst(list,index){
				if(index !== 0){
					list = list.unshift(list.splice(index,1)[0])
				}
				return list
			}
		}
	}
</script>

<style lang="scss">
.historyItem {
	margin-right: 25rpx;
	margin-bottom: 25rpx;
	line-height: 1;
	max-width: 300rpx;
	overflow: hidden;
	white-space:nowrap;
	text-overflow:ellipsis;
}
</style>
