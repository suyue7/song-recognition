<template>
	<view class="bg">
		<view class="ss">
			<text class="bb">历史搜索记录</text>
			<image src="../static/backTo1.png" class="backTo" mode="scaleToFill" @tap="goBack"></image>
		</view>
		<scroll-view scroll-y="true" class="scroll">
			<view style="display: flex;flex-direction: column;align-items: center;">
				<view v-for="(item, i) in history" >
					<record :searchRecord = "item" :accountInfo = "accountInfo"></record>
				</view>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	import record from './conponents/record.vue'
	export default {
		components:{
			record
		},
		onLoad(option) {
			let data = JSON.parse(decodeURIComponent(option.history));
			let data1 = JSON.parse(decodeURIComponent(option.accountInfo));
			this.history = data;
			this.accountInfo = data1;
			console.log(this.accountInfo)
		},
		data() {
			return {
				accountInfo:{
					account:'',
					password:'',
				},
				history:[
					{
						songName:'The Detective',
						artist:'王若琳',
						diskSrc:'https://p3.music.126.net/Q2Vm_U6FeWsgdWsvaQHSfw==/109951169530900886.jpg',
						searchTime:'2024/05/13',
					},
					{
						songName:'The Detective',
						artist:'椎名林檎',
						diskSrc:'https://p3.music.126.net/Q2Vm_U6FeWsgdWsvaQHSfw==/109951169530900886.jpg',
						searchTime:'2024/05/13',
					}
				]
			}
		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta:1,//返回层数，2则上上页
				})
			}
		}
	}
</script>

<style>
.bg{
	width: 750rpx;
	height: 100%;
	background: linear-gradient(to bottom, #eaafc8, #654ea3);
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 8%;
}

.ss{
	width: 680rpx;
	height: 8%;
	margin-left: 0rpx;
	margin-bottom: 30rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}

.bb{
	font-size: 55rpx;
	color:rgba(255,255,255,0.8)
}

.backTo{
	width: 50rpx;
	height: 50rpx;
}

.scroll{
	width: 750rpx;
	height: 84%;
}

</style>
