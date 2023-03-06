<template>
	<view class="flex flex-column" style="height: 100%;">
		<!-- 专栏课程的选择组件 -->
		<tab :current="current" :tabs="tabs" @change="clickTab"></tab>
		<!-- swiper组件 -->
		<swiper :current="current" :duration="1000" class="flex-1 flex flex-column" @change ="swiperChange">
			<swiper-item class="flex flex-1" v-for="(t,tI) in tabs" :key="tI">
				<scroll-view scroll-y="true" class="flex flex-column flex-1" @scrolltolower="handleGetMore(t)">
					<course-list v-for="(item,index) in t.list" :key="index" :item="item" type="one"></course-list>
					<!-- 用来展示是否还有更多数据的组件 -->
					<uni-load-more :status="t.loadStatus"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current:0,
				tabs:[{
					name:"课程",
					loadStatus:"more",
					list:[],
					page:1,
					type:"course"
				},{
					name:"专栏",
					loadStatus:"more",
					list:[],
					page:1,
					type:"column"
				}],
				keyword:""
			};
		},
		//点击导航栏的输入框的钩子函数
		onNavigationBarSearchInputClicked(){
			uni.navigateBack({
				delta:1
			})
		},
		//初次加载
		onLoad(e){
			this.keyword = e.keyword
			this.getMobileSearch()
		},
		methods:{
			//点击顶部的tab的回调
			clickTab(index){
				this.swiperChange({
					detail:{
						current:index
					}
				})
			},
			//滑动swiper组件的回调
			swiperChange(e){
				this.current = e.detail.current
				let tabs = this.tabs[this.current]
				if(tabs.loadStatus === 'more' && tabs.page === 1){
					this.getMobileSearch()
				}
			},
			//获取搜索的数据
			getMobileSearch(){
				let tab = this.tabs[this.current]
				tab.loadStatus = 'loading'
				let params = {
					keyword: this.keyword,
					type:tab.type,
					page:tab.page
				}
				this.$api.getMobileSearch(params).then(res => {
					tab.list = tab.page === 1 ? res.rows : [...tab.list,...res.rows]
					tab.loadStatus = res.rows.length >= 10 ? 'more' : 'nomore'
				}).catch(err => {
					tab.loadStatus = more
					if(tab.page > 1){
						tab.page = tab.page -1
					}
				})
			},
			//下拉到底获取更多的数据
			handleGetMore(t){
				if(t.loadStatus !== 'more') return 
				t.page = t.page -1 
				this.getMobileSearch()
			}
		}
	}
</script>

<style lang="scss">
page{
	display: flex;
	flex-direction: column;
	height: 100%;
}
</style>
