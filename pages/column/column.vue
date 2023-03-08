<template>
	<view>
		<view class="position-relative">
			<image :src="detail.cover" class="bigImg"></image>
			<view class="position-absolute type p-1 font-sm">专栏</view>
		</view>
		
		<tab :current="current" :tabs="tabs" @change="clickTab"></tab>
		
		<!-- <view class="flex flex-column p-2">
			<text class="mb-1" style="font-size: 38rpx;">{{detail.title}}</text>
			<text class="pb-2 text-light-muted font-sm">{{detail.sub_count}}人学过</text>
			<view v-if="!detail.isbuy" class="flex align-end">
				<text class="text-danger font-lg">￥{{detail.price}}</text>
				<text class="font-sm text-light-muted ml-1 text-through">￥{{detail.t_price}}</text>
			</view>
		</view> -->
		
		<view class="divider"></view>
		<view v-if="current === 0">
			<uni-card title="专栏简介" isFull :border="false" :isShadow="false">
				<mp-html :content="detail.content">
					<view class="flex justify-center p-3 text-light-muted">
						加载中...
					</view>
				</mp-html>
			</uni-card>
		</view>
		<view v-else class="animate__animated animate__fadeIn animate__faster">
			<view class="p-3">
				<view class="border rounded bg-light text-muted p-2">
					共 {{list.length}} 节
				</view>
			</view>
			<menu-item v-for="(item,index) in list" :key="index" :index="index" :title="item.title" @click="handleMenuItem(item)">
				<view disabled="flex" >
					<text class="mr-1 border text-danger rounded font-small px-1" style="border-color: red;">{{item.type | formateType}}</text>
					<text v-if="item.price == 0" class="border text-danger rounded font-small px-1" style="border-color: red;">免费试看</text>
				</view>
			</menu-item>
			
		</view>
		
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
				list:[]
			};
		},
		onLoad(e){
			this.detail.id = e.id
			if(!this.detail.id){
				this.$showToast('参数不合法')
				setTimeout(() => {
					uni.navigateBack({
						detal:1
					})
				},800)
				return 
			}
			this.getColumnDetail()

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
		//重新回到页面进行重新获取数据
		onShow(){
			this.getColumnDetail()
		},
		methods:{
			handleMenuItem(item){
				if(item.price != 0 && !this.detail.isbuy){
					return this.$showToast('请先进行购买专栏')
				}
				let url = '/pages/course/course?id=' + item.id + '&column_id=' + this.detail.id
				this.authJump(url)
			},
			clickTab(index){
				this.current = index
			},
			//获取课程详情数据
			getColumnDetail(){
				this.$api.getColumnDetail({
					id:this.detail.id
				}).then(res => {
					this.detail = res
					this.list = res.column_courses
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
