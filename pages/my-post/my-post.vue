<template>
	<view>
		
		<post-list showDelete v-for="(item,index) in list" :key="index" :item="item" @support="handleSupport" @delete="handleDelete"></post-list>
		
		<uni-load-more :status="loadStatus"></uni-load-more>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadStatus:"loading",
				page:1,
				limit:5,
				list:[]
			}
		},
		created() {
			this.getData()
		},
		onPullDownRefresh() {
			this.refresh()
		},
		onReachBottom() {
			this.handleLoadMore()
		},
		methods: {
			handleDelete(id){
				uni.showModal({
					content: '是否要删除该帖子？',
					success: (res)=> {
						if (res.confirm) {
							uni.showLoading({
								title: '删除中...',
								mask: false
							});
							this.$api.deletePost({
								id
							}).then(res2=>{
								this.$showToast('删除成功')
								this.refresh()
							}).finally(()=>{
								uni.hideLoading()
							})
						}
					}
				});
			},
			handleSupport(id){
				let item = this.list.find(o=>o.id == id)
				if(!item) return
				
				let k = !item.issupport ? 'supportPost' : 'unsupportPost'
				let msg = !item.issupport ? '点赞成功' : '取消点赞'
				
				this.$api[k]({
					post_id:item.id
				}).then(res=>{
					item.support_count = !item.issupport ? (item.support_count + 1) : (item.support_count - 1)
					item.issupport = !item.issupport
					this.$showToast(msg)
				})
			},
			refresh(){
				this.page = 1
				this.getData().finally(()=>{
					uni.stopPullDownRefresh()
				})
			},
			handleLoadMore(){
				if(this.loadStatus != 'more'){
					return
				}
				this.page = this.page + 1
				this.getData()
			},
			getData(){
				let page = this.page
				return this.$api.getMyPost({
					page:this.page,
					limit:this.limit
				}).then(res=>{
					console.log(res);
					this.list = page == 1 ? res.rows : [...this.list,...res.rows]
					this.loadStatus = res.rows.length < this.limit ? 'noMore' : 'more'
				}).catch(err=>{
					this.loadStatus = 'more'
					if(page > 1){
						this.page = this.page - 1
					}
				})
			}
		}
	}
</script>

<style>

</style>
