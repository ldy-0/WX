<template>
    <div class='detail_wrap'>

        <div :style="{ height: config.height || '88rpx',
                        lineHeight: config.height || '88rpx',
                        fontSize: config.titleSize || '30rpx',
                        color: config.titleColor || '#636363',
                        textAlign: config.titleAlign || 'center' }">商品详情</div>

        <div v-for='(item, index) in data' :key='index'>
          <div style='margin-bottom: 30rpx;' :style="{ color: config.color || '#222', fontSize: config.size || '28rpx' }">{{item.content}}</div>
          <image class='detail_img' :src='item.img' mode='aspectFill' @click='preview(item.img, goods.goods_body)' />
        </div>

        <div :style="{ height: config.intervalHeight || '110rpx' }"></div>
    </div>
</template>

<script>
export default {
  // props: ['text']
  props: {
    config: {
      type: Object,
      default: function () {
        return {
        }
      }
    },
    data: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },

  methods: {
    preview (img, imgs) {
      console.log('--preview-')
      wx.previewImage({
        current: img,
        urls: imgs.map(v => v.img || v),
        fail: e => console.log('goodsDetail preview fail :', e)
      })
    }
  }

}
</script>

<style>
.detail_wrap{
  margin: 20rpx 0 0;
  padding: 0 20rpx;
  background: #fff;
}
.detail_img{
  width: 100%;
  height: 500rpx;
  background: #ccc;
}

.s-fc-2{ color: #dedede; }

.s-bg-2{ background: #dedede; }
</style>
