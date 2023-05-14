import Vue from 'vue'
import App from '@/App.vue'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/base.css'
import router from '@/router/index'
import store from './store'
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont'
import '@/router/perrmission'


Vue.config.productionTip = false

Vue.use(ElementUi)

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  },
}).$mount('#app')
