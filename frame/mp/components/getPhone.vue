<template>
  <div v-if='config.isShow'>

    <custom-modal :config='modalConfig' @touchmove.stop='preventScorll' @close='closeModal'>
      <div>
        <button class='weixin_phone_btn clear_btn s-fc-1 s-bg-2' style='border: none' open-type='getPhoneNumber' @getphonenumber='getPhone' plain='true'>
            <image class='weixin_icon' src='/static/weixin.png' mode='aspectFill' />
            <div>微信手机号一键绑定</div>
            <!-- <div class='auth_btn' :style='{ color: config.color, background: config.bg }'>使用手机号绑定</div> -->
        </button>

        <custom-phone @show='showRegisterPhone'></custom-phone>

      </div>
    </custom-modal>

    <div class='custom_modal' @touchmove.stop='preventScorll' @click.stop='closeRegisterPhone' v-if='registering'>
      <div class='form_wrap' @click.stop='preventClose'>
        <div class='form_title_wrap s-fc-2'>
          
          <div class='form_title'>资料填写</div>

          <img class='close_btn' src='/static/close.png' alt='No Found' @click.stop='closeRegisterPhone' />

        </div>

        <div class='form_item'>
          <input class='form_input' placeholder="手机号" placeholder-style="color: #d5d3d3;" v-model='phone' />
        </div>
        
        <div class='form_item'>
          <input class='form__input' placeholder="短信验证码" placeholder-style="color: #d5d3d3;" v-model='captcha' />
          <div class='captcha_btn s-fc-5' @click='getCaptcha'>{{countdown_time ? countdown_time + 's' : '获取验证码'}}</div>
        </div>

        <div class='submit_btn s-fc-1 s-bg-3' @click='savePhone'>确定</div>

        <button class='form_weixin_btn clear_btn s-fc-6' style='border: none' open-type='getPhoneNumber' @getphonenumber='getPhone' plain='true'>
            <image class='form_weixin_icon' src='/static/weixin.png' mode='aspectFill' />
            <div>微信手机号一键绑定</div>
        </button>
      </div>
    </div>
    
  </div>
</template>

<script>
import modal from '@/components/modal'
import customPhone from '@/components/customPhone'
import api from '@/utils/api'

export default {
  // props: ['text']
  props: {
    config: 'Object',
    isShow: 'boolean'
  },

  components: {
    customModal: modal,
    customPhone
  },

  data () {
    return {
      modalConfig: {
        width: '600rpx',
        height: '400rpx',
        title: '绑定手机号',
        showTitle: true,
        noClose: false
      },
      registerConfig: {
        width: '600rpx',
        height: '568rpx',
        title: '绑定手机号',
        showTitle: true,
        noClose: false
      },
      registering: false,
      phone: null,
      captcha: null,
      countdown_time: 0
    }
  },

  methods: {
    preventScorll () {},
    preventClose () {},
    closeModal (e) { this.$emit('close') },
    showRegisterPhone (e) { console.log('registering :', this.registering = true) },
    closeRegisterPhone () { this.interval && clearInterval(this.interval); this.registering = false },
    async getCaptcha () {
      let phone = /^((13[0-9])|(14[5|7|9])|(15([0-3]|[5-9]))|(17[0,1,3,5,6,7,8])|(18[0-9]))\d{8}$/

      if (!this.phone || !phone.test(this.phone)) return wx.showModal({ title: '请输入正确的手机号', showCancel: false })
      // let res = await api.getCaptcha({ mobile: this.phone, type: 1 })
      this.countdown_time = 100
      console.log('getCaptcha', this.countdown_time)
      this.countdown()
    },
    savePhone () { 
      console.log('formData: ', this.phone, this.captcha)
      let phone = /^((13[0-9])|(14[5|7|9])|(15([0-3]|[5-9]))|(17[0,1,3,5,6,7,8])|(18[0-9]))\d{8}$/

      if (!this.phone || !phone.test(this.phone)) return wx.showModal({ title: '请输入正确的手机号', showCancel: false })
      console.log('save phone:')
    },
    async getPhone (e) {
      let code = wx.getStorageSync('code')
      let o = e.mp.detail
      console.log('getphone : ', o)
      if (o.errMsg === 'getPhoneNumber:ok') {
        let param = {
          code,
          encryptedData: o.encryptedData,
          iv: o.iv
        }

        this.$emit('getParam', param)
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
    countdown () {
      this.interval = setInterval(() => {
        console.log('time :', this.countdown_time)
        if (this.countdown_time-- <= 0) clearInterval(this.interval)
      }, 1000)
    }
  },

  created () {
    console.log('-- Phone component created --')
  }

}
</script>

<style scoped>
.center{
  display: flex;
  align-items: center;
}

.weixin_phone_btn{
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 540rpx;
  height: 88rpx;
  margin: 75rpx auto 0;
  border-radius: 10rpx;
  font-size: 30rpx;
}
.clear_btn{
  padding: 0;
  border: none;
}
.weixin_icon{
  width: 47rpx;
  height: 38rpx;
  margin-right: 20rpx;
}

.phone_btn{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 258rpx;
  margin: 40rpx auto 0;
  font-size: 26rpx;
}
.phone_icon{
  width: 56rpx;
  height: 56rpx;
}

.custom_modal{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
}
.form_wrap{
  width: 690rpx;
  height: 636rpx;
  border-radius: 10rpx;
  background: #fff;
}
.form_title_wrap{
  position: relative;
  text-align: center;
}
.form_title{
  height: 45rpx;
  line-height: 45rpx;
  padding: 30rpx 0 0;
  font-size: 30rpx;
}
.close_btn{
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  width: 24rpx;
  height: 24rpx;
  padding: 10rpx;
}
.form_item{
  display: flex;
  align-items: center;
  width: 500rpx;
  height: 50rpx;
  margin: 50rpx auto 0;
  font-size: 30rpx;
  border-bottom: 2rpx solid #e8e7e7;
  text-align: left;
}
.form_input{
  flex-grow: 1;
}
.captcha_btn{
  width: 170rpx;
  height: 50rpx;
}
.submit_btn{
  width: 540rpx;
  height: 88rpx;
  line-height: 88rpx;
  margin: 30rpx auto 0;
  font-size: 30rpx;
  border-radius: 10rpx;
  text-align: center;
}
.form_weixin_btn{
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 310rpx;
  height: 56rpx;
  margin: 40rpx auto 0;
  font-size: 26rpx;
}
.form_weixin_icon{
  width: 56rpx;
  height: 56rpx;
  margin-right: 20rpx;
}
/* .auth_btn{
  width: 200rpx; 
  height: 100rpx; 
  line-height: 100rpx;
  margin: 20rpx auto 0; 
  border-radius: 10rpx; 
  font-size: 30rpx;
  color: #fff; 
  background: #937d8a;
} */

.s-fc-1{ color: #fff; }
.s-fc-2{ color: #222; }
.s-fc-3{ color: #333; }
.s-fc-4{ color: #d5d3d3; }
.s-fc-5{ color: #ff6c72; }
.s-fc-6{ color: #666; }

.s-bg-1{ background: #fff; }
.s-bg-2{ background: #09bb07; }
.s-bg-3{ background: #ff6c72; }
</style>
