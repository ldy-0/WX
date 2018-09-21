<template>
  <div class="container">

    <topBar :config='config' title='首页'></topBar>

    <slide :config='slideConfig'></slide>

    <div class='search'>
      <image class='search_icon' src='' />
      <div class='search_content s-fc-2'>搜索</div>
    </div>

    <div class='list_wrap'>
      <div class='item' v-for='(item, index) in list' :key='index' @click='goList(item, $event)'>
        <img class='item_bg' src='' />
        <div class='item_desc'>
          <div class='mask'></div>
          <div class='item_title s-fc-1'>{{item.title}}</div>
        </div>
      </div>
    </div>
    <!-- <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div> -->

    

    <!-- <div class='modal'>
      <div class=''></div> 
    </div> -->

    <!-- <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form> -->
    <!-- <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a> -->
  </div>
</template>

<script>
import topBar from '@/components/topBar'
import slide from '@/components/slide'

export default {
  data () {
    return {
      userInfo: {},
      config: {
        title: '易·居家居生活馆',
        color: '#222',
        bg: '#fff'
        // backImg: '/static/back_gray.png'
      },
      slideConfig: {
        height: '500rpx',
        autoplay: false,
        data: [
          { img: '/static/toolBar/classify.png' },
          { img: '/static/toolBar/home.png' }
        ]
      },
      list: [
        { title: '设计师+', img: '', url: '/pages/design/main' },
        { title: '半包定制', img: '', url: '/pages/banbao/main' },
        { title: '易居管家', img: '' },
        { title: '整居定制', img: '' },
        { title: '集成暖通', img: '' },
        { title: '主材选购', img: '' },
        { title: '家具选购', img: '', url: '/pages/jiaju/main' },
        { title: '易居海外', img: '' }
      ]
    }
  },

  components: {
    topBar,
    slide
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    goList ({url}) {
      wx.navigateTo({
        url: url
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

  onPullDownRefresh () {
    wx.reLaunch({
      url: '/pages/index/main'
    })
  }

}
</script>

<style scoped>

.search{
  position: relative;
  top: -30rpx;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 610rpx;
  height: 76rpx;
  margin: 0 auto;
  border-radius: 8rpx;
  background: #fff;
}
.search_icon{
  width: 28rpx;
  height: 28rpx;
}
.search_content{
  font-size: 28rpx;
}

.list_wrap{
  display: flex;
  flex-wrap: wrap;
}
.item{
  position: relative;
  flex-shrink: 0;
  width: 50%;
  height: 350rpx;
}
.item_bg{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ccc;
}
.item_desc{
  position: relative;
  top: calc(50% - 50rpx);
  width: 330rpx;
  height: 100rpx;
  margin: 0 auto;
  border: 1rpx solid #fff;
}
.mask{
  position: absolute;
  top: 6rpx;
  left: 6rpx;
  right: 6rpx;
  bottom: 6rpx;
  background: #eee;
  opacity: 0.3;
  filter: alpha(opacity=30);
}
.item_title{
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
}

.s-fc-1{
  color: #fff;
}
.s-fc-2{
  color: #999;
}
</style>
