<template>
	<div class="commission_page">
		<div class="list_title">
			<span v-for="item in columns">{{item.title}}</span>
		</div>
		<div class="list_detail">			
			<ul>
				<li v-for="item in detailelist" @click="goDetail(item)">
					<span>{{item.order_id }}</span>
					<span>{{item.full_name}}</span>
					<span>{{item.broker_com}}</span>
					<span v-bind:class="item.comm_status=='未发'?'nopay':''">{{item.comm_status}}</span>
					<span>{{item.create_time}}</span>
					
				</li>
			</ul>			
		</div>
	</div>	
</template>

<style scoped>
.list_title{display: flex;justify-content: center;align-items: center;width: 100%;height: 4em;background: #f7f7f7;}
.list_title>span{width: 20%;text-align: center;display: inline-block;font-size: .9em;font-weight: 600;}	
.list_detail{width: 100%;}
.list_detail ul{width: 100%;}
.list_detail ul li{color: #CCCCCC;width: 100%;display: flex;justify-content: space-around;align-items: center; border-bottom: 1px solid #CCCCCC;padding: 1em 0;}
.list_detail ul li>span{display: inline-block;text-align: center;    font-size: .8em;
    text-align: center;
    width: 18%;}
.list_detail ul li:last-child{border-bottom: none;}
</style>

<script>	
export default {
    props: ["columns","detailelist"],
    methods:{
      goDetail(item){
        this.$emit('goDetail',item)
      }
     
    }
  }
	
</script>