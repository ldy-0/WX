<style>
page {
  background: #f7f7f7;
}
</style>
<style scoped>
.title {
  height: 80rpx;
  line-height: 80rpx;
  padding-left: 30rpx;
  text-align: left;
  color: #555555;
  background: #fff;
  font-size: 32rpx;
  font-weight: 600;
}
.title-order40 {
  position: relative;
}
.title-img1 {
  position: absolute;
  width: 116rpx;
  height: 96rpx;
  top: 0;
  right: 10rpx;
}
.product_info {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 182rpx;
  background: #f7f7f7;
}
.product_info image {
  width: 142rpx;
  height: 142rpx;
  border-radius: 10rpx;
}
.product_info .product {
  width: 500rpx;
  height: 142rpx;
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
  font-size: 28rpx;
}
.product_info .product .product_price {
  font-size: 28rpx;
  color: #e61717;
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
  flex-direction: row-reverse;
  align-items: center;
  height: 80rpx;
  padding: 0 24rpx;
  background: #fff;
  color: #222;
  font-size: 26rpx;
}
.price_info .price {
  font-size: 32rpx;
}
.price_info .freight {
  display: inline-block;
  margin-left: 10rpx;
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
  width: 160rpx;
  height: 60rpx;
  line-height: 60rpx;
  margin-right: 24rpx;
  border: 1rpx solid #333;
  border-radius: 30rpx;
  font-size: 26rpx;
  text-align: center;
}
.operate_infoBtn {
  width: 160rpx;
  height: 60rpx;
  line-height: 60rpx;
  margin-right: 24rpx;
  border: 1rpx solid #333;
  border-radius: 30rpx;
  font-size: 26rpx;
  text-align: center;
}
.operate_infoBtnCol {
  border: 1rpx solid #4fb84a;
  color: #4fb84a;
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
  padding-top: 80rpx;
}
.orderlist-topDiv {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
}
.gray-f7f7f7 {
  height: 12rpx;
  background: #f7f7f7;
}
.orderlist-divfff {
  height: 12rpx;
  background: #ffffff;
}
</style>
<template>
  <view class="container">
    <view class="orderlist-topDiv">
      <tab :tabOption="tab" :nowindex.sync="nowindex" @tabitem.user="tabitem"></tab>
    </view>
    <view wx:if="{{orderList.length != 0}}">
      <view class="waitBody">
        <repeat for="{{orderList}}" key="index" item="order">
          <view class="title" wx:if="{{order.order_state_id==10}}">待付款</view>
          <view class="title" wx:if="{{order.order_state_id==20}}">待发货</view>
          <view class="title" wx:if="{{order.order_state_id==30}}">待收货</view>
          <view class="title" wx:if="{{order.order_state_id==40}}">已收货</view>
          <view class="title" wx:if="{{order.order_state_id==50}}">待评价</view>
          <view class="title" wx:if="{{order.order_state_id==100}}">已关闭</view>
          <view class="title title-order40" wx:if="{{order.order_state_id==80}}">
            已完成
            <image class="title-img1" src="../../images/img_6@2x.png">
          </view>
          <view @tap="goOrderDetail" data-index="{{index}}">
            <repeat for="{{order.order_goods}}" item="items">
              <view class="product_info">
                <image src="{{items.goods_image}}" mode="aspectFill">
                <view class="product">
                  <view class="product_title">{{items.goods_name}}</view>
                  <!-- <view class="row">
                    <view class="product_price">¥{{items.goods_price}}</view>
                  </view> -->
                  <view class="row">
                    <!-- <view class="product_standard">规格：{{items.goods_spec || "统一规格"}}</view> -->
                    <view class="product_number">×{{items.goods_num}}</view>
                  </view>
                </view>
              </view>
            </repeat>
            <view class="price_info">
              <view>
                共{{order.order_goods.length}}件商品 实付款：¥<text class="price">{{order.order_amount}}</text>
                <!-- <text class="freight" wx:if="{{order.shipping_fee!='0.00'}}">(含运费¥{{order.shipping_fee}})</text> -->
              </view>
            </view>
            <view class="price_info" wx:if="{{order.voucher_price!='0.00'}}">
              <view>
                优惠券：-¥{{order.Preferential}}
              </view>
            </view>
          </view>
          <view class="operate_info">
            <button
              wx:if="{{order.order_state_id==20||order.order_state_id==30||order.order_state_id==40||order.order_state_id==50}}"
              class="Customer"
              open-type="contact"
              session-from="weapp"
              plain="true"
            >联系客服</button>
            <!-- <view
              class="operate_infoBtn"
              wx:if="{{order.order_state_id==10}}"
              @tap.stop="orderCancel"
              data-id="{{order.order_id}}"
              data-paysn="{{order.pay_sn}}"
              data-index="{{index}}"
            >取消支付</view> -->
            <!-- <view
              class="operate_infoBtn operate_infoBtnCol"
              wx:if="{{order.order_state_id==10}}"
              @tap.stop="payMoney"
              data-pay="{{order.pay_sn}}"
              data-index="{{index}}"
            >去支付</view> -->
            <!-- <view
              class="operate_infoBtn operate_infoBtnCol"
              wx:if="{{order.order_state_id==20||order.order_state_id==30}}"
              @tap.stop="salesReturn"
              data-order="{{order}}"
              data-id="{{order.order_id}}"
              data-index="{{index}}"
            >退款</view> -->
            <view
              class="operate_infoBtn operate_infoBtnCol"
              wx:if="{{order.order_state_id==30}}"
              @tap.stop="orderReceive"
              data-id="{{order.order_id}}"
              data-index="{{index}}"
            >确认收货</view>
            <view
              class="operate_infoBtn operate_infoBtnCol"
              wx:if="{{order.order_state_id==40&&order.evaluation_state==0}}"
              @tap.stop="evaluate"
              data-order="{{order}}"
              data-id="{{order.order_id}}"
              data-index="{{index}}"
            >评价</view>
            <view
              class="operate_infoBtn"
              wx:if="{{order.order_state_id==40&&order.evaluation_state==1}}"
              @tap.stop="orderDelete"
              data-id="{{order.order_id}}"
              data-index="{{index}}"
            >删除订单</view>
          </view>
        </repeat>
      </view>
    </view>
    <!--暂无数据显示-->
    <placeholder :show.sync="is_empty" message="还没有相关的订单" wx:if="{{showa&&showb&&showc}}"></placeholder>
  </view>
