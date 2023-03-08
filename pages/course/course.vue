<template>
	<view>
		<view v-if="!detail.isbuy" class="position-relative">
			<image :src="detail.cover" class="bigImg"></image>
			<view class="position-absolute type p-1 font-sm">{{detail.type | formateType}}</view>
		</view>
		<video v-else-if="detail.type === 'video'" :src="detail.content" 
		controls style="width: 100%; height: 420rpx;" :poster="detail.cover"></video>
		<f-audio v-else-if="detail.type === 'audio'" :src="detail.content" :poster="detail.cover"></f-audio>
		
		<tab :current="current" :tabs="tabs" @change="clickTab"></tab>
		
		<view class="flex flex-column p-2">
			<text class="mb-1" style="font-size: 38rpx;">{{detail.title}}</text>
			<text class="pb-2 text-light-muted font-sm">{{detail.sub_count}}人学过</text>
			<view v-if="!detail.isbuy" class="flex align-end">
				<text class="text-danger font-lg">￥{{detail.price}}</text>
				<text class="font-sm text-light-muted ml-1 text-through">￥{{detail.t_price}}</text>
			</view>
		</view>
		
		<view class="divider"></view>
		<!-- 需要双重判断，如果时视频的的话这里只能显示课程介绍 -->
		<uni-card :title="(detail.isbuy && detail.type == 'media') ? '课程内容': '课程介绍'" isFull :border="false" :isShadow="false">
			<mp-html :content="(detail.isbuy && detail.type == 'media') ? detail.content: detail.try">
				<view class="flex justify-center p-3 text-light-muted">
					加载中...
				</view>
			</mp-html>
		</uni-card>
		
		<template v-if="!detail.isbuy && isFirstLoading">
			<view style="height: 75px;"></view>
			<view class="fixed-bottom p-2 border-top bg-white">
				<main-button>立即订购</main-button>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//用来控制下方订购按钮防止已经购买过显示出来
				isFirstLoading:false,
				detail:{
					id: null, 
					title: "", 
					cover: "", 
					try: "", 
					price: "", 
					t_price: "", 
					type: "", 
					sub_count: 0, 
					content: "", 
					isbuy: true, 
					isfava: true 
				},
				tabs:[
					{name:'介绍'},
					{name:'目录'}
				],
				current:0,
				column_id:0
			};
		},
		onLoad(e){
			this.detail.id = e.id
			this.column_id = e.column_id
			if(!this.detail.id){
				this.$showToast('参数不合法')
				uni.navigateBack({
					detal:1
				})
				return 
			}
			
			this.getCourseDetail()
			
		},
		
		filters:{
			formateType(key){
				const type = {
					media:"图文",
					audio:"音频",
					video:"视频"
				}
				return type[key]
			}
		},
		methods:{
			clickTab(index){
				this.current = index
			},
			//获取课程详情数据
			getCourseDetail(){
				this.$api.getCourseDetail({
					id:this.detail.id,
					column_id:this.column_id
				}).then(res => {
					this.detail = res
					uni.setNavigationBarTitle({
						title:this.detail.title
					})
				}).catch(err => {
					console.log(err)
					setTimeout(() => {
						uni.navigateBack({
							detal:1
						})
					},800)
				}).finally(() => {
					this.isFirstLoading = true
				})
			}
		}
		
	}
</script>

<style lang="scss">
.bigImg {
	width: 100%;
	height: 420rpx;
}
.type {
	bottom: 30rpx;
	right: 20rpx;
	background-color: rgba(0,0,0,.5);
	color: white;
}
</style>
