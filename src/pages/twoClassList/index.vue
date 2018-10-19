<template>
  <!-- <pagecontent> -->
    <div class='container' :class='{ ios: isIos }'>
      <!-- <topBar :config='config' title='首页'></topBar> -->

      <div class='wrap'>

        <search :config='searchConfig' :content='content' @search='search' @clear='clearSearch'></search>

        <scroll-view class='class_container' scroll-x='true'>
          <view class='class_item s-fc-6' :class='{ checked: item.id === classId }' v-for='(item, index) in classList' :key='index' @click='changeClass(item)'>{{item.title}}</view>
        </scroll-view>

        <scroll-view class='class_container' scroll-x='true' v-if='twoClassId'>
          <view class='class_item s-fc-6' :class='{ checked: item.id === twoClassId }' v-for='(item, index) in twoClassList' :key='index' @click='changeClass(item)'>{{item.title}}</view>
        </scroll-view>

        <!-- <swiper class='class_wrap' :indicator-dots="false" :autoplay="false" :interval="interval" :circular='true' :duration="2000">
          <block v-for="(row, index) in classList" :key='index'>
            <swiper-item>
              <view class='class_row'>
                <view class='class_item s-fc-6' :class='{ checked: item.id === classId }' v-for='(item, i) in row' :key='i' @click='changeClass(item)'>{{item.title}}</view>
              </view>
            </swiper-item>
          </block>
        </swiper>

        <swiper class='class_wrap' :indicator-dots="false" :autoplay="false" :interval="interval" :duration="2000">
          <block v-for="(row, index) in twoClassList" :key='index'>
            <swiper-item >
              <view class='class_row'>
                <view class='class_item s-fc-6' :class='{ checked: item.id === twoClassId }' v-for='(item, i) in row' :key='i' @click='changeClass(item)'>{{item.title}}</view>
              </view>
            </swiper-item>
          </block>
        </swiper> -->

        <div class='list_wrap'>
          <div class='row' v-for='(row, i) in list' :key='i'>
            <div class='item' v-for='(item, index) in row' :key='index' @click='goGoods(item)'>
              <img class='item_img' :src='isArticle ? item.pic : item.goods_image' mode='aspectFill' />
              <div class='item_desc'>
                <div class='item_title s-fc-4'>{{isArticle ? item.title : item.goods_name}}</div>
                <div class='item_price s-fc-5'>{{item.goods_price}}</div>
              </div>
            </div>
          </div>
        </div>

        <end-bar v-if='list.length > 0'></end-bar> 

      </div>

    </div>
  <!-- </pagecontent> -->
</template>

