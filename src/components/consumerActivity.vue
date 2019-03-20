<style scoped>
.agreement_modal{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  z-index: 9999;
  background: #000;
}
.agreement_box {
  position: relative;
  /* position: absolute; */
  border: 4rpx solid #bd956e;
  width: 624rpx;
  height: 1180rpx;
  /* min-height: 1180rpx; */
  background: #000;
  color: #ddd;
  margin: 140rpx auto;
  /* left: 64rpx; */
  /* top: 100rpx; */
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
  margin-top: 30rpx;
}
.sub_title {
  color: #bd956e;
  width: 556rpx;
  margin: 10rpx auto 0;
  font-size: 21rpx;
}
.mt30{
  margin-top: 30rpx;
}

.x_box{
  margin: 180rpx auto 0;
}

.flex{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.s_fc_1{ color: #fff; }
.s_fc_2{ color: #c49e71; }

</style>

<template>
  <view>

    <view class='agreement_modal' @tap='close'>
      <view class="agreement_box {{isX ? 'x_box' : ''}}">

        <view class='close_wrap'>
          <image class='i_close' src='../images/global/close.png' mode='aspectFill' />
        </view>

      <scroll-view scroll-y style='height: 100%;'>

        <view class=''>

          <view class="agreement_title">{{timeTitle}}</view>
          <view class='content_wrap'>
            <repeat for="{{timeContent}}">
              <view class="agreement_txt">{{item}}</view>
            </repeat>
          </view>

          <view class="agreement_title">{{methodTitle}}</view>
          <view class='content_wrap'>
            <repeat for="{{methodContent}}">
              <view class="agreement_txt">{{item}}</view>
            </repeat>
          </view>

          <view class="agreement_title">{{activityTitle}}</view>
          <view class='content_wrap'>
            <repeat for="{{activityContent}}">
              <view class="agreement_txt">{{item}}</view>
            </repeat>
          </view>

          <view class="agreement_title">{{rewardTitle}}</view>
          <view class='content_wrap'>
            <repeat for="{{rewardContent}}">
              <view class="agreement_txt">{{item}}</view>
            </repeat>
          </view>

           

          <view class="agreement_title">{{statmentTitle}}</view>
          <view class='content_wrap'>
            <repeat for="{{statmentContent_1}}">
              <view class="agreement_txt">{{item}}</view>
            </repeat>
          </view>

          <view class='content_wrap mt30'>
            <repeat for="{{statmentContent_2}}">
              <view class="agreement_txt">{{item}}</view>
            </repeat>
          </view>

          <view class='content_wrap mt30'>
            <repeat for="{{statmentContent_3}}">
              <view class="agreement_txt">{{item}}</view>
            </repeat>
          </view>

        </view>

      </scroll-view>

      </view>
    </view>

  </view>
</template>

<script>
import wepy from "wepy";

export default class Rule extends wepy.component{
  props = {
    ruleType: String,
    isX: Boolean,
  };

  watch = {
    ruleType(v1, v2){
      console.error(v1, v2);
    },
    isX(v1, v2){
      // console.error(v1, v2);
    }
  }

  data = {
    timeTitle: '活动时间',
    timeContent: ['2019年4月1日-2019年5月31日；2019年8月1日-2019年9月30日'],
    methodTitle: '活动参与方式：',
    methodContent: ['1.消费者去指定门店购买嘉实多极护专享产品后通过扫描服务顾问上传成功推荐嘉实多极护专享产品的证明文件（例如：保养工单，发票等）后分享的太阳码，参与活动。'],
    activityAndRewardTitle: '活动机制及奖励说明',
    activityTitle: '一．活动机制',
    activityContent: ['消费者购买嘉实多极护专享产品后通过扫描服务顾问上传成功推荐嘉实多极护专享产品的证明文件（例如：保养工单，发票等）后分享的太阳码参与抽奖。'],
    rewardTitle: '二．奖励说明',
    rewardContent: ['消费者扫描太阳码参与抽奖，如中奖并审核通过后，便可在7个工作日内收到礼品。',
                    '消费者扫描太阳码参与抽奖，如中奖但审核失败后，消费者可自行上传成功使用嘉实多极护专享产品的证明文件（例如：保养工单，发票等）激活奖品。'],
    statmentTitle: '重要声明：',
    statmentContent_1: ['活动奖品产生的个人所得税(如适用)由获奖用户自行承担，嘉实多有权代扣代缴。参加活动需要详细填写注册信息，并保证真实有效。\
                        获奖用户必须出示本人有效身份证，且如嘉实多要求，应签署有关奖品签收、个人信息收集和使用的条款，方有资格领奖。\
                        同一身份在一个活动中只可获奖一次，不可重复获奖。',
                   ],
    statmentContent_2: ['备注：本次活动总体中奖率20%。'],                     
    statmentContent_3: ['本活动规则不构成任何合同要约，本次活动最终解释权归嘉实多所有。'],                     
  };

  methods = {
    close(){
      this.$emit('close');
    }
  };

}
</script>
