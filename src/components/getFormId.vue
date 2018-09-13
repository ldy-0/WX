<style lang="sass" scoped>
.inner
  margin: 0
  padding: 0

.formId-button-push
  display: block
  justify-content: space-between
  border: none
  padding: 0
  margin: 0
  overflow: visible
  border-radius: 0rpx
  background: transparent
  line-height: normal
  text-align: left
  &::after
    content: none
  
.form
  margin: 0
  padding: 0

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
export default class getFormId extends wepy.component {
  props = {};

  data = {
    formId: ""
  };

  methods = {
    formSubmit(e) {
      this.formId = e.detail.formId;
      let status = wx.getStorageSync("status");
      if (status == "student") {
        this.studentFormId();
      } else if (status == "teacher") {
        this.assistantFormId();
      }
    }
  };

  async studentFormId() {
    const res = await shttp
      .post("/v1/student/notify")
      .send({ formId: parseInt(this.formId) })
      .end();
  }
  async assistantFormId() {
    const res = await shttp
      .post("/v1/assistant/notify")
      .send({ formId: parseInt(this.formId) })
      .end();
  }
}
</script>
