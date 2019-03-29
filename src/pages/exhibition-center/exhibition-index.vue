<template>
    <div class="exhibition">
        <section class="btn-list" v-show="!searchShow">
            <div v-if="btnShow">
                <div class="btn-item" v-for="(btnItem,index) in btnList" @click="chooseBtn(index)"
                     :class="{'btn-choose':btnItem.isChoose}" :key="index" v-text="btnItem.name"></div>
            </div>
            <div v-else>
                <div class="btn-items" v-for="(btnItems,indexs) in btnLists" @click="chooseBtns(indexs)"
                     :class="{'btn-choose':btnItems.isChoose}" :key="indexs" v-text="btnItems.name"></div>
            </div>

        </section>
        <section class="qr-context" v-show="isShow">
            <span class="code-push">推荐经纪人的二维码</span>
            <div id="qrcodes"></div>
            <span class="qr-text">长按二维码可以保存</span>
            <mt-button @click="toShare">推荐经纪人</mt-button>
        </section>
        <section v-if="!isShow&&!searchShow">
            <div class="search-body">
                <div class="search-div" @click="goSearch">
                    <img class="search-icon" src="@/images/icon/IOS/content_icon_search_2.png" alt="">
                    <span>输入您要搜索的信息</span>
                </div>
            </div>
            <xd-table :columns="guestListColumns" :dataSource="dataSource" :showAdd='showAdd' v-on:addMethod="addMethod"
                      v-on:goDetail="goDetail"></xd-table>
            <div class="no-data" v-if="!dataSource.length">
                <img class="no-data-img" src="@/images/icon/IOS/content_icon_no_data.png" alt="">
                <p class="no-data-text">暂无相关数据
                <p/>
            </div>
        </section>
        <section class="search-show-body" v-if="searchShow">
            <div class="search" style="line-height: 36px">
                <img class="search-icon" src="@/images/icon/IOS/content_icon_search_2.png" alt="">
                <input v-on:input="searchAll" v-model="searchValue" class="" placeholder="输入您要搜索的信息" type="text">
            </div>
            <span @click="exitSearch">取消</span>
            <xd-table :columns="guestListColumns" :dataSource="dataSource" :showAdd='showAdd' v-on:addMethod="addMethod"
                      v-on:goDetail="goDetail"></xd-table>
            <div class="no-data" v-if="!dataSource.length">
                <img class="no-data-img" src="@/images/icon/IOS/content_icon_no_data.png" alt="">
                <p class="no-data-text">暂无相关数据
                <p/>
            </div>
        </section>
        <div class="mask" v-if="maskShow" @click="exitMask">
            <img src="@/images/icon/IOS/finger-point.png" alt="">
            <div>马上分享给小伙伴招募您的经纪人吧</div>
        </div>
    </div>
