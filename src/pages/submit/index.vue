<template>
  <div class="container">

    <topBar :config='config'></topBar>

    <div class='wrap'>

      <view class="address" >
        <!-- <view class="empty_address" wx:if="{{!is_exit_address}}">
          <view class="title">
            <image class='add' src='../images/order/addAddress.png' />
            <view>添加收货地址</view>
          </view>
          <image class='arrow' src='../images/order/icon_zuojiantou@2x.png' />
        </view> -->
        <view class="address_info" @click='changeAddress'>
          <image style='width: 23rpx; height: 33rpx; margin-right: 20rpx; flex-shrink: 0;' src='/static/address.png' />

          <view class="grow" style='flex-grow: 1;' v-if='!address.address_realname'>
            <view>添加收货地址</view>
          </view>
          <view class="grow" style='flex-grow: 1;' v-else>
            <view class="user_info s-fc-7">
              <view class="name">收货人：{{address.address_realname}}</view>
              <view class="phone">{{address.address_mob_phone}}</view>
            </view>
            <view class="active_address s-fc-7">
              <!-- <text class="defult" wx:if="{{address.isdefault==1}}"> [默认]</text> -->
              收货地址：{{address.area_info}}
            </view>
          </view>
          
          <image class='right_arrow' src='/static/my/right_arrow.png' />
        </view>
      </view>
      
      <image style='width: 100%; height: 10rpx; margin: 0 0 20rpx 0;' src='/static/bar.png' />

      <!-- <goods :goods='goods' :config='goodsConfig' v-if='!goodsList.length'></goods> -->

      <div v-for='(item, index) in list' :key='index'>
        <goods :goods='item' :config='goodsConfig'></goods>

        <div class='s-fc-8' style='display: flex; justify-content: space-between; align-items: center; height: 88rpx; margin: 2rpx 0 0; padding: 0 20rpx; background: #fff;' v-if='item.deposit'>
          <div>定金:</div>
          <div>¥{{item.deposit}}</div>
        </div>
        <div class='s-fc-8' style='display: flex; justify-content: space-between; align-items: center; height: 88rpx; margin: 2rpx 0 0; padding: 0 20rpx; background: #fff;' v-if='item.goods_freight'>
          <div>运费：</div>
          <div>¥{{item.goods_freight}}</div>
        </div>

        <div>
          <div class='row s-fc-8' v-for='(server, i) in item.server' :key='i'>
            <div style='display: flex; align-items: center;'>
              <div class='circle' @click='check(server)'>
                <div :class='{ circle_sel: server.checked }'></div>
              </div>{{server.key}}</div>
            <div>¥{{server.value}}</div>
          </div>
        </div>
      </div>

      <div style='height: 100rpx;'></div>

      <div class='bottom_bar'>
        <!-- <div > -->
            <div>合计：<span class='s-fc-9'>¥{{totalFee}}</span></div>
        <!-- </div> -->
        <div class='submit_btn s-fc-1 s-bg-3' @click='submitOrder'>结算({{count}})</div>
      </div>

    </div>
  </div>
</template>

<script>
import topBar from '@/components/topBar'
import goods from '@/components/goods'
import api from '@/utils/api'
import util from '@/utils/util'

