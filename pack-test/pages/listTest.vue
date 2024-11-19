<template>
	<view class="popup" :style="{'height':this.h + 'px'}">
		<view class="songList">
			<view class="head">
				<text style="font-size: 45rpx;">歌曲列表</text>
			</view>
			<uv-divider style="width: 750rpx;" line-color="#C0C0C0"></uv-divider>
			<view class="List" v-for="(item,i) in playList">
				<singleSong :songs="item"></singleSong>
			</view>
		</view>
	</view>
</template>

<script>
	import singleSong from './conponents/singleSong.vue';
	export default {
		components:{
			singleSong
		},
		onLoad() {
			let res = this.getData();
			this.h = res.h;
			this.w = res.w;
		},
		data() {
			return {
				h:'',
				w:'',
				playList:[
					{
						songName:'雪国(Niigata)',
						artist:'· 椎名林檎',
					},
					{
						songName:'My Love Mine All Mine',
						artist:'· Mitski',
					},
					{
						songName:'雪国(Niigata)',
						artist:'· 椎名林檎',
					},
					{
						songName:'雪国(Niigata)',
						artist:'· 椎名林檎',
					},
				]
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
			goSong(){
				console.log()
			}
		}
	}
</script>

<style>
.popup {
	display:flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	background-color: rgba(0,0,0,0.6);
	z-index: 9998;
	padding-top: 30%;
}

.songList{
	height: 70%;
	width: 750rpx;
	padding-top: 50rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: fixed;
	z-index: 9999;
	border-radius: 50rpx 50rpx 0 0;
	background-color: white;
}

.head{
	width: 750rpx;
	display: flex;
	flex-direction: row;
	margin-left: 75rpx;
}


</style>
