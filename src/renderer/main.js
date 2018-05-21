import Vue from 'vue'
import axios from 'axios'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import Echarts from 'echarts'
import Qs     from 'qs'

import App from './App'
import router from './router'
import store from './store'
import db from './datastore'
import util from './util'

const vueElectron = require('vue-electron');

if (!process.env.IS_WEB) Vue.use(vueElectron)
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUi)

Vue.prototype.$echarts = Echarts;
Vue.prototype.$outConfig = JSON.parse(db.content)
Vue.prototype.$util = util;

const post = function(url, data){
  return new Promise( (resolve, reject) => {
    axios.post(url, Qs.stringify(data)).then( res => {
      resolve( res.data)
    }).catch( error => {
      reject( error )
    })
  })
}

Vue.prototype.$token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : '';
Vue.prototype.$post = post;

/* eslint-disable no-new */

new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

