import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Home from '@/pages/home'
import Index from '@/pages/index'
import Empty from '@/pages/empty'
import Login from '@/components/pwd_login'
import QRLogin from '@/components/QR_login'
import ResetPwd from '@/components/reset_pwd'
import PersonalMsg from '@/components/personal_msg'

/*-----------------------------------Toast弹出层-----------------------------------*/
import Toast from '@/components/toast'
// 返回一个 扩展实例构造器
const ToastConstructor = Vue.extend(Toast)
// 定义弹出组件的函数 接收2个参数, 要显示的文本 和 显示时间
function showToast(text, duration) {
 	// 实例化一个 toast.vue
 	const toastDom = new ToastConstructor({
 		el: document.createElement('div'),
 		data() {
 			return {
 				text:text
 			}
 		},
 		mounted(){
 			// 过了 duration 时间后隐藏
 			setTimeout(() => {
 				document.body.removeChild(toastDom.$el)
		 	} ,duration)
 		}
 	})
 	// 把 实例化的 toast.vue 添加到 body 里
 	document.body.appendChild(toastDom.$el)
 	toastDom.$el.innerHTML = text
 	
}
// 注册为全局组件，这样就可以在所有 vue 的实例里面使用 this.$toast()
Vue.prototype.$toast = showToast
/*-----------------------------------Toast弹出层-----------------------------------*/



Vue.use(Router)
//let router = new Router({hashbang: false, history: true})
export default new Router({
//	mode:'history',
  	routes: [
	  	{
	  		path: '/',
			redirect: '/home/login'
	  	},
    	{
      		path: '/home',
      		name: 'Home',
      		component: Home,
      		children: [
	      		{
		      		path: '/home/login',
		      		name: 'Login',
		      		component: Login
		    	},
		    	{
		      		path: '/home/qr_Login/:init',      //init值   0：首次登录，1：再次登录
		      		name: 'QRLogin',
		      		component: QRLogin
		    	},
		    	{
		      		path: '/home/reset_pwd',
		      		name: 'ResetPwd',
		      		component: ResetPwd
		    	},
		    	{
		      		path: '/home/personal_msg',
		      		meta: {keepAlive: false},
		      		name: 'PersonalMsg',
		      		component: PersonalMsg
		    	}
      		]	
    	},
    	{
    		path: '/index/:sign',		//sign值   0为默认值， 2001 该用户没有此系统权限     2002  本系统内该账号已停用     2003 token认证失败  
      		name: 'Index',
      		component: Index
    	},
    	{
    		path: '/empty/:per_msg',
      		name: 'Empty',
      		component: Empty
    	},
    	{
    		path: '/toast',
      		name: 'Toast',
      		component: Toast
    	}
  	]
})
