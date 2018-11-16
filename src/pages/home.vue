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

.search {
  overflow: hidden;
  height: 108rpx;
  font: 28rpx PingFang-SC-Medium;
  color: #969696;
  background: #fff;
  text-align: center;
}
.search .search_content {
  width: 690rpx;
  line-height: 68rpx;
  margin: 20rpx auto;
  border-radius: 34rpx;
  background: #f2f2f2;
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
  background: #f4f4f4;
  width: 100%;
  overflow: hidden;
  min-height: calc(100% - 150rpx);
}

.search {
  height: 88rpx;
}
.search .search_content {
  display: flex;
  align-items: center;
  width: 690rpx;
  height: 60rpx;
  border-radius: 30rpx;
  background: #f7f7f7;
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
  height: 160rpx;
  margin-bottom: 20rpx;
}
.tap_item .item_page {
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 15rpx;
}
.tap_item .item_view {
  font-size: 24rpx;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  color: #222222;
  display: flex;
  flex-flow: column nowrap;
}

.good_title {
  width: 100%;
  height: 38rpx;
  background: #fff;
  padding: 35rpx 0rpx;
  justify-content: space-between;
  align-items: center;
  display: flex;
}
.good_title .name {
  border-left: solid 6rpx #fc5a4f;
  width: 50%;
  margin-left: 30rpx;
  align-items: center;
  display: flex;
  padding-left: 25rpx;
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
  font-size: 32rpx;
  height: 32rpx;
  line-height: 32rpx;
}
.good_title .more {
  font-size: 32rpx;
  color: #c7c7c7;
  margin-right: 8rpx;
}
.good_title .icon_R {
  width: 16rpx;
  height: 28rpx;
}

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
  width: 345rpx;
  height: 480rpx;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 10rpx 10rpx 0 0;
  margin-right: 20rpx;
  margin-bottom: 19rpx;
  border: solid 1px #f6f6f6;
}
.bodycontent .title_page {
  width: 100%;
  height: 350rpx;
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
  height: 175rpx;
  width: 95%;
  display: flex;
  align-items: center;
  border: none;
  border-radius: none;
  border-bottom: solid 1px #f6f6f6;
}
.bodycontent .news_redlist .redinfo {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  height: 100%;
  position: relative;
  justify-content: space-between;
  padding: 14rpx 14rpx;
}
.bodycontent .news_redlist .title_page {
  width: 234rpx;
  height: 150rpx;
  border-radius: 10rpx;
}
.bodycontent .news_redlist .price {
  color: #a9a9a9;
  font-size: 26rpx;
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
  height: 130rpx;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 14rpx 21rpx 11rpx;
}

