<template>
	<div >
		<div class="main_header">
			<span class="go_back" @click="$router.back()"><i class="iconfont icon-fanhui"></i> 渝A33Y15</span>
			<span class="header_item">车主名称： 张丽</span>
			<span class="header_item">单位名称： 重庆知己科技</span>
			<span class="header_item">手机号： 13698543333</span>

			<div class="form">
				<div class="form_group">
					<span class="parking_name">{{parkingName}}</span>
				</div>
				<div class="form_group">
					<label >开始时间</label>
					<el-date-picker
				      v-model="start"
				      type="datetime"
				      format="yyyy-MM-dd hh:mm"
				      placeholder="开始时间">
				    </el-date-picker>
				</div>
				<div class="form_group">
					<label >结束时间</label>
					<!-- <el-date-picker
				      v-model="end"
				      type="datetime"
				      format="yyyy-MM-dd hh:mm"
				      placeholder="结束时间">
				    </el-date-picker> -->
				    <el-date-picker
				      v-model="value1"
				      type="datetime"
				      placeholder="选择日期时间">
				    </el-date-picker>
				</div>
				
				<div class="">
					<button class="query" @click="query">查询</button>
				</div>
			</div>
		</div>

		<listResult :lists="listData"></listResult>

		
	</div>
</template>

<script>
	import listResult from '@/components/info-query/list.vue'
	import pagination from '@/components/pagination.vue'
	export default {
		data(){
			return {
				start: '',
				end: '',
				value1: '',
				parkingName: this.$token.parName,
		        listData: [],
		        page: 1
			}
		},
		created(){
			this.parkingName = this.$util.getSessionStorage('user').parName;
		},
		mounted(){
			let token = this.$util.getSessionStorage('user');

			this.listData = JSON.parse(sessionStorage.getItem('query'))
		},
		methods: {
			query(){
				let param = {
					pid: this.$token.pid,
					start: this.start,
					end: this.end,
					page: this.page
				}

				this.$post('https://www.parkingpay.net/api/parking_info.php', param).then( res => {
					if(res.error_code == '0'){
						this.listData = res.data
					} else {
						this.$message({type: 'error', message: res.msg})
					}
				})
			}
		},
		components: {
			listResult,
			pagination
		}
	}
</script>

<style lang="stylus">
	.main_header
		.header_item
			font-size 13px
			color #666666;
			padding-right 21px
		.form
			float right
			display flex
			padding-top 27px
			padding-right 30px;
			
			.form_group
				width 252px
				height 36px
				border-radius 36px;
				box-shadow 0 3px 7px rgba(51,51,51, .4)
				background white
				margin-right 20px	
				
				.parking_name
					display block;
					height 36px
					line-height 36px
					text-align center
					font-size 14px
					color #333

				label
					font-size 13px
					padding-left 20px
					
				.el-select,
				.el-input
					width 170px
					
					input
						width 100%
						padding-right 0
						border none
						height 36px
						line-height 36px;
						border-radius 30px	
			
			button.query
				width  124px
				height 36px
				line-height 36px;
				border-radius 36px
				cursor pointer
				background linear-gradient(to bottom, #d15fb9, #7b60d2)
				border 1px solid transparent
				color white
				font-size 13px
				margin-left 20px
				&:focus
					outline none

	.go_back
		cursor pointer
		color #5c6098
		font-size 13px
		display inline-block
		margin-top 40px
		margin-left 30px;
		margin-right 21px

		.iconfont
			color #666666
			
	@media screen and (max-width: 1280px)
		.main_list_item .list_btn_group button
			font-size 14px
		.main_list_item .list_btn_group
			width auto
</style>