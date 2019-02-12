<template>
  <div class="container" :class='{ ios: isIos }'>

    <!-- <topBar :config='config'></topBar> -->

    <div class='wrap'>

      <div style='width: 100%; height: 100%;'>
        <image :style="{ width: getWidth, height: getHeight }" mode="aspectFill" :src='url' @load='getImg' />
      </div>

    </div>

  </div>
</template>

<script>
import topBar from '@/components/topBar'

export default {
  data () {
    return {
      userInfo: {},
      config: {
        title: '图片',
        color: '#222',
        bg: '#fff', // '#937d8a',
        backImg: '/static/left_arrow.png'
      },
      url: null,
      img: {},
      screen: {}
    }
  },

  components: {
    card,
    topBar,
    slide
  },

  computed: {
    isIos () { return wx.getStorageSync('isIos') },
    getWidth () { return this.img.width < this.screen.width ? '100%' : `${this.img.width}px` },
    getHeight () { return this.img.height < this.screen.width ? '100%' : `${this.img.height}px` }
  },

  methods: {
    getImg (e) {
      let v = e.mp.detail

      console.log('load img:', v, this.screen)
      this.img = v
    },
    search (e) {
      this.content = e.mp.detail.value
      console.log('search', this.content)
    },
    goGoods () {
      wx.navigateTo({
        url: '/pages/goods/main?id=a'
      })
    },
    changeArray (arr) {
      let newArr = []

      arr.forEach((v, i) => { i % 2 === 0 ? newArr.push([v]) : newArr[Math.floor(i / 2)].push(v) })

      return newArr
    },
    getList (page) {
      let res = [
        { title: '设计师+skdfj老师开发商的风控但是佛挡杀佛可是大佛国际饭店根本就没法的保密', img: '' },
        { title: '半包定制', img: '' },
        { title: '易居管家', img: '' },
        { title: '整居定制', img: '' },
        { title: 'aksfdosdfojsdfcv', img: '' }
      ]

      this.list = this.list.concat(this.changeArray(res))
      this.canLoad = true
      wx.hideLoading()
    }
  },

  created () {
    console.log('img created')
  },

  onLoad (param) {
    console.log(param)
    this.url = param.url

    let system = wx.getSystemInfoSync()
    this.screen = { width: system.windowWidth, height: system.windowHeight }
  },

  onPullDownRefresh () {
    wx.reLaunch({
      url: `/pages/twoClassList/main`
    })
  }

  // onReachBottom () {
  //   wx.showLoading({ title: 'Loading...' })

  //   if (!this.canLoad) {
  //     return null
  //   }
  //   this.canLoad = false

  //   this.getList(++this.currentPage)
  // }
}
</script>

<style scoped>

.container{
  
}

.wrap{
  font-family: 'PingFang-SC-Medium';
  width: 100%;
  height: 100%;
}


.class_wrap{
  height: 88rpx;
}
.class_row{
  display: flex;
  align-items: center;
  margin: 30rpx 0 0;
  padding: 0 30rpx;
}
.class_item{
  margin-right: 30rpx;
  padding: 15rpx 30rpx;
  border-radius: 26rpx;
  font-size: 22rpx;
  text-align: center;
}
.checked{
  background: #eee;
}

.tab{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 88rpx;
  background: #fff;
}
.tab_item{
  height: 86rpx;
  line-height: 86rpx;
  font-size: 30rpx;
  font-weight: bold;
}
.checked{
  border-bottom: 2rpx solid #937d8a;
}

.list_wrap{
  padding: 0 20rpx;
  background: #fff;
}
.row{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30rpx 0 0;
}
.item{
  flex-shrink: 0;
  width: 350rpx;
  height: 480rpx;
  background: #fff;
  border-radius: 10rpx;
  box-shadow: 0rpx 1rpx 7rpx rgba(0, 0, 0, 0.15);
}
.item_img{
  width: 350rpx; 
  height: 350rpx;
  background: #ccc;
}
.item_title, .item_price{
  height: 36rpx;
  line-height: 36rpx;
  margin: 20rpx 0 0 20rpx;
  font-size: 28rpx;
  overflow: hidden;
}

.s-fc-1{
  color: #fff;
}
.s-fc-2{
  color: #999;
}
.s-fc-3{ 
  color:#322a2b; /* tab_item */
}
.s-fc-4{ 
  color: #666;
}
.s-fc-5{
  color: #ff4444; 
}
.s-fc-6{
  color: #131313;
}
</style>
