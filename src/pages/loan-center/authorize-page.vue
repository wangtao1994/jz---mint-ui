<template>
</template>
<script>
import { mapGetters } from 'vuex';
import { Toast } from 'mint-ui';
  export default {
    computed: {
      ...mapGetters({
        wxUserInfo:'wxUserInfo'
      })
    },
    beforeMount(){
      try{
        var order_id = this.$route.params.order_id;
        if(!this.wxUserInfo.openid && !localStorage.getItem('openid')){
            //调微信授权
            var  authorBackUrl = location.protocol + '//' + window.location.host + '/loan/guest-loan-order-detail/' + order_id;
            this.$store.dispatch('wxAuthorize',  { backUri : authorBackUrl })
              .done( data => {
                var backUri = decodeURI(data.backUri);
                localStorage.setItem('openid', data.openid)
                window.location.href = backUri;
              })
              .fail( msg => {
                Toast({
                  message: msg,
                  duration: 2000
                })
              })
        }else{
          this.$router.push('/loan/guest-loan-order-detail/' + order_id);
        }

      }catch(e){
        alert(e);
      }
    }
  }
</script>