<template>
  <div class="container" :class='{ios_wrap: isIos}'>

    <slot></slot>

  </div>
</template>

<script>
export default {
  props: [''],

  data: {
    isIos: false
  },

  created () {
    let system = wx.getSystemInfoSync()
    console.log('system', system)
    if (/iOS/.test(system.system)) this.isIos = true
  }
}
</script>

<style scoped>
.ios_wrap{
  margin: 180rpx 0 0;
}
</style>
