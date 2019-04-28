<style scoped>
.container {
  font: 28rpx PingFang-SC-Medium;
  color: #000;
  background: #f4f4f4;
  height: 100vh;
}

.around {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.around_1 {
  display: flex;
  justify-content: space-around;
}

.row {
  display: flex;
  justify-content: space-between;
}

.backaddr {
  border-bottom: solid 1rpx #f7f7f7;
}

.title {
  line-height: 88rpx;
  padding: 0 18rpx;
  background: #fff;
}

.person_info_wrap {
  margin-bottom: 20rpx;
  color: #636363;
  background: #fff;
}
.person_info_wrap .person_info {
  width: 640rpx;
}
.person_info_wrap .icon_diwei {
  width: 23rpx;
  height: 33rpx;
}
.person_info_wrap .person {
  display: flex;
  justify-content: space-between;
  margin: 20rpx 0;
}

.product_info {
  min-height: 250rpx;
  background: #fff;
}
.product_info image {
  width: 180rpx;
  height: 180rpx;
  margin: 30rpx 0 0;
  border-radius: 10rpx;
  background: gray;
}
.product_info .product {
  width: 500rpx;
}
.product_info .product .product_title {
  padding: 40rpx 0 70rpx;
  color: #333;
}
.product_info .product .product_price {
  line-height: 44rpx;
  border-radius: 22rpx;
  font-size: 32rpx;
  color: #dd3d27;
  text-align: center;
}
.product_info .product .product_price,
.product_info .product .product_address {
  margin: 15rpx 0 45rpx;
}
.product_info .product .product_address,
.product_info .product .product_number {
  color: #888;
}
.product_info .product .product_standard {
  font-size: 24rpx;
  color: #888;
}

.single_row {
  display: flex;
  align-items: center;
  height: 88rpx;
  padding: 0 27rpx;
  background: #fff;
  margin: 20rpx 0 0;
}
.single_row .price,
.single_row .description {
  margin-left: 30rpx;
}
.single_row .price {
  color: #af0000;
}
.single_row .description {
  color: #888;
}

.no_split_row {
  display: flex;
  align-items: center;
  height: 88rpx;
  padding: 0 27rpx;
  background: #fff;
}
.no_split_row .price,
.no_split_row .description {
  margin-left: 30rpx;
}
.no_split_row .price {
  color: #af0000;
}
.no_split_row .description {
  color: #888;
}

.split_line_row {
  display: flex;
  align-items: center;
  height: 88rpx;
  padding: 0 27rpx;
  background: #fff;
  border-top: 1rpx solid #f4f4f4;
}
.split_line_row .price,
.split_line_row .description {
  margin-left: 30rpx;
}
.split_line_row .price {
  color: #af0000;
}
.split_line_row .description {
  color: #888;
}

.bottom_bar {
  position: absolute;
  bottom: 0rpx;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100rpx;
  color: #010101;
  background: #fff;
}
.Customer{
  padding: 0rpx;
  width: 144rpx;
  line-height: 44rpx;
  margin-right: 24rpx;
  border: 1rpx solid #333;
  border-radius: 10rpx;
  font-size: 28rpx;
  text-align: center;
}
.bottom_bar .btn {
  line-height: 44rpx;
  margin-right: 24rpx;
  padding: 0 17rpx;
  border: 1rpx solid #666;
  border-radius: 10rpx;
  text-align: center;
}

.reason{
  font-size: 28rpx;
}

.operate_btn{
  margin-right: 24rpx;
  padding: 15rpx 30rpx;
  border: 2rpx solid #222;
  line-height: 1.2;
  font-size: 26rpx;
  border-radius: 30rpx;
}
.cancel_btn{
  border: 2rpx solid #4fb84a;
}

.s_fc_10{ color: #4fb84a; }
.s_fc_11{ color: #636363; }
</style>

<template>
  <view class="container">

    <scroll-view scroll-y style='height: 100%;'>
      <view wx:if="{{isReturnGoods}}">
        <view class='title backaddr'>退货寄回地址</view>

        <view class='person_info_wrap around'>
            <image class="icon_diwei" src='../../images/icon_dingwei@2x.png' />
            <view class='person_info'>
                <view class='person'>
                    <view>收货人：{{refundAddress.name}}</view>
                    <view>{{refundAddress.phone}}</view>
                </view>
                <view>收货地址：{{refundAddress.address}}</view>
            </view>
        </view>
      </view>

      <view class="title">{{orderDetail.order_state}}</view>

      <repeat for="{{orderDetail.order_goods}}" key="index" index="index" item="item">
        <view class="product_info around_1">
          <image src="{{item.goods_image}}" mode="aspectFill">
          <view class="product">
            <view class="product_title">{{item.goods_name}}</view>
            <view class="row">
              <!-- <view class="product_standard">规格：{{item.goods_spec|| '统一规格'}}</view> -->
              <view class="product_number">×{{item.goods_num}}</view>
            </view>
            <view class="row">
              <view class="product_price">¥{{item.goods_price}}</view>
            </view>

          </view>
        </view>
      </repeat>

      <view class="split_line_row row">
        <view>退款原因</view>
        <view class="reason s_fc_11">{{orderDetail.reason_info}}</view>
      </view>

      <view class="split_line_row row">
        <view>退款金额</view>
        <view class="price">¥{{orderDetail.refund_amount}}</view>
      </view>

      <view class="split_line_row row" wx:if="{{orderDetail.refund_points > 0}}">
        <view>退还积分</view>
        <view class="price">¥{{orderDetail.refund_points}}</view>
      </view>
      <view class="split_line_row row" wx:if="{{orderDetail.refund_pd_amount > 0}}">
        <view>退还余额</view>
        <view class="price">¥{{orderDetail.refund_pd_amount}}</view>
      </view>

      <view class="split_line_row row">
        <view>退货/退款说明</view>
        <view class="description row">{{orderDetail.buyer_message}}</view>
      </view>

      <view class="split_line_row row" wx:if="{{orderDetail.express_name}}">
        <view>物流公司</view>
        <view class="description row">{{orderDetail.express_name}}</view>
      </view>
      <view class="split_line_row row" wx:if="{{orderDetail.invoice_no}}">
        <view>物流单号</view>
        <view class="description">{{orderDetail.invoice_no}}</view>
      </view>

      <view style='height: 100rpx;'></view>
    </scroll-view>

    <view class="bottom_bar">
      <!-- <navigator class='btn' url='./select'>填写物流单号</navigator> -->
      <button class="operate_btn" open-type="contact" session-from="weapp" plain="true">联系客服</button>
      <view class='operate_btn cancel_btn s_fc_10' wx:if="{{orderDetail.refund_state=='待退款'|| orderDetail.refund_state=='待退货'}}" @tap="cancelReturn({{orderDetail.refund_id}})">取消退款</view>
      <!-- <view class='btn'>查看物流</view> -->
    </view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
export default class ReturnGoodsDetail extends wepy.page {
  config = {
    navigationBarTitleText: "售后详情",
    disableScroll: true,
  };
  data = {
    type: '',
    orderDetail: {},
    clicked: false,
    refundAddress: {},
  };

  computed = {
    isReturnGoods: () => this.orderDetail && this.orderDetail.express_name,
  };

  components = {};

  methods = {
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
  };
  onLoad(option) {
    let id = option.refund_id;
    console.log("商品的详情" + id);
    this.getOrderInfo(id);
    this.getRefundAddress();
  }

  //取消退款退货
  async cancelToReturn(id) {
    if(this.clicked) return ;
    this.clicked = true;

    const res = await shttp.put(`/api/v2/member/refundreturn/${id}`).end();

    console.log(res);

    if (res.status == 0) {
      wx.showToast({ title: "取消成功", icon: "success", duration: 1000 });
      setTimeout(function() {
        wx.navigateBack({ delta: 1 });
      }, 1100);
    } else if (res.status == 1) {
      wx.showToast({ title: res.error, icon: "none", duration: 2000 });
    } else {
      wx.showToast({ title: "取消失败", icon: "none", duration: 2000 });
    }

    this.clicked = false;
    this.$apply();

  }

  async getOrderInfo(id) {
    const res = await shttp.get(`/api/v2/member/refundreturn/${id}`).end();

    console.log(res);
    if(res.status == 0){ 
      this.orderDetail = res.data; 
      this.orderDetail.refund_points = Number(this.orderDetail.refund_points);
      this.orderDetail.refund_pd_amount = Number(this.orderDetail.refund_pd_amount);
    }

    this.$apply();
  }

  async getRefundAddress(){
    let res = await shttp.get(`/api/v2/member/refundreturn/create`).end();

    if(res && res.data){
      this.refundAddress = res.data;
    }

    this.$apply();

    if(res.error) return wx.showModal({ content: res.error, showCancel: false });
  }
}
</script>

