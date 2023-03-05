<template>
	<view>
		<tab :current.sync="current" :tabs="tabs"></tab>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current:0,
				tabs:['课程','专栏']
			};
		},
		//点击导航栏的输入框的钩子函数
		onNavigationBarSearchInputClicked(){
			uni.navigateBack({
				delta:1
			})
		},
		methods:{
			handleTitle(index){
				this.current = index
			}
		}
	}
</script>

<style lang="scss">

</style>
