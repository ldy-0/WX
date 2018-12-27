<style scoped>
.title {
  line-height: 68rpx;
  height: 68rpx;
  padding-left: 30rpx;
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
  background: #fff;
}
.product_info image {
  width: 180rpx;
  height: 180rpx;
  background: gray;
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
  color: #ff4444;
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
  justify-content: space-between;
  align-items: center;
  height: 88rpx;
  padding: 0 24rpx;
  border-top: 1rpx solid #e5e5e5;
  background: #fff;
}
.price_info .price {
  color: #e50012;
}
.price_info .freight {
  display: inline-block;
  margin-left: 10rpx;
  font-size: 24rpx;
  color: #888;
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
</style>


<template>
  <view class="container">
    <tab :tabOption="tab" :nowindex.sync="nowindex" @tabitem.user="tabitem"></tab>
    <view wx:if="{{orderList.length != 0}}">
      <view class="waitView">
        <repeat for="{{orderList}}" index="index" item="item">
          <view class="title">{{item.order_state}}</view>
          <view class="waitBody">
            <repeat for="{{item.order_goods}}" item="items">
              <view class="product_info" @tap="toDetail({{item}})">
                <image src="{{items.goods_image}}" mode="aspectFill">
                <view class="product">
                  <view class="product_title">{{items.goods_name}}</view>
                  <view class="row">
                    <view class="product_price">¥{{items.goods_price}}</view>
                  </view>
                  <view class="row">
                    <view class="product_standard">规格：{{items.goods_spec ||"统一规格"}}</view>
                    <view class="product_number">×{{items.goods_num}}</view>
                  </view>
                </view>
              </view>
            </repeat>
            <view class="price_info">
              <view>实付款</view>
              <view>
                <text class="price">¥{{item.order_amount}}</text>
                <text class="freight">运费{{item.shipping_fee}}</text>
              </view>
            </view>
            <view class="operate_info">
              <button class="Customer" open-type="contact" session-from="weapp" plain="true">联系客服</button>
              <view
                wx:if="{{item.order_state=='待退款'||item.order_state=='待退货'}}"
                @tap="cancelReturn({{item.refund_id}})"
              >取消</view>
            </view>
          </view>
        </repeat>
      </view>
    </view>
    <!--暂无数据显示-->
    <placeholder :show.sync="is_empty" message="还没有相关的订单"></placeholder>
  </view>
</template>
<script>
import wepy from "wepy";
import Tab from "../../components/tab";
import Placeholder from "../../components/placeholder";
import { shttp } from "../../utils/http";
export default class Aftersale extends wepy.page {
  config = {
    navigationBarTitleText: "售后管理"
  };
  data = {
    tab: {
      tabList: ["全部", "待退款", "已完成"]
    },
    //显示全部栏
    isAll: true,
    //显示哪一栏
    nowindex: Number,
    //是否提示暂无
    is_empty: false,
    //订单列表
    orderList: [],
    //待验收退货
    waitAcceptList: [],
    //待退款
    waitMoneyList: [],
    //已完成
    isOkList: []
  };
  components = {
    tab: Tab,
    placeholder: Placeholder
  };
  onLoad(options) {
    this.nowindex = 0;
    this.getOrderList();
    this.$apply();
  }
  onShow() {}
  methods = {
    //切换效果
    async tabitem(e) {
      this.nowindex = e;
      console.log(this.nowindex, "this.nowindex");
      this.getOrderList();
      this.$apply();
    },
    //取消退货
    cancelReturn(id) {
      let that = this;
      wx.showModal({
        title: "提示",
        content: "是否取消？",
        success: function(res) {
          if (res.confirm) {
            that.cancelToReturn(id);
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    //去订单详情
    toDetail(item) {
      console.log(item);
      wx.navigateTo({
        url: "../store/retundGoodDetail?refund_id=" + item.refund_id
      });
    }
  };
  //取消退款退货
  async cancelToReturn(id) {
    let that = this;
    const res = await shttp.put(`/api/v2/member/refundreturn/${id}`).end();
    console.log(res);
    if (res.status == 0) {
      wx.showToast({
        title: "取消成功",
        icon: "success",
        duration: 1000
      });
      setTimeout(function() {
        that.getOrderList();
      }, 1100);
    } else if (res.status == 1) {
      return wx.showToast({
        title: res.error,
        icon: "none",
        duration: 2000
      });
    } else {
      return wx.showToast({
        title: "取消失败",
        icon: "none",
        duration: 2000
      });
    }
  }
  //获取订单列表
  async getOrderList() {
    let query = {
      refund_state: 0
    };
    console.log(this.nowindex);
    if (this.nowindex == 0) {
      query = {};
    } else if (this.nowindex == 1) {
      query = {
        refund_state: 1
      };
    } else if (this.nowindex == 2) {
      query = {
        refund_state: 2
      };
    }

    wx.showLoading({
      title: "加载中"
    });
    const res = await shttp
      .get("/api/v2/member/refundreturn")
      .query(query)
      .end();
    console.log("订单列表");
    if (res.status == 0) {
      wx.hideLoading();
      if (res.data) {
        this.orderList = res.data;
        if (this.orderList.length == 0) {
          this.is_empty = true;
        } else {
          this.is_empty = false;
        }
      } else {
        this.orderList = [];
        this.is_empty = true;
      }
    } else {
      this.is_empty = true;
      wx.hideLoading();
    }
    this.$apply();
    // console.log(res.data);
  }
}
</script>
