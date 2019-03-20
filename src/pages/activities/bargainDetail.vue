<style>
</style>
<template>
  <view></view>
</template>
<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import Placeholder from "../../components/placeholder";
export default class GoodsList extends wepy.page {
  config = {
    navigationBarTitleText: ""
  };
  components = {
    placeholder: Placeholder
  };
  data = {};
  onLoad() {}
  onShow() {}
  methods = {};
}
</script>