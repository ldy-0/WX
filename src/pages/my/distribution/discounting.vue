<template>
    <section>
       <view class="toCash">
           <image src = "../../../images/distribution/withDraw.png" />
           <view>可提现佣金<text>¥<text>{{price}}</text></text></view>
           <button @tap = "toCashForm">立即提现</button>
       </view>
        <view>
            <view wx:for ="{{detailsList}}" wx:key class="details" data-index = "{{index}}" @tap = "indexPage">
                <text>{{item}}</text>
                <image src = "../../../images/icon_you@2x.png"/>
            </view>
        </view>
    </section>  
</template>
<script>
import wepy from "wepy";
export default class Discounting extends wepy.page {
    config = {
        navigationBarTitleText: "立即提现",
    };

    data = {
        price: '',
        detailsList:["收益明细","提现明细"],
    };

    methods = {
        indexPage(e){
            let index = e.currentTarget.dataset.index;
            console.log(index);
            let url = '';
            url = index === 0 ? "./earningsDetails" : "./cashDetails";
            if(url != ''){
                wx.navigateTo({
                    url,
                })
            }
        },
        toCashForm(){
            if(this.price < 2000) return wx.showModal({ content: '可提现金额必须大于2000才能提现!', showCancel: false });

            wx.navigateTo({ url : `/pages/my/distribution/cashForm?price=${this.price}` })
        }
    }

    onLoad(opt){
       this.price = opt.price; 
    }
}
</script>
<style>
    section{
        width: 100%;
        min-height: 100vh;
        background-color: rgb(248, 248, 248);
    }
    .toCash{
        width: 100%;
        box-sizing: border-box;
        padding: 0 30rpx;
        text-align: center;
        margin-bottom: 37rpx;
    }
    .toCash image{
        margin-top: 50rpx;
        width: 126rpx;
        height: 126rpx;

    }
    .toCash view{
        color: #999;
        font-size: 24rpx;
        letter-spacing: 1rpx;
        margin-top: 38rpx;
    }
    .toCash view text{
        color: #4fb84a;
        letter-spacing: 1rpx;
    }
    .toCash view > text{
        margin-left: 10rpx;
    }
    .toCash button{
        width: 690rpx;
        height: 70rpx;
        color: #fff;
        border-radius: 10rpx;
        border: none;
        outline: none;
        background-color: #4fb84a;
        line-height: 70rpx;
        font-size: 36rpx;
        letter-spacing: 1rpx;
        margin-top: 60rpx;
    }
    .details{
        width: 100%;
        display: flex;
        justify-content: space-between;
        width: 100%;
        background-color: #fff;
        margin-bottom: 1rpx;
        box-sizing: border-box;
        padding: 30rpx;
        font-size: 30rpx;
        color: #222;
        letter-spacing: 1rpx;
    }
    .details image{
        display: block;
        height: 18rpx;
        width: 10rpx;
        margin-top:13rpx;
    }
</style>

