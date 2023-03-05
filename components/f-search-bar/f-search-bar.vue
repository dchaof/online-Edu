<template>
	<view class="p-2" @click="handleSearch">
		<view style="background-color: #f5f5f1;color: #928e8a;"
		 class="py-2 flex justify-center align-center rounded">
			<uni-icons color="#928e8a" type="search" size="20"></uni-icons>
			<text class="ml-2">请输入搜索内容</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"f-search-bar",
		data() {
			return {
				
			};
		},
		methods:{
			handleSearch(){
				uni.navigateTo({
					url:'/pages/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">

</style>