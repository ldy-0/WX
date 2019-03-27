<template>
    <section>
        <view class="selection">
            <view class="tab">
                <view class="{{index === current_tag ? 'active' : 'unactive'}}" wx:for = "{{choose}}" wx:key data-index = "{{index}}" @tap = "showMsg">
                    {{item}}
                </view>
            </view>
        </view>
        <view class="tabList">
            <view wx:for = "{{detailsList}}" wx:key class="msg">
                <view class="msg_left">
                    <view>{{item.classify}}(¥)</view>
                    <view>{{item.date}}</view>
                </view>
                <view class="msg_right">
                    -<text>{{item.howMuch}}</text>
                </view>
            </view>
        </view>
    </section>
</template>
<script>
import wepy from "wepy";
export default class CashDeatils extends wepy.page {
    config = {
        navigationBarTitleText: "提现明细"
    };
    data = {
       choose:["提现中","已完成"],
       current_tag:0,/* 默认选中第一个 */
       detailsList : [
           {
               classify:"佣金提现",
               date:"2019-4-20",
               howMuch:"200",
           },
           {
               classify:"佣金提现",
               date:"2019-4-20",
               howMuch:"200",
           },
       ]
    };
    methods = {
        showMsg(e){
            let index = e.currentTarget.dataset.index;
            this.current_tag = index;
            console.log(index)
        }
    }
}
</script>
<style scoped>
    section{
        display: block;
        width: 100%;
        height: 100vh;
        background-color: rgb(248, 248, 248);
    }
    .selection{
        width: 750rpx;
        height: 98rpx;
        background-color: #fff;
        padding: 18rpx 30rpx;
        box-sizing: border-box;
        margin-bottom: 2rpx;
    }
    .selection > .tab{
        border: 2rpx solid #4fb84a;
        height: 100%;
        display: flex;
    }
    .selection > .tab > view {
        width: 345rpx;
        text-align: center;
        font-size: 28rpx;
        line-height:60rpx;
    }
    .active{
        background-color: #4fb84a;
        color: #fff;
    }
    .unactive{
        color: #4fb84a;
    }
    .tabList{
        width: 100%;
        background-color: #fff;
    }
    .tabList .msg{
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 30rpx;
        border-bottom: 2rpx solid rgb(248, 248, 248);
    }
    .msg .msg_left{
        font-size: 30rpx;
        color: #333;
    }
    .msg .msg_left view:nth-child(1){
        color: #333;
        font-size: 30rpx;
    }
    .msg .msg_left view:nth-child(2){
        font-size: 24rpx;
        color: #494949;
        margin-top: 29rpx;
    }
    .msg .msg_right{
        color: #4fb84a;
        font-size: 28rpx;
        line-height:100rpx;
    }

</style>

