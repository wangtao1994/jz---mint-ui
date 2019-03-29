<template>
    <div class="bg-gray">
        <div class="mask" @click="showmask=false" v-show="showmask">
            <img  src="@/images/icon/IOS/finger-point.png" />
            <div >马上分享给小伙伴招募您的经纪人吧</div>
        </div>
        <div class="user-header-layer">
            <img src="@/images/icon/IOS/content_pic_1.png" class="head-bg" />
            <div class="withdraw" v-show="isLogin&&false"  @click="goToUserDetail()">
                个人信息>>
            </div>
            <div class="user-info">
                <div class="user-head-img-wrap">
                    <img src='@/images/icon/IOS/content_icon_head_img_nor@3x.png' />
                </div>
                <div class="user-personal-info" v-show="isLogin">
                    <div >
                        <div class="user-name f-r">
                            {{userinfo.user_name}}
                        </div>
                        <div class="user-phone">
                            {{userinfo.mobile}}
                        </div>
                    </div>
                    <div class="mt10">
                        <div class="user-type">
                            {{userinfo.userrolename}}
                        </div>
                        <div class="user-promote">
                            {{userinfo.mobile}}(邀请码)
                        </div>
                        <div class="user-penssion">
                            
                        </div>
                    </div>
                </div>
                <div class="user-personal-info" v-show="!isLogin">
                    <div >
                        <div class="user-name f-r" @click="recommend()">
                            点击登录
                        </div>
                    </div>
                    
                </div>
                <div class="user-achievement-wrap hidden">
                    <div class="month">
                        月收入
                    </div>
                    <div class="individe-line">
                        
                    </div>
                    <div class="year">
                        年收入
                    </div>
                </div>
                <div class="user-achievement-wrap hidden">
                    <div class="total-achievement">
                        总收入
                    </div>
                </div>
                <div class="unlogin-info">
                    <div class="single-short-line" v-show="!isLogin"></div>
                    <div class="total-income">
                        <img src="@/images/icon/IOS/content_icon_total_profit_2@3x.png" />
                        <span>总收入(元)</span>
                        <div class="watch" @click="seemoney=!seemoney" v-show="isLogin">
                            <img src="@/images/icon/IOS/content_icon_open@3x.png" v-show="seemoney&&isLogin"/>
                             <img src="@/images/icon/IOS/content_icon_close@3x.png" v-show="!seemoney&&isLogin"/>
                        </div> 
                    </div>
                    <div  v-show="!seemoney" >
                        ******
                    </div>
                    <div v-show="seemoney">
                        {{userinfo.total_income||0}}
                    </div>
                </div>
            </div>
        </div>
        <div class="functions-wrap"  >
            <div class="function"  @click="goToLoanCenter()">
                <div class="function-name">
                    <img src="@/images/icon/IOS/content_icon_loaning_center@3x.png" />
                    <span>贷款中心</span>
                </div>
                <div class="right-logo">
                    <img src="@/images/icon/IOS/content_icon_more_6@3x.png" />
                </div> 
            </div>
            <div class="function" @click="goToOpenCenter()">
                <div class="function-name">
                    <img src="@/images/icon/IOS/content_icon_workning_center@3x.png" />
                    <span>展业中心</span>
                </div>
                <div class="right-logo">
                    <img src="@/images/icon/IOS/content_icon_more_6@3x.png" />
                </div>
            </div>
            <div class="function" @click="goToUserCenter()">
                <div class="function-name">
                    <img src="@/images/icon/IOS/content_icon_my_center@3x.png" />
                    <span>个人中心</span>
                </div>
                <div class="right-logo">
                    <img src="@/images/icon/IOS/content_icon_more_6@3x.png" />
                </div>
            </div>
        </div>

        <div class="qr-wrap">
            <div class="qr-area">
                
                <div class="qr" id="qrcode">
                </div>
                <div class="small-text">
                    推荐经纪人二维码
                </div>
                <div class="middle-text">
                    长按二维码可以保存
                </div>
            </div>
            <div>
                <div class="recommend" @click="registerShare()">
                    推荐经纪人
                </div>  
            </div>
        </div>
        
    </div>
