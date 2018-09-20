<style scoped>
.inner {
  margin: 0;
  padding: 0;
}

.formId-button-push {
  display: block;
  justify-content: space-between;
  border: none;
  padding: 0;
  margin: 0;
  overflow: visible;
  border-radius: 0rpx;
  background: transparent;
  line-height: normal;
  text-align: left;
}
.formId-button-push::after {
  content: none;
}

.form {
  margin: 0;
  padding: 0;
}
</style>
<template>
 <view class="inner">
    <form bindsubmit="formSubmit" report-submit='true' class="form">
    <button formType="submit"  class="formId-button-push"> <slot></slot></button>
    </form>
  </view>
</template>
<script>
import wepy from "wepy";
import { shttp } from "../utils/http";
import { FORMIDAPI } from "../constant/configConstant";
export default class getFormId extends wepy.component {
  props = {};

  data = {
    formId: ""
  };

  methods = {
    formSubmit(e) {
      this.formId = e.detail.formId;
      console.log('formId为',this.formId);
      this.postFormId();
    }
  };

  async postFormId() {
    const res = await shttp
      .post(FORMIDAPI)
      .send({ formId: parseInt(this.formId) })
      .end();
  }
}
</script>
