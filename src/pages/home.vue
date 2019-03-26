<style>
.tips {
  width: 100%;
  text-align: center;
  line-height: 100rpx;
  font-size: 30rpx;
}

.link-list > navigator {
  position: relative;
  margin: 5rpx 0;
  padding-right: 50rpx;
  line-height: 88rpx;
  background: white;
}

.link-list text {
  display: block;
  text-indent: 20rpx;
  font-size: 32rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.link-list image {
  width: 16rpx;
  height: 25rpx;
  margin-top: -12rpx;
  position: absolute;
  right: 20rpx;
  top: 50%;
}

.search_text {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-search {
  width: 40rpx;
  height: 40rpx;
}

.nodata {
  margin-top: 50%;
  font-size: 38rpx;
  text-align: center;
}

.wire-gray {
  height: 20rpx;
  width: 100%;
  background: #f4f4f4;
}

.container {
  font: 32rpx PingFang-SC-Medium;
  background: #fff;
  width: 100%;
  overflow: hidden;
  min-height: calc(100% - 150rpx);
}

.search {
  background: #fff;
  height: 96rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search .search_content {
  display: flex;
  align-items: center;
  width: 690rpx;
  height: 60rpx;
  border-radius: 10rpx;
  background: #ededed;
}
.search .search_content image {
  width: 23rpx;
  height: 25rpx;
  margin-left: 31rpx;
  margin-right: 2%;
}

.swiper {
  height: 400rpx;
  background: #c6c6d1;
}
.swiper image {
  width: 100%;
  height: 100%;
}

.tap_item {
  background: #fff;
  display: flex;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
  height: 206rpx;
}
.tap_item .item_page {
  width: 92rpx;
  height: 92rpx;
  margin-bottom: 15rpx;
}
.tap_item .item_view {
  font-size: 24rpx;
  flex-grow: 1;
  /* width: 25%; */
  justify-content: center;
  align-items: center;
  color: #222222;
  display: flex;
  flex-flow: column nowrap;
}

.good_title {
  width: 100%;
  height: 90rpx;
  margin-bottom: 20rpx;
  background: #fff;
  justify-content: space-between;
  align-items: center;
  display: flex;
}
.good_title .name {
  /* border-left: solid 6rpx #f17f30; */
  margin-left: 20rpx;
  align-items: center;
  display: flex;
  /* padding-left: 15rpx; */
}
.good_title .icon_info {
  width: 50%;
  margin-right: 30prx;
  justify-content: flex-end;
  align-items: center;
  display: flex;
  padding-right: 30rpx;
}
.good_title .new_good {
  color: #222222;
  font-size: 36rpx;
  font-weight: 500;
}
.good_title .more {
  font-size: 28rpx;
  color: #c7c7c7;
  margin-right: 8rpx;
}
.good_title .icon_R {
  width: 12rpx;
  height: 22rpx;
}

.bodycontent {
  width: 100%;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 0rpx 17rpx 23rpx 17rpx;
  display: flex;
  background: #fff;
}
.redlist {
  background: #fff;
  width: 344rpx;
  height: 457rpx;
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
.bodycontent .case_redlist {
  height: 300rpx;
}
.bodycontent .case_title_page {
  width: 100%;
  height: 240rpx;
}
.bodycontent .news_redlist {
  width: 95%;
  height: 240rpx;
  display: flex;
  align-items: center;
  border: none;
  border-radius: none;
  border-bottom: solid 1px #f6f6f6;
  margin: 0;
}
.bodycontent .news_redlist .redinfo {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  height: 80%;
  width: 448rpx;
  position: relative;
  justify-content: space-between;
  padding: 0 40rpx;
}
.bodycontent .news_redlist .title_page {
  width: 200rpx;
  height: 200rpx;
  border-radius: 10rpx;
}
.bodycontent .news_redlist .price {
  color: #a9a9a9;
  font-size: 30rpx;
}
.bodycontent .news_redlist .salenum {
  color: #999;
  font-size: 22rpx;
}
.bodycontent .news_redlist .num_info {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bodycontent .author {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20rpx;
}
.bodycontent .author .Sales {
  color: #666;
  font-size: 22rpx;
}
.bodycontent .author .car {
  width: 64rpx;
  height: 40rpx;
}
.bodycontent .price {
  color: #ff4444;
  font-size: 32rpx;
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
.prdname {
  color: #222;
  width: 100%;
  font-size: 30rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.viewX {
  width: 100%;
  white-space: nowrap;
  background: #fff;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
.viewX-item {
  width: 320rpx;
  height: 500rpx;
  display: inline-block;
  margin-left: 20rpx;
}
.viewX-itemImg {
  width: 320rpx;
  height: 340rpx;
  border-radius: 5rpx;
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
.coupons-item {
  width: 380rpx;
  height: 200rpx;
  margin-left: 20rpx;
  display: inline-block;
  position: relative;
}
.coupons-itemImg {
  width: 380rpx;
  height: 200rpx;
}
.coupons-txtbox {
  position: absolute;
  left: 0;
  top: 0;
  width: 318rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
}
.coupons-txt1 {
  font-size: 70rpx;
  margin-top: 15rpx;
}
.coupons-txt1 text {
  font-size: 32rpx;
}
.coupons-txt2 {
  font-size: 26rpx;
}
.coupons-txt3 {
  font-size: 20rpx;
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
    <view class="search">
      <navigator url="./article/search" class="search_content">
        <image src="../images/icon_sousuo@2x.png" class="iconfont icon-search" mode="aspectFill">
          <text style="color:#666;font-size:28rpx">搜索商品</text>
      </navigator>
    </view>
    <swiper class="swiper" indicator-active-color="{{indicatorActiveColor}}" indicator-color="{{indicatorColor}}" indicator-dots="{{indicatorDots}}" autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}" circular="true">
      <repeat for="{{bannerList}}" key="index" index="index" item="item">
        <swiper-item>
          <image src="{{item.banner_pic}}" mode="aspectFill" @tap="swipclick({{item}})">
        </swiper-item>
      </repeat>
    </swiper>
    <view class="tap_item">
      <navigator open-type="switchTab" url="/pages/classify" class="item_view">
        <image class="item_page" src="../images/icon_1_meishi@2x.png">
          <view>美食</view>
      </navigator>
      <navigator class="item_view" url="./store/goodsList?type=bargain">
        <image class="item_page" src="../images/icon_1_tuangou@2x.png">
          <view>砍价</view>
      </navigator>
      <navigator class="item_view" url="./store/goodsList?type=group">
        <image class="item_page" src="../images/icon_1_tuangou@2x.png">
          <view>团购</view>
      </navigator>
      <navigator class="item_view" url="./store/goodsList?type=seckill">
        <image class="item_page" src="../images/icon_1_miaosha@2x.png">
          <view>秒杀</view>
      </navigator>
      <navigator class="item_view" url="./article/videos">
        <image class="item_page" src="../images/icon_1_shipin@2x.png">
          <view>视频</view>
      </navigator>
      <navigator class="item_view" url="./article/advisory">
        <image class="item_page" src="../images/icon_1_zixun@2x.png">
          <view>资讯</view>
      </navigator>
    </view>
    <!-- 优惠券 -->
    <view wx:if="{{couponList.length!=0}}">
      <navigator url="./article/couponList">
        <view class="good_title">
          <view class="name">
            <text class="new_good">优惠券</text>
          </view>
          <view class="icon_info">
            <text class="more">更多</text>
            <image class="icon_R" src="../images/icon_you@2x.png">
          </view>
        </view>
      </navigator>
      <scroll-view scroll-x class="viewX">
        <repeat for="{{couponList}}" key="index" index="index" item="item">
          <view class="coupons-item" @tap="getcoupons" data-coupon="{{item}}" data-index="{{index}}">
            <image class="coupons-itemImg" src="{{item.fetch_states==2?'../images/img_1_1@2x.png':'../images/img_1_2@2x.png'}}">
              <view class="coupons-txtbox">
                <view class="coupons-txt1">
                  <text>￥</text>{{item.vouchertemplate_price}}
                </view>
                <view class="coupons-txt2">无门槛使用</view>
                <view class="coupons-txt3">{{item.vouchertemplate_startdate}} ~ {{item.vouchertemplate_enddate}}</view>
              </view>
          </view>
        </repeat>
      </scroll-view>
    </view>
    <!-- 推荐 -->
    <view wx:if="{{goodsList.length!=0}}">
      <navigator url="./store/goodsList?type=hot">
        <view class="good_title">
          <view class="name">
            <text class="new_good">热门商品</text>
          </view>
          <view class="icon_info">
            <text class="more">更多</text>
            <image class="icon_R" src="../images/icon_you@2x.png">
          </view>
        </view>
      </navigator>
      <view class="bodycontent">
        <repeat for="{{goodsList}}" key="index" index="index" item="item">
          <view class="redlist" @tap="intoDetail({{item.goods_commonid}})">
            <image class="title_page" mode="aspectFill" src="{{item.goods_image}}">
              <view class="redinfo add_redinfo">
                <text class="goodsname">{{item.goods_name}}</text>
                <view class="price">
                  <text style="font-size:26rpx;">￥</text>{{item.goods_price}}
                </view>
              </view>
          </view>
        </repeat>
      </view>
    </view>
    <!-- 团购推荐 -->
    <view wx:if="{{groupGoodsList.length!=0}}">
      <navigator url="./store/goodsList?type=group">
        <view class="good_title">
          <view class="name">
            <text class="new_good">火爆拼团</text>
          </view>
          <view class="icon_info">
            <text class="more">更多</text>
            <image class="icon_R" src="../images/icon_you@2x.png">
          </view>
        </view>
      </navigator>
      <scroll-view scroll-x class="viewX">
        <repeat for="{{groupGoodsList}}" key="index" index="index" item="item">
          <view class="viewX-item" @tap="groupDetail({{item.rule_id}})">
            <image class="viewX-itemImg" mode="aspectFill" src="{{item.goods.goods_image}}">
              <view class="viewX-itemGoodsname">{{item.goods.goods_name}}</view>
              <view class="viewX-originalPrice">
                <text style="font-size:26rpx;">￥</text>{{item.goods.goods_price}}
              </view>
              <view class="viewX-price">
                <view>
                  <text style="font-size:26rpx;">￥</text>{{item.goods_price}}
                </view>
                <image class="viewX-itemIcon" src="../images/icon_tuangou@2x.png">
              </view>
          </view>
        </repeat>
      </scroll-view>
    </view>
    <!-- 秒杀推荐 -->
    <view wx:if="{{seckillList.length!=0}}">
      <navigator url="./store/goodsList?type=seckill">
        <view class="good_title">
          <view class="name">
            <text class="new_good">极限秒杀</text>
          </view>
          <view class="icon_info">
            <text class="more">更多</text>
            <image class="icon_R" src="../images/icon_you@2x.png">
          </view>
        </view>
      </navigator>
      <view class="bodycontent">
        <repeat for="{{seckillList}}" key="index" index="index" item="item">
          <view class="redlist" @tap="seckillDetail({{item.rule_id}})">
            <image class="title_page" mode="aspectFill" src="{{item.goods.goods_image}}">
              <view class="countDown-box" >
                <view class="countDown-txt" wx:if="{{item.show==3}}">
                  还剩
                  <!-- <text class="countDown-txt2">{{wxTimerList[index].d!=0?wxTimerList[index].d+'天':''}} </text> -->
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
              <view class="redinfo add_redinfo">
                <text class="goodsname">{{item.goods.goods_name}}</text>
                <view class="price">
                  <text style="font-size:26rpx;">秒杀价￥</text>{{item.goods_price}}
                </view>
              </view>
          </view>
        </repeat>
      </view>
    </view>
    <!-- 砍价推荐 -->
    <view wx:if="{{bargainList.length!=0}}">
      <navigator url="./store/goodsList?type=bargain">
        <view class="good_title">
          <view class="name">
            <text class="new_good">热门砍价</text>
          </view>
          <view class="icon_info">
            <text class="more">更多</text>
            <image class="icon_R" src="../images/icon_you@2x.png">
          </view>
        </view>
      </navigator>
      <view class="bodycontent">
        <repeat for="{{bargainList}}" key="index" index="index" item="item">
          <view class="redlist" @tap="bargainDetail({{item.cutprice_id}})">
            <image class="title_page" mode="aspectFill" src="{{item.goods.goods_image}}">
              <view class="redinfo add_redinfo">
                <text class="goodsname">{{item.goods_name}}</text>
                <view class="price">
                  <text style="font-size:26rpx;color:#0f0f0f;text-decoration: line-through;">￥{{item.goods.goods_price}}</text>
                  <text style="font-size:26rpx;">￥</text>{{item.goods_price}}
                </view>
              </view>
          </view>
        </repeat>
      </view>
    </view>
    <!-- 案例展示开始 -->
    <view wx:if="{{materialList.length!=0}}">
      <navigator url="./store/more">
        <view class="good_title">
          <view class="name">
            <text class="new_good">案例展示</text>
          </view>
          <view class="icon_info">
            <text class="more">更多</text>
            <image class="icon_R" src="../images/icon_you@2x.png">
          </view>
        </view>
      </navigator>
      <view class="bodycontent">
        <repeat for="{{materialList}}" key="index" index="index" item="item">
          <view class="redlist case_redlist" @tap="gotoCase({{item.dynamic_id}})">
            <image class="case_title_page" src="{{item.dynamic_images[0].url}}" mode="aspectFill">
              <view class="redinfo">
                <text class="prdname">{{item.dynamic_title}}</text>
              </view>
          </view>
        </repeat>
      </view>
    </view>

    <!-- 案例展示结束 -->
    <!-- 新闻资讯开始 -->
    <view wx:if="{{newsList.length!=0}}">
      <navigator url="./article/advisory">
        <view class="good_title">
          <view class="name">
            <text class="new_good">新闻资讯</text>
          </view>
          <view class="icon_info">
            <text class="more">更多</text>
            <image class="icon_R" src="../images/icon_you@2x.png">
          </view>
        </view>
      </navigator>
      <view class="bodycontent">
        <repeat for="{{newsList}}" key="index" index="index" item="item">
          <view class="redlist news_redlist" @tap="gotoNews({{item.information_id}})">
            <image class="title_page" src="{{item.information_image[0]}}" mode="aspectFill">
              <view class="redinfo">
                <text class="prdname">{{item.information_title}}</text>
                <view class="num_info">
                  <text class="price">{{item.addtime}}</text>
                </view>
              </view>
          </view>
        </repeat>
      </view>
    </view>
    <!-- 新闻资讯结束 -->
  </view>
  <!-- container结束 -->
</template>

<script>
import wepy from "wepy";
import { getCode } from "../utils/user-tools";
import { shttp } from "../utils/http";
import getTimes from "../utils/formatedate.js";
import dayjs from "dayjs";
import timer from "../utils/wxTimer";
import { showSuccessToast, showFailToast, exploitToast } from "../utils/tools";
export default class Home extends wepy.page {
  config = {
    enablePullDownRefresh: true,
    navigationBarTitleText: "首页"
  };
  data = {
    wxTimerList: {},
    timeDatalist: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 200,
    indicatorActiveColor: "#f17f30",
    indicatorColor: "rgba(0, 0, 0, .6)", //以上为轮播配置
    bannerList: [], //轮播图
    goodsList: [], //商品列表
    materialList: [], //案例列表
    newsList: [], //新闻列表
    couponList: [], //优惠券
    groupGoodsList: [], //团购商品列表
    bargainList: [],
    seckillList: []
  };

  components = {};

  onLoad(options) {}

  onShow() {
    wx.showLoading({
      title: "加载中"
    });
    this.getbannerList();
    this.getRecommendList();
    this.getNewsList();
    this.getCouponList();
    this.getGroupList();
    this.getBargain();
    this.getSeckill();
  }

  methods = {
    //进入商品详情
    intoDetail(id) {
      wx.navigateTo({
        url: `store/goodsDetails?goods_commonid=${id}`
      });
    },
    //进入团购商品详情
    groupDetail(id) {
      wx.navigateTo({
        url: `store/goodsDetails?goods_commonid=${id}&type=group`
      });
    },
    //进入秒杀商品详情
    seckillDetail(id) {
      wx.navigateTo({
        url: `activities/seckillDetail?goods_commonid=${id}`
      });
    },
    //进入砍价商品详情
    bargainDetail(id) {
      wx.navigateTo({
        url: `activities/bargainDetail?goods_commonid=${id}`
      });
    },
    //进入案例详情
    gotoCase(id) {
      wx.navigateTo({
        url: `./article/caseDetail?id=${id}`
      });
    },
    //进入新闻详情
    gotoNews(id) {
      wx.navigateTo({
        url: `./article/advisoryDetail?id=${id}`
      });
    },
    //轮播图跳转
    swipclick(e) {
      let type = e.banner_type;
      switch (type) {
        case 0:
          console.log("0不跳");
          break;
        case 1:
          console.log("1图片");
          wx.navigateTo({
            url: `article/advertisingPage?imgurl=${e.banner_url}`
          });
          break;
        case 2:
          console.log("2商品");
          wx.navigateTo({
            url: `store/goodsDetails?goods_commonid=${e.banner_url}`
          });
          break;
        case 3:
          console.log("3公众号文章");
          wx.navigateTo({
            url: `outWeb?url=${e.banner_url}`
          });
          break;
        default:
          break;
      }
    },
    async getcoupons(e) {
      let id = e.currentTarget.dataset.coupon.vouchertemplate_id;
      let index = e.currentTarget.dataset.index;
      let fetch_states = e.currentTarget.dataset.coupon.fetch_states;
      if (fetch_states == 1) {
        return wx.showToast({
          title: "请不要重复领取",
          icon: "none",
          duration: 1000
        });
      }
      const res = await shttp
        .post("/api/v2/member/coupon")
        .send({
          vouchertemplate_id: id
        })
        .end();
      if (res.status == 0) {
        wx.showToast({
          title: "领取成功",
          icon: "success",
          duration: 2000
        });
        this.couponList[index].fetch_states = 1;
        this.$apply();
      } else if (res.status == 1) {
        wx.showToast({
          title: res.error,
          icon: "none",
          duration: 2000
        });
      }
    }
  };

  //获取轮播图
  async getbannerList() {
    const res = await shttp.get(`/api/v2/member/banner`).end();
    if (res.status == 0) {
      this.bannerList = res.data;
    }
    this.$apply();
  }
  //轮播图跳转
  swipclick(e) {
    let imgurl = e.currentTarget.dataset.imgurl;
    if (imgurl) {
      wx.navigateTo({
        url: `./article/advertisingPage?imgurl=${imgurl}`
      });
    }
  }
  //优惠券列表
  async getCouponList() {
    const res = await shttp
      .get(`/api/v2/member/coupon/search`)
      .query({
        store_id: 1,
        limit: 4,
        page: 1
      })
      .end();
    if (res.status == 0) {
      this.couponList = res.data;
    }
    this.$apply();
  }
  //获取热门推荐列表
  async getRecommendList() {
    const res = await shttp
      .get(`/api/v2/member/goodscommon`)
      .query({
        store_id: 1,
        goods_commend: 1,
        type: "sort",
        limit: 3,
        page: 1
      })
      .end();
    if (res.status === 0) {
      this.goodsList = res.data;
    }
    wx.hideLoading();
    wx.stopPullDownRefresh();
    this.$apply();
  }
  //获取团购商品列表
  async getGroupList() {
    const res = await shttp
      .get(`/api/v2/member/goodsgroupbuy/1/edit`)
      .query({
        store_id: 1,
        limit: 4,
        page: 1
      })
      .end();
    if (res.status === 0) {
      if (res.data != null && res.data.length > 0) {
        this.groupGoodsList = res.data;
      }
    }
    wx.hideLoading();
    wx.stopPullDownRefresh();
    this.$apply();
  }
  //获取秒杀推荐列表
  async getSeckill() {
    const res = await shttp
      .get(`/api/v2/member/seckill`)
      .query({
        store_id: 1,
        rule_commend: 1,
        type: "sort",
        limit: 4,
        page: 1
      })
      .end();
    if (res.status === 0) {
      this.seckillList = res.data;

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
    console.log(this.timeDatalist);
    wx.hideLoading();
    wx.stopPullDownRefresh();
    this.$apply();
  }
  //获取砍价推荐列表
  async getBargain() {
    const res = await shttp
      .get(`/api/v2/member/cutgoods`)
      .query({
        store_id: 1,
        cutprice_commend: 1,
        type: "sort",
        limit: 6,
        page: 1
      })
      .end();
    if (res.status === 0) {
      this.bargainList = res.data;
    }
    wx.hideLoading();
    wx.stopPullDownRefresh();
    this.$apply();
  }
  //获取案例列表
  async getMaterialList() {
    const res = await shttp
      .get(`/api/v2/member/dynamic`)
      .query({
        dynamic_type: "material",
        limit: 4,
        page: 1
      })
      .end();
    let list = res.data;
    if (res.status === 0) {
      this.materialList = list;
      wx.hideLoading();
    } else {
      wx.hideLoading();
    }

    wx.stopPullDownRefresh();
    this.materialList.forEach((element, idx) => {
      this.materialList[idx].dynamic_images = JSON.parse(
        this.materialList[idx].dynamic_images
      );
    });
    this.$apply();
  }
  //获取新闻列表
  async getNewsList() {
    const res = await shttp
      .get(`/api/v2/member/information`)
      .query({
        limit: 4,
        page: 1
      })
      .end();
    if (res.status === 0) {
      res.data.forEach((element, idx) => {
        element.information_image = JSON.parse(element.information_image);
        element.addtime = getTimes.formatTime(
          element.addtime * 1000,
          "Y-M-D h:m:s"
        );
      });
      this.newsList = res.data;

      wx.hideLoading();
    } else {
      wx.hideLoading();
    }
    wx.stopPullDownRefresh();
    this.$apply();
  }
  onShareAppMessage() {
    let path = "/pages/home";
    return {
      title: "",
      path: `/pages/authorization?path=${path}`,
      success: function(res) {
        wx.showToast({
          title: "转发成功",
          icon: "success",
          duration: 2000
        });
      },
      fail: function(res) {
        console.log("fail");
      }
    };
  }
  //下拉刷新
  onPullDownRefresh() {
    this.getRecommendList();
    this.getbannerList();
    this.getNewsList();
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
