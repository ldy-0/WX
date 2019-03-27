<template>
    <section>
        <view class="info" wx:for = "{{earningsList}}" wx:key>
            <view class="infomation">
                <view>{{item.classify}} (¥)</view>
                <view>订单号：{{item.orderNumber}}</view>
                <view>{{item.orderDate}}</view>
            </view>
            <view>
                <text>¥</text>
                <text>{{item.earnings}}</text>
            </view>
        </view>
    </section>
</template>
<script>
import wepy from "wepy";
export default class EarningsDetails extends wepy.page {
    config = {
        navigationBarTitleText: "收益明细"
    };
    data = {
       earningsList:[
           {
               classify:"佣金返现",
               orderNumber:"1234567",
               orderDate:"2019-03-06",
               earnings:"200",
           },
           {
               classify:"账户充值",
               orderNumber:"7654321",
               orderDate:"2019-04-26",
               earnings:"500",
           },
       ]
    };
    methods = {
        
    }
}
</script>
<style scoped>
    section{
        display: block;
        width: 100%;
        min-height: 100vh;
        background-color: rgb(248, 248, 248);
    }
    .info{
        width: 750rpx;
        height: 180rpx;
        box-sizing: border-box;
        padding: 30rpx;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        margin-top: 2rpx;
    }
    .infomation view:nth-child(1){
        font-size: 30rpx;
        color: #333;
    }
    .infomation view:nth-child(2){
        font-size: 24rpx;
        color: #333;
        margin: 10rpx 0;
    }
    .infomation view:nth-child(3){
        font-size: 24rpx;
        color: #494949;
    }
    .info > view:nth-child(2){
        color: #4fb84a;
        font-size: 28rpx;
        line-height:136rpx;
    }

</style>

