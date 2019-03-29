<template>
     <div >
        <div class="qr-wrap">
            <div class="mention-tip">   请扫描和关注下方二维码，进入公众号登录金证通贷款经纪人平台
            </div>
            <div class="qr-box">
                <div class="title">
                    金证通公众号二维码
                </div>
                <div class="qrcode" id="qrcodegz">
                    <img src="@/images/icon/IOS/jinzhen.jpg" />
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .qr-wrap{
        position:relative;
        text-align:center;
        padding:30px;
    }
    .mention-tip{
        color:#a1a1a1;
        font-size:18px;
    }
    .qr-box{
        position:relative;
        margin-top:20px;
        border-radius:5px;
        background:#fff;
        padding:10px;
    }
    .qr-box .title{
        color:#a1a1a1;
        font-size:18px;
    }
    .qr-box .qrcode{
        position:relative;
        margin-top:20px;
        display:inline-block;
        width:300px;
        height:300px;
        text-align:center;
    }
    .qrcode img{
        position:relative;
        width:100%;
        height:100%;
    }
    @media (max-width: 360px) {
        .qr-box .qrcode{
            position:relative;
            margin-top:20px;
            display:inline-block;
            width:200px;
            height:200px;
            text-align:center;
        }
    }
</style>
<script>
//引入请求方法
import * as request from "./../../utils/request";
import QRCode from 'qrcodejs2';
import * as config from "./../../config/app.config";
export default {
    name: 'qrcode',
    data () {
        return {
            
        }
    },
    methods:{
        //生成二维码
        qrcode (str) {
            return;
            let qrcode = new QRCode('qrcodegz', {
                width: 280,
                height: 280, // 高度
                text: str // 二维码内容
            })
        },
    },
    
    //页面加载之后调用的hook函数
    mounted(){
        var reigsterUrl = location.protocol + "//" + window.location.host + "/main";
        this.qrcode(reigsterUrl);
        console.log(config.default.ajax);
        
    }
}
</script>