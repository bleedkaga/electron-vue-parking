<template>
	<div class="main_list">
		<div v-if="data.length == 0" class="null-data">暂无数据</div>
		<div v-else>
			<transition-group name="list-complete" tag="p">
				<div class="main_list_item list-complete-item" v-for="(item, index) in data" v-bind:key="item.vueKey">
					<span class="list_badge">报警时间： {{item.datetime}}</span>
					<div class="flexable-layout">
						<div class="user_info">
							<p>{{item.codeuser}}</p>
							<span>扫码账户昵称 </span>
						</div>
						<div class="list_item_card">
							<p>{{item.parking}}</p>
							<span>停车场</span>
						</div>
						<div class="list_item_card">
							<p>{{item.station_id}}</p>
							<span>出口编号</span>
						</div>
						<div class="list_item_card large_text">
							<p>{{item.tip}}</p>
							<span>异常种类</span>
						</div>
						<div class="list_btn_group">
							<button class="watch" @click="monitorVideo(item)">查看监控视频</button>
							<button class="warning" @click="warningDone(item, index)">报警处理完成</button>
						</div>
					</div>

					<div class="more_abnormal_info" v-if="item.warning == 1003">
						<div class="badge_user_info">
							<span class="badge car_text badge_blue">车牌号码: <em>{{item.carnum}}</em></span>
							<span class="badge phone_text badge_blue">用户手机: <em>{{item.phone}}</em></span>
						</div>
						<div class="badge_parking_info">
							<span class="badge badge_purple">上次进场时间<em>{{item.lastin}}</em></span>
							<span class="badge badge_purple">上次出场时间: <em>{{item.lastout}}</em></span>
							<span class="badge badge_red">上次未交费金额: <span>￥<i>{{item.lastmoney}}元</i></span></span>
							<span class="badge badge_red">本次未交费金额: <span>￥<i>{{item.money}}元</i></span></span>
						</div>
					</div>
				</div>
			</transition-group>

			<!-- <div class="ele-pagination">
		      <el-pagination
		        background
		        layout="prev, pager, next, jumper, total"
		        :total="100">
		      </el-pagination>
		    </div> -->
		</div>  
	</div>
</template>

<script>
	export default {
		props: ['data'],
		watch: {
			'data': (val) => {
				console.log( val )
			}
		},
		mounted(){
			console.log(this.data)
		},
		methods: {
			monitorVideo( item ){
				this.$message({type: 'error', message: '暂无监控视频'})
			},
			warningDone( item, index){
				const that = this;
				this.$http.get('http://www.parkingpay.net/api/oper_warning.php?wid='+item.wid).then( res => {
					if(res.data == 'OK'){
						this.data.splice(index, 1)
					}
				})
			}
		}

	}
</script>

<style lang="stylus">
	.list-complete-item {
	  transition: all 0.8s;
	  display: block
	}
	.list-complete-enter
	{
	  opacity: 0;
	  -webkit-transform: translateY(-300px);
	          transform: translateY(-300px);
	}
	.list-complete-leave-to {
		 opacity 0
		 transition: all 0.3s;
	}
	.list-complete-leave-active {
	  position: absolute;
	}
	.main_list
		padding 60px 30px
		padding-bottom 10px
		padding-top 20px
	.null-data
		text-align center
		color #aaa;
		line-height 500px
		
	.main_list_item
		min-height 152px;
		background white
		margin-bottom 41px
		border-radius 10px
		box-shadow 0 20px 60px rgba(51, 51, 51, .15)
		position relative
		padding-top 20px 
		padding-bottom 10px
		
		em, i
			font-style normal
		
		.more_abnormal_info
			display flex;
			padding-top 20px
			
			.badge_user_info
				padding-left 40px
				flex: 1
				display flex

				.badge
					display inline-block
					font-size 13px;
				
				.car_text
					min-width 150px
			
			.badge_parking_info
				font-size 13px
				display flex

				.badge
					margin-right 40px
					
			.badge
				height 30px;
				line-height 30px
				display inline-block
				
			.badge em
				color #666666
				padding-left 11px
				
			.badge:before
				content ''
				width 8px
				height 8px
				background #00afef
				display inline-block
				border-radius 8px
				margin-right 10px

			.badge_purple:before
				background #3a43ec
			.badge_red:before
				background #fd0909
			.badge_red span i
				color #ff0000			
			
		.flexable-layout
			display flex
		
		.user_info
			width 249px
			border-right 1px solid #cccccc
			text-align center
			margin-right 30px
			height 96px
			
			p
				padding-top 30px;
			span
				padding-top 20px
				color #63679d
				display inline-block
				font-size 12px
		
		.list_badge
			position absolute;
			top -10px
			left 20px
			background #4f4b84
			border-radius 5px
			color white
			font-size 14px
			width 209px;
			height 26px
			line-height 26px
			text-align center
		
		.list_item_card
			box-shadow 0 2px 7px rgba(51, 51, 51, .23)
			min-width 180px
			height 96px
			text-align center
			margin-right 30px
			border-radius 5px

			p
				padding-top 30px
				padding-left 1em
				padding-right 1em
				overflow hidden
				white-space nowrap
				text-overflow ellipsis
			span
				padding-top 20px
				color #63679d
				display inline-block
				font-size 12px
		
		.large_text
			min-width 420px
			
		.list_btn_group 
			padding-top 20px
			padding-left 30px
			padding-right 10px
			display flex
			width 28%

			button
				width 50%
				height 60px;
				border-radius 10px;
				border 1px solid transparent
				color white
				cursor pointer
				font-size:  14px
				box-shadow 0 2px 7px rgba(0,0,0,.23)
				
				
				&:focus
					outline none
				
			button.watch
				background linear-gradient(to bottom, #e85f2f, #fe875d)
				margin-right 30px
			
			button.warning
				background linear-gradient(to bottom, #16a0d1, #24b5e8)
				
		
	@media screen and (max-width: 1440px)
		.main_list_item .list_btn_group button
			width 109px		
		.main_list_item .list_item_card
			min-width: 10%	
		.main_list_item .list_btn_group
			padding-left 20px
			.main_list_item .list_btn_group button.watch
				margin-right 10px
		.main_list_item .list_item_card
			margin-right 15px
		.main_list_item .more_abnormal_info .badge_parking_info .badge
			margin-right 10px;
	@media screen and (max-width: 1280px)
		.main_list_item .large_text
			flex: 1
			min-width 20%
		.main_list_item .user_info
			width 20%
		.main_list_item .list_btn_group
			padding-top 20px
			padding-left 10px
			padding-right 10px
			button
				width 50%
			button.watch
				margin-right 10px
</style>