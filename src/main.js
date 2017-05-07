// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-teal.css' 

import axios from 'axios'


import toast from './components/toast'

Vue.prototype.$http = axios

Vue.use(MuseUI)

Vue.component('toast', toast)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
