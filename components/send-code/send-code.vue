<template>
	<view>
		<view class="bg-main code-btn" @click="sendCode">
			{{time === 0 ? '发送' : time+'s'}}
		</view>
	</view>
</template>

<script>
	let timer
	export default {
		name:"send-code",
		data() {
			return {
				time:0
			};
		},
		methods:{
			sendCode(){
				if(this.time > 0) return 
				this.time = 5
				timer = setInterval(() => {
					this.time--
					if(this.time <=0){
						clearInterval(timer)
					}
				},1000)
			}
		}
	}
</script>

<style>
.code-btn {
	position:absolute;
	top: 0;
	right: 0;
	height: 100rpx;
	width: 200rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 22rpx;
	color: #fff;
	border-radius: 10rpx;
}
</style>