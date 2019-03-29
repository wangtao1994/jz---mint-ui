<template>
    <div class="exhibition-detail">
        <div class="add-header">
            <line-ico class="line-ico" :line-text="lineText"></line-ico>
        </div>
        <ul>
            <li v-for="(detailItem,index) in detailColumns" :key="index">
                <span class="detail-frist">{{detailItem.title}}</span>
                <span class="detail-second">{{detailData[detailItem.dataIndex]}}</span>
            </li>
        </ul>
    </div>
</template>
<style scoped>
    .exhibition-detail {
        height: 100vh;
        background: #f7f7f7;
    }

    .exhibition-detail .add-header {
        height: 57px;
        line-height: 57px;
        background: white;
    }

    .exhibition-detail .line-ico {
        margin-left: 15px;
    }

    .exhibition-detail ul {
        background: white;
        margin: 0;
        overflow: hidden
    }

    .exhibition-detail ul li {
        height: 50px;
        padding-left: 20px;
        font-size: 13px;
    }

    .exhibition-detail ul li span {
        display: inline-block;
        float: left;
        word-wrap: break-word
    }

    .exhibition-detail .detail-frist {
        width: 40%;
    }

    .exhibition-detail .detail-second {
        width: 50%;
        color: #999;
    }
</style>
<script>
  import {Cell} from 'mint-ui';
  import lineIco from '@/components/line-ico.vue'
  import {mapGetters} from 'vuex'

  export default {
    components: {
      'mt-cell': Cell,
      'line-ico': lineIco,
    },
    computed: {
      // ...mapGetters({
      //   detailData:'exhibitionDetail'
      // })
    },
    data() {
      return {
        lineText: '客户信息',
        detailData: {},
        detailColumns:[]
      }
    },
    methods: {},
    mounted() {
      this.detailData = this.$store.state.exhibition.exhibitionDetail
      console.log(this.detailData);
      this.detailColumns = this.$store.state.exhibition.exhibitionColumns
    }
  }
</script>