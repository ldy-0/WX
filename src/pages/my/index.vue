<template>
  <div class="container">

    <topBar :config='config' title='首页'></topBar>

    <div class='wrap'>
    <!-- <slide :config='slideConfig'></slide> -->

    <!-- <div class='search'>
      <image class='search_icon' src='' />
      <div class='search_content s-fc-2'>搜索</div>
    </div> -->
      <div class='user_info'>
        <image class='user_bg' src='' />
        <div class='user'>
          <image class='user_img' />
          <div class='user_name s-fc-1'>username</div>
        </div>
      </div>

    
      <div class='order s-fc-2'>
        <navigator class='order_title' url='/pages/order/list/main?status=all'>
          <view>个人管理</view>
          <view style='display: flex; align-items: center;'>
            <view>全部订单</view>
            <image class='arrow' src='../images/Mall/icon_zuojiantou@2x.png' />
          </view>
        </navigator>
        <view class='order_status'>
          <navigator class='column_around' url='/pages/my/orderList?status=submitted'>
            <image src='../images/My/icon_daifukuan@2x.png' />
            <view>待付款</view>
          </navigator>
          <navigator class='column_around' url='/pages/my/orderList?status=paid'>
            <image src='../images/My/icon_daifahuo@2x.png' />
            <view>待发货</view>
          </navigator>
          <navigator class='column_around' url='/pages/my/orderList?status=shipped'>
            <image src='../images/My/icon_daishouhuo@2x.png' />
            <view>待收货</view>
          </navigator>
          <navigator class='column_around' url='/pages/order/service/main?status=comment'>
            <image src='../images/My/icon_daipingjia@2x.png' />
            <view>售后</view>
          </navigator>
        </view>
      </div>

      <div class='class_wrap'>
        <div class='class_item' v-for='(item, index) in classList' :key='index' @click='go(item, $event)'>
          <div style='display: flex; align-items: center;'>
            <image class='class_item_icon' src='' />
            <div class='class_item_title s-fc-3'>{{item.title}}</div>
          </div>
          <image class='arrow' src='' />
        </div> 
      </div>
    <!-- <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div> -->

    

    <!-- <div class='modal'>
      <div class=''></div> 
    </div> -->

    <!-- <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form> -->
    <!-- <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a> -->
    </div>
  </div>
</template>

<script>
import topBar from '@/components/topBar'
import slide from '@/components/slide'

export default {
  data () {
    return {
      userInfo: {},
      config: {
        title: '我的',
        color: '#222',
        bg: '#fff'
        // backImg: '/static/back_gray.png'
      },
      slideConfig: {
        height: '500rpx',
        autoplay: false,
        data: [
          { img: '/static/toolBar/classify.png' },
          { img: '/static/toolBar/home.png' }
        ]
      },
      classList: [
        { title: '购物车', img: '', url: '/pages/shoppingCart/main' },
        { title: '我的卡劵', img: '' },
        { title: '地址管理', img: '', url: '/pages/address/addressList/main' },
        { title: '帮助', img: '', url: '/pages/help/main' },
        { title: 'aksfdosdfojsdfcv', img: '' }
      ]
    }
  },

  components: {
    topBar,
    slide
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    go (item) {
      wx.navigateTo({
        url: item.url
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
  font: 24rpx 'PingFang-SC-Medium'; 
  background: #f5f5f5;
}

.arrow{
  width: 16rpx;
  height: 26rpx;
  background: #ccc;
}

.user_info{
  position: relative;
  width: 100%;
  height: 360rpx;
}
.user_bg{
  position: absolute;
  width: 100%;
  height: 100%;
}
.user{
  position: absolute;
  top: 60rpx;
  left: calc(50% - 72rpx);
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
  background: #ccc;
}

.class_wrap{
  width: 100%;
  background: #fff;
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
  background: #ccc;
}
.class_item_title{
  margin-left: 20rpx;
  font-size: 28rpx;
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
