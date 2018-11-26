<template>
    <div class='item s-bg-1'
         :style="{ width: config.width,
                    height: config.height }" @click='goGoodsDetail(item)'>

      <image class='item_img custom_item_img s-bg-3' :src='item.goods_image' mode='aspectFill' />

      <div class='item_content'>
        <div class='item_name s-fc-4' v-text='item.goods_name'></div>
        <div class='item_price s-fc-5' v-if='!config.hidePrice'>￥{{item.goods_price}}</div>
      </div>

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
          width: '345rpx',
          height: '480rpx'
        }
      }
    },
    item: {
      type: Object,
      default: function () { return {} }
    }
  },

  methods: {
    goGoodsDetail (item) {
      console.log('goodsDetail : ', item)
      wx.navigateTo({ url: `/pages/goods/main?id=${item.id}` })
    }
  }

}
</script>

<style>
.item{
  border-radius: 10rpx;
}
.item_img{
  width: 100%;
  height: 350rpx;
  border-radius: 10rpx 10rpx 0 0;
}
.item_content{
  padding: 0 20rpx;
}
.item_name{
  width: 100%;
  height: 28rpx;
  line-height: 1;
  margin: 10rpx 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item_price{
  margin: 20rpx 0 0;
}

/* .end_desc:before, .end_desc:after{
  content: '';
  position: absolute;
  top: calc(50% - 2rpx);
  width: 210rpx;
  height: 4rpx;
  background: #dedede;
}
.end_desc:before{
  left: 0;
}
.end_desc:after{
  right: 0;
} */

.s-fc-1{ color: #fff; }
.s-fc-2{ color: #999; }
.s-fc-3{ color: #333; }
.s-fc-4{ color: #666; }
.s-fc-5{ color: #ff4444; }

.s-bg-1{ background: #fff; }
.s-bg-2{ background: #f5f5f5; }
.s-bg-3{ background: gray; }
</style>
