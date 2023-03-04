<template>
	<view>
		<view v-for="(item,index) in orderList" :key="index">
			<uni-card isFull>
				<view>
					<view class="flex font-sm text-muted justify-between py-2">
						<text>订单时间:{{item.created_time}}</text>
						<text>订单号:{{item.no}}</text>
					</view>
					<view class="font-md">{{item.goods}}</view>
					<view class="flex font-md justify-end text-danger font-weight-bold">￥{{item.total_price}}</view>
				</view>
				<view slot="actions" class="flex" :class="item.status == 'success' ? 'text-success' : ''">
					<view class="font-md">{{item.status === 'success' ? '支付成功' : '等待支付'}}</view>
					<view class="ml-auto">
						<main-button bClass="px-2 font" v-if="item.status !== 'success'">立即支付</main-button>
					</view>
				</view>
			</uni-card>
			<view class="divider"></view>
		</view>
		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadStatus:"loading",
				page:1,
				limit:10,
				orderList:[],
			};
		},
		created(){
			this.getOrderList()
		},
		onPullDownRefresh(){
			this.page = 1
			this.getOrderList().finally(() => {
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom(){
			this.handleLoadMore()
		},
		methods:{
			handleLoadMore(){
				if(this.loadStatus != 'more'){
					return
				}
				this.page = this.page + 1
				this.getOrderList()
			},
			getOrderList(){
				return this.$api.getOrderList({
					page:this.page,
					limit:this.limit
				}).then(res => {
					this.orderList =  page === 1 ? res.rows : [...this.list,...res.rows]
					this.loadStatus = res.rows.length < this.limit ? 'nomore' : 'more'
				}).catch((err) => {
					this.loadStatus = 'more'
					if(this.page > 1){
						this.page = this.page - 1
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
