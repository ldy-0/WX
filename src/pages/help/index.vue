<template>
  <div class="container">

    <topBar :config='config'></topBar>

    <div class='wrap'>

     <div class='content s-fc-2'>主。他走遍了全世界，想要寻找到一位真正的公主，但不论走到什么地方，总碰到一些障碍。公主倒有的是，但王子无法判断她们究竟是不是真正的公主，因为她们总有一些地方不大对头，结果，他只好回家来，心</div> 
      
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
        title: '帮助',
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
  font: 30rpx 'PingFang-SC-Medium'; 
  color: #000;
  background: #fff;
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
