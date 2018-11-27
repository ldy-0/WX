<template>
  <div class='modal' :class='{ center: config.width }' @touchmove.stop='preventScroll' @click.stop='closeModal'>

      <div class='content s-bg-1' :class='{bottom: !config.width}' :style='{ height: config.height, width: config.width }' @click.stop='preventClose'>

        <div class='title s-fc-2' v-if='config.showTitle'>
          
          <div :style="{ height: config.titleHeight || '45rpx', 
                          lineHeight: config.titleHeight || '45rpx',
                          padding: config.titlePadding || '30rpx 0 0',
                          fontSize: config.titleSize || '30rpx' }" v-text='config.title'></div>

          <img class='close_btn' src='/static/close.png' alt='No Found' @click.stop='closeModal' />

        </div>

        <slot></slot>

      </div>
  
  </div>
</template>

<script>
export default {
  // props: ['text']
  props: {
    config: 'object'
  },

  data () {
    return {
    }
  },

  methods: {
    preventScroll () { return null },
    preventClose () { },
    closeModal () {
      console.log('emit close')
      !this.config.noClose && this.$emit('close')
    }
  }

}
</script>

<style scoped>
.modal{
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .3);
}

.bottom{
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 400rpx;
}

.center{
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  /* left: calc(50% - 200rpx); */
  /* top: calc(50% - 150rpx); */
  /* width: 400rpx; */
  /* height: 300rpx; */
}

.content{
  border-radius: 10rpx;
}

.title{
  position: relative; 
  text-align: center;
}
.close_btn{
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  width: 24rpx;
  height: 24rpx;
  padding: 10rpx;
}

.s-fc-1{ color: #fff; }
.s-fc-2{ color: #222; }

.s-bg-1{ background: #fff; }
</style>