</template>
<script>
import wepy from "wepy";
import Tab from "../../components/tab";
import Placeholder from "../../components/placeholder";
import { shttp } from "../../utils/http";
import calc from "calculatorjs";
export default class OrderList extends wepy.page {
  config = {
    navigationBarTitleText: "秒杀订单列表"
  };
  data = {
    tab: {
      tabList: ["全部", "待发货", "待收货", "待评价"]
    },
    nowindex: Number,
    is_empty: true,
    showa: true,
    showb: true,
    showc: true,
    orderList: [],
    page: 1,
    query: {},
    changerType: null,
    changerIndex: null,
    cancel: false
  };
  components = {
    tab: Tab,
    placeholder: Placeholder
  };
  onLoad(options) {
    if (options.choiceTab) {
      this.nowindex = options.choiceTab;
    } else {
      this.nowindex = 0;
    }
  }
  onShow() {
    wx.showLoading({
      title: "加载中"
    });
    this.showa = true;
    this.showb = true;
    this.showc = true;
    this.cancel = false;
    this.orderList = [];
    this.page = 1;
    this.query.page = this.page;
    this.query.limit = 10;
    delete this.query.order_state;
    let e = Number(this.nowindex);
    switch (e) {
      case 0:
        this.getList();
        break;
      case 1:
        this.query.order_state = 10;
        this.getList();
        break;
      case 2:
        this.query.order_state = 20;
        this.getList();
        break;
      case 3:
        this.query.order_state = 30;
        this.getList();
        break;
      case 4:
        this.query.order_state = 50;
        this.getList();
        break;
      default:
        break;
    }
    this.$apply();
  }
  methods = {
    async tabitem(e) {
      wx.showLoading({
        title: "加载中"
      });
      //订单状态：0:已取消 10:未付款 20:已付款 30:已发货 40:已收货 50：待评价
      this.nowindex = e;
      this.showa = true;
      this.showb = true;
      this.showc = true;
      this.cancel = false;
      this.unpaidOrder = [];
      this.orderList = [];
      this.page = 1;
      this.query.page = this.page;
      this.query.limit = 10;
      delete this.query.order_state;
      switch (e) {
        case 0:
          this.getList();
          break;
        case 1:
          this.query.order_state = 20;
          this.getList();
          break;
        case 2:
          this.query.order_state = 30;
          this.getList();
          break;
        case 3:
          this.query.order_state = 50;
          this.getList();
          break;
        case 4:
          this.query.order_state = 50;
          this.getList();
          break;
        default:
          break;
      }
    },
    goOrderDetail(e) {
      let index = e.currentTarget.dataset.index;
      let url = `/pages/store/orderdetail?orderId=${this.orderList[index].order_id}&unVip=${true}&type=secKill`;

      wx.navigateTo({ url });
    }
  };
  async getList() {
    const res = await shttp
      .get(`/api/v2/member/myseckill`)
      .query(this.query)
      .end();
    if (res.status === 0) {
      wx.hideLoading();
      if (res.data != null && res.data.length != 0) {
        res.data.forEach(element => {
          element.Preferential =calc.sub(calc.add(element.goods_total_prices,element.shipping_fee),element.order_amount).toFixed(2);
        });
        this.showa = false;

        res.data.forEach(this.format);
        this.orderList = this.orderList.concat(res.data);
      }
    } else {
      if (this.orderList.length != 0) {
        this.showa = false;
      }
      wx.hideLoading();
    }
    this.$apply();
  }

