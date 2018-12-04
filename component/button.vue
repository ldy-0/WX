<template>
  <div class='btn_wrap'>
    <div class='btn' :style="{ width: config.width || '144rpx', 
                                height: config.height || '44rpx', 
                                lineHeight: config.height || '44rpx' }" v-text='config.title' @click.stop='click'></div> 

    <div class='mask' @touchmove='preventEvent' @click.stop='preventEvent' v-if='isClick && !canClick'>
      <div class='content s-fc-1'>loaging...</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },

  data () {
    return {
      isClick: false,
      canClick: true
    }
  },

  methods: {
    preventEvent () {},
    click (e) {
      this.isClick = true
      console.log('click button-')
      if (!this.canClick) return null
      this.canClick = false
      console.log('click button', e)
      this.$emit('emit', this.change)
    },
    change () { this.canClick = !this.canClick }
  }
}
</script>

<style scoped>
.btn{
  text-align: center;
}

.mask{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, .2)
}
.content{
  z-index: 2;
  font-size: 34rpx;
}

.s-fc-1{ color: #fff; }
</style>
