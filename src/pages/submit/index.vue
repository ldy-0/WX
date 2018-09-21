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
        <view class="address_info" >
          <view class="grow" style='flex-grow: 1;'>
            <view class="user_info s-fc-7">
              <view class="name">收货人：address.consignee</view>
              <view class="phone">address.phone</view>
            </view>
            <view class="active_address s-fc-7">
              <!-- <text class="defult" wx:if="{{address.isdefault==1}}"> [默认]</text> -->
              收货地址：address.detailksdfjk士大夫可适当放宽就是东方开始大批佛龛山东分局JFKD精神科大夫就的方式时刻提防sdsfdjk
            </view>
          </view>
          <image class='right_arrow' src='../images/order/icon_zuojiantou@2x.png' />
        </view>
      </view>
      
      <image style='height: 10rpx; background: #ccc;' src='' />

      <goods :goods='goods' :config='goodsConfig'></goods>

      <div class='s-fc-8' style='display: flex; justify-content: space-between; align-items: center; height: 88rpx; margin: 2rpx 0 0; padding: 0 20rpx; background: #fff;' v-if='isVirtual'>
        <div>定金:</div>
        <div>¥10.00</div>
      </div>
      <div class='s-fc-8' style='display: flex; justify-content: space-between; align-items: center; height: 88rpx; margin: 2rpx 0 0; padding: 0 20rpx; background: #fff;'>
        <div>运费：</div>
        <div>¥10.00</div>
      </div>

      <div class='row s-fc-8' v-for='(item, index) in serverList' :key='index'>
        <div style='display: flex; align-items: center;'><div class='circle'><div class='circle_sel'></div></div>{{item.title}}</div>
        <div>¥10.00</div>
      </div>

      <div class='bottom_bar'>
        <div >
          <div>
            <div>合计：<span class='s-fc-9'>¥100.00</span></div>
          </div>
        </div>
        <div class='submit_btn s-fc-1 s-bg-3' @click='submit'>结算(1)</div>
      </div>

    <div class='modal' v-if='isShowModal'>
      <div class='mask' @click='hideModal'></div>
      <div class='content_center' v-if='isVirtual'>
      </div>
      
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
import goods from '@/components/goods'

export default {
  data () {
    return {
      userInfo: {},
      config: {
        title: '确认订单',
        color: '#222',
        bg: '#fff',
        backImg: '/static/back_gray.png'
      },
      slideConfig: {
        height: '750rpx',
        autoplay: false,
        data: [
          { img: '/static/toolBar/classify.png' },
          { img: '/static/toolBar/home.png' }
        ]
      },
      goodsConfig: {
        margin: '20rpx 0 0'
      },
      goods: {},
      commentList: [
        { title: '购物车', phone: 13211111111, img: '' },
        { title: '我的卡劵', phone: 13111111111, address: 'sfksdfkKSDFM<lsk破开神佛考生的分数都快发送的看法实力派v感慨地说佛v觉得佛教给vi的风景sfsdfjkd', img: '' },
        { title: '地址管理', img: '', url: 'pages/addressList/main' },
        { title: '整居定制', img: '' },
        { title: 'aksfdosdfojsdfcv', img: '' }
      ],
      serverList: [
        { title: '设计服务：', img: '' },
        { title: '搬运服务：', img: '' },
        { title: '安装服务：', img: '' }
      ],
      isVirtual: true,
      isShowModal: false,
      date: ''
    }
  },

  components: {
    topBar,
    slide,
    goods
  },

  methods: {
    submit () {
      wx.reLaunch({
        url: '/pages/payed/main'
      })
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

  onLoad (params) {
    this.goods = {
      name: '看到放送控股快速打开v功德佛楼盘数量大幅v哦的上空飞过v哦梵蒂冈v顺利破发v看到法国v端口sf',
      price: 123324930,
      qty: 192334,
      scale: 34504935
    }
  },

  onPullDownRefresh () {
    wx.reLaunch({
      url: '/pages/index/main'
    })
  }

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