export default {
  data () {
    return {
      config: {
        title: '确认订单',
        color: '#222',
        bg: '#fff',
        backImg: '/static/left_arrow.png'
      },
      goodsConfig: {
        // margin: '20rpx 0 0'
      },
      address: {},
      goods: {},
      goodsList: [],
      list: [],
      freight: null, // 总运费
      canClick: true,
      canSubmit: true, 
      totalFee: '',
      order_id: null
    }
  },

  computed: {
    count () { return this.goods.qty || this.goodsList.reduce((p, v) => p + v.qty, 0) },
  },

  components: {
    topBar,
    goods
  },

  methods: {
    changeAddress () { wx.navigateTo({ url: `/pages/address/addressList/main?referer=submit` }) },
    async check (item) {
      if (!this.canClick) {
        return null
      }

      this.canClick = false

      item.checked = !item.checked
      console.log(item)
      this.checkout(true)
    },
    submitOrder () {
      if (!this.canSubmit) {
        return null
      }

      this.canSubmit = false
      this.submit()
    },
    async checkout (simpleUpdate) {
      let params = {
        cart_id: this.getCartId(),
        ifcart: this.goodsList.length ? 1 : 0,
        city_id: this.address.city_id,
        extra_service: this.getServer(),
        voucher_list: []
      }
      console.log('checkout --', params, this.address)

      let res = await api.checkout(params)

      res.store_cart_list['1'].forEach(v => {
        if (v.extra_service) v.server = v.extra_service.map(val => { return { key: val.split(':')[0], value: val.split(':')[1], checked: false } })
      })
      if (!simpleUpdate) this.list = res.store_cart_list['1']
      this.freight = res.freight_list && res.freight_list['1']
      this.totalFee = res.store_final_order_total && res.store_final_order_total['1']
      this.canClick = true
      // let totalObj = res.store_final_order_total

      // this.totalFee = 0
      // for (let key in totalObj) {
      //   this.totalFee += totalObj[key]
      // }
    },
    async submit () {
      wx.showLoading({ title: 'Loading...' })

      let params = {
        cart_id: this.getCartId(),
        address_id: this.address.address_id,
        ifcart: this.goodsList.length ? 1 : 0,
        pay_name: 'online',
        pay_message: this.getAppoinment(),
        order_from: 2,
        is_pintuan: null,
        extra_service: this.getServer()
      }
      console.log('order param', params)
      let res = await api.submitOrder(params)

      this.order_id = res.order_id

      let payres = await util.pay(res)

      console.log('pay', this.order_id, payres)
      wx.hideLoading()

      if (payres.errMsg === 'requestPayment:ok') {
        this.canGo = true
        wx.redirectTo({
          url: '/pages/payed/main?id=' + this.order_id,
        })
      } else if (payres === 'requestPayment:fail cancel') {
        wx.showToast({ title: '支付已取消!', icon: 'none', duration: 2000, })
      }
      this.canSubmit = true
    },
    getCartId () { return this.goodsList.length ? this.goodsList.map(v => `${v.cart_id}|${v.goods_num}`) : [`${this.goods.SKUList[0].goods_id}|${this.goods.qty}`] },
    getServer () {
      let obj = {}

      this.list.forEach(v => {
        if (v.server) {
          obj[v.goods_id] = []
          v.server.forEach(val => { if (val.checked) obj[v.goods_id].push(`${val.key}:${val.value}`) })
        }
      })

      return obj
    },
    getAppoinment () {
      let obj = {}

      if (this.goodsList.length) {
        this.goodsList.forEach(v => { if (v.remark[0] !== '') obj[v.goods_id] = v.remark })
      } else {
        if (this.goods.appoinment) obj[this.goods.sku.goods_id] = [this.goods.appoinment.date, this.goods.appoinment.content]
      }
      return obj
    },
    async getDefauleAddress () {
      let res = await api.getDefaultAddress({ address_is_default: 1 })

      console.log('default address', res)
      this.address = res && res[0] || {}

      this.checkout()
    }
  },

  created () {
  },

  onLoad (params) {
    this.goods = params.goods && JSON.parse(decodeURIComponent(params.goods)) || {}
    this.goodsList = params.goodsList && JSON.parse(decodeURIComponent(params.goodsList)) || []

    console.log('submit onload', this.goods, this.goodsList)

    this.getDefauleAddress()
  },

  onShow () {
    let address = wx.getStorageSync('address')
    if (address) {
      this.address = address
      wx.removeStorageSync('address')

      this.checkout()
    }
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
  justify-content: space-between;
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
  flex-shrink: 0;
  width: 16rpx;
  height: 26rpx;
  margin-left: 20rpx;
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
  color: #af0000;
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
.s-bg-2{
  background: #d6c1d2;
}
.s-bg-3{
  background: #786578; 
}
</style>
