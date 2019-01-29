<style>
page {
  background: #f7f7f7;
}
</style>
<style scoped>
.service_title{
  position: relative;
  margin: 20rpx 0 0;
  padding: 25rpx 30rpx;
  font-size: 32rpx;
}

.service_wrap{
  padding: 20rpx 30rpx;
}
.service_img{
  flex-shrink: 0;
  width: 142rpx;
  height: 142rpx;
  border-radius: 10rpx;
  /* background: gray; */
}
.service{
  flex-grow: 1;
  margin-left: 20rpx;
  font-size: 24rpx;
}
.service_name{
  width: 100%;
  height: 1.2em;
  margin: 8rpx 0 0;
  font-size: 28rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.service_item{
  margin: 16rpx 0;
}
.service_store{
  margin-left: 30rpx;
}

.service_price{
  padding: 25rpx 40rpx;
  font-size: 26rpx;
  text-align: right;
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
}
.operate_info .Customer {
  padding: 0rpx;
  width: 160rpx;
  height: 60rpx;
  line-height: 60rpx;
  margin-right: 24rpx;
  border: 1rpx solid #222;
  border-radius: 30rpx;
  font-size: 26rpx;
  text-align: center;
}
.operate_info view {
  width: 160rpx;
  height: 60rpx;
  line-height: 60rpx;
  margin-right: 24rpx;
  border: 1rpx solid #222;
  border-radius: 30rpx;
  font-size: 26rpx;
  text-align: center;
}

.operate_info .pay, .operate_info .update_time, .operate_info .assess{
  border: 2rpx solid #10325f;
  color: #10325f;
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

.i_success{
  position: absolute;
  top: 0;
  right: 100rpx;
  width: 116rpx;
  height: 96rpx;
}
.i_delete{
  width: 34rpx;
  height: 34rpx;
}

.flex {
  display: flex;
  align-items: center;
}

.arrow {
  width: 16rpx;
  height: 26rpx;
}


.between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.s-fc-1{ color: #fff; }
.s-fc-2{ color: #222; }
.s-fc-3{ color: #8e939a; }
.s-fc-4{ color: #10325f; }
.s-fc-5{ color: #999; }
.s-fc-6{ color: #555; }

.s-bg-1{ background: #fff; }
.s-bg-2{ background: #f6f6f6; }
.s-bg-3{ background: #999; }
.s-bg-4{ background: #10325f;}
.s-bg-5{ background: #fafafa; }
</style>
<template>
  <view class="container">
    <view class="orderlist-topDiv">
      <tab :tabOption="tab" :nowindex.sync="nowindex" @tabitem.user="tabitem"></tab>
    </view>
    <view wx:if="{{orderList.length != 0}}">
      <view class="waitBody">
        <repeat for="{{orderList}}" key="index" item="order">
          <view class="service_title s-bg-1 s-fc-6" wx:if="{{order.order_state_id==10}}">待付款</view>
          <view class="service_title s-bg-1 s-fc-6" wx:if="{{order.order_state_id==20}}">待使用</view>
          <!-- <view class="service_title s-bg-1 s-fc-6" wx:if="{{order.order_state_id==30}}">待收货</view> -->
          <view class="service_title s-bg-1 s-fc-6" wx:if="{{order.refund_state == 2}}">已退款</view>
          <view class="service_title s-bg-1 s-fc-6" wx:if="{{order.order_state_id == 40 && order.evaluation_state == 0}}">待评价</view>
          <view class="service_title between s-bg-1 s-fc-6" wx:if="{{order.order_state_id == 40 && order.evaluation_state != 0}}">
            <view>已完成</view>
            <image class='i_delete' src='{{deleteURL}}' @tap='deleteOrder({{index}})' />
            <image class='i_success' src='{{successURL}}' />
          </view>

          <view @tap="goOrderDetail" data-index="{{index}}">
            <repeat for="{{order.order_goods}}" index='i' item="goods" wx:key='i'>

              <view class="service_wrap flex s-bg-5">
                <image class='service_img' src="{{goods.goods_img}}" mode="aspectFill">
                <view class="service s-fc-5">
                  <view class="service_name s-fc-2">{{goods.storegc_name}}</view>
                  <view class="service_item flex">
                    <view class="service_stylist">发型师：{{goods.goods_name}}</view>
                    <view class="service_store">预约门店：{{order.store_name}}</view>
                  </view>
                  <view class='service_time'>预约时间：{{order.time}}</view>
                  <!-- <view class="row">
                    <view class="product_standard">规格：{{items.goods_spec || "统一规格"}}</view>
                    <view class="product_number">×{{items.goods_num}}</view>
                  </view> -->
                </view>
              </view>

            </repeat>
            <view class='service_price s-fc-2 s-bg-1'>共1件商品 需付款：¥<text style='font-size: 32rpx;'>{{order.price1}}</text><text>.{{order.price2}}</text></view>
            <view class='service_price s-fc-2 s-bg-1' wx:if='{{order.voucher_price % 1 !== 0}}'>抵扣卷：-¥{{order.voucher_price}}</view>
            <!-- <view class="price_info">
              <view>实付款</view>
              <view>
                <text class="price">¥{{order.order_amount}}</text>
                <text class="freight">运费{{order.shipping_fee}}</text>
              </view>
            </view> -->
          </view>

          <view class="operate_info">
            <!-- <button class="Customer" open-type="contact" session-from="weapp" plain="true">联系客服</button> -->
            <view
              wx:if="{{order.order_state_id==10}}"
              @tap.stop="orderCancel"
              data-id="{{order.order_id}}"
              data-paysn="{{order.pay_sn}}"
              data-index="{{index}}"
            >取消支付</view>
            <view class='pay'
              wx:if="{{order.order_state_id==10}}"
              @tap.stop="payMoney"
              data-pay="{{order.pay_sn}}"
              data-index="{{index}}"
            >去支付</view>
            <view
              wx:if="{{order.order_state_id==20 && order.refund_state == 0}}"
              @tap.stop="showModal"
              data-order="{{order}}"
              data-id="{{order.order_id}}"
              data-index="{{index}}"
            >退款</view>
            <view class='update_time' wx:if='{{order.order_state_id == 20 && order.appointment_state == 0}}' @tap='goSelectTime({{index}})'>修改时间</view>
            <view class='update_time' wx:if='{{order.order_state_id == 40}}' @tap='goAgain({{index}})'>再来一单</view>
            <!-- <view
              wx:if="{{order.order_state_id==30}}"
              @tap.stop="orderReceive"
              data-id="{{order.order_id}}"
              data-index="{{index}}"
            >确认收货</view> -->
            <view class='assess'
              wx:if="{{order.order_state_id == 40 && order.evaluation_state == 0}}"
              @tap.stop="goAssess"
              data-order="{{order}}"
              data-id="{{order.order_id}}"
              data-index="{{index}}"
            >评价</view>
            <!-- <view
              wx:if="{{order.order_state_id==40}}"
              @tap.stop="orderDelete"
              data-id="{{order.order_id}}"
              data-index="{{index}}"
            >删除订单</view> -->
          </view>
        </repeat>
      </view>
    </view>
    <!--暂无数据显示-->
    <placeholder :show.sync="isEmpty" message="您还没有订单" wx:if="{{isEmpty}}"></placeholder>
  </view>
</template>
<script>
import wepy from "wepy";
import Tab from "../../components/tab";
import Placeholder from "../../components/placeholder";
import { shttp } from "../../utils/http";
export default class OrderList extends wepy.page {
  config = {
    navigationBarTitleText: "订单列表"
  };
  data = {
    successURL: '../../images/order/done.png',
    deleteURL: '../../images/order/delete.png',
    tab: {
      tabList: ["全部", "待付款", "待使用", "待评价", "已退款"]
    },
    nowindex: Number,
    // isEmpty: true,
    orderList: [],
    page: 1,
    query: {},
    changerType: null,
    changerIndex: null,
    cancel: false,
    total: 0,
    canLoad: false,
    serviceList: [],
  };
  components = {
    tab: Tab,
    placeholder: Placeholder
  };

  computed = {
    isEmpty(){
      return !this.orderList.length;
    }
  }

  onLoad(options) {
    if (options.choiceTab) {
      this.nowindex = options.choiceTab;
    } else {
      this.nowindex = 0;
    }
  }
  onShow() {
    wx.showLoading({ title: "加载中" });
    this.cancel = false;
    this.orderList = [];
    this.query.page = this.page = 1;
    this.query.limit = 10;

    this.getList();

  }
  goRefund(order_id){
    wx.navigateTo({ url: `/pages/order/refundReason?id=${order_id}` });
  }

  async goUpdate(i, type){
    let storegc_res = await shttp.get(`/api/v2/common/storegc`).query({}).end();

    let param = await shttp.get(`/api/v2/member/goodsList`).query({
        goods_id: this.orderList[i].order_goods[0].goods_id, 
      }).end(),
        stylist;

      stylist = param.data[0];

console.error(stylist);
      // goods_img
      try{
        stylist.goods_img = (JSON.parse(stylist.goods_image)).url;
      }catch(e){
        stylist.goods_img = stylist.goods_image;
      }

      // get storegc_name
      let storegcArr = storegc_res.data.filter(service => service.storegc_id == stylist.goods_spec)[0];
      stylist.storegc = storegcArr ? storegcArr : {};

      // add order_id
      if(type != 'again') stylist.order_id = this.orderList[i].order_id;

      stylist = encodeURIComponent(JSON.stringify(stylist));
      // return console.error( storegc_res, JSON.parse(decodeURIComponent(stylist)) );

      if(this.orderList[i].appointment_state == 0){
        // console.error(this.orderList[i].order_id);
        return wx.navigateTo({ url: `/pages/select/time?stylist=${stylist}` });
      }
  }
  methods = {
    goSelectTime(i){
      let updateContent = '每个订单仅限修改一次预约时间，请您确认后修改。如果需要更换预约发型师，需要先退单然后再次下单';

      return wx.showModal({ 
        title: '提示', 
        content: updateContent, 
        confirmColor: '#10325f',
        success: e => e.confirm ? this.goUpdate(i) : null
      });
    },
    goAgain(i){
      this.goUpdate(i, 'again');
    },
    showModal(e){
      let refundContent = '请注意，如果您选择了退款，下单时所用的抵扣券将不会返还！如有疑问，请联系客服',
          updateContent = '每个订单仅限修改一次预约时间，请您确认后修改。如果需要更换预约发型师，需要先退单然后再次下单',
          order_id = e.currentTarget.dataset.id;

      return wx.showModal({ 
        title: '提示', 
        content: refundContent, 
        confirmColor: '#10325f',
        success: e => e.confirm ? this.goRefund(order_id) : null
      }); 
    },
    goOrderDetail(e) {
      let index = e.currentTarget.dataset.index;
      // return wx.navigateTo({ url: `/pages/order/success?order_id=${this.orderList[index].order_id}` });
      wx.navigateTo({
        url: `/pages/order/detail?orderId=${this.orderList[index].order_id}`
      });
    },
    goAssess(e) {
      let index = e.currentTarget.dataset.index;

      wx.navigateTo({
        url: `/pages/order/assess?orderId=${this.orderList[index].order_id}`
      });
    },
    async deleteOrder(index){
      let order = this.orderList[index],
          param;
      
      param = {
        state_type: 'order_delete',
      };
      // return console.error(order, param);

      const res = await shttp.put(`/api/v2/member/orderstate/${order.order_id}`).send(param).end();

      if(res){
        console.error(res);
        this.orderList = [];
        this.getList(this.page = 1);
      }
    },
    
    async tabitem(e) {
      wx.showLoading({
        title: "加载中"
      });
      this.nowindex = e;
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
          this.query.order_state = 10;
          this.getList();
          break;
        case 2:
          this.query.order_state = 20;
          this.getList();
          break;
        case 3:
          this.query.order_state = 50;
          this.getList();
          break;
        case 4:
          this.query.order_state = 60;
          this.getList();
          break;
        default:
          break;
      }
    },
    
  };

  async getList() {
    const storegc_res = await shttp.get(`/api/v2/common/storegc`).query({}).end();

    if(storegc_res && storegc_res.data){
      this.serviceList = storegc_res.data;
    }

    const res = await shttp.get(`/api/v2/member/order`).query(this.query).end();

    if (res.status === 0) {
      if (res.data != null && res.data.length != 0) {

        res.data.forEach(v => {
          let arr = v.order_amount.split('.');
          
          v.price1 = arr[0];
          v.price2 = arr[1];

          v.order_goods.forEach(goods => {

            try{
              goods.goods_img = (JSON.parse(goods.goods_image)).url;
            }catch(e){
              goods.goods_img = goods.goods_image;
            }

            // storegc_name
            let s = this.serviceList.filter(service => service.storegc_id == goods.goods_spec)[0];
            goods.storegc_name = s ? s.storegc_name : '';

          });

          v.time = `${v.appointment_date} ${v.appointment_frame}`;
        });

        this.orderList = this.orderList.concat(res.data);
        this.total = res.pagination ? res.pagination.total : 0;
      }
    }

    this.canLoad = true;
    this.$apply();
    wx.hideLoading();
  }

  //上拉加载
  onReachBottom() {
    if(!this.canLoad || this.total <= this.orderList.length) return ;

    this.canLoad = false;

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
    let send;
    let pay_sn = e.currentTarget.dataset.paysn;
    send = {
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
  assess(e) {
    let order = e.currentTarget.dataset.order;

    wx.navigateTo({
      url: `/pages/order/assess?id=${111}`,
    });
  }
  //退款
  salesReturn(e) {
    let order = e.currentTarget.dataset.order;
    let type = e.currentTarget.dataset.type;
    wx.navigateTo({ url: `/pages/order/refundReason?id=${order.order_id}` });
    // if (type == "1") {
    //   wx.navigateTo({
    //     url:
    //       "/pages/store/selectreturn?goods=" +
    //       encodeURIComponent(JSON.stringify(order))
    //   });
    // } else {
    //   wx.navigateTo({
    //     url:
    //       "/pages/store/selectreturn?goods=" +
    //       encodeURIComponent(JSON.stringify(order))
    //   });
    // }
  }
}
</script>
