<style>
page {
  background: #fff;
}
</style>
<style scoped>
.container {
  height: 100%;
  background: #fff;
  font: 28rpx PingFang-SC-Medium;
}

.wrap {
  display: flex;
  margin-top: 96rpx;
  background: #fff;
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
  background: #fff;
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
  margin-left: 170rpx;
}
.wrap .content_wrap .row {
  /* width: 578rpx; */
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
  padding-left: 50rpx;
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
.standard-box {
  position: fixed;
  z-index: 99999;
  height: 100vh;
  background: rgba(1, 1, 1, 0.3);
  width: 100%;
  top: 0;
  left: 0;
}
.product {
  position: absolute;
  background: #fff;
  height: 540rpx;
  bottom: 0;
  left: 0;
  width: 100%;
}
.product .base_info {
  position: absolute;
  display: flex;
  padding: 0 30rpx;
  top: -38rpx;
  width: 100%;
  height: 180rpx;
}
.product .base_info image {
  width: 180rpx;
  height: 180rpx;
  margin-right: 23rpx;
  border-radius: 20rpx;
}
.product .base_info .product_standard {
  font-size: 24rpx;
  color: #636363;
}
.delete-btn {
  position: absolute;
  width: 28rpx;
  height: 28rpx;
  padding: 30rpx;
  top: 0;
  right: 0;
  background: #fff;
  border-radius: 50%;
}
.product .standard_wrap {
  background: #fff;
  margin-top: 188rpx;
}
.product .standard_wrap .standard_title {
  margin: 0 30rpx 30rpx;
  color: #222;
  font-size: 28rpx;
}
.product .standard_wrap .standard_info {
  display: flex;
  padding-left: 30rpx;
}
.product .standard_wrap .standard_info .checked {
  color: #fff;
  background: #f17f30;
}
.product .standard_wrap .standard_info view {
  margin: 0 40rpx 30rpx 0;
  padding: 7rpx 25rpx;
  border-radius: 5rpx;
  border: solid 1rpx #d3d3d3;
  font-size: 28rpx;
  color: #333333;
}
.product .row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.product .row .number_title {
  margin: 36rpx 30rpx;
  color: #222;
  font-size: 28rpx;
}
.product .row .number_wrap {
  display: flex;
  margin-right: 30rpx;
  height: 64rpx;
  border: solid 1rpx #d3d3d3;
  border-radius: 5rpx;
}
.minus,
.add {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 82rpx;
}
.minus-bg {
  background-color: #f8f8f8;
}
.icon_minus {
  width: 19rpx;
  height: 2rpx;
}
.icon_add {
  width: 20rpx;
  height: 20rpx;
}
.number {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26rpx;
  width: 80rpx;
  color: #333;
  border-left: 1rpx solid #d3d3d3;
  border-right: 1rpx solid #d3d3d3;
}

.bottom_bar {
  position: fixed;
  bottom: 0rpx;
  display: flex;
  width: 100%;
  background: #fff;
  height: 104rpx;
}
.add_btn {
  position: absolute;
  width: 100%;
  text-align: center;
  height: 76rpx;
  line-height: 76rpx;
  margin-right: 20rpx;
  background: #f17f30;
  color: #fff;
  bottom: 0;
}
.product_name {
  font-size: 32rpx;
  color: #333333;
  margin-right: 12rpx;
  margin-top: 60rpx;
  margin-bottom: 20rpx;
}
.product_price {
  font-size: 40rpx;
  color: #dd3d27;
  margin-right: 12rpx;
}
.empty-placeholder {
  margin-left: 120rpx;
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
                <view class="price">
                  <text style="font-size:26rpx;">￥</text>
                  {{item.goods_price}}
                </view>
                <image
                  @tap.stop="addCar({{item.goods_commonid}})"
                  class="price_boxIcon"
                  src="../images/icon_gouwuche@2x.png"
                >
              </view>
            </view>
          </view>
        </repeat>
        <placeholder :show.sync="is_empty" message="还没有相关的内容"></placeholder>
      </view>
    </view>
    <view wx:if="{{showStandard}}" class="standard-box">
      <view class="product">
        <view class="base_info">
          <image src="{{goods.goods_image}}" mode="aspectFill">
          <view>
            <view class="product_name">{{goods.goods_name}}</view>
            <view class="product_price">
              <text style="font-size:28rpx">¥</text>
              {{goods.goods_price}}
            </view>
            <!-- <view class>库存：{{goods.goods_storage}}</view> -->
          </view>
        </view>
        <image class="delete-btn" src="../images/icon_cha@2x.png" @tap="deleteBtn">
        <view class="standard_wrap">
          <view class="standard_title">规格</view>
          <view class="standard_info">
            <repeat for="{{standards}}" index="index" item="item">
              <view class="{{isChecked==index?'checked':''}}" @tap="checked({{index}})">{{item}}</view>
            </repeat>
          </view>
        </view>
        <view class="row">
          <view class="number_title">购买数量</view>
          <view class="number_wrap">
            <view class="minus {{getSize==1?'minus-bg':''}}" @tap="minus">
              <image class="icon_minus" src="../images/icon_jian@2x.png">
            </view>
            <view class="number">{{getSize}}</view>
            <view class="add" @tap="add">
              <image class="icon_add" src="../images/icon_jia@2x.png">
            </view>
          </view>
        </view>
        <view class="add_btn" @tap="addShoppingCart()">加入购物车</view>
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
    is_empty: false,
    showStandard: false,
    // 规格列表
    standards: [],
    //
    isChecked: null,
    // 数量
    size: 1,
    //商品详情
    goods: {}
  };
  components = {
    placeholder: Placeholder
  };
  computed = {
    getSize: () => this.size,
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
    addCar(id) {
      this.goodsDetails(id);
      console.log(id);
    },
    deleteBtn() {
      this.showStandard = false;
    },
    checked: index => {
      this.isChecked = index;
      this.goods.standard = this.standards[index];
      this.goods.goods_storage = this.goods.SKUList[index].goods_storage;
      this.goods.goods_price = this.goods.SKUList[index].goods_price;
      this.goods.goods_id = this.goods.SKUList[index].goods_id;
      this.goods.goods_num = this.size;
      this.goods.goods_freight = this.goods.SKUList[index].goods_freight;
      this.$apply();
    },
    minus() {
      if (this.size === 1) {
        return;
      }
      this.size--;
      this.goods.goods_num = this.size;
      this.$apply();
    },
    add() {
      this.size++;
      if (this.size > this.goods.goods_storage) {
        this.size--;
        return wx.showToast({
          title: "库存不足",
          icon: "none",
          duration: 1000
        });
      }

      this.goods.goods_num = this.size;
      this.$apply();
    }
  };
  //商品详情
  async goodsDetails(id) {
    const res = await shttp.get(`/api/v2/member/goodscommon/${id}`).end();
    this.goods = res.data;
    this.goods.goods_salenum = this.goods.SKUList[0].goods_salenum;
    this.goods.goods_storage = this.goods.SKUList[0].goods_storage;
    if (res.data.spec_value) {
      this.standards = res.data.spec_value;
    } else {
      this.standards = ["统一规格"];
    }
    this.showStandard = true;
    wx.hideLoading();
    this.$apply();
  }
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

  onLoad() {}
  onShow() {
    this.page = 1;
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
    this.goodsList = [];
    this.page = 1;
    let res = await shttp.get(`/api/v2/member/storegc/1`).end();
    if (res.status === 0 && res.data.length != 0) {
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
  async addShoppingCart() {
    if (!this.goods.standard) {
      return this.goStandard();
    }
    if (this.goods.goods_storage < 1) {
      return wx.showToast({
        title: "库存不足",
        icon: "none",
        duration: 1000
      });
    }
    console.log(this.goods);

    const res = await shttp
      .post("/api/v2/member/cart")
      .send({
        goods_id: this.goods.goods_id,
        quantity: this.goods.goods_num || 1
      })
      .end();
    if (res.data.cart_num) {
      this.showStandard = false;
      wx.showToast({
        title: "成功加入购物车",
        icon: "success",
        duration: 1000
      });
    } else {
      return wx.showToast({
        title: res.error,
        icon: "none",
        duration: 1000
      });
    }
    this.$apply();
  }
  goStandard() {
    this.showStandard = true;
    if (this.standards[0] == "统一规格") {
      this.isChecked = 0;
      this.goods.standard = "统一规格";
      this.goods.goods_storage = this.goods.SKUList[0].goods_storage;
      this.goods.goods_price = this.goods.SKUList[0].goods_price;
      this.goods.goods_id = this.goods.SKUList[0].goods_id;
      this.goods.goods_freight = this.goods.SKUList[0].goods_freight;
      this.goods.goods_num = this.size;
    }
    if (!this.goods.standard) {
      wx.showToast({
        title: "请选择规格!",
        icon: "none",
        duration: 1000
      });
    }
    this.$apply();
  }
}
</script>

