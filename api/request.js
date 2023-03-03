import store from '../store/store.js'
export default {
	config:{
		APP_ID:'bd9d01ecc75dbbaaefce',
		BASE_URL:'http://demonuxtapi.dishait.cn',
		//请求拦截器
		beforeRequest(option = {}){
			return new Promise((resolve,reject) => {
			option.url = this.BASE_URL + option.url;
			option.method = option.method || "GET"
			option.header = {
					appid:this.APP_ID,
					token:store.state.token
				};
			resolve(option)
			})
		},
		//响应拦截器
		handleResponse([error,res]){
			return new Promise((resolve,reject) => {
				if(res.statusCode !== 200 || res.data.msg === 'fail'){
					uni.showToast({
						title:res.data.data || '请求失败',
						icon:'none'
					})
					reject(res.data.data)
					uni.stopPullDownRefresh()
				}
				resolve(res.data.data)
				uni.stopPullDownRefresh()
			})
		},
	},
	
	request(option){
		return this.config.beforeRequest(option).then(opt => {
			return uni.request(opt).then(this.config.handleResponse)
		})
	},
	//get请求
	get(url,params=null,option={}){
		option.url = url
		option.url += params ? ('?'+ Object.keys(params).map(key => key+'='+params[key]).join('&')) : ''
		option.method = "GET"
		return this.request(option)
	},
	//post请求
	post(url,data={},option={}){
		option.url = url
		option.data = data
		option.method = "POST"
		return this.request(option)
	},
	//上传图片
	upload(url,data={},option={}){
		option.url = url
		return this.config.beforeRequest(option).then(opt => {
			return new Promise((resolve,reject) => {
				let uploadTask = uni.uploadFile({
					url:opt.url,
					filePath:data.filePath,
					name:data.name || 'files',
					header:opt.header,
					success:res => {
						console.log(res)
						if(res.statusCode !== 200){
							reject('上传失败')
							return uni.showToast({
								title:'上传失败',
								icon: 'none'
							})
						}
						let message = JSON.parse(res.data)
						resolve(message.data)
					},
					fail: (err) => {
						console.log(err);
						reject(err.message)
					}
				})
				uploadTask.onProgressUpdate(res => {
					if(option.onProgress && typeof option.onProgress === 'function'){
						option.onProgress(res.progress)
					}
				})
			})
		})
	}
}