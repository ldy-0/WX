<template>
  <div v-if='config.isShow'>

    <customModal :config='modalConfig' @touchmove.stop='preventScorll' @click='closeModal'>
      <button class='btn' open-type='getPhoneNumber' @getphonenumber='getPhone' plain='true'>
          <div style='margin: 60rpx;'>获取手机号</div>
          <div class='auth_btn' :style='{ color: config.color, background: config.bg }'>确认授权</div>
      </button>
    </customModal>
    
  </div>
</template>

<script>
import modal from '@/components/modal'

export default {
  // props: ['text']
  props: {
    config: 'Object',
    isShow: 'boolean'
  },

  components: {
    customModal: modal
  },

  data () {
    return {
      modalConfig: {
        width: '600rpx',
        height: '400rpx',
        noClose: true
      }
    }
  },

  methods: {
    preventScorll () {},
    closeModal () {
      this.config.isShow = false
    },
    async getPhone (e) {
      let code = wx.getStorageSync('code')
      let o = e.mp.detail

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
    }

  }

}
</script>

<style scoped>
.center{
  display: flex;
  align-items: center;
}

.btn{
  box-sizing: border-box;
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
</style>
