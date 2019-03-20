<template>
  <view class='tab_bar_wrap'>

    <image class='tab_bar_bg' src="{{isAdviser ? adviserBarURL : customerBarURL}}" />

    <view class='tab_bar s_fc_4'>
      <repeat for='{{list}}'>

        <button open-type='{{item.type}}' class='tab_item clear' plain='true' @tap='switchTab({{index}})' wx:if="{{item.type}}">
          <image class='i_tab' src='{{item.url}}' mode='aspectFill' />
          <view>{{item.title}}</view>
        </button>
        <view class="tab_item {{checkIndex === index ? 's_fc_1' : ''}}" @tap='switchTab({{index}})' wx:else>
          <!-- <image class='i_tab' src='{{checkIndex === index ? item.sel : item.url}}' mode='aspectFill' /> -->
          <view>{{item.title}}</view>
        </view>

      </repeat>
    </view>

  </view>
    <!-- <view class="empty-placeholder row-center" wx:if="{{show}}">
        <image class="icon-xl" src="../images/c1@2x.png" />
        <view class="txt">{{message}}</view>
    </view> -->
</template>
<script>
import wepy from "wepy";
export default class Placeholder extends wepy.component {
  props = {
    list: {
      type: Array,
      default: [] 
    },
  };

  data = {
    checkIndex: null,
    adviserBarURL: '/images/global/adviserBar.png',
    customerBarURL: '/images/global/customerBar.png',
  }

  computed = {
    isAdviser(){ return this.list && this.list.length === 3 },
  }

  watch = {
    list(v1, v2){
      this.checkIndex = this.$parent.$parent.globalData.tabIndex;
      this.$apply();
    }
  }

  methods = {
    switchTab(index){
      let url = this.list[index].path,
          globalData = this.$parent.$parent.globalData;

      // console.error(index, globalData.tabIndex);
      if(globalData.tabIndex === index) return ;

      globalData.tabIndex = index;

      // console.error(url);
      if(url){
        this.navigateTo(url);
        // wx.redirectTo({ url });
      }
      // console.error(index, this.list[index]);
    }
  }

  navigateTo(url){
    let length = getCurrentPages().length;
    length === 9 ? wx.reLaunch({ url }) : wx.navigateTo({ url });
  }
}
</script>
<style scoped>
.tab_bar_wrap{
  position: fixed;
  left: 30rpx;
  right: 30rpx;
  bottom: 0;
  height: 88rpx;
}
.tab_bar_bg{
  width: 100%;
  height: 100%;
}

.tab_bar{
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
  width: 100%;
  height: 88rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.tab_item{
  font-size: 30rpx;
  padding: 20rpx 40rpx;
  font-weight: bold;
  text-align: center;
}

.i_tab{
  width: 50rpx;
  height: 40rpx;
}

.z_sel{
}

.clear{
  line-height: 1.2;
  margin: 0;
  padding: 0;
  border: none;
}

.s_fc_1{ color: #fff; }
.s_fc_2{ color: #2e2d2d; }
.s_fc_3{ color: #1da839; }
.s_fc_4{ color: #5a2f08; }

.s_bg_1{ background: #fff; }
</style>
