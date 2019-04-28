<style scoped>
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
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 68rpx;
  padding: 0 30rpx;
  color: #202020;
  border-bottom: 1rpx solid #e5e5e5;
  background: #fff;
}
.product_info {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 250rpx;
  background: #fafafa;
}
.product_info image {
  width: 180rpx;
  height: 180rpx;
}
.product_info .product {
  width: 500rpx;
  height: 180rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.product_info .product .product_title {
  color: #333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.product_info .product .product_price {
  font-size: 36rpx;
  color: #ff7900;
  padding-top: 20rpx;
}
.product_info .product .product_address,
.product_info .product .product_number {
  font-size: 28rpx;
  color: #888;
}
.product_info .product .product_standard {
  font-size: 24rpx;
  color: #888;
  width: 100%;
  height: 35rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.price_info {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 88rpx;
  padding: 0 24rpx;
  font-size: 26rpx;
  background: #fff;
}
.price {
  font-size: 32rpx;
}
.price_info .freight {
  display: inline-block;
  margin-left: 10rpx;
  font-size: 24rpx;
}
.operate_info {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 88rpx;
  border-top: 1rpx solid #e5e5e5;
  background: #fff;
  margin-bottom: 19rpx;
}
.operate_info .Customer {
  padding: 0rpx;
  width: 144rpx;
  line-height: 44rpx;
  margin-right: 24rpx;
  border: 1rpx solid #333;
  border-radius: 10rpx;
  font-size: 28rpx;
  text-align: center;
}
.operate_info view {
  width: 144rpx;
  line-height: 44rpx;
  margin-right: 24rpx;
  border: 1rpx solid #333;
  border-radius: 10rpx;
  font-size: 28rpx;
  text-align: center;
}
.no_wrap .no {
  position: absolute;
  top: calc(50% - 150rpx);
  left: calc(50% - 190rpx);
  text-align: center;
}
.no_wrap .no image {
  width: 380rpx;
  height: 280rpx;
  margin-bottom: 24rpx;
}
.no_wrap .no .no_title {
  font-size: 36rpx;
  color: #333;
}
.no_wrap .no .no_desc {
  font-size: 24rpx;
  color: #888;
}
.view_show {
  display: block;
  padding-left: 30rpx;
  background: #ffffff;
  height: 68rpx;
  line-height: 68rpx;
  border-bottom: solid 1px #f2f2f2;
  font-size: 32rpx;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container {
  font: 32rpx PingFang-SC-Medium;
  color: #000;
  min-height: 100vh;
  background: #f4f4f4;
}
.group-xhx {
  text-decoration: underline;
}

.operate_btn{
  margin-right: 24rpx;
  padding: 15rpx 30rpx;
  border: 2rpx solid #222;
  line-height: 1.2;
  font-size: 26rpx;
  border-radius: 30rpx;
}
.custom_btn{
  border: 2rpx solid #4fb84a;
}

.s_fc_2{ color: #222; }
.s_fc_10{ color: #4fb84a; }
</style>


<template>
  <view class="container">
    <tab :tabOption="tab" :nowindex.sync="nowindex" @tabitem.user="tabitem"></tab>
    <view wx:if="{{orderList.length != 0}}">
      <repeat for="{{orderList}}" index="index" item="order">
        <view class="title" @tap="goGroupDetail" data-pintuanid="{{order.pintuan_id}}" data-orderid="{{order.order.order_id}}">
          <!-- <view>{{order.pintuan_state_text}}</view> -->
          <view>{{tab.tabList[nowindex]}}</view>
          <view class="group-xhx s_fc_10">团详情</view>
        </view>

        <view data-index="{{index}}">
          <view class="product_info">
            <image src="{{order.goodsinfo.goods_image}}" mode="aspectFill">
            <view class="product">
              <view class="product_title">{{order.pintuan_goods_name}}</view>
              <!-- <view class="row">
                <view class="product_price">¥{{order.rule.goods_price}}</view>
              </view> -->
              <!-- <view class="row">
                <view class="product_standard"></view>
                <view class="product_number">×1</view>
              </view> -->
            </view>
          </view>

          <view class="price_info s_fc_2">
            <view>实付款</view>
            <view>
              <text class="price_wrap">¥<text class='price'>{{order.price1}}</text>.<text>{{order.price2}}</text></text>
              <text class="freight">(含运费{{order.order.shipping_fee}})</text>
            </view>
          </view>
        </view>
        <view class="operate_info">
          <button class="operate_btn custom_btn s_fc_10" open-type="contact" session-from="weapp" plain="true">联系客服</button>
          <!-- <view wx:if="{{order.pintuan_state_text=='已成团'}}" @tap.stop="salesReturn" data-order="{{order}}">退货/换货</view> -->
        </view>
      </repeat>
    </view>
    <!--暂无数据显示-->
    <placeholder :show.sync="is_empty" message="还没有相关的团购"></placeholder>
  </view>
</template>
<script>
import wepy from "wepy";
import Tab from "../../components/tab";
import Placeholder from "../../components/placeholder";
import { shttp } from "../../utils/http";
export default class OrderList extends wepy.page {
  config = {
    navigationBarTitleText: "我的团购"
  };
  data = {
    tab: {
      tabList: ["拼团中", "未成团", "已成团"]
    },
    nowindex: 0,
    is_empty: false,
    orderList: [],
    page: 1,
    query: {
      limit: 30
    }
  };
  components = {
    tab: Tab,
    placeholder: Placeholder
  };
  onLoad(options) {}
  onShow() {
    this.page = 1;
    this.query.page = this.page;
    this.orderList = [];
    this.is_empty = false;
    let e = Number(this.nowindex);
    switch (e) {
      case 0:
        this.query.pintuan_state = 0;
        this.getList();
        break;
      case 1:
        this.query.pintuan_state = 1;
        this.getList();
        break;
      case 2:
        this.query.pintuan_state = 2;
        this.getList();
        break;

      default:
        break;
    }
    this.$apply();
  }
  methods = {
    async tabitem(e) {
      //订单状态：0:已取消 10:未付款 20:已付款 30:已发货 40:已收货 50：待评价
      this.nowindex = e;
      this.orderList = [];
      this.is_empty = false;
      this.page = 1;
      this.query.page = this.page;
      delete this.query.order_state;
      switch (e) {
        case 0:
          this.query.pintuan_state = 0;
          this.getList();
          break;
        case 1:
          this.query.pintuan_state = 2;
          this.getList();
          break;
        case 2:
          this.query.pintuan_state = 1;
          this.getList();
          break;

        default:
          break;
      }
    },
    goOrderDetail(e) {
      let index = e.currentTarget.dataset.index;
      wx.navigateTo({
        url: `/pages/my/orderDetail?orderId=${this.orderList[index].order_id}&unVip=${true}`
      });
    },
    goGroupDetail(e) {
      let id = e.currentTarget.dataset.pintuanid;
      let orderId = e.currentTarget.dataset.orderid
      console.log(orderId);
      wx.navigateTo({
        url: `/pages/my/groupbuyDatail?id=${id}&unVip=${true}`
      });
    }
  };

  format(item){
    let arr = item.order.order_amount.split('.');
    item.price1 = arr[0];
    item.price2 = arr[1];
  }

  async getList() {
    wx.showLoading({
      title: "加载中"
    });
    const res = await shttp
      .get(`/api/v2/member/mygroupbuy`)
      .query(this.query)
      .end();
    if (res.status === 0) {
      wx.hideLoading();
      if (res.data != null && res.data.length != 0) {
        res.data.forEach(this.format.bind(this));

        this.orderList = this.orderList.concat(res.data);
      } else {
        if (this.orderList.length == 0) {
          this.is_empty = true;
        }
      }
    } else {
      if (this.orderList.length == 0) {
        this.is_empty = true;
      }
      wx.hideLoading();
    }
    this.$apply();
  }
  //上拉加载
  onReachBottom() {
    this.page = this.page + 1;
    this.query.page = this.page;
    this.getList();
    this.$apply();
  }

  evaluate(e) {
    let order = e.currentTarget.dataset.order;
    wx.navigateTo({
      url:
        "/pages/my/evaluate?order=" + encodeURIComponent(JSON.stringify(order))
    });
  }
}
</script>
