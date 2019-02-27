<template>
    <view class='tab_bar s_bg_1 s_fc_2'>
      <repeat for='{{list}}'>

        <button open-type='{{item.type}}' class='tab_item clear' plain='true' @tap='switchTab({{index}})' wx:if="{{item.type}}">
          <image class='i_tab' src='{{item.url}}' mode='aspectFill' />
          <view>{{item.title}}</view>
        </button>
        <view class="tab_item {{checkIndex === index ? 's_fc_3' : ''}}" @tap='switchTab({{index}})' wx:else>
          <image class='i_tab' src='{{checkIndex === index ? item.sel : item.url}}' mode='aspectFill' />
          <view>{{item.title}}</view>
        </view>

      </repeat>
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
  }

  watch = {
    list(v1, v2){
      this.checkIndex = this.$parent.$parent.globalData.tabIndex;
      this.$apply();
    }
  }

  methods = {
    switchTab(index){
      let url = this.list[index].path;

      this.$parent.$parent.globalData.tabIndex = index;

      if(url) wx.redirectTo({ url });
      // console.error(index, this.list[index]);
    }
  }
}
</script>
<style scoped>
.tab_bar{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 88rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.tab_item{
  font-size: 20rpx;
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

.s_bg_1{ background: #fff; }
</style>
