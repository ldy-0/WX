<template>
    <view class='number_wrap'>

      <swiper class="swiper" 
            style='height: {{config.height || 476}}rpx;'
            indicator-active-color="{{config.indicatorActiveColor}}"  
            indicator-dots="{{config.indicatorDots}}"
            autoplay="{{config.autoplay || true}}" 
            interval="{{config.interval || 3000}}" 
            duration="{{config.duration || 1000}}"  
            circular="{{config.circular === undefined || config.circular}}">

        <block wx:for="{{config.urls}}" wx:key='key'>
          <swiper-item>

            <image src="{{item}}" 
                   class="slide_img" 
                   @tap="click({{item}})" 
                   mode='aspectFill'/>

          </swiper-item>
        </block>
      </swiper>
      
    </view>
</template>
<script>
import wepy from 'wepy';

export default class Swiper extends wepy.component {
  props = {
    config: {
      type: Object,
      default: {}
    },
  }

  components = {
  }

  data = {

  }

  onLoad() {

  }

  methods = {
    click(item){
      this.$emit('click', item);
      console.log('emit click event');
    },  
  }
  
}

</script>
<style lang="css" scoped>

.swiper_item{
    display: flex;
    align-items: center;
}

.slide_img{
  width: 100%;
  height: 100%;
}
</style>
