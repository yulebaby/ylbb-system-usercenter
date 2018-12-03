<template>
	<div class="information">
		<div class="msg_title">第一次登录，请完善个人信息</div>
		<div class="prompt">*请填写以身份证为准真实信息，灰色部分可不修改</div>
		<div class="subMsg_title">基本信息</div>
		<div class="pair">
			<label class="label" for="">姓名</label>
			<input class="identity_card input" type="text" placeholder="请确保身份证姓名正确，后期不可更改" v-model='name' v-on:blur.lazy='nameBlur' maxlength="5" @focus="nameFocs()" @keydown.enter="correctLoginEnter($event)"/>
			<img class="correct_icon" src="../assets/login/correct@2x.png" alt="" v-if='nameCor'/>
			<div class="error_prompt">{{nameMsg}}</div>
		</div>
		<div class="pair">
			<label class="label" for="">设置新密码</label>
			<input class="newPwd input" type="password" placeholder="请输入新密码"  v-model='pwd' v-on:blur.lazy='pwdBlur' maxlength="18" @keydown.enter="correctLoginEnter($event)"/>
			<img class="correct_icon" src="../assets/login/correct@2x.png" alt="" v-if='pwdCor'/>
			<div class="error_prompt">{{pwdMsg}}</div>
		</div>
		<div class="pair">
			<label class="label" for="">邮箱</label>
			<input class="email input" type="text" placeholder="邮箱" v-model='userMsg.userEmail=="null" ? "" : userMsg.userEmail' readonly/>
			<!--<span class="common">@beibeiyue.com</span>-->
		</div>
		<div class="pair">
			<label class="label" for="">重复新密码</label>
			<input class="comfirmNewPwd input" type="password" placeholder="请确认新密码" v-model='correctPwd' v-on:blur.lazy='correctPwdBlur'  maxlength="18" @keydown.enter="correctLoginEnter($event)"/>
			<img class="correct_icon" src="../assets/login/correct@2x.png" alt="" v-if='correctPwdCor'/>
			<div class="error_prompt">{{correctPwdMsg}}</div>
		</div>
		<div class="pair">
			<label class="label" for="">联系电话</label>
			<input class="phone input" type="text" placeholder="" v-model='userMsg.phone=="null" ? "" : userMsg.phone' readonly/>
		</div>
		<div class="subMsg_title">员工信息</div>
		<div class="pair">
			<label class="label" for="">入职日期</label>
			<input class="date input" type="text" placeholder="" v-model='userMsg.entryTime=="null" ? "" : userMsg.entryTime' readonly/>
		</div>
		<div class="pair">
			<label class="label" for="">分组</label>
			<input class="group input" type="text" placeholder="" v-model='userMsg.groupingCode=="null" ? "" : userMsg.groupingCode' readonly/>
		</div>
		<div class="pair">
			<label class="label" for="">部门</label>
			<input class="bumen input" type="text" placeholder="" v-model='userMsg.departmentCode=="null" ? "" : userMsg.departmentCode' readonly/>
		</div>
		<div class="pair">
			<label class="label" for="">职位</label>
			<input class="job input" type="text" placeholder="" v-model='userMsg.position=="null" ? "" : userMsg.position' readonly/>
		</div>
		<div class="btn_box">
			<input class="comfirm_login" type="button" value="确认登录" @click='correctLogin'/>
			<a href="http://ucenter.beibeiyue.com">
				<input class="cancel_login" type="button" value="取消"/>
			</a>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				name:'',
				pwd:'',
				correctPwd:'',
				nameMsg:'',
				pwdMsg:'',
				correctPwdMsg:'',
				nameCor:'',
				pwdCor:'',
				correctPwdCor:'',
				correctLoginBtn:true,
				userMsg:""
			}
		},
		mounted(){
			//判断是否首次登录
			this.axios.post(process.env.domain+'/user/checkFirstLogin').then(res => {
				console.log(res.data);
				if(res.data.code==1000){
					this.userMsg=res.data.result;
				}else{
					window.location.href="http://ucenter.beibeiyue.com"
				}
			});
		},
		methods:{
			nameFocs(){
				this.$toast('请确保身份证姓名正确，后期不可更改',3000)
			},
			nameBlur(){
				let reg=/^[\u4e00-\u9fa5]{2,5}$/;
				if(!this.name){
					
				}else if(!reg.test(this.name)){
					this.nameMsg='姓名格式为：2~5位汉字';
					this.nameCor=false;
				}else{
					this.nameMsg='';
					this.nameCor=true;
				}
			},
			pwdBlur(){
				let reg=/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,18}$/;
				if(!this.pwd){
					
				}else if(!reg.test(this.pwd)){
					this.pwdMsg='密码格式为：大小写字母、数字、特殊符号至少选三种，长度为8-18';
					this.pwdCor=false;
				}else{
					this.pwdMsg='';
					this.pwdCor=true;
				}
			},
			correctPwdBlur(){
				if(!this.correctPwd){
					
				}else if(this.correctPwd != this.pwd ){
					this.correctPwdMsg='两次密码不一致';
					this.correctPwdCor=false;
				}else{
					this.correctPwdMsg='';
					this.correctPwdCor=true;
				}
			},
			correctLoginEnter(ev){
				if(ev.keyCode == 13){
					this.correctLogin()
				}
			},
			correctLogin(){
				let reg=/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,18}$/;
				let textReg=/^[\u4e00-\u9fa5]{2,5}$/;
				if(!this.name){
					this.nameMsg='姓名不能为空';
				}else if(!textReg.test(this.name)){
					this.nameMsg='姓名格式为：2~5位汉字';
					this.nameCor=false;
				}else if(!this.pwd){
					this.pwdMsg='密码不能为空';
				}else if(!reg.test(this.pwd)){
					this.pwdMsg='密码格式为：大小写字母、数字、特殊符号至少选三种，长度为8-18';
				}else if(this.correctPwd!=this.pwd){
					this.correctPwdMsg='两次密码不一致';
				}else{
					let email=this.userMsg.userEmail;
					let name=this.name;
					let oldPassword=this.pwd;
					let newPassword=this.correctPwd;
					
					
					if(this.correctLoginBtn){
						this.correctLoginBtn=false;
						this.axios.post(process.env.domain+'/user/saveInitUserInfo',{userEmail:email,userName:name,oldPassword:oldPassword,newPassword:newPassword}).then(res => {
							console.log(res);
							this.correctLoginBtn=true;
							if(res.data.code==1000){
								this.$toast('信息已完善',1000)
								setTimeout(() =>{
									this.$router.push('/index/0');
								},2000)
							}else if(res.data.code==1043){
								this.$toast('用户不是首次登录',1000)
								setTimeout(() =>{
									window.location.href="http://ucenter.beibeiyue.com"
								},2000)
							}else{
								this.$toast(res.data.info,1000)
							}
						});
					}
					
				}
				
				
			}
		}
	}
