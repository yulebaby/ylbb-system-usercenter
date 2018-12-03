<template>
	<div class="box clearfix">
		<div class="box_left clearfix">
			<div class="system_name"></div>
			<div class="logo"></div>
		</div>
		<!--密码登录-->
		<div class="box_right1">
			<div class="QRcode_box">
				<img src="../assets/login/QR_code_title@2x.png" alt="" class="QRcode_title"/>
				<router-link to='/home/qr_Login/1'>
					<img src="../assets/login/code@2x.png" alt="" class='QRcode'/>
				</router-link>
			</div>
			<form action="" class="pwdLogin_form clearfix">
				<div class="pwdLogin" v-if='!info' >企业邮箱登录</div>
				<div class="error_prompt" v-if='info'>
					<img class="error_icon" src="../assets/login/error@2x.png" alt="" />
					<!--<span class="error_text">{{info}}，是否<span class="forgetPwd_text">忘记密码</span></span>-->
					<span class="error_text">{{info}}</span>
				</div>
				<div></div>
				<div class="email_box input_box">
					<label for="" class="email_icon"></label>
					<input class="email" type="text" placeholder="企业邮箱前缀"  v-model='email' @keydown.enter="loginEnter($event)"/>
					<input class="email_end" type="text" value="@beibeiyue.com" readonly/>
				</div>
				<div class="password_box  input_box">
					<label for="" class="password_icon"></label>
					<input class="password" type="password" placeholder="密码" v-model='pwd' @keydown.enter="loginEnter($event)" maxlength="18"/>
				</div>
				<div class="Verify_box  input_box">
					<transition>
						<div class="Verify_box  input_box" v-if='code==1039'>  
							<label for="" class="Verify_icon"></label>
							<input class="Verify" type="text" placeholder="验证码"  maxlength="4"   v-model='Verify' @keydown.enter="loginEnter($event)"/>
							<!--<span class="Verify_img"></span>-->
							<input type="button" id="code" @click="createCode()"  title='点击更换验证码' :value='proCode'/>
							<span class="noVague" @click='validate'>看不清?</span>
						</div>
					</transition>
				</div>
				
				

				<input class="loginBtn" type="button" value="登录" @click='login' />
				<router-link to='/home/reset_pwd'>
					<span class="forget_pwd">忘记登录密码?</span>
				</router-link>
				
			</form>
		</div>	
	</div>	
	
</template>

