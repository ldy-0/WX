<template>
    <section>
        <view>
            <view>50.00</view>
            <text>当前德分</text>
        </view>
        <form bindsubmit = "submitForm">
            <view wx:for = "{{formList}}" wx:key class="info" data-index = "{{index}}">
                <label>{{item.name}}:</label>
                <input name="{{item.label}}" placeholder="{{item.placeholder}}"/>
            </view>
            <button formType = "submit">确定</button>
        </form>
    </section>
</template>
<script>
import wepy from "wepy";
export default class TransferAccounts extends wepy.page {
    config = {
        navigationBarTitleText: "转出"
    };
    data = {
       formList : [
           {
               label:"transfer_accounts",
               name:"转出金额",
               placeholder:""
               
           },
           {
               label:"transfer_obj",
               name:"对方账户",
               placeholder:"请输入对方手机号"
           },
       ],
    };
    methods = {
        submitForm(e){
            let formdata = e.detail.value;
            let howMuch = /^[0-9]*$/;/* 金额验证 */
            let tell = /^1[3456789]\d{9}$/;/* 手机号验证 */
            let tips = '';
            if(!howMuch.test(formdata.transfer_accounts) || formdata.transfer_accounts === ""){
                tips = "请输入正确的转出金额";
            }else if(!tell.test(formdata.transfer_obj) || formdata.transfer_obj === ""){
                tips = "请输入正确的对方账户";
            }else{
                //do something
                console.log(formdata);
                wx.navigateTo({
                    url:"./pointCenter"
                })
            }
            if(tips != ''){
                wx.showModal({
                    content: tips,
                    showCancel:false,
                    confirmColor:'#4fb84a',
                })
            }
        }
    }
}
</script>
<style scoped>
    section{
        display: block;
        width: 100%;
        height: 100vh;
        background-color: #fff;
    }
    section > view{
        width: 100%;
        height: 272rpx;
        text-align: center;
        box-sizing: border-box;
        padding-top: 51rpx;
        background-color: #fff;
        margin-bottom: 10rpx;
        border-bottom: 10rpx solid  rgb(248, 248, 248);
    }
    section > view > view{
        color: #4fb84a;
        letter-spacing: 2rpx;
        font-size: 60rpx;
        margin-bottom: 43rpx;
    }
    section > view > text{
        color: #999;
        letter-spacing: 1rpx;
        font-size: 30rpx;
    }
    .info{
        width: 100%;
        background-color: #fff;
        height: 88rpx;
        line-height: 88rpx;
        letter-spacing: 1rpx;
        font-size: 30rpx;
        color: #222;
        box-sizing: border-box;
        border-bottom: 1rpx solid rgb(248, 248, 248);
        padding: 0 30rpx;
    }
    .info:nth-child(4){
        border-bottom: 10rpx solid rgb(248, 248, 248);
        box-sizing: content-box;
    }
    .info label{
        float: left;
    }
    .info input{
        height: 100%;
        box-sizing: border-box;
        padding-left: 16rpx;
    }
    form button{
        border-radius: 10rpx;
        background-color: #4fb84a;
        height: 70rpx;
        line-height: 70rpx;
        color: #fdfbfa;
        font-size: 36rpx;
        letter-spacing: 1rpx;
        width: 690rpx;
        margin-top: 227rpx;
    }
</style>

