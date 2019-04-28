<template>
  <section>
    <view class='score_wrap'>
      <view class='score'>{{amount}}</view>
      <text class='score_title'>当前德分</text>
    </view>

    <form bindsubmit="submitForm">
      <view class='form_main'>
        <view wx:for="{{formList}}" wx:key class="info" data-index="{{index}}">
          <label>{{item.name}}:</label>
          <input name="{{item.label}}" placeholder="{{item.placeholder}}"/>
        </view>
      </view>
      <button formType="submit">确定</button>
    </form>

    <modal :config.sync='modalConfig' @done.user='save'></modal> 

  </section>
</template>
<script>
import wepy from "wepy";
import modal from '../../../components/payModal';
import { shttp } from '../../../utils/http';

export default class TransferAccounts extends wepy.page {
  config = {
    navigationBarTitleText: "转出"
  };

  data = {
    amount: '',
    formList : [
      {
        label:"transfer_accounts",
        name:"转出金额",
        placeholder:""
      },
      {
        label:"transfer_obj",
        name:"对方账户",
        placeholder:"请输入对方手机号"
      },
    ],
    param: null,
    modalConfig: {
      show: false,
    }
  };

  components = {
    modal
  }

  methods = {
    submitForm(e){
      let formdata = e.detail.value,
          tell = /^1[3456789]\d{9}$/, /* 手机号验证 */
          tips = '';
      
      if(!(formdata.transfer_accounts > 0)){
        tips = "请输入正确的转出金额";
      }else if(!tell.test(formdata.transfer_obj) || formdata.transfer_obj === ""){
        tips = "请输入正确的对方账户";
      }

      if(tips != ''){
        return wx.showModal({ content: tips, showCancel:false, confirmColor:'#4fb84a', })
      }

      this.param = {
        member_mobile: formdata.transfer_obj,
        amount: formdata.transfer_accounts,
      };

      // no set password / 未设置密码
      if(this.memberInfo.set_paypwd != 1) return this.showSetting();

      this.modalConfig.show = true;
    },
    async save(pwd){
      this.param.password = pwd;

      let res = await shttp.post(`/api/v2/member/rcbalance`).send(this.param).end();

      if(res.error){
        this.modalConfig.show = false;
        this.$apply();
        return wx.showModal({ content: res.error, showCancel: false });
      }

      wx.navigateBack({ delta: 1 });
    }
  }

  onLoad(opt){
    this.amount = opt.amount; 
  }

  onShow(){
    this.getUserInfo();
  }

  showSetting(){
    let opt = { 
          title: '温馨提示', 
          content: '您还未设置德分支付密码', 
          confirmText: '去设置',
          cancelText: '再看看',
          confirmColor: '#4fb84a',
          success(v){ v.confirm && wx.navigateTo({ url: "/pages/my/dScore/setting" }) } 
        };

    return wx.showModal(opt);
  }

  async getUserInfo(){
    let param = {};

    let res = await shttp.get(`/api/v2/member/memberinfo`).query(param).end();

    if(res && res.data){
      wx.setStorageSync('memberInfo', res.data);
    }

    this.memberInfo = wx.getStorageSync("memberInfo");

    this.$apply();
  }
  
}
</script>

<style scoped>
  section{
    display: block;
    width: 100%;
    height: 100vh;
    background-color: #fff;
  }
  .score_wrap{
    width: 100%;
    height: 272rpx;
    text-align: center;
    box-sizing: border-box;
    padding-top: 51rpx;
    background-color: #fff;
    margin-bottom: 10rpx;
    border-bottom: 10rpx solid rgb(248, 248, 248);
  }
  .score{
    color: #4fb84a;
    letter-spacing: 2rpx;
    font-size: 60rpx;
    margin-bottom: 43rpx;
  }
  .score_title{
    color: #999;
    letter-spacing: 1rpx;
    font-size: 30rpx;
  }
  .info{
    width: 100%;
    background-color: #fff;
    height: 88rpx;
    line-height: 88rpx;
    letter-spacing: 1rpx;
    font-size: 30rpx;
    color: #222;
    box-sizing: border-box;
    border-bottom: 1rpx solid rgb(248, 248, 248);
    padding: 0 30rpx;
  }
  .info label{
    float: left;
  }
  .info input{
    height: 100%;
    box-sizing: border-box;
    padding-left: 16rpx;
  }
  form button{
    border-radius: 10rpx;
    background-color: #4fb84a;
    height: 70rpx;
    line-height: 70rpx;
    color: #fdfbfa;
    font-size: 36rpx;
    letter-spacing: 1rpx;
    width: 690rpx;
    margin-top: 227rpx;
  }
.form_main{
  border-bottom: 10rpx solid rgb(248, 248, 248);
}

.flex{
  display: flex;
  align-items: center;
}

.s_bg_f{ background: #fff; }
</style>

