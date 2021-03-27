import Vue from 'vue'
import App from './App.vue'
import router from "./handlers/router.js"
import io from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import NProgress from 'nprogress';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faPlay } from '@fortawesome/free-solid-svg-icons'
//import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'

library.add(faTimes)
library.add(faPlay)

Vue.component('fontAws', FontAwesomeIcon)

Vue.use(new VueSocketIO({
    connection:  io('http://localhost:5100')
}))

Vue.config.productionTip = true

NProgress.start()

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
