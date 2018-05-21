<template>
	<div>
		<div class="flexable-center">
			<div class="query_info">
				<div class="query_form">
					<h1>信息查询</h1>
					<p class="form-item">
						<span class="parking_name">{{parkingName}}</span>
					</p>
					<p class="form-item">
						<!-- <input class="form-control" type="text" placeholder="请输入车牌号码、车主名称、单位名称"> -->
						<el-input v-model="name" placeholder="请输入车牌号码、车主名称、单位名称"></el-input>
					</p>
					<p class="form-item">
						<!-- <input class="form-control" type="tel" placeholder="请输入手机号"> -->
						<el-input v-model="phone" placeholder="请输入手机号"></el-input>
					</p>
					<div class="form-datetime-group">
						<div class="form-datetime">
							<label >开始时间</label>
							<el-date-picker
						      v-model="start"
						      type="datetime"
						      placeholder="开始时间">
						    </el-date-picker>
						</div>
						<div class="form-datetime">
							<label >结束时间</label>
							<el-date-picker
						      v-model="end"
						      type="datetime"
						      placeholder="结束时间">
						    </el-date-picker>
						</div>
					</div>
					<p>
						<button class="btn_query" @click="query">查询</button>
					</p>

					<img class="parking_view" src="~@/assets/parking.png" alt="">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
		        start: '',
		        end: '',
		        parkingName: '',
		        name: '',
		        phone: ''
			}
		},
		mounted(){
			let token = JSON.parse(sessionStorage.getItem('user'));
			this.parkingName = token.parName;
			this.pid = token.pid;
		},
		methods: {
			query(){
				let param = {
					pid: this.pid,
					carno: this.name,
					phone: this.phone,
					start: this.start,
					end: this.end,
					page: this.page
				}

				this.$post('https://www.parkingpay.net/api/parking_info.php', param).then( res => {
					if(res.error_code == '0'){
						sessionStorage.setItem('query', JSON.stringify( res.data))
						this.$router.push('/query-result')
					} else {
						this.$message({type: 'error', message: res.msg})
					}
				})
				
			},
			
		}
	}
</script>

<style lang="stylus">


	.flexable-center
		display flex
		align-items center 
		justify-content center
		min-height 100vh

	.query_info
		width 90%
		height 95vh
		background white
		position relative

	.query_form
		max-width 880px
		width 90%
		margin 0 auto;
		
		.parking_view
			position absolute
			right -30px
			width 40%
			bottom 100px
		
		h1
			color #5e5980
			margin-top 83px
			font-weight normal
			margin-bottom 109px
		
		p.form-item
			height 60px
			line-height 60px
			box-shadow 0 3px 7px rgba(51,51,51,.39)
			margin-bottom 30px
			border-radius 5px
			
			.parking_name
				color #aaa;
				text-indent 2em
				display block
				font-size 13px
			
			input
				border none
				width 100%
				height 60px
				line-height 60px
				font-size 14px
				text-indent 1em
				border-radius 5px
			input.form-control
				border 1px solid transparent
				
			input.form-control:focus
				outline none
				border 1px solid #d15fb9
				
			.el-select
				width 100%
				
		.form-datetime-group
			display flex
			
			.form-datetime
				box-shadow 0 3px 7px rgba(51,51,51,.39)
				line-height 60px
				border-radius 5px
				margin-right 30px
				label
					font-size 13px
					padding-left 30px
					color #aaa

				width 300px
				height 60px	
				
				.el-input, 
				.el-input__inner 
					width 205px
					border none
					
			

	.btn_query
		width  157px
		height 60px
		line-height 60px;
		border-radius 10px
		margin-top 30px
		cursor pointer
		background linear-gradient(to bottom, #d15fb9, #7b60d2)
		border 1px solid transparent
		color white
		font-size 13px

		&:focus
			outline none
		
	@media screen and (max-width: 1280px)
		*
			font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif
		.query_form
			.parking_view
				bottom 50px
			h1
				margin-bottom 50px
				font-size: 30px
		.query_info
			height 100%
			padding-bottom 20px
	
</style>