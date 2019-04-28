<template>
    <section>
        <view wx:for="{{list}}" wx:key='index' class="list">
            <view class="msg">
                <view class="title">{{item.rcblog_description}}</view>
                <view class="time">{{item.rcblog_addtime}}</view>
            </view>
            <view class="money">+{{item.available_amount}}</view>
        </view>
    </section>
</template>
<script>
import wepy from "wepy";
import { shttp } from "../../../utils/http";

export default class Income extends wepy.page {
    config = {
      navigationBarTitleText: "收入明细"
    };
    data = {
        page: 1,
        limit: 10,
        total: 0,
        list: [],
    };

    methods = {
    }

    onLoad(){
      this.getList();
    }

    onReachBottom(){
      if(this.total <= this.page * this.limit) return console.error('end');

      this.getList(++this.page);
    }

    async getList(){
      let param = {
          page: this.page,
          limit: this.limit,
      };

      let res = await shttp.get(`/api/v2/member/rcbalance`).query(param).end();

      if(res && res.data){
        this.list = this.list.concat(res.data);
        this.total = res.pagination ? res.pagination.total : this.list.length;
      }

      this.$apply();
    }

}
</script>
<style scoped>
.list{
    box-sizing: border-box;
    width: 100%;
    margin-top: 2rpx;
    padding: 28rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
}
.title{
    font-size: 28rpx;
    color: #333;
}
.time{
    color: #494949;
    font-size: 24rpx;
    margin-top: 15rpx;
}
.money{
    font-size: 28rpx;
    color: #4fb84a;
}
</style>


