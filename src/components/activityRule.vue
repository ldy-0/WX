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
  margin: 100rpx auto;
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
      <view class="agreement_box">

        <view class='close_wrap'>
          <image class='i_close' src='../images/global/close.png' mode='aspectFill' />
        </view>

      <scroll-view scroll-y style='height: 100%;'>

        <!-- btn -->
        <view class='' wx:if="{{ruleType === 'btn'}}">

          <view class="agreement_title">{{timeTitle}}</view>
          <view class='content_wrap'>
            <repeat for="{{timeContent}}">
              <view class="agreement_txt">{{item}}</view>
            </repeat>
          </view>

          <view class="agreement_title">{{firstTitle}}</view>
          <view class='content_wrap'>
            <repeat for="{{firstContent}}">
              <view class="agreement_txt">{{item}}</view>
            </repeat>
          </view>

          <view class="agreement_title">{{rewardTitle}}</view>
          <view class='content_wrap'>
            <repeat for="{{rewardContent}}">
              <view class="agreement_txt">{{item}}</view>
            </repeat>
          </view>

          <view class="agreement_title">{{thirdTitle}}</view>
          <view class='content_wrap'>
            <repeat for="{{thirdContent}}">
              <view class="agreement_txt">{{item}}</view>
            </repeat>
          </view> 

          <view class="agreement_title">{{fourthTitle}}</view>
          <view class='content_wrap'>
            <repeat for="{{fourthContent}}">
              <view class="agreement_txt">{{item}}</view>
            </repeat>
          </view>

          <view class='content_wrap mt30'>
            <repeat for="{{fifthContent}}">
              <view class="agreement_txt">{{item}}</view>
            </repeat>
          </view>

        </view>

        <!-- left -->
        <view wx:if="{{ruleType === 'left'}}">

          <view class="agreement_title">{{l_timeTitle}}</view>
          <view class='content_wrap'>
            <repeat for="{{l_timeContent}}">
              <view class="agreement_txt">{{item}}</view>
            </repeat>
          </view>

          <view class="agreement_title">{{l_methodTitle}}</view>
          <view class='content_wrap'>
            <repeat for="{{l_methodContent}}">
              <view class="agreement_txt">{{item}}</view>
            </repeat>
          </view>

          <view class="agreement_title">{{l_ruleAndRewardTitle}}</view>
          <view class="sub_title">{{l_ruleTitle_1}}</view>
          <view class='content_wrap'>
            <repeat for="{{l_ruleContent_1}}">
              <view class="agreement_txt">{{item}}</view>
            </repeat>
          </view>

          <view class="sub_title">{{l_rewardTitle_1}}</view>
          <view class='content_wrap'>
            <repeat for="{{l_rewardContent_1}}">
              <view class="agreement_txt">{{item}}</view>
            </repeat>
          </view>

          <view class="sub_title">{{l_ruleTitle_2}}</view>
          <view class='content_wrap'>
            <repeat for="{{l_ruleContent_2}}">
              <view class="agreement_txt">{{item}}</view>
            </repeat>
          </view>

          <view class="sub_title">{{l_rewardTitle_2}}</view>
          <view class='content_wrap'>
            <repeat for="{{l_rewardContent_2}}">
              <view class="agreement_txt">{{item}}</view>
            </repeat>
          </view>

          <view class="sub_title">{{l_ruleTitle_3}}</view>
          <view class='content_wrap'>
            <repeat for="{{l_ruleContent_3}}">
              <view class="agreement_txt">{{item}}</view>
            </repeat>
          </view>

          <view class="sub_title">{{l_rewardTitle_3}}</view>
          <view class='content_wrap'>
            <repeat for="{{l_rewardContent_3}}">
              <view class="agreement_txt">{{item}}</view>
            </repeat>
          </view>

          <view class="agreement_title">{{l_importTitle}}</view>
          <view class="sub_title">{{l_importTitle_1}}</view>
          <view class='content_wrap'>
            <repeat for="{{l_importContent_1}}">
              <view class="agreement_txt">{{item}}</view>
            </repeat>
          </view>

          <view class="agreement_title">{{l_statementTitle}}</view>
          <view class='content_wrap'>
            <repeat for="{{l_statementContent_1}}">
              <view class="agreement_txt">{{item}}</view>
            </repeat>
          </view>

          <view class='content_wrap mt30'>
            <repeat for="{{l_statementContent_2}}">
              <view class="agreement_txt">{{item}}</view>
            </repeat>
          </view>

          <view style='height: 100rpx; background: transparent;'></view>

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
  };

  watch = {
    ruleType(v1, v2){
      console.error(v1, v2);
    }
  }

  data = {
    timeTitle: '活动时间',
    timeContent: ['2019年4月1日-2019年5月31日；2019年8月1日-2019年9月30日'],
    firstTitle: '一、活动机制',
    firstContent: ['服务顾问在小程序上参与4-5月【极限由我，show出实力】活动获取并积累积分', 
                   '服务顾问在小程序上参与8-9月【激发高昂表现，码上行动】活动获取并积累积分'],
    rewardTitle: '二、奖励说明',
    rewardContent: ['活动期间服务顾问获得的任务积分，分别会在5月31号以及9月30号两波活动结束后的7个工作日内按1:1比例一次性导入至“嘉实多销售智多星”微信公众平台账户中',
                    '特此注明：只有在“嘉实多销售智多星”微信公众平台进行认证过的服务顾问或在小程序上注册过的服务顾问才能使用此次的活动积分兑换奖励，未进行认证的参与人员所获得的积分无效。',
                ],
    thirdTitle: '三、年度极限由我，激发高昂表现，极护钛强服务顾问',
    thirdContent: ['活动结束后主办方将结合积分和互动性评选出年度极限由我，激发高昂表现，极护钛强服务顾问'],
    fourthTitle: '重要声明：',
    fourthContent: ['活动奖品产生的个人所得税(如适用)由获奖用户自行承担，嘉实多有权代扣代缴。参加活动需要详细填写注册信息，\
                    并保证真实有效。获奖用户必须出示本人有效身份证，且如嘉实多要求，应签署有关奖品签收、个人信息收集和使用的条款，\
                    方有资格领奖。同一身份在一个活动中只可获奖一次，不可重复获奖。',
                   ],
    fifthContent: ['本活动规则不构成任何合同要约，本次活动最终解释权归嘉实多所有。'],

    l_timeTitle: '活动时间',
    l_timeContent: ['2019年4月1日-2019年5月31日'],
    l_methodTitle: '活动参与方式',
    l_methodContent: ['1.服务顾问通过首页按钮的【极限挑战】，【我的极限挑战成果】参与活动；', 
                    '2.消费者通过服务顾问邀约或直接到达门店扫描服务顾问上传工单后的太阳码参与抽奖；'],
    l_ruleAndRewardTitle: '活动规则及奖励说明',
    l_ruleTitle_1: '一．4月【极限挑战】参与规则',
    l_ruleContent_1: ['挑战者根据视频主题“极限由我，激发高昂表现”进行抖音短视频创作拍摄并且发布同时需带有标签#极限由我#或#激发高昂表现#或#嘉实多极护#于抖音平台发布，\
                   同时视频内需有嘉实多LOGO或极护专享产品露出；主办方将会根据视频创意、质量及点赞数为依据，评选出四个优秀视频。'],
    l_rewardTitle_1: '4月【极限挑战】活动奖励',
    l_rewardContent_1: ['入选者通过“嘉实多销售智多星”公众平台联系主办方后，会得到50点积分奖励！优秀视频中的Top1还可获得嘉实多极护品牌体验之旅特权。'],
    l_ruleTitle_2: '二．5月【极限挑战】参与规则',
    l_ruleContent_2: ['服务顾问输入自己“花式推极护”的话术，提交后可观看主办方审核后的所有话术，并挑选自己认为优秀的话术点赞。'],
    l_rewardTitle_2: '5月【极限挑战】活动奖励',
    l_rewardContent_2: ['服务顾问上传的话术每获得10个赞即可获得1点积分，同时在活动结束后获得点赞数最高的服务顾问还可获得嘉实多极护品牌体验之旅特权。'],
    l_ruleTitle_3: '三．4-5月【我的极限挑战成果】参与规则',
    l_ruleContent_3: ['通过拍照上传成功推荐嘉实多极护专享产品的证明文件，例如：保养工单，发票等。 ',
                      '并可以分享太阳码邀请消费者参与抽奖；消费者在其活动页面进行抽奖，如中奖并审核通过后，便可在7个工作日内收到礼品。'],
    l_rewardTitle_3: '4-5月【我的极限挑战成果】活动奖励',
    l_rewardContent_3: ['服务顾问上传成功推荐嘉实多极护专享产品的证明文件，例如：保养工单，发票等；通过审核后即可获得1点积分。'],
    l_importTitle: '奖励导入方式',
    l_importTitle_1: '1.服务顾问的积分奖励',
    l_importContent_1: ['活动期间服务顾问获得的任务积分，会在5月31号活动结束后的7个工作日内按1:1比例一次性导入至“嘉实多销售智多星”微信公众平台账户中，可以通过积分累积，在积分商城自主兑换丰厚礼品。',
                      '特此注明：只有在“嘉实多销售智多星”微信公众平台进行认证过的服务顾问或在小程序上注册过的服务顾问才能使用此次的活动积分兑换奖励，未进行认证的参与人员所获得的积分无效。'],
    l_statementTitle: '重要声明',
    l_statementContent_1: ['活动奖品产生的个人所得税(如适用)由获奖用户自行承担，嘉实多有权代扣代缴。参加活动需要详细填写注册信息，\
                         并保证真实有效。获奖用户必须出示本人有效身份证，且如嘉实多要求，应签署有关奖品签收、个人信息收集和使用的条款，\
                         方有资格领奖。同一身份在一个活动中只可获奖一次，不可重复获奖。'],
    l_statementContent_2: ['本活动规则不构成任何合同要约，本次活动最终解释权归嘉实多所有。'],                     
  };

  methods = {
    close(){
      this.$emit('close');
    }
  };

}
</script>
