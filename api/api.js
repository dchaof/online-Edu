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
	}
}