<template>
    <section>
        <view class="info" wx:for = "{{list}}" wx:key>
            <view class="infomation">
                <view>佣金返现 (¥)</view>
                <view>订单号：{{item.orderSn}}</view>
                <view>{{item.time}}</view>
            </view>
            <view>
                <text>¥</text>
                <text>{{item.lg_av_amount}}</text>
            </view>
        </view>
    </section>
</template>
<script>
import wepy from "wepy";
import { shttp } from '../../../utils/http';

export default class EarningsDetails extends wepy.page {
    config = {
        navigationBarTitleText: "收益明细"
    };
    data = {
        list: [],
        page: 1,
        limit: 10,
        total: 0,
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

    format(v){
        let t = new Date(v.lg_addtime * 1000);

        v.time = t ? `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}` : '';
       
        v.orderSn = v.lg_desc.replace(/^订单|返佣金$/g, '');
    }

    async getList(){
      let param = {
          page: this.page,
          limit: this.limit,
      };

      let res = await shttp.get(`/api/v2/member/memberwithdraw/create`).query(param).end();

      if(res && res.data){
        res.data.forEach(this.format);

        this.list = this.list.concat(res.data);
        this.total = res.pagination ? res.pagination.total : this.list.length;
      }

      this.$apply();
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

