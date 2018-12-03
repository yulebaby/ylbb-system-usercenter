<template>
	<!--修改密码-->
	<form class="modify_box" autocomplete='off'>
		<div class="modify_titile">好成长企业员工密码修改</div>
		<div class="email_box input_box">
			<input class="email" type="text" placeholder="企业邮箱前缀" v-model='email' v-on:blur.lazy='emailBlur' @keydown.enter="resetPwdEnter($event)" autoComplete="off"/>
			<span style='color:#898989;position: absolute;right:15px;top:16px;'>@beibeiyue.com</span>
			<div class="error_prompt" >{{emailMsg}}</div>
		</div>
		<div class="Verify_box  input_box  clearfix">
			<input class="Verify" type="text" placeholder="验证码" v-model='Verify' maxlength="6"  v-on:blur.lazy='VerifyBlur'  @keydown.enter="resetPwdEnter($event)"/>
			<input class="getVerify" type="button" :value="VerifyText" :style='{"background": bg ,"border-color": bg}' @click='getVerify'/>
			<div class="error_prompt">{{VerifyMsg}}</div>
		</div>
		<div class="pwd_box  input_box">
			<input class="newcode" type="password" placeholder="请输入新密码" v-model='newPwd' v-on:blur.lazy='pwdBlur'  @keydown.enter="resetPwdEnter($event)" maxlength="18"/>
			<div class="error_prompt">{{pwdMsg}}</div>
		</div>
		<div class="comfirmPwd_box  input_box">
			<input class="comfirmPwd" type="password" placeholder="请确认新密码" v-model='correctPwd' v-on:blur.lazy='correctBlur' @keydown.enter="resetPwdEnter($event)" maxlength="18"/>
			<div class="error_prompt">{{correctMsg}}</div>
		</div>
		<input class="resetPwd" type="button" value="确认重置" @click='resetPwd'/>
		<div class="msg_prompt" v-if='code==1007'>
			<span>{{info}}</span>
		</div>
	</form>
</template>

<script>
	export default{
		data(){
			return{
				email:'',
				Verify:'',
				newPwd:'',
				correctPwd:'',
				emailMsg:'',
				VerifyMsg:'',
				pwdMsg:'',
				correctMsg:'',
				bg:'#297CFE',
				VerifyText:'获取验证码',
				show: true,
			   	count: '',
			   	timer: null,
				resMsg:0,
				code:'',
				info:''
			}
		},
		methods: {
			emailBlur(){
				const emailTest = /^[A-Za-z0-9@.]{2,17}$/;
				if(this.email){
					if(!emailTest.test(this.email)){
						this.emailMsg='请填写正确的邮箱';
					}else{
						this.emailMsg='';
					}
				}
			},
			VerifyBlur(){
				if(this.Verify){
					this.VerifyMsg='';
				}
			},
			pwdBlur(){
				let reg=/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,18}$/;;
				if(this.newPwd){
					if(!reg.test(this.newPwd)){
						this.pwdMsg='密码格式为：大小写字母、数字、特殊符号至少选三种，长度为8-18';
					}else{
						
						this.pwdMsg='';
					}
				}
			},
			correctBlur(){
				if(this.correctPwd){
					if(this.correctPwd!=this.newPwd){
						this.correctMsg='两次密码不一致';
					}else{
						this.correctMsg='';
					}
				}
			},
			getVerify(){
				if(!this.email){
					this.emailMsg='邮箱不能为空';
				}else{
					if(this.email.indexOf('@beibeiyue.com') && !this.email.split('@beibeiyue.com')[1]){
		        		this.email=this.email.split('@beibeiyue.com')[0];
		        	}
					let emailTest = /^[A-Za-z0-9@.]{2,17}$/;
					if(emailTest.test(this.email)){
						if(this.show==true){
							this.show = false;
							this.axios.post(process.env.domain+'/user/forgetPwdCode?userEmail='+this.email+'@beibeiyue.com').then(res => {
								console.log(res.data);
								this.code=res.data.code;
								this.info=res.data.info;
								if(res.data.code==1000){
									//倒计时
									const TIME_COUNT = 60;
								    if (!this.timer) {
								       	this.count = TIME_COUNT;
								       	
								       	this.timer = setInterval(() => {
								       		this.bg='#ccc'
								       	if (this.count > 0 && this.count <= TIME_COUNT) {
								         	this.count--;
								         	this.VerifyText=this.count+'s后重新发送'
								        } else {
								         	this.show = true;
								         	clearInterval(this.timer);
								         	this.timer = null;
								         	this.VerifyText='重新发送验证码'
								         	this.bg='#297CFE'
								        }
								       }, 1000)
								    }
								}else if(res.data.code==1005){
									this.show=true
									this.emailMsg=res.data.info;
								}else if(res.data.code==1007){
									this.show=true
									this.$router.push('/home/qr_Login/0');
								}else if(res.data.code==1019){
									this.show=true
									this.emailMsg='请填写正确的邮箱';
								}else if(res.data.code==1041){
									this.show=true
									this.emailMsg='邮箱不存在';
								}else if(res.data.code==1042){
									this.show=true
									this.$toast('系统错误-联系管理员',1000)
								}else if(res.data.code==1002){
									this.show=true
									this.$toast('当前用户已被锁定，无法登录',1000)
								}
							});
						}
					}
				}
				
			},
			resetPwdEnter(ev){
				if(ev.keyCode == 13){
					this.resetPwd()
				}
			},
			resetPwd(){
				let reg=/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,18}$/;;
				if(!this.email){
					this.emailMsg='邮箱不能为空';
				}else if(!this.Verify){
					this.VerifyMsg='验证码不能为空';
				}else if(!this.newPwd){
					this.pwdMsg='密码不能为空';
				}else if(!reg.test(this.newPwd)){
					this.pwdMsg='密码格式为：大小写字母、数字、特殊符号至少选三种，长度为8-18';
				}else if(!this.correctPwd){
					this.correctMsg='两次密码不一致';
				}else{
					this.axios.post(process.env.domain+'/user/forgetPwd?userEmail='+this.email+'@beibeiyue.com'+'&newPwd='+this.newPwd+'&oldPwd='+this.correctPwd+'&code='+this.Verify).then(res => {
						console.log(res.data);
						this.code=res.data.code;
						if(this.code == 1000){
							this.$toast('修改成功',1000)
							setTimeout(() =>{
								this.$router.push('/');
							},2000)
						}else if(this.code == 1017){
							this.VerifyMsg=res.data.info;
						}else if(this.code == 1005){
							this.pwdMsg=res.data.info;
						}
					});
				}
				
			}
		}
	}
