<template>
	<div style="position: relative;">
		<div class="bg-wrapper">
			<image
				v-if="true"
				class="image-bg"
				mode="aspectFill"
				:src="songData.diskSrc"> 
			</image>
		</div>
		
		<view class="popup" v-show="isPop">
			<view class="popup-info" >
			<view class="info-header">
				<image src="../../static/warning.png" style="width: 90rpx;height: 90rpx;margin-right: 10rpx;" mode="scaleToFill"></image>
				<text style="font-size: 55rpx;">搜索结果有误</text>
			</view>
			<view style="margin-bottom: 30rpx;">
				<uv-divider text="错 误 归 因" lineColor="#777" textColor="#777" style="width: 400rpx;"></uv-divider>
				<text class="hints">• 歌曲版本错误\n</text>
				<text class="hints">• 歌曲不匹配\n</text>
			</view>
			<view style="display:flex;flex-direction: row;align-items: center;justify-content: space-between;width: 70%;">
				<view>
					<button @tap="comfirm" style="height: 50rpx;width: 120rpx;font-size: 30rpx;align-items: center;display: flex;flex-direction: row;">反馈</button>
				</view>
				<view>
					<button @tap="comfirm" style="height: 50rpx;width: 120rpx;font-size: 30rpx;align-items: center;display: flex;flex-direction: row;">取消</button>
				</view>
				
			</view>
		</view>
		</view>
		
		<view class="popup1" :style="{'height':this.h + 'px'}" v-show="isList" @tap="backSong">
			<view class="songList">
				<view class="head">
					<text style="font-size: 45rpx;">歌曲列表</text>
					<image src="../static/backTo2.png" class="backTo" mode="scaleToFill" @tap="backSong"></image>
				</view>
				<uv-divider style="width: 750rpx;height: 1%;" line-color="#C0C0C0"></uv-divider>
				<scroll-view scroll-y="true" style="width: 750rpx;height: 82%;">
					<view style="display: flex;flex-direction: column;align-items: center;">
						<view class="List" v-for="(item,i) in playList">
							<singleSong :songs="item" :accountInfo="accountInfo"></singleSong>
						</view>
					</view>
				</scroll-view>
				
			</view>
		</view>
		
		<view class="main" :style="{'height':h + 'px'}" >
			<view class="header">
				<view class="back" >
					<image src="../../static/backTo.png" class="back-image" mode="scaleToFit" @tap="back"></image>
				</view>
			</view>
			
			<view class="disk-wrapper" v-show="!isLyric" @tap="goLyric">
				<view>
					<image 
					src="../../static/disk-back.png" 
					mode="scaleToFill" 
					class="disk"
					:style="diskSize"></image>
				</view>
				<view class="photo" :style="photoWrapper" >
					<image 
					:src="songData.diskSrc" 
					class="disk-photo" 
					mode="scaleToFill" 
					:style="{
						'borderRadius': '50%',
						'animation': 'spin 20s linear infinite',
						'height':this.photoSize.height,
						'width':this.photoSize.width,
						'zIndex': 4,
						'position':'absolute',
						'animationPlayState': this.animationPlayState,
					}"></image>
				</view>
			</view>
			
			<view class="playInfo" v-show="!isLyric" @tap="goLyric">
				<div style="margin-bottom: 15rpx;">
					<text class="songName">{{songData.songName}}\n</text>
				</div>
				<div style="margin-bottom: 15rpx;">
					<text class="artist">{{songData.artist}}\n</text>
				</div>
				<div>
					<text class="currentLyric">{{currentLyric}}</text>
				</div>
			</view>
			
			
			<view @tap="goDisk" class="lyricWrapper" v-show="isLyric">
				<scroll-view class="musicLyric" scroll-y="true" :scroll-top=top enable-flex="true" >
					<view class="test">
						<text v-for="item in lyric" :key="item" :class="[currentT >= item.timer && currentT <= item.pre ? 'playLyric':'lyric']">
							{{item.lrc}}\n
						</text>
					</view>
				</scroll-view>
			</view>
			
			
			
			<view class="progress">
				<view class="slider">
					<slider
					block-size="12"
					block-color="rgba(255,255,255,0.8)"
					activeColor="rgba(255,255,255,0.8)"
					backgroundColor="rgba(255,255,255,0.4)"
					max="1"
					step="0.001"
					@change="changeTime"
					@changing="changing"
					:value="current"
					></slider>
				</view>
				<view class="timeInfo">
					<text style="color: rgba(256,256,256,.7);">{{currentTime}}</text>
					<text style="color: rgba(256,256,256,.7);">{{durationTime}}</text>
				</view>
			</view>
			
			<view class="controll-button">
				<!--
				<button class="circle-button" plain="true" @tap="goCircle">
					<image :src="circleButton" mode="scaleToFill" style="height: 100rpx;width: 100rpx;"></image>
				</button>-->
				<image :src="circleButton" mode="scaleToFill" @tap="goCircle" style="height: 75rpx;width: 75rpx;margin-left: 35rpx;"></image>
				<view class="playButtons">
					<image src="../static/last.png" mode="scaleToFill" @tap="goLast" style="height: 100rpx;width: 100rpx;"></image>
					<button class="play-button" plain="true" @tap="play">
						<image :src="playButton" mode="scaleToFill" style="height: 150rpx;width: 150rpx;"></image>
					</button>
					<image src="../static/next.png" mode="scaleToFill" @tap="goNext" style="height: 100rpx;width: 100rpx;"></image>
				</view>
				<image src="../../static/list.png" @tap="goPop" mode="scaleToFill" style="height: 75rpx;width: 75rpx;margin-right: 35rpx;"></image>
				<!--
				<button class="more-button" plain="true" @tap="goPop">
					<image src="../../static/report.png" mode="scaleToFill" style="height: 100rpx;width: 100rpx;"></image>
				</button>-->
			</view>
			<!--
			-->
		</view>
	</div>
	
