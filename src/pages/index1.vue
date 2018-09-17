<style scoped>
</style>
<template>
   <view class="container">
    index1
   </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../utils/http";
export default class Home extends wepy.page {
  config = {
    navigationBarTitleText: "index1"
  };
  data = {};

  components = {};
  onLoad(options) {}
  onShow() {}
  methods = {};
  //get请求例子 apiurl对照api文档填写
  async gettest() {
    let apiurl = "/apiurl/v2/test";
    let querydata = {
      key: 'value'
    }
    const res = await shttp
      .get(apiurl)
      .query(querydata)
      .end();
    console.log(res);
  }
  //put请求例子
  async puttest() {
    let apiurl = "/apiurl/v2/test";
    let querydata = {
      key: 'value'
    }
    const res = await shttp
      .put(apiurl)
      .send(querydata)
      .end();
    console.log(res);
  }
  //post请求例子
  async posttest() {
    let apiurl = "/apiurl/v2/test";
    let querydata = {
      key: 'value'
    }
    const res = await shttp
      .get(apiurl)
      .send(querydata)
      .end();
    console.log(res);
  }
   //delete请求例子
  async deletetest() {
    let apiurl = "/apiurl/v2/test";
    const res = await shttp
      .delete(apiurl)
      .end();
    console.log(res);
  }
}
</script>
