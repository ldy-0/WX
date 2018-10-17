<template>
  <div class="container" :class='{ ios: isIos}'>

    <topBar :config='config'></topBar>

    <div class='wrap'>

      <!-- <div style='height: 200rpx; background: #786578; overflow: hidden;'>
        <div style='display: flex; justify-content: center; align-items: center; margin: 30rpx auto;'>
          <image class='package_img' src='/static/package.png' mode='aspectFill' />
          <div class='s-fc-6' style='margin-left: 60rpx; text-align: center;'>
            <div style='font-size: 32rpx;'>买家已付款</div>
            <div style='margin: 10rpx 0 0;'>您的包裹已整装待发</div>
          </div>
        </div>
      </div> -->

      <view class="address">
        
        <view class="address_info" >
          <view class="grow" style='flex-grow: 1;'>
            <view class="user_info s-fc-7">
              <view class="name">收货人：{{address.name}}</view>
              <view class="phone">{{address.phone}}</view>
            </view>
            <view class="active_address s-fc-7">收货地址：{{address.address}}</view>
          </view>
        </view>

      </view>

      <div class='order_state s-bg-1'>{{order.order_state}}</div>
      
      <div class='goods_info' v-for='(item, index) in order.order_goods' :key='index'>
        <image class='goods_thub' :src='item.goods_image' mode='aspectFill' />
        <div class='goods_detail'>
          <div class='goods_name'>{{item.goods_name}}</div>
          <div class='goods_price s-fc-4'>{{item.goods_pay_price}}</div>
          <div class='s-fc-5' style='margin: 20rpx 0 0; font-size: 24rpx;'>
            <span>数量</span>
            <span style='margin-left: 170rpx;'>{{item.goods_num}}</span>
          </div>
        </div>
      </div>

      <div class='s-bg-1' style='display: flex; justify-content: space-between; align-items: center; height: 100rpx; margin: 20rpx 0 0; padding: 0 30rpx;'>
        <div>实付款</div>
        <div class='s-fc-9' style='font-size: 37rpx; font-weight: bold;'>¥{{order.order_amount}}</div>
      </div> 

      <div class='s-fc-7 s-bg-1' style='margin: 20rpx 0 0; padding: 20rpx; font-size: 20rpx;'>
        <div style='margin-bottom: 20rpx;'>订单编号：{{order.order_sn}}</div>
        <div style='margin-bottom: 20rpx;'>下单时间：{{order.add_time}}</div>
        <div style='margin-bottom: 20rpx;'>付款时间：{{order.payment_time}}</div>
        <div style='margin-bottom: 20rpx;'>付款方式：微信支付</div>
      </div>

      <div class='bottom_bar'>
        <button class='btn concat' type='concat' plain='true'>联系客服</button>
        <div class='btn' v-if="order.order_state === '未付款'" @click='pay(order)'>支付</div>
        <div class='btn' v-if="order.order_state === '已发货'" @click.stop='confirm(order)'>确认收货</div>
        <div class='btn' :hover-stop-propagation='true' @click.stop='goAssess(order)' v-if="order_state_id === 40 && !item.evaluation_state">评价</div>
        <!-- <div class='btn' :hover-stop-propagation='true' @click.stop='goAssess(order)'>评价</div> -->
        <div class='btn' v-if="referer === 'afterService' ? order.refund_state === '待退款' : !order.use_refund" @click='goRefund(order)'>退款</div>
      </div>

    </div>
  </div>
</template>

<script>
import topBar from '@/components/topBar'
import slide from '@/components/slide'
import api from '@/utils/api'
import util from '@/utils/util'

export default {
  data () {
    return {
      userInfo: {},
      config: {
        title: '订单详情',
        color: '#222',
        bg: '#fff',
        backImg: '/static/left_arrow.png'
      },
      id: null, // 订单Id
      address: {},
      order: {},
      date: '',
      referer: ''
    }
  },

  components: {
    topBar,
    slide
  },

  computed: {
    isIos () { return wx.getStorageSync('isIos') }
  },

  methods: {
    setDate (e) {
      this.date = e.mp.detail.value
      console.log(e)
    },
    async getOrderDetail (item) {
      let res = this.referer === 'afterService' ? await api.getAfterService(this.id, null) : await api.getOrderInfo(this.id, null)

      this.order = res
      this.address = res.order_reciver_info
    },
    async pay () {
      let item = this.order
      let res = await api.payOrder(item.pay_sn)

      let payres = await util.pay(res)
      console.log('payres', payres)

      if (payres.errMsg === 'requestPayment:ok') {
        this.canLoad = true
        this.total = 0
        this.list = []
        this.getList(this.currentPage = 1)
      } else if (payres === 'requestPayment:fail cancel') {
        wx.showToast({ title: '支付已取消!', icon: 'none', duration: 2000 })
      }
    },
    goRefund (item) {
      wx.navigateTo({ url: `/pages/order/refund/main?order=${encodeURIComponent(JSON.stringify(item))}` })
    },
    goAssess (item) {
      let referer = encodeURIComponent(JSON.stringify({ url: '/pages/order/detail/main', param: `id=${this.id}` }))
      wx.navigateTo({ url: `/pages/order/assess/main?order=${encodeURIComponent(JSON.stringify(item))}&referer=${referer}` })
    }
  },

  created () {
  },

  onLoad (params) {
    console.log(params.id)
    this.id = params.id
    this.referer = params.referer || ''

    this.getOrderDetail()
  }

  // onPullDownRefresh () {
  //   wx.reLaunch({
  //     url: '/pages/index/main'
  //   })
  // }

}
</script>

