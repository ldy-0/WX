<!--返回顶部组件-->
<!--
    使用方法
    1、import导入即可使用 如：import backtop from "../../components/backTop"
    2、components中声明 如：  components = {backtop};
    3、将要滚动的区域放入自定义组件中 如: <backtop> <view>....</view> </backtop>
    注意：
    tip: 请勿在 scroll-view 中使用 textarea、map、canvas、video 组件
    tip: scroll-into-view 的优先级高于 scroll-top
    tip: 在滚动 scroll-view 时会阻止页面回弹，所以在 scroll-view 中滚动，是无法触发 onPullDownRefresh
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
    style="position:absolute; top:0; left:0; right:0; bottom:0;"
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
      // console.log(e.detail);
      if (e.detail.scrollTop > 500) {
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
