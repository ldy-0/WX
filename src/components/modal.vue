<template>
  <div class='modal' :class='{ center: config.width }' @touchmove.stop='preventScroll' @click='closeModal'>

      <div class='content s-bg-1' :class='{bottom: !config.width}' :style='{ height: config.height, width: config.width }'>
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
    closeModal () {
      console.log('emit click')
      !this.config.noClose && this.$emit('click')
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

.s-bg-1{
  background: #fff;
}
</style>
