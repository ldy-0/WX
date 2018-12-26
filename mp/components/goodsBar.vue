<template>
    <div class='bottom_bar'>

        <div class='left'>
          <button class='type_btn' style='border: none;' :open-type='item.type' v-for='(item, index) in data' :key='index' plain='true' @click='go(item)'>
            <image class='bottom_icon' :src='item.img' />
            <div class='red_circle s-fc-1' v-if="item.title === '购物车'">{{config.number > 99 ? '99+' : config.number}}</div>
            <div style='font-size: 20rpx;'>{{item.title}}</div>
          </button>
        </div>

        <div class='bottom_btn'>
          <div :style="{ color: config.cartColor, background: config.cartBg }" @click="showModal" v-text='config.cartTitle'></div>
        </div>

        <div class='bottom_btn'>
          <div :style="{ color: config.color, background: config.bg }" @click='showModal' v-text='config.title'></div>
        </div>

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
        }
      }
    },
    data: {
      type: Array,
      default: function () {
        return []
      }
    }
  },

  methods: {
    showModal () {
      this.$emit('select')
    },
    go (item) {
      if (item.title === '首页') wx.reLaunch({ url: '/pages/index/main' })

      if (item.title === '购物车') wx.switchTab({ url: '/pages/shoppingCart/main' })
    }
  }

}
</script>

<style>
.bottom_bar{
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100rpx;
  padding: 0 20rpx;
  background: #fff;
  text-align: center;
}
.type_btn{
  position: relative;
  line-height: 1.2;
  padding: 0;
  border: none;
  overflow: visible;
}
.left{
  flex-grow: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
}
.bottom_icon{
  width: 45rpx;
  height: 45rpx;
}
.bottom_btn{
  width: 210rpx;
}
.bottom_btn div{
  width: 200rpx;
  height: 76rpx;
  line-height: 76rpx;
  border-radius: 10rpx;
  font-size: 30rpx;
  text-align: center;
}
.appoinment_btn{
  width: 560rpx;
  height: 76rpx;
  line-height: 76rpx;
  border-radius: 10rpx;
  font-size: 30rpx;
  text-align: center;
}

.red_circle{
  position: absolute;
  top: -5rpx;
  right: -5rpx;
  width: 34rpx;
  height: 34rpx;
  line-height: 34rpx;
  border-radius: 16rpx;
  font-size: 20rpx;
  text-align: center;
  background: red;
}

.s-fc-1{ color: #fff; }
.s-fc-2{ color: #dedede; }

.s-bg-2{
  background: #dedede; 
}
</style>
