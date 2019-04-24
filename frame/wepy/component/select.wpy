<style scoped>
.m_select_wrap{
  position: relative;
  height: 100%;
  padding: 0 20rpx;
  border: 2rpx solid #e5e5e5;
  border-radius: 10rpx;
}
.select_wrap{
  height: 100%;
}
.select_title{
  width: 500rpx;
  white-space: nowrap;
  overflow: hidden;
}
.i_arrow{
  width: 20rpx;
  height: 11rpx;
}

.select_list_wrap{
  position: absolute;
  top: 100%;
  left: -2rpx;
  z-index: 1;
  width: 100%;
  border: 2rpx solid #e5e5e5;
}
.select_item{
  padding: 10rpx 20rpx;
}

.between{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.s_bg_1{ background: #fff; }
.s_bg_c{ background: #ccc; }
</style>

<template>
  <view class='m_select_wrap'>
    <view class='select_wrap between' @tap='change'>
      <view class='select_title'>{{key ? obj[key][key ? obj[key].titleKey : obj.titleKey] : obj[key ? obj[key].titleKey : obj.titleKey]}}</view>
      <image class='i_arrow' src='../images/card/bottom_arrow.png' />
    </view>

    <view class='select_list_wrap s_bg_1' wx:if="{{key ? obj[key].showList : obj.showList}}">
      <repeat for="{{list}}" index='i'>
        <view class="select_item {{item[key ? obj[key].valueKey : obj.valueKey] === obj[key ? obj[key].valueKey : obj.valueKey] ? 's_bg_c' : ''}}" @tap='select({{i}})'>{{item[key ? obj[key].titleKey : obj.titleKey]}}</view>
      </repeat>
    </view>
  </view>
</template>

<script>
import wepy from "wepy";

export default class Contact extends wepy.component {
  props = {
    obj: Object,
    list: Array,
    index: String,
    key: String,
  };

  data = {
  };

  computed = {
    // valueKey(){ return this.obj && this.key ? this.obj[key].valueKey : this.obj.valueKey; },
  }

  // watch = {
  //   obj(v1, v2){ console.error(v1); }
  // }

  methods = {
    change(){
      let o = this.key ? this.obj[this.key] : this.obj;

      o.showList = !o.showList; 

      this.$emit('click', o, this.index);
    },
    select(index){
      let o = this.key ? this.obj[this.key] : this.obj,
          item = this.list[index];

      o.showList = !o.showList; 

      this.$emit('change', o, item, this.index);
    }
  };
}
</script>