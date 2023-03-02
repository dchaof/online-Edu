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
		},
		init(state){
			const user = uni.getStorageSync('user') || ''
			if(user){
				state.user = JSON.parse(user)
				state.token = state.user.token
			}
		},
		setBindPhone(state,form){
			state.user = Object.assign(state.user,form)
			uni.setStorageSync('user',JSON.stringify(state.user))
		}
		
	}
})

export default store