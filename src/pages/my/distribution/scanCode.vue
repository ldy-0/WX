<template>
    <section>
        <image src="../../../images/distribution/bg.png" class="bgImg"/>
        <view class="codeBox">
            <view class="relativeBox">
                <image src="../../../images/distribution/card_bg.png" class="codeBg"/>
                <view class="useInfo">
                    <open-data type = "userAvatarUrl" class="userAva icon" mode = "aspectFit"></open-data>
                    <open-data type = "userNickName" class="userNickName"></open-data>
                </view>
                <view class="code">
                    <image src = "../../../images/distribution/qrcode_bg.png"/>
                    <image class='qrcode' src='{{qrcode}}' @load='done' @error='loadErr' />
                </view>
            </view>
        </view>
    </section>
</template>
<script>
import wepy from "wepy";
import { shttp } from '../../../utils/http';

export default class ScanCode extends wepy.page {
    config = {
        navigationBarTitleText: "二维码"
    };
    data = {
        qrcode: null,
    };

    computed = {
        isMain(){ return this.$parent.globalData.type == 1 },
    }

    methods = {
      loadErr(e){
        console.error('qrcode load fail: \n', e);
      },
      done(e){
        wx.hideLoading();
      }    
    }

    onLoad(opt){
        this.memberInfo = wx.getStorageSync('memberInfo');

        this.getQrcode();
    }

    async getQrcode(){
        wx.showLoading({ title: 'Loading...' });

        let param = {
            page: "pages/authorization",
            scene: `sharer;${this.memberInfo.member_id}`,
            width: 450,
            is_hyaline: true, // false,
            source: 1
        };

        let res = await shttp.post(`/api/v2/member/wxcode`).send(param).end();
        
        if(res && res.data){
            this.qrcode = `https://cdn.health.healthplatform.xyz/${res.data.url.key}`;
        }
        // console.error(this.qrcode);

        this.$apply();

        if(typeof res === 'string' || res.error){
          wx.hideLoading();
          wx.showModal({ content: res, showCancel: false });
        }
    }
}
</script>
<style scoped>
    section{
        display: block;
        position: relative;
    }
    .bgImg{
        width: 100%;
        height: 862rpx;
    }
    .codeBox{
        width: 690rpx;
        height: 820rpx;
        position: absolute;
        top: 100rpx;
        z-index: 333;
        left: 30rpx;
    }
    .relativeBox{
        position: relative;
        width: 100%;
        height: 100%;
        margin: 0 auto;
    }
    .codeBg{
        width:754rpx;
        height:894rpx;
        position:absolute;
        top:-24rpx;
        left:-33rpx;
    }
    .useInfo{
        position: absolute;
        top: -29rpx;
        left: 278rpx;
        overflow: hidden;
        text-align: center;
    }
    .useInfo .userAva{
        display: block;
        width: 128rpx;
        height: 128rpx;
        border-radius: 50%;
        overflow: hidden;
        border: 2rpx solid #76cd74;
    }
    .useInfo .userNickName{
        font-size: 28rpx;
        color: #222;
        margin-top: 24rpx;
    }
    .code{
        width: 494rpx;
        height: 494rpx;
        position: absolute;
        top: 210rpx;
        left: 116rpx;
    }
    .code image:first-child{
        width: 100%;
        height: 100%;
    }
    .code image:nth-child(2){
        position: absolute;
        top: 0rpx;
        left: 0rpx;
        width: 100%;
        height: 100%;
    }

.qrcode{
    position: absolute;
    top: 22rpx;
    left: 22rpx;
    width: 450rpx;
    height: 450rpx;
}
</style>

