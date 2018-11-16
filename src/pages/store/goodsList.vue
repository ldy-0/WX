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

.goods-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 28rpx;
  border-bottom: 1rpx solid #e3e3e3;
  background: #fff;
}
.goods-item .goods-details {
  display: flex;
  width: 430rpx;
  padding-left: 21rpx;
  height: 240rpx;
  flex-direction: column;
  justify-content: space-between;
}
.goods-item .goods-details view {
  font-size: 20rpx;
  color: #888;
}
.goods-item .goods-details .goods-detailsOne {
  font-size: 30rpx;
  color: #222222;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.goods-item .goods-details .goods-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.goods-item .goods-details .goods-goBtn {
  width: 156rpx;
  height: 56rpx;
  color: #fff;
  font-size: 26rpx;
  text-align: center;
  line-height: 56rpx;
  background: #ff4444;
  border-radius: 28rpx;
}
.goods-item image {
  width: 240rpx;
  height: 240rpx;
  background: skyblue;
}

.text1 {
  font-size: 26rpx;
  color: #ff4444;
}

.text2 {
  font-size: 32rpx;
  color: #ff4444;
  padding-left: 6rpx;
}

.text3 {
  font-size: 24rpx;
  color: #a1a1a1;
  padding-left: 16rpx;
  text-decoration: line-through;
}
</style>


<template>
  <view class="container">
    <tab :tabOption="tab" :nowindex.sync="choiceTab" @tabitem.user="tabitem"></tab>
    <view class='goods-list'>
      <repeat for='{{goodsList}}' item='item'>
        <view class='goods-item'>
          <image src="{{item.goods_image}}" mode="aspectFill"/>
          <view class="goods-details">
            <view class="goods-detailsOne">{{item.goods_name}}</view>
            <view>
              <view><text class="text1">¥</text><text class="text2">{{item.goods_price}}</text><text class="text3">¥{{item.goods_marketprice}}</text></view>
              <view class="goods-bottom">
                <text>销量 {{item.goods_salenum}}</text>
                <view class="goods-goBtn" @tap='goshopDetail' data-id="{{item.goods_id}}">{{btnType=='appointment'?'立即预约':'立即购买'}}</view>
              </view>
            </view>
          </view>
        </view>
      </repeat>
    </view>
    <!--暂无数据显示-->
    <placeholder :show.sync="is_empty" message="还没有此类店铺"></placeholder>
  </view>
</template>
<script>
import wepy from "wepy";
import Tab from "../../components/tab";
import { shttp } from "../../utils/http";
import Placeholder from "../../components/placeholder";
export default class GoodsList extends wepy.page {
  config = {
    navigationBarTitleText: "商品列表"
  };
  data = {
    tab: {
      tabList: ["综合", "最热", "新品", "价格"]
    },
    choiceTab: 0,
    btnType: "",
    shopId: null,
    goodsList: [],
    page: 1,
    is_empty: false
  };
  components = {
    tab: Tab,
    placeholder: Placeholder
  };
  onLoad(options) {
    this.shopId = wx.getStorageSync("shopId");
    // console.log(options.type);
    //判断是立即购买，还是预约
    this.btnType = options.type;
    this.getgoodsList();
  }
  onShow() {}
  methods = {
    async tabitem(e) {
      this.choiceTab = e;
      console.log(e);
    }
  };
  async getgoodsList() {
    wx.showLoading({
      title: "加载中"
    });
    const res = await shttp
      .get(`/api/v1/member/goods?store_id=${this.shopId}`)
      .query({
        page: this.page
      })
      .end();
    if (res.status == 0) {
      let list = Array.from(res.data);
      this.goodsList = this.goodsList.concat(list);
      wx.hideLoading();
      if (this.goodsList.length == 0) {
        this.is_empty = true;
      }
    } else {
      wx.hideLoading();
    }
    this.$apply();
  }
  //上拉加载
  onReachBottom() {
    this.page = this.page + 1;
    this.getgoodsList();
    this.$apply();
  }
  goshopDetail(e) {
    let id = e.currentTarget.dataset.id;
    if (this.btnType === "appointment") {
      wx.navigateTo({
        url: `goodsDetails?goods_id=${id}&type=appointment`
      });
    } else {
      wx.navigateTo({
        url: `goodsDetails?goods_id=${id}`
      });
    }
  }
}
</script>