</template>
<style scoped>
    .exhibition {
        height: 100vh;
        background: #f7f7f7;
    }

    .qr-context {
        width: 90%;
        margin-left: 5%;
        margin-top: 54px;
        background: white;
        border-radius: 10px;
        height: 435px;
    }

    .qr-context .code-push {
        display: inline-block;
        font-size: 16px;
        color: #999;
        width: 150px;
        margin: 15px 0 15px calc(50% - 75px);
    }

    #qrcodes {
        margin-left: calc((100% - 260px) / 2);
    }

    .qr-text {
        width: 110px;
        margin-left: calc(50% - 55px);
        margin-top: 15px;
        text-align: center;
        display: block;
        font-size: 12px;
        color: #999;
    }

    .no-data .no-data-img {
        width: 200px;
        height: 200px;
        margin-left: calc(50% - 100px);
        margin-top: 53px;
    }

    .no-data .no-data-text {
        text-align: center;
        margin-top: 20px;
        font-size: 18px;
        color: rgb(186, 186, 186);
    }

    .mint-button {
        width: 146px;
        height: 36px;
        border: 1px solid rgb(107, 220, 255);
        color: rgb(57 182 254);
        background: white;
        margin: 12px 0 0 calc(50% - 73px);
        border-radius: 5px;
        font-size: 16px;
    }

    .btn-list {
        background: white;
        height: 36px;
        width: 100%;
        border: 1px solid rgb(57, 182, 254);
        border-left: 0;
    }

    .btn-list .btn-item {
        height: 36px;
        line-height: 36px;
        text-align: center;
        font-size: 14px;
        color: rgb(57, 182, 254);
        width: 24.75%;
        float: left;
        margin: 0;
        padding: 0;
        border-left: 1px solid rgb(57, 182, 254);
    }

    .btn-list .btn-items {
        height: 36px;
        line-height: 36px;
        text-align: center;
        font-size: 14px;
        color: rgb(57, 182, 254);
        width: 33.02%;
        float: left;
        margin: 0;
        padding: 0;
        border-left: 1px solid rgb(57, 182, 254);
    }

    .btn-list .btn-item:nth-of-type(1) {
        border: none;
    }

    .exhibition .btn-list .btn-choose {
        background: rgb(57, 182, 254);
        color: white;
    }

    .search-body {
        height: 56px;
        background: white;
        overflow: hidden;
    }

    .search-body .search-div {
        height: 36px;
        width: 90%;
        margin: 10px 0 0 5%;
        border-radius: 5px;
        background: #eee;
    }

    .search-body .search-div .search-icon {
        float: left;
        width: 17px;
        height: 17px;
        margin: 10px 0 0 25%;
    }

    .search-body .search-div span {
        font-size: 14px;
        line-height: 36px;
        margin-left: 16px;
        color: #aaa;
    }

    .search-show-body {
        height: 100vh;
        background: white;
        overflow: auto;
    }

    .search-show-body span {
        display: inline-block;
        float: left;
        color: rgb(57, 182, 254);
        font-size: 16px;
        line-height: 56px;
        margin-left: 10px;
    }

    .search {
        width: 80%;
        border-radius: 5px;
        height: 36px;
        margin: 12px 0 0 2%;
        background: #f1f1f1;
        float: left;
    }

    .search .search-icon {
        float: left;
        width: 17px;
        height: 17px;
        margin: 10px 0 0 17px;
    }

    .search input {
        margin: 0;
        padding: 0;
        vertical-align: middle;
        width: 70%;
        float: left;
        outline: none;
        font-size: 14px;
        border: 0;
        margin-left: 16px;
        color: #999;
        background: #f1f1f1;
        height: 36px;

    }

    .mask {
        width: 100%;
        height: 100vh;
        position: fixed;
        z-index: 99;
        background: black;
        opacity: 0.5;
        top: 0;
    }

    .mask img {
        width: 100px;
        float: right;
        margin-right: 9%;
    }

    .mask div {
        color: #fff;
        margin-top: 80px;
        text-align: center;
    }