<style scoped>
.container{
  height: 100%;
}

.wrap{
  width: 100%;
  height: 100%;
  font: 28rpx 'PingFang-SC-Medium'; 
  color: #000;
  background: #f5f5f5;
}

.package_img{
  width: 154rpx;
  height: 154rpx;
}

.address_info{
  display: flex;
  align-items: center;
  height: 141rpx;
  padding: 0rpx 35rpx;
  background: #fff;
}
.user_info{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.active_address{
  width: 100%;
  height: 30rpx;
  line-height: 30rpx;
  margin-top: 20rpx;
  overflow: hidden;
}

.order_state{
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  margin: 20rpx 0 0;
  padding: 0 30rpx;
  font-size: 32rpx;
}

.goods_info{
  display: flex;
  align-items: center;
  height: 230rpx;
  /* margin: 20rpx 0 0; */
  padding: 20rpx 20rpx 0;
  background: #fff;
}
.goods_thub{
  flex-shrink: 0;
  width: 180rpx;
  height: 180rpx;
  background: #ccc;
}
.goods_detail{
  margin-left: 20rpx;
  overflow: hidden;
}
.goods_name{
  font-size: 32rpx;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.goods_price{
  margin: 50rpx 0 0;
  font-size: 37rpx;
}

.btn{
  width: 144rpx;
  height: 44rpx;
  line-height: 44rpx;
  margin-left: 24rpx;
  border: 1rpx solid #282425;
  border-radius: 10rpx;
  text-align: center;
}

.concat{
  margin: 0 0 0 24rpx;
  padding: 0;
  font-size: 28rpx;
}

.row{
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  height: 88rpx; 
  margin: 2rpx 0 0; 
  padding: 0 20rpx; 
  background: #fff;
}

.bottom_bar{
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100rpx;
  padding: 0 20rpx;
  background: #fff;
  text-align: center;
}
.left{
  flex-grow: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
}
.bottom_icon{
  width: 45rpx;
  height: 45rpx;
  background: #ccc;
}
.bottom_btn{
  width: 210rpx;
}
.bottom_btn div{
  width: 200rpx;
  height: 76rpx;
  line-height: 76rpx;
  border-radius: 10rpx;
  font-size: 30rpx;
  text-align: center;
}
.submit_btn{
  width: 190rpx;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 10rpx;
  text-align: center;
}

  .modal{
  }
  .mask{
    position: fixed;
    top: 0rpx;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.3;
    filter: alpha(opacity=30);
  }
  .content{
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 456rpx;
    padding: 20rpx;
    background: #fff;
  }
  
  .modal .bottom{
    display: flex;
    justify-content: space-between;
    height: 100rpx;
  }
  .modal .bottom div{
    width: 335rpx;
    height: 76rpx;
    line-height: 76rpx;
    border-radius: 10rpx;
    text-align: center;
  }
  .content_center{
    position: fixed;
    top: calc(50% - 280rpx);
    left: calc(50% - 345rpx);
    width: 690rpx;
    height: 570rpx;
    border-radius: 10rpx;
    background: #fff;
  }
  .content_title{
    margin: 30rpx 0 0;
    font-size: 34rpx;
    text-align: center;
  }
  

.circle{
  position: relative;
  width: 42rpx;
  height: 42rpx;
  margin-right: 10rpx;
  border: 1rpx solid #937d8a;
  border-radius: 50%;
}
.circle_sel{
  width: 24rpx;
  height: 24rpx;
  margin: 9rpx auto 0;
  border: 1rpx solid #937d8a;
  border-radius: 50%;
  background: #937d8a;
}

.setting{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 149rpx;
  padding: 0 23rpx;
  background: #fff;
}
.comment{
  margin: 22rpx 0 0;
  font-size: 26rpx;
}

.inline{
  flex-grow: 1;
  height: 101rpx;
}

.save_btn{
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  border-radius: 0;
  font-size: 36rpx;
  background: #786578;
  text-align: center;
}

.right_arrow{
  width: 16rpx;
  height: 26rpx;
  background: #ccc;
}


.default{
  font-size: 22rpx;
}
.inline{
  margin-left: 40rpx;
}


.s-fc-1{
  color: #fff;
}
.s-fc-2{
  color: #222;
}
.s-fc-3{
  color: #786578;
}
.s-fc-4{
  color: #ff4444;
}
.s-fc-5{
  color: #888;
}
.s-fc-6{
  color: #f5f5f5;
}
.s-fc-7{
  color: #636363; 
}
.s-fc-8{
  color: #666; 
}
.s-fc-9{
  color: #fc5a4f; 
}
.s-bg-1{
  background: #fff;
}
.s-bg-2{
  background: #d6c1d2;
}
.s-bg-3{
  background: #786578; 
}
</style>
