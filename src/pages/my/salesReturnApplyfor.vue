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
  background: #f4f4f4;
  min-height: 100vh;
  color: #222;
}
.product_info {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 250rpx;
  background: #fff;
  margin-bottom: 20rpx;
  border-top: 1rpx solid #e5e5e5;
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
.nav-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 27rpx;
  background: #fff;
  font-size: 28rpx;
  margin-bottom: 20rpx;
}
.arrow {
  width: 15rpx;
  height: 25rpx;
}
.nav-btnTxt1 {
  font-size: 28rpx;
}
.nav-btnTxt1 text {
  color: #af0000;
  padding-left: 30rpx;
}
.nav-btnTxt2 {
  font-size: 20rpx;
  color: #636363;
}
.nav-btnRight {
  display: flex;
  align-items: center;
}
.nav-btnRight text {
  font-size: 28rpx;
  padding-right: 18rpx;
  color: #636363;
}
.inline {
  width: 550rpx;
}
.margin-bottom {
  margin-bottom: 2rpx;
}
.discount-bg {
  position: fixed;
  z-index: 9999;
  height: 100vh;
  background: rgba(1, 1, 1, 0.3);
  width: 100%;
  bottom: 0;
}
.discount-box {
  width: 100%;
  height: 814rpx;
  position: absolute;
  bottom: 0;
  background: #fff;
}
.discount-info {
  height: 98rpx;
  line-height: 98rpx;
  padding-left: 40rpx;
  font-size: 38rpx;
  border-bottom: 1rpx solid #e5e5e5;
}
.discount-title {
  text-align: center;
  padding: 30rpx 0;
  border-bottom: 1rpx solid #e5e5e5;
}
.discount-btn {
  height: 98rpx;
  line-height: 98rpx;
  text-align: center;
  background: #ff7900;
  color: #fff;
}
.submit-btn {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 88rpx;
  text-align: center;
  line-height: 88rpx;
  padding: 0;
  margin: 0;
  border-radius: 0;
  background: #ff7900;
  color: #fff;
  font-size: 32rpx;
}
</style>
<template>
  <view class="container">         
    <repeat for='{{order.order_goods}}' item='item'>
      <view class='product_info'>
        <image src='{{item.goods_image}}' mode="aspectFill"/>
        <view class='product'>
            <view class='product_title'>{{item.goods_name}}</view>
            <view class='row'>
                <view class='product_price'>¥{{item.goods_price}}</view>
            </view>
            <view class='row'>
                <view class='product_standard'></view>
                <view class='product_number'>×{{item.goods_num}}</view>
            </view>
        </view>
      </view>
    </repeat>
    <view class="nav-btn" @tap="showBox">      
      <view class="nav-btnTxt1">退款原因</view>
      <view class="nav-btnRight" wx:if="{{cause==''}}"><text>请选择</text><image class='arrow' src='../../images/icon_zuojiantou@2x.png' /></view>
      <view class="nav-btnRight" wx:else><text>{{cause}}</text></view>      
    </view>
    <view class="nav-btn">      
      <view class="nav-btnTxt1">退款金额<text>¥{{order.order_goods[0].goods_price}}</text></view>  
    </view>
    <form bindsubmit="formSubmit">
      <view class="nav-btn">      
        <view class="nav-btnTxt1">退货说明</view>
        <input type='text' name='txt1' class='inline' placeholder-style='font-size:28rpx;color:#888888;'  placeholder="选填"/>
      </view>
      <view class="nav-btn margin-bottom" wx:if="{{type!='refund'}}">      
        <view class="nav-btnTxt1">物流公司</view>
        <input type='text' name='txt2' class='inline'  placeholder-style='font-size:28rpx;color:#888888;'  placeholder="必填"/>
      </view>
      <view class="nav-btn" wx:if="{{type!='refund'}}">      
        <view class="nav-btnTxt1">物流单号</view>
        <input type='text' name='txt3' class='inline'  placeholder-style='font-size:28rpx;color:#888888;'  placeholder="必填"/>
      </view>
      <button formType="submit" class="submit-btn">提交</button>
    </form>
    <view class="discount-bg" wx:if="{{discountShow}}">
      <view class="discount-box">
        <view class="discount-title">退款原因</view>
        <repeat for='{{causeList}}' index='index'>
          <view class="discount-info" @tap="choice" data-index='{{index}}'>
            {{item}}
          </view>
        </repeat>
        <view class="discount-btn" @tap="discountSure">关闭</view>
      </view>   
    </view>
  </view>
