<template>
  <div class="container">

    <topBar :config='config'></topBar>

    <div class='wrap'>

      <div class='tab'>
        <div class='tab_item s-fc-3' :class='{ checked: item.title === currentClass }' v-for='(item, index) in classList' :key='index' @click='change(item)'>{{item.title}}</div>
      </div>

      <div class='list_wrap'>
        <!-- <div class='row' v-for='(row, i) in list' :key='i'> -->
          <div class='item' v-for='(item, index) in list' :key='index' @click='goGoods(item)'>

            <div class='order_status s-fc-4'>{{item.order_state}}</div>
            
            <goods :goods='goods' :config='goodsConfig' v-for='(goods, i) in item.order_goods' :key='i'></goods>

            <div class='order_price'>
              <div>实付款</div>
              <div class='s-fc-5' style='font-size: 36rpx;'>¥{{item.order_amount}}<span class='s-fc-2' style='font-size: 24rpx;'>运费{{item.shipping_fee}}</span></div>
            </div>

            <div class='order_operate s-fc-6'>
              <button class='btn concat' type='concat' plain='true' @click.stop='stopPropagation'>联系客服</button>
              <!-- <div class='btn' v-if="item.order_state === '未付款'" @click.stop='pay(item)'>支付</div> -->
              <div class='btn' v-if="item.order_state === '待退款'" @click.stop='cancel(item)'>取消退款</div>
              <!-- <div class='btn' v-if="item.order_state === '未退款'" @click='goRefund(item)'>退款</div> -->
              <!-- <div class='btn' url='' :hover-stop-propagation='true' @click.stop='goAssess(item, $event)' v-if="item.order_state === '已完成'">评价</div> -->
            </div>
          </div>
        <!-- </div> -->
      </div>

    </div>


  </div>
</template>

<script>
import topBar from '@/components/topBar'
import slide from '@/components/slide'
import goods from '@/components/goods'
import api from '@/utils/api'
import util from '@/utils/util'

export default {
  data () {
    return {
      config: {
        title: '售后列表',
        color: '#222',
        bg: '#fff',
        backImg: '/static/left_arrow.png'
      },
      goodsConfig: {
        padding: '20rpx 0 0'
      },
      classList: [
        { id: null, title: '全部' },
        { id: 1, title: '待退款' },
        { id: 2, title: '已完成' }
      ],
      list: [],
      currentClass: '全部',
      currentPage: 1,
      limit: 10,
      total: 0,
      canLoad: true
    }
  },

  components: {
    topBar,
    slide,
    goods
  },

  methods: {
    change (item) {
      this.currentClass = item.title

      this.total = 0
      this.list = []
      this.getList(this.currentPage = 1)
    },
    goGoods (item) {
      wx.navigateTo({ url: `/pages/order/detail/main?id=${item.refund_id}&referer=afterService` })
    },
    async pay (item) {
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
    async cancel (item) {
      let param = {
        refund_id: item.refund_id,
        order_type: 'order_receive'
      }

      let res = await api.cancelRefund(item.refund_id, param)

      res === null ? wx.showToast({ title: '取消成功', duration: 2000 }) : wx.showToast({ title: '取消失败', icon: 'none', duration: 2000 })
    },
    goRefund (item) {
      wx.navigateTo({ url: `/pages/order/refund/main?order=${encodeURIComponent(JSON.stringify(item))}` })
    },
    goAssess (item, e) {
      wx.navigateTo({ url: `/pages/order/assess/main?order=${encodeURIComponent(JSON.stringify(item))}` })
    },
    async getList (page) {
      wx.showLoading({ title: 'Loading...' })

      let param = {
        page,
        limit: this.limit
      }
      if (this.currentClass !== '全部') this.classList.forEach(v => {if (v.title === this.currentClass) param.refund_state = v.id})

      let res = await api.getAfterServiceList(param)

      this.list = res.data && this.list.concat(res.data)
      this.total = res.pagination.total
      this.canLoad = true
      wx.hideLoading()
    }
  },

  created () {
  },

  onLoad (param) {

    this.currentPage = 1
    this.total = 0
    this.list = []
    this.canLoad = true

    this.getList(this.currentPage)
  },

  onPullDownRefresh () {
    wx.reLaunch({
      url: `/pages/order/afterServer/main?status=${this.currentClass}`
    })
  },

  onReachBottom () {
    if (this.total <= this.list.length) return wx.showModal({ title: '已经是最后一页了!', showCancel: false })

    if (!this.canLoad) {
      return null
    }

    this.canLoad = false

    this.getList(++this.currentPage)
  }

}
</script>

<style scoped>

.wrap{
  width: 100%;
  height: 100%;
  font: 28rpx 'PingFang-SC-Medium';
  background: #f5f5f5;
}

.tab{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 80rpx;
  background: #fff;
}
.tab_item{
  height: 76rpx;
  line-height: 76rpx;
  font-size: 30rpx;
  font-weight: bold;
}
.checked{
  color: #282425;
  border-bottom: 2rpx solid #937d8a;
}

.row{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30rpx 0 0;
}

.item{
  margin-bottom: 20rpx;
  padding: 0 30rpx;
  background: #fff;
}
.order_status{
  height: 68rpx;
  line-height: 68rpx;
  margin-bottom: 2rpx;
  font-size: 32rpx;
}
.order_price{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rpx 0 0;
  font-size: 32rpx;
}
.order_operate{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 88rpx;
}
.btn{
  width: 144rpx;
  height: 44rpx;
  line-height: 44rpx;
  margin-left: 24rpx;
  border: 1rpx solid #333;
  border-radius: 10rpx;
  text-align: center;
}

.concat{
  margin: 0 0 0 24rpx;
  padding: 0;
  font-size: 28rpx;
}

.s-fc-1{
  color: #fff;
}
.s-fc-2{
  color: #888;
}
.s-fc-3{ 
  color:#666; /* tab_item */
}
.s-fc-4{ 
  color: #202020;
}
.s-fc-5{
  color: #af0000; 
}
.s-fc-6{
  color: #333;
}
</style>
