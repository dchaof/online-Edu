<template>
	<view>
		<view class="flex align-center p-3 border-bottom" hover-class="bg-light" @click="$emit('click')">
			<text class="flex-shrink text-muted" style="width: 90rpx;">{{(index+1) | formateIndex}}</text>
			<view class="flex flex-column align-start ">
				{{title}}
				<slot></slot>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"menu-item",
		data() {
			return {
				
			};
		},
		props:{
			title:{
				type:String,
				default:''
			},
			index:{
				type:Number,
				default:0
			}
		},
		filters:{
			formateIndex(value){
				if(value < 10){
					return '00' + value
				}
				if(value >= 10 && value <100){
					return '0'+value
				}
			}
		}
	}
</script>

<style lang="scss">

</style>