<script>
import card from '@/components/card'
// import pageContent from '@/components/pageContent'
import topBar from '@/components/topBar'
import endBar from '@/components/endBar'
import slide from '@/components/slide'
import search from '@/components/search'
import api from '@/utils/api'
import pageConfig from './main.json'

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
      searchConfig: {
        canClear: true,
        size: 28,
        placeholder: '请输入商品名称',
        searchImg: '/static/search.png',
        closeImg: '/static/search_close.png'
      },
      classConfig: {
        '设计师+': { id: 1 },
        '易居管家': { id: 2 },
        '整居定制': { id: 3 },
        '集成暖通': { id: 4 },
        '主材选购': { id: 5 },
        '家具选购': { id: 6 },
        '易居海外': { id: 7 }
      },
      classList: [],
      twoClassList: [],
      classId: null,
      twoClassId: null,
      list: [],
      currentClass: '设计师+监理师',
      categoryId: null,
      currentPage: 1,
      limit: 10,
      total: 0,
      canLoad: true,
      canChange: true,
      content: '',
      isArticle: false
    }
  },

  components: {
    card,
    // pagecontent: pageContent,
    topBar,
    endBar,
    slide,
    search
  },

  computed: {
    getLength () { return this.list.reduce((p, v) => p + v.length, 0) },
    isIos () { return wx.getStorageSync('isIos') }
  },

  methods: {
    search (v) {
      this.content = v
      console.log(`search-${this.content}-`)

      this.total = 0
      this.list = []
      this.getList(this.currentPage = 1)
    },
    clearSearch () {
      this.content = ''

      this.total = 0
      this.list = []

      this.getList(this.currentPage = 1)
    },
    goGoods (item) {
      if (this.isArticle) return wx.navigateTo({ url: `/pages/article/main?id=${item.id}` })
      wx.navigateTo({ url: this.categoryId === 1 ? `/pages/goods/main?id=${item.goods_commonid}&isDesign=true` : `/pages/goods/main?id=${item.goods_commonid}` })
    },
    changeArray (arr, nub) {
      let newArr = []

      arr.forEach((v, i) => { i % nub === 0 ? newArr.push([v]) : newArr[Math.floor(i / nub)].push(v) })

      return newArr
    },
    changeClass (item) {
      if (!this.canChange) return
      this.canChange = false
      this.init()

      if (item.title === '设计师+易居学院') {
        this.isArticle = true
      }

      item.isTwo ? this.twoClassId = item.id : this.classId = item.id
      console.log('change', this.twoClassId, this.classId)
      if (!item.isTwo) {
        this.classs[this.classId] ? this.getTwoClass(this.classs[this.classId]) : this.twoClassList = []
      }

      this.getList(this.currentPage)
    },
    getTwoClass (twoClass) {
      let arr = []
      for (let key in twoClass) {
        arr.push({ id: key, title: twoClass[key].storegc_name, isTwo: true })
      }
      // this.twoClassList = this.changeArray(arr, 4)
      // this.twoClassId = this.twoClassList[0][0].id
      this.twoClassList = arr
      this.twoClassId = this.twoClassList[0].id
    },
    async getClass () {
      let res = await api.getGoodsClass(this.categoryId)
      let arr = []

      let o = res[0]
      for (let key in o) {
        arr.push({ id: key, title: o[key].storegc_name })
      }
      // this.classList = this.changeArray(arr, 4)
      this.classList = arr

      // this.classId = this.classList[0][0].id
      this.classId = this.classList[0].id
      this.classs = res

      let twoClass = this.classs[this.classId]
      if (twoClass) {
        this.getTwoClass(twoClass)
      }

      wx.hideLoading()
      this.getList(this.currentPage)
    },
    async getList (page) {
      wx.showLoading({ title: 'Loading...' })
      let param = {
        store_id: 1,
        gc_id_1: this.categoryId,
        gc_id: this.twoClassId || this.classId,
        page,
        limit: this.limit
      }
      if (this.content !== '') param.name = this.content
      console.log('param: --', param)

      let res = this.isArticle ? await api.getArticleList(param) : await api.getGoodsList(param)

      if (this.content !== '' && this.content !== param.name) return

      this.list = this.list.concat(this.changeArray(res.data, 2))
      console.log('list --', res, this.list)
      this.total = res.pagination.total
      this.canLoad = true
      this.canChange = true
      wx.hideLoading()
    },
    init () {
      this.classId = this.twoClassId = null
      this.currentPage = 1
      this.total = 0
      this.list = []
      this.content = ''
      this.isArticle = false
    }
  },

  created () {
    console.log('reLaunch')
  },

  onLoad (param) {
    wx.showLoading({ title: 'Loading...' })

    let category = decodeURIComponent(param.category)
    this.config.title = category
    // pageConfig.navigationBarTitleText = category
    wx.setNavigationBarTitle({ title: category })
    this.categoryId = this.classConfig[category].id
    console.log('onload --', category, this.categoryId)

    this.classList = []
    this.twoClassList = []
    this.init()

    this.getClass()
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

    if (this.getLength >= this.total) {
      return wx.hideLoading()
      // return wx.showModal({ content: '已经是最后一页了!', showCancel: false })
    }
    this.canLoad = false

    this.getList(++this.currentPage)
  },

  onShareAppMessage () {

  }
}
</script>

<style scoped>

.container{
  
}

.wrap{
  font-family: 'PingFang-SC-Medium';
  overflow: hidden;
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
  border: 1rpx solid #999;
  border-radius: 8rpx;
  font-size: 28rpx;
}
.search_desc{
  position: absolute;
  top: 25rpx;
  left: 20rpx;
  /* left: calc(50% - 44rpx); */
  display: flex;
  align-items: center;
  text-align: center;
  width: 100rpx;
}
.search_icon{
  width: 28rpx;
  height: 28rpx;
  margin-right: 10rpx;
}
.search_content{
  font-size: 28rpx;
}

.class_container{
  width: 100%; 
  height: 100rpx;
  margin: 30rpx 0 0;
  padding: 0 30rpx;
  white-space: nowrap; 
  overflow: hidden;
}
.class_container .class_item{
  display: inline-block;
}

.class_wrap{
  height: 100rpx;
}
.class_row{
  display: flex;
  align-items: center;
  margin: 30rpx 0 0;
  padding: 0 30rpx;
}
.class_item{
  box-sizing: border-box;
  min-width: 150rpx;
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
  /* border-bottom: 2rpx solid #937d8a; */
}

.list_wrap{
  padding: 0 20rpx;
  background: #fff;
}
.row{
  width: 100%;
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
.s-fc-7{
  color: #dedede; 
}

.s-bg-7{
  background: #dedede; 
}
.test_merge{

}
</style>
