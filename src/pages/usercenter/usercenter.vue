<template>
    <div class="bg-gray">
        <div class="user-header-layer">
            <img src="@/images/icon/IOS/content_pic_1@3x.png"  class="head-bg" />
            <div class="withdraw" @click="goToUserInfo()" v-show="usertype!=0">
                个人信息>>
            </div>
            <div class="user-info">
                <div class="user-head-img-wrap">
                    <img src='@/images/icon/IOS/content_icon_head_img_nor@3x.png' />
                </div>
                <div class="user-personal-info">
                    <div >
                        <div class="user-name">
                            {{userinfo.user_name}}
                        </div>
                        <div class="user-phone">
                            {{userinfo.account}}
                        </div>
                    </div>
                    <div class="mt20">
                        <div class="user-type">
                            {{userinfo.userrolename}}
                        </div>
                        <div class="user-promote" v-show="usertype!=0">
                            {{userinfo.account}}(邀请码)
                        </div>
                        <div class="user-penssion">
                            
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
            </div>
        </div>
        <div class="functions-wrap"  v-show="usertype==1">
            <div class="function"  @click="goToAchievement()">
                <div class="function-name">
                    <img src="@/images/icon/IOS/content_icon_my_yj@3x.png" />
                    <span>我的业绩</span>
                </div>
                <div class="right-logo">
                    <img src="@/images/icon/IOS/content_icon_more_6@3x.png" />
                </div>
            </div>
            <div class="function" @click="goToRecord()">
                <div class="function-name">
                    <img src="@/images/icon/IOS/content_icon_history_record@3x.png" />
                    <span>历史收入</span>
                </div>
                <div class="right-logo">
                    <img src="@/images/icon/IOS/content_icon_more_6@3x.png" />
                </div>
            </div>
            <div class="function" @click="goToSetting()">
                <div class="function-name">
                    <img src="@/images/icon/IOS/content_icon_setting@3x.png" />
                    <span>设置</span>
                </div>
                <div class="right-logo">
                    <img src="@/images/icon/IOS/content_icon_more_6@3x.png" />
                </div>
            </div>
        </div>
        <div class="functions-wrap"  v-show="usertype==2||usertype==3">
            <div class="function"  @click="goToMyIncome()">
                <div class="function-name">
                    <img src="@/images/icon/IOS/content_icon_my_profit_2@3x.png" />
                    <span>我的收入</span>
                </div>
                <div class="right-logo">
                    <img src="@/images/icon/IOS/content_icon_more_6@3x.png" />
                </div>
            </div>
            <div class="function" @click="goToMyInCoagent()">
                <div class="function-name">
                    <img src="@/images/icon/IOS/content_icon_partner@3x.png" />
                    <span>合伙经纪人</span>
                </div>
                <div class="right-logo">
                    <img src="@/images/icon/IOS/content_icon_more_6@3x.png" />
                </div>
            </div>
            <div class="function" @click="goToMyBank()">
                <div class="function-name">
                    <img src="@/images/icon/IOS/content_icon_bank_card@3x.png" />
                    <span>银行账号</span>
                </div>
                <div class="right-logo">
                    <img src="@/images/icon/IOS/content_icon_more_6@3x.png" />
                </div>
            </div>
            <div class="function" @click="goToSetting()">
                <div class="function-name">
                    <img src="@/images/icon/IOS/content_icon_setting@3x.png" />
                    <span>设置</span>
                </div>
                <div class="right-logo" >
                    <img src="@/images/icon/IOS/content_icon_more_6@3x.png" />
                </div>
            </div>
        </div>
        <div class="functions-wrap"  v-show="usertype==0">
            <div class="function" @click="goToSetting()">
                <div class="function-name">
                    <img src="@/images/icon/IOS/content_icon_setting@3x.png" />
                    <span>设置</span>
                </div>
                <div class="right-logo" >
                    <img src="@/images/icon/IOS/content_icon_more_6@3x.png" />
                </div>
            </div>
        </div>
        <div class="functions-wrap">
            <div class="function" @click="goCard()">
                <div class="function-name">
                    <img src="@/images/icon/IOS/content_icon_setting@3x.png" />
                    <span>信用卡资金周转</span>
                </div>
                <div class="right-logo">
                    <img src="@/images/icon/IOS/content_icon_more_6@3x.png" />
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

    
    /********************媒体查询begin**********************/
    @media (max-width: 360px) {
        .user-header-layer{
            max-height:120px;
        }
        .user-header-layer .user-info .user-personal-info .user-type{
            font-size:14px;
        }
        .user-header-layer .user-info .user-personal-info .user-promote{
            margin-left:10px;
            font-size:12px;
        }
        .functions-wrap .function .function-name{
            line-height:15px;
            font-size:16px;
        }
        .functions-wrap .function .right-logo{
            line-height:45px;
        }
    }
    /********************媒体查询end**********************/
