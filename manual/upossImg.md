## 用法示例
### 对象存储图片上传示例代码

* 腾讯云对象存储上传在script中引入
```js
import { uploadSeriesFile } from "../utils/tencent-cos";
```
* 阿里云对象存储上传在script中引入
```js
import { uploadSeriesFile } from "../utils/aliyun-oss";
```
```html
<style scoped>
</style>
<template>
   <view class="container">
    <view @tap='testbtn'>
      上传图片
    </view>
    <image src="{{uploadRes[0]}}" alt="" />
   </view>
</template>

<script>
import wepy from "wepy";
import { uploadSeriesFile } from "../utils/tencent-cos";
export default class Home extends wepy.page {
  data = {
    uploadRes: null
  };

  components = {};
  onLoad(options) {}
  onShow() {}
  testbtn() {
    let that = this;
    wx.chooseImage({
      count: 1, //一次上传图片数量
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        that.upImg(tempFilePaths);
      }
    });
  }
  async upImg(imgurls) {
    //uploadSeriesFile 函数 传入的参数imgurls需为数组
    this.uploadRes = await uploadSeriesFile(imgurls);
    console.log(this.uploadRes);
    this.$apply()
  }
  methods = {};
}
</script>
```