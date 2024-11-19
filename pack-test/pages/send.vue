<template>
	<div class="bg-wrapper">
		<image
			v-if="true"
			class="image-bg"
			mode="scaleToFill"
			src="../../static/back.png"> 
		</image>
	</div>
	<view class="popup" v-show="isPop">
		<view class="popup-info">
			<view class="info-header">
				<image src="../../static/warning.png" style="width: 90rpx;height: 90rpx;margin-right: 10rpx;" mode="scaleToFill"></image>
				<text style="font-size: 55rpx;">搜索失败</text>
			</view>
			<view style="margin-bottom: 30rpx;">
				<uv-divider text="可  能  原  因" lineColor="#777" textColor="#777" style="width: 400rpx;"></uv-divider>
				<text class="hints">• 录制时长过短\n</text>
				<text class="hints">• 录制环境较为嘈杂\n</text>
				<text class="hints">• 曲库暂未收录此歌\n</text>
			</view>
			<view>
				<button @tap="comfirm" style="height: 50rpx;width: 120rpx;font-size: 30rpx;align-items: center;display: flex;flex-direction: row;">确定</button>
			</view>
		</view>
	</view>
	<view class="popup" v-show="isWaiting">
		<image src="../static/searching.png" style="width: 350rpx;height: 350rpx;"></image>
	</view>
	<view class="out" :style="{'height':this.h + 'px'}">
		<view class="record1" style="padding-left: 30rpx;padding-top: 75rpx;">
			<view class="history" @tap="goHistory">
				<text style="color: #B55F83;font-size: 30rpx;">历史记录</text>
			</view>
		</view>
		<view class="record">
			<button class="recordButton" @tap="startRecord" plain="true">
				<image :src="buttonSrc" style="height: 200rpx;width: 200rpx;" mode="aspectFit"></image>
			</button>
			<view class="circle1"></view>
			<view class="circle2"></view>
			<view class="wave" :style="{
				'animation': cssPlay,
				'animation-play-state': isWave1,
				'animation-duration':playTime,
			}"></view>
			<view class="wave" :style="{
				'animation': cssPlay,
				'animation-play-state': isWave2,
				'animation-duration':playTime,
			}"></view>
		</view>
	</view>
	
</template>

