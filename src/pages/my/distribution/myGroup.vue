<template>
    <section>
        <view class="memberTotal">
            <view>{{count}}</view>
            <view>总人数(人)</view>
        </view>
        <view class="memberList">
            <view wx:for="{{list}}" wx:key class="info">
                <view class="message flex">
                    <image src="{{item.member_avatar}}"/>
                    <view>
                        <view class='name'>{{item.member_nick}}</view>
                        <view>{{item.member_mobile}}</view>
                    </view>
                </view>
                <view class="consume">
                    <text>总消费<text>{{item.order_amount}}</text>元</text>
                </view>
            </view>
        </view>
    </section>
</template>
<script>
import wepy from "wepy";
import { shttp } from "../../../utils/http";

export default class MyGroup extends wepy.page {
    config = {
        navigationBarTitleText: "下级成员"
    };
    data = {
        count: '',
        list: [],
        page: 1,
        limit: 10,
        total: 0,
    };

    methods = {
        
    }

    onLoad(opt){
        this.count = opt.count;

        this.getList();
    }

    onReachBottom(){
        if(this.total <= this.page * this.limit) return console.error('end');

        this.getList(++this.page);
    }

    async getList(){
      wx.showLoading({ title: 'Loading...' }); 
      let param = {
          page: this.page,
          limit: this.limit,
      };

      let res = await shttp.get(`/api/v2/member/memberwithdraw/1/edit`).query(param).end();

      if(res.error){
        wx.hideLoading();
        return wx.showModal({ content: res.error, showCancel: false });
      } 

      if(res && res.data){
        this.list = this.list.concat(res.data);
        this.total = res.pagination ? res.pagination.total : this.list.length;
      }

      this.$apply();
      wx.hideLoading();
    }
}
</script>
<style scoped>
    section{
        background-color: rgb(248, 248, 248);
        min-height: 100vh;
    }
    .memberTotal{
        width: 100%;
        height: 272rpx;
        background-color: #fff;
        text-align: center;
        box-sizing: border-box;
        padding-top:48rpx;
    }
    .memberTotal view:first-child{
        color: #4fb84a;
        letter-spacing: 2rpx;
        font-size: 60rpx;
    }
    .memberTotal view:nth-child(2){
        color: #999;
        letter-spacing: 1rpx;
        font-size: 30rpx;
        margin-top: 34rpx;
    }
    .memberList{
        margin-top: 20rpx;
    }
    .info{
        width: 100%;
        display: flex;
        justify-content: space-between;
        height: 137rpx;
        box-sizing: border-box;
        padding: 26rpx 30rpx;
        background-color: #fff;
        margin-bottom: 1rpx;
    }
    .message{
        font-size: 28rpx;
        color: #333;
        overflow: hidden;
    }
    .message image{
        width: 84rpx;
        height: 84rpx;
        border-radius: 50%;
        overflow: hidden;
        float: left;
        margin-right:20rpx;
    }
    .consume{
        color: #4fb84a;
        font-size: 28rpx;
        line-height: 95rpx;
    }

.flex{
    display: flex;
    align-items: center;
}
.name{
    height: 42rpx;
}
</style>

