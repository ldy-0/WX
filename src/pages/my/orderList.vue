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

.title {
  line-height: 68rpx;
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
     <view class="waitView"  wx:if="{{isAll || nowindex==1 }}">
      <view class='title' wx:if="{{waitPayList!=0}}" >待付款</view>
        <view class="waitBody">
          <repeat for='{{waitPayList}}' key="index" item="item">
             <repeat for="{{item.order_goods}}" item='items'>
            <view class='product_info'  @tap="goOrderDetail({{item.order_id}},{{item.payment_code}})">
              <image src='{{items.goods_image}}' mode="aspectFill" />
              <view class='product'>
                  <view class='product_title'>{{items.goods_name}}</view>
                  <view class='row'>
                      <view class='product_price'>¥{{items.goods_price}}</view>
                  </view>
                  <view class='row'>
                      <view class='product_standard'>规格：{{items.skuStr || "统一规格"}}</view>
                      <view class='product_number'>×{{items.goods_num}}</view>
                  </view>
              </view>
            </view>
             </repeat>
          <view class='price_info'>
              <view>实付款</view>
              <view>
                  <text class='price'>¥{{item.order_amount}}</text>
                  <text class='freight'>运费{{item.shipping_fee}}</text>
              </view>
          </view>
          <view class='operate_info'>
            <button  class="Customer" open-type="contact" session-from="weapp" plain="true">联系客服</button>
            <view @tap="payMoney({{item.pay_sn}})" >支付</view>
             <view @tap="changeOrder('order_cancel',{{item.order_id}},{{item.pay_sn}})">取消订单</view>
            
          </view>
     </repeat>
      </view>
    </view>
    <view class="waitView"  wx:if="{{isAll || nowindex==2}}">
      <view class='title'  wx:if="{{waitShipList!=0}}">待发货</view>
        <view class="waitBody">
          <repeat for="{{waitShipList}}" key="index" item="item">
          <repeat for="{{item.order_goods}}" item='items'>
            <view class='product_info' @tap="goOrderDetail({{item.order_id}},{{item.payment_code}})">
              <image src='{{items.goods_image}}' mode="aspectFill" />
              <view class='product'>
                  <view class='product_title'>{{items.goods_name}}</view>
                  <view class='row'>
                      <view class='product_price'>¥{{items.goods_price}}</view>
                  </view>
                  <view class='row'>
                      <view class='product_standard'>规格：{{items.skuStr || "统一规格"}}</view>
                      <view class='product_number'>×{{items.goods_num}}</view>
                  </view>
              </view>
            </view>
          </repeat>
          <view class='price_info'>
              <view>实付款</view>
              <view>
                  <text class='price'>¥{{item.order_amount}}</text>
                  <text class='freight'>运费{{item.shipping_fee}}</text>
              </view>
          </view>
          <view class='operate_info'>
            <button  class="Customer" open-type="contact" session-from="weapp" plain="true">联系客服</button>
            <!-- <view @tap="toReturnGood({{item}})">退货/换货</view> -->
           
          </view>
        </repeat>
      </view>
    </view>
    <view class="waitView"  wx:if="{{isAll || nowindex==3}}">
      <view class='title'  wx:if="{{waitReceiptList!=0}}">待收货</view>
        <view class="waitBody">
          <repeat for='{{waitReceiptList}}' item='item'>
              <repeat for="{{item.order_goods}}" item='items'>
            <view class='product_info'  @tap="goOrderDetail({{item.order_id}},{{item.payment_code}})">
              <image src='{{items.goods_image}}' mode="aspectFill" />
              <view class='product'>
                  <view class='product_title'>{{items.goods_name}}</view>
                  <view class='row'>
                      <view class='product_price'>¥{{items.goods_price}}</view>
                  </view>
                  <view class='row'>
                      <view class='product_standard'>规格：{{items.skuStr || "统一规格"}}</view>
                      <view class='product_number'>×{{items.goods_num}}</view>
                  </view>
              </view>
            </view>
        </repeat>
          <view class='price_info'>
              <view>实付款</view>
              <view>
                  <text class='price'>¥{{item.order_amount}}</text>
                  <text class='freight'>运费{{item.shipping_fee}}</text>
              </view>
          </view>
          <view class='operate_info'>
            <button  class="Customer" open-type="contact" session-from="weapp" plain="true">联系客服</button>
            <!-- <view @tap="toRefun()">退货/换货</view> -->
              <view  @tap="changeOrder('order_receive',{{item.order_id}})">确认收货</view>
            <!-- <view>查看物流</view> -->
          </view>
             </repeat>
      </view>
    </view>
    <view class="waitView"  wx:if="{{isAll || nowindex==4}}">
      <view class='title' wx:if="{{waitEvaluationList!=0}}">已完成</view>
        <view class="waitBody">
          <repeat for='{{waitEvaluationList}}' item='item'>
              <repeat for="{{item.order_goods}}" item='items'>
            <view class='product_info'  @tap="goOrderDetail({{item.order_id}},{{item.payment_code}})">
              <image src='{{items.goods_image}}' mode="aspectFill" />
              <view class='product'>
                  <view class='product_title'>{{items.goods_name}}</view>
                  <view class='row'>
                      <view class='product_price'>¥{{items.goods_pay_price}}</view>
                  </view>
                  <view class='row'>
                      <view class='product_standard'>规格：{{items.skuStr || "统一规格"}}</view>
                      <view class='product_number'>×{{items.goods_num}}</view>
                  </view>
              </view>
            </view>
           </repeat>
          <view class='price_info'>
              <view>实付款</view>
              <view>
                  <text class='price'>¥{{item.order_amount}}</text>
                  <text class='freight'>运费{{item.shipping_fee}}</text>
              </view>
          </view>
          <view class='operate_info'>
            <button  class="Customer" open-type="contact" session-from="weapp" plain="true">联系客服</button>
            <!-- <view @tap="toReturnGoods({{item}})">退货/换货</view>
            <view @tap="toGoodsReviews({{item}})">评价</view> -->
          </view>
           </repeat>
      </view>
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
export default class OrderList extends wepy.page {
  config = {
    navigationBarTitleText: "我的订单"
  };
  data = {
    tab: {
      tabList: ["全部", "待支付", "待发货", "待完成", "已完成"]
    },
    //显示全部栏
    isAll: true,
    //显示哪一栏
    nowindex: Number,
    //显示提示的
    is_empty: false,
    //订单列表
    orderList: [],
    //待付款
    waitPayList: [],
    //待发货
    waitShipList: [],
    //待收货
    waitReceiptList: [],
    //待评价
    waitEvaluationList: []
  };
  components = {
    tab: Tab,
    placeholder: Placeholder
  };
  onLoad(options) {
    wx.showLoading({
      title: "加载中"
    });
    this.nowindex = options.choiceTab || 0;
    console.log(this.nowindex);
    //获取订单列表
    //this.getOrderList();
    this.$apply();
  }
  onShow() {
    this.getOrderList();
  }
  methods = {
    //切换效果
    async tabitem(e) {
      this.getOrderList();
      this.nowindex = e;
      console.log("nowindex" + e);
      if (this.nowindex == 0) {
        this.isAll = true;
      } else {
        this.isAll = false;
      }
      this.$apply();
    },
    //去订单详情
    goOrderDetail(id, payWay) {
      wx.navigateTo({
        url: "/pages/store/orderdetail?orderId=" + id + "&payWay=" + payWay
      });
    },
    //支付
    payMoney(pay_sn) {
      this.orderPay(pay_sn);
    },
    //改变订单状态
    changeOrder(type, id, pay_sn) {
      console.log(pay_sn);
      //  return
      let that = this;
      wx.showModal({
        title: "提示",
        content: "确认操作吗？",
        success: function(res) {
          if (res.confirm) {
            that.changeOrderState(type, id, pay_sn);
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    //评价
    toGoodsReviews(list) {
      let commitList = encodeURIComponent(JSON.stringify(list));
      //return
      wx.navigateTo({
        url: "./goodsReviews?commitList=" + commitList
      });
    },
    //退货换货
    toReturnGoods(item) {
      let goods = encodeURIComponent(JSON.stringify(item));
      wx.navigateTo({
        url: "../store/selectreturn?goods=" + goods
      });
    }
  };
  //改变订单状态
  async changeOrderState(type, id, pay_sn) {
    console.log(this);
    console.log("改变状态");
    let that = this;
    console.log(type, id);
    let params = {
      state_type: type,
      pay_sn: pay_sn || ""
    };
    const res = await shttp
      .put("/api/v2/member/orderstate/" + id)
      .send(params)
      .end();
    if (res.status == 0) {
      wx.showToast({
        title: "操作成功",
        icon: "success",
        duration: 1000
      });
      setTimeout(function() {
        that.getOrderList();
      }, 1100);
    }
    console.log("状态返回");
    console.log(res);
  }
  //获取订单列表
  async getOrderList() {
    wx.showLoading({
      title: "加载中"
    });
    this.orderList = [];
    const res = await shttp
      .get("/api/v2/member/order")
      .query({
        page: 1,
        limit: 10000
      })
      .end();
    // console.log("订单列表")
    // console.log(res.data)
    let listObj = res.data;
    if (!res.data) {
      this.is_empty = true;
      wx.hideLoading();
      this.$apply();
      return;
    }
    let { values } = Object;
    for (let value of values(listObj)) {
      this.orderList = this.orderList.concat(value);
    }
    this.arrClass(this.orderList);
    //   console.log(this.orderList)
  }
  //分类订单数据
  arrClass(arr) {
    // 订单状态：0:已取消 10:未付款 12:部分支付 20:已付款 30:已发货 40:已收货
    this.waitPayList = [];
    this.waitShipList = [];
    this.waitReceiptList = [];
    this.waitEvaluationList = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].order_state_id == 10) {
        //待付款
        this.waitPayList.push(arr[i]);
      } else if (arr[i].order_state_id == 20) {
        //带发货
        this.waitShipList.push(arr[i]);
      } else if (arr[i].order_state_id == 30) {
        //带收货
        this.waitReceiptList.push(arr[i]);
      } else if (arr[i].order_state_id == 40 && arr[i].evaluation_state == 0) {
        //待评价
        this.waitEvaluationList.push(arr[i]);
      }
    }
    console.log(this.nowindex);
    switch (this.nowindex) {
      case 1:
        if (this.waitPayList.length == 0) {
          this.is_empty = true;
        } else {
          this.is_empty = false;
        }
        break;
      case 2:
        if (this.waitShipList.length == 0) {
          this.is_empty = true;
        } else {
          this.is_empty = false;
        }
        break;
      case 3:
        if (this.waitReceiptList.length == 0) {
          this.is_empty = true;
        } else {
          this.is_empty = false;
        }
        break;
      case 4:
        if (this.waitEvaluationList.length == 0) {
          this.is_empty = true;
        } else {
          this.is_empty = false;
        }
        break;
      default:
        if (this.orderList.length == 0) {
          this.is_empty = true;
        } else {
          this.is_empty = false;
        }
    }
    wx.hideLoading();
    //console.log(this)
    this.$apply();
  }
  async orderPay(id) {
    let pay_sn = id;
    const res = await shttp.put("/api/v2/member/order/" + pay_sn).end();
    if (res.data) {
      wx.showToast({
        title: "支付申请中...",
        icon: "none",
        duration: 2000
      });
      let order_id = res.data.order_id;
      wx.requestPayment({
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonceStr,
        package: res.data.package,
        signType: "MD5",
        paySign: res.data.paySign,
        success: function(res) {
          wx.reLaunch({
            url: `../store/bought?id=${order_id}`
          });
        },
        fail: function(res) {
          wx.showToast({
            title: "支付失败",
            icon: "none",
            duration: 2000
          });
        }
      });
    }
  }
}
</script>
