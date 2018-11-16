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

.row {
  display: flex;
  justify-content: space-between;
}

.returnGoods_title {
  line-height: 88rpx;
  padding: 0 18rpx;
  background: #fff;
  border-bottom: solid 1rpx #f7f7f7;
  border-top: solid 1rpx #f7f7f7;
}

.person_info_wrap {
  height: 160rpx;
  margin-bottom: 20rpx;
  color: #636363;
  background: #fff;
}
.person_info_wrap .icon_diwei {
  width: 33rpx;
  height: 40rpx;
}
.person_info_wrap .person_info {
  width: 640rpx;
}
.person_info_wrap .person_info .person {
  display: flex;
  justify-content: space-between;
  margin: 20rpx 0;
}

.product_info {
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
}
.product_info .product .product_title {
  color: #333;
}
.product_info .product .product_price {
  line-height: 44rpx;
  border-radius: 22rpx;
  font-size: 37rpx;
  color: #ff4444;
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
  width: 100%;
  height: 100%;
}
.single_row .title {
  flex-shrink: 0;
}

.mypicker {
  width: 100%;
  height: 100%;
  line-height: 44rpx;
  text-align: right;
}
.mypicker .picker {
  line-height: 88rpx;
  height: 88rpx;
  width: 95%;
}

.arrow {
  width: 16rpx;
  height: 26rpx;
}

.no_split_row {
  display: flex;
  align-items: center;
  height: 88rpx;
  padding: 0 27rpx;
  background: #fff;
  border-top: solid 1rpx #f7f7f7;
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
  width: 100%;
  height: 100%;
}
.no_split_row .title {
  flex-shrink: 0;
}

.bottom_bar {
  position: absolute;
  bottom: 0rpx;
  width: 100%;
  line-height: 88rpx;
  color: #fff;
  background: #ff4444;
  text-align: center;
}
</style>

<template>
  <view class="container">

      <!-- <view class='returnGoods_title'>退货寄回地址</view>

      <navigator class='person_info_wrap around' url='/pages/my/addressList?type=returnGoods'>
          <image class="icon_diwei" src='../../images/icon_dingwei@2x.png' />
          <view class='person_info'>
              <view class='person'>
                  <view>收货人：{{address.address_realname}}</view>
                  <view>{{address.address_tel_phone}}</view>
              </view>
              <view>收货地址：{{address.area_info}}{{address.address_detail}}</view>
          </view>
      </navigator> -->
   <repeat for="{{orderDetail.order_goods}}" key="index" index="index" item="item">
      <view class='product_info around'>
          <image  src='{{item.goods_image}}' />
          <view class='product'>
              <view class='product_title'>{{item.goods_name}}</view>
              <view class='row'>
                  <view class='product_price'>¥{{item.goods_price}}</view>
                  <!-- <view class='product_address'>福建福州</view> -->
              </view>
              <view class='row'>
                  <view class='product_standard'>规格：{{item.spec_value|| '统一规格'}}</view>
                  <view class='product_number'>×{{item.goods_num}}</view>
              </view>
          </view>
      </view>
     </repeat>
     <view class='single_row row'>
          <view class="title">退款原因</view>
          <picker class="mypicker" bindchange="bindPickerChange" value="{{index}}" range="{{array}}">
            <view class="picker">
               {{array[index]}}
            </view>
           </picker>
             <image class='arrow' src='../../images/icon_zuojiantou@2x.png' />
      </view>

      <view class='single_row'>
          <view>退款金额</view>
          <view class='price'>¥{{orderDetail.order_amount}}</view>
      </view>

      <view class='single_row'>
          <view class="title">退货说明</view>
           <input class='description' placeholder="选填"  bindinput="iptinfo"/>
      </view>

      <view class='single_row'>
          <view class="title">物流公司</view>
           <input class='description' placeholder="必填" bindinput="iptcom" />
      </view>
      <view class='no_split_row'>
          <view class="title">物流单号</view>
           <input class='description' placeholder="必填" bindinput="iptnum" />
      </view>

     <view class='bottom_bar' @tap="submintMsg()">提交</view>
      
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
export default class ReturnGoods extends wepy.page {
  config = {
    navigationBarTitleText: "退货换货"
  };
  data = {
    //订单商品详情
    orderDetail: {},
    //收货人地址
    address: {},
    //退款原因选择
    array: [
      "货物缺损",
      "商品与描述不符",
      "卖家发错货",
      "质量问题",
      "假冒品牌",
      "其他"
    ],
    //退款原因
    refundReason: "",
    //退货说明
    refundMemo: "",
    //物流公司
    logisticsCompny: "",
    //物流单号
    logisticsNo: ""
  };

  computed = {};

  components = {};

  methods = {
    iptinfo(e) {
      this.refundMemo = e.detail.value;
    },
    iptcom(e) {
      this.logisticsCompny = e.detail.value;
    },
    iptnum(e) {
      this.logisticsNo = e.detail.value;
    },
    bindPickerChange: function(e) {
      this.refundReason = this.array[e.detail.value];
      this.setData({
        index: e.detail.value
      });
    },
    //提交所填信息
    submintMsg() {
      if (
        this.refundReason === "" ||
        this.logisticsCompny === "" ||
        this.logisticsNo === ""
      ) {
        return wx.showToast({
          title: "请完善必填信息",
          icon: "none",
          duration: 2000
        });
      }
      //提交
      this.refuns();
      wx.redirectTo({
        url: "/pages/store/retundGoodDetail"
      });
    }
  };
  onShow() {
    //    let address = wx.getStorageSync("return_address");
    //    console.log("本地地址")
    //    console.log(address)
    // if (address) {
    //   this.address = address;
    // }else{
    // }
    // this.$apply()
  }
  //开始申请退货

  async refuns() {
    const res = await shttp
      .post("/api/v1/member/refundreturn")
      .send({
        order_id: this.orderDetail.order_id,
        refund_type: 2,
        reason_info: this.refundReason,
        buyer_message: this.refundMemo,
        express_name: this.logisticsCompny,
        invoice_no: this.logisticsNo
      })
      .end();
    console.log(res);
    if (res.status == 0) {
      console.log("传过去");
      console.log(res.data.refund_id);
      wx.redirectTo({
        url: "./retundGoodDetail?refund_id=" + res.data.refund_id
      });
    }
  }
  onLoad(option) {
    console.log(option);
    this.orderDetail = JSON.parse(decodeURIComponent(option.goods));

    console.log(this.orderDetail);
  }
}
</script>

