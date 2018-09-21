<template>
  <div class='topBar' 
      :style='{color: config.color, background: config.bg}'>

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
    }
  },

  methods: {
    goBack () {
      if (this.config.onlyLeft) {
        return undefined
      }
      wx.navigateBack({ detail: 1 })
    },
    getBg () {
      console.log(this.config)
    }
  }
}
</script>

<style>
.topBar{
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 200rpx;
  padding: 0 20rpx;
  overflow: hidden;
}

.left, .right{
  width: 200rpx;
}

.left{
  display: flex;
  align-items: center;
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
