<template>
  <div class="container">

    <topBar :config='config' title='首页'></topBar>

    <div class='wrap'>

      <div class='user_info'>
        <div class='user_bg_wrap'>
          <image class='user_bg' :src='userInfo.wx_avatar' />
        </div>
        <div class='user'>
          <image class='user_img' :src='userInfo.wx_avatar' />
          <div class='user_name s-fc-1' v-text='userInfo.wx_name'></div>
        </div>
      </div>

    
      <div class='order s-fc-2'>
        <navigator class='order_title' url='/pages/order/list/main?status=全部'>
          <view>个人管理</view>
          <view style='display: flex; align-items: center;'>
            <view>全部订单</view>
            <image class='arrow' src='/static/my/right_arrow.png' />
          </view>
        </navigator>
        <view class='order_status'>
          <navigator class='column_around' url='/pages/order/list/main?status=待付款'>
            <image src='/static/my/icon_daifukuan.png' />
            <view>待付款</view>
          </navigator>
          <navigator class='column_around' url='/pages/order/list/main?status=待发货'>
            <image src='/static/my/icon_daifahuo.png' />
            <view>待发货</view>
          </navigator>
          <navigator class='column_around' url='/pages/order/list/main?status=待收货'>
            <image src='/static/my/icon_daishouhuo.png' />
            <view>待收货</view>
          </navigator>
          <navigator class='column_around' url='/pages/order/afterServer/main'>
            <image src='/static/my/icon_shouhou.png' />
            <view>售后</view>
          </navigator>
        </view>
      </div>

      <div class='class_wrap'>
        <!-- <row class='s-fc-3' :config='rowConfig' :leftImg='item.img' :leftTitle='item.title' v-for='(item, index) in classList' :key='index'></row> -->
        <div class='class_item_wrap' v-for='(item, index) in classList' :key='index' @click='go(item, $event)'>
          <button class='concat' type='concat' plain='true' v-if='item.isButton'>
            <div style='display: flex; align-items: center;'>
              <image class='class_item_icon' :src='item.img' />
              <div class='class_item_title s-fc-3'>{{item.title}}</div>
            </div>
            <image class='arrow' src='/static/my/right_arrow.png' />
          </button>
          <div class='class_item' v-else>
            <div style='display: flex; align-items: center;'>
              <image class='class_item_icon' :src='item.img' />
              <div class='class_item_title s-fc-3'>{{item.title}}</div>
            </div>
            <image class='arrow' src='/static/my/right_arrow.png' />
          </div>
          
        </div> 
      </div>
    
    </div>
  </div>
</template>

<script>
import topBar from '@/components/topBar'
import slide from '@/components/slide'
import row from '@/components/row'

export default {
  data () {
    return {
      config: {
        title: '我的',
        color: '#222',
        bg: '#fff'
        // backImg: '/static/back_gray.png'
      },
      rowConfig: {
        rightImg: '/static/my/right_arrow.png',  
        rightWidth: '16rpx',
        rightHeight: '26rpx'
      },
      userInfo: {},
      classList: [
        { title: '购物车', img: '/static/my/shoppingCart.png', url: '/pages/shoppingCart/main' },
        { title: '我的卡劵', img: '/static/my/coupon.png' },
        { title: '地址管理', img: '/static/my/address.png', url: '/pages/address/addressList/main' },
        { title: '联系客服', img: '/static/my/concat.png', url: '', isButton: true },
        { title: '帮助', img: '/static/my/help.png', url: '/pages/help/main' }
      ],
      orderImg: [
        { img: '/static/my/' }
      ]
    }
  },

  components: {
    topBar,
    slide,
    row
  },

  methods: {
    go (item) {
      if (item.title === '我的卡劵') {
        return wx.showModal({ title: '提示', content: '功能正在开发中，敬请期待！', showCancel: false })
      }

      if (item.title === '联系客服') {
        return null
      }

      wx.navigateTo({
        url: item.url
      })
    }
  },

  created () {
  },

  onLoad (param) {
    
    this.userInfo = wx.getStorageSync('userInfo')
  },

  onPullDownRefresh () {
    wx.reLaunch({
      url: '/pages/my/main'
    })
  }

}
</script>

<style scoped>
.wrap{
  width: 100%;
  height: 100%;
  font: 24rpx 'PingFang-SC-Medium'; 
  background: #f5f5f5;
}

.arrow{
  width: 16rpx;
  height: 26rpx;
  margin-left: 20rpx;
}

.user_info{
  position: relative;
  width: 100%;
  height: 360rpx;
}
.user_bg_wrap{
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.user_bg{
  position: relative;
  left: -50%;
  width: 200%;
  height: 200%;
  filter: blur(20rpx);
}
.user{
  position: absolute;
  top: 60rpx;
  left: calc(50% - 72rpx);
  text-align: center;
}
.user_img{
  width: 135rpx;
  height: 135rpx;
  border-radius: 50%;
  background: #ccc;
}
.user_name{
  margin: 35rpx 0 0;
  font-size: 26rpx;
}

.order{
  width: 100%;
  margin-bottom: 30rpx;
  background: #fff; 
}
.order_title{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 68rpx;
  margin: 15rpx 0 0;
  padding: 0 18rpx;
  font-size: 24rpx;
  color: #636363;
}
.order_status{
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 160rpx;
  text-align: center;
}
.order_status image{
  width: 43rpx;
  height: 42rpx;
}

.class_wrap{
  width: 100%;
  background: #fff;
}
.class_item_wrap{
  border-bottom: 2rpx solid #eee;
}
.class_item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100rpx;
  padding: 0 20rpx;
}
.class_item_icon{
  width: 70rpx;
  height: 70rpx;
  border-radius: 10rpx;
}
.class_item_title{
  margin-left: 20rpx;
  font-size: 28rpx;
}
.concat{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100rpx;
  padding: 0 20rpx;
  border: none;
}
        
.search{
  position: relative;
  top: -30rpx;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 610rpx;
  height: 76rpx;
  margin: 0 auto;
  border-radius: 8rpx;
  background: #fff;
}
.search_icon{
  width: 28rpx;
  height: 28rpx;
}
.search_content{
  font-size: 28rpx;
}


.s-fc-1{
  color: #fff;
}
.s-fc-2{
  color: #666;
}
.s-fc-3{
  color: #888;
}
</style>
