<template>
  <div class="container">

    <topBar :config='config' title='首页'></topBar>

    <div class='wrap'>

      <div class='add' @click='add'>
          <view style='font-weight: bold;'>添加新地址</view>
          <image class='right_arrow' src='' />
      </div>   

      <div class='address_list s-fc-2'>
        <view class='address' v-for='(item, index) in list' :key='item'>
            <view>
              <view class='user_info'>{{item.title}}<text class='inline'>{{item.phone}}</text></view>
              <view class='address_info'>{{item.address}}</view>
            </view>
              <view class='other_info'>
                <view class='default' v-if='item.isDefault'>[默认地址]</view>
                <view v-else></view>
                <view class='operate_info'>
                    <view class='operate_btn' @click='modify(index)'>
                      <image src='../../images/My/edit.png' />
                      <view>修改</view>
                    </view>
                    <view class='operate_btn' @click='deleteAddress(index)'>
                      <image src='../../images/Mall/icon_shanchu@2x.png' />
                      <view>删除</view>
                    </view>
                </view>
              </view>
        </view>
      </div>
      

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
        title: '地址管理',
        color: '#222',
        bg: '#fff',
        backImg: '/static/back_gray.png'
      },
      slideConfig: {
        height: '500rpx',
        autoplay: false,
        data: [
          { img: '/static/toolBar/classify.png' },
          { img: '/static/toolBar/home.png' }
        ]
      },
      list: [
        { title: '购物车', phone: 13211111111, img: '' },
        { title: '我的卡劵', phone: 13111111111, address: 'sfksdfkKSDFM<lsk破开神佛考生的分数都快发送的看法实力派v感慨地说佛v觉得佛教给vi的风景sfsdfjkd', img: '' },
        { title: '地址管理', img: '', url: 'pages/addressList/main' },
        { title: '整居定制', img: '' },
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
    add (item) {
      wx.navigateTo({
        url: '/pages/address/add/main'
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
  font: 32rpx 'PingFang-SC-Medium'; 
  background: #f5f5f5;
}

.right_arrow{
  width: 16rpx;
  height: 26rpx;
  background: #ccc;
}

.add{
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* width: 100%; */
  height: 88rpx;
  padding: 0 20rpx;
  border-top: 1rpx solid #F4F4F4;
  background: #fff;
}

.address_list{
  background: #fff;
}
.address{
  box-sizing: border-box;
  height: 171rpx;
  padding: 20rpx 25rpx 0;
  border-top: 1rpx solid #F4F4F4;
}
.address_info{
  margin: 10rpx 0;
  height: 36rpx;
  line-height: 36rpx;
  font-size: 24rpx;
  overflow: hidden;
}
.other_info{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.operate_info{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 28rpx;
}
.operate_btn{
  display: flex;
  align-items: center;
  margin-left: 48rpx;
}
.operate_btn image{
  width: 26rpx;
  height: 26rpx;
  background: #ccc;
  margin-right: 12rpx;
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
  color: #000;
}
.s-fc-3{
  color: #888;
}
</style>
