<template>
  <div class="container">

    <topBar :config='config'></topBar>

    <div class='tab'>
      <div class='tab_item s-fc-3' :class='{ checked: item.title === currentClass }' v-for='(item, index) in classList' :key='index' @click='change(item)'>{{item.title}}</div>
    </div>

    <div class='list_wrap'>
      <div class='row' v-for='(row, i) in list' :key='i'>

        <div class='item' v-for='(item, index) in row' :key='index' @click='goGoods(index)'>
          <img class='item_img' src='' />
          <div class='item_desc'>
            <div class='item_title s-fc-4'>{{item.title}}</div>
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
        color: '#fff',
        bg: '#937d8a',
        backImg: '/static/left_arrow.png'
      },
      classConfig: {
        '设计师+': [
          { title: '设计师+监理师' },
          { title: '设计师+搭配师' },
          { title: '设计师+易居学院' } ],
        '整居定制': [
          { title: '半包定制' },
          { title: '主材定制' },
          { title: '柜体定制' } ],
        '集成暖通': [
          { title: '中央空调' },
          { title: '暖气' },
          { title: '新风系统' } ],
        '主材选购': [
          { title: '大理石' },
          { title: '瓷砖' },
          { title: '门' } ],
        '易居海外': [
          { title: '澳洲定制旅游' },
          { title: '欧洲老油画' },
          { title: '古董银器' }
        ]
      },
      classList: [],
      list: [],
      currentClass: '',
      currentPage: 1,
      limit: 2,
      total: 0,
      canLoad: true
    }
  },

  components: {
    card,
    topBar,
    slide
  },

  methods: {
    change (item) {
      this.currentClass = item.title
      this.currentPage = 1
      this.list = []
      this.total = 0
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
    console.log('design create')
  },

  onLoad (param) {
    let category = decodeURIComponent(param.category)
    this.config.title = category
    this.classList = this.classConfig[category]
    this.currentClass = this.classList[0].title
    console.log(category, this.currentClass)

    this.getList(this.currentPage)
  },

  onPullDownRefresh () {
    wx.reLaunch({
      url: '/pages/index/main'
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
  font-family: 'PingFang-SC-Medium';
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
.item_title{
  height: 72rpx;
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
</style>
