<template>
	<div class="query">
		<div class="main_list">
			<div class="null_data" v-if="lists.length == 0">暂无数据</div>
			<div class="main_list_item" v-else v-for="(list, index) in lists" :key="index" >
				<span class="list_badge" :class="{'list_badge_before': index == 1}">入场时间： {{list.entertime}}</span>
				<span class="list_badge list_badge_after">出场时间： {{list.appearance}}</span>
				<div class="flexable-layout">
					<div class="user_info">
						<p>{{list.carno}}</p>
						<span>车牌号</span>
					</div>
					<div class="list_item_card list_item_card_parking">
						<p>{{list.parking_lot}}</p>
						<span>所属停车场</span>
					</div>
					<div class="list_item_card">
						<p class="err">{{list.out_station_id}}</p>
						<span>收费口</span>
					</div>
					<div class="list_item_card">
						<p>{{list.phone}}</p>
						<span>手机号</span>
					</div>
					<div class="list_item_card">
						<p>{{list.internal_name}}</p>
						<span>姓名</span>
					</div>
					<div class="list_item_card">
						<p>{{list.internal_unit}}</p>
						<span>单位</span>
					</div>
					<div class="list_item_card">
						<p class="money">{{list.amt}}</p>
						<span>应付金额</span>
					</div>
					<div class="list_item_card">
						<p class="money">{{list.cost}}</p>
						<span>实付金额</span>
					</div>
					<div class="list_item_card">
						<p>{{list.payWay}}</p>
						<span>支付方式</span>
					</div>
					<div class="list_item_card list_item_card_reason">
						<p>{{list.reason}}</p>
						<span>修改原因</span>
					</div>
					<div class="list_item_card">
						<p>{{list.stay}}</p>
						<span>停留时间</span>
					</div>
				</div>
			</div>

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
		name: 'queryList',
		props: ['lists'],
		data(){
			return {
				_lists: []
			}
		},
		mounted(){
			this._lists = this.$props.lists || JSON.parse(sessionStorage.getItem('query'))
		}

	}
</script>

<style lang="stylus">
.query
	.null_data
		text-align center
		line-height 300px;
		color #aaa
		
	.main_list
		padding 70px 30px
	.main_list_item
		min-height 152px;
		background white
		margin-bottom 41px
		border-radius 10px
		box-shadow 0 20px 60px rgba(51, 51, 51, .15)
		position relative
		padding-top 26px 
		padding-bottom 30px
		
		em, i
			font-style normal
		
		.err
			color #f62121

		.flexable-layout
			display flex
		
		.user_info
			max-width 182px
			width 11%
			flex 1
			border-right 1px solid #cccccc
			text-align center
			margin-right 2%
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
			
		.list_badge_before
			background #5a52c3
		
		.list_badge_after
			background #17a546
			left 270px
		
		.list_item_card
			box-shadow 0 2px 7px rgba(51, 51, 51, .23)
			max-width 96px
			width 6.5%
			height 96px
			text-align center
			margin-right 1.5%
			border-radius 5px

			p
				margin-top 30px
				line-height 13px
				height 13px
				font-size 13px
			p.money
				color red;
				font-size 20px
				
				&:before 
					content "￥"
					color black
			span
				padding-top 20px
				color #63679d
				display inline-block
				font-size 12px
		.list_item_card_parking
			max-width 180px
			width 10%
			
		.list_item_card_reason
			max-width 200px
			width 19%
		
		.large_text
			min-width 420px
			
		.list_btn_group 
			padding-top 20px
			padding-left 40px

			button
				width 180px
				height 60px;
				border-radius 10px;
				border 1px solid transparent
				color white
				cursor pointer
				box-shadow 0 2px 7px rgba(0,0,0,.23)
				
				
				&:focus
					outline none
				
			button.watch
				background linear-gradient(to bottom, #e85f2f, #fe875d)
				margin-right 30px
			
			button.warning
				background linear-gradient(to bottom, #16a0d1, #24b5e8)
				
		
				
</style>