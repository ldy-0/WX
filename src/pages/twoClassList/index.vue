<template>
  <div class="container">

    <topBar :config='config' title='首页'></topBar>

    <div class='wrap'>

      <div class='search_wrap'>
        <input class='search s-fc-2' @input='search' />
        <div class='search_desc s-fc-2' v-if='!content'>
          <image class='search_icon' src='/static/search.png' />
          <div class='search_content'>搜索</div>
        </div>
      </div>

      <swiper class='class_wrap' :indicator-dots="false" :autoplay="false" :interval="interval" :duration="2000">
        <block v-for="(row, index) in classList" :key='index'>
          <swiper-item >
            <view class='class_row'>
              <view class='class_item checked s-fc-6' v-for='(item, i) in row' :key='i'>{{item.title}}</view>
            </view>
          </swiper-item>
        </block>
      </swiper>
      <swiper class='class_wrap' :indicator-dots="false" :autoplay="false" :interval="interval" :duration="2000">
        <block v-for="(row, index) in classList" :key='index'>
          <swiper-item >
            <view class='class_row'>
              <view class='class_item checked s-fc-6' v-for='(item, i) in row' :key='i'>{{item.title}}</view>
            </view>
          </swiper-item>
        </block>
      </swiper>

      <div class='list_wrap'>
        <div class='row' v-for='(row, i) in list' :key='i'>
          <div class='item' v-for='(item, index) in row' :key='index' @click='goGoods(index)'>
            <img class='item_img' src='' />
            <div class='item_desc'>
              <div class='item_title s-fc-4'>{{item.title}}</div>
              <div class='item_price s-fc-5'>{{item.price}}</div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import card from '@/components/card'
import topBar from '@/components/topBar'
import slide from '@/components/slide'

export default {
  data () {
    return {
      userInfo: {},
      config: {
        title: '',
        color: '#222',
        bg: '#fff', // '#937d8a',
        backImg: '/static/left_arrow.png'
      },
      classList: [
        [ { title: '餐厅系列' },
          { title: '客厅系列' },
          { title: '客厅系列' },
          { title: '书房系列' } ],
        [ { title: 'a厅系列' },
          { title: '客b系列' },
          { title: '客厅系列' },
          { title: '设计师+' } ]
      ],
      list: [],
      currentClass: '设计师+监理师',
      currentPage: 1,
      limit: 2,
      total: 0,
      canLoad: true,
      content: ''
    }
  },

  components: {
    card,
    topBar,
    slide
  },

  methods: {
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
    console.log('reLaunch')
  },

  onLoad (param) {
    let category = decodeURIComponent(param.category)
    this.config.title = category
    console.log(category)

    this.currentPage = 1
    this.total = 0
    this.list = []
    this.content = ''

    this.getList(this.currentPage)
  },

  onPullDownRefresh () {
    wx.reLaunch({
      url: `/pages/twoClassList/main?category=${this.config.title}`
    })
  },

  onReachBottom () {
    wx.showLoading({ title: 'Loading...' })

    if (!this.canLoad) {
      return null
    }
    this.canLoad = false

    this.getList(++this.currentPage)
  }
}
</script>

<style scoped>

.container{
  
}

.wrap{
  font-family: 'PingFang-SC-Medium';
}

.search_wrap{
  position: relative;
  width: 610rpx;
  height: 76rpx;
  margin: 30rpx auto 0;
}
.search{
  width: 100%;
  height: 100%;
  border: 1rpx solid #eee;
  border-radius: 8rpx;
  font-size: 28rpx;
}
.search_desc{
  position: absolute;
  top: 25rpx;
  left: calc(50% - 44rpx);
  display: flex;
  align-items: center;
  text-align: center;
  width: 88rpx;
}
.search_icon{
  width: 28rpx;
  height: 28rpx;
  margin-right: 10rpx;
}
.search_content{
  font-size: 28rpx;
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
