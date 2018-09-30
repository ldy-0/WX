<template>
  <div class="container">

    <topBar :config='config'></topBar>

    <div class='wrap'>

      <div class=''>
        <div class='title s-fc-3'>半包材料展示</div>
        <div class='content s-fc-2'>前有一位王子，他想找一位公主结婚，但是她必须是一位真正的公主。他走遍了全世界，想要寻找到一位真正的公主，但不论走到什么地方，总碰到一些障碍。公主倒有的是，但王子无法判断她们究竟是不是真正的公主，因为她们总有一些地方不</div>
      </div> 
      
      <image class='info_img' src='' />

      <div class="">
        <div class='form_title s-fc-5'>
          <div style='font-size: 36rpx;'>我要装修</div>
          <div style='font-size: 14rpx;'>DECORATION</div>
        </div>
        <div class='form_item s-fc-8'>
          <div class='form_key'>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</div>
          <input class='form_value' placeholder="请输入姓名" placeholder-style='margin-left: 20rpx;' />
          <div class='star'>*</div>
        </div>
        <div class='form_item s-fc-8'>
          <div class='form_key'>联系方式</div>
          <input class='form_value' placeholder="请输入手机号" placeholder-style='margin-left: 20rpx;'/>
          <div class='star'>*</div>
        </div>
        <div class='form_item s-fc-8'>
          <div class='form_key'>小区地址</div>
          <input class='form_value' placeholder="请输入小区地址" placeholder-style='margin-left: 20rpx;'/>
          <div class='star'>*</div>
        </div>
        <div class='form_item s-fc-8'>
          <div class='form_key'>面&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;积</div>
          <input class='form_value' placeholder="请输入房屋面积" placeholder-style='margin-left: 20rpx;'/>
        </div>
        <div class='form_item s-fc-8'>
          <div class='form_key'>意向风格</div>
          <input class='form_value' placeholder="请输入意向风格" placeholder-style='margin-left: 20rpx;'/>
        </div>
        <div class='textarea_wrap s-fc-8'>
          <div class='form_key'>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</div>
          <textarea class='textarea' placeholder="请输入备注" placeholder-style='margin-left: 20rpx;'></textarea>
        </div>

        <div class='form_btn s-fc-1'>提交</div>
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
        title: '半包定制',
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
    }
    console.log('')
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
  background: #fff;
}

.title{
  padding: 36rpx 40rpx;
  font-size: 34rpx;
}
.content{
  padding: 0 40rpx;
  font-size: 30rpx;
}
.info_img{
  display: block;
  width: 690rpx;
  height: 350rpx;
  margin: 25rpx auto 0;
  background: #ccc;
}

.form_title{
  margin: 80rpx auto 60rpx;
  text-align: center;
}
.form_item{
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 666rpx;
  height: 76rpx;
  margin: 0 auto 30rpx;
}
.form_key{
  white-space: pre;
}
.form_value{
  width: 530rpx;
  height: 100%;
  border: 1rpx solid #c9c8d0; 
  border-radius: 5rpx;
}
.textarea_wrap{
  display: flex;
  justify-content: space-between;
  width: 666rpx;
  height: 150rpx;
  margin: 0 auto 30rpx;
}
.textarea{
  width: 530rpx;
  height: 150rpx;
  border: 1rpx solid #c9c8d0; 
  border-radius: 5rpx;
}
.form_btn{
  width: 600rpx;
  height: 88rpx;
  line-height: 88rpx;
  margin: 20rpx auto;
  border-radius: 10rpx;
  background: #786578;
  text-align: center;
}
.star{
  position: absolute;
  right: 20rpx;
  color: #ff0000;
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
