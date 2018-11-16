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
}

.success_info_wrap {
  height: 200rpx;
  padding: 0 117rpx;
  background: #282425;
}
.success_info_wrap image {
  width: 154rpx;
  height: 139rpx;
}
.success_info_wrap .success_info {
  width: 250rpx;
  color: #f5f5f5;
  text-align: center;
}
.success_info_wrap .success_info .success_sub_info {
  margin: 16rpx 0;
  font-size: 28rpx;
}

.person_info_wrap {
  height: 160rpx;
  font-size: 28rpx;
  color: #636363;
  background: #fff;
}
.person_info_wrap .person_info {
  width: 100%;
  padding: 11rpx 12rpx;
}
.person_info_wrap .person_info .person {
  display: flex;
  justify-content: space-between;
  margin: 20rpx 0;
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

.order_info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 168rpx;
  border-top: 1rpx solid #f4f4f4;
  background: #fff;
}
.order_info .order_price {
  margin-left: 22rpx;
}
.order_info .order_price text {
  font: 37rpx PingFang-SC-Bold;
  color: #af0000;
  padding-left: 56rpx;
}
.order_info .order_btn {
  width: 144rpx;
  height: 44rpx;
  border: 1rpx solid #666;
  border-radius: 10rpx;
  color: #010101;
  text-align: center;
}

.safe_info {
  height: 140rpx;
  margin: 20rpx 0 0;
  padding: 15rpx;
  font-size: 24rpx;
  color: #af0000;
  background: #fff;
}

.time_info {
  height: auto;
  margin: 18rpx 0 0;
  padding: 0 30rpx;
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
</style>

<template>
  <view class="container"  >      
     <view>
      <view class='success_info_wrap around'>
          <image src='../../images/img_yifukuan@2x.png' />
          <view class='success_info'>
              <view>买家已付款</view>
              <view class='success_sub_info'>等待卖家发货</view>
          </view>
      </view> 
        <view class='person_info_wrap around'>
          <view class='person_info'>
              <view class='person'>
                  <view>收货人：{{pointInfo.order_reciver_info.name}}</view>
                  <view>{{pointInfo.order_reciver_info.phone}}</view>
              </view>
              <view>收货地址：{{pointInfo.order_reciver_info.address}}</view>
          </view>
      </view>
        <repeat for='{{pointInfo.order_goods}}' item='item'>
          <view class='product_info around'>
              <image src='{{item.goods_image}}' mode="aspectFill"/>
              <view class='product'>
                  <view class='product_title'>{{item.goods_name}}</view>
                  <view class='row'>
                      <view class='product_price'>¥{{item.goods_price}}</view>
                      <!-- <view class='product_address'>福建福州</view> -->
                  </view>
                  <view class='row'>
                      <view class='product_standard'>规格：{{item.standard.spec|| '无'}}</view>
                      <view class='product_number'>×{{item.goods_num}}</view>
                  </view>
              </view>
          </view>
        </repeat>  
      <view class='order_info'>
          <view class='order_price'>总价:<text>¥{{pointInfo.order_amount}}</text></view>
          <view class='around'>
              <view class='order_btn' @tap='goPointOrderDetail()'>查看订单</view>
              <view class='order_btn' @tap='goHome'>继续逛逛</view>
          </view>
      </view>
       <view class='safe_info'>
          <view class=''>安全提醒：</view>
          <view class=''>付款成功后，商城不会以任何理由联系您。请勿泄露银行卡号、手机 验证码，否则会造成钱款损失。</view>
      </view> 

      <view class='time_info row'>
          <view class='time'>
            <view>订单编号：{{pointInfo.order_sn}}</view>
            <view>下单时间：{{pointInfo.add_time}}</view>
            <!-- <view>付款时间：{{pointInfo.payment_time}}</view> -->
          </view>
      </view>
    </view>
  </view>
  
</template>

<script>
import wepy from "wepy";
import dayjs from "dayjs";
import { shttp } from "../../utils/http";
export default class Pointbought extends wepy.page {
  config = {
    navigationBarTitleText: "积分商品购买完成"
  };
  data = {
    //是否为积分订单
    isPointOrder: false,
    //积分商品订单
    pointInfo: {},
    //积分订单id
    pointOrderId: ""
  };

  components = {};

  methods = {
    goHome() {
      wx.reLaunch({
        url: "/pages/home"
      });
    },
    //去积分的订单详情
    goPointOrderDetail() {
      console.log(this.pointInfo);
      let order_id = this.pointOrderId;
      wx.navigateTo({
        url: `/pages/store/pointorderdetail?orderId=${order_id}&pointOrder=pointOrder`
      });
    }
  };
  //获取积分订单详情
  async getPointOrder(order_id) {
    const res = await shttp
      .get("/api/v1/member/order")
      .query({
        order_id: order_id
      })
      .end();
    console.log("积分订单详情");
    console.log(res);
    this.pointInfo = res.data[0];
    //this.pointInfo.order_goods=this.toJSON(this.pointInfo.order_goods)
    console.log(this.pointInfo);
    this.$apply();
  }
  async onLoad(option) {
    this.pointOrderId = option.id;
    let order_id = option.id;

    this.getPointOrder(order_id);

    this.$apply();
  }
  // // 格式化数据
  toJSON(arr) {
    console.log("进来的数组");
    if (arr.length == 0) return [];
    let array = [];
    for (let i = 0; i < arr.length; i++) {
      let obj = {};
      for (var key in arr[i]) {
        if (key == "goods_image") {
          if (arr[i][key]) {
            obj[key] = JSON.parse(arr[i][key]);
          } else {
            obj[key] = "";
          }
        } else {
          obj[key] = arr[i][key];
        }
      }

      array.push(obj);
    }
    //console.log("返回的对象")
    //  console.log(array)
    return array;
  }
}
</script>