<script>
	const recorderManager = uni.getRecorderManager();
	let that = null;
	export default {
		onLoad(option){
			that = this;
			let data = JSON.parse(decodeURIComponent(option.accountInfo));
			this.accountInfo = data;
			console.log(this.accountInfo);
			let result = this.getData()
			this.h = result.h;
			this.w = result.w;
			recorderManager.onStop(function (res) {
				console.log('recorder stop' + JSON.stringify(res));
				that.voicePath = res.tempFilePath;
				that.text = ''
				console.log(that.voicePath)
				that.isWaiting = true;
				that.pathToBase64App(res.tempFilePath);
			});
		},
		data() {
			return {
				text:'',
				h:'',
				w:'',
				src:'',
				isPop:false,
				isWaiting:false,
				buttonSrc:'../../static/record.png',
				isRecord:false,
				cssPlay:'wavemove 4s infinite linear',
				isWave1:'paused',
				isWave2:'paused',
				playTime:'4s',
				testPath:'../../static/Irises.mp3',
				voicePath:'',
				filePath:'',
				songInfo:{
					song:{
						songName:'',
						artist:'',
						songSrc:'',
						diskSrc:'',
						lyric:'111',
					},
					isFind:'',
					isUpload:'',
				},
				accountInfo:{
					account:'test',
					password:'123456',
				}
				
			}
		},
		methods: {
			Send(){
				let self = this;
				that.text = '';
				uni.uploadFile({
					url: 'http://110.41.35.178:8081/testfile',
					filePath: '../../static/Irises.mp3', 
					name: 'record',
					success: (uploadFileRes) => {
						uploadFileRes = JSON.parse(uploadFileRes.data) ;
						console.log(uploadFileRes)
						that.text = uploadFileRes.song.songName;
					},
					fail: (err) => {
						console.log(err);
					}
				});
			},
			comfirm() {
				this.isPop = false;
			},
			goHistory(){
				console.log("history!");
				uni.request({
					url:'http://110.41.35.178:8081/history',
					method:'GET',
					data:{
						account:that.accountInfo.account
					},
					success: (res) => {
						console.log(res.data);
						var history = JSON.stringify(res.data)
						var accountInfo = JSON.stringify(that.accountInfo)
						uni.navigateTo({
							url:'./searchHistory?history=' + encodeURIComponent(history)+'&accountInfo='+encodeURIComponent(accountInfo),
						});
					}
				});
			},
			getData(){
			var result = {w: 0, h: 0};
			uni.getSystemInfo({
					success: function(res) {
						console.log(res);
						result.h = res.windowHeight
						result.w = res.windowWidth
					}
			});
			console.log(result)
			return result;
			},
			startRecord(){
				let self = this;
				if(this.isRecord == false){
					recorderManager.start();
					this.isRecord = true;
					this.playTime = '4s';
					this.isWave1 = 'running'
					this.cssPlay = 'wavemove 4s infinite linear';
					this.buttonSrc = '../../static/24gf-pause2 (1).png'
					setTimeout(() => {
						this.isWave2 = 'running'
					}, 2000);
					console.log("开始录音");
				}else{
					recorderManager.stop();
					this.isRecord = false;
					this.playTime = '0s';
					this.buttonSrc = '../../static/record.png'
				}
			},
			pathToBase64App(path) {
			    // 通过URL参数获取目录对象或文件对象
				let self = this;
				console.log(path);
			    plus.io.resolveLocalFileSystemURL(path, function(entry) {
			        entry.file(function(file) {
			            var fileReader = new plus.io.FileReader()
						//that.baseFile = file;
			            fileReader.onload = function(evt) {
							that.filePath = evt.target.result;
							uni.request({
								url:'http://110.41.35.178:8081/upload',
								method:'POST',
								header:{
									'content-type':"application/json"
								},
								data:{
									record:that.filePath,
									account:that.accountInfo.account,
								}, //此时的data传正常json形式就好
								success: (uploadFileRes) => {
									console.log(uploadFileRes.data);
									self.isWaiting = false;
									uploadFileRes = uploadFileRes.data ;
									self.songInfo = uploadFileRes;
									if(self.songInfo.isFind == 1){
										var songData = JSON.stringify(uploadFileRes.song)
										var accountInfo = JSON.stringify(that.accountInfo)
										console.log(songData);
										uni.navigateTo({
											url:'./player?songData=' + encodeURIComponent(songData)+'&accountInfo='+encodeURIComponent(accountInfo),
										});
									}else if(self.songInfo.isFind == -1){
										self.isPop = true;
									}
								},
								fail:(res)=>{
									self.test = res;
								}
							})
							
			            }
			            fileReader.onerror = function(error) {
							console.log('failed: ', error);
			            }
			            fileReader.readAsDataURL(file)
			        }, function(error) {
			            console.log('failed: ', error);
			        })
			    }, function(error) {
					console.log('failed: ', error);
			    })
			},
		}
	}
</script>

<style>
.out{
	margin-top: 10%;
	display: flex;
	flex-direction: column;
	margin: 0;
	background-image: ../../static/back;
}

.record1{
	width: 750rpx;
	height: 40%;
	z-index: 3;
}

.history{
	border:5rpx solid #B082A4;
	width: 150rpx;
	height: 45rpx;
	border-radius: 25rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.record{
	width: 750rpx;
	height: 60%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.recordButton{
	border-radius: 50%;
	height: 200rpx;
	width: 200rpx;
	position: absolute;
	padding: 0;
	z-index: 5;
	background-color: none !important;
	background: none !important;
	border: none !important;
	
	&::after {
		border: none;
	}
}

.circle1{
	width: 290rpx;
	height: 290rpx;
	position: absolute;
	border-radius: 50%;
	background: rgb(74, 64, 99);
	z-index: 4;
}

.circle2{
	width: 320rpx;
	height: 320rpx;
	position: absolute;
	border-radius: 50%;
	background: rgb(165, 139, 166);
	z-index: 3;
}

.wave{
	width: 300rpx;
	height: 300rpx;
	position: absolute;
	box-shadow: 3px 3px 9px #CB99C0, -3px -3px 9px #ECF0F8;
	border-radius: 50%;
	filter: blur(1px);
	z-index: 2;
}

.image-bg {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	z-index: 1;
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
@keyframes wavemove {
        0% {
            transform: scale(1);
			opacity: 0;
        }
        50% {
            transform: scale(1.5);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
	
@keyframes wavemove1 {
        0% {
            transform: scale(1);
			opacity: 0;
        }
        50% {
            transform: scale(1.5);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
</style>
