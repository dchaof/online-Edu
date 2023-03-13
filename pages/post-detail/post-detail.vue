<template>
	<view>
		<post-list :item="detail" iscontent></post-list>
		
		<!-- 评论 -->
		<view class="px-2">
			<view class="comment-list" v-for="(item,index) in comments" :key="index">
				<image :src="item.user.avatar" mode="aspectFill" class="face"></image>
				<view class="flex-1">
					<view class="top">
						<text>{{item.user.name}}</text>
					</view>
					<view class="content" @click="openComment({ reply_id:item.id,reply_user:item.user })">
						<text>{{item.content}}</text>
					</view>
					<view class="date">
						<text>{{item.created_time | formateHumenTime}}</text>
					</view>
					<!-- 回复 -->
					<view class="bg-light px-2 mt-2" v-for="(reply,rI) in item.post_comments" :key="rI">
						<view class="comment-list">
							<image :src="reply.user.avatar" mode="aspectFill" class="face"></image>
							<view class="flex-1">
								<view class="top">
									<text class="mr-1">{{reply.user.name}}</text>
									<text>@{{ reply.reply_user.username }}</text>
								</view>
								<view class="content" @click="openComment({ reply_id:item.id,reply_user:item.user })">
									<text>{{reply.content}}</text>
								</view>
								<view class="date">
									<text>{{reply.created_time | formateHumenTime}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	
		<!-- 加载更多 -->
		<button type="default" size="mini" style="width:100%;" @click="handleMore" :disabled="loadStatus !== 'more'">
		{{loadStatus === 'more' ? '加载更多' : (loadStatus === 'noMore' ? '没有更多内容' : '加载中...')}}</button>
	
		<!-- 发表评论 -->
		<view style="height: 50px;"></view>
		<view style="height: 50px;z-index: 1;" class="fixed-bottom bg-white flex align-center px-3">
			<view class="border rounded flex-1 px-2 py-1 text-light-muted bg-light mr-2" @click="openComment(false)">说一句吧</view>
			<view class="flex align-center" :class="detail.issupport ? 'text-danger' : ''" @click="handleSupport">
				<text class="iconfont icon-dianzan2" style="font-size: 20px;"></text>
				<text class="ml-1">{{ detail.support_count || '点赞' }}</text>
			</view>
		</view>
		
		<comment-popup ref="popupComment" @sendComment="sendComment"></comment-popup>
	</view>
</template>

<script>
	import tool from '@/common/tool.js';
	export default {
		filters:{
			formateHumenTime(value){
				return tool.getHumanTime(value)
			}
		},
		data() {
			return {
				detail:{
					"id": 0,
					"content": [],
					"user_id": 0,
					"comment_count": 0,
					"support_count": 0,
					"is_top": 0,
					"created_time": "",
					"user": {
						"id": 0,
						"avatar": "",
						"sex": "未知",
						"name": ""
					},
					"issupport": false
				},
				page:1,
				comments:[],
				loadStatus:"more",
				commentForm:{
					reply_id:0,
					reply_user:null
				}
			};
		},
		onLoad(e) {
			if(!e.id){
				this.$toast('非法参数')
				return uni.navigateBack({
					delta: 1
				});
			}
			this.detail.id = e.id
			this.$api.readPost({
				id:e.id
			}).then(res=>{
				this.detail = res
				console.log(this.detail);
			})
			this.getCommentList()
		},
		methods:{
			//发表评论
			sendComment(content){
				let params = {
					post_id:this.detail.id,
					content,
					reply_id:0
				}
				if(this.commentForm.reply_user){
					params.reply_id = this.commentForm.reply_id
					params.reply_user = this.commentForm.reply_user
				}
				this.$api.postReply(params).then(res => {
					this.$showToast('发表成功')
					this.page = 1
					this.getCommentList()
					uni.$emit('freshPostList')
					this.$refs.popupComment.clearContent()
				})
				
			},
			//点赞
			handleSupport(){
				let item = this.detail
				let k = item.issupport ? 'unsupportPost' : 'supportPost'
				let msg = item.issupport ? '取消点赞' : '点赞成功'
				this.$api[k]({
					post_id:item.id
				}).then(res => {
					item.issupport ? item.support_count-- : item.support_count++
					item.issupport = !item.issupport
					this.$showToast(msg)
				}).then(() => {
					uni.$emit('freshPostList')
				})
			},
			//点击说一句
			openComment(u){
				if(u){
					this.commentForm.reply_id = u.reply_id
					this.commentForm.reply_user = u.reply_user
					this.commentForm.reply_user.username = u.reply_user.name
				}else {
					this.commentForm = {
						reply_id:0,
						reply_user:null
					}
				}
				this.$refs.popupComment.open()
			},
			//点击加载更多的回调
			handleMore(){
				if(this.loadStatus !== 'more') return 
				this.page ++ 
				this.getCommentList()
			},
			//获取评论列表
			getCommentList(){
				this.loadStatus = 'loading'
				this.$api.getCommentList({
					post_id:this.detail.id,
					page:this.page
				}).then(res=>{
					let { rows } = res
					this.comments = this.page == 1 ? rows : [...this.comments, ...rows]
					this.loadStatus = rows.length < 10 ? 'noMore' : 'more'
				}).catch(err=>{
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
.comment-list {
	display: flex;
	flex-wrap: nowrap;
	width: 100%;
	padding: 20rpx 0;
}
.comment-list .face {
	width: 70rpx;
	height: 70rpx;
	border-radius: 50%;
	flex-shrink: 0;
	margin-right: 20rpx;
	background-color: #EEEEEE;
}
.comment-list .top{
	color: #007AFF;
	font-size: 24rpx;
}
.comment-list .content{
	padding: 8rpx 0;
}
.comment-list .date{
	color: #666666;
	font-size: 24rpx;
}
</style>
