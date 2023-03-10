import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state:{
		user:null,
		token:null
	},
	mutations:{
		setUserInfo(state,user){
			state.user = user
			state.token = user.token
			uni.setStorageSync('user',JSON.stringify(user))
			uni.$emit('userLogin')
		},
		init(state){
			const user = uni.getStorageSync('user') || ''
			if(user){
				state.user = JSON.parse(user)
				state.token = state.user.token
			}
		},
		updateUserInfo(state,form){
			state.user = Object.assign(state.user,form)
			uni.setStorageSync('user',JSON.stringify(state.user))
		},
		clearUserInfo(state){
			state.user = ''
			state.token = ''
			uni.removeStorageSync('user')
			uni.$emit('userLogout')
		}
	},
	actions:{
		
	}
})

export default store