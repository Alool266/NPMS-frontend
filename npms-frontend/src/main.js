import {createApp} from 'vue'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'

import 'dayjs/locale/zh-cn'
import router from './router'
import store from './store'
// create instance
const app = createApp(App)

app.use(ElementPlus, { locale })
app.use(router)
app.use(store)
app.use(VueAxios,axios)
app.mount('#app')
