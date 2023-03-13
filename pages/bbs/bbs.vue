<template>
	<view>
		<scroll-view scroll-x="true" class="scroll-row py-2 px-1" @scrolltolower="handleMoreBbs">
			<view :class="activeBbs === index ? 'bg-main text-white' : 'bg-light text-muted'" class="mt-2 px-2 py-1 scroll-row-item border rounded mr-1 font-sm"
			 v-for="(item,index) in bbs" :key="index" @click="handleBbsItem(index)">{{item.title}}</view>
			<view class="scroll-row-item">
				<uni-load-more :status="bbsLoadStatus" ></uni-load-more>
			</view>
		</scroll-view>
		<view class="divider"></view>
		<view class="flex py-3">
			<view class="flex-1 flex justify-center align-center">总帖子{{postCount}}</view>
			<view class="flex-1 flex justify-center align-center">总用户{{userCount}}</view>
		</view>
		<view class="divider"></view>
		
		<post-list v-for="(item,index) in postListData" :key="index" :item="item"
		 @handleSupport="handleSupport" @click.native="handlePostList(item)"></post-list>
		<uni-load-more :status="postListLoadStatus"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bbsPage:1,
				bbsLoadStatus:'loading',
				bbs:[],
				activeBbs:0,
				userData:{},
				userCount:0,
				postCount:0,
				postListQuery:{
					page:1,
					keyword:'',
					bbs_id:0
				},
				postListLoadStatus:'',
				postListData:[]
			};
		},
		onShow(){
			this.getBbslist()
			this.getPostList()
		},
		//下拉刷新
		onPullDownRefresh(){
			this.refresh()
		},
		onLoad(){
			uni.$on('freshPostList',this.refresh)
		},
		beforeDestroy(){
			uni.$off('freshPostList',this.refresh)
		},
		//上拉加载
		onReachBottom(){
			if(this.postListLoadStatus !== 'more') return 
			this.postListQuery.page ++ 
			this.getPostList()
		},
		//点击标题栏的按钮回调
		onNavigationBarButtonTap(){
			uni.navigateTo({
				url:'/pages/add-post/add-post'
			})
		},
		onNavigationBarSearchInputConfirmed(e){
			this.postListQuery = {
				page:1,
				keyword:e.text,
				bbs_id:0
			}
			this.getPostList()
		},
		methods:{
			//点击进入帖子详情页面
			handlePostList(item){
				uni.navigateTo({
					url:'/pages/post-detail/post-detail?id='+item.id
				})
			},
			//点击回调的函数
			handleSupport(id){
				let item = this.postListData.find(o => {
					return o.id === id
				})
				if(!item) return 
				let k = item.issupport ? 'unsupportPost' : 'supportPost'
				let msg = item.issupport ? '取消点赞' : '点赞成功'
				this.$api[k]({
					post_id:id
				}).then(res => {
					item.issupport ? item.support_count-- : item.support_count++
					item.issupport = !item.issupport
					this.$showToast(msg)
				})
			},
			//刷新
			refresh(){
				this.postListQuery.page = 1
				this.getBbslist().finally(() => {
					uni.stopPullDownRefresh()
				})
			},
			//获取帖子列表
			getPostList(){
				this.postListLoadStatus = 'loading'
				this.$api.getPostList(this.postListQuery).then(res => {
					this.postListData = this.postListQuery.page === 1 ? res.rows : [...this.postListData,...res.rows],
					this.postListLoadStatus = res.rows.length < 10 ? 'nomore' : 'more'
				}).catch(err => {
					if(this.postListQuery.page > 1){
						this.postListLoadStatus = 'more'
						this.postListQuery.page = this.postListQuery.page-1
					}
				})
			},
			//点击某一个bbs 
			handleBbsItem(index){
				if(index === this.activeBbs) return 
				this.activeBbs = index
				this.postListQuery.page = 1
				this.postListQuery.bbs_id = this.bbs[index].id
				this.postListData = []
				this.getPostList()
			},
			//获取更多的bbs数据
			handleMoreBbs(){
				if(this.bbsLoadStatus !== 'more') return 
				this.bbsPage++
				this.getBbslist()
			},
			//获取社区列表
			getBbslist(){
				this.bbsLoadStatus = "loading"
				let params = {
					bbsPage:this.bbsPage
				}
				return this.$api.getBbsList(params).then(res => {
					let bbs = this.bbsPage === 1 ? res.rows : [...this.bbs,...res.rows]
					this.bbsLoadStatus = res.rows.length < 10 ? 'noMore' : 'more'
					this.userCount = res.userCount,
					this.postCount = res.postCount
					if(this.bbsPage === 1){
						bbs.unshift({
							title:'全部',
							id:0
						})
					}
					this.bbs = bbs
				}).catch(err => {
					console.log(res)
					if(this.bbsPage > 1){
						this.bbsLoadStatus = 'more'
						this.bbsPage = this.bbsPage - 1 
					}
				})
			}
		}
	}
</script>

<style lang="scss">
</style>
