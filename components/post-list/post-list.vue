<template>
	<view>
		<view class="p-3">
			<view class="flex justify-between align-center">
				<view class="flex align-center">
					<image :src="item.user.avatar" mode="aspectFill" style="width: 75rpx;height: 75rpx;border-radius: 50%;" class="mr-2"></image>
					<view class="flex flex-column">
						<text class="text-primary font-weight-bold">{{item.user.name}}</text>
						<text class="text-muted" style="font-size: 22rpx;">{{item.user.sex}}</text>
					</view>
				</view>
				<view class="iconfont icon-gengduo1 font"></view>
			</view>
			
			<view v-if="!iscontent" class="py-2">
				<text>{{item.desc.text}}</text>
				<view class="flex flex-wrap">
					<view class="flex justify-center align-center mt-2" style="width: 33.33%;" v-for="(src,srcI) in item.desc.images" :key="srcI">
						<image :src="src" mode="aspectFill" style="width: 220rpx;height: 220rpx;" class="rounded"></image>
					</view>
				</view>
			</view>
			<view v-else>
				<view class="flex flex-column p-2" v-for="(item2,index2) in item.content" :key="index2">
					<text class="mb-1">{{ item2.text }}</text>
					<image v-for="(img,imgI) in item2.images" :key="imgI" :src="img" mode="widthFix" style="max-width: 100%;"></image>
				</view>
			</view>
			
			<view v-if="!iscontent" class="flex align-center justify-between mt-2">
				<view class="flex align-center">
					<view class="mr-3 flex align-center">
						<text class="iconfont icon-pinglun2 mr-1"></text>
						<text class="font-small">{{item.comment_count === 0 ? '评论' : item.comment_count}}</text>
					</view>
					<view class="flex align-center "
					 :class="item.issupport ? 'text-danger' : ''"
					 @click="$emit('handleSupport',item.id)">
						<text class="iconfont iconfont icon-dianzan2 mr-1"></text>
						<text class="font-small">{{item.support_count === 0 ? '点赞' : item.support_count}}</text>
					</view>
					<button v-if="showDelete"  type="warn" size="mini" class="ml-3" @click="deletePost(item.id)">删除</button>
				</view>
				<text class="text-light-muted font">{{item.created_time}}</text>
			</view>
			
		</view>
		<view v-if="!iscontent" class="divider"></view>
	</view>
</template>

<script>
	export default {
		name:"post-list",
		props:{
			item:Object,
			iscontent:{
				type:Boolean,
				default:false
			},
			showDelete:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			deletePost(id){
				this.$emit('delete',id)
			}
		}
	}
</script>

<style lang="scss">

</style>