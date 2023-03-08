<template>
	<view class="bg-light">
		<view class="px-5 pt-3">
			<image :src="poster" mode="aspectFill" class="bg-hover-light"
			 style="width: 100%;height: 400rpx;border-radius: 20rpx;"></image>
		</view>
		
		<view class="f-audio-slider pb-2 mb-3">
			<slider @changing="handleChanging" :max="duration"  @change="handleChange" active-color="rgb(92, 204, 132)" 
			 block-color="rgb(92, 204, 132)"block-size="12"/>
			<text class="current-time">{{currentTime | formatTime}}</text>
			<text class="duration">{{duration | formatTime}}</text>
		</view>
		
		<view class="f-audio-btn flex justify-center align-center pb-3"> 
			<text class="iconfont icon-ziyuan11" :style="loopStatus ? 'color:rgb(92, 204, 132);' : ''" @click="loop"></text>
			<text class="iconfont mx-3" :class="isPlaying ? 'icon-tianchongxing-' : 'icon-bofang2'" @click="play"></text>
			<text class="iconfont icon-shoucang1"></text>
		</view>
	</view>
</template>

<script>
	import tool from '@/common/tool.js'
	export default {
		name:"f-audio",
		data() {
			return {
				_audioContext:null,
				isPlaying:false,
				isPlayEnd:false,
				currentTime:0,
				duration:1,
				_isChanging:false,
				loopStatus:false
			};
		},
		props:{
			src:{
				type:String,
				default:''
			},
			poster:{
				type:String,
				default:''
			}
		},
		filters:{
			formatTime(value){
				if(value == 0){
					return '00:00:00'
				}
				return tool.formatSeconds(value)
			}
		},
		created(){
			this.createAudio()
		},
		computed: {
			position() {
				return this.isPlayEnd ? 0 : this.currentTime
			}
		},
		beforeDestroy() {
			if(this._audioContext != null && this.isPlaying){
				this.stop()
			}
		},
		methods:{
			//创建音频组件
			createAudio(){
				this._audioContext = uni.createInnerAudioContext()
				this._audioContext.src = this.src
				this._audioContext.autoplay = false
				//播放的回调
				this._audioContext.onPlay(() => {
					console.log('开始播放')
				})
				//播放状态
				this._audioContext.onCanplay(()=>{
					this.duration = this._audioContext.duration
				})
				//暂停的回调
				this._audioContext.onPause(() => {
					this.isPlaying = false
				})
				//播放完成的回调
				this._audioContext.onEnded(() => {
					this.isPlaying = false
					this.isPlayEnd = false
				})
				//正在播放中的回调
				this._audioContext.onTimeUpdate((e) => {
					if(this._isChanging){
						return
					}
					this.currentTime = this._audioContext.currentTime
					this.duration = this._audioContext.duration
				})
				//错误的回调
				this._audioContext.onError(() => {
					this.isPlaying = false
				})
				
			},
			//完成拖动后的回调
			handleChange(e){
				console.log(e.detail)
				this._isChanging = false
				this._audioContext.seek(e.detail.value)
			},
			//拖动滑块的回调
			handleChanging(e){
				this._isChanging = true
			},
			//点击循环的回调
			loop(){
				this.loopStatus = !this.loopStatus
				this._audioContext.loop = this.loopStatus
				this.$showToast((this.loopStatus ? '开启' : '关闭') + '循环')
			},
			//点击播放的回调
			play(){
				if(this.isPlaying){
					return this.pause()
				}
				this.isPlaying = true
				this._audioContext.play()
				this.isPlayEnd = false
			},
			//暂停
			pause(){
				this._audioContext.pause()
				this.isPlaying = false
			},
		}
	}
</script>

<style>
.f-audio-slider {
	position: relative;
}
.f-audio-slider text {
	position: absolute;
	top: 35rpx;
	font-size: 12px;
}
.f-audio-slider text:first-of-type{
	left: 25rpx;
}
.f-audio-slider text:last-of-type{
	right: 25rpx;
}
.f-audio-btn text:first-child,.f-audio-btn text:last-child{
	font-size: 30px;
	color: #BBBBBB;
}
.f-audio-btn text:nth-child(2){
	color: rgb(92, 204, 132);
	font-size: 80rpx;
}
</style>