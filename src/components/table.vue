<template>
  <div class="xd-table">
    <div class="xd-table-content">
      <div class="xd-table-body">
        <table>
          <thead class="xd-table-thead">
            <tr>
              <th v-for="item in columns">{{item.title}}</th>
              <th><img v-if="showAdd" src="@/images/icon/IOS/content_icon_add.png" @click="addMethod"></th>
            </tr>
          </thead>
          <tbody class="xd-table-tbody">
            <tr v-for="trItem in dataSource" @click="goDetail(trItem)">
              <td v-for="tdItem in columns">
                {{trItem[tdItem.dataIndex]}}
              </td>
              <td><img src="@/images/icon/IOS/content_icon_more_6.png" alt=""></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style>
  .xd-table table{
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    text-align: left;
    border-radius: 4px 4px 0 0;
  }
  .xd-table-thead > tr, .xd-table-tbody > tr {
    -webkit-transition: all .3s;
    transition: all .3s;
  }
  .xd-table-thead > tr > th, .xd-table-tbody > tr > td {
    padding: 5px 5px;
    word-break: break-all;
    font-family: 'PingFangSC-Thin';
    font-size: 14px;
    height: 50px;
  }
  .xd-table-thead > tr > th{
    height: 40px;
  }
  .xd-table-thead > tr > th:nth-of-type(1), .xd-table-tbody > tr > td:nth-of-type(1) {
    padding-left: 20px;
  }
  .xd-table-thead > tr > th {
    background: rgba(20, 20, 20, 0.05);
    -webkit-transition: background .3s ease;
    transition: background .3s ease;
    text-align: left;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 800;
    border-bottom: 1px solid #e8e8e8;
  }
  .xd-table-tbody > tr > td {
    border-bottom: 1px solid #e8e8e8;
    -webkit-transition: all .3s;
    transition: all .3s;
    font-family: 'PingFangSC-Thin';
    color: #000;
    background-color: #fff;
  }
</style>
<script>
  export default {
    props: ["columns", "dataSource","showAdd"],
    methods:{
      addMethod(){
        this.$emit('addMethod')
      },
      goDetail(trItem){
        this.$emit('goDetail',trItem)
      }
    }
  }
</script>