</script>

<style scoped>
	
	input::-webkit-input-placeholder { /* WebKit browsers */ font-size:16px;color:#898989;} 
	input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ font-size:16px;color:#898989;} 
	input::-moz-placeholder { /* Mozilla Firefox 19+ */ font-size:16px;color:#898989;} 
	input:-ms-input-placeholder { /* Internet Explorer 10+ */ font-size:16px;color:#898989;}
	/*修改密码*/
	.modify_box{width:567px;height:564px;background:#fff;margin:258px auto 0;padding:66px 64px 0 65px;text-align:center;}
	.modify_titile{color:#3C3C3C;font-size:28px;font-weight:bold;padding-bottom:10px;margin-bottom:26px;text-align:center;border-bottom:2px solid #E9E9E9;}
	/*input_box*/
	.input_box{padding-bottom:22px;position:relative;}
	.email_box{}
	.email{width:438px;height:49px;padding-left:24px;border:2px solid #e9e9e9;border-radius:6px;outline:none;}
	.Verify_box{position:relative;}
	.Verify{width:250px;height:49px;padding-left:24px;float:left;border:2px solid #e9e9e9;border-radius:6px;outline:none;}
	.getVerify{width:178px;height:49px;color:#fff;font-size:18px;background:#297CFE;float:right;border:2px solid #297CFE;border-radius:6px;outline:none;cursor:pointer;}
	.pwd_box{}
	.newcode{width:438px;height:49px;padding-left:24px;border:2px solid #e9e9e9;border-radius:6px;outline:none;}
	.comfirmPwd_box{}
	.comfirmPwd{width:438px;height:49px;padding-left:24px;border:2px solid #e9e9e9;border-radius:6px;outline:none;}
	.resetPwd{width:297px;height:58px;color:#fff;font-size:20px;background:#297CFE;margin:14px auto 0;border:2px solid #297CFE;border-radius:6px;outline:none;cursor:pointer;}
	/*error_prompt*/
	.error_prompt{color:#FE2929;font-size:12px;padding-left:5px;position: absolute;bottom:3px;}
	/*msg_prompt*/
	.msg_prompt{width:460px;height:40px;position:absolute;top:20px;}
	.msg_prompt>span{background:rgba(255,255,255,0.4);border:1px solid #fff;border-radius:10px;padding:10px 20px;margin: 0 auto;}
	
	@media screen and (max-width: 1280px){
		/*修改密码*/
		.modify_box{width:536px;height:533px;background:#fff;margin:258px auto 0;padding:66px 61px 0 62px;text-align:center;}
		.modify_titile{color:#3C3C3C;font-size:28px;font-weight:bold;padding-bottom:10px;margin-bottom:26px;text-align:center;border-bottom:2px solid #E9E9E9;}
		/*input_box*/
		.input_box{padding-bottom:22px;position:relative;}
		.email_box{}
		.email{width:414px;height:49px;padding-left:24px;border:2px solid #e9e9e9;border-radius:6px;outline:none;}
		.Verify_box{position:relative;}
		.Verify{width:236px;height:49px;padding-left:24px;float:left;border:2px solid #e9e9e9;border-radius:6px;outline:none;}
		.getVerify{width:169px;height:49px;color:#fff;font-size:18px;background:#297CFE;float:right;border:2px solid #297CFE;border-radius:6px;outline:none;cursor:pointer;}
		.pwd_box{}
		.newcode{width:414px;height:49px;padding-left:24px;border:2px solid #e9e9e9;border-radius:6px;outline:none;}
		.comfirmPwd_box{}
		.comfirmPwd{width:414px;height:49px;padding-left:24px;border:2px solid #e9e9e9;border-radius:6px;outline:none;}
		.resetPwd{width:297px;height:58px;color:#fff;font-size:20px;background:#297CFE;margin:14px auto 0;border:2px solid #297CFE;border-radius:6px;outline:none;cursor:pointer;}
		/*error_prompt*/
		.error_prompt{color:#FE2929;font-size:12px;padding-left:5px;position: absolute;bottom:3px;}
	}				
</style>