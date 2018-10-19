<template>
  <div class="container" :class='{ ios: isIos }'>

    <!-- <topBar :config='config'></topBar> -->

    <div class='wrap'>

      <image class='article_img' :src='detail.pic' mode='aspectFill' />

      <div class='article'>

        <div class='title s-fc-3' v-text='detail.title'></div>

        <div class='time s-fc-4' v-text='detail.add_time'></div>

        <div class='content s-fc-2' v-for='(item, index) in detail.body' :key='index'>
          <div style='margin-bottom: 30rpx;'>{{item.content}}</div>
          <image class='detail_img' :src='item.img' mode='aspectFill' />
        </div>

      </div>
      
    </div>
  </div>
</template>

<script>
import topBar from '@/components/topBar'
import api from '@/utils/api'

export default {
  data () {
    return {
      userInfo: {},
      config: {
        title: '详情',
        color: '#222',
        bg: '#fff',
        backImg: '/static/left_arrow.png'
      },
      content: '',
      detail: {},
      id: null
    }
  },

  components: {
    topBar
  },

  computed: {
    isIos () { return wx.getStorageSync('isIos') }
  },

  methods: {

  },

  created () {
    console.log('help create')
  },

  async onLoad (params) {
    this.id = params.id

    let res = await api.getArticle(this.id, null, this)
    console.log('article detail --', res)
    this.detail = res
  },

  onPullDownRefresh () {
    wx.reLaunch({
      url: '/pages/help/main'
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

.article_img{
  width: 100%;
  height: 350rpx;
  background: #ccc;
}

.article{
  width: 670rpx;
  margin: 30rpx auto 0;
}

.title{
  font-size: 34rpx;
}
.time{
  margin: 24rpx 0 0;
  font-size: 26rpx;
}
.content{
  margin: 24rpx 0 0;
}
.detail_img{
  width: 100%;
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
  color: #a9a9a9;
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
