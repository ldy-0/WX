<template>
  <div class="container">

    <topBar :config='config'></topBar>

    <div class='wrap'>

      <div class='title s-fc-3'>半包材料展示</div>
      <div class='' v-for='(item, index) in info' :key='index'>
        <div class='content s-fc-2'>{{item.content}}</div>
        <image class='info_img' :src='item.img' mode='aspectFill' />
      </div> 
      

      <div class="">
        <div class='form_title s-fc-5'>
          <div style='font-size: 36rpx;'>我要装修</div>
          <div style='font-size: 14rpx;'>DECORATION</div>
        </div>
        <div class='form_item s-fc-8'>
          <div class='form_key'><div>姓</div><div>名</div></div>
          <input class='form_value' placeholder="请输入姓名" placeholder-style='margin-left: 20rpx;' @input='setName' />
          <div class='star'>*</div>
        </div>
        <div class='form_item s-fc-8'>
          <div class='form_key'>联系方式</div>
          <input class='form_value' placeholder="请输入手机号" placeholder-style='margin-left: 20rpx;' v-model='form.telephone' />
          <div class='star'>*</div>
        </div>
        <div class='form_item s-fc-8'>
          <div class='form_key'>小区地址</div>
          <input class='form_value' placeholder="请输入小区地址" placeholder-style='margin-left: 20rpx;' v-model='form.address' />
          <div class='star'>*</div>
        </div>
        <div class='form_item s-fc-8'>
          <div class='form_key'><div>面</div><div>积</div></div>
          <input class='form_value' placeholder="请输入房屋面积(只保留二位小数)" placeholder-style='margin-left: 20rpx;' v-model='form.acreage' />
        </div>
        <div class='form_item s-fc-8'>
          <div class='form_key'>意向风格</div>
          <input class='form_value' placeholder="请输入意向风格" placeholder-style='margin-left: 20rpx;' v-model='form.style' />
        </div>
        <div class='textarea_wrap s-fc-8'>
          <div class='form_key'><div>备</div><div>注</div></div>
          <textarea class='textarea' placeholder="请输入备注" placeholder-style='margin-left: 20rpx;' v-model='form.remark'></textarea>
        </div>

        <div class='form_btn s-fc-1' @click='submit'>提交</div>
      </div>
      
    </div>
  </div>
</template>

<script>
import topBar from '@/components/topBar'
import slide from '@/components/slide'
import api from '@/utils/api'
import util from '@/utils/util'

export default {
  data () {
    return {
      userInfo: {},
      config: {
        title: '半包定制',
        color: '#222',
        bg: '#fff',
        backImg: '/static/left_arrow.png'
      },
      slideConfig: {
        height: '750rpx',
        autoplay: false,
        data: [
          { img: '/static/toolBar/classify.png' },
          { img: '/static/toolBar/home.png' }
        ]
      },
      info: [],
      form: {},
      date: ''
    }
  },

  components: {
    topBar,
    slide
  },

  methods: {
    setName (e) {
      let v = e.mp.detail.value

      if (v.length > 15) {
        wx.showModal({ content: '姓名不能超过15个字符!', showCancel: false })
        return this.form.name
      }
      this.form.name = v
      console.log(v)
    },
    submit () {
      if (!this.form.name || this.form.name === '') {
        return wx.showModal({ content: '姓名不能为空!', showCancel: false })
      }

      if (!util.isPhone(this.form.telephone)) {
        return wx.showModal({ content: '手机格式不正确!', showCancel: false })
      }

      if (this.form.address === '') {
        return wx.showModal({ content: '地址不能为空!', showCancel: false })
      }

      if (this.form.acreage && isNaN(Number(this.form.acreage))) {
        return wx.showModal({ content: '面积必须为数字', showCancel: false })
      }
      this.form.acreage = Number(this.form.acreage).toFixed(2)
      console.log('form --', this.form)
      this.submitCustomMode()
    },
    async submitCustomMode () {
      let res = await api.setCustommadeinfo(this.form)

      res === null && wx.showModal({ content: '提交成功!', showCancel: false })
    },
    async getCustomMode () {
      let res = await api.getCustommadeinfo()

      this.info = res
      console.log(this.info)
      wx.hideLoading()
    }
  },

  created () {
    console.log('banbao create')
  },

  onLoad (params) {
    wx.showLoading({ title: 'Loading...' })

    this.form = {}

    this.getCustomMode()
  },

  onPullDownRefresh () {
    wx.reLaunch({
      url: '/pages/banbao/main'
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
  font: 28rpx 'PingFang-SC-Medium'; 
  color: #000;
  background: #fff;
}

.title{
  padding: 36rpx 40rpx;
  font-size: 34rpx;
  font-weight: bold;
}
.content{
  padding: 0 40rpx;
  font-size: 30rpx;
}
.info_img{
  display: block;
  width: 690rpx;
  height: 350rpx;
  margin: 25rpx auto 0;
  background: #ccc;
}

.form_title{
  margin: 80rpx auto 60rpx;
  text-align: center;
}
.form_item{
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 666rpx;
  height: 76rpx;
  margin: 0 auto 30rpx;
}
.form_key{
  width: 112rpx;
  display: flex;
  justify-content: space-between;
  /* white-space: pre; */
}
.form_value{
  width: 530rpx;
  height: 100%;
  border: 1rpx solid #c9c8d0; 
  border-radius: 5rpx;
}
.textarea_wrap{
  display: flex;
  justify-content: space-between;
  width: 666rpx;
  height: 150rpx;
  margin: 0 auto 30rpx;
}
.textarea{
  box-sizing: border-box;
  width: 530rpx;
  height: 150rpx;
  padding: 20rpx;
  border: 1rpx solid #c9c8d0; 
  border-radius: 5rpx;
}
.form_btn{
  width: 600rpx;
  height: 88rpx;
  line-height: 88rpx;
  margin: 20rpx auto;
  border-radius: 10rpx;
  background: #786578;
  text-align: center;
}
.star{
  position: absolute;
  right: 20rpx;
  color: #ff0000;
}

.save_btn{
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  border-radius: 0;
  font-size: 36rpx;
  background: #786578;
  text-align: center;
}

.right_arrow{
  width: 16rpx;
  height: 26rpx;
  background: #ccc;
}


.default{
  font-size: 22rpx;
}
.inline{
  margin-left: 40rpx;
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
