<template>
	<view class="py-3 px-2">
		<view class="flex text-white mb-3" v-for="(item,index) in list" :key="index" :class="item.btn != '立即使用' ? 'coupon-used' : ''">
			<view class="flex flex-column flex-1 bg-hover-warning p-2 " 
			style="border-right: 4rpx dashed #FFFFFF;" :class="">
				<text class="font-lg">￥{{item.price}}</text>
				<text class="font-sm">适用{{item.type}}:{{item.title}}</text>
			</view>
			<view hover-class="bg-hover-warning" class="flex align-center justify-center bg-warning" style="width:200rpx;" >{{item.btn}}</view>
		</view>
		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadStatus:'loading',
				page:1,
				limit:10,
				list:[]
			};
		},
		created(){
			this.getMyCouponList()
		},
		onPullDownRefresh(){
			this.page = 1
			this.getMyCouponList().finally(()=>{
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom(){
			if(this.loadStatus !== 'more'){
				return
			}
			this.page = this.page + 1
			this.getMyCouponList()
		},
		methods:{
			getMyCouponList(){
				this.$api.getUserCoupon({page:this.page,limit:this.limit}).then(res => {
					res.rows = this.formatList(res.rows)
					this.list = this.page === 1 ? res.rows : [...this.list,...res.rows],
					this.loadStatus = res.rows.length < this.limit ? 'nomore' : 'more' 
				}).catch(err => {
					this.loadStatus = 'more'
					if(this.page > 1){
						this.page = this.page - 1
					}
				})
			},
			formatList(list){
				list.forEach(item => {
					const now = new Date().getTime()
					const end = new Date(item.end_time).getTime()
					item.expired  = now > end 
					item.type = item.type === 'course' ? '课程' : '专栏'
					item.btn = item.used ? '已使用' : (item.expired ? '已过期' : '立即使用')
				})
				return list
			}
		}
	}
</script>

<style lang="scss">
.coupon-used>view{
	background-color: #CCCCCC!important;
}
</style>
