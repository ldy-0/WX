<template>
  <div class="container">

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

      <div class='star'>
        <div class='s-fc-4' style='margin: 0 30rpx;'>评分</div>
        <image class='star_icon' :src="level < index + 1 ? '/static/star.png' : '/static/star_sel.png' " v-for='(item, index) in levelList' :key='index' @click='changeLevel(index + 1)' />
      </div>

      <div class='textarea_wrap'>
        <textarea class='textarea' placeholder="请输入评论..." v-model="content"></textarea>
        <div class='box' @click='addImg'>
          <image style='width: 54rpx; height: 60rpx; margin: 20rpx 0 0;' src='/static/goods/icon_1_xiangji@2x.png' />
          <div>添加图片</div>
        </div>
      </div>

      <div class='btn s-fc-1' @click='submit'>提交</div>
      

    </div>

  </div>
</template>

<script>
import topBar from '@/components/topBar'
import slide from '@/components/slide'
import goods from '@/components/goods'
import { uploadSeriesFile } from '@/utils/tencent-cos'
import api from '@/utils/api'

export default {
  data () {
    return {
      config: {
        title: '评价',
        color: '#222',
        bg: '#fff',
        backImg: '/static/left_arrow.png'
      },
      goodsConfig: {
        padding: '20rpx 0 0',
        hidePrice: true
      },
      order: {},
      classList: [
        { title: '全部' },
        { title: '待退款' },
        { title: '已完成' }
      ],
      currentClass: '全部',
      level: 0,
      levelList: [0, 0, 0, 0, 0],
      content: '',
      imgs: [],
      canSubmit: true,
      referer: ''
    }
  },

  components: {
    topBar,
    slide,
    goods
  },

  methods: {
    changeLevel (index) {
      console.log(index)
      this.level = index
    },
    async addImg () {
      if (!this.canSubmit) return
      this.canSubmit = false

      let res = await this.getImg()
      console.log('img --', res)

      let imgs = await uploadSeriesFile(res)
      this.imgs = this.imgs.concat(imgs)
      console.log('img url --', imgs, this.imgs)
      this.canSubmit = true
    },
    getImg () {
      return new Promise(function (resolve, reject) {
        wx.chooseImage({
          count: 8,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success (res) {
            resolve(res.tempFilePaths)
          },
          fail (e) { resolve(e) }
        })
      })
    },
    async submit () {
      if (!this.canSubmit) {
        return
      }

      if (this.content === '') {
        return wx.showModal({ title: '请输入评论信息', showCancel: false })
      }

      let param = {
        goods_id: this.order.order_goods[0].goods_id,
        order_id: this.order.order_id,
        order_no: this.order.order_sn,
        score: this.level,
        content: this.content,
        goods_image: this.imgs
      }
      console.log('param --', param)
      let res = await api.assess(param)

      if (res.geval_id) {
        // wx.redirectTo({ url: `${this.referer.url}?${this.referer.param}` })
        wx.navigateBack({ detail: 1 })
      }
    }
  },

  created () {

  },

  onLoad (param) {
    this.order = JSON.parse(decodeURIComponent(param.order))
    this.referer = JSON.parse(decodeURIComponent(param.referer))
    this.imgs = []
    this.content = ''
    this.level = 0
    this.canSubmit = true

    console.log(this.referer, this.order)
  },

  onPullDownRefresh () {
    wx.reLaunch({
      url: '/pages/index/main'
    })
  }

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

.btn{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 94rpx;
  line-height: 94rpx;
  background: #786578; 
  text-align: center;
}

.s-fc-1{
  color: #fff;
}
.s-fc-2{
  color: #888;
}
.s-fc-3{ 
  color:#666; /* tab_item */
}
.s-fc-4{ 
  color: #222;
}
.s-fc-5{
  color: #ff4444; 
}
.s-fc-6{
  color: #333;
}
</style>
