<template>
     <div class="login-bg">
        <div class="suc-header">
            <div class="suc-item logo">
                <img src="./../../images/rsuc.png"/>
            </div>
            <div class="suc-item suc-title">
                注册成功
            </div>
            <div class="suc-item suc-word">
                恭喜您，金证通经纪人注册成功！请填写<br>以下结佣银行信息，用来获取您的收益!
            </div>

        </div>
        <div class="login-frame mt30">
            <div class="login-item">
                <div class="item-left">
                    开户名
                </div>
                <div class="item-right">
                    <div class="input-wrap">
                        <input  v-model="bank" placeholder="请填写结佣银行账号信息"/>
                    </div>
                </div>
            </div>
            <div class="login-item">
                <div class="item-left">
                    开户行
                </div>
                <div class="item-right">
                    <div class="input-wrap">
                        <input   v-model="bankname" placeholder="请填写银行信息"/>
                    </div>
                </div>
            </div>
            <div class="login-item">
                <div class="item-left">
                    银行账号
                </div>
                <div class="item-right">
                    <div class="input-wrap">
                        <input   v-model="banknumber" placeholder="请填写开户的银行账号"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="rsuc-tip-box">
            <span>在[个人中心] - [银行账号]中,可以查看或修改结佣银行账号信息</span>
        </div>
        <div class="rsuc-tip-next">
            <span @click="goToNext()">跳过这一步></span>
        </div>
        <div class="btn-frame">
            <div class="btn-box">
                
                <div class="sub-btn" @click="setInfo()">完成</div>
            </div>
        </div>
    </div>
</template>
<style>
    /*****************媒体查询start******************/
    @media (max-width: 360px) {
       .suc-header .logo{
            display: inline-block;
            width: 50px;
            height: 50px;
            margin-top: 10px;
       }
       .suc-header  .suc-title{
            font-size:19px;
       }
       .suc-header .suc-word{
            font-size:15px;
       }
       .login-item{
            height:40px !important;
            line-height:30px !important;
        }
        .login-item .item-left{
            font-size:13px !important;
            padding-left:10px !important;
            width:35% !important;
        }
        .login-item .item-right{
            line-height:30px !important;
            font-size:13px !important;
            width:65% !important;
        }
        .login-item .item-right .input-wrap {
            margin-top:0px !important;
        }
        .login-item .item-right .input-wrap input{
            font-size:13px !important;
        }
        .rsuc-tip-box{
            font-size:11px !important;
        }
        .rsuc-tip-next{
            font-size:13px !important;
        }
        .btn-frame{
            margin-top:10px;
        }
        .btn-frame .sub-btn{
            font-size:18px !important;
            height:40px;
            line-height:40px;
        }
    }
    /*****************媒体查询end******************/
</style>
<script>
//引入请求方法
import * as request from "./../../utils/request";
import { Toast } from 'mint-ui';
import * as config from "./../../config/app.config";
export default {
    name: 'register',
    data () {
        return {
            bankname : "",//开户行
            bank : "",//开户名
            banknumber : "",//银行账号
            
        }
    },
    methods:{
        setInfo(){
            
            var self = this;
            if(this.bankname.trim().length<1){
                this.showTipFn("开户行不能为空");
                return;
            }
            
            if(this.bank.trim().length<1){
                this.showTipFn("开户名必填");
                return;
            }
            
            var myreg = /^[0-9]*$/;
            if(!myreg.test(this.banknumber)){
                
                this.showTipFn("银行账号不能为空,且只能为数字");
                return;
            }
            
            var option = {
                data : {
                    acc_name : self.bank,
                    bank_name : self.bankname,
                    bank_account : self.banknumber,
                } 
            }
            
            var res = request.post(config.default.ajax,"app","cd_bank_info_edit",option.data);
            
            res.then(function(res){
                Toast("设置成功");
                self.goToNext();
               
            },function(err){
                Toast(err||"设置失败");
            });
        },
        goToNext(){
            var self = this;
            if(this.type){
                self.$router.push({path: '/accountqr'});
            }else{
                self.$router.push({path: '/login'});
            }
        },
       
        //展示提示方法
        showTipFn(str){
            Toast(str);
        },
        hideTipFn(){
            this.tip = "";
            this.showTip = false;
        },
        
    },
    //页面加载之后调用的hook函数
    mounted(){
       //先判断注册是主动还是被邀请注册
        var query = this.$route.query||{};
        if(query.type){
            this.type=query.type;
        }
    }
}
</script>