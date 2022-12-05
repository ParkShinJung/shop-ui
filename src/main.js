import Vue from "vue";
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import {store} from "./store";
import axios from './plugins/axios'
import vClickOutside from 'v-click-outside'
import "@/plugins/fontAwesomeIcon"

import VueDaumPostcode from "vue-daum-postcode"

Vue.prototype.$eventBus = new Vue();
Vue.prototype.$axios = axios
// 다른 컴포넌트에서는 import 없이 this.$axios로 사용가능

Vue.use(vClickOutside)
Vue.config.productionTip = false
Vue.use(VueDaumPostcode)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
