<template>
  <div class='wrap'>
      <div class='goods_info' :style="{ margin: config && config.margin || '', padding: config && config.padding || '20rpx 20rpx 0' }">

        <image class='goods_thub' :src='config && config.imgKey ? goods[config.imgKey] : goods.goods_image' />

        <div class='goods_detail'>
          <div class='goods_name s-fc-1'>{{goods.sku && goods.sku.goods_name || goods.goods_name}}</div>
          <div class='goods_price s-fc-2' :style="{ margin: config && config.priceMargin || '30rpx 0 0' }">¥{{config && config.hidePrice ? '' : goods.sku && goods.sku.goods_price || goods.goods_price}}</div>
          <div class='goods_number s-fc-3' :style='{ justifyContent: config && config.numberAlign }'>
            <span>数量</span><span :style='{ margin: config && config.numberMargin }'>x {{goods.goods_num}}</span>
          </div>
        </div>

      </div>

  </div>
</template>

<script>
export default {
  // config.margin
  props: {
    goods: 'object',
    config: 'object'
  }
}
</script>

<style scoped>
.wrap{
  font: 28rpx 'PingFang-SC-Medium'; 
}
.goods_info{
  display: flex;
  align-items: center;
  height: 230rpx;
  padding: 20rpx 20rpx 0;
  background: #fff;
}
.goods_thub{
  flex-shrink: 0;
  width: 180rpx;
  height: 180rpx;
  /* background: gray; */
}
.goods_detail{
  flex-grow: 1;
  margin-left: 20rpx;
  overflow: hidden;
}
.goods_name{
  font-size: 32rpx;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.goods_price{
  height: 40rpx;
  font-size: 37rpx;
}
.goods_number{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20rpx 0 0;
  font-size: 24rpx;
}

.s-fc-1{
  color: #333; 
}
.s-fc-2{
  color: #ff4444; 
}
.s-fc-3{
  color: #888;
}
</style>
