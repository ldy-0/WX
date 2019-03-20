<style >
.agreement_modal{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: #000;
}
.agreement_box {
  position: fixed;
  border: 4rpx solid #bd956e;
  width: 624rpx;
  height: 1180rpx;
  background: #000;
  color: #ddd;
  left: 64rpx;
  top: 100rpx;
  z-index: 999;
}
.close_wrap{
  position: absolute;
  top: -25rpx;
  left: -25rpx;
}
.i_close{
  width: 50rpx;
  height: 50rpx;
}
.agreement_cha {
  position: absolute;
  width: 50rpx;
  height: 50rpx;
  top: -14rpx;
  right: -16rpx;
}
.agreement_txt {
  width: 556rpx;
  margin: 0 auto;
  font-family: HYb1gj;
  font-size: 21rpx;
  font-weight: normal;
  font-stretch: normal;
  line-height: 31rpx;
  letter-spacing: 0rpx;
}
.m_top {
  margin-top: 90rpx;
}
.agreement_title {
  color: #bd956e;
  width: 556rpx;
  margin: 0 auto;
  font-size: 21rpx;
  margin-top: 50rpx;
}
.m_top2 {
  margin-top: 50rpx;
}

.x_box{
  margin: 80rpx auto 0;
}
</style>

<template>
    <view class='agreement_modal' @tap='close'>
      <view class="agreement_box {{isX ? 'x_box' : ''}}">

        <view class='close_wrap'>
          <image class='i_close' src='../images/global/close.png' mode='aspectFill' />
        </view>

        <view
          class="agreement_txt m_top"
        >为更好地提升用户服务及使用体验，我们可能会收集、保存并使用您的个人信息（例如姓名，手机号码、电子邮箱、地址、出生年月、社交媒体信息、个人喜好等）。</view>
        <view class="agreement_title">信息的收集和保存</view>
        <view
          class="agreement_txt"
        >我们将收集并储存您通过注册账户、填写电子表单、口述等各种方式直接或间接提供给我们的信息。我们可能会将您的个人信息分享给BP集团的其他公司以及第三方服务供应商（统称为“接受方”）。这些接受方可能在中国大陆以外的地区。</view>
        <view class="agreement_title">信息的使用</view>
        <view
          class="agreement_txt"
        >我们使用您的个人信息来向您提供所需的产品或服务。同时，我们将通过您的个人信息联系您，并向您介绍您可能感兴趣的嘉实多产品或服务。</view>
        <view class="agreement_title">信息的保护</view>
        <view class="agreement_txt"
        >我们制定了政策和程序，来促使您的个人信息在受我们控制时（包括接受方控制时）得到保护（无论是静止数据还是传送中的数据）。但是同其他公司一样，我们无法保证您的信息百分之百安全或保密，特别是在黑客袭击或第三方的服务器被入侵等特殊情况之下。</view>
        <view class="agreement_txt m_top2"
        >通过勾选“同意”并继续使用我们的服务，您同意我们向您发送营销通讯，并确认您同意本同意书所列的条款。如您不希望使用我们的服务，请勾选“我不同意授权使用个人信息”并提交。</view>
        <view class="agreement_txt m_top2">再次感谢您的信任与支持。</view>
        <view class="agreement_txt m_top2">嘉实多（深圳）有限公司</view>
      </view>
    </view>
</template>

<script>
import wepy from "wepy";
export default class BackTop extends wepy.component {
  props = {
    isX: Boolean
  };
  data = {
  };
  created() {}
  methods = {
    close(){
      this.$emit('close');
    } 
  };
}
</script>
