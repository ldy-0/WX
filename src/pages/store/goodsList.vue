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
}
.bodycontent .title_page {
  width: 100%;
  height: 334rpx;
  background: gray;
}
.bodycontent .price {
  color: #ff4444;
  font-size: 32rpx;
  margin-bottom:20rpx
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
  margin-bottom: 20rpx
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
</style>


<template>
  <view class="container">
    <view class="bodycontent">
      <repeat wx:if="{{type=='hot'}}" for="{{goodsList}}" key="index" index="index" item="item">
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
      <repeat wx:if="{{type=='group'}}" for="{{goodsList}}" key="index" index="index" item="item">
        <view class="redlist" @tap="groupDetail({{item.rule_id}})">
          <image class="title_page" mode="aspectFill" src="{{item.goods.goods_image}}">
          <view class="viewX-itemGoodsname">{{item.goods.goods_name}}</view>
          <view class="viewX-originalPrice">
            <text style="font-size:26rpx;">￥</text>{{item.goods.goods_price}}
          </view>
          <view class="viewX-price">
            <view>
              <text style="font-size:26rpx;">￥</text>{{item.goods_price}}
            </view>
            <image class="viewX-itemIcon" src="../../images/icon_tuangou@2x.png">
          </view>
        </view>
      </repeat>
    </view>
    <placeholder :show.sync="is_empty" message="还没有此类店铺"></placeholder>
  </view>
</template>
<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import Placeholder from "../../components/placeholder";
export default class GoodsList extends wepy.page {
  config = {
    navigationBarTitleText: ""
  };
  data = {
    goodsList: [], //商品列表
    page: 1,
    is_empty: false,
    type: null
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
  onShow() {}
  methods = {
    intoDetail(id) {
      wx.navigateTo({
        url: `./goodsDetails?goods_commonid=${id}`
      });
    },
    //进入团购商品详情
    groupDetail(id) {
      wx.navigateTo({
        url: `./goodsDetails?goods_commonid=${id}&type=group`
      });
    },
  };
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
    }
    this.$apply();
  }
  //获取团购商品列表
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
    }
    this.$apply();
  }
  //上拉加载
  onReachBottom() {
    this.page += 1;
    this.getgoodsList();

    switch (this.type) {
      case "group":
        this.getGroupList();
        break;
      case "hot":
        this.getgoodsList();
        break;
      default:
        break;
    }

    this.$apply();
  }
}
</script>
