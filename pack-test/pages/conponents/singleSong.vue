<template>
	<view class="song">
		<view class="song" @tap="goSong">
			<text style="margin-right: 45rpx;font-size: 40rpx;color: #363636;">{{songs.songName}}</text>
			<text style="font-size: 30rpx;color: #939292;">{{songs.artist}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props:['songs','accountInfo'],
		data() {
			return {
				
			}
		},
		methods: {
			goSong(){
				console.log("goSong! "+ this.accountInfo);
				uni.request({
					url:'http://110.41.35.178:8081/song',
					method:'GET',
					data:{
						songName:this.songs.songName,
					},
					success: (res) => {
						console.log(res.data);
						var songData = JSON.stringify(res.data)
						var accountInfo = JSON.stringify(this.accountInfo)
						console.log(songData);
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
.song{
	width: 750rpx;
	height: 100rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	margin-left: 25rpx;
}
</style>
