<template>
	<!--初次密码-->
	<div class="initial">
		<div class="initial_title">啊哦~</div>
		<div class="initial_text">
			<div>您是第一次登录用户中心，初始密码为：</div>
			<div><span class="initial_pwd">yulebaby123</span>，请用企业邮箱登录。</div>
			<div class="countdown_box"><span class="countdown">5s </span>自动跳转…</div>
			<div>
				若没跳转成功，
				<router-link to='/components/pwd_login'>
					<span class="click_skip">点击这里</span>
				</router-link>
				。
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{}
		}
	}
</script>

<style scoped>
	
	/*初始密码*/
	.initial{width:567px;height:564px;background:#fff;margin:258px auto 0;padding:57px 35px 0 38px;}
	.initial_title{color:#297CFE;font-size:40px;font-weight:bold;padding-bottom:8px;margin-bottom:23px;border-bottom:2px solid #E9E9E9;}
	.initial_text{color:#3C3C3C;font-size:26px;}
	.initial_pwd{font-weight:bolder;}
	.countdown,.click_skip{color:#297CFE;font-size:26px;}
	.countdown_box{padding:50px 0;}
	.click_skip{cursor:pointer;}
	
	@media screen and (max-width: 1600px) {
	
	}
	@media screen and (max-width: 1280px) {
		/*初始密码*/
		.initial{width:536px;height:533px;background:#fff;margin:258px auto 0;padding:57px 35px 0 38px;}
		.initial_title{color:#297CFE;font-size:32px;font-weight:bold;padding-bottom:8px;margin-bottom:23px;border-bottom:2px solid #E9E9E9;}
		.initial_text{color:#3C3C3C;font-size:22px;}
		.initial_pwd{font-weight:bolder;}
		.countdown,.click_skip{color:#297CFE;font-size:26px;}
		.countdown_box{padding:40px 0;}
		.click_skip{cursor:pointer;}
	}
</style>