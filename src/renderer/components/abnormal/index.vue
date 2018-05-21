<template>
	<div>
		<div class="main_header clearboth">
      <div class="handle_warning"  v-clickoutside="visibleWarningPanel">
        <span class="handle_group " @click="warningVisible = !warningVisible"><i class="iconfont icon-yichang-kaoqin "></i></span>
        <transition name="el-zoom-top">
          <div class="handle_warning_list" v-if="warningVisible">
            <p class="operation"><el-checkbox label="开启警告音"></el-checkbox></p>
            <p v-if="jsonSocketWarning.length == 0" class="null_date">暂无数据</p>
            <ul v-else>
              <li v-for="(item, index) in jsonSocketWarning" :key="index">
                <p class="title">{{item.parking}}</p>
                <p class="text"><span>{{item.tip}} </span><el-button @click="warningDone(item, index)" size="small" type="danger" style="float: right">处理完成</el-button></p>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
    <main-list :data="jsonSocketData"></main-list>
    
	</div>
</template>

<script>
    import mainHeader from '@/components/mainHeader'
  	import mainList from '@/components/mainList'
    import clickoutside from '@/directives/clickoutside.js'

  	export default {
      data(){
        return {
          warningVisible: false,
          jsonSocketData: [],
          jsonSocketWarning: []
        }
      },

  		components: {
  			mainHeader,
      	mainList
  		},
      mounted(){
        this.connectSocket()
        this.jsonSocketData = this.$util.getStorage('jsonSocketData') || [];
        this.jsonSocketWarning = this.$util.getStorage('jsonSocketWarning') || []
      },
      methods: {
        visibleWarningPanel(){
          this.warningVisible = false
        },
        connectSocket(){
          const that = this;
          var jsonSocket = new WebSocket("ws://redis.parkingpay.net:8865/.json");

          jsonSocket.onopen = function() {
            console.log("JSON socket connected!");
            jsonSocket.send(JSON.stringify(["SUBSCRIBE", "10001"]));
          };

          jsonSocket.onmessage = function(messageEvent) {
            // console.log("JSON received:", messageEvent.data);
            that.operationSocketData(messageEvent.data)
          };

          jsonSocket.onerror = function(){
            console.error('[socket error]: jsonSocket reconnect!')
            that.reconnectSocket()
          };

          jsonSocket.onclose = function(){
            console.error('[socket close]: jsonSocket reconnect')
            that.reconnectSocket()
          }

        },
        reconnectSocket(){
          console.log('run reconnect socket', Date.now())
          this.connectSocket()
        },
        warningDone( item, index){
          const that = this;
          this.$http.get('http://www.parkingpay.net/api/oper_warning.php?wid='+item.wid).then( res => {
            if(res.data == 'OK'){
              this.jsonSocketWarning.splice(index, 1)
            }
          })
        },
        operationSocketData( data ){
          const src = JSON.parse(data)
          const code = src.SUBSCRIBE[1];
          const _data = src.SUBSCRIBE[2];

          let parsedData;

          var beforeMerge = {
            vueKey: new Date().getTime(),
            datetime: (function(){
              var date = new Date();
              var year = date.getFullYear();
              var month = date.getMonth() + 1;
              var day = date.getDate();
              var hour = date.getHours();
              var min = date.getMinutes();

              return `${year}.${month < 9 ? '0'+month : month}.${day} ${hour}:${min}`;
            })()
          }

          if(_data){
            parsedData = JSON.parse(_data)

            if(parsedData.warning >= 1001 && parsedData.warning <= 1005){
              this.jsonSocketData.unshift(this.$util.merge(beforeMerge, parsedData))
              this.$util.setSessionStorage('jsonSocketData', this.jsonSocketData)
            } else if(parsedData.warning >= 1006 && parsedData.warning <= 1007) {
              this.jsonSocketWarning.unshift(this.$util.merge(beforeMerge, parsedData))
              this.$util.setSessionStorage('jsonSocketWarning', this.jsonSocketWarning)
            }
          }
          

        }
      },
      directives: {
        clickoutside
      }
  	}
</script>

<style lang="stylus" scoped>
  @keyframes Blinking {
    0%{
      color blue
    }
    
    100%{
      color red
    }

  }
  ul li 
    list-style-type none
  .main_header 
    margin-bottom: 10px
  .handle_warning
    float right
    padding-right 30px
    padding-top 30px
    position relative
    
  
    .handle_warning_list
      position absolute
      right 30px
      top 80px
      z-index 999
      box-shadow 0 0px 10px rgba(51, 51, 51, 0.3)
      width 500px;
      max-height 95vh
      background white
      border-radius 6px
      max-height 90vh
      user-select none

      .operation
        padding 10px 30px
      .null_date
        line-height 60px
        font-size 18px
        color #aaa
        text-align center

      &:before
        content ''
        width 14px
        height 14px
        display block
        position absolute
        right 10px
        top -7px
        background white
        box-shadow -3px -3px 3px rgba(51, 51, 51, 0.1)
        border 1px solid transparent
        transform rotateZ(45deg)

      ul
        padding 30px
        padding-top 0
      li
        border-bottom 1px solid #ddd;
        padding-top 10px
        
        .title
          line-height 30px
          color #aaa;
          
        .text
          padding 10px 0
          color red;
          
          > span
            width 70%
            line-height 22px
            display inline-block

          &:before,
          &:after
            clear: both
            content: ''
            display table
        


    .handle_group
      cursor pointer
      
      .iconfont
        font-size 30px
      .iconfont-warning
        animation Blinking .1s ease  infinite
      
</style>