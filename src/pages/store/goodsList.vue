<style scoped>
.bodycontent {
  width: 100%;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 0rpx 17rpx 23rpx 17rpx;
  display: flex;
  background: #fff;
}
.bodycontent .redlist {
  background: #fff;
  width: 344rpx;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 10rpx 10rpx 0 0;
  margin-right: 20rpx;
  margin-bottom: 19rpx;
  border: solid 1px #f6f6f6;
  position: relative;
}
.bodycontent .title_page {
  width: 100%;
  height: 334rpx;
  background: gray;
}
.bodycontent .price {
  color: #ff4444;
  font-size: 32rpx;
  margin-bottom: 20rpx;
}
.add_redinfo {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 14rpx 21rpx 11rpx;
}
.goodsname {
  color: #222;
  width: 100%;
  font-size: 28rpx;
  height: 48rpx;
  line-height: 48rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.viewX-itemGoodsname {
  color: #222;
  width: 100%;
  font-size: 28rpx;
  height: 48rpx;
  line-height: 48rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.viewX-price {
  color: #dd3d27;
  font-size: 32rpx;
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}
.viewX-originalPrice {
  color: #222;
  font-size: 32rpx;
}
.viewX-itemIcon {
  width: 40rpx;
  height: 40rpx;
  margin-left: 20rpx;
}
.countDown-box {
  position: absolute;
  height: 50rpx;
  width: 100%;
  top: 285rpx;
  left: 0;
  z-index: 9;
  background: rgba(254, 170, 38, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}
.countDown-txt {
  color: #fff;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  font-size: 18rpx;
}
.countDown-txt .countDown-txt1 {
  color: #fff;
  font-size: 20rpx;
}
.countDown-txt .countDown-txt2 {
  display: inline-block;
  width: 22rpx;
  height: 26rpx;
  background: #fff;
  color: #f17f30;
  text-align: center;
  line-height: 26rpx;
  margin: 0 6rpx;
  font-size: 20rpx;
}
</style>
<template>
  <view class="container">
    <view class="bodycontent">
      <!-- 普通商品 -->
      <repeat wx:if="{{type=='hot'}}" for="{{goodsList}}" key="index" index="index" item="item">
        <view class="redlist" @tap="toDetail({{item.goods_commonid}})">
          <image class="title_page" mode="aspectFill" src="{{item.goods_image}}" />
          <view class="redinfo add_redinfo">
            <text class="goodsname">{{item.goods_name}}</text>
            <view class="price">
              <text style="font-size:26rpx;">￥</text>{{item.goods_price}}
            </view>
          </view>
        </view>
      </repeat>
      <!-- 后台商品 字段结构不同-->
      <repeat wx:if="{{type=='group'||type=='seckill'||type=='bargain'}}" for="{{goodsList}}" key="index" index="index" item="item">
        <view class="redlist" @tap="toDetail({{item.rule_id}})">
          <image class="title_page" mode="aspectFill" src="{{item.goods.goods_image}}" />
          <!-- 秒杀计时器 -->
          <view class="countDown-box" wx:if="{{type=='seckill'}}">
              <view class="countDown-txt" wx:if="{{item.show==3}}">
                还剩
                <text>{{wxTimerList[index].d!=0?wxTimerList[index].d+'天':''}} </text>
                <text class="countDown-txt2">{{wxTimerList[index].h1}}</text>
                <text class="countDown-txt2">{{wxTimerList[index].h2}}</text>:
                <text class="countDown-txt2">{{wxTimerList[index].m1}}</text>
                <text class="countDown-txt2">{{wxTimerList[index].m2}}</text>:
                <text class="countDown-txt2">{{wxTimerList[index].s1}}</text>
                <text class="countDown-txt2">{{wxTimerList[index].s2}}</text>
              </view>
              <view class="countDown-txt" wx:if="{{item.show==1}}">即将开始</view>
              <view class="countDown-txt" wx:if="{{item.show==2}}">活动结束</view>
          </view>
          <view class="viewX-itemGoodsname">{{item.goods.goods_name}}{{item.rule_name}}</view>
          <view class="viewX-originalPrice">
            <text style="font-size:26rpx;">￥</text>{{item.goods.goods_price}}
          </view>
          <view class="viewX-price">
            <view>
              <text style="font-size:26rpx;">￥</text>{{item.goods_price}}
            </view>
            <image wx:if="{{type == 'group'}}" class="viewX-itemIcon" src="../../images/icon_tuangou@2x.png" />
          </view>
        </view>
      </repeat>
    </view>
    <placeholder :show.sync="is_empty" message="还没有此类商品"></placeholder>
  </view>
</template>
<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import Placeholder from "../../components/placeholder";
import dayjs from "dayjs";
import timer from "../../utils/wxTimer";
export default class GoodsList extends wepy.page {
  config = {
    navigationBarTitleText: "",
    enablePullDownRefresh: true,
  };
  data = {
    goodsList: [], //商品列表
    page: 1,
    is_empty: false,
    type: null,
    wxTimerList: {},
    timeDatalist: [],
  };
  components = {
    placeholder: Placeholder
  };
  onLoad(options) {
    this.type = options.type;
    switch (options.type) {
      case "group":
        wx.setNavigationBarTitle({
          title: "团购商品"
        });
        this.getGroupList();
        break;
      case "seckill":
        wx.setNavigationBarTitle({
          title: "秒杀商品"
        });
        // this.getSeckillList();
        break;
      case "bargain":
        wx.setNavigationBarTitle({
          title: "砍价商品"
        });
        this.getBargainList();
        break;
      case "hot":
        wx.setNavigationBarTitle({
          title: "热门推荐"
        });
        this.getgoodsList();
        break;
      default:
        wx.setNavigationBarTitle({
          title: "商品列表"
        });
        break;
    }
    this.$apply();
  }
  onShow() {
    if(this.type =='seckill' ){
      this.goodsList = [];
        this.getSeckillList();
    }
  }
  methods = {
    //进入商品详情
    toDetail(id) {
      switch (this.type) {
        case "group":
          wx.navigateTo({
            url: `./goodsDetails?goods_commonid=${id}&type=group`
          });
          break;
        case "seckill":
          wx.navigateTo({
            url: `../activities/seckillDetail?goods_commonid=${id}`
          });
          break;
        case "bargain":
          wx.navigateTo({
            url: `../activities/bargainDetail?goods_commonid=${id}`
          });
          break;
        default:
          wx.navigateTo({
            url: `./goodsDetails?goods_commonid=${id}`
          });
          break;
      }
    }
  };
  //普通商品
  async getgoodsList() {
    const res = await shttp
      .get(`/api/v2/member/goodscommon`)
      .query({
        store_id: 1,
        goods_commend: 1,
        type: "sort",
        limit: 10,
        page: this.page
      })
      .end();
    if (res.status === 0) {
      if (res.data != null && res.data.length != 0) {
        this.goodsList = this.goodsList.concat(res.data);
      }
      if (this.goodsList.length == 0) {
        this.is_empty = true;
      } else {
        this.is_empty = false;
      }
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }
    this.$apply();
  }
  //团购商品
  async getGroupList() {
    const res = await shttp
      .get(`/api/v2/member/goodsgroupbuy/1/edit`)
      .query({
        store_id: 1,
        limit: 10,
        page: this.page
      })
      .end();
    if (res.status === 0) {
      if (res.data != null && res.data.length != 0) {
        this.goodsList = this.goodsList.concat(res.data);
      }
      if (this.goodsList.length == 0) {
        this.is_empty = true;
      } else {
        this.is_empty = false;
      }
      wx.hideLoading();
    wx.stopPullDownRefresh();

    }
    this.$apply();
  }
  //秒杀商品
  async getSeckillList() {
    const res = await shttp
      .get(`/api/v2/member/seckill`)
      .query({
        store_id: 1,
        limit: 10,
        page: this.page
      })
      .end();
    if (res.status === 0) {
      if (res.data != null && res.data.length != 0) {
        this.goodsList = this.goodsList.concat(res.data);
        res.data.forEach((item, index) => {
        item.start_time = item.start_time.replace(/\-/g, '/');
        item.end_time = item.end_time.replace(/\-/g, '/');
        let startTime = new Date(item.start_time).getTime();
        let endTime = new Date(item.end_time).getTime();
        let nowTime = new Date().getTime();
        if(startTime>nowTime){
          item.show = 1;
        }else if(nowTime>endTime){
          item.show = 2
        }else{
          item.show =3
        }
        let hour = dayjs(endTime).diff(dayjs(nowTime), "hour");
        let diffhour = hour * 60;
        let minute = dayjs(endTime).diff(dayjs(nowTime), "minute");
        let diffminute = minute * 60;
        minute -= diffhour;
        let second = dayjs(endTime).diff(dayjs(nowTime), "second");
        second -= diffminute;
        if(hour<10) hour = '0'+hour
        if(minute<10) minute = '0'+minute
        if(second<10) second = '0'+second
        let beginTime = hour + ":" + minute + ":" + second;
        let wxTimer = index;
        wxTimer = new timer({
          beginTime: beginTime,
          name: wxTimer,
          complete: function() {}
        });
        wxTimer.start(this);
        this.timeDatalist.push(wxTimer);
      });
      }
      if (this.goodsList.length == 0) {
        this.is_empty = true;
      } else {
        this.is_empty = false;
      }
      wx.hideLoading();
          wx.stopPullDownRefresh();

    }
    this.$apply();
  }
  //砍价商品
  async getBargainList() {
    const res = await shttp
      .get(`/api/v2/member/cutgoods`)
      .query({
        store_id: 1,
        limit: 10,
        page: this.page
      })
      .end();
    if (res.status === 0) {
      if (res.data != null && res.data.length != 0) {
        let result = res.data;
        result.forEach(element => {
          element.rule_id = element.cutprice_id;
        });
        this.goodsList = this.goodsList.concat(result);
      }
      if (this.goodsList.length == 0) {
        this.is_empty = true;
      } else {
        this.is_empty = false;
      }
      wx.hideLoading();
          wx.stopPullDownRefresh();

    }
    this.$apply();
  }
  //上拉加载
  onReachBottom() {
    this.page += 1;
    switch (this.type) {
      case "group":
        this.getGroupList();
        break;
      case "hot":
        this.getgoodsList();
        break;
      case "seckill":
        break;
        this.getSeckillList();
        break;
      case "bargain":
        this.getBargainList();
        break;
      default:
        this.getgoodsList();
        break;
    }

    this.$apply();
  }
  onPullDownRefresh() {
    this.page = 1;
    this.goodsList=[];
    switch (this.type) {
      case "group":
        this.getGroupList();
        break;
      case "hot":
        this.getgoodsList();
        break;
      case "seckill":
        this.getSeckillList();
        break;
      case "bargain":
        this.getBargainList();
        break;
      default:
        this.getgoodsList();
        break;
    }

    this.$apply();
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
  onHide(){
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