</style>
<script>
  import {Button, Toast} from 'mint-ui';
  import lineIco from '@/components/line-ico.vue'
  import xdTable from '@/components/table.vue'
  import QRCode from 'qrcodejs2'
  import {post} from "@/utils/request";
  import wx from 'weixin-js-sdk';
  import wxConfig from '@/utils/wechatMixins'
  import $ from 'jquery';
  import {dateFormatUTC} from '@/utils/utils'
  const guestListColumns = [{
    title: '客户姓名',
    dataIndex: 'full_name',
  }, {
    title: '城市',
    dataIndex: 'city_name'
  }, {
    title: '身份证后4位',
    dataIndex: 'id_card'
  }]
  const guestDetailColumns = [{
    title: '客户姓名',
    dataIndex: 'full_name',
  }, {
    title: '城市',
    dataIndex: 'city_name'
  }, {
    title: '身份证后4位',
    dataIndex: 'id_card'
  }, {
    title: '录入时间',
    dataIndex: 'created_date'
  }, {
    title: '备注',
    dataIndex: 'remark'
  }]
  const agentListColumns = [{
    title: '经纪人姓名',
    dataIndex: 'user_name',
  }, {
    title: '城市',
    dataIndex: 'city_name'
  }, {
    title: '手机号',
    dataIndex: 'mobile'
  }]
  const agentDetailColumns = [{
    title: '经纪人姓名',
    dataIndex: 'user_name',
  }, {
    title: '城市',
    dataIndex: 'city_name'
  }, {
    title: '手机号',
    dataIndex: 'mobile'
  }, {
    title: '注册时间',
    dataIndex: 'created_date'
  }, {
    title: '备注',
    dataIndex: 'remark'
  }]
  const channelListColumns = [{
    title: '渠道商',
    dataIndex: 'channel_bus_name',
  }, {
    title: '城市',
    dataIndex: 'city_name'
  }, {
    title: '联系人',
    dataIndex: 'contact'
  }, {
    title: '手机号',
    dataIndex: 'telphone'
  }]
  const channelDetailColumns = [{
    title: '渠道商',
    dataIndex: 'channel_bus_name'
  }, {
    title: '城市',
    dataIndex: 'city_name'
  }, {
    title: '联系人',
    dataIndex: 'contact'
  }, {
    title: '手机号',
    dataIndex: 'telphone'
  }, {
    title: '录入时间',
    dataIndex: 'create_time'
  }, {
    title: '备注',
    dataIndex: 'remark'
  }]
  export default {
    components: {
      'mt-button': Button,
      'line-ico': lineIco,
      'xd-table': xdTable,
    },
    data() {
      return {
        isShow: true,
        showAdd: true,
        searchShow: false,
        type: "",
        mobile: '',
        user_name: '',
        searchValue: '',
        textStr: '我的',
        btnShow: false,
        maskShow: false,
        guestListColumns: guestListColumns,
        dataSource: [],
        btnList: [
          {name: '分享推广', isChoose: true}, {name: '我的客户', isChoose: false}, {
            name: '我的经纪人',
            isChoose: false
          }, {name: '我的渠道商', isChoose: false}
        ],
        btnLists: [
          {name: '分享推广', isChoose: true}, {name: '我的客户', isChoose: false}, {
            name: '我的经纪人',
            isChoose: false
          }
        ]
      }
    },
    watch: {
      searchShow(val, oldVal) {
        if (val == false) {
          this.exitSearch()
        }
      }
    },
    methods: {
      getGuestList(searchValue) {
        this.guestListColumns = guestListColumns;
        this.$store.state.exhibition.exhibitionColumns = guestDetailColumns;
        let that = this;
        let param = {
          parameters: searchValue
        }
        this.$store.dispatch('getGuestLists', param)
          .then(function (res) {
          	console.log(res);
            res.map(item => {
              item.created_date = dateFormatUTC(new Date(item.created_date), 'yyyy-MM-dd hh:mm:ss')
            })
            that.dataSource = res;
          })
          .fail(msg => {
            Toast({
              message: msg,
              duration: 2000
            });
          })
      },
      getAgentList() {
        this.guestListColumns = agentListColumns;
        this.$store.state.exhibition.exhibitionColumns = agentDetailColumns;
        let that = this;
        this.$store.dispatch('getAgentList', {parameters: this.searchValue})
          .then(function (res) {
          	console.log(res);
            res.map(item => {
              item.created_date = dateFormatUTC(new Date(item.created_date), 'yyyy-MM-dd hh:mm:ss')
            })
            that.dataSource = res;
          }).fail(msg => {
          Toast({
            message: msg,
            duration: 2000
          });
        })
      },
      getChannelList() {
        this.guestListColumns = channelListColumns
        this.$store.state.exhibition.exhibitionColumns = channelDetailColumns;
        let that = this;
        this.$store.dispatch('getChannelList', {parameters: this.searchValue})
          .then(function (res) {
          	console.log(res);
            res.map(item => {
              item.create_time = dateFormatUTC(new Date(item.create_time), 'yyyy-MM-dd hh:mm:ss')
            })
            that.dataSource = res;
          }).fail(msg => {
          Toast({
            message: msg,
            duration: 2000
          });
        })
      },
      exitMask() {
        this.maskShow = false
      },
      toShare() {
        let that = this;
        let myUrl = '';
        if (/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)) {
          myUrl = window.sessionStorage.getItem('url').split('#')[0];
        } else {
          myUrl = window.location.href.split('#')[0];
        }
        this.$store.dispatch('wxShare', {url: myUrl})
          .then(res => {
            that.maskShow = true;
            let shareObj = {
              title: "邀请您加入金证金服，成为金证通贷款经纪人",
              ptSummary: '“金证通”是金证金服旗下专业的贷款经纪人展业平台，为贷款经纪人提供发展客户、发展经纪人团队、进件通道、佣金结算、代收代付等全方位一站式服务。',
              link: 'https://' + window.location.host + '/register?invite=' + that.mobile + '&invitename=' + that.user_name,
              mainImg: 'https://jzjf.kingdomfax.com/kingdom.png'
            }
            // wxConfig.wxShare(shareObj)
            wxConfig.methods.wxShare(shareObj, res, function () {
              that.maskShow = false
            })
          }).fail(msg => {
          Toast({
            message: '获取分享信息失败',
            duration: 2000
          });
        })
      },
      qrcode(mobel,user_name) {
        let qrcode = new QRCode('qrcodes', {
          width: 260,
          height: 260, // 高度
          text: 'https://' + window.location.host + '/register?invite=' + mobel + '&invitename=' + user_name
          // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
          // background: '#f0f'
          // foreground: '#ff0'
        })
        //console.log(qrcode)
      },
      goSearch() {
        this.searchValue = '';
        this.searchShow = true;
      },
      goDetail(detailObj) {
        this.$store.dispatch('goDetail', detailObj);
        console.log(detailObj);
        this.$router.push('/exhibitionDetail')
      },
      exitSearch() {
        this.searchShow = false
        this.searchValue = ''
        if (this.type == 'guest') {
          this.getGuestList(this.searchValue);
        } else if (this.type == 'agent') {
          this.getAgentList(this.searchValue);
        } else if (this.type == 'channel') {
          this.getChannelList(this.searchValue)
        }
      },
      addMethod() {
        this.$router.push('/addGuest')
      },
      searchAll() {
        let value = this.searchValue
        if (this.type == 'guest') {
          this.getGuestList(value);
        } else if (this.type == 'agent') {
          this.getAgentList(value);
        } else if (this.type == 'channel') {
          this.getChannelList(value)
        }
      },
      chooseBtns(index){
        this.searchShow = false;
        this.btnLists.map(function (item) {
          return item.isChoose = false
        });
        this.btnLists[index].isChoose = true;
        this.searchValue = ''
        if (index == 0) {
          localStorage.setItem('typeIndex',0)
          this.isShow = true;
        } else if (index == 1) {
          this.getGuestList(this.searchValue);
          localStorage.setItem('typeIndex',1)
          this.type = 'guest';
          this.isShow = false;
          this.showAdd = true
        } else if (index == 2) {
          this.getAgentList(this.searchValue);
          localStorage.setItem('typeIndex',2)
          this.type = 'agent';
          this.isShow = false;
          this.showAdd = false
        }
      },
      chooseBtn(index) {
        this.btnList.map(function (item) {
          return item.isChoose = false
        });
        this.btnList[index].isChoose = true;
        this.searchValue = ''
        if (index == 0) {
          localStorage.setItem('typeIndex',0)
          this.isShow = true;
        } else if (index == 1) {
          this.getGuestList(this.searchValue);
          this.type = 'guest';
          localStorage.setItem('typeIndex',1)
          this.isShow = false;
          this.showAdd = true
        } else if (index == 2) {
          this.getAgentList(this.searchValue);
          this.type = 'agent';
          localStorage.setItem('typeIndex',2)
          this.isShow = false;
          this.showAdd = false
        } else if (index == 3) {
          this.getChannelList(this.searchValue)
          this.type = 'channel';
          localStorage.setItem('typeIndex',3)
          this.isShow = false
          this.showAdd = false
        }
      }

    },
    mounted() {
      if (localStorage.getItem('userinfo')) {
        let mobel = JSON.parse(localStorage.getItem('userinfo')).mobile
        this.mobile = mobel;
        let user_name = JSON.parse(localStorage.getItem('userinfo')).user_name
        this.user_name = user_name;
        this.qrcode(mobel,user_name);
        if (JSON.parse(localStorage.getItem('userinfo')).role_name == 'channel_man') {
          this.btnShow = true
        }
      }
      let typeIndex = localStorage.getItem('typeIndex')
      if(typeIndex){
        if(this.btnShow){
          this.chooseBtn(typeIndex)
        }else {
          this.chooseBtns(typeIndex)
        }
      }


    }
  }
</script>