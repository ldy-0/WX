<template>
    <section>
        <view wx:for = "{{showArray}}" class="list">
            <view class="msg">
                <view class="title">{{item.title}}（ ¥ ）</view>
                <view class="orderNo">订单号：{{item.orderNo}}</view>
                <view class="tim">{{item.data}}</view>
            </view>
            <view class="money">
                <view>¥{{item.money}}</view>
            </view>
        </view>
    </section>
</template>
<script>
import wepy from "wepy";
export default class Income extends wepy.page {
    config = {
        navigationBarTitleText: "收入明细"
    };
    data = {
        showArray:[
            {
                title:"收入明细", 
                orderNo:"123",
                data:"2019-4-1",
                money:"300",
            },
            {
                title:"收入明细", 
                orderNo:"123",
                data:"2019-4-1",
                money:"300",
            },
        ],
    };
    methods = {
        switchPage(e){
            let index = e.currentTarget.dataset.index;
            let url = '';
            url = index === 0 ? "./myGroup" : "./scanCode";
            if(url != ''){
                wx.navigateTo({
                    url,
                })
            }
        },
        toTransferAccounts(){
            wx.navigateTo({
                url: "./transferAccounts"
            })
        }
    }
}
</script>
<style scoped>
.list{
    background-color: #fff;
    width: 100%;
    height: 180rpx;
    display: flex;
    justify-content: space-between;
    margin-top: 2rpx;
    box-sizing: border-box;
    padding: 28rpx;
}
.title{
    font-size: 28rpx;
    color: #333;
}
.orderNo{
    font-size: 24rpx;
    color: #333;
    margin-top: 15rpx;
}
.tim{
    color: #494949;
    font-size: 24rpx;
    margin-top: 15rpx;
}
.money>view{
    color: #4fb84a;
    font-size: 28rpx;
    line-height: 144rpx;
}
</style>