</template>
<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
export default class SalesReturnApplyfor extends wepy.page {
  config = {
    navigationBarTitleText: "退货退款申请"
  };
  data = {
    order: null,
    causeList: [
      "货物缺损",
      "商品与描述不符",
      "卖家发错货",
      "质量问题",
      "假冒品牌",
      "其他"
    ],
    discountShow: false,
    cause: "",
    type: null,
    orderType: null //1虚拟 refund只退款
  };
  components = {};
  onLoad(opt) {
    if (opt.type == "refund") {
      this.type = "refund";
    }
    this.orderType = opt.orderType;
    this.order = JSON.parse(decodeURIComponent(opt.order));
    console.log(this.order);
    this.$apply();
  }
  onShow() {}
  showBox() {
    this.discountShow = true;
    this.$apply();
  }
  discountSure() {
    this.discountShow = false;
    this.$apply();
  }
  choice(e) {
    let index = e.currentTarget.dataset.index;
    this.cause = this.causeList[index];
    this.discountShow = false;
    this.$apply();
  }
  formSubmit(e) {
    let value = e.detail.value;
    if (!this.cause) {
      return wx.showToast({
        title: "请选择退款原因!",
        icon: "none",
        duration: 1000
      });
    }
    if (this.type != "refund") {
      if (!value.txt2) {
        return wx.showToast({
          title: "物流公司不能为空!",
          icon: "none",
          duration: 1000
        });
      } else {
        this.express_name = value.txt2;
      }
      if (!value.txt3) {
        return wx.showToast({
          title: "物流单号不能为空!",
          icon: "none",
          duration: 1000
        });
      } else {
        this.invoice_no = value.txt3;
      }
    }
    this.buyer_message = value.txt1;
    this.refund();
  }
  async refund() {
    let send = {};
    if (this.type == "refund") {
      if (this.orderType == "1") {
        send = {
          order_id: this.order.order_id,
          refund_type: 1,
          order_type: "vr_order",
          reason_info: this.cause,
          buyer_message: this.buyer_message
        };
      } else {
        send = {
          order_id: this.order.order_id,
          refund_type: 1,
          reason_info: this.cause,
          buyer_message: this.buyer_message
        };
      }
    } else {
      if (this.orderType == "1") {
        send = {
          order_id: this.order.order_id,
          refund_type: 2,
          order_type: "vr_order",
          reason_info: this.cause,
          buyer_message: this.buyer_message,
          express_name: this.express_name,
          invoice_no: this.invoice_no
        };
      } else {
        send = {
          order_id: this.order.order_id,
          refund_type: 2,
          reason_info: this.cause,
          buyer_message: this.buyer_message,
          express_name: this.express_name,
          invoice_no: this.invoice_no
        };
      }
    }
    const res = await shttp
      .post("/api/v1/member/refundreturn")
      .send(send)
      .end();
    if (res.status == 0) {
      wx.showToast({
        title: "已成功申请!",
        icon: "none",
        duration: 1000
      });
      if (this.order.order_goods[0].appointment == 1) {
        wx.navigateBack({
          delta: 3
        });
      } else {
        wx.navigateBack({
          delta: 2
        });
      }
    } else {
      wx.showToast({
        title: "申请失败!",
        icon: "none",
        duration: 1000
      });
    }
  }
}
</script>