  format(order){
    order.order_goods.forEach(v => {

      let spec = v.goods_spec,
          specStr = '';

      if(spec){
        for(let key in spec){ specStr += `${spec[key]}; `; }
        v.goods_spec = specStr.replace(/;\s$/g, '');
        // console.error(spec, specStr);
      }

    });
  }

  //上拉加载
  onReachBottom() {
    this.page = this.page + 1;
    this.query.page = this.page;
    this.getList();

    this.$apply();
  }
  //支付
  async payMoney(e) {
    let pay_sn = e.currentTarget.dataset.pay;
    let index = e.currentTarget.dataset.index;
    let send = {
      pay_sn: pay_sn
    };
    const res = await shttp.put(`/api/v2/member/order/${pay_sn}`).end();
    if (res.data) {
      wx.showToast({
        title: "支付申请中...",
        icon: "none",
        duration: 2000
      });
      console.log(res);
      let order_id = res.data.order_id;
      let pay_sn = res.data.pay_sn;
      let that = this;
      wx.requestPayment({
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonceStr,
        package: res.data.package,
        signType: "MD5",
        paySign: res.data.paySign,
        success: function(res) {
          setTimeout(() => {
            wx.reLaunch({
              url: `/pages/store/bought?id=${order_id}`
            });
          }, 500);
        },
        fail: function(res) {
          wx.showToast({
            title: "支付失败",
            icon: "none",
            duration: 2000
          });
        }
      });
    } else if (res.status == 1) {
      wx.showToast({
        title: res.error,
        icon: "none",
        duration: 2000
      });
    }
  }
  //取消订单  1虚拟 //订单状态,order_cancel:取消订单,order_receive:收货,order_delete:删除订单
  async orderCancel(e) {
    this.changerIndex = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id
    let send;
    let pay_sn = e.currentTarget.dataset.paysn;
    send = {
      order_id: id,
      pay_sn: pay_sn,
      state_type: "order_cancel"
    };
    let that = this;
    wx.showModal({
      title: "提示",
      content: "是否取消订单",
      success: function(res) {
        if (res.confirm) {
          that.changerOrder(send);
        } else if (res.cancel) {
          return;
        }
      }
    });
  }
  //确认收货
  async orderReceive(e) {
    let order_id = e.currentTarget.dataset.id;
    this.changerIndex = e.currentTarget.dataset.index;
    let send;

    send = {
      order_id: order_id,
      state_type: "order_receive"
    };

    let that = this;
    wx.showModal({
      title: "提示",
      content: "是否确认收货",
      success: function(res) {
        if (res.confirm) {
          that.changerOrder(send);
        } else if (res.cancel) {
          return;
        }
      }
    });
  }
  //删除订单
  async orderDelete(e) {
    let order_id = e.currentTarget.dataset.id;
    this.changerIndex = e.currentTarget.dataset.index;
    let send;
    send = {
      order_id: order_id,
      state_type: "order_delete"
    };

    let that = this;
    wx.showModal({
      title: "提示",
      content: "是否删除订单",
      success: function(res) {
        if (res.confirm) {
          that.changerOrder(send);
        } else if (res.cancel) {
          return;
        }
      }
    });
  }
  //改变订单状态
  async changerOrder(send) {
    const res = await shttp
      .put(`/api/v2/member/orderstate/${send.order_id}`)
      .send(send)
      .end();
    if (res.status === 0) {
      wx.showToast({
        title: "操作成功",
        duration: 1000
      });
      if (this.cancel) {
        if (this.changerType == "1") {
          this.vrorderList.splice(this.changerIndex, 1);
        } else {
          this.unpaidOrder.splice(this.changerIndex, 1);
        }
      } else {
        if (this.changerType == "1") {
          this.vrorderList.splice(this.changerIndex, 1);
        } else {
          this.orderList.splice(this.changerIndex, 1);
        }
      }

      this.$apply();
    } else {
      wx.showToast({
        title: res.error,
        duration: 1000
      });
    }
  }
  godetile(e) {
    let id = e.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: `../store/goodsDetails?goods_commonid=${id}`
    });
  }
  //评价订单
  evaluate(e) {
    let order = e.currentTarget.dataset.order;
    let type = e.currentTarget.dataset.type;
    if (type == "1") {
      wx.navigateTo({
        url:
          "/pages/my/goodsReviews?type=1&commitList=" +
          encodeURIComponent(JSON.stringify(order))
      });
    } else {
      wx.navigateTo({
        url:
          "/pages/my/goodsReviews?commitList=" +
          encodeURIComponent(JSON.stringify(order))
      });
    }
  }
  //退款/退货
  salesReturn(e) {
    let order = e.currentTarget.dataset.order;
    let type = e.currentTarget.dataset.type;
    if (type == "1") {
      wx.navigateTo({
        url:
          "/pages/store/selectreturn?goods=" +
          encodeURIComponent(JSON.stringify(order))
      });
    } else {
      wx.navigateTo({
        url:
          "/pages/store/selectreturn?goods=" +
          encodeURIComponent(JSON.stringify(order))
      });
    }
  }
}
</script>
