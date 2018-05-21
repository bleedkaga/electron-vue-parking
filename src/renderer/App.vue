<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
	import Vue from 'vue'
  export default {
    name: 'client_center2',
    data(){
    	return {
    		config: {}
    	}
    },
    mounted(){
    }

  }
</script>

<style lang="stylus">
  /* CSS */
  @import url('~@/assets/public.css');
  @media screen and (max-width: 1280px)
    *
      font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif
  @import url('~@/assets/fonts/iconfont.css');

</style>
