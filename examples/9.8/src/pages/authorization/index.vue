<template>
  <div class="container" > <!--@click="clickHandle('test click', $event)" -->

    <topBar :config='config' title='-首页-'></topBar>

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
    <!-- <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div> -->

    <!-- <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>
    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a> -->
  </div>
</template>

<script>
import topBar from '@/components/topBar'
// import util from '@/utils/util.js'

export default {
  data () {
    return {
      userInfo: {},
      config: {
        // onlyLeft: true,
        title: '授权',
        subTitle: '返回',
        color: '#fff',
        bg: 'green'
      },
      referer: null
    }
  },

  components: {
    topBar
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    async getUserInfo (e) {
      let code = wx.getStorageSync('code')

      if (e.mp.detail.errMsg === 'getUserInfo:ok') {
        wx.showLoading({ title: 'Loading...' })
        let params = {}

        if (!code) {
          return undefined
        }

        // params.code = code
        // params.encryptedData = e.detail.encryptedData
        // params.iv = e.detail.iv

        wx.setStorageSync('userInfo', e.mp.detail.userInfo)
        wx.setStorageSync('params', params)

        // console.log('setUser', user)
        // if (!user) {
        console.log(this.referer, 'userinfo')
        wx.reLaunch({ url: this.referer })
        // }

        wx.hideLoading()
      }
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
      this.config.bg = 'blue'
    },
    login () {
      return new Promise(function (resolve, reject) {
        wx.login({
          success (res) { resolve(res) },
          fail (err) { reject(err) }
        })
      }).catch(err => err)
    },
    async setCode () {
      let res = await this.login()
      wx.setStorageSync('code', res.code)
    }
  },

  created () {
    this.setCode()
  },

  onLoad (params) {
    console.log('onload', params)
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
  color: antiquewhite;
}
.s-bg-1{
  background: antiquewhite;
}
.s-fc-2{
  color: #fff;
}
.s-bg-2{
  background: #fff;
}
</style>