</template>
<style scoped>

    .user-header-layer{
        margin-top:-1px;
    }
    .function-name{
        padding : 10px 5px;
    }
    .small-text{
        font-size:10px;
    }
    .mt10{
        margin-top:10px;
    }
    .unlogin-info{
        position : relative;
        text-align:center;
        top:-30px;
        left:0;
        width:100%;
        color:#fff;
        font-size:14px;
    }
    .unlogin-info .single-short-line{
        position : relative;
        display:inline-block;
        width:30px;
        background:#fff;
        height:1px;
        top : -20px;

    }
    .unlogin-info .total-income{
        position:relative;
        margin-top:10px;
        margin-bottom:5px;
    }
    .total-income > img{
        position:relative;
        width:20px;
        height:20px;
        vertical-align:top;
    }
    .total-income  .watch{
        position:relative;
        display:inline-block;
        vertical-align:top;
        width:20px;
        height:20px;
    }
    .total-income  .watch img{
        position:relative;
        width:20px;
        height:20px;
        left:50px;
    }
    .qr-wrap{ 
        position:relative;
        margin-top:10px;
        text-align:center;
        padding : 10px;
    }
    .qr-wrap .qr-area{
        position:relative;
        display:inline-block;
        color:#a1a1a1;
    }
    .qr-wrap .qr-area .small-text{
        font-size:10px;
        padding:3px;
    }
    .qr-wrap .qr-area .middle-text{
        font-size:12px;
        padding:3px;
    }
    .qr-wrap .qr-area .qr{
        position:relative;
        display:inline-block;
        margin-top:5px;
        margin-bottom:5px;
    }
    .qr-wrap .qr-area .qr img{
        position:relative;
        display:inline-block;
        width:100%;
        height:100%;
    }
    .qr-wrap  .recommend{
        position:relative;
        display:inline-block;
        width:120px;
        margin-top:15px;
        padding : 6px 10px;
        margin-bottom:30px;
        border:1px solid rgb( 57 ,182 ,254);
        color:rgb( 57 ,182 ,254);
        border-radius:50px;
    }
    .mask{
        width: 100%;
        height: 100vh;
        position: fixed;
        z-index: 1000;
        background: black;
        opacity: 0.5;
        top: 0;
    }
    .mask div{
        color: #fff;
        margin-top: 80px;
        text-align: center;
    }
    .mask img{
        width: 100px;
        float: right;
        margin-right: 9%;
    }
    /********************媒体查询begin**********************/
    @media (max-width: 360px) {
        .functions-wrap .function{
            padding:5px 2px; 
        }
        .functions-wrap .function .function-name{
            line-height:15px;
            font-size:16px;
        }
        .functions-wrap .function .right-logo{
            line-height:45px;
        }
        .user-header-layer{
            max-height:120px;
        }
        .user-header-layer .user-info{
            margin-top:10px;
        }
        .user-header-layer .user-info .user-personal-info .user-name{
            font-size:16px;
        }
        .user-header-layer .user-info .user-personal-info .user-type{
            font-size:14px;
        }
        .user-header-layer .user-info .user-personal-info .user-promote{
            margin-left:10px;
            font-size:12px;
        }
        
        .qr-wrap{
            padding-top:0px;
        }
        .qr-wrap .recommend{
            margin-top:10px;
            padding : 4px 8px;
        }
        .unlogin-info{
            top:-40px;
        }
    }
    /********************媒体查询begin**********************/
</style>
<script>
//引入请求方法
import * as request from "./../../utils/request";
import { Toast } from 'mint-ui';
import QRCode from 'qrcodejs2';
import * as config from "./../../config/app.config";
import { mapGetters } from 'vuex';
import wx from 'weixin-js-sdk';
import wxConfig from '@/utils/wechatMixins';
import $ from 'jquery';

