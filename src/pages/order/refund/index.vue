<template>
  <div class="container" :class='{ ios: isIos }'>

    <topBar :config='config'></topBar>

    <div class='wrap'>

      <!-- <div class='goods'>
        <image class='goods_thub' src='' />
        <div class='goods_detail'>
          <div class='goods_name s-fc-6'>sdkfjsdfoPksdfksodf考的排放口双方的山坡v可是东方十六分v【判断是非判断是否sdfsdfsdkf</div>
          <div class='goods_price s-fc-5'>8345.2934</div>
        </div>
      </div> -->
      <goods :goods='order.order_goods[0]'></goods>

      <div class='row s-bg-1' style='justify-content: space-between;' @click='showModal'>
        <div>退款原因</div>
        <div style='display: flex; align-items: center;'>
          <div class=''>{{reason === '' ? '请选择' : reason}}</div>
          <image style='width: 15rpx; height: 25rpx; margin-left: 10rpx;' src='/static/my/right_arrow.png' />
        </div>
      </div>

      <div class='row s-bg-1'>退款金额<span class='s-fc-5' style='margin-left: 30rpx;'>{{order.order_amount}}</span></div>
      
      <div class='row s-bg-1'>
        <div style='width: 140rpx;'>备注</div>
        <input class='input' placeholder='选填' @input='setRemark' />
      </div>

      <div class='btn s-fc-1' @click='submit'>提交</div>

      <div class='modal' v-if='isShow' @click='hideModal'>
        <div class='content' @touchmove.stop='preventScorll'>
          <div class='row s-bg-1' style='justify-content: center;'>退款原因</div>
          <div class='row s-bg-1' style='margin: 0;' v-for='(item, index) in classList' :key='index' @click='check(item)'>{{item.title}}</div>
        </div>
      </div>
      

    </div>

  </div>
</template>

<script>
import topBar from '@/components/topBar'
import slide from '@/components/slide'
import goods from '@/components/goods'
import modal from '@/components/modal'
import api from '@/utils/api'

export default {
  data () {
    return {
      userInfo: {},
      config: {
        title: '退款申请',
        color: '#222',
        bg: '#fff',
        backImg: '/static/left_arrow.png'
      },
      goodsConfig: {
        padding: '20rpx 0 0',
        hidePrice: true
      },
      modalConfig: {
        height: '620rpx',
        isShow: false
      },
      isShow: false,
      classList: [
        { title: '货物缺损' },
        { title: '商品与描述不符' },
        { title: '卖家发错货' },
        { title: '质量问题' },
        { title: '假冒品牌' },
        { title: '其他' }
      ],
      order: {},
      reason: '',
      remake: ''
    }
  },

  components: {
    topBar,
    slide,
    goods,
    customModal: modal
  },

  computed: {
    isIos () { return wx.getStorageSync('isIos') }
  },

  methods: {
    showModal () { this.isShow = true },
    hideModal () { this.isShow = false },
    check (item) {
      this.reason = item.title
    },
    setRemark (e) { console.log('remark', e.mp.detail.value); this.remark = e.mp.detail.value },
    async submit () {
      if (this.reason === '') {
        return wx.showModal({ title: '请选择退款原因!', showCancel: false })
      }

      let param = {
        order_id: this.order.order_id,
        refund_type: 1,
        reason_info: this.reason,
        buyer_message: this.remake
      }
      console.log('param --', param)
      let res = await api.setRefund(param)

      res === null ? wx.showToast({ title: '退款成功', duration: 2000 }) : wx.showToast({ title: '退款失败', icon: 'none', duration: 2000 })
    }
  },

  created () {

  },

  onLoad (param) {
    this.order = JSON.parse(decodeURIComponent(param.order))
    console.log(this.order, this.order.order_amount)
  }

  // onPullDownRefresh () {
  //   wx.reLaunch({
  //     url: '/pages/index/main'
  //   })
  // }

}
</script>

<style scoped>

.wrap{
  width: 100%;
  height: 100%;
  font: 28rpx 'PingFang-SC-Medium';
  background: #f5f5f5;
}

.goods{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 182rpx;
  padding: 0 30rpx;
  background: #fff;
}
.goods_thub{
  flex-shrink: 0;
  width: 121rpx;
  height: 121rpx;
  background: #ccc;
}
.goods_detail{
  margin-left: 25rpx;
  overflow: hidden;
}
.goods_name{
  margin-bottom: 50rpx;
  text-overflow: ellipsis;
  overflow: hidden; 
  white-space: nowrap;
}

.star{
  display: flex;
  height: 100rpx;
  background: #fff;
}
.star_icon{
  width: 36rpx;
  height: 36rpx;
}

.textarea_wrap{
  position: relative;
  height: 500rpx;
  background: #fff;
}
.textarea{
  padding: 30rpx 0 0 30rpx;
}
.box{
  position: absolute;
  left: 30rpx;
  bottom: 30rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 162rpx;
  height: 162rpx;
  border: 1rpx dashed #d9d9d9;
  border-radius: 3rpx;
}

.row{
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  height: 88rpx;
  margin: 20rpx 0 0;
  padding: 0 30rpx;
}

.input{
  flex-grow: 1;
}

.btn{
  position: fixed;
  bottom: 0;
  z-index: 3;
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  background: #786578; 
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
  bottom: 88rpx;
  width: 100%;
  height: 620rpx;
  border-radius: 10rpx;
  background: #fff;
}

.s-fc-1{
  color: #fff;
}
.s-fc-2{
  color: #888;
}
.s-fc-3{ 
  color:#636363; /* tab_item */
}
.s-fc-4{ 
  color: #222;
}
.s-fc-5{
  color: #af0000; 
}
.s-fc-6{
  color: #333;
}
.s-bg-1{
  background: #fff;
}
</style>
