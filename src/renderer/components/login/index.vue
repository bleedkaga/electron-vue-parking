<template>
	<div class="login">
		<div class="left">
			<img src="~@/assets/denglu_pic_tcc.png" alt="">
		</div>
		<div class="right">
			<img class="logo_parking" src="~@/assets/denglu_logo_big.png" alt="">
			<h1 class="logo_title">云管理中心</h1>
			<div class="form">
				<p :class="{'is_focus': focusname == 'uname'}">
					<label >
						<img src="~@/assets/denglu_yonghu.png" alt="">
					</label>
					<input type="text" 
							ref="uname" 
							v-model="uname"
							@keyup.enter="loginSubmit" 
							@focus="focusParent('uname')" 
							@blur="focusname = ''"  
							placeholder="请输入用户名">
				</p>
				<p :class="{'is_focus': focusname == 'upwd'}">
					<label >
						<img src="~@/assets/denglu_mima.png" alt="">
					</label>
					<input type="password" 
							v-model="upwd" 
							ref="upwd" 
							@keyup.enter="loginSubmit"
							@focus="focusParent('upwd')"
							@blur="focusname = ''" 
							placeholder="请输入密码">
				</p>
				<p>
					<button class="login_submit" @click="loginSubmit">登录</button>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'login',
		data(){
			return {
				uname: 'wenfangping',
				upwd: '123456',
				focusname: ''
			}
		},
		mounted(){
		},
		methods: {
			loginSubmit(){
				if(this.uname == ''){
					this.$message({type: 'warning', message:'请输入用户名'})
					this.$refs['uname'].focus()
					return
				}

				if(this.upwd == ''){
					this.$message({type: 'warning', message:'请输入密码'})
					this.$refs['upwd'].focus()
					return
				}


				this.$post('https://www.parkingpay.net/api/warning_login.php', {
					username: this.uname,
					password: this.upwd,
					pid: this.$outConfig.pid
				}).then( res => {
					if(res.error_code == 0){
						this.$message({type: 'success', message: '登录成功'})
						sessionStorage.setItem('user', JSON.stringify(res.data))
						setTimeout( () => {
							this.$router.push({path: '/'})
						}, 300)
					} else {
						this.$message({type: 'error', message : res.msg})
					}
				})
			},
			focusParent( dom ){
				this.focusname = dom;
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import url('~@/assets/public.css');
	.login
		background #f5f7fa;
		width 100%
		min-height 100vh
		display flex
		
		.left
			flex 1
			text-align center
			padding-top 10%
			img
				width 75%
		.right 
			flex 1
			padding-top 200px
			text-align center
			
			.logo_parking
				width 30%
				
			.logo_title
				font-weight normal
				line-height 109px
				font-size 28px
				
			.form
				p
					width 468px;
					
					background white
					box-shadow 0 2px 8px rgba(51,51,51,.3)
					border-radius 4px
					display flex
					margin 0 auto
					margin-bottom 24px
					border 1px solid transparent
					transition border .3s ease

					label
						width 55px
						height 20px
						border-right 1px solid #e6e1e2
						display inline-block
						text-align center	
						margin 15px 0;
					input
						width 100%
						border none
						text-indent 1em
						font-size 14px
						&:focus
							outline none

				p.is_focus
					border 1px solid #6468c4
				p:last-child
					background transparent
					box-shadow none
					
				.login_submit
					width 100%
					height 50px
					line-height 50px
					font-size 16px
					border-radius 4px
					letter-spacing 3px
					border none
					color white
					cursor pointer
					background linear-gradient(to bottom, #6468c4, #7b60d2)
					
					&:focus
						outline none

					
</style>