<script>
	export default{
		data(){
			return{
				email:'',
				pwd:'',
				Verify:'',
				proCode:'',
				resMsg:0,
				code:0,
				info:''
			}
		},
		created(){
			if(getQuery('code')){
				let logincode=getQuery('code');
				this.axios.post(process.env.domain+'/user/dingTalkLogin?code='+logincode).then(res => {
					console.log(res.data);
					let msg=res.data.result;
					console.log(msg);
					if(res.data.code==1007){
						this.$router.push('/home/personal_msg');
					}else if(res.data.code==1000){
						this.$router.push('/index/0');
					}else{
						window.location.href="http://ucenter.beibeiyue.com"
					}
				});
			}
			function getQuery(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) return unescape(r[2]); return null;
			}
		},
		methods: {
			loginEnter(ev){
				if(ev.keyCode == 13){
					this.login()
				}
			},
			login (){
				if(!this.email){
					this.info='邮箱不能为空';
				}else if(!this.pwd){
					this.info='密码不能为空';
				}else if(this.code==1039){
					if(this.Verify){
						this.validate();
					}else{
						this.info='验证码不能为空';
					}
					
				}else{
					this.loginJoggle();
				}
			},
			createCode(){
				this.proCode = "";   
	            var checkCode = document.getElementById("code");   
	            var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');//随机数  
	            for(var i = 0; i < 4; i++) {//循环操作  
	                var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）  
	                this.proCode += random[index];//根据索引取得随机数加到code上  
	            }  
	            checkCode.value = this.proCode;//把code值赋给验证码 
			},
			validate(){  
	            var inputCode = this.Verify.toUpperCase(); //取得输入的验证码并转化为大写        
	            if(inputCode != this.proCode ) { 
	                this.info='验证码错误';
	                this.createCode();//刷新验证码  
	                this.Verify = "";//清空文本框  
	            }else { 
	                this.loginJoggle();
	            }
	        },
	        loginJoggle(){
	        	var textReg = /[\u4e00-\u9fa5]+/g;
	        	if(this.email.indexOf('@beibeiyue.com') && !this.email.split('@beibeiyue.com')[1]){
	        		this.email=this.email.split('@beibeiyue.com')[0];
	        	}
	        	if(textReg.test(this.email)){
	        		this.info="邮箱不存在";
	        	}else{
	        		this.axios.post(process.env.domain+'/user/emailLogin',{email:this.email+'@beibeiyue.com',pwd:this.pwd}).then(res => {
						console.log(res);
						this.code=res.data.code;
						if(this.code == 1000){
							this.$router.push('/index/0');
						}else if(this.code == 1001){
							this.pwdError=res.data.code;
						}else if(this.code == 1002){
							this.info="系统出现错误，请联系管理员";
						}else if(this.code == 1007){
							this.$router.push('/home/qr_Login/1');
						}else if(this.code == 1039){
							this.createCode();
							this.info="您的密码不正确，请重新输入";
						}else if(this.code == 1020){
							this.info=res.data.info;
						}else if(this.code == 1041){
							this.info="邮箱不存在";
						}else if(this.code == 1042){
							this.info=res.data.info;
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
	/*密码登录*/
	.box_right1{width:476px;height:476px;background:#fff;float:right;position:relative;    }
	.QRcode_box{padding:11px 11px 0 0;text-align: right;position:absolute;right:0;}
	.QRcode{display:inline-block;width:71px;cursor:pointer;}
	.QRcode_title{display:inline-block;width:204px;vertical-align:top;}
	.pwdLogin_form{padding:76px 67px 0 67px;}
	.pwdLogin{color:#3C3C3C;font-size:24px;padding-bottom:39px;text-align:left;}
	/*error_prompt*/
	.error_prompt{width:342px;height:70px;background:#FEF3F2;padding:12px 33px 12px 48px;position:relative;border:2px solid #FFC4BB;border-radius:6px;}
	.error_icon{display:inline-block;width:19px;height:19px;position:absolute;top:13px;left:16px;border-radius:50%;}
	.error_text{color:#616262;font-size:16px;vertical-align:middle;}
	.forgetPwd_text{color:#FF4401;font-size:16px;font-weight:bold;}
	/*input_box*/
	.input_box{height:59px;padding-bottom:14px;position:relative;}
	.email_box{}
	.email_icon{display:inline-block;width:18px;height:18px;margin:13px 0;background:url(../assets/login/user@2x.png) no-repeat;position:absolute;left:20px;}
	.email{width:202px;height:45px;padding-left:51px;float:left;border:2px solid #e9e9e9;border-radius:6px;outline:none;}
	.email_end{width:134px;height:45px;color:#898989;border:2px solid #e9e9e9;border-radius:6px;text-align:center;position:absolute;right:0;outline:none;}
	.password_box{}
	.password_icon{display:inline-block;width:16px;height:18px;margin:13px 0;background:url(../assets/login/password@2x.png) no-repeat;position:absolute;left:20px;}
	.password{width:342px;height:45px;padding-left:51px;border:2px solid #e9e9e9;border-radius:6px;outline:none;}
	.Verify_box{}
	.Verify_icon{display:inline-block;width:15px;height:19px;margin:13px 0 13px 1px;background:url(../assets/login/verify@2x.png) no-repeat;position:absolute;left:20px;}
	.Verify{width:167px;height:45px;padding-left:51px;border:2px solid #e9e9e9;border-radius:6px;outline:none;}
	#code{
		display:inline-block;width:98px;height:38px;background:rgba(233,233,233,1);vertical-align: middle;cursor:pointer;outline:none;
        font-family:Arial,宋体;
        font-style:italic;
        color:green;
        border:0;
        letter-spacing: 5px;
    	font-size: 20px;
        font-weight:bolder;
    }
	
	
	.noVague{display:inline-block;color:#297CFE;font-size:14px;padding-left:4px;cursor:pointer;}
	.loginBtn{width:342px;height:45px;color:#fff;font-size:20px;background:#297CFE;margin-top:7px;border:2px solid #297CFE;border-radius:6px;outline:none;cursor:pointer;}
	.forget_pwd{display:block;width:92px;color:#297CFE;font-size:14px;margin-top:25px;padding:3px 0;float:right;cursor:pointer;}
	@media screen and (max-width: 1600px) {

	}
	@media screen and (max-width: 1280px) {		
		/*密码登录*/
		.box_right1{width:420px;height:420px;}
		.QRcode{width:64px;}
		.QRcode_title{width:179px;}
		.pwdLogin_form{padding:64px 59px 0 59px;}
		.email_icon{display:inline-block;width:16px;height:16px;margin:12px 0;background:url(../assets/login/user@2x.png) no-repeat;background-size:cover;position:absolute;left:17px;}
		.email{width:178px;height:40px;padding-left:44px;}
		.email_end{width:120px;height:40px;}
		.password_icon{display:inline-block;width:14px;height:16px;margin:12px 0;background:url(../assets/login/password@2x.png) no-repeat;background-size:cover;position:absolute;left:17px;}
		.password{width:302px;height:40px;padding-left:44px;border:2px solid #e9e9e9;border-radius:6px;outline:none;}
		.Verify_icon{display:inline-block;width:13px;height:15px;margin:13px 0 13px 1px;background:url(../assets/login/verify@2x.png) no-repeat;background-size:cover;position:absolute;left:17px;}
		.Verify{width:156px;height:40px;padding-left:44px;border:2px solid #e9e9e9;border-radius:6px;outline:none;}
		#code{
			display:inline-block;width:87px;height:34px;background:rgba(233,233,233,1);vertical-align: middle;cursor:pointer;outline:none;
	        font-family:Arial,宋体;
	        font-style:italic;
	        color:green;
	        border:0;
	        letter-spacing: 5px;
    		font-size: 20px;
	        font-weight:bolder;
	    }
		.noVague{display:inline-block;color:#297CFE;font-size:14px;padding-left:0px;cursor:pointer;}
		.loginBtn{width:302px;height:40px;color:#fff;font-size:20px;background:#297CFE;margin-top:7px;border:2px solid #297CFE;border-radius:6px;outline:none;cursor:pointer;}
		.forget_pwd{display:block;width:92px;color:#297CFE;font-size:14px;margin-top:25px;padding:3px 0;float:right;cursor:pointer;}
		/*error_prompt*/
		.error_prompt{width:302px;height:70px;background:#FEF3F2;padding:12px 20px 12px 48px;position:relative;border:2px solid #FFC4BB;border-radius:6px;}
		.error_icon{display:inline-block;width:17px;height:17px;position:absolute;top:14px;left:16px;border-radius:50%;}
		/*input_box*/
		.input_box{height:54px;padding-bottom:12px;position:relative;}
	}
</style>