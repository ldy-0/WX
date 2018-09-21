<template>
  <div class='wrap'>
      <div class='goods_info' :style="{ margin: config && config.margin || '', padding: config && config.padding }">

        <image class='goods_thub' />

        <div class='goods_detail'>
          <div class='goods_name s-fc-1'>{{goods.name}}</div>
          <div class='goods_price s-fc-2'>{{config && config.hidePrice ? '' : goods.price}}</div>
          <div class='goods_number s-fc-3'>
            <span>数量</span>
            <span style='margin-left: 170rpx;'>{{goods.qty}}</span>
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
  background: #ccc;
}
.goods_detail{
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
  margin: 50rpx 0 0;
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
