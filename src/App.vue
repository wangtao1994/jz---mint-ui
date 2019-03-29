<!--App.vue是项目入口文件。-->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import '@/css/reset.css'
import '@/css/common.css'
import '@/css/login.css'
import '@/css/rscu.css'
import '@/css/userinfo.css'

export default {
  name: 'app',
  data(){
  	return {}
  }
  
}
</script>