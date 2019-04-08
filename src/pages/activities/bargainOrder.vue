<style scoped>
.title{
  line-height: 68rpx;
  padding-left: 30rpx;
  color: #202020;
  border-bottom: 1rpx solid #E5E5E5;
  background: #ffffff;
}
.bargain_info{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 250rpx;
  background: #fff;
}    
  .bargain_info image{
    width: 180rpx;
    height: 180rpx;
  }
.bargain{
  width: 500rpx;
  height: 180rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.bargain-text1{
  color: #222;
  font-size: 32rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}  
.bargain_text2{
  font-size: 32rpx;
  color: #ff7900;
}
.bargain-text3{
  font-size: 28rpx
}   
  .bargain-text3 text{
    color: #ff7900   
  }
.row{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20rpx;
}


.container{
  font: 32rpx PingFang-SC-Medium;
  color: #000;
  min-height: 100vh;
  background: #f4f4f4 ;
}  
.buy-btn{
  height: 88rpx;
  background: #fff;
  margin-top: 3rpx;
  margin-bottom: 3rpx;
  text-align: right;
  line-height: 88rpx;
}      
.text1{
  color: #fff;
  font-size: 28rpx;
  padding: 9rpx 17rpx;
  border-radius: 10rpx;
  background: #ff7900;
  margin-right: 22rpx;
}  
.text2{
  font-size: 28rpx;
  padding: 9rpx 17rpx;
  border-radius: 10rpx;
  margin-right: 22rpx;
  background: #fff;
  border: 1rpx solid #ff7900;
  color: #ff7900;
}
.bargain-text4{
  color: #9c9a9b;
  font-size: 24rpx;
}  
 .bargain-text4 .bargain-text44{
    display: inline-block;
    width: 22rpx;
    height: 26rpx;
    background: #af0000;
    color: #fff;
    text-align: center;
    line-height: 26rpx;
    margin-right: 6rpx;
    font-size: 20rpx;
}
.bargain-text4First{
  font-size: 24rpx;
  color: #af0000;
}  
</style>

<template>
  <view class="container">
    <tab :tabOption="tab" :nowindex.sync="nowindex" @tabitem.user="tabitem"></tab>
    <view wx:if="{{list.length != 0}}">
      <repeat for='{{list}}' index='index' item='item'>
        <view data-item="{{item}}"  @tap='goBargain'>
            <view class='bargain_info'>
              <image src='{{item.goods.goods_image}}' mode="aspectFill"/>
              <view class='bargain'>
                <view class='bargain-text1'>{{item.goods.goods_name}}</view>
                <view>
                  <view class='row'>  
                    <view class='bargain_text2'>¥{{item.goods.goods_price}}</view> 
                    <view class='bargain-text3'>当前价格<text>{{item.current_price}}</text>元</view>
                  </view>                 
                  <view class='row'>
                    <view class='bargain-text3'></view>
                    <view class='bargain-text4' wx:if="{{status == 1}}">
                       还剩 <text class="bargain-text4First">{{wxTimerList[index].d!=0?wxTimerList[index].d+'天':''}} </text> <text class="bargain-text44">{{wxTimerList[index].h1}}</text><text class="bargain-text44">{{wxTimerList[index].h2}}</text>时<text class="bargain-text44">{{wxTimerList[index].m1}}</text><text class="bargain-text44">{{wxTimerList[index].m2}}</text>分<text class="bargain-text44">{{wxTimerList[index].s1}}</text><text class="bargain-text44">{{wxTimerList[index].s2}}</text>秒
                    </view>
                    <view class='bargain-text4' wx:if="{{status == 2}}">
                      砍价完成
                    </view>
                    <view class='bargain-text4' wx:if="{{status == 3}}">
                      砍价失效
                    </view> 
                  </view>
                </view>
              </view>
            </view>
            <view class="buy-btn">
              <text class="text1" @tap.stop='gobuy' data-item="{{item}}" wx:if="{{status == 1}}">立即购买</text>
              <text class="text1" @tap.stop='goGoods' data-item="{{item}}" wx:if="{{status == 3}}">重新砍价</text>
              <text class="text2" data-item="{{item}}"  @tap.stop='goBargain' wx:if="{{status == 1}}">继续砍价</text>
            </view>
        </view>
      </repeat>
  </view>
  <!--暂无数据显示-->
    <placeholder :show.sync="is_empty" message="还没有相关的砍价"></placeholder>
  </view>
</template>
<script>
import wepy from "wepy";
import Tab from "../../components/tab";
import dayjs from "dayjs";
import calc from "calculatorjs";
import { shttp } from "../../utils/http";
import Placeholder from "../../components/placeholder";
import timer from "../../utils/wxTimer";
export default class BargainList extends wepy.page {
  config = {
    navigationBarTitleText: "我的砍价"
  };
  data = {
    tab: {
      tabList: ["砍价中", "已完成", "已失效"]
    },
    nowindex: 0,
    is_empty: false,
    list: [],
    page: 1,
    status: 1,
    wxTimerList: {},
    timeDatalist: []
  };
  components = {
    tab: Tab,
    placeholder: Placeholder
  };
  onLoad(options) {}
  onShow() {
    if (this.timeDatalist.length != 0) {
      this.timeDatalist.forEach(item => {
        item.stop();
      });
    }
    this.list = [];
    this.page = 1;
    this.getList();
    this.$apply();
  }
  methods = {
    async tabitem(e) {
      this.nowindex = e;
      this.is_empty = false;
      this.status = e + 1;
      this.list = [];
      this.page = 1;
      this.getList();
    }
  };

  timeFilter (seconds) {
          var ss = parseInt(seconds)// 秒
          var mm = 0// 分
          var hh = 0// 小时
          if (ss > 60) {
            mm = parseInt(ss / 60)
            ss = parseInt(ss % 60)
          }
          if (mm > 60) {
            hh = parseInt(mm / 60)
            mm = parseInt(mm % 60)
          }
          var result = ('00' + parseInt(ss)).slice(-2)
          result = ('00' + parseInt(mm)).slice(-2) + ':' + result
          result = ('00' + parseInt(hh)).slice(-2) + ':' + result
          return result
  }
  async getList() {
    let memberId = wx.getStorageSync("memberInfo").member_id;
    wx.showLoading({
      title: "加载中"
    });
    let status =0;
    if(this.status == 1) status = 1;
    if(this.status == 2) status = 2;
    if(this.status == 3) status = 0;
    const res = await shttp
      .get(`/api/v2/member/cutprice`)
      .query({
        page: this.page,
        cutprice_activity_states:status,
        member_id:memberId
      })
      .end();
    if (res.status === 0) {
      wx.hideLoading();
      if (this.status == 2) {
        let i = res.data.length;
        while (i--) {
          if (res.data[i].surplus_time == "00:00:00") {
            res.data.splice(i, 1);
          }
        }
      }
      let nowDate = (new Date().getTime())/1000;  
      res.data.forEach((item, index) => {
        item.nowPrice = calc
          .sub(item.goods_price, item.goods_cutprice)
          .toFixed(2);
        item.surplus_time = this.timeFilter(item.cutprice_activity_endtime-nowDate);
        if (this.status == 1) {
          let wxTimer = index;
          wxTimer = new timer({
            beginTime: item.surplus_time,
            name: wxTimer,
            complete: function() {
              this.status = 3;
            }
          });
          wxTimer.start(this);
          this.timeDatalist.push(wxTimer);
        }
      });
      // this.list = this.list.concat(res.data);
      this.list = res.data;
      if (this.list.length == 0) {
        this.is_empty = true;
      }
    } else {
      if (this.list.length == 0) {
        this.is_empty = true;
      }
      wx.hideLoading();
    }
    console.log(this.timeDatalist);
    this.$apply();
  }
  goBargain(e) {
    let item = e.currentTarget.dataset.item;
    const member_id = wx.getStorageSync("memberInfo").member_id;
    if (this.status == 1) {
      wx.navigateTo({
        url:`/pages/activities/bargainDetail?scene=${item.cutprice.cutprice_id};${item.cutprice_activity_id};bargaining;false;${member_id}`
      });
    }
  }
  gobuy(e) {
    let item = e.currentTarget.dataset.item;
    let goods = {
      goods_id: item.goods.goods_id,
      goods_image: item.goods.goods_image,
      goods_name: item.goods.goods_name,
      is_pintuan: 0,
      goods_price: item.current_price,
      goods_num: 1,
      is_virtual: item.goods.is_virtual
    };
    wx.navigateTo({
      url: `/pages/store/firmOrder?type=nocart&goods=${encodeURIComponent(
        JSON.stringify(goods)
      )}&groupontype=bargain`
    });
  }
  goGoods(e) {
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/activities/bargainDetail?goods_commonid=${
        item.cutprice.cutprice_id
      }`
    });
  }
  onUnload() {
    if (this.timeDatalist.length != 0) {
      this.timeDatalist.forEach(item => {
        item.stop();
      });
      this.wxTimerList = {};
      this.timeDatalist = [];
    }
  }
}
</script>
