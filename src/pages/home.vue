<template>
	<div class="login_content">
		<router-view ></router-view>
		
	</div>
</template>

<script>
</script>

<style>
	.login_content{width:100%;height:100%;background:url(../static/img/bg@2x.png) no-repeat right;background-size:cover;overflow:auto;padding-bottom:100px;}
	input::-webkit-input-placeholder { /* WebKit browsers */ font-size:16px;color:#898989;} 
	input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ font-size:16px;color:#898989;} 
	input::-moz-placeholder { /* Mozilla Firefox 19+ */ font-size:16px;color:#898989;} 
	input:-ms-input-placeholder { /* Internet Explorer 10+ */ font-size:16px;color:#898989;}
	.box{width:1180px;height:476px;margin:190px auto 0; }
	.box_left{width:573px;margin-right:131px;float:left;}
	.system_name{width:573px;height:155px;margin:46px 0 93px 0;background:url(../static/img/name@2x-1920.png) no-repeat;}
	.logo{width:205px;height:180px;background:url(../static/img/logo@2x.png) no-repeat;float:right;}
	@media screen and (max-width: 1600px) {
	    .box_left{margin-right:77px;}
	    .system_name{width:573px;height:155px;margin:46px 0 93px 0;background:url(../static/img/name@2x-1600.png) no-repeat;background-size:cover;}
	}
	@media screen and (max-width: 1280px) {
		.box{width:1046px;height:476px;margin:190px auto 0;}
	    .box_left{width:511px;margin-right:115px;}
	    .system_name{width:511px;height:138px;margin:40px 0 81px 0;background:url(../static/img/name@2x-1600.png) no-repeat;background-size:cover;}
	}		
</style>