<style scoped>

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
  /* min-height: calc(100% - 150rpx); */
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
  /* margin-bottom: 20rpx; */
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
  border-left: 8rpx solid #4fb84a;
  box-sizing: border-box;
  padding-left: 20rpx;

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
  color: #dd3d27;
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
  font-size: 26rpx;
  display: flex;
  align-items: center;
}
.viewX-originalPrice {
  color: #222;
  font-size: 26rpx;
}
.viewX-itemIcon {
  width: 40rpx;
  height: 40rpx;
  margin-left: 20rpx;
}
.coupons-item {
  width: 230rpx;
  height: 134rpx;
  margin-left: 10rpx;
  display: inline-block;
  position: relative;
}
.coupons-itemImg {
  width: 230rpx;
  height: 134rpx;
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
  font-size: 24rpx;
}
.coupons-txt3 {
  font-size: 20rpx;
}
.goToVipDetails{
  text-align:center;
  position:relative;
  width:100%;
  padding:0 47rpx;
  box-sizing:border-box;
}
.goToVipDetails .bgImg{
  width: 656rpx;
  height: 156rpx;
  
}
.goToVipDetails .vImg{
  width:174rpx;
  height:184rpx;
  position:absolute;
  right:110rpx;
  top:-5rpx;
}
.goToVipDetails text{
  color: #fff;
  position: absolute;
  left: 106rpx;
  font-weight: normal;
}
.goToVipDetails text:first-child{
  font-size: 44rpx;
  top: 36rpx;
  letter-spacing: 4px;
}
.goToVipDetails text:nth-child(2){
  font-size: 24rpx;
  top: 94rpx;
}
.countDown-box {
  position: absolute;
  height: 50rpx;
  width: 100%;
  top: 285rpx;
  left: 0;
  z-index: 9;
  background: rgba(79, 184, 74, 0.7);
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
  color: #4fb84a;
  text-align: center;
  line-height: 26rpx;
  margin: 0 6rpx;
  font-size: 20rpx;
}

.coupon_wrap{
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
}
.coupon_main{
  flex-shrink: 0;
  width: 192rpx;
  text-align: center;
}
.coupon_price_wrap{
  margin: 10rpx 0 0;
  font-size: 32rpx;
}
.coupon_price{
  font-size: 60rpx;
}
.coupon_vice{
  width: 36rpx;
  margin: 20rpx 0 0;
  font-size: 24rpx; 
  white-space: normal;
}

.recommond_price{
  font-size: 32rpx;
}

.company_list_wrap{
  padding: 20rpx 40rpx 20rpx 20rpx;
}

.material_title{
  margin: 20rpx 0 0;
  height: 32rpx; 
  font-size: 28rpx;
  line-height: 1.2;
}

.countDown_day{
  line-height: 26rpx;
}