</template>

<script>
	import singleSong from './conponents/singleSong.vue';
	let innerAudioContext = null;
	function time(value) {
	    let theTime = parseInt(value);//秒
	    let middle = 0;//分
	    let hour = 0;//小时
	    if (theTime > 59){
	      middle = parseInt(theTime / 60);
	      theTime = parseInt(theTime % 60);
	    }
	    if (middle > 59) {
	      hour = parseInt(middle / 60);
	      middle = parseInt(middle % 60);
	    }
		
	    theTime < 10 ? theTime = '0' + theTime : theTime = theTime
	    middle < 10 ? middle = '0' + middle : middle = middle
	    hour < 10 ? hour = '0' + hour : hour = hour
		if(hour == 0){
			return middle + ':' + theTime
		}
	    return hour + ':' + middle + ':' + theTime
	}
	function lyricDone(lyric) {
		let arr;
		if(lyric){
			console.log(lyric.split(/[(\r\n)\r\n]+/));
			let lrc = lyric.split(/[(\r\n)\r\n]+/);
			lrc.splice(lrc.length - 1, 1);
			arr=lrc.map((item,i)=>{
				let min=item.slice(1,3);
				let sec=item.slice(4,6);
				let mill= item.slice(7,9);
				let lrc=item.slice(10,item.length);
				let timer = parseInt(min)*60+parseInt(sec)+parseInt(mill)*0.01;
				return {min,sec,mill,lrc,timer}
			})
			arr.forEach((item,i)=>{
				if(i == arr.length-1){
					item.pre=6000000;
				}else{
					item.pre=arr[i+1].timer
				}
			});
		}
		console.log(arr);
		return arr;
	}
	function getCurrentLyric(lyric,currentTime) {
		let cl;
		lyric.forEach((item,i)=>{
			if(currentTime >= item.timer && currentTime <= item.pre){
				cl = item.lrc;
			}
		});
		return cl;
	}
	
	function getCurrentIndex(songName,playList){
		let index;
		playList.forEach((item,i)=>{
			if(item.songName == songName){
				index = i;
			}
		})
		return index;
	}
	export default {
		components:{
			singleSong
		},
		data() {
			return {
				h:'',
				w:'',
				top:'',
				lyric:'',
				isLyric:false,
				isPop:false,
				isList:false,
				isLoop:false,
				current:0,
				currentT:'',
				playButton:'../../static/pause.png',
				circleButton:'../../static/once.png',
				currentLyric:'I hear all you\'re failing',
				currentTime:'01:34',
				durationTime:'05:24',
				animationPlayState:'running',
				top:'',
				accountInfo:{
					account:'',
					password:'',
				},
				playList:[
					{
						songName:'雪国(Niigata)',
						artist:'· 椎名林檎',
					},
					{
						songName:'My Love Mine All Mine',
						artist:'· Mitski',
					},
				],
				diskSize:{
					height:'',
					width:'',
					zIndex: 3,
					position:'absolute',
					paddingLeft: '',
				},
				songData:{
					songName:'Lightship',
					artist:'ザ·なつやすみバンド',
					songSrc:'http://music.163.com/song/media/outer/url?id=1963704574.mp3',
					diskSrc:'https://p3.music.126.net/7GdnVxEy-ZcPT2Fuc98YbQ==/109951167665883527.jpg',
					lyric:`[00:00.000]Lightship - ザ·なつやすみバンド
[00:00.320]词：中川理沙
[00:00.560]曲：中川理沙
[00:00.860]编曲：ザ・なつやすみバンド
[00:01.050]光の中にいつも君がいるみたいで
[00:10.910]僕は目をそらせない
[00:43.570]道は続いてゆく
[00:47.410]悲しみや祈りを照らす方へ`,
				},
				photoSize:{
					height:'',
					width:'',
				},
				photoWrapper:{
					paddingLeft: '',
					paddingTop : '',
				}
			}
		},
		onUnload(){
			if(innerAudioContext){
				innerAudioContext.destroy();
			}
		},
		onLoad(option){
			let self = this;
			let res = this.getData();
			let data = JSON.parse(decodeURIComponent(option.songData));
			let data1 = JSON.parse(decodeURIComponent(option.accountInfo));
			this.songData = data;
			this.accountInfo = data1;
			this.lyric = this.songData.lyric;
			this.lyric = lyricDone(this.lyric);
			//console.log(this.lyric)
			this.h = res.h;
			this.w = res.w;
			
			uni.request({
				url:'http://110.41.35.178:8081/playlist',
				method:'GET',
				data:{
					account:this.accountInfo.account
				},
				success: (res) => {
					console.log(res.data)
					self.playList = res.data;
				}
			})
			
			innerAudioContext = uni.createInnerAudioContext();
			innerAudioContext.autoplay = true;
			innerAudioContext.loop = false;
			innerAudioContext.src = this.songData.songSrc;
			this.diskSizeInitial();
			innerAudioContext.onPlay(()=>{
				this.playButton = '../../static/pause.png'
				this.animationPlayState = "running"
			});
			innerAudioContext.onPause(()=>{
				self.playButton = '../../static/play.png'
				self.animationPlayState = "paused"
			});
			innerAudioContext.onEnded(()=>{
				self.playButton = '../../static/pause_44.png'
				self.animationPlayState = "paused"
				this.top = 0.05 % this.h;
			});
			innerAudioContext.onEnded(()=>{
				if(self.isLoop == flase){
					self.goNext();
				}
			});
			innerAudioContext.onTimeUpdate(()=>{
				let self = this;
				var progress = innerAudioContext.currentTime / innerAudioContext.duration;
				if(true){
					this.current = progress;
				}
				this.currentTime = time(innerAudioContext.currentTime);
				this.durationTime = time(innerAudioContext.duration);
				this.currentT = innerAudioContext.currentTime;
				this.currentLyric = getCurrentLyric(this.lyric,innerAudioContext.currentTime);
				//console.log(this.currentLyric)
				let p = uni.createSelectorQuery().in(this).select('.playLyric');
				let ph = 0;
				p.boundingClientRect(data => {
					if(data){
						ph = data.top;
						if(ph > this.h * 0.35){
							if(ph!=this.last){
								//this.top = Math.ceil(ph-this.h * 0.35 + this.top);
								this.top = Math.ceil(this.top + ph - this.h * 0.35);
							}
						}else if(ph < 0){
							if(ph!=this.last){
								this.top = Math.ceil(this.top + ph - this.h * 0.35);
							}
						}
					}
					this.last = ph
				}).exec();
			})
		},
		methods: {
			//获得屏幕尺寸信息
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
			play(){
				let self = this;
				if(innerAudioContext.paused == true){
					innerAudioContext.play();
					console.log("playing~");
							
				}else{
					innerAudioContext.pause();
					//self.playButton = '../../static/播放器-播放_44.png'
					//self.animationPlayState = "paused"
					console.log(self.animationPlayState);
				}
			},
			back(){
				console.log("back~")
				//innerAudioContext.destroy();
				var accountInfo = JSON.stringify(this.accountInfo)
				uni.redirectTo({
					url:'/pages/send?accountInfo=' + encodeURIComponent(accountInfo),
				})
			},
			changeTime(e){
				let self = this;
				var time = innerAudioContext.duration * e.detail.value;
				innerAudioContext.seek(time);
				//this.isChange = false;
			},
			diskSizeInitial(){
				let self = this;
				if(0.9 * this.w > 0.45 * this.h){
					this.diskSize.height = 0.45 * this.h + 'px';
					this.diskSize.width = 0.45 * this.h + 'px';
					this.photoSize.height = 0.325 * this.h + 'px';
					this.photoSize.width = 0.325 * this.h + 'px';
					//this.diskSize.paddingLeft = 0.125 * this.h + 'px';
					this.diskSize.paddingLeft = this.w - 0.3825 * this.h + 'px';
					//this.photoWrapper.paddingLeft = 0.1875 * this.h + 'px';
					this.photoWrapper.paddingLeft = this.w - 0.32625 * this.h + 'px';
					this.photoWrapper.paddingTop = 0.0625 * this.h + 'px';
				}else{
					this.diskSize.height = 0.9 * this.w + 'px';
					this.diskSize.width = 0.9 * this.w + 'px';
					this.photoSize.height = 0.65 * this.w + 'px';
					this.photoSize.width = 0.65 * this.w + 'px';
					this.diskSize.paddingLeft = 0.25 * this.w + 'px';
					this.photoWrapper.paddingLeft = 0.375 * this.w + 'px';
					this.photoWrapper.paddingTop = 0.125 * this.w + 'px';
				}
			},
			goLyric(){
				this.isLyric = true;
			},
			goDisk(){
				this.isLyric = false;
			},
			comfirm() {
				this.isPop = false;
			},
			goPop(){
				this.isList = true;
			},
			backSong(){
				this.isList = false;
			},
			goCircle(){
				if(this.isLoop){
					innerAudioContext.loop = false;
					this.isLoop = false;
					this.circleButton = '../../static/circle.png'
					
				}else{
					innerAudioContext.loop = true;
					this.isLoop =true;
					this.circleButton = '../../static/once.png'
				}
			},
			goNext(){
				let self = this;
				let index = getCurrentIndex(this.songData.songName,this.playList);
				let len = this.playList.length;
				let newIndex = parseInt((index - 1) % len);
				uni.request({
					url:'http://110.41.35.178:8081/song',
					method:'GET',
					data:{
						songName:this.playList[newIndex].songName
					},
					success: (res) => {
						console.log(res.data);
						self.songData = res.data;
						self.fresh();
					}
				});
			},
			goLast(){
				let self = this;
				let index = getCurrentIndex(this.songData.songName,this.playList);
				let len = this.playList.length;
				let newIndex = parseInt((index + 1) % len);
				uni.request({
					url:'http://110.41.35.178:8081/song',
					method:'GET',
					data:{
						songName:this.playList[newIndex].songName
					},
					success: (res) => {
						console.log(res.data);
						self.songData = res.data;
						self.fresh();
					}
				});
			},
			fresh(){
				let self = this;
				innerAudioContext.destroy();
				innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.src = this.songData.songSrc;
				innerAudioContext.autoplay = true;
				innerAudioContext.onPlay(()=>{
					this.playButton = '../../static/pause.png'
					this.animationPlayState = "running"
				});
				innerAudioContext.onPause(()=>{
					self.playButton = '../../static/play.png'
					self.animationPlayState = "paused"
				});
				innerAudioContext.onEnded(()=>{
					self.playButton = '../../static/pause_44.png'
					self.animationPlayState = "paused"
					this.top = 0.05 % this.h;
				});
				innerAudioContext.onTimeUpdate(()=>{
					let self = this;
					var progress = innerAudioContext.currentTime / innerAudioContext.duration;
					if(true){
						this.current = progress;
					}
					this.currentTime = time(innerAudioContext.currentTime);
					this.durationTime = time(innerAudioContext.duration);
					this.currentT = innerAudioContext.currentTime;
					this.currentLyric = getCurrentLyric(this.lyric,innerAudioContext.currentTime);
					//console.log(this.currentLyric)
					let p = uni.createSelectorQuery().in(this).select('.playLyric');
					let ph = 0;
					p.boundingClientRect(data => {
						if(data){
							ph = data.top;
							if(ph > this.h * 0.35){
								if(ph!=this.last){
									//this.top = Math.ceil(ph-this.h * 0.35 + this.top);
									this.top = Math.ceil(this.top + ph - this.h * 0.35);
								}
							}else if(ph < 0){
								if(ph!=this.last){
									this.top = Math.ceil(this.top + ph - this.h * 0.35);
								}
							}
						}
						this.last = ph
					}).exec();
				})
			},
		}
	}
