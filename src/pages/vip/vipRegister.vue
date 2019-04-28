<template>
    <section>
        <form bindsubmit = "submitForm">
            <!-- 姓名 -->
            <view class="item">
                <view class="flex" ><repeat for="{{fontArray[0]}}" key='key'><text>{{item}}</text></repeat></view>
                <view class="inpBox">
                    <input name="username"/>
                    <text>*</text>
                </view>
            </view>
            <!-- 联系方式 -->
            <view class="item">
                <view class="flex" ><text wx:for = "{{fontArray[1]}}" wx:key = "index">{{item}}</text></view>
                <view class="inpBox">
                    <input name="tell"/>
                    <text>*</text>
                </view>
            </view>
            <!-- 推荐码 -->
            <view class="item">
                <view class="flex" ><text wx:for = "{{fontArray[2]}}" wx:key = "index">{{item}}</text></view>
                <view class="inpBox">
                    <input name="recommendCode" placeholder="上级成员的手机号即为推荐码" placeholder-style = 'color:#aeaeae;font-size: 28rpx;'/>
                    <text>*</text>
                </view>
            </view>
            <!-- 申请级别 -->
            <view class="item">
                <view class="flex" ><text wx:for = "{{fontArray[3]}}" wx:key = "index">{{item}}</text></view>
                <view class="inpBox">
                    <view class="option" @tap = "bindShowMsg">{{levelArray[levelIndex]}}</view>
                    <view wx:if = "{{select}}" class="selection">
                        <view wx:for = "{{levelArray}}" wx:key="index" @tap="mySelect({{index}})">{{item}}</view>
                    </view>

                    <image class="up" src = "../../images/icon_xia@2x.png" wx:if = "{{select}}"/>
                    <image class="down" src = "../../images/icon_xia@2x.png" wx:if = "{{!select}}"/>
                    <text>*</text>
                </view>
            </view>
            <!-- 收款金额 -->
            <view class="item">
                <view class="flex" ><text wx:for = "{{fontArray[4]}}" wx:key = "index">{{item}}</text></view>
                <view class="inpBox">
                    <input name = "price"/>
                    <text>*</text>
                </view>
            </view>
            <!-- 是否同意协议 -->    
            <view class="agreement">
                <image src = "{{isAgreement?agreementImg[1]:agreementImg[0]}}" @tap="agreement"  />
                <text @tap="vipToast">我已阅读并同意遵守<text class="agreementToast">《健德商城VIP会员协议》</text></text>
            </view>
            <view class = "tip">温馨提示：若无上级成员，推荐码请填写18812345678</view>
            <button formType = "submit">确定</button>
        </form>
    </section>
</template>
<script>
    import wepy from "wepy";