.prdname {
  color: #666666;
  width: 100%;
  font-size: 28rpx;
  height: 48rpx;
  line-height: 48rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>

<template>
  <view class="container">
        <view class="search">
          <navigator url="./article/search" class="search_content" >
          <image src='../images/icon_sousuo@2x.png' class="iconfont icon-search" mode='aspectFill' /> 
          <text>搜索商品</text>
          </navigator>
      </view>
      <swiper class="swiper"  indicator-active-color="{{indicatorActiveColor}}" indicator-color="{{indicatorColor}}" indicator-dots="{{indicatorDots}}" autoplay="{{autoplay}}" interval="{{interval}}"  duration="{{duration}}"  circular="true">
            <repeat for="{{bannerList}}" key="index" index="index" item="item">   
          <swiper-item>
            <image src="{{item.banner_pic}}"  mode="aspectFill" @tap="swipclick({{item}})"/>
          </swiper-item>
            </repeat> 
      </swiper>
      <view class="tap_item">
        <navigator class="item_view" url="./store/more">
           <image class="item_page" src="../images/home_btn_anlizhanshi@2x.png" ></image> 
           <view>案例展示</view>
        </navigator>
        <navigator class="item_view" url="./article/advisory">
           <image class="item_page" src="../images/home_btn_xinwenzixun@2x.png" ></image> 
           <view>新闻资讯</view>
        </navigator>
        <navigator class="item_view" url="./article/aboutUs">
           <image class="item_page" src="../images/home_btn_xunjiayuyue@2x.png" ></image> 
           <view>关于云仓</view>
        </navigator>
      </view>
   
      <view>
        <view class="good_title">
            <view class="name">
               <text class="new_good">热门推荐</text>
            </view>
          <!-- <navigator class="icon_info" url="{{'./store/more?moreId='+item.indexclass_id}}">
            <text class="more">更多</text>
          <image class="icon_R" src="../images/icon_you@2x.png"></image>
         </navigator> -->
       </view>
       <view class="bodycontent">
        <repeat for="{{goodsList}}" key="index" index="index" item="item">   
         <view class="redlist"  @tap="intoDetail({{item.goods_commonid}})"> 
             <image class="title_page"  mode="aspectFill" src="{{item.goods_image}}" ></image>  
            <view class="redinfo add_redinfo">
              <text class="prdname">{{item.goods_name}}</text>
              <view class="price">
                ￥{{item.goods_price}}/天
            </view>
            </view>
        </view>
       </repeat> 
      </view>
      </view>
   
      <!-- 案例展示开始 -->
       <view>
        <view class="good_title">
            <view class="name">
               <text class="new_good">案例展示</text>
            </view>
          <navigator class="icon_info" url="./store/more">
            <text class="more">更多</text>
          <image class="icon_R" src="../images/icon_you@2x.png"></image>
         </navigator>
       </view>
       <view class="bodycontent">
        <repeat for="{{materialList}}" key="index" index="index" item="item">   
         <view class="redlist case_redlist" @tap="gotoCase({{item.dynamic_id}})"  > 
             <image class="case_title_page" src="{{item.dynamic_images[0].url}}" ></image>  
            <view class="redinfo">
              <text class="prdname">{{item.dynamic_title}}</text>
            </view>
         </view>
       </repeat> 
       </view>
     </view>
     
        <!-- 案例展示结束 -->
        <!-- 新闻资讯开始 -->
     <view>
        <view class="good_title">
            <view class="name">
               <text class="new_good">新闻资讯</text>
            </view>
          <navigator class="icon_info" url="./article/advisory">
            <text class="more">更多</text>
          <image class="icon_R" src="../images/icon_you@2x.png"></image>
         </navigator>
       </view>
       <view class="bodycontent">
        <repeat for="{{newsList}}" key="index" index="index" item="item">   
         <view class="redlist news_redlist"  @tap="gotoNews({{item.dynamic_id}})"> 
             <image class="title_page" src="{{item.dynamic_images[0].url}}"></image>  
            <view class="redinfo">
              <text class="prdname">{{item.dynamic_title}}</text>
              <view class="num_info">
                  <text class="price">{{item.dynamic_created_at}}</text>
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
import { showSuccessToast, showFailToast, exploitToast } from "../utils/tools";
export default class Home extends wepy.page {
  config = {
    enablePullDownRefresh: true,
    navigationBarTitleText: "首页"
  };
  data = {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 200,
    indicatorActiveColor: "#333333",
    indicatorColor: "#FFFFFF", //以上为轮播配置
    bannerList: [], //轮播图
    goodsList: [], //商品列表
    materialList: [], //案例列表
    newsList: [] //新闻列表
  };

  components = {};

  onLoad(options) {
    wx.showLoading({
      title: "加载中"
    });
    this.getbannerList();
    this.getRecommendList();
    this.getMaterialList();
    this.getNewsList();
  }

  onShow() {

  }

  methods = {
    //进入商品详情
    intoDetail(id) {
      // console.log(id)
      wx.navigateTo({
        url: `store/goodsDetails?goods_commonid=${id}`
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
      let imgurl = e.banner_url;
      console.log(imgurl);
      if (imgurl) {
        wx.navigateTo({
          url: `./article/advertisingPage?imgurl=${imgurl}`
        });
      }
    }
  };

  //获取轮播图
  async getbannerList() {
    const res = await shttp
      .get(`/api/v2/member/banner`)
      .query({
        banner_type: "firstPic"
      })
      .end();
    this.bannerList = res.data;
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
  //获取热门推荐列表
  async getRecommendList() {
    let list = [];
    const res = await shttp
      .get(`/api/v2/member/goodscommon`)
      .query({
        store_id: 1,
        goods_commend: 1
      })
      .end();
    list = res.data;

    if (res.status === 0) {
      if (list.length > 6) {
        this.goodsList = list.slice(0, 6);
      } else {
        this.goodsList = list;
      }
      wx.hideLoading();
    } else {
      wx.hideLoading();
    }
    wx.stopPullDownRefresh();
    console.log("推荐商品列表");
    console.log(this.goodsList);
    this.$apply();
  }
  //获取案例列表
  async getMaterialList() {
    const res = await shttp
      .get(`/api/v2/member/dynamic`)
      .query({
        dynamic_type: "material"
      })
      .end();
    let list = res.data;
    if (res.status === 0) {
      if (list.length > 4) {
        this.materialList = list.slice(0, 4);
      } else {
        this.materialList = list;
      }
      wx.hideLoading();
    } else {
      wx.hideLoading();
    }
    wx.stopPullDownRefresh();
    console.log("案例列表");
    this.materialList.forEach((element, idx) => {
      this.materialList[idx].dynamic_images = JSON.parse(
        this.materialList[idx].dynamic_images
      );
    });
    console.log(this.materialList);

    this.$apply();
  }
  //获取新闻列表
  async getNewsList() {
    const res = await shttp
      .get(`/api/v2/member/dynamic`)
      .query({
        dynamic_type: "news"
      })
      .end();
    let list = res.data;
    if (res.status === 0) {
      if (list.length > 4) {
        this.newsList = list.slice(0, 4);
      } else {
        this.newsList = list;
      }
      wx.hideLoading();
    } else {
      wx.hideLoading();
    }
    wx.stopPullDownRefresh();

    console.log("新闻列表");
    this.newsList.forEach((element, idx) => {
      this.newsList[idx].dynamic_images = JSON.parse(
        this.newsList[idx].dynamic_images
      );
      this.newsList[idx].dynamic_created_at = getTimes.formatTime(
        this.newsList[idx].dynamic_created_at * 1000,
        "Y-M-D h:m:s"
      );
    });
    console.log(this.newsList);

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
  }
}
</script>