</script>

<style>
.bg-wrapper{
	width: 750rpx;
	height: 100%;
	background:rgba(0,0,0,0.3);
	z-index: 2;
	top: 0;
	left: 0;
	position: absolute;
}

.image-bg {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	filter: blur(40px);
	opacity: .8;
	bottom: 0;
	z-index: 1;
}

.main{
	display: flex;
	flex-direction: column;
	width: 100%;
}

.header{
	z-index: 3;
	width: 100%;
	height: 10%;
	margin-top: 2%;
	display: flex;
	flex-direction: row;
	justify-content:space-between;
	align-items: center;
	padding-left: 25rpx;
}

.back-button{
	height: 50rpx;
	width: 50rpx;
	padding: 0;
	background-color: none !important;
	background: none !important;
	border: none !important;
	
	&::after {
		border: none;
	}
}

.back-image{
	height: 50rpx;
	width: 50rpx;
}

.disk-wrapper{
	width: 100%;
	height: 45%;
	position: relative;
	
}

.playInfo{
	width: 670rpx;
	height: 15%;
	z-index: 3;
	margin-left: 40rpx;
	margin-bottom: 20rpx;
}


.lyricWrapper{
	
	height: 60%;
	z-index: 3;
	padding-bottom: 25rpx;
	padding-left: 20rpx;
	padding-right: 20rpx;
}

