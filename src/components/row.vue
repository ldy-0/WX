<template>
  <div class='m-row' :style="{ height: config.height || '100rpx;', padding: config.padding || '0 20rpx;'}">

    <div class='m-row-flex'>
      <image class='m-row-icon' :style="{ width: config.leftWidth, height: config.leftHeight }" :src='leftImg || config.leftImg' v-if='leftImg || config.leftImg' />
      <div v-text='leftTitle || config.leftTitle'></div>
    </div>
    
    <div class='m-row-flex'>
      <div v-text='rightTitle || config.rightTitle'></div>
      <image :style="{ width: config.rightWidth, height: config.rightHeight }" :src='config.rightImg' v-if='rightImg || config.rightImg' />
    </div>
  
  </div>
</template>

<script>
export default {
  // props: ['text']
  props: {
    config: 'object',
    leftImg: 'string',
    leftTitle: 'string',
    rightTitle: 'string'
  }

}
</script>

<style>

.m-row{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.m-row-flex{
  display: flex;
  align-items: center;
}

.m-row-icon{
  width: 70rpx;
  height: 70rpx;
  margin-right: 20rpx;
  border-radius: 10rpx;
}

.m-row-title{
  font-size: 28rpx;
}
</style>