import { shttp } from "../../utils/http";
    export default class vipRegister extends wepy.page {
        config = {
            navigationBarTitleText: "注册会员"
        };
        data = {
            levelArray:["级别一","级别二","级别三","级别四"],
            fontArray:["姓名","联系方式","推荐码","申请级别","收款金额"],
            select:false,/* 默认下拉选矿不显示 */
            levelIndex: 0,
            isAgreement:false,/* 是否同意协议 */
            agreementImg:["../../images/icon_weixuanzhong@2x.png","../../images/icon_xuanzhong@2x.png"],/* 是否同意协议勾选 */
            param: null,
            canSubmit: true,
        };
        methods = {
            bindShowMsg(){
                this.select = !this.select;
            },
            mySelect(index){
                this.levelIndex = index;
                this.select = false;
            },
            /* 是否勾选同意协议 */
            agreement(){
                this.isAgreement = !this.isAgreement;
            },
            submitForm(e){
                let formdata = e.detail.value

                formdata.username = formdata.username.replace(/\s+/g,'');

                // formdata.tell = '13211122233';
                // formdata.recommendCode = '18812345678';

                let reg1 = /^1[3456789]\d{9}$/ ;
                let tips = '';
                if(formdata.username === undefined || formdata.username === ""){
                    tips = "姓名不能为空";
                }else if(!reg1.test(formdata.tell)){
                    tips = "请正确输入联系方式";
                }else if(!reg1.test(formdata.recommendCode)){
                    tips = "请正确输入推荐码";
                }else if(!(formdata.price > 0)){
                    tips = "收款金额必须为大于零的数字";
                }else if(this.isAgreement === false){
                    tips = "请同意遵守《健德商城VIP会员协议》";
                }

                if(tips != ''){
                    return wx.showModal({ content: tips, showCancel:false, confirmColor:'#4fb84a', })
                }

                if(!this.canSubmit) return ;
                this.canSubmit = false;

                this.param = {
                  member_nick: formdata.username,
                  member_mobile: formdata.tell,
                  inviter_mobile: formdata.recommendCode,
                  vip_level: this.levelIndex + 1,
                  money: formdata.price,
                };

                this.save();
            },
            /* 显示vip会员协议详情 */
            vipToast(){
                wx.showModal({
                    title:"健德VIP会员协议",
                    content: `
                          健德VIP会员协议健德VIP会员协议 健德VIP会员协议健德VIP会员协议健德VIP会员协议健德VIP会员协议 健德VIP会员协议健德VIP会员协议健德VIP会员协议 健德VIP会员协议健德VIP会员协议 `,
                    showCancel:false,
                    confirmColor:'#4fb84a',
                })
            }
        }
        /* 切分form中的label标签对其 */
        splitFont() {
            let arr = []
            this.fontArray.forEach((item,index)=>{
                arr.push(item.split(""));
            })
            this.fontArray = arr;
        };
        onLoad(){
            this.splitFont();
        };

        async save(){
            let tipStr = '',
                res = await shttp.post(`/api/v2/member/apply`).send(this.param).end();

            tipStr = res.error || '申请成功!';
            wx.showModal({ content: tipStr, showCancel: false });

            if(res.error){
                this.canSubmit = true;
                this.$apply();
            }else{
                setTimeout(() => { 
                    wx.navigateBack({ delta: 2 }); 
                }, 1000);
            }

        }
    }
</script>
<style scoped>
    form{
        display: block;
        width: 100%;
        box-sizing: border-box;
        padding: 10rpx 30rpx;
        position: relative;
        height: 100vh;
        background-color: #fff;
    }
    .item{
        width: 100%;
        position: relative;
        margin-bottom:40rpx;
        font-size:28rpx;
        margin-top: 50rpx;
    }
    .flex{
        float: left;
        display: flex;
        justify-content: space-between;
        width: 110rpx;
        flex-wrap:nowrap;
        color:#666;
        margin-right:18rpx;
        margin-top:18rpx;
    }
    .item input,.option{
        width: 520rpx;
        height: 76rpx;  
        padding-left: 10rpx;      
    }
    .option{
        line-height: 76rpx;
    }
    .inpBox{
        height: 76rpx;
        margin-left:  128rpx;
        border: 2rpx solid #c9c8d0;
        border-radius: 10rpx;
        position: relative;
    }
    .inpBox > text{
        color:#ff0000;
        position:absolute;
        top:4rpx;
        right:5rpx;
        width:40rpx;
        height:73rpx;
        line-height:86rpx;
        z-index:333;
        font-size:40rpx;
    }
    .inpBox image{
        width: 20rpx;
        height: 11rpx;
        position: absolute;
        right:60rpx;
        top:31rpx;
    }
    .inpBox .up{
        transform:scaleY(-1);
    }
    .selection{
        position:absolute;
        top:80rpx;
        left:-4rpx;
        z-index:666;
        border:1rpx solid rgb(211, 211, 211);
        color:#666;
        background-color:#fff;
        width:102%;
        box-sizing:border-box;
        padding:0 10rpx;
        border-radius:10rpx;
        border-top:transparent;
    }
    .selection view{
        line-height:76rpx;
    }
    .agreement{
        widows: 543rpx;
        margin-left: 128rpx;
        font-size: 24rpx;
    }
    .agreement image{
        width: 40rpx;
        height: 40rpx;
    }
    .agreement > text{
        color: #666;
        vertical-align:12rpx;
        margin-left:17rpx;
    }
    .agreement  .agreementToast{
        color: #4fb84a;
    }
    .tip{
        color: #999;
        font-size: 24rpx;
        margin-top: 75rpx;
    }
    button{
        background-color: #4fb84a;
        border-radius: 10rpx;
        height: 88rpx;
        width: 690rpx;
        outline: none;
        border: none;
        color: white;
        line-height: 88rpx;
        position: absolute;
        bottom: 98rpx;
    }
</style>