export default {
    name: 'mainpage',
    data () {
        return {
            isLogin:false,//是否登录
            seemoney : false,
            userinfo : {
                username : "",//用户名
                id : "",
                mobile : "",
                register_date : "",//注册日期
                province : "",
                city:"",
                rolename:"",
                roletype:"",
                token : "",
                photo : "",

            },//用户信息
            showmask:false,//是否显示面罩

        }
    },//使用对象展开运算符将 getter 混入 computed 对象中
    computed: {
      ...mapGetters({
        wxUserInfo:'wxUserInfo'
      })
    },
    methods:{
        //贷款中心
        goToLoanCenter(){
            if(this.isLogin){
                this.$router.push({path: '/loan/product-list?inner=inner'});
                return;
            }
            //this.$router.push({path: '/login'});
            this.$router.push({path: '/loan/product-list?inner=inner'});
        },
        //展业中心
        goToOpenCenter(){
            if(this.isLogin){
                this.$router.push({path: '/exhibition-index'});
                return;
            }
            this.$router.push({path: '/login'});
            
        },
        //查看个人中心
        goToUserCenter(){
            if(this.isLogin){
                this.$router.push({path: '/usercenter'});
                return;
            }
            this.$router.push({path: '/login'});
        },
        //查看个人详情
        goToUserDetail(){
            if(this.isLogin){
                this.$router.push({path: '/userinfo'});
                return;
            }
            this.$router.push({path: '/login'});
        },

        //推荐经纪人
        recommend(){
            var self = this;
            var isLogin = this.isLogin;
            //先判断状态,查看用户是否登录,没有登录情况下跳转到登录页登录
            if(isLogin){
                this.$router.push({path: '/register',query:{invite:self.userinfo.mobile,invitename:self.userinfo.user_name}});
            }else{
                this.$router.push({path: '/login'});
            }
        },
        //生成二维码
        qrcode (str) {
            var qrlen = 100;
            try{
                var screen = $(window).width();
                qrlen = screen/4;
            }catch(e){

            }
            let qrcode = new QRCode('qrcode', {
                width: qrlen,
                height: qrlen, // 高度
                text: str // 二维码内容
            })
        },
        
        //获取个人中心信息
        getUserInfo(){
            var self = this;
            var option = {
                data : {

                }
            }
            
            var res = request.post(config.default.ajax,"app","cd_individual_center_info_qry",option.data);
            
            res.then(function(res){
                localStorage.setItem('xd_user_name', res.user_name)
                var data = res;
                self.userinfo = res;
                self.isLogin = true;
                
                //self.usertype = (data["type"]=="普通经纪人")?2:1;
                var userRoleName = res.dh == 1?"渠道经理":res.dh == 2?"普通经纪人":"合伙经纪人";
                
                //self.userrolename = userRoleName; 
                self.userinfo.userrolename = userRoleName;
                
                self.usertype =  res.dh == 1?1:res.dh == 2?2:3;
                document.getElementById("qrcode").innerHTML = "";
                //邀请链接为注册
                var mainUrl =  location.protocol + "//" + window.location.host + "/loan/product-list?invite=" + self.userinfo.mobile + "&invitename="+self.userinfo.user_name;
                
                self.qrcode(mainUrl);
                
                self.userinfo.photo = self.userinfo.photo || "/content_icon_head_img_nor@3x.png";
                
                self.registerShare(true);//注册分享信息
            },function(err,msg){
                self.isLogin = false;
                Toast(err||"获取信息失败:"+err+"-"+msg);
                document.getElementById("qrcode").innerHTML = "";
                //邀请链接为注册
                var mainUrl = location.protocol + "//" + window.location.host + "/loan/product-list";
                self.qrcode(mainUrl);
                self.registerShare(true);//注册分享信息
                if(localStorage){
                    localStorage.removeItem("userinfo")
                }
            });
        },
        //注册分享
        registerShare(nomask){
            var self = this;
            var that = this;
            var myUrl = '';
            if (/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)) {
                myUrl = window.sessionStorage.getItem('url').split('#')[0];
            } else {
                myUrl = window.location.href.split('#')[0];
            }
            
            this.$store.dispatch('wxShare', {url: myUrl})
                .then(res => {
                if(!nomask){
                    self.showmask = true;
                }
                var shareObj = {
                    title: "邀请您加入金证金服，成为金证通贷款经纪人",
                    ptSummary: '“金证通”是金证金服旗下专业的贷款经纪人展业平台，为贷款经纪人提供发展客户、发展经纪人团队、进件通道、佣金结算、代收代付等全方位一站式服务。',
                    link: 'https://' + window.location.host + '/loan/product-list?invite=' + self.userinfo.mobile + '&invitename=' + encodeURIComponent(self.userinfo.user_name),
                    /*link: 'https://' + window.location.host + '/loan/add-loan-guest',*/
                    mainImg: 'https://jzjf.kingdomfax.com/kingdom.png'
                }
                // wxConfig.wxShare(shareObj)
                wxConfig.methods.wxShare(shareObj, res, function () {
                    self.showmask = false;
                })
                }).fail(msg => {
                    Toast({
                        message: '获取分享信息失败',
                        duration: 2000
                    });
                })
        }
    },
    //页面加载之后调用的hook函数
    mounted(){
        //邀请链接为注册
        var mainUrl = location.protocol + "//" +window.location.host + "/loan/product-list";
        this.qrcode(mainUrl);
        //先判断是否有登录
        var userinfo = {};
        try{
            userinfo = JSON.parse(localStorage.userinfo||"{}")||{};
        }catch(e){
            
        }
        if(userinfo.token){
            this.getUserInfo();
        }else{
            this.registerShare(true);//注册分享页
        }
        localStorage.setItem('typeIndex' , 0)

        
        
    },
    beforeMount(){
        
        if(!sessionStorage.getItem('url')){
            if (/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)) {
              sessionStorage.setItem('url',window.location.href);
            }
        }
        

        //先判断用户localStorage中是否存储有登录信息
        if(localStorage){
            var userinfo = JSON.parse(localStorage.getItem("userinfo")||"{}")||{};
            if(userinfo.token){
                this.isLogin = true;
            }else{
                this.isLogin = false;
            }
        }
    }



}
</script>