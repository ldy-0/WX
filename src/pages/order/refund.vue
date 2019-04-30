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
  margin-bottom: 20rpx;
  color: #636363;
  background: #fff;
}
.person_info_wrap .icon_diwei {
  width: 23rpx;
  height: 33rpx;
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
  min-height: 250rpx;
  background: #fff;
}
.product_info image {
  width: 180rpx;
  height: 180rpx;
  border-radius: 10rpx;
}
.product_info .product {
  width: 500rpx;
}
.product_info .product .product_title {
  color: #333;
  padding: 40rpx 0 70rpx;
}

.product_price_wrap{
  font-size: 26rpx;
  color: #dd3d27;
}
.product_price {
  line-height: 44rpx;
  border-radius: 22rpx;
  font-size: 32rpx;
  text-align: center;
}
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
  border-top: 2rpx solid #e5e5e5;
  background: #fff;
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

.mt20{
  margin: 20rpx 0 0;
}

.bottom_bar {
  margin: 188rpx 20rpx 0;
  line-height: 88rpx;
  border-radius: 10rpx;
  color: #fff;
  background: #4fb84a;
  text-align: center;
}
</style>

<template>
  <view class="container">

    <view wx:if="{{isReturnGoods}}">
      <view class='returnGoods_title'>退货寄回地址</view>

      <navigator class='person_info_wrap around' url=''>
          <image class="icon_diwei" src='../../images/icon_dingwei@2x.png' />
          <view class='person_info'>
              <view class='person'>
                  <view>收货人：{{refundAddress.name}}</view>
                  <view>{{refundAddress.phone}}</view>
              </view>
              <view>收货地址：{{refundAddress.address}}</view>
          </view>
      </navigator>
    </view>

    <repeat for="{{orderDetail.order_goods}}" key="index" index="index" item="item">
      <view class="product_info around">
        <image src="{{item.goods_image}}">
        <view class="product">

          <view class="product_title">{{item.goods_name}}</view>
          <view class="row">
            <!-- <view class="product_standard">规格：{{item.spec_value|| '统一规格'}}</view> -->
            <view class="product_number">×{{item.goods_num}}</view>
          </view>
          <view class="row">
            <view class="product_price_wrap">¥<text class='product_price'>{{item.goods_price}}</text></view>
          </view>

        </view>
      </view>
    </repeat>

    <view class="single_row row mt20">
      <view class="title">退款原因</view>
      <picker class="mypicker" bindchange="bindPickerChange" value="{{index}}" range="{{array}}">
        <view class="picker">{{array[index]}}</view>
      </picker>
      <image class="arrow" src="../../images/icon_zuojiantou@2x.png">
    </view>

    <view class="single_row row">
      <view>退款金额</view>
      <view class="price">¥{{orderDetail.refundPrice}}</view>
    </view>
    <view class="single_row row">
      <view>退还积分</view>
      <view class="price">¥{{orderDetail.order_points}}</view>
    </view>
    <view class="single_row row">
      <view>退还余额</view>
      <view class="price">¥{{orderDetail.pd_amount}}</view>
    </view>

    <view class="single_row">
      <view class="title">退货说明</view>
      <input class="description" placeholder="选填" bindinput="iptinfo">
    </view>

    <view wx:if="{{isReturnGoods}}">
      <view class="single_row ">
        <view class="title">物流公司</view>
        <input class="description" placeholder="必填" bindinput="iptcom">
      </view>
      <view class="single_row">
        <view class="title">物流单号</view>
        <input class="description" placeholder="必填" bindinput="iptnum">
      </view>
    </view>

    <view class="bottom_bar" @tap="submintMsg">提交</view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
export default class ReturnGoods extends wepy.page {
  config = {
    navigationBarTitleText: ""
  };
  data = {
    type: '',
    //订单商品详情
    orderDetail: {},
    //收货人地址
    address: null,
    //退款原因选择
    array: [
      "货物缺损",
      "商品与描述不符",
      "长时间未发货",
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
    logisticsNo: "",
    canSubmit: true,
    refundAddress: {},
  };

  computed = {
    isReturnGoods(){ return this.type === 'returnGoods' },
  };

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
      if ( this.refundReason === "") {
        return wx.showToast({ title: "请完善必填信息", icon: "none", duration: 2000 });
      }

      if(this.isReturnGoods && !this.logisticsCompny) return wx.showModal({ content: '请填写物流公司信息', showCancel: false });
      if(this.isReturnGoods && !this.logisticsNo) return wx.showModal({ content: '请填写物流单号信息', showCancel: false });

      if(!this.canSubmit) return ;
      this.canSubmit = false;

      //提交
      this.refuns();
    }
  };
  onShow() {
    let address = wx.getStorageSync("return_address");

    if(address){ this.address = address; }
    console.log('local:', address)

  }
  //开始申请退货

  async refuns() {
    let param = {
        order_id: this.orderDetail.order_id,
        refund_type: this.isReturnGoods ? 2 : 1,
        reason_info: this.refundReason,
        buyer_message: this.refundMemo,
        express_name: this.logisticsCompny,
        invoice_no: this.logisticsNo
      };

    const res = await shttp.post("/api/v2/member/refundreturn").send(param).end();

    if (res.status == 0) {
      wx.showToast({ title: "操作成功", icon: "none", duration: 2000 });
      return setTimeout(() => { wx.navigateBack({ delta: 2 }) }, 1000);
    } else if (res.status == 1) {
      wx.showToast({ title: res.error, icon: "none", duration: 2000 });
    } else {
      wx.showToast({ title: "操作失败", icon: "none", duration: 2000 });
    }

    this.canSubmit = true;
    this.$apply();
  }
  onLoad(option) {
    this.type = option.type;
    this.orderDetail = JSON.parse(decodeURIComponent(option.goods));

    this.setTitle(option.type);

    console.log('goodsDetail: ', this.orderDetail);
    this.getRefundAddress();
  }

  setTitle(type){
    wx.setNavigationBarTitle({ title: type === 'refund' ? '退款' : '退换货' });
  }

  //获取默认地址
  async getDefaultAddress() {
    const res = await shttp.get("/api/v2/member/address").query({}).end();

    if (res.data.length != 0) {
      res.data.forEach(item => {
        if (item.address_is_default == "1") {
          console.log("进来了吗");
          this.address = item;
        }
      });
      if (this.address == null) {
        this.address = res.data[0];
      }
    } else {
      wx.showToast({ title: "请填写收货地址", icon: "none", duration: 2000 });
    }

    console.log(this.address);
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

