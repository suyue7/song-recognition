<template>
	<view class="single" @tap = "goPlay">
		<image :src="searchRecord.diskSrc"  class="disk"></image>
		<text class="title">{{searchRecord.songName}}</text>
		<text class="subtitle">{{searchRecord.artist}}</text>
		<text class="time">{{searchRecord.searchTime}}</text>
	</view>
</template>

<script>
	export default {
		props:['searchRecord','accountInfo'],
		data() {
			return {
				songName:'The Detective',
				artist:'王若琳',
				diskSrc:'https://p3.music.126.net/Q2Vm_U6FeWsgdWsvaQHSfw==/109951169530900886.jpg',
				searchTime:'2024/05/13',
			}
		},
		methods: {
			goPlay(){
				console.log(this.accountInfo);
				console.log("goPlay! ")
				uni.request({
					url:'http://110.41.35.178:8081/song',
					method:'GET',
					data:{
						songName:this.searchRecord.songName
					},
					success: (res) => {
						console.log(res.data);
						var songData = JSON.stringify(res.data)
						var accountInfo = JSON.stringify(this.accountInfo)
						uni.navigateTo({
							url:'./player?songData=' + encodeURIComponent(songData)+'&accountInfo='+encodeURIComponent(accountInfo),
						});
					}
				});
			}
		}
	}
</script>

<style>
.single{
	height: 140rpx;
	width: 680rpx;
	background-color: rgba(255, 255, 255, 0.7);
	border-radius: 25rpx;
	box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
	margin-bottom: 30rpx;
}

.disk{
	width: 100rpx;
	height: 100rpx;
	border-radius: 20rpx;
	position: absolute;
	margin-top: 20rpx;
	margin-left: 20rpx;
}

.title{
	font-size: 45rpx;
	position: absolute;
	margin-top: 20rpx;
	margin-left: 140rpx;
	color: rgba(107, 87, 87, 0.8);
}

.subtitle{
	font-size: 30rpx;
	position: absolute;
	margin-top: 85rpx;
	margin-left: 140rpx;
	color: rgba(0, 0, 0, 0.7);
}

.time{
	position: absolute;
	margin-top: 85rpx;
	margin-left: 500rpx;
	font-size: 25rpx;
	color: #C2BABA;
}

</style>
