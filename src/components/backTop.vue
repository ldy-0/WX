<!--返回顶部组件-->
<!--
    使用方法
    1、import导入即可使用 如：import backtop from "../../components/backTop"
    2、components中声明 如：  components = {backtop};
    3、将要滚动的区域放入自定义组件中 如: <backtop> <view>....</view> </backtop>
-->
<style >
.icon_box {
  height: 85rpx;
  width: 85rpx;
  background: #dddddd;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 20rpx;
  bottom: 15%;
}
.icon_box image {
  width: 55%;
  height: 55%;
}
</style>

<template>
  <scroll-view
    style="height:100%;"
    scroll-y="true"
    scroll-top="{{scrollTop.scroll_top}}"
    bindscroll="scrollTopFun"
  >
    <slot></slot>
    <view class="icon_box"  wx:if="{{scrollTop.goTop_show}}" catchtap="goTopFun">
      <image src="../images/icon-zhiding.png">
    </view>
  </scroll-view>
</template>

<script>
import wepy from "wepy";
export default class BackTop extends wepy.component {
  props = {};
  data = {
    scrollTop: {
      scroll_top: 0,
      goTop_show: false
    }
  };
  created() {}
  methods = {
    scrollTopFun: function(e) {
    //   console.log(e.detail);
      if (e.detail.scrollTop > 450) {
        //触发gotop的显示条件
        this.scrollTop.goTop_show = true;
      } else {
        this.scrollTop.goTop_show = false;
      }
    },
    goTopFun: function(e) {
      var _top = this.scrollTop.scroll_top; //发现设置scroll-top值不能和上一次的值一样，否则无效，所以这里加了个判断
      if (_top == 1) {
        _top = 0;
      } else {
        _top = 1;
      }
      this.scrollTop.scroll_top = _top;
    //   console.log("----");
    //   console.log(this.data.scrollTop);
    }
  };
}
</script>
