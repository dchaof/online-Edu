<template>
	<view>
		<!-- 分割线 -->
		<view class="divider"></view>
		<!-- 课程列表 -->
		<view class="py-3 px-2 font-md" style="width: 100%;font-weight: 700;">{{type === 'group' ? '拼团' : '秒杀'}}</view>
		<scroll-view scroll-x="true" class="scroll-row">
			<course-list v-for="part in list" :key="part.id" :item="part" type="two"></course-list>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"active-list",
		props:{
			type:{
				type:String,
				default:'group'
			}
		},
		data() {
			return {
				//拼团列表
				list:[]
			};
		},
		created(){
			this.getList()
		},
		methods:{
			getList(){
				let k = this.type==='group' ? 'getGroup' : 'getFlashsale'
				this.$api[k]({
					usable:1
				}).then(res => {
					this.list = res.rows
				})
			}
		}
	}
</script>

<style>

</style>