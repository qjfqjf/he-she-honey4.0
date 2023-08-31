<template>
	<view class="qiun-columns">
		<view class="qiun-charts3">
			<!--#ifdef MP-ALIPAY -->
			<canvas
				canvas-id="canvasArcbar1"
				id="canvasArcbar1"
				class="charts3"
				:style="{
					width: cWidth3 * pixelRatio + 'px',
					height: cHeight3 * pixelRatio + 'px',
					transform: 'scale(' + 1 / pixelRatio + ')',
					'margin-left': (-cWidth3 * (pixelRatio - 1)) / 2 + 'px',
					'margin-top': (-cHeight3 * (pixelRatio - 1)) / 2 + 'px'
				}"
			></canvas>
			<!--#endif-->
			<!--#ifndef MP-ALIPAY -->
			<canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts3"></canvas>
			<!--#endif-->
		</view>
		<view class="zsImg"><image src="../../static/images/bot.png" mode=""></image></view>
		<view class="pointOut_padding">
			<view class="pointOut flex_layout">
				<view class="left_pointOut"><image src="../../static/images/tishi.png" mode=""></image></view>
				<view class="right_pointOut">
					<swiper class="swiper" :indicator-dots="indicatorDots" :vertical="true" :autoplay="autoplay" :interval="interval" :duration="duration"> 
						<swiper-item>
							<view class="flex_layout">
								<text></text>
						科学院士提示应及早开始预防心脏疾病</view>
						<view class="flex_layout">
								<text></text>
						科学院士提示应及早开始预防心脏疾病</view>
						</swiper-item>
						<swiper-item>
							<view class="flex_layout">
								<text></text>
						科学院士提示应及早开始预防心脏疾病</view>
						<view class="flex_layout">
								<text></text>
						科学院士提示应及早开始预防心脏疾病</view>
						</swiper-item>
						
					</swiper>
				</view>
			</view>
		</view>

		<view class="qiun-bg-white qiun-title-bar qiun-common-mt"><view class="qiun-title-dot-light">心电趋势图</view></view>
		<view class="qiun-charts"><canvas canvas-id="canvasLineA" id="canvasLineA" class="charts"></canvas></view>
	</view>
</template>

<script>
import uCharts from '@/components/u-charts/u-charts.js';
import '../../common/common.css';
var _self;
var canvaLineA = null;
var xAxisData = [];
var yAxisData = [];
/*下面是服务器返回的数据格式*/

var Data = {
	LineA: {
		categories: [],
		series: [
			{
				name: '122',
				data: [0]
			}
		]
	},
	Arcbarcc: [
		{
			color: '#fff',
			data: 0,
			name: '总时长60s'
		}
	]
};

