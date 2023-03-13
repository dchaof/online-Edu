//接口文件
import api from './request.js'


export default {
	//获取首页数据
	getIndexData(){
		return api.get('/mobile/index')
	},
	//获取拼团数据
	getGroup(params){
		return api.get('/mobile/group',params)
	},
	//获取秒杀数据
	getFlashsale(params){
		return api.get('/mobile/flashsale',params)
	},
	//获取优惠券列表
	getCouponList(){
		return api.get('/mobile/coupon')
	},
	//用户注册
	userReg(data){
		return api.post('/mobile/reg',data)
	},
	//用户登录
	userLogin(data){
		return api.post('/mobile/login',data)
	},
	//用户绑定手机
	bindMobile(data){
		return api.post('/mobile/bind_mobile',data)
	},
	//获取验证码
	getCaptcha(data){
		return api.post('/mobile/get_captcha',data)
	},
	//找回密码
	forget(data){
		return api.post('/mobile/forget',data)
	},
	//退出登录
	logout(){
		return api.post('/mobile/logout')
	},
	//修改密码
	updatePassword(data){
		return api.post('/mobile/update_password',data)
	},
	//上传图片
	uploadImage(data,option){
		return api.upload('/mobile/upload',data,option)
	},
	//修改用户资料
	updateUserInfo(data){
		return api.post('/mobile/update_info',data)
	},
	//获取我的订单列表
	getOrderList(params){
		return api.get('/mobile/order/list',params)
	},
	//获取优惠券列表
	getUserCoupon(params){
		return api.get('/mobile/user_coupon',params)
	},
	//领取优惠券
	receiveCoupon(data){
		return api.post('/mobile/user_coupon/receive',data)
	},
	//搜索课程或者专栏
	getMobileSearch(params){
		return api.get('/mobile/search',params)
	},
	//获取课程详情数据
	getCourseDetail(params){
		return api.get('/mobile/course/read',params)
	},
	//获取专栏的详情数据
	getColumnDetail(params){
		return api.get('/mobile/column/read',params)
	},
	//获取学习的记录
	getStudyHistory(params){
		return api.get('/mobile/user_history/list',params)
	},
	//更新学习的进度
	updateProgress(data){
		return api.post('/mobile/user_history/update',data)
	},
	//获取社区列表
	getBbsList(params){
		return api.get('/mobile/bbs',params)
	},
	//获取帖子的列表
	getPostList(params){
		return api.get('/mobile/post/list',params)
	},
	//点赞
	supportPost(data){
		return api.post('/mobile/post/support',data)
	},
	//取消点赞
	unsupportPost(data){
		return api.post('/mobile/post/unsupport',data)
	},
	//发布帖子
	submitPost(data){
		return api.post('/mobile/post/save',data)
	},
	//获取帖子详情信息
	readPost(params){
		return api.get('/mobile/post/read',params)
	},
	//获取帖子的评论列表
	getCommentList(params){
		return api.get('/mobile/post_comment',params)
	},
	//发表评论
	postReply(data){
		return api.post('/mobile/post/reply',data)
	},
	//获取我的帖子列表
	getMyPost(params){
		return api.get('/mobile/mypost',params)
	},
	//删除我的帖子
	deletePost(data){
		return api.post('/mobile/post/delete',data)
	}
}