</script>

<style>
	
	input::-webkit-input-placeholder { /* WebKit browsers */ font-size:14px;color:#898989;} 
	input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ font-size:14px;color:#898989;} 
	input::-moz-placeholder { /* Mozilla Firefox 19+ */ font-size:14px;color:#898989;} 
	input:-ms-input-placeholder { /* Internet Explorer 10+ */ font-size:14px;color:#898989;}
	.information{width:1129px;height:690px;background:#fff;padding:30px 54px 34px 55px;margin:195px auto 0;}
	.msg_title{color:#297CFE;font-size:32px;font-weight:bolder;padding-bottom:8px;}
	.prompt{color:#FE2929;font-size:12px;}
	.subMsg_title{color:#3C3C3C;font-size:22px;padding:21px 0 8px 0;margin-bottom:20px;border-bottom:2px solid #E9E9E9;}
	.pair{display:inline-block;padding:0 32px 22px 0;position:relative;}
	.label{display:inline-block;width:103px;color:#898989;font-size:16px;font-weight:bold;margin-right:8px;text-align:right;}
	.input{width:360px;height:45px;padding-left:20px;border:2px solid #e9e9e9;border-radius:6px;outline:none;}
	.btn_box{padding-top:20px;text-align:center;}
	.comfirm_login,.cancel_login{width:245px;height:45px;color:#fff;font-size:20px;border-radius:6px;outline:none;cursor:pointer;}
	.comfirm_login{background:#297CFE;border:2px solid #297CFE;}
	.cancel_login{background:#9C9C9C;border:2px solid #9C9C9C;}
	.common{color:#898989;font-size:14px;position:absolute;right:53px;bottom:36px;}
	/*correct_icon*/
	.correct_icon{width:19px;height:19px;position:absolute;top:13px;right:0;}
	/*error_prompt*/
	.error_prompt{color:#FE2929;font-size:12px;padding-left:120px;position: absolute;bottom:3px;}
	/*不可更改信息*/	
	.email,.phone,.date,.group,.bumen,.job{color:#4e4e4e;}
</style>