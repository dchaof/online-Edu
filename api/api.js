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
	}
}