<template>
  <div class="container">

    <topBar :config='config' title='首页'></topBar>

    <slide :config='slideConfig'></slide>

    <div class='search'>
      <image class='search_icon' src='/static/search.png' />
      <div class='search_content s-fc-2'>搜索</div>
    </div>

    <div class='list_wrap'>
      <div class='item' v-for='(item, index) in list' :key='index' @click='goList(item, $event)'>
        <img class='item_bg' :src='item.img' />
        <div class='item_desc'>
          <div class='mask'></div>
          <div class='item_title s-fc-1'>{{item.title}}</div>
        </div>
      </div>
    </div>

    <div class='modal' v-if='isShow'>
      <div class='content' @touchmove.stop='preventScorll'>
        <button class='btn' open-type='getPhoneNumber' @getphonenumber='getPhone' plain='true'>
          <div>获取手机号</div>
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import topBar from '@/components/topBar'
import slide from '@/components/slide'
import api from '@/utils/api'

export default {
  data () {
    return {
      userInfo: {},
      config: {
        title: '易·居家居生活馆',
        color: '#222',
        bg: '#fff'
        // backImg: '/static/left_arrow.png'
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
        { title: '设计师+', img: '/static/home/design.png', url: '/pages/twoClassList/main?category=' + encodeURIComponent('设计师+') },
        { title: '半包定制', img: '/static/home/banbao.png', url: '/pages/banbao/main' },
        { title: '易居管家', img: '/static/home/img_3.png', url: '/pages/twoClassList/main?category=' + encodeURIComponent('易居管家') },
        { title: '整居定制', img: '/static/home/img_4.png', url: '/pages/twoClassList/main?category=' + encodeURIComponent('整居定制') },
        { title: '集成暖通', img: '/static/home/img_5@2x.png', url: '/pages/twoClassList/main?category=' + encodeURIComponent('集成暖通') },
        { title: '主材选购', img: '/static/home/img_6@2x.png', url: '/pages/twoClassList/main?category=' + encodeURIComponent('主材选购') },
        { title: '家具选购', img: '/static/home/img_7@2x.png', url: '/pages/twoClassList/main?category=' + encodeURIComponent('家具选购') },
        { title: '易居海外', img: '/static/home/img_8@2x.png', url: '/pages/twoClassList/main?category=' + encodeURIComponent('易居海外') }
      ],
      isShow: false
    }
  },

  components: {
    topBar,
    slide
  },

  methods: {
    prenventScroll () {
      return false
    },
    goList ({url}) {
      wx.navigateTo({
        url: url
      })
    },

    async getBanner () {
      let res = await api.getBanner(9)
      console.log(res)
    },
    async getPhone (e) {
      let o = e.mp.detail
      if (o.errMsg === 'getPhoneNumber:ok') {
        let param = {
          code: wx.getStorageSync('code'),
          encryptedData: o.encryptedData,
          iv: o.iv
        }

        let data = await api.setPhone(param)

        if (data) {
          let userInfo = wx.getStorageSync('userInfo')
          userInfo.phone = data
          wx.setStorageSync('userInfo', userInfo)

          this.isShow = false
        }
        console.log(param, this.isShow)
      }
    },
    login () {
      return new Promise(function (resolve, reject) {
        wx.login({
          success (res) { resolve(res) },
          fail (e) { resolve(e) }
        })
      })
    }
  },

  async created () {
    let p = new Promise(function (resolve, reject) {
      reject('resolve')
    })
    let p2 = p.catch(e => console.log(Object.keys(e)))
    setTimeout(function () {
      let pp = new Promise(function(){}).then(() => console.log('full'), () => console.log('fail'))
      console.log('timeout', p, p2, p === p2, p)
    })
    console.log('index created')
    if (!wx.getStorageSync('userInfo')) {
      let res = await this.login()
      wx.setStorageSync('code', res.code)

      let data = await api.getToken(res.code)
      // console.log('-- get Token --', data)

      let userInfo = await api.getUserInfo()
      if (userInfo) {
        wx.setStorageSync('userInfo', userInfo)
      } else {
        return wx.redirectTo({ url: '/pages/authorization/main?referer=/pages/index/main' })
      }
    }
  },

  onLoad (param) {
    this.getBanner()
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

.modal{
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .3);
}
.content{
  position: absolute;
  left: calc(50% - 200rpx);
  top: calc(50% - 150rpx);
  width: 400rpx;
  height: 300rpx;
  background: #fff;
}
.btn{
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
}

.s-fc-1{
  color: #fff;
}
.s-fc-2{
  color: #999;
}
</style>
