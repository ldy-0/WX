<template>
  <view class='m_classify_wrap s_bg_1 s_fc_3'>

    <view class='' wx:if='{{canPull}}'>
      <scroll-view scroll-x class='m_classify'>
        <repeat for='{{list}}'>

          <view class="m_classify_item {{checkIndex === index ? 'z_sel s_fc_2' : ''}}" @tap='check({{index}})'>{{item.name || item.title}}</view>

        </repeat>
      </scroll-view>

      <view class='pull_down' @tap='pullDown'>
        <image class='i_arrow' src='../images/' mode='aspectFill' />
      </view>
    </view>

    <view class='' wx:else>
      <view class='m_open between'>
        <view>全部导航</view>
        <image class='i_arrow' src='' mode='aspectFill' @tap='close' />
      </view>

      <view class=''>
        <repeat for='{{formatList}}' item='row' index='i'>

          <view class="m_open_row flex">
            <repeat for='{{row}}'>

              <view class="m_open_item seller_item s_fc_1 s_bg_2 {{formatList.length === i + 1 ? 'bottom' : ''}} {{index === 0 ? 'left' : ''}}" 
                    @tap='check(-1)' 
                    wx:if='{{formatList.length - 1 === i && row.length - 1 === index}}'>
                <image class='i_seller' mode='aspectFill' />
                <view>{{item.name}}</view>
              </view>
              <view class="m_open_item {{formatList.length === i + 1 ? 'bottom' : ''}} {{index === 0 ? 'left' : ''}} {{checkIndex === (i * 4 + index) ? 'z_sel s_fc_2' : ''}}" 
                    @tap='check({{index}})'
                    wx:else>{{item.name || item.title}}</view>

            </repeat>
          </view>

        </repeat>

        

      </view>
    </view>

  </view>
</template>
<script>
import wepy from "wepy";

export default class classify extends wepy.component {
  props = {
    list: {
      type: Array,
      default: [] 
    },
  };

  data = {
    checkIndex: 0,
    formatList: [],
    canPull: true,
  }

  watch = {
    list(v1, v2){
      this.formatList = this.format(v1);
      this.$apply();
    }
  }

  methods = {
    pullDown(){ this.canPull = false; },
    close(){ this.canPull = true; },
    check(index){
      if(index == -1){
        // this.$parent.parent.gobal
        return wx.navigateTo({ url: `/pages/mine` });
      }

      this.checkIndex = index;
    },
        
  }

  format(arr){
    let last,
        new_arr = [],
        seller = { name: '成为商家' };

    arr.forEach((v, i) => { i % 4 === 0 ? new_arr.push([v]) : new_arr[new_arr.length - 1].push(v); });

    last = new_arr[new_arr.length - 1];
    last.length === 4 ? new_arr.push([seller]) : last.push(seller);

    return new_arr;
  }
}
</script>
<style scoped>
.m_classify_wrap{
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 0 30rpx;
  font-size: 28rpx;
}
.m_classify, .m_open{
  width: 100%;
  height: 72rpx;
  white-space: nowrap;
}
.m_classify_item{
  display: inline-block;
  margin: 20rpx 40rpx 0 0;
  font-size: 26rpx;
}

.pull_down{
  position: absolute;
  top: 20rpx;
  right: 40rpx;
}
.i_arrow{
  width: 30rpx;
  height: 16rpx;
  background: #ccc;
}

.m_open_row{
  border-top: 2rpx solid #959595;
}
.m_open_item{
  flex: 0 0 auto;
  width: 170rpx;
  height: 80rpx;
  line-height: 80rpx;
  border-right: 1rpx solid #959595;
  text-align: center;
  overflow: hidden;
}
.bottom{
  border-bottom: 2rpx solid #959595;
}
.left{
  border-left: 2rpx solid #959595;
}
.seller_item{
  line-height: 1.2;
  border: 2rpx solid #1da839;
}
.i_seller{
  width: 35rpx;
  height: 33rpx;
  margin: 8rpx 0 0;
  background: #ccc;
}

.flex{
  display: flex;
}
.between{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.z_sel{
  font-size: 28rpx;
}

.s_fc_1{ color: #fff; }
.s_fc_2{ color: #7fc237; }
.s_fc_3{ color: #666; }

.s_bg_1{ background: #fff; }
.s_bg_2{ background: #1da839; }
</style>