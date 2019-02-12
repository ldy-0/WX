<template>

      <swiper class="slide" 
              :style='{ height: config.height || "476rpx", }'
              :indicator-active-color="config.activeColor || '#fff'" 
              :autoplay="config.autoplay === undefined || 'true'"
              :indicator-dots="config.showDot || true"
              :circular="config.circular || false">
            <!-- interval="{{config.interval === undefined ? 3000 : config.interval }}"  -->
            <!-- duration="{{config.duration === undefined ? 1000 : config.duration }}"   -->

        <block>
          <swiper-item v-for="(item, index) in config.data" :key='index'>

            <image :src="item.img" 
                   class="slider_img" 
                   @click="click(item, config.data)" 
                   mode='aspectFill' />

          </swiper-item>
        </block>
      </swiper>
    
</template>
<script>

export default {
  props: {
    config: Object
  },

  components: {
  },

  data: {
  },

  onLoad () {

  },

  methods: {
    click (item, data) {
      this.$emit('go', item, data)
      console.log('emit click event', this.config)
    }
  }
}
</script>
<style lang="css" scoped>

.slide{
  width: 100%;
}

.slider_img{
    width: 100%;
    height: 100%;
}
</style>
