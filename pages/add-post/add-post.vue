<template>
	<view>
		<!-- 选择列表组件 -->
		<picker mode="selector" :range="menus" @change="handleChange">
			<view class="p-2">
				<button type="default" size="mini" style="width: 100%;">{{activeIndex === -1 ? '选择社区' : menus[activeIndex]}}</button>
			</view>
		</picker>
		
		<uni-card v-for="(item,index) in form" :key="index" title=" " extra="删除" isFull @click-extra="deleteForm(index)">
			<textarea v-model="item.text" placeholder="请填写帖子内容" class="bg-light font-md rounded p-2" style="width: 100%;box-sizing: border-box;"/>
			<view style="margin: 0 -20rpx;">
				<upload-image :list="item.images" @change="handleUploadImage($event,item)"></upload-image>
			</view>
		</uni-card>
		
		
		<view style="height: 55px;"></view>
		<view class="fixed-bottom bg-white border-top" style="height: 55px;">
			<main-button @click="addForm">添加内容</main-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menus:[],
				//社区menus列表一一对应的id数组
				menuIds:[],
				activeIndex:-1,
				form:[{
					text:"",
					images:[]
				}]
			};
		},
		onShow(){
			this.getMenusList()
		},
		onNavigationBarButtonTap(){
			this.submit()
		},
		methods:{
			//点击提交的按钮
			submit(){
				if(this.activeIndex === -1){
					return this.$showToast('请先选择社区')
				}
				uni.showLoading({
					title:'提交中...',
					mask:false
				})
				this.$api.submitPost({
					bbs_id:this.menuIds[this.activeIndex],
					content:this.form
				}).then(res => {
					uni.navigateBack({
						delta:1
					})
				}).finally(() => {
					uni.hideLoading()
				})
				uni.$emit('freshPostList')
			},
			//获取社区列表
			getMenusList(){
				this.$api.getBbsList({
					page:1,
					limit:100
				}).then(res => {
					res.rows.forEach(item => {
						this.menus.push(item.title)
						this.menuIds.push(item.id)
					})
				})
			},
			//上传成功图片的修改form的函数
			handleUploadImage(imageList,item){
				item.images = imageList.map(o => o.path)
				console.log(item.images)
			},
			//点击选择社区的按钮
			handleChange(e){
				this.activeIndex = e.detail.value
			},
			//点击card的删除
			deleteForm(index){
				this.form.splice(index,1)
			},
			//点击添加
			addForm(){
				this.form.push({
					text:"",
					images:[]
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