</style>
<script>
//引入请求方法
import * as request from "./../../utils/request";
import { Toast } from 'mint-ui';
import * as config from "./../../config/app.config";

export default {
    name: 'usercenter',
    data () {
        return {
            usertype:0,//1为渠道经理，2为经纪人，3为合伙经纪人
            userinfo : {
                acc_name : "",
                account : "",
                type : "",
                photo : "",
                userrolename : ""
            }
        }
    },
    methods:{
        //去到信用卡资金周转
        goCard(){
            this.$router.push({path: '/card/card-home'})
        },
        //查看我的业绩
        goToAchievement(){
            this.$router.push({path: '/myachievement'});
        },
        //查看我的历史记录
        goToRecord(){
            this.$router.push({path: '/achieverecord'});
        },

        //查看我的设置
        goToSetting(){
            
            var usertype = this.usertype;

            if(usertype==1){
                this.$router.push({path: '/setting',query:{usertype:"channel"}});
                return;
            }
            if(usertype==2){
                this.$router.push({path: '/setting',query:{usertype:"agent"}});
                return;
            }
            if(usertype==3){
                this.$router.push({path: '/setting',query:{usertype:"agent"}});
                return;
            }
            this.$router.push({path: '/setting',query:{usertype:"agent"}});
        },
        //进入用户信息
        goToUserInfo(){
            this.$router.push({path: '/userinfo'});
        },

        //查看我的收入
        goToMyIncome(){
            this.$router.push({path: '/myincome'});
        },
        //查看我的合伙经纪人
        goToMyInCoagent(){
            this.$router.push({path: '/coagent'});
        },
        //查看我的银行
        goToMyBank(){
            this.$router.push({path: '/editbankinfo'});
        },
        //获取个人信息
        getUserInfo(){

            var self = this;
            var option = {
                data : {

                }
            }
            
            var res = request.post(config.default.ajax,"app","cd_individual_center_info_qry",option.data);
            
            res.then(function(res){
                var data = res;
                self.userinfo = res;

                //self.usertype = (data["type"]=="普通经纪人")?2:1;
                var userRoleName = res.dh == 1?"渠道经理":res.dh == 2?"普通经纪人":"合伙经纪人";
                
                //self.userrolename = userRoleName;
                self.userinfo.userrolename = userRoleName;

                self.usertype =  res.dh == 1?1:res.dh == 2?2:3;

                self.userinfo.photo = self.userinfo.photo || "/content_icon_head_img_nor@3x.png";

            },function(err,msg){
                Toast(err||"获取信息失败:"+err+"-"+msg);
                self.usertype = 0;
                if(localStorage){
                    localStorage.removeItem("userinfo")
                }
            });
        }
        
    },
    //页面加载之后调用的hook函数
    mounted(){
        //先判断是否有登录
        var userinfo = {};
        try{
            userinfo = JSON.parse(localStorage.userinfo||"{}")||{};
        }catch(e){
        }
        if(userinfo.token){
            this.getUserInfo();
        }
        
    }
}
</script>