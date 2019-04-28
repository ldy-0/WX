<template>
    <section>
        <view class="selection">
            <view class="tab">
                <view class="{{item.id === checkId ? 'active' : 'unactive'}}" wx:for = "{{choose}}" wx:key @tap="showMsg({{index}})">{{item.name}}</view>
            </view>
        </view>
        <view class="tabList">
            <view wx:for = "{{list}}" wx:key class="msg">
                <view class="msg_left">
                    <view>佣金提现(¥)</view>
                    <view>{{item.time}}</view>
                </view>
                <view class="msg_right">
                    -<text>{{item.pdc_amount}}</text>
                </view>
            </view>
        </view>
    </section>
</template>
<script>
import wepy from "wepy";
import { shttp } from "../../../utils/http";

export default class CashDeatils extends wepy.page {
    config = {
        navigationBarTitleText: "提现明细"
    };

    data = {
        choose:[
           { name: "提现中", id: 0 },
           { name: "已完成", id: 1 },
        ],
        checkId: 0, /* 默认选中第一个 */
        list: [],
        page: 1,
        limit: 10,
        total: 0,
    };

    methods = {
        showMsg(index){
            this.checkId = index;

            this.list = [];
            this.getList(this.page = 1);
        }
    }

    onLoad(){
      this.getList();
    }

    onReachBottom(){
      if(this.total <= this.page * this.limit) return console.error('end');

      this.getList(++this.page);
    }

    format(v){
      v.time = v.pdc_addtime ? this.getTime(v.pdc_addtime) : '';
    }

    async getList(){
      let param = {
          page: this.page,
          limit: this.limit,
          status: this.checkId,
      };

      let res = await shttp.get(`/api/v2/member/memberwithdraw`).query(param).end();

      if(res && res.data){
        res.data.forEach(this.format.bind(this));
        this.list = this.list.concat(res.data);
        this.total = res.pagination ? res.pagination.total : this.list.length;
      }

      this.$apply();
    }

    getTime(timeStamp){
      let t = new Date(timeStamp * 1000); 

      return `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}`;
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

