<template>
	<div>
		<div class="main_header">
			<div class="form">
				<input type="text" placeholder="请输入项目名称或停车场名称">
				<input type="button" value='搜索'>
			</div>
		</div>

		<div class="main_statistics">
			<h1 class="platform">平台统计 <i class="iconfont icon-i-arrow-copy"></i></h1>
			<h1 class="total">当天收入总额 <span><i>￥</i>142000元</span> （00:00 ~ 当前时间）</h1>
			<div class="charts_group">
				<div class="charts_item" id="lastWeekTotal">
					
				</div>
				<div class="charts_item">
					
				</div>
				<div class="charts_item" id="lastMonthTotal">
					
				</div>
				<div class="charts_item" id="everyMonthTrend">
					
				</div>
			</div>
			<h1 class="platform">项目统计 <i class="iconfont icon-i-arrow-copy"></i></h1>
		</div>
	</div>
</template>

<script>
	export default {
		mounted(){
			console.log(this.$echarts.init)
			this.lastWeekTotal();
			this.lastMonthTotal();
			this.everyMonthTrend();
		},
		methods: {
			lastWeekTotal(){
				
				var echarts = this.$echarts.init(document.getElementById('lastWeekTotal'));
				// var echarts = this.$echarts.init(document.getElementById('parkingSpace'));
				
				// var echarts = this.$echarts.init(document.getElementById('everyMonthTrend'));

				let options = {
					title: {
				        left: '10',
				        top: 10,
				        text: '最近一周收入总额',
				        textStyle: {
				        	fontWeight: 'nromal',
				        	color: '#4f439f'
				        }
				    },
				    xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        data: ['周一','周二','周三','周四','周五','周六','周日'],
				        textStyle: {
				        	color : '#bc77f1'
				        }
				    },
				    yAxis: {
				        type: 'value',
				        show: true
				    },
				    gird: {
				    	top: 110,
				        left: 0,
				        right: 15,
				        height: 160
				    },
				    series: [{
				        data: [820, 932, 901, 934, 1290, 1330, 1320],
				        type: 'line',
				        smooth: true,
			            symbol: 'circle',
			            symbolSize: 1,
			            sampling: 'average',
				        areaStyle: {
				        	normal: {
			                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
			                        offset: .5,
			                        color: '#bc77f1'
			                    }, {
			                        offset: 1,
			                        color: '#d6d7fc'
			                    }])
			                }
				        },
				        lineStyle:{
				        	color: '#bc77f1',
				        	width: 1
				        }
				    }]
				};

				echarts.setOption(options)
			},
			lastMonthTotal(){
				let echarts2 = this.$echarts.init(document.getElementById('lastMonthTotal'));
				let options2 = {
					title: {
				        left: '10',
				        top: 10,
				        text: '最近一月收入总额',
				        textStyle: {
				        	fontWeight: 'nromal',
				        	color: '#4f439f'
				        }
				    },
				    xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        data: ['周一','周二','周三','周四','周五','周六','周日'],
				        textStyle: {
				        	color : '#fd6da0'
				        }
				    },
				    yAxis: {
				        type: 'value',
				        show: true
				    },
				    gird: {
				    	top: 110,
				        left: 0,
				        right: 15,
				        height: 160
				    },
				    series: [{
				        data: [820, 932, 901, 934, 1290, 1330, 1320],
				        type: 'line',
				        smooth: true,
			            symbol: 'circle',
			            symbolSize: 1,
			            sampling: 'average',
				        areaStyle: {
				        	normal: {
			                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
			                        offset: .5,
			                        color: '#fd6da0'
			                    }, {
			                        offset: 1,
			                        color: '#fceae4'
			                    }])
			                }
				        },
				        lineStyle:{
				        	color: '#fd6da0',
				        	width: 1
				        }
				    }]
				};

				echarts2.setOption(options2)
			},
			everyMonthTrend(){
				let echarts2 = this.$echarts.init(document.getElementById('everyMonthTrend'));
				let options2 = {
					title: {
				        left: '10',
				        top: 10,
				        text: '每月收入走势图',
				        textStyle: {
				        	fontWeight: 'nromal',
				        	color: '#4f439f',
				        	fontSize: 17
				        }
				    },
				    xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        data: ['周一','周二','周三','周四','周五','周六','周日'],
				        textStyle: {
				        	color : '#fd6da0'
				        }
				    },
				    yAxis: {
				        type: 'value',
				        show: true
				    },
				    gird: {
				    	top: 110,
				        left: 0,
				        right: 15,
				        height: 160
				    },
				    series: [{
				        data: [820, 932, 901, 934, 1290, 1330, 1320],
				        type: 'line',
				        lineStyle:{
				        	color: '#7275a6',
				        	width: 2
				        },
				        itemStyle:{
				        	opacity:0
				        }
				    }]
				};

				echarts2.setOption(options2)
			}
		}
	}
</script>

<style lang="stylus">
	.form
		text-align center;
		padding-top 30px 
		
		input 
			border 1px solid transparent
			
			&:focus
				outline none
				
		input[type=text]
			width 380px
			height 36px
			line-height 36px
			text-indent 1em
			font-size 13px
			color #666666;
			border-radius 36px
			margin-right 20px
			box-shadow 0 3px 7px rgba(51,51,51, .3)
			background white
			

		input[type=button]
			width 124px
			height 36px
			line-height 36px
			border-radius 36px
			color white
			box-shadow 0 3px 7px rgba(58,35,172, .3)
			background linear-gradient(to bottom, #d15fb9, #7b60d2)
			cursor pointer

	.main_statistics 
		padding 30px

		.platform
			font-weight normal
			font-size 22px
			color #5c6098

			.iconfont
				font-size 20px
			
		.total
			font-weight normal
			font-size 17px
			line-height 55px

			i
				font-style normal 
				colot black
			span
				color #fd0000
		
		.charts_group
			.charts_item
				width 816px
				height 280px
				float left
				margin-right 28px
				margin-bottom 28px
				background white;
				box-shadow 0 12px 63px rgba(51,51,51, .15)
				border-radius 10px

			.charts_item:nth-child(2n){
				margin-right 0
			}
</style>