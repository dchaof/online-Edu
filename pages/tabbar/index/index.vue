<template>
	<view>
		
		<block v-for="(item,index) in templates" :key="item.type">
			<f-search-bar v-if="item.type === 'search'" ></f-search-bar>
			
			<!-- 轮播图 -->
			<!-- indicator-dots是否有指示器  autoplay是否自动轮播   interval间隔多长时间轮播一次  duration动画时长 -->
			<swiper v-else-if="item.type === 'swiper'" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
			 style="height: 310rpx;">
				<swiper-item v-for="s in item.data" :key="s.src" class="flex justify-center" >
					<!-- 显示的模式 -->
					<image :src="s.src" style="width: 720rpx;height: 300rpx;" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			
			<!-- icon图标导航 -->
			<icon-nav v-else-if="item.type === 'icons'" :list="item.data"></icon-nav>
			
			<!-- 优惠券组件 -->
			<coupon-list ref="couponList" v-else-if="item.type === 'coupon'"></coupon-list>
			
			<template v-else-if="item.type === 'promotion'">
				<active-list :type="item.listType"></active-list>
			</template>
			
			<template v-else-if="item.type === 'list'">
				<view class="divider"></view>
				
				<!-- 课程列表 -->
				<view class="py-3 px-2 flex align-center justify-between">
					<text class="font-md font-weight-bold">最新课程</text>
					<text class="font-sm text-light-muted">查看全部</text>
				</view>
				<view >
					<course-list v-for="part in item.data" :key="part.id" :item="part" :type="item.listType"></course-list>
				</view>
			</template>
			
			<!-- 广告 -->
			<template v-else-if="item.type === 'imageAd'">
				<view class="divider"></view>
				<image :src="item.data" mode="aspectFill" style="width: 750rpx;height: 360rpx;"></image>
			</template>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//首页数据 排除拼团
				templates:[]
			}
		},
		created(){
			this.getIndexData()
			uni.$on('userLogin',this.refreshCouponList)
			uni.$on('userLogout',this.refreshCouponList)
		},
		destroyed(){
			uni.$off('userLogin',this.refreshCouponList)
			uni.$off('userLogout',this.refreshCouponList)
		},
		onPullDownRefresh(){
			this.getIndexData()
			this.refreshCouponList()
		},
		methods: {
			getIndexData(){
				this.$api.getIndexData().then(data => {
					this.templates = data
				})
			},
			refreshCouponList(){
				if(this.$refs.couponList && this.$refs.couponList[0]){
					this.$refs.couponList[0].getCouponList()
				}
			}
		}
	}
</script>

<style>
	
</style>
