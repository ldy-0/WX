<template>
    <div class='end_bar s-fc-2'>

          <div class='line s-bg-2'></div>

          <div class='end_desc'>{{config.content}}</div>

          <div class='line s-bg-2'></div>
    </div>
</template>

<script>
export default {
  // props: ['text']
  props: {
    config: {
      type: Object,
      default: function () {
        return {
          content: '我是有底线的'
        }
      }
    }
  }

}
</script>

<style>

.end_bar{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 70rpx 0;
}

.end_desc{
  margin: 0 30rpx;
  font-size: 28rpx;
  text-align: center;
  letter-spacing: 4rpx;
  /* position: relative;
  width: 660rpx; */
}

/* .end_desc:before, .end_desc:after{
  content: '';
  position: absolute;
  top: calc(50% - 2rpx);
  width: 210rpx;
  height: 4rpx;
  background: #dedede;
}
.end_desc:before{
  left: 0;
}
.end_desc:after{
  right: 0;
} */

.line{
  width: 210rpx;
  height: 4rpx;
}

.s-fc-2{
  color: #dedede; 
}

.s-bg-2{
  background: #dedede; 
}
</style>
