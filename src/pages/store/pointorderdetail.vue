<style>
.container {
  font: 32rpx PingFang-SC-Medium;
  background: #f4f4f4;
  min-height: 100vh;
}

.around {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.person_info_wrap {
  height: 160rpx;
  font-size: 28rpx;
  color: #636363;
  background: #fff;
}
.person_info_wrap .person_info {
  width: 700rpx;
}
.person_info_wrap .person_info .person {
  display: flex;
  justify-content: space-between;
  margin: 20rpx 0;
}

.status_info {
  line-height: 88rpx;
  margin: 20rpx 0 0;
  padding-left: 30rpx;
  color: #202020;
  background: #fff;
  border-bottom: 1rpx solid #e5e5e5;
}

.product_info {
  height: 250rpx;
  border-top: 1rpx solid #e5e5e5;
  border-bottom: 1rpx solid #e5e5e5;
  background: #fff;
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
}
.product_info .product .product_price {
  font-size: 36rpx;
  color: #ff4444;
}
.product_info .product .product_price,
.product_info .product .product_address {
  margin: 15rpx 0 45rpx;
}
.product_info .product .product_address,
.product_info .product .product_number {
  font-size: 28rpx;
  color: #888;
}
.product_info .product .product_standard {
  font-size: 24rpx;
  color: #888;
}

.words_info {
  line-height: 68rpx;
  padding-left: 21rpx;
  font-size: 28rpx;
  color: #000;
  background: #fff;
}

.order_info {
  line-height: 100rpx;
  margin: 20rpx 0 0;
  padding: 0 24rpx;
  background: #fff;
}
.order_info .order_price {
  font: 37rpx PingFang-SC-Bold;
  color: #af0000;
}

.time_info {
  height: auto;
  margin: 22rpx 0 100rpx;
  padding: 10rpx 30rpx 20rpx;
  background: #fff;
  font-size: 20rpx;
  color: #636363;
}
.time_info .time view {
  margin: 18rpx 0 0;
}
.time_info .btn {
  width: 100rpx;
  height: 34rpx;
  margin: 14rpx 0 0;
  border: 1rpx solid #282425;
  border-radius: 10rpx;
  font-size: 24rpx;
  color: #282425;
  text-align: center;
}

.bottom_bar {
  position: fixed;
  bottom: 0rpx;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100rpx;
  font-size: 28rpx;
  color: #282425;
  background: #fff;
}
.bottom_bar .btn {
  width: 144rpx;
  line-height: 44rpx;
  margin-right: 24rpx;
  border: 1rpx solid #282425;
  border-radius: 10rpx;
  text-align: center;
}

.Customer {
  padding: 0rpx;
  width: 144rpx;
  line-height: 44rpx;
  margin-right: 24rpx;
  border: 1rpx solid #333;
  border-radius: 10rpx;
  font-size: 28rpx;
  text-align: center;
}

.storeName {
  background: #fff;
  padding-left: 30rpx;
  font-size: 28rpx;
  padding-top: 10rpx;
  display: flex;
  align-items: center;
}
.storeName image {
  width: 30rpx;
  height: 30rpx;
  margin-right: 10rpx;
}

.boder-none {
  border: 0rpx solid #333;
}
</style>

<template>
  <view class="container">
    <view>
      <view class="person_info_wrap around">
        <view class="person_info">
          <view class="person">
            <view>收货人：{{pointInfo.order_reciver_info.name}}</view>
            <view>{{pointInfo.order_reciver_info.phone}}</view>
          </view>
          <view>收货地址：{{pointInfo.order_reciver_info.address}}</view>
        </view>
      </view>
      <view class="status_info">{{pointInfo.order_state=='未付款'?'待付款' : '待发货'}}</view>
      <view>
        <repeat for="{{pointInfo.order_goods}}" item="item">
          <view class="product_info around">
            <image src="{{item.goods_image}}" mode="aspectFill">
            <view class="product">
              <view class="product_title">{{item.goods_name}}</view>
              <view class="row">
                <view class="product_price">¥{{item.goods_price}}</view>
                <!-- <view class='product_address'>湖北武汉</view> -->
              </view>
              <view class="row">
                <view class="product_standard">规格：{{item.standard.spec|| '无'}}</view>
                <view class="product_number">×{{item.goods_num}}</view>
              </view>
            </view>
          </view>
        </repeat>
      </view>
      <view class="order_info row">
        <text>实付款:</text>
        <text class="order_price">¥{{pointInfo.order_amount}}</text>
      </view>

      <view class="time_info row">
        <view class="time">
          <view>订单编号：{{pointInfo.order_sn}}</view>
          <view>下单时间：{{pointInfo.add_time}}</view>
          <view>付款状态：{{pointInfo.order_state}}</view>
          <!-- <view>付款方式：微信支付</view> -->
        </view>
        <view class="btn" @tap="copyOrder">复制</view>
      </view>
      <view class="bottom_bar">
        <!-- <navigator class='btn' url='./select'>退货/换货</navigator> -->
        <button class="Customer" open-type="contact" session-from="weapp" plain="true">联系客服</button>
        <!-- <view class='btn' wx:if="{{order.order_state_id==30}}" @tap="Confirm()">确认收货</view> -->
        <!-- <view class='btn' wx:if="{{order.order_state_id==10}}" @tap="payMoney()">支付</view> -->
        <!-- <view class='btn'>查看物流</view> -->
      </view>
    </view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import dayjs from "dayjs";
export default class PointOrderDetail extends wepy.page {
  config = {
    navigationBarTitleText: "积分订单详情"
  };
  data = {
    //积分订单详情
    pointInfo: {},
    //地址
    address: null
  };

  components = {};

  methods = {
    //确认收货
    Confirm(item) {
      let that = this;
      wx.showModal({
        title: "提示",
        content: "是否确认收货？",
        success: function(res) {
          if (res.confirm) {
            this.comfirmOrder(item.id);
          } else if (res.cancel) {
            return;
          }
        }
      });
    },
    copyOrder() {
      wx.setClipboardData({
        data: `订单号：${this.order.order_sn} 下单时间：${
          this.order.add_time
        } 支付时间：${this.order.payment_time}`,
        success: res =>
          wx.getClipboardData({ success: res => console.log(res) })
      });
    }
  };
  async comfirmOrder(orderId) {
    let res = await orderApi.confirmReceive({
      params: {
        orderId: orderId
      }
    });
    console.log("确认返回的结果");
    console.log(res);
    if (res) {
      wx.showToast({
        title: "收货成功",
        icon: "success",
        duration: 2000
      });
    } else {
      wx.showToast({
        title: "收货失败",
        icon: "none",
        duration: 2000
      });
    }
  }
  async onLoad(opt) {
    console.log(opt);
    if (opt.pointOrder) {
      //获取积分订单详情
      this.getPointOrder(opt.orderId);
    }
  }
  //获取积分订单详情
  async getPointOrder(orderId) {
    const res = await shttp
      .get("/api/v1/member/order")
      .query({
        order_id: orderId
      })
      .end();
    console.log("订单详情");
    console.log(res);
    this.pointInfo = res.data[0];
    //this.pointInfo.order_goods=this.toJSON(this.pointInfo.order_goods)
    console.log(this.pointInfo);

    this.$apply();
  }
  //  // 格式化数据
  //   toJSON(arr){
  //   //  console.log("进来的对象")
  //   //  console.log(arr)
  //     if(arr.length==0) return []
  //    let array=[];
  //    for(let i=0;i<arr.length;i++){
  //           let obj={};
  //          for(var key in arr[i]){
  //            if(key=='goods_image'){
  //               if(arr[i][key]) {
  //                  obj[key]=JSON.parse(arr[i][key])
  //               }else{
  //                  obj[key]=""
  //               }
  //            }else{
  //             obj[key]=arr[i][key]
  //            }
  //          }

  //         array.push(obj)
  //    }
  //    //console.log("返回的对象")
  //   // console.log(array)
  //    return array
  // }
}
</script>

