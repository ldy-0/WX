<template>
  <div class="container" :class='{ ios: isIos }'>

    <!-- <topBar :config='config' title='首页'></topBar> -->

    <slide :config='slideConfig' @go='go'></slide>

    <!-- search -->
    <div class='search_wrap s-bg-1'>
      <search :config='searchConfig' :content='searchContent' @search='search' @clear='clearSearch' @confirm='confirm'></search>
    </div>
    <!-- <div class='search_wrap s-bg-1'>
      <input class='search_input' v-model="searchContent" @focus='focus' @blur='blur' /> 
      <div class='search' v-if="isShowPlaceholder">
        <image class='search_icon' src='/static/search.png' />
        <div class='search_content s-fc-2'>请输入商品名称</div>
      </div>
    </div> -->

    <div class='list_wrap'>
      <div class='item' v-for='(item, index) in list' :key='index' @click='goList(item, $event)'>
        <img class='item_bg' :src='item.img' />
        <div class='item_desc'>
          <div class='mask'></div>
          <div class='item_title s-fc-1'>{{item.title}}</div>
        </div>
      </div>
    </div>

    <div class='modal' @touchmove.stop='preventScroll' v-if='isShow'>
      <div class='content'>
        <button class='btn' open-type='getPhoneNumber' @getphonenumber='getPhone' plain='true'>
          <image src='/static/authorize_phone.png' style='width: 100%; heigh:100%;' mode='aspectFill' />
          <!-- <div style='margin: 60rpx 0 0;'>获取手机号</div> -->
          <!-- <div class='auth_btn'>确认授权</div> -->
        </button>
      </div>
    </div>
    <!-- <modal :config='modalConfig' @click='test' v-if='phoneConfig.isShow'></modal> -->

    <div class='cart' @click='goCart'>
      <image src='/static/home/cart.png' style='width: 85rpx; height: 85rpx;' mode='aspectFill' />
    </div>

  </div>
</template>

<script>
import topBar from '@/components/topBar'
import slide from '@/components/slide'
import search from '@/components/search'
import modal from '@/components/modal'
import getPhone from '@/components/getPhone'
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
        data: []
      },
      searchConfig: {
        canClear: true,
        size: 28,
        placeholder: '请输入商品名称',
        searchImg: '/static/search.png',
        closeImg: '/static/search_close.png',
        border: 'none',
        margin: '0'
      },
      modalConfig: {
        height: '300rpx',
        width: '400rpx'
      },
      phoneConfig: {
        isShow: true
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
      searchContent: '',
      isShowPlaceholder: true,
      isShow: true
    }
  },

  components: {
    topBar,
    slide,
    search,
    modal,
    getPhone
  },

  computed: {
    isIos () { return wx.getStorageSync('isIos') }
  },

  methods: {
    // test (param) { console.log('test'); this.phoneConfig.isShow = false },
    preventScroll () {
      return false
    },
    go (item) {
      console.log('slide click', item.type)
      if (item.type === 1) {
        wx.navigateTo({ url: `/pages/img/main?url=${item.banner_url}` })
      } else if (item.type === 2) {
        wx.navigateTo({ url: `/pages/goods/main?id=${item.banner_url}` })
      }
    },
    goCart () {
      wx.navigateTo({ url: `/pages/shoppingCart/main` })
    },
    goSearch () { wx.navigateTo({ url: `/pages/search/main?content=${this.searchContent}` }) },
    search (v) {
      this.searchContent = v
      console.log(`search-${this.content}-`)
    },
    clearSearch () {
      this.searchContent = ''
    },
    confirm () { this.goSearch() },
    goList ({url}) {
      wx.navigateTo({
        url: url
      })
    },
    async getBanner () {
      let res = await api.getBanner({ store_id: 1 })
      console.log('banner --', res)
      if (res) {
        res.forEach(v => { v.img = v.banner_pic })
        this.slideConfig.data = res
      }
    },
    async getPhone (e) {
      let code = wx.getStorageSync('code')
      let o = e.mp.detail

      if (o.errMsg === 'getPhoneNumber:ok') {
        wx.showLoading({ title: 'Loading...' })

        let param = {
          code,
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
        wx.hideLoading()
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
    console.log('index created')
  },

  async onLoad (param) {
    if (wx.getStorageSync('userInfo').phone) {
      this.isShow = false
    }

    if (!wx.getStorageSync('userInfo')) {
      let res = await this.login()
      wx.setStorageSync('code', res.code)

      let data = await api.getToken(res.code)
      console.log('-- get Token --', data)

      let userInfo = await api.getUserInfo()
      if (userInfo) {
        wx.setStorageSync('userInfo', userInfo)

        if (!userInfo.phone) {
          let res = await this.login()
          wx.setStorageSync('code', res.code)
          console.log('phone code--', res.code)
        }
      } else {
        return wx.redirectTo({ url: '/pages/authorization/main?referer=/pages/index/main' })
      }
    }

    this.getBanner()
  },

  onHide () {
    this.searchContent = ''

    if (this.isShow) {
      wx.reLaunch({ url: '/pages/index/main' })
    }
  },

  onPullDownRefresh () {
    wx.reLaunch({
      url: '/pages/index/main'
    })
  },

  onShareAppMessage () {

  }

}
</script>

<style scoped>

.search_wrap{
  position: relative;
  top: -30rpx;
  z-index: 1;
  width: 670rpx;
  height: 76rpx;
  margin: 0 auto;
  border-radius: 8rpx;
  box-shadow: 0rpx 4rpx 16rpx -8rpx #333;
  font-size: 28rpx;
  vertical-align: baseline;
}
.search_input{
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-left: 30rpx;
}
.search{
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
}
.search_icon{
  width: 28rpx;
  height: 28rpx;
  margin: 0 20rpx;
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
  border: 2rpx solid #fff;
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
  left: calc(50% - 300rpx);
  top: calc(50% - 240rpx);
  width: 600rpx;
  height: 480rpx;
  border-radius: 10rpx;
  background: #fff;
}
.btn{
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
}
.auth_btn{
  width: 200rpx; 
  height: 100rpx; 
  line-height: 100rpx;
  margin: 20rpx auto 0; 
  border-radius: 10rpx; 
  font-size: 30rpx;
  color: #fff; 
  background: #937d8a;
}

.cart{
  position: fixed;
  bottom: 18%;
  right: 30rpx;
  width: 85rpx;
  height: 85rpx;
}

.s-fc-1{
  color: #fff;
}
.s-fc-2{
  color: #999;
}

.s-bg-1{
  background: #fff;
}
</style>
