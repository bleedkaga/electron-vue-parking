<template>
	<div class="ele_switch">
		<input type="checkbox" v-model="isChecked">
		<div class="ele_switch_inline"></div>
		<div class="ele_switch_inline_text">
			<span :class="{'active': !isChecked}">待处理</span>
			<span :class="{'active': isChecked}">已处理</span>
		</div>

		{{isChecked}}
	</div>
</template>

<script>
	export default {
		data(){
			return {
				isChecked: false
			}
		}
	}
</script>

<style lang="stylus">
	.ele_switch
		width 220px
		height 36px
		border-radius 36px
		background #e6e7f7
		transform translateY(30px)
		margin-left 30px
		position relative
		
		input[type=checkbox]{
			width 220px
			height 36px
			cursor pointer
			background transparent
			-webkit-appearance none
			position relative
			z-index 9
		}
		
		input[type=checkbox] + .ele_switch_inline{
			width 124px
			height 36px
			display inline-block
			background #7363cd
			border-radius 36px
			transition transform .1s ease;
			box-shadow 0 3px 8px rgba(58, 35, 172, .32)
			position absolute
			left 0 
			top 0
		}
		
			
		input[type=checkbox]:checked + .ele_switch_inline
			transform translateX(96px)

		input[type=checkbox]:checked,
		input[type=checkbox]:focus
			outline none
		
		.ele_switch_inline_text
			position absolute
			left 0
			top 0
			
			span.active
				color white
			
			span
				float left
				line-height 36px
				font-size 14px
				font-family "Microsoft Yahei"
				color #6d71a4
				width 110px
				text-align center
</style>