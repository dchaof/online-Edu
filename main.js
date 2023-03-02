
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import api from './api/api.js'
import store from './store/store.js'

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$store = store
Vue.prototype.$showToast = function(title){
	uni.showToast({
		title,
		icon:"none"
	})
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
		store,
    app
  }
}
// #endif