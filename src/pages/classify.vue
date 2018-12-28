<style scoped>
page {
  background: #fff;
}
.container {
  height: 100%;
  font: 28rpx PingFang-SC-Medium;
}

.wrap {
  display: flex;
  margin-top: 96rpx;
}
.wrap .class_list {
  position: fixed;
  z-index: 9;
  left: 0;
  top: 96rpx;
  width: 170rpx;
  height: 100%;
  text-align: center;
  overflow-y: scroll;
  overflow-x: hidden;
  flex-shrink: 0;
  text-align: center;
  box-sizing: border-box;
  border-right: 1rpx solid #eeeeee;
}
.wrap .class_list .class_item {
  line-height: 54rpx;
  height: 54rpx;
  color: #222222;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 25rpx 0;
}
.wrap .class_list .sel {
  border-left: solid 6px #f17f30;
  background: #fff;
  color: #f17f30;
}
.wrap .content_wrap {
  width: 578rpx;
  margin-left: 170rpx;
}
.wrap .content_wrap .row {
  width: 578rpx;
  padding: 0rpx 26rpx;
  height: 200rpx;
  font-size: 28prx;
  display: flex;
  overflow: hidden;
  align-items: center;
}
.wrap .content_wrap .row .goodimg {
  width: 164rpx;
  height: 164rpx;
  border-radius: 5rpx;
  margin-right: 20rpx;
}
.wrap .content_wrap .row .goodsInfo {
  height: 200rpx;
  width: 350rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1rpx solid #eeeeee;
  padding-top: 20rpx;
  padding-bottom: 10rpx;
}
.wrap .content_wrap .row .goodsInfo .goodsname {
  color: #222;
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 28rpx;
}
.price_box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wrap .content_wrap .row .goodsInfo .price_box .price {
  font-size: 32rpx;
  color: #ff4444;
}
.price_boxIcon {
  width: 50rpx;
  height: 50rpx;
  padding-left:50rpx;
}
.search {
  height: 96rpx;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-bottom: 1rpx solid #eee;
}
.search .search_content {
  display: flex;
  align-items: center;
  width: 690rpx;
  height: 60rpx;
  border-radius: 10rpx;
  color: #666;
  background: #ededed;
}
.search .search_content image {
  width: 23rpx;
  height: 25rpx;
  margin-left: 31rpx;
  margin-right: 2%;
}
</style>

<template>
  <view class="container">
    <view class="search">
      <navigator url="./article/search" class="search_content">
        <image src="../images/icon_sousuo@2x.png" class="iconfont icon-search">
        <text>搜索商品</text>
      </navigator>
    </view>
    <view class="wrap">
      <view class="class_list">
        <repeat for="{{classList}}" index="index" item="item">
          <view
            class="class_item {{ checkedList[index] ? 'sel' : '' }}"
            @tap="getTwo({{index}})"
          >{{item.storegc_name}}</view>
        </repeat>
      </view>
      <view class="content_wrap">
        <repeat for="{{goodsList}}" index="index" item="item" wx:if="{{!is_empty}}">
          <view class="row" @tap="intoDetail({{item.goods_commonid}})">
            <image class="goodimg" mode="aspectFill" src="{{item.goods_image}}">
            <view class="goodsInfo">
              <text class="goodsname">{{item.goods_name}}</text>
              <view class="price_box">
                <view class="price"><text style="font-size:26rpx;">￥</text>{{item.goods_price}}</view>
                <image @tap.stop='addCar({{item.goods_commonid}})' class="price_boxIcon" src="../images/icon_gouwuche@2x.png">     
              </view>
            </view>
          </view>
        </repeat>
        <placeholder :show.sync="is_empty" message="还没有相关的内容"></placeholder>
      </view>
    </view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../utils/http";
import Placeholder from "../components/placeholder";
export default class Classify extends wepy.page {
  config = {
    navigationBarTitleText: "分类"
  };
  data = {
    // 一级列表
    classList: [],
    //选中效果
    checkedList: [],
    //二级的标题
    title: "",
    //二级的商品列表
    goodsList: [],
    //当前页面
    page: 1,
    //当前一级类id
    topId: "",
    is_empty: false
  };
  components = {
    placeholder: Placeholder
  };
  computed = {
    //更新视图
    updateTitle() {
      return this.title;
    }
  };
  methods = {
    //进入商品详情
    intoDetail(id) {
      // console.log("商品id=>"+id)
      wx.navigateTo({
        url: `./store/goodsDetails?goods_commonid=${id}`
      });
    },
    //获取二级商品
    getTwo(idx) {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });
      this.page = 1;
      this.goodsList = [];
      wx.showLoading({
        title: "加载中"
      });
      this.checkedList.forEach((v, i) => (this.checkedList[i] = false));
      this.checkedList[idx] = true;
      this.title = this.classList[idx].storegc_name;
      this.topId = this.classList[idx].storegc_id;
      this.getGoods();
    },
    addCar(id){
    console.log(id);
    }
  };
  async getGoods() {
    const res = await shttp
      .get(`/api/v2/member/goodscommon?store_id=1`)
      .query({
        gc_id: this.topId,
        type: "sort",
        page: this.page,
        limit: 10
      })
      .end();
    if (res.status === 0 && res.data.length != 0) {
      this.goodsList = this.goodsList.concat(res.data);
    }
    if (this.goodsList.length == 0) {
      this.is_empty = true;
    } else {
      this.is_empty = false;
    }
    wx.hideLoading();
    this.$apply();
  }

  async onLoad() {
    wx.showLoading({
      title: "加载中"
    });
    //获取一级分类
    this.getRootCateTopLevel();
  }
  async getRootCateTopLevel() {
    wx.showLoading({
      title: "加载中"
    });
    this.classList = [];
    this.checkedList = [];
    this.page = 1;
    let res = await shttp.get(`/api/v2/member/storegc/1`).end();
    if (res.status === 0) {
      res.data.forEach((v, i) => {
        this.classList.push(v);
        this.checkedList[i] = false;
      });
      this.checkedList[0] = true;
      this.title = this.classList[0].storegc_name;
      this.topId = this.classList[0].storegc_id;
      this.getGoods();
    }

    wx.hideLoading();
    this.$apply();
  }
  //上拉加载更多
  onReachBottom() {
    this.page = this.page + 1;
    //获取视频列表
    this.getGoods();
  }
}
</script>

