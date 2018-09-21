## getFormId组件说明
### 示例代码
```html
<template>
   <getFormId>
      <view>整个页面内容</view>
    </getFormId>
</template>
<script>
import GetFormId from "../components/getFormId";
export default class page extends wepy.component {
  components = {
    getFormId: GetFormId
  };
}
</script>
```
> 使用时需在[configTemplate.js](..\src\constant\configTemplate.js)文件中配置 FORMIDAPI字段的接口值