.s_fc_1{ color: #fff; }
.s_fc_2{ color: #dd3d27; }
.s_fc_3{ color: #222; }

.s_bg_1{ background: #fff; }
</style>

<template>
  <view class="container">
    <view class="search">
      <navigator url="./article/search" class="search_content">
        <image src="../images/icon_sousuo@2x.png" class="iconfont icon-search" mode="aspectFill" />
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
      <navigator class="item_view" url="./store/goodsList?type=bargain">
        <image class="item_page" src="../images/icon_1_kanjia@2x.png">
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
      <navigator class="item_view" url="./article/bussiness_main">
        <image class="item_page" src="../images/icon_1_zhaoshang@2x.png">
        <view>招商</view>
      </navigator>
      <navigator class="item_view" url="./article/aboutUs">
        <image class="item_page" src="../images/icon_1_zixun@2x.png">
        <view>关于</view>
      </navigator>
    </view>

    <view url="" @tap='goVip'>
      <view class="goToVipDetails">
        <text>VIP商城</text>
        <text>成为会员尊享独立名片商城</text>
        <image class="bgImg" src = "../images/home/vip_bg.png"/>
        <image class="vImg" src = "../images/home/vip.png"/>
      </view>
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
            <image class="coupons-itemImg" src="{{item.fetch_states==2?'../images/coupon/thumbnail.png':'../images/coupon/thumbnail.png'}}">
            <view class='coupon_wrap s_fc_1'>
              <view class="coupon_main">
                <view class="coupon_price_wrap">￥<text class='coupon_price'>{{item.vouchertemplate_price}}</text></view>
                <view class="coupons-txt2">满{{item.vouchertemplate_limit}}可用</view>
                <!-- <view class="coupons-txt3">{{item.vouchertemplate_startdate}} ~ {{item.vouchertemplate_enddate}}</view> -->
              </view>
              <view class='coupon_vice'>优惠券</view>
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
                <view class="recommond_price s_fc_2">
                  <text style='font-size: 26rpx;' wx:if="{{!item.is_vip}}">¥</text>
                  {{item.price1}}<text style="font-size:26rpx;" wx:if="{{item.price2}}">.{{item.price2}}</text>
                  <text wx:if="{{item.is_vip}}">德分</text>
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
                <text>￥</text>
                <text style='font-size: 32rpx;'>{{item.originPrice1}}</text>.
                <text>{{item.originPrice2}}</text>
              </view>
              <view class="viewX-price">
                <view>
                  <text>￥</text>
                  <text style='font-size: 32rpx;'>{{item.price1}}</text>.
                  <text>{{item.price2}}</text>
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
                  <text class='countDown_day'>还剩{{wxTimerList[index].d!=0?wxTimerList[index].d+'000天':''}} </text>
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
                  <!-- <text style="font-size:26rpx;color:#0f0f0f;text-decoration: line-through;">￥{{item.goods.goods_price}}</text> -->
                  <text style="font-size:26rpx;">￥</text>{{item.goods_price}}
                </view>
              </view>
          </view>
        </repeat>
      </view>
    </view>

    <!-- company -->
    <view class='s_bg_1' wx:if="{{companyList.length}}">
      <navigator url="./article/advisory?classify_id=1">
        <view class="good_title">
          <view class="name">
            <text class="new_good">公司新闻</text>
          </view>
          <view class="icon_info">
            <text class="more">更多</text>
            <image class="icon_R" src="../images/icon_you@2x.png">
          </view>
        </view>
      </navigator>
      <view class='company_list_wrap'>
        <repeat for='{{companyList}}'>
          <companyNews classify='1' :info.sync='item' @click.user='gotoCase'></companyNews>
        </repeat>
      </view>
    </view>

    <!-- profession  -->
    <view class='s_bg_1' wx:if="{{professionList.length}}">
      <navigator url="./article/advisory?classify_id=2">
        <view class="good_title">
          <view class="name">
            <text class="new_good">行业动态</text>
          </view>
          <view class="icon_info">
            <text class="more">更多</text>
            <image class="icon_R" src="../images/icon_you@2x.png">
          </view>
        </view>
      </navigator>
      <view class='company_list_wrap'>
        <repeat for='{{professionList}}'>
          <professionNews classify='2' :info.sync='item' @click.user='gotoCase'></professionNews>
        </repeat>
      </view>
    </view>

    <!-- 产品案例 -->
    <view wx:if="{{materialList.length}}">
      <navigator url="./article/advisory?classify_id=3">
        <view class="good_title">
          <view class="name">
            <text class="new_good">产品案例</text>
          </view>
          <view class="icon_info">
            <text class="more">更多</text>
            <image class="icon_R" src="../images/icon_you@2x.png">
          </view>
        </view>
      </navigator>
      <view class="bodycontent">
        <repeat for="{{materialList}}" key="index" index="index" item="item">
          <view class="redlist case_redlist" @tap="gotoCase({{item.information_id}}, 3)">
            <image class="case_title_page" src="{{item.information_image}}" mode="aspectFill">
              <view class="redinfo">
                <view class="material_title s_fc_3">{{item.information_title}}</view>
              </view>
          </view>
        </repeat>
      </view>
    </view>

    <!-- 合作案例 -->
    <view wx:if="{{cooperateList.length}}">
      <navigator url="./article/advisory?classify_id=4">
        <view class="good_title">
          <view class="name">
            <text class="new_good">合作案例</text>
          </view>
          <view class="icon_info">
            <text class="more">更多</text>
            <image class="icon_R" src="../images/icon_you@2x.png">
          </view>
        </view>
      </navigator>
      <view class="bodycontent">
        <repeat for="{{cooperateList}}" key="index" index="index" item="item">
          <view class="redlist case_redlist" @tap="gotoCase({{item.information_id}}, 4)">
            <image class="case_title_page" src="{{item.information_image}}" mode="aspectFill">
              <view class="redinfo">
                <view class="material_title s_fc_3">{{item.information_title}}</view>
              </view>
          </view>
          
        </repeat>
      </view>
    </view>

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
import news from '../components/news_thumbnail';

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
    couponList: [], //优惠券
    groupGoodsList: [], //团购商品列表
    bargainList: [],
    seckillList: [],
    companyList: [],
    professionList: [],
    materialList: [], //案例列表
    cooperateList: [],
    memberinfo: null,
  };

  components = {
    companyNews: news,
    professionNews: news,
  };

  onLoad(options) {}

  onShow() {
    wx.showLoading({ title: "加载中" });

    this.getbannerList();
    this.getRecommendList();
    this.getCouponList();
    this.getGroupList();
    this.getBargain();
    this.getSeckill();
    this.getCompanyLst();
    this.getProfessionList();
    this.getMaterialList();
    this.getcooperateList();

    this.getUserInfo();
  }

  methods = {
    goVip(){
      let url = `/pages/vip/vipDetails`;

      if(this.memberInfo.inviter_id != 0) return wx.showModal({ content: '已绑定上级, 不能重复绑定!', showCancel: false, });

      wx.navigateTo({ url });
    },
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
    gotoCase(id, classify_id) {
      let url = `/pages/article/advisoryDetail?id=${id}&classify_id=${classify_id}`;

      wx.navigateTo({ url });
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
    let param = { store_id: 1, limit: 4, page: 1 };

    const res = await shttp.get(`/api/v2/member/coupon/search`).query(param).end(); 
    if (res.status == 0) {
      res.data.forEach(v => {

      });
      this.couponList = res.data;
    }
    this.$apply();
  }
  //获取热门推荐列表
  async getRecommendList() {
    let param = { 
          store_id: 1,
          goods_commend: 1,
          type: "sort",
          limit: 4,
          page: 1
        };

    const res = await shttp.get(`/api/v2/member/goodscommon`).query(param).end();

    if (res.status === 0) {
      res.data.forEach(v => {
        let arr = String(v.goods_price).split('.');
        v.price1 = arr[0];
        v.price2 = arr[1];
      });

      this.goodsList = res.data;
    }

    wx.hideLoading();
    wx.stopPullDownRefresh();
    this.$apply();
  }

  //获取团购商品列表
  async getGroupList() {
    let param = { store_id: 1, limit: 4, page: 1, rule_commend: 1 };

    const res = await shttp.get(`/api/v2/member/goodsgroupbuy/1/edit`).query(param).end();
    if (res.status === 0 && res.data) {
      res.data.forEach(v => {
        let arr = String(v.goods_price).split('.');
        v.price1 = arr[0];
        v.price2 = arr[1];
        
        arr = String(v.goods.goods_price).split('.');
        v.originPrice1 = arr[0];
        v.originPrice2 = arr[1];
      });

      this.groupGoodsList = res.data;
    }
    this.groupGoodsList = [];

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
      res.data = res.data === null ? [] : res.data;
      
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
  
  //获取公司资讯
  async getCompanyLst() {
    let param = { limit: 4, page: 1, classify_id: 1 };

    const res = await shttp.get(`/api/v2/member/information`).query(param).end();
    if (res.status === 0) {
      res.data.forEach((element, idx) => {
        element.addtime = getTimes.formatTime(
          element.addtime * 1000,
          "Y-M-D h:m:s"
        );
      });
      this.companyList = res.data;

      wx.hideLoading();
    } else {
      wx.hideLoading();
    }

    wx.stopPullDownRefresh();
    this.$apply();
  }
  
  // 行业资讯
  async getProfessionList() {
    let param = { limit: 4, page: 1, classify_id: 2 };

    const res = await shttp.get(`/api/v2/member/information`).query(param).end();
    if (res.status === 0) {
      res.data.forEach((element, idx) => {
        element.addtime = getTimes.formatTime(
          element.addtime * 1000,
          "Y-M-D h:m:s"
        );
      });
      this.professionList = res.data;

      wx.hideLoading();
    } else {
      wx.hideLoading();
    }

    wx.stopPullDownRefresh();
    this.$apply();
  }

  //获取产品案例
  async getMaterialList() {
    let param = { limit: 4, page: 1, classify_id: 3 };

    const res = await shttp.get(`/api/v2/member/information`).query(param).end();
    if (res.status === 0) {
      res.data.forEach((element, idx) => {
        element.addtime = getTimes.formatTime(
          element.addtime * 1000,
          "Y-M-D h:m:s"
        );
      });
      this.materialList = res.data;

      wx.hideLoading();
    } else {
      wx.hideLoading();
    }

    wx.stopPullDownRefresh();
    this.$apply();
  }
  //获取合作案例
  async getcooperateList() {
    let param = { limit: 4, page: 1, classify_id: 4 };

    const res = await shttp.get(`/api/v2/member/information`).query(param).end();
    if (res.status === 0) {
      res.data.forEach((element, idx) => {
        element.addtime = getTimes.formatTime(
          element.addtime * 1000,
          "Y-M-D h:m:s"
        );
      });
      this.cooperateList = res.data;

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
    this.getbannerList();
    this.getRecommendList();
    this.getCouponList();
    this.getGroupList();
    this.getSeckill();
    this.getBargain();
    this.getcooperateList();
    this.getProfessionList();
    this.getMaterialList();
    this.getCompanyLst();
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

  async getUserInfo(){
    let param = {};

    let res = await shttp.get(`/api/v2/member/memberinfo`).query(param).end();

    if(res && res.data){
      let name = res.data.wx_name;
      console.error(name, 'abca'.replace(/a/g, function(v1, v2, v3, v4, v5){
        console.error('match: ', `${v1}-${v2}-${v3}-${v4}-${v5}`);
        return v1;
      }));

      // console.error('abca'.match());
      wx.setStorageSync('memberInfo', res.data);
    }

    this.memberInfo = wx.getStorageSync("memberInfo");
    this.$apply();
  }

}
</script>
