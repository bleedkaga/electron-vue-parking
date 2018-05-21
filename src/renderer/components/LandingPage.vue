<template>
  <div id="wrapper">
    <div class="aside">
      <div class="user_group">
        <img src="~@/assets/logo.png">
        <img src="~@/assets/avatar.png" >
        <p class="user_info">{{username}}</p>
      </div>
      <ul class="navigation_group">
        <li :class="{'active': nav.active}" v-for="(nav, index) in navs" :key="index" @click="selectedCurrent(index, nav.router)">
          <span>
            <i :class="nav.icon"></i>
          </span>
          <p>{{nav.text}}</p>
        </li>
      </ul>

      <div class="exit" @click="Exit">
        <i class="iconfont icon-tuichu"></i> 退出
      </div>
    </div>
    
    <router-view class="main_view"></router-view>
   
  </div>
</template>

<script>
  
  export default {
    name: 'landing-page',
    data(){
      return {
        username: '',
        navs: [
          {
            text: '异常处理',
            icon: 'iconfont icon-yichang-kaoqin',
            alias: 'abnormal',
            active: true,
            router: '/'
          },
          {
            text: '信息查询',
            icon: 'iconfont icon-xinxichaxun',
            alias: 'query',
            active: false,
            router: '/query'
          },
          // {
          //   text: '信息统计',
          //   icon: 'iconfont icon-tongji1',
          //   alias: 'statistics',
          //   active: false,
          //   router: '/statistics'
          // }
        ]
      }
    },
    watch: {
      '$route': function(to, from){
        this.selectedCurrentPath(to.meta.name)
      }
    },
    mounted(){
      this.username = JSON.parse(sessionStorage.getItem('user')).username
      this.selectedCurrentPath(this.$router.currentRoute.meta.name)
    },
    methods: {
      selectedCurrentPath( name ){
        this.navs.forEach( item => {
          item.alias == name ? item.active = true: item.active = false
        })
      },
      open (link) {

        this.$electron.shell.openExternal(link)
      },
      selectedCurrent( index, router){
        this.navs.forEach( item => {
          item.active = false
        })

        this.navs[index].active = true
        this.$router.push({path: router})
      },
      Exit(){
        this.$confirm('确认退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
          sessionStorage.removeItem('user')
          this.$router.push({path: '/login'})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      }
    }
  }
</script>

<style lang="stylus">
  @import url('~@/assets/fonts/iconfont.css');

  .aside {
    width: 200px;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    background: #fff;
    overflow-y: scroll
    box-shadow: 4px 4px 4px rgba(0,0,0,0.1);
  }
  .aside .user_group .user_info {
    text-align: center;
  }
  .aside .navigation_group {
    margin-top: 35px;
    padding: 0 15px;
  }
  .aside .navigation_group li {
    width: 170px;
    height: 136px;
    text-align: center;
    color: #635e9c;
    border-radius: 6px;
    margin-bottom: 43px;
    font-size: 14px;
    cursor: pointer;
  }
  .aside .navigation_group li.active {
    background: #6d65ca;
    color: #fff;
    transition: all .3s ease;
  }
  .aside .navigation_group li.active .iconfont {
    color: #fff;
  }
  .aside .navigation_group li span {
    padding-top: 34px;
    text-align: center;
    display: inline-block;
    margin-bottom: 22px;
  }
  .aside .navigation_group li span .iconfont {
    font-size: 40px;
    color: #5f597f;
  }
  
  .main_view{
    min-height: 100vh;
    margin-left: 200px;
    background: #f5f7fa
  }
  
  .my-trans-enter-active, .my-trans-leave-active {
    transition: all .2s ease-out;
    
  }
  .my-trans-enter {
    opacity: 0;
  }
  .my-trans-leave-active {
 opacity: 1;
  }
  
  .exit
    text-align center
    padding-top 100px
    cursor pointer
    font-size 13px
    padding-bottom 50px
</style>
