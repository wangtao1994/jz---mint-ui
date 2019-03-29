//main.js这是项目的核心文件。全局的配置都在这个文件里面配置
import Vue from 'vue'
import App from './App.vue'
import router from './routes.js';
import { store } from './store/index.js'
Vue.use(router);

//import './assets/sass/reset.sass'//报错暂时不用sass
Vue.config.debug = true;//开启错误提示

new Vue({
        router,
         store,
        el: '#appIndex',
        render: h => h(App)
})

