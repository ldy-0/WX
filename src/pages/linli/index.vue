<template>
  <div class="container">

    <!-- <topBar :config='config'></topBar> -->

    <div class='wrap'>

      <div class='center'>
        <image style='width: 360rpx; height: 300rpx;' src='/static/empty.png' mode='aspectFill' />
        <div class='desc'>功能正在开发，敬请期待！</div>
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
        title: '易居邻里',
        color: '#222',
        bg: '#fff'
        // backImg: '/static/back_gray.png'
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
  font: 30rpx 'PingFang-SC-Medium'; 
  color: #000;
  background: #fff;
}

.center{
  position: fixed;
  top: 30%;
  width: 100%;
  text-align: center;
}
.desc{
  margin: 20rpx 0 0;
  font-size: 28rpx;
  color: #6e6c6c;
}

.content{
  margin: 40rpx;
}

.s-fc-1{
  color: #fff;
}
.s-fc-2{
  color: #222;
}
.s-fc-5{
  color: #786578;
}
.s-fc-4{
  color: #ff4444;
}
.s-fc-3{
  color: #333;
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