.musicLyric{
	width: 100%;
	height: 100%;
	display: inline-flex;
	align-items: center;
	margin-bottom: 20rpx;
}
.test{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.lyric{
	margin-bottom: 25rpx;
	color: #F7F7F7;
	pointer-events: none;
	font-size: 32rpx;
	z-index: 3;
	font-family: 'Times New Roman', Times, serif;
	white-space: normal;
	text-align: center;
}
.playLyric{
	margin-bottom: 20rpx;
	pointer-events: none;
	color: rgba(256,256,256,.95);
	font-size: 45rpx;
	z-index: 3;
	font-family: 'Times New Roman', Times, serif;
	white-space: normal;
	text-align: center;
}

.songName{
	font-size: 55rpx;
	color: rgba(256,256,256,.9);
}

.artist{
	font-size: 32rpx;
	color: #F3F3F3;
}

.currentLyric{
	font-size: 40rpx;
	color: #FDFDFD;
	white-space: normal;
}

.progress{
	width: 100%;
	height: 8%;
	display: flex;
	flex-direction: column;
	z-index: 3;
}

.timeInfo{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding-left: 30rpx;
	padding-right: 30rpx;
}

.controll-button{
	width: 100%;
	height: 17%;
	z-index: 3;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	
}

.playButtons{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 400rpx;
}

.circle-button{
	height: 100rpx;
	width: 100rpx;
	padding: 0;
	background-color: none !important;
	background: none !important;
	border: none !important;
	
	&::after {
		border: none;
	}
}

.more-button{
	height: 100rpx;
	width: 100rpx;
	padding: 0;
	background-color: none !important;
	background: none !important;
	border: none !important;
	
	&::after {
		border: none;
	}
}

.play-button{
	height: 150rpx;
	width: 150rpx;
	padding: 0;
	background-color: none !important;
	background: none !important;
	border: none !important;
	
	&::after {
		border: none;
	}
}
button::after{
border: none;
}

.popup {
	display:flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	height: 100%;
	background-color: rgba(0,0,0,0.6);
	z-index: 9998;
}	


.popup-info{
	display: flex;
	flex-direction: column;
	align-items: center;
	position: fixed;
	width: 450rpx;
	padding: 40rpx;
	border-radius: 20rpx;
	background: linear-gradient(to bottom, #FFF, #EF96C5);
	z-index: 9999;
}

.info-header{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}

.hints{
	margin-bottom: 50rpx;
	color: #777;
	font-size: 25rpx;
	
}

.songList{
	height: 70%;
	width: 750rpx;
	padding-top: 11%;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: fixed;
	z-index: 9999;
	border-radius: 50rpx 50rpx 0 0;
	background-color: white;
}

.head{
	width: 700rpx;
	height: 5%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.backTo{
	width: 45rpx;
	height: 45rpx;
	opacity:0.8;
}

.popup1 {
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
@keyframes spin {
		from {
			transform: rotate(0deg);
		}
	 
		to {
			transform: rotate(360deg);
		}
	}
</style>

