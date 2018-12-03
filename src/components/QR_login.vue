<template>
	<div class="box clearfix">
		<div class="box_left clearfix">
			<div class="system_name"></div>
			<div class="logo"></div>
		</div>
		<!--二维码登录-->
		<div class="box_right2">
			<div class="computer_box">
				<router-link to='/home/login'>
					<img src="../assets/login/computer@2x.png" alt="" class='computer'/>
				</router-link>
			</div>
			<div class="QRlogin_form clearfix">
				<div class="QRLogin">钉钉手机扫码，安全登录</div>
				<div class="mustQR_prompt">首次必须使用二维码登录</div>
				<!--<img class="QR" src="../assets/login/QR.jpg" alt="" />-->
				<div class='hoverShow'>
					<div class="use_iphone"><img  src="../assets/login/iPhone@2x.png" alt="" /></div>
					<div class="QR" id='login_content'>
				
					</div>
				</div>
				
				<div class="scan_box clearfix">
					<img class="scan" src="../assets/login/scan@2x.png" alt="" />
					<span class="scan_text">
						打开<span class="appeal">手机钉钉</span></br>扫一扫登录
					</span>
				</div>
			</div>
		</div>	
	</div>	
	
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		mounted:function(){
			
			
			if(this.$route.params.init == 0){
				this.$toast('对不起，您是第一次登录，不可忘记密码，请用钉钉扫码登录',5000)
			}
			
			var obj = DDLogin({
			     id:"login_content",//这里需要你在自己的页面定义一个HTML标签并设置id，例如<div id="login_container"></div>或<span id="login_container"></span>
			     goto: encodeURIComponent("https://oapi.dingtalk.com/connect/qrconnect?appid=dingoalf9iehduzjevfgr8&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=http://ucenter.beibeiyue.com"),
			     style: "border:none;background-color:#FFFFFF;",
			     width : "365",
			     height: "400"
			});
			
			
			
			var hanndleMessage = function (event) {
		        var origin = event.origin;
		        console.log("origin", event.origin);
		        if( origin == "https://login.dingtalk.com" ) { //判断是否来自ddLogin扫码事件。
		            var loginTmpCode = event.data; //拿到loginTmpCode后就可以在这里构造跳转链接进行跳转了
		            console.log("loginTmpCode", loginTmpCode);
		            window.location.href='https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingoalf9iehduzjevfgr8&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=http://ucenter.beibeiyue.com&loginTmpCode='+loginTmpCode;
		        }
			 
			};
			 
			if (typeof window.addEventListener != 'undefined') {
			    window.addEventListener('message', hanndleMessage, false);
			} else if (typeof window.attachEvent != 'undefined') {
			    window.attachEvent('onmessage', hanndleMessage);
			}
		},
		methods:{
			
		}
	}
</script>

<style>
	
	/*二维码登录*/
	.box_right2{width:476px;height:476px;background:rgba(255,255,255,1);float:right;position:relative;}
	.computer_box{padding:11px 11px 0 0;text-align: right;position:absolute;right:0;}
	.computer{display:inline-block;width:50px;cursor:pointer;}
	.QRlogin_form{padding:47px 46px 35px 67px;}
	.QRLogin{color:#3C3C3C;font-size:24px;font-weight:bold;}
	.mustQR_prompt{color:#FF4401;font-size:14px;font-weight:bold;padding-top:8px;position:relative;z-index:1010;}
	.QR{position:absolute;top:60px;left:55px;transform: scale(0.75);z-index:1099;}
	.use_iphone{display:inline-block;width:165px;height:303px;position:absolute;top:120px;right:51px;z-index:1200;display:none;}
	.use_iphone>img{width:100%;}
	.scan_box{padding:39px 0  40px 89px;position:absolute;bottom:15px;}
	.scan{width:41px;height:38px;float:left;}
	.scan_text{color:#9C9C9C;font-size:15px;font-weight:bold;padding-left:16px;float:left;}
	.appeal{color:#297CFE;}
	.cut_pwdLogin{color:#747874;font-size:18px;float:right;font-weight:bold;position:absolute;bottom:35px;right:46px;}
	/*二维码移入效果*/
	.hoverShow{height: 350px;}
	.hoverShow:hover .QR{margin-left:-100px;transition:margin-left 0.3s;}
	.hoverShow:hover .use_iphone{
		-webkit-transition: all 1s ease-in;
    	-moz-transition: all 1s ease-in;
    	transition: all 1s ease-in;
    	display: inline-block;
    }
	
	@media screen and (max-width: 1600px) {
	
	}
	@media screen and (max-width: 1280px) {
		/*二维码登录*/
		.box_right2{width:420px;height:420px;background:rgba(255,255,255,1);float:right;position:relative; }
		.computer_box{padding:11px 11px 0 0;text-align: right;position:absolute;right:0;}
		.computer{display:inline-block;width:50px;cursor:pointer;}
		.QRlogin_form{padding:47px 46px 35px 59px;}
		.QRLogin{color:#3C3C3C;font-size:24px;font-weight:bold;}
		.mustQR_prompt{color:#FF4401;font-size:14px;font-weight:bold;padding-top:8px;position:relative;z-index:1010;}
		.QR{position:absolute;top:42px;left:30px;transform: scale(0.7);z-index:1099;}
		.use_iphone{display:inline-block;width:136px;height:223px;position:absolute;top:110px;right:51px;z-index:1200;display:none;}
		.use_iphone>img{width:100%;}
		.scan_box{padding:30px 0  20px 84px;position:absolute;bottom:15px;}
		.scan{width:36px;height:34px;float:left;}
		.scan_text{color:#9C9C9C;font-size:15px;font-weight:bold;padding-left:16px;float:left;}
		.appeal{color:#297CFE;}
		.cut_pwdLogin{color:#747874;font-size:16px;float:right;font-weight:bold;position:absolute;bottom:20px;right:40px;}
		/*二维码移入效果*/
		.hoverShow{height: 250px;}
		.hoverShow:hover .QR{margin-left:-85px;transition:margin-left 0.3s;}
		.hoverShow:hover .use_iphone{
			-webkit-transition: all 1s ease-in;
        	-moz-transition: all 1s ease-in;
        	transition: all 1s ease-in;
        	display: inline-block;
        }
	}
	
</style>