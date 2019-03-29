<template>
  <div class="container">
      <img src="@/images/icon/IOS/content_icon_sucess@3x.png" style="height: 76px;height: 76px;margin-top: 150px;" />
      <p style="margin-top: 23px;" class="f-m">恭喜您已完成贷款申请</p>
  </div>
</template>
<style scoped>
  .container{
    height: 100vh;
    display: flex;
    flex-direction:column;
    align-items: center;
    font-size: 24px;
  }
</style>
<script>
  export default {
    mounted(){
      setTimeout( () => {
        this.$router.push( '/main');
      }, 2000)
    }
  }
</script>