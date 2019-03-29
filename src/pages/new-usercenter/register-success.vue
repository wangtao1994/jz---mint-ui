<template>
<section>
	<div class="img0">
		<img src="../../images/rsuc.png"/>
		<p class="re_su">注册成功</p>
		<p class="gx_su">恭喜你 已注册成功</p>
	</div>
</section>		
</template>


<style scoped>
	
	.top_cl{
		height: 3em;
		background: #000000;
		color: #FFFFFF;
		text-align: center;
		line-height: 3em;
	}
	
	.img0{
	position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 15em;
    height: 11em;
    text-align: center;
	}
	.img0>img{
		width: 6em;
		border: 0;
	}
	
	.re_su{
		padding-bottom: .5em;
		font-weight: 600;
		font-size: 1.2em;
	}
	.gx_su{
		color: #CCCCCC;
	}
	
</style>



<script>
	
  export default {
    mounted(){
      setTimeout( () => {
        this.$router.push( '/newlogin');
      }, 2000)
    },
    created(){
			document.title = '注册'
    }
  }	
	
</script>