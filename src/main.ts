// Vue
import { createApp } from 'vue'
// Vuex
import Vuex from './store/index'
// Vue Router
import VueRouter from './router/index'
// App.vue
import App from './App.vue'
// Element-Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(VueRouter).use(Vuex).use(ElementPlus).mount('#app')
