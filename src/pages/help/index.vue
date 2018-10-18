<template>
  <div class="container" :class='{ ios: isIos }'>

    <topBar :config='config'></topBar>

    <div class='wrap'>

     <div class='content s-fc-2' v-text='content'></div> 
      
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
        title: '帮助',
        color: '#222',
        bg: '#fff',
        backImg: '/static/left_arrow.png'
      },
      content: ''
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
    let res = await api.getHelp()
    this.content = res
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
  overflow: hidden;
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
