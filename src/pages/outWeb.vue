<style scoped>
</style>
<template>
  <web-view src="{{url}}"></web-view>
</template>

<script>
import wepy from "wepy";
export default class outWeb extends wepy.page {
  config = {
    enablePullDownRefresh: true,
    navigationBarTitleText: "外链"
  };
  data = {
    url: null
  };
  components = {};
  onLoad(options) {
    let url = options.url;
    url = decodeURIComponent(url);
    this.url = url;
    this.$apply();
  }
  onShow() {}
}
</script>
