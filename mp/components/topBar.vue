<template>
  <div class='topBar' 
      :style="{height: config.height, paddingTop: isIos && '66rpx', color: config.color, background: config.bg}">

    <div class='left' @click='goBack'>
      <image class='back' :src='config.backImg' alt='no found' v-if='config.backImg' />
      <div>{{config.onlyLeft ? config.title : config.leftTitle}}</div>
    </div>

    <div class='center' @click='getBg'>{{config.onlyLeft ? '' : config.title}}</div>

    <div class='right'>{{config.rightTitle}}</div>

  </div>
</template>

<script>
export default {
  // props: ['text', 'config'],
  props: {
    title: String,
    config: Object
  },

  data () {
    return {
      isIos: false
    }
  },

  methods: {
    goBack () {
      if (this.config.onlyLeft) {
        return undefined
      }
      wx && wx.navigateBack({ detail: 1 })
    },
    getBg () {
      console.log(this.config)
    }
  },

  created () {
    let system = wx.getSystemInfoSync()
    console.log('system', system)
    if (/iOS/.test(system.system)) this.isIos = true
  }
}
</script>

<style>
.topBar{
  /* box-sizing: border-box; */
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 40rpx);
  height: 130rpx;
  padding: 0 20rpx;
  overflow: hidden;
}

.left, .right{
  width: 200rpx;
}

.left{
  display: flex;
  align-items: center;
  padding: 30rpx 0; /* 兼容iphoneX点击 */
}

.back{
  width: 20rpx;
  height: 40rpx; 
  margin-right: 20rpx;
}

.right{
  text-align: right;
}

.center{
  font-weight: bold;
}
</style>
