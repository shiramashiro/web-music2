import {createApp} from 'vue'
import Vuex from './store/index'
import VueRouter from './router/index'
import App from './App.vue'

createApp(App).use(VueRouter).use(Vuex).mount('#app')
