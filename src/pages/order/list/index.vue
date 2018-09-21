<template>
  <div class="container">

    <topBar :config='config' title='首页'></topBar>

    <div class='wrap'>

      <div class='tab'>
        <div class='tab_item s-fc-3' :class='{ checked: item.title === currentClass }' v-for='(item, index) in classList' :key='index' @click='change'>{{item.title}}</div>
      </div>

      <div class='list_wrap'>
        <!-- <div class='row' v-for='(row, i) in list' :key='i'> -->
          <div class='item' v-for='(item, index) in list' :key='index' @click='goGoods(index)'>

            <div class='order_status s-fc-4'>待付款</div>
            
            <goods :goods='item.goods' :config='goodsConfig'></goods>

            <div class='order_price'>
              <div>实付款</div>
              <div class='s-fc-5' style='font-size: 36rpx;'>¥558.00 <span class='s-fc-2' style='font-size: 24rpx;'>运费10.00</span></div>
            </div>

            <div class='order_operate s-fc-6'>
              <div class='btn'>联系客服</div>
              <!-- <div class='btn'>支付</div> -->
              <!-- <div class='btn'>退款</div> -->
              <div class='btn' url='' :hover-stop-propagation='true' @click.stop='goAssess(item, $event)'>评价</div>
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

export default {
  data () {
    return {
      userInfo: {},
      config: {
        title: '全部订单',
        color: '#fff',
        bg: '#937d8a',
        backImg: '/static/back_gray.png'
      },
      goodsConfig: {
        padding: '20rpx 0 0'
      },
      classList: [
        { title: '全部' },
        { title: '待付款' },
        { title: '待发货' },
        { title: '待收货' },
        { title: '待评价' }
      ],
      list: [
        { title: 'aksfdosdfojsdfcv', goods: { name: 'sdksdfodsfkoksdf开始大幅攀升地ffsd', price: 143.45234, qty: 3455 } },
        { title: 'aksfdosdfojsdfcv', goods: { name: 'sdksdfodsfkoksdf开始大幅攀升地ffsd', price: 143.45234, qty: 3455 } }
      ],
      currentClass: '全部'
    }
  },

  components: {
    topBar,
    slide,
    goods
  },

  methods: {
    goGoods () {
      wx.navigateTo({
        url: '/pages/goods/main?id=a'
      })
    },
    goAssess (item, e) {
      wx.navigateTo({
        url: '/pages/order/assess/main?id=1'
      })
    },
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    }
  },

  created () {
    if (!wx.getStorageSync('userInfo')) {
      wx.reLaunch({
        url: '/pages/authorization/main?referer=/pages/index/main'
      })
    }
    console.log('reLaunch')
  },

  onPullDownRefresh () {
    wx.reLaunch({
      url: '/pages/index/main'
    })
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
