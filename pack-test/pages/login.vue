<template>
	
	<div class="bg-wrapper" :style="{'height':h + 'px','position': 'fixed'}">
		<image
			v-if="true"
			class="image-bg"
			mode="scaleToFill"
			src="../../static/008 Rainy Ashville1_3.png"> 
		</image>
	</div>
	<view class="content-wrapper" :style="{'height':h + 'px'}">
		<view class="space2" :style="{'marginTop':0.45*h +'px'}">
			<input class="inputBox" @input="forAccount" placeholder-style="color:#A58BA6;" placeholder="account"/>
			<input class="inputBox" @input="forPass" placeholder-style="color:#A58BA6;" password placeholder="password"/>
			<button class="loginButton" @tap="login">login</button>
			<view class="mid">
				<view style="align-items: center;display: flex;flex-direction: row;">
					<checkbox value="cb" checked="false" color="#A58BA6" style="transform:scale(0.7)" />
					<text style="color: #FFFAFA;">保存密码</text>
				</view>
				<text @tap="forget" style="color: #FFFAFA;">忘记密码?</text>
			</view>
			<view>
				<text style="color: #494049;">没有账号？点击这里</text>
				<text @tap="registry" style="color: #80305B;">注册</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			let res = this.getData();
			this.h = res.h;
			this.w = res.w;
		},
		data() {
			return {
				h:'',
				w:'',
				accountInfo:{
					account:'',
					password:'',
				},
			}
		},
		methods: {
			getData(){
			var result = {w: 0, h: 0};
			uni.getSystemInfo({
					success: function(res) {
						console.log(res);// print 610
						result.h = res.windowHeight
						result.w = res.windowWidth
					}
			});
			console.log(result)
			return result;
			},
			forAccount:function(event){
				this.accountInfo.account = event.detail.value;
				//console.log(event.detail.value)
			},
			forPass:function(event){
				this.accountInfo.password = event.detail.value;
			},
			login(){
				console.log(this.accountInfo);
				uni.request({
					url:'http://110.41.35.178:8081/login',
					method:'GET',
					data:{
						account:this.accountInfo.account,
						password:this.accountInfo.password,
					},
					success: (res) => {
						console.log(res.data.answer);
						var accountInfo = JSON.stringify(this.accountInfo)
						if(res.data.answer == "登陆成功"){
							uni.navigateTo({
								url:'./send?accountInfo=' + encodeURIComponent(accountInfo),
							});
						}else{
							console.log("登录失败");
						}
						
					}
				})
			}
		}
	}
</script>

<style>
.image-bg {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	z-index: 1;
}
.content-wrapper{
	position: absolute;
	display: flex;
	flex-direction: column;
	margin: 0;
	width: 750rpx;
	z-index: 2;
}
.space2{
	z-index: 3;
	width: 750rpx;
	height: 60%;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.inputBox{
	padding-left: 30rpx;
	width: 630rpx;
	height: 80rpx;
	background-color: rgba(255,255,255,0.7);
	margin-bottom: 30rpx;
	border-radius: 15rpx;
}
.loginButton{
	width: 640rpx;
	height: 90rpx;
	background-color: #4A4063;
	border-radius: 30rpx;
	color: #FFF;
	margin-bottom: 30rpx;
}
.mid{
	width: 640rpx;
	margin-bottom: 170rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
</style>
