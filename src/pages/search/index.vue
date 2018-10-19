<template>
  <div class="container" :class='{ ios: isIos }'>

    <!-- <topBar :config='config'></topBar> -->

    <div class='wrap'>

      <!-- <div class='search_wrap'>
        <input class='search s-fc-2' @input='search' v-model="content" />
        <div class='search_desc s-fc-2'>
          <div class='search_main' >
            <image class='search_icon' src='/static/search.png' v-if='!content'/>
            <div class='search_content' v-if='!content'>请输入商品名称</div>
          </div>
          <div class='search_close_wrap' @click='clearSearch'>
            <image class='search_close' src='/static/search_close.png' />
          </div>
        </div>
      </div> -->

      <search :config='searchConfig' :content='content' @search='search' @clear='clearSearch'></search>

      <div class='list_wrap'>
        <div class='row' v-for='(row, i) in list' :key='i'>
          <div class='item' v-for='(item, index) in row' :key='index' @click='goGoods(item)'>
            <image class='item_img' :src='item.goods_image' mode='aspectFill' />
            <div class='item_desc'>
              <div class='item_title s-fc-4'>{{item.goods_name}}</div>
              <div class='item_price s-fc-5'>{{item.goods_price}}</div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import topBar from '@/components/topBar'
import search from '@/components/search'
import api from '@/utils/api'

export default {
  data () {
    return {
      config: {
        title: '搜索',
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
      list: [],
      currentPage: 1,
      limit: 10,
      total: 0,
      canLoad: true,
      content: ''
    }
  },

  components: {
    topBar,
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
      this.content !== '' && this.getList(this.currentPage = 1)
    },
    clearSearch () {
      this.content = ''

      this.total = 0
      this.list = []
    },
    goGoods (item) {
      wx.navigateTo({ url: item.gc_id_1 === 1 ? `/pages/goods/main?id=${item.goods_commonid}&isDesign=true` : `/pages/goods/main?id=${item.goods_commonid}` })
    },
    changeArray (arr) {
      let newArr = []

      arr.forEach((v, i) => { i % 2 === 0 ? newArr.push([v]) : newArr[Math.floor(i / 2)].push(v) })

      return newArr
    },
    async getList (page) {
      wx.showLoading({ title: 'Loading...' })
      let param = {
        store_id: 1,
        name: this.content,
        page,
        limit: this.limit
      }
      console.log('param: --', param)

      let res = await api.getGoodsList(param)

      if (this.content !== param.name) return

      this.list = this.list.concat(this.changeArray(res.data, 2))
      this.total = res.pagination.total
      this.canLoad = true
      console.log(res, this.list)

      wx.hideLoading()
    }
  },

  created () {
    console.log('search created')
  },

  onLoad (param) {

    this.currentPage = 1
    this.total = 0
    this.list = []
    this.content = ''

    // this.getList(this.currentPage)
  },

  // onPullDownRefresh () {
  //   wx.reLaunch({
  //     url: `/pages/twoClassList/main`
  //   })
  // },

  onReachBottom () {
    wx.showLoading({ title: 'Loading...' })

    if (!this.canLoad) {
      return null
    }

    if (this.getLength >= this.total) {
      wx.hideLoading()
      return wx.showModal({ content: '已经是最后一页了!', showCancel: false })
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
  border: 1rpx solid #eee;
  border-radius: 8rpx;
  font-size: 28rpx;
}
.search{
  width: calc(100% - 50rpx);
  height: 100%;
}
.search_desc{
  position: absolute;
  /* top: 25rpx; */
  /* left: calc(50% - 44rpx); */
  top: 0;
  left: 20rpx;
  z-index: 1;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* width: 100rpx; */
  width: calc(100% - 20rpx);
  height: 100%;
}
.search_main{
  display: flex;
  align-items: center;
}
.search_close_wrap{
  padding-right: 20rpx;
}
.search_close{
  width: 30rpx;
  height: 30rpx;
}
.search_icon{
  width: 28rpx;
  height: 28rpx;
  margin-right: 10rpx;
}
.search_content{
  font-size: 28rpx;
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
