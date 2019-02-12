<template>
  <div class='container' :class='{ ios: isIos }'>

    <topBar :config='config'></topBar>

    <div class='authorization s-bg-1'>

      <div class='company_info'>
        <img class='logo' :src='authConfig.logo' alt='no found' />
        <div class='desc s-fc-2'>Welcome !</div>
        <div class='sub_desc s-fc-2'>{{authConfig.name}}</div>
      </div>

      <button class='authorization_btn s-bg-2' open-type="getUserInfo" plain='true' lang="zh_CN" @getuserinfo="getUserInfo">
        <img src='/static/authorize_icon.png' alt='no found' class='authorization_icon' />
        <div class='authorization_desc s-fc-1'>微信登入</div>
      </button>

    </div>

  </div>
</template>

<script>
import topBar from '@/components/topBar'
import api from '@/utils/api.js'

export default {
  data () {
    return {
      config: {
        title: '授权',
        color: '#fff',
        bg: '#937d8a'
      },
      userInfo: {},
      referer: null,
      authConfig: {
        name: '易·居家居生活馆',
        logo: '/static/authorize_logo.png'
      }
    }
  },

  components: {
    topBar
  },

  computed: {
    isIos () { return wx.getStorageSync('isIos') }
  },

  methods: {
    async getUserInfo (e) {
      let code = wx.getStorageSync('code')

      if (e.mp.detail.errMsg === 'getUserInfo:ok') {
        wx.showLoading({ title: 'Loading...' })

        if (!code) {
          return undefined
        }

        wx.setStorageSync('userInfo', e.mp.detail.userInfo)

        let user = await api.setUserInfo({
          wx_name: wx.getStorageSync('userInfo').nickName,
          wx_avatar: wx.getStorageSync('userInfo').avatarUrl
        })
        console.log('setUser', user)

        if (!user) {
          let userInfo = await api.getUserInfo()
          userInfo && wx.setStorageSync('userInfo', userInfo)

          if (userInfo && !userInfo.phone) {
            let res = await this.login()
            wx.setStorageSync('code', res.code)
            console.log('phone code--', res.code)
          }

          wx.reLaunch({ url: this.referer })
        }

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
    },
    async getToken () {
      let res = await this.login()
      wx.setStorageSync('code', res.code)

      let data = await api.getToken(res.code)
      console.log('-- get Token --', data)
    }
  },

  created () {
    // this.getToken()
  },

  onLoad (params) {
    console.log('authorization onload', params)
    this.referer = params.referer
  }

}
</script>

<style scoped>

.authorization{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}

.company_info{
  position: absolute;
  top: 18%;
  left: calc(50% - 300rpx);
  width: 600rpx;
  text-align: center;
}
.logo{
  width: 300rpx;
  height: 300rpx;
}
.desc{
  margin: 80rpx 0 0;
}
.sub_desc{
  margin: 10rpx 0 0;
  font-size: 24rpx;
}

.authorization_btn{
  position: absolute;
  top: 60%;
  left: calc(50% - 345rpx);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 690rpx;
  padding: 0;
  border: none;
  border-radius: 20rpx;
}
.authorization_icon{
  width: 60rpx;
  height: 50rpx;
}
.authorization_desc{
  margin-left: 30rpx;
}

.s-fc-1{
  /* color: antiquewhite; */
  color:#937d8a; 
}
.s-bg-1{
  /* background: antiquewhite; */
  background: #937d8a;
}
.s-fc-2{
  color: #fff;
}
.s-bg-2{
  background: #fff;
}
</style>
