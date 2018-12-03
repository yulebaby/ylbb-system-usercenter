<template>
	<div class="home_content">
		<div class="module_box">
			<a href="javascript:void(0)" v-for="systemMsg in listMsg" @click="enter(systemMsg.id , systemMsg.url)"><img class="moduleImg" :src="'static/img/'+systemMsg.id+'@2x.png'"/></a>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				listMsg:''
			}
		},
		mounted(){
			
			if(this.$route.params.sign=="noUserName"){
				this.$toast('没有此系统的登录权限',1000)
			}else if(this.$route.params.sign=="stageLocked"){
				this.$toast('本系统内此账号已停用',1000)
			}else if(this.$route.params.sign=="tokenError"){
				this.$toast('登录认证失败 ,请重新登录尝试',1000)
			}else{
				
			}
			
			this.list()
		},
		methods:{
			list(){
				this.axios.post(process.env.domain+'/user/index').then(res => {
					this.listMsg=res.data.result.list;
					console.log(res.data)
				});
			},
			enter(id , url){
//				alert(url)
				if(id==1){
					this.axios.post(process.env.domain +'/user/workOrder').then(res => {
						if(res.data.code==1000){
							window.open(url+"?userInfo="+encodeURI(JSON.stringify(res.data.result)));
						}else if(res.data.code==1004){
							window.location.href="http://ucenter.beibeiyue.com";
						}else if(res.data.code==1041){
							this.$toast('没有此系统的登录权限',1000)
						}else if(res.data.code==1002){
							this.$toast('当前用户已被锁定，无法登录',1000)
						}else if(res.data.code==1042){
							this.$toast('系统错误-联系管理员',1000)
						}
						
					});
				}else{
					this.axios.post(process.env.domain +'/user/checkLoginAuth',{id:id}).then(res => {
						console.log(res.data);
						if(res.data.code==1000){
							window.open(res.data.result)
						}else if(res.data.code==1004 || res.data.code==1024){
							this.$toast('登录超时，请重新登录',1000)
							window.location.href="http://ucenter.beibeiyue.com";
						}else if(res.data.code==1008){
							this.$toast('没有此系统的登录权限',1000)
						}else if(res.data.code==1002){
							this.$toast('当前用户已被锁定，请联系管理员',1000)
						}else if(res.data.code==1013){
							this.$toast('系统错误-联系管理员',1000)
						}else if(res.data.code==1042){
							this.$toast('系统错误-联系管理员',1000)
						}
						
					});
				}
			}
		}
	}
</script>

<style scoped>
	.home_content{width:100%;height:100%;background:#E9E9E9;}
	.module_box{width:1138px;padding-top:250px;margin:0 auto;}
	.module_box>a{display:inline-block;}
	.moduleImg{width:281px;height:168px;}
	
	@media screen and (max-width: 1280px) {
		.moduleImg{width:263px;height:150px;}
	}
</style>