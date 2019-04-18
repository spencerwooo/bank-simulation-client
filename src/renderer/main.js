import Vue from 'vue'
import axios from 'axios'
import vSelect from 'vue-select'
import VueModalTor from 'vue-modaltor'

import App from './App'
import router from './router'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.component('v-select', vSelect)
Vue.use(VueModalTor)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