export default {
	data() {
		return {
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			serverData: '',
			number: 60,
			indicatorDots: false,
			autoplay: true,
			interval: 2000,
			duration: 500
		};
	},
	onLoad() {
		_self = this;
		//#ifdef MP-ALIPAY
		uni.getSystemInfo({
			success: function(res) {
				if (res.pixelRatio > 1) {
					//正常这里给2就行，如果pixelRatio=3性能会降低一点
					//_self.pixelRatio =res.pixelRatio;
					_self.pixelRatio = 2;
				}
			}
		});
		//#endif
		this.cWidth = uni.upx2px(750);
		this.cHeight = uni.upx2px(500);
		// this.cWidth2=uni.upx2px(700);
		// this.cHeight2=uni.upx2px(1100);
		this.cWidth3 = uni.upx2px(250);
		this.cHeight3 = uni.upx2px(250);

		this.getServerData();
	},
	methods: {

		getServerData() {
			let LineA = { categories: [], series: [] };
			LineA.categories = Data.LineA.categories;
			LineA.series = Data.LineA.series;
			//x轴数据
			for (var i = 60; i > 0; i--) {
				LineA.categories.push(i);
			}
			//y轴数据
			for (i = 1; i < 61; i++) {
				LineA.series[0].data.push(i);
			}
			_self.showLineA('canvasLineA', LineA);
			console.log(LineA.series[0].data,1123656);
			//定时更新数据心率
			var LineAIds = setInterval(function() {
				LineA.series[0].data.push(Math.round(Math.random() * 1000));
				console.log(LineA.series[0].data,1123656);
				var j = 100;
				//如果x轴数据大于坐标，就把左边的数据清掉。
				if (LineA.series[0].data.length > 60) {
					LineA.series[0].data.shift();
				}
				j = j + 100;
				console.log(j);
				if (j > 90000) {
					clearInterval(LineAIds);
				}
				_self.showLineA('canvasLineA', LineA);
			}, 500);
			//定时更新

			//圆弧进度
			let Arcbar1 = { series: [] };
			//圆弧倒计时改进
			//Arcbar1.series=res.data.data.Arcbar1.series;
			Arcbar1.series = Data.Arcbarcc;
			_self.showArcbar('canvasArcbar1', Arcbar1);
			//倒计时圆弧定时
			var ArcbarIds = setInterval(function(e) {
				console.log();
				Arcbar1.series[0].data = Arcbar1.series[0].data + 1 / 60;
				if (Arcbar1.series[0].data > 1) {
					Arcbar1.series[0].data = 1;
					clearInterval(ArcbarIds);
					console.log(ArcbarIds);
				}
				_self.showArcbar('canvasArcbar1', Arcbar1);
			}, 1000);
			//圆弧进度
		},
		showLineA(canvasId, chartData) {
			canvaLineA = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'line',
				fontSize: 11,
				legend: true,
				dataLabel: false,
				dataPointShape: false,
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				categories: chartData.categories,
				series: chartData.series,
				animation: false,
				xAxis: {
					disabled: true, //不显示x轴
					disableGrid: false,
					type: 'grid',
					gridColor: '#f2f2f2',
					gridType: 'solid',
					dashLength: 2
				},
				yAxis: {
					disabled: true, //不显示y轴
					disableGrid: false,
					gridType: 'solid',
					gridColor: '#f2f2f2',
					dashLength: 2,
					splitNumber: 5,
					min: 10,
					max: 1000,
					format: val => {
						return val.toFixed(0);
					}
				},
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				extra: {
					lineStyle: 'straight'
				}
			});
		},
		//点击节点数据
		// touchLineA(e) {
		// 	canvaLineA.showToolTip(e, {
		// 		format: function (item, category) {
		// 			return category + ' ' + item.name + ':' + item.data
		// 		}
		// 	});
		// },
		//圆弧形
		showArcbar(canvasId, chartData) {
			new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'arcbar',
				fontSize: 11,
				legend: false,
				title: {
					//name: Math.round(chartData.series[0].data*60)+'s',//正数秒数计时
					name: Math.round((1 - chartData.series[0].data) * 60) + 's', //倒数秒数计时
					color: chartData.series[0].color,
					fontSize: 28 * _self.pixelRatio
				},
				subtitle: {
					name: '剩余时间', //chartData.series[0].name,//测量时长
					color: '#FFFFFF',
					fontSize: 10 * _self.pixelRatio
				},
				extra: {
					arcbar: {
						type: 'circle',
						width: _self.arcbarWidth * _self.pixelRatio, //圆弧的宽度
						backgroundColor: '#3d87c1'
					}
				},
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				series: chartData.series,
				animation: false,
				width: _self.cWidth3 * _self.pixelRatio,
				height: _self.cHeight3 * _self.pixelRatio,
				dataLabel: true
			});
		}
		
	}
};
</script>

<style>
page {
	background: #fff;
	width: 750upx;
	overflow-x: hidden;
}
.qiun-padding {
	padding: 2%;
	width: 96%;
}
.qiun-wrap {
	display: flex;
	flex-wrap: wrap;
}
.qiun-rows {
	display: flex;
	flex-direction: row !important;
}
.qiun-columns {
	display: flex;
	flex-direction: column !important;
}
.qiun-common-mt {
	margin-top: 10upx;
}
.qiun-bg-white {
	background: #ffffff;
}
.qiun-title-bar {
	padding: 30upx;
	flex-wrap: nowrap;
	border-top: 30upx solid #fafafa;
}
.qiun-title-dot-light {
	border-left: 8upx solid #0d69b2;
	padding-left: 20upx;
	font-size: 32upx;
	color: #000000;
}
.qiun-charts {
	width: 750upx;
	height: 500upx;
	background-color: #ffffff;
}
.charts {
	width: 750upx;
	height: 500upx;
	background-color: #ffffff;
}
/* 圆弧进度样式 */
.qiun-charts3 {
	width: 750upx;
	height: 250upx;
	background-color: #0d69b2;
	padding: 30upx 0;
}
.charts3 {
	width: 250upx;
	height: 250upx;
	display: block;
	margin: 0 auto;
}
.zsImg {
	width: 100%;
}
.zsImg image {
	width: 100%;
	height: 30upx;
	display: block;
}
.qiun-tip {
	display: block;
	width: auto;
	overflow: hidden;
	padding: 15upx;
	height: 30upx;
	line-height: 30upx;
	margin: 10upx;
	background: #ff9933;
	font-size: 30upx;
	border-radius: 8upx;
	justify-content: center;
	text-align: center;
	border: 1px solid #dc7004;
	color: #ffffff;
}
.pointOut_padding {
	padding: 0 30upx;
}
.pointOut {
	background: #fff;
	border-radius: 10px;
	margin-top: -30upx;
	padding: 20upx 40upx;
	position: relative;
	z-index: 100;
}
.swiper{ height: 110upx;}
.left_pointOut image {
	display: block;
	width: 105upx;
	height: 89upx;
}
.right_pointOut {
	padding-left: 30upx;
	display: block;
	width:460upx;
	overflow: hidden;
}
.right_pointOut view {
	color: #333;
	font-size: 24upx;
	padding: 15upx 0;
}
.right_pointOut view text {
	display: inline-block;
	width: 8upx;
	height: 8upx;
	border-radius: 8upx;
	background: #333;
	margin-right: 10upx;
}
</style>
