<template>
    <section>
        <view>
            <view>{{price}}</view>
            <text>当前余额(元)</text>
        </view>
        <form bindsubmit = "submitForm">
            <view wx:for = "{{formList}}" wx:key class="info" data-index = "{{index}}">
                <label>{{item.name}}:</label>
                <input name="{{item.label}}"/>
            </view>
            <button class='submit_btn' formType="{{checked ? '' : 'submit'}}">提交</button>
        </form>
    </section>
</template>
<script>
import wepy from "wepy";
import { shttp } from "../../../utils/http";
export default class CashForm extends wepy.page {
    config = {
        navigationBarTitleText: "提现详情"
    };
    data = {
        price: '',
        formList : [
            {
                label:"cashNumber",
                name:"提现账号"
            },
            {
                label:"userBank",
                name:"开户支行"
            },
            {
                label:"userName",
                name:"账户姓名"
            },
            {
                label:"howMuch",
                name:"提现金额"
            }
        ],
        checked: false,
    };
    methods = {
        submitForm(e){
            let formdata = e.detail.value,
                // regBank = /^\d{16}|\d{19}$/, /* 银行卡验证 */
                tips = '',
                param;

            // formdata.userBank = '0123456789012345'
            if(this.checked) return ;
            this.checked = true;

            if(!(formdata.howMuch > 0)){ tips = "请输入正确的提现金额"; }

            if(!formdata.cashNumber){
                tips = "提现账号不能为空";
            }else if(!formdata.userBank){
                tips = "请输入开户支行信息";
            }else if(!formdata.userName){
                tips = "账户姓名不能为空";
            }

            if(tips){
                this.checked = false;
                return wx.showModal({ content: tips, showCancel:false, confirmColor:'#4fb84a', })
            }
            console.error('submit');

            param = {
                pdc_amount: formdata.howMuch,
                pdc_bank_name: formdata.userBank,
                pdc_bank_no: formdata.cashNumber,
                pdc_bank_user: formdata.userName,
            }

            this.save(param);
        }
    }

    onLoad(opt){
        this.price = opt.price;
    }
    
    async save(param){
        wx.showLoading({ title: 'Loading...' });

        let res = await shttp.post(`/api/v2/member/memberwithdraw`).send(param).end();
        console.error(res);

        wx.hideLoading();

        if(res && res.status === 0){ 
            let opt = { 
                content: '提现成功!', 
                showCancel: false, 
                success(e){ wx.navigateBack({ delta: 1 }); }, 
            };
            wx.showModal(opt);
        }

        if(res.error) wx.showModal({ content: res.error.replace('pdc_amount', '提现金额'), showCancel: false, });

        this.checked = false;
        this.$apply();
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

.submit_btn{
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