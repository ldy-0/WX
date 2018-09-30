<template>
  <div class="container">

    <topBar :config='config' title='首页'></topBar>

    <div class='authorization s-bg-1'>

      <div class='company_info'>
        <img class='logo' src='../../images/authorization/authorize_logo.png' alt='no found' />
        <div class='desc s-fc-2'>Welcome !</div>
      </div>

      <button class='authorization_btn s-bg-2' open-type="getUserInfo" plain='true' lang="zh_CN" @getuserinfo="getUserInfo">
        <img src='../../images/authorization/authorize_icon.png' alt='no found' class='authorization_icon' />
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
      referer: null
    }
  },

  components: {
    topBar
  },

  methods: {
    async getUserInfo (e) {
      let code = wx.getStorageSync('code')

      if (e.mp.detail.errMsg === 'getUserInfo:ok') {
        wx.showLoading({ title: 'Loading...' })
        // let params = {}

        if (!code) {
          return undefined
        }

        // params.code = code
        // params.encryptedData = e.detail.encryptedData
        // params.iv = e.detail.iv

        wx.setStorageSync('userInfo', e.mp.detail.userInfo)
        // wx.setStorageSync('params', params)

        let user = await api.setUserInfo({
          wx_name: wx.getStorageSync('userInfo').nickName,
          wx_avatar: wx.getStorageSync('userInfo').avatarUrl
        })
        console.log('setUser', user)
        if (!user) {
          let userInfo = await api.getUserInfo()
          userInfo && wx.setStorageSync('userInfo', userInfo)
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
  top: 30%;
  left: calc(50% - 300rpx);
  width: 600rpx;
  text-align: center;
}
.logo{
  width: 185rpx;
  height: 185rpx;
}
.desc{
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
