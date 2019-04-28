<style scoped>
page {
  height: 100%;
}

.container {
  height: 100%;
  font-size: 28rpx 'PingFang-SC-Medium';
}

.form_wrap{
  padding: 50rpx 30rpx;
  background: #fff;
}

.flex {
  display: flex;
  align-items: center;
}
.flex image {
  margin-left: 20rpx;
}

.arrow {
  width: 16rpx;
  height: 26rpx;
}

.row_between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  line-height: 88rpx;
  border: none;
  background: #fff;
  font-size: 28rpx;
  color: #888;
  border-bottom: 1rpx solid #f5f5f5;
  padding:  0 30rpx 0;
  /* padding-right: 30rpx; */
}
.row_between .flex{
  color: #222222;
}
.icon {
  width: 30rpx;
  height: 30rpx;
  margin-right: 25rpx;
}

.submit_btn{
  height: 88rpx;
  line-height: 88rpx;
  border-radius: 10rpx;
  font-size: 36rpx;
  text-align: center;
}

.s_fc_1{ color: #fff; }

.s_bg_10{ background: #4fb84a; }
</style>

<template>
  <view class="container">

    <view class='form_wrap'>
      <name :obj.sync="name"></name>

      <mobile :obj.sync="mobile"></mobile>

      <wx :obj.sync="wx"></wx>

      <qq :obj.sync="qq"></qq>

      <companyName :obj.sync="companyName"></companyName>

      <companyJob :obj.sync="companyJob"></companyJob>

      <email :obj.sync="email"></email>

      <address :obj.sync="address"></address>

      <customVideo :obj.sync="video"></customVideo>

      <poster :obj.sync="poster"></poster>

      <detailImg :obj.sync="img"></detailImg>

      <desc :obj.sync="desc"></desc>

      <view class='submit_btn s_fc_1 s_bg_10' @tap='submit'>确定</view>
    </view>

  </view>
</template>

<script>
import wepy from "wepy";
import customInput from "../../../components/customInput";
import customImg from "../../../components/formImg";
import customVideo from "../../../components/formVideo";
import customTextarea from "../../../components/customTextarea";
import { shttp } from "../../../utils/http";
import mp from "../../../utils/wx";

export default class Card extends wepy.page {
  config = {
    navigationBarTitleText: "名片管理"
  };
  data = {
    memberInfo: null,
    imgConfig: {
      url: 'https://up-z2.qiniup.com',
      cdnUrl: 'https://cdn.health.healthplatform.xyz/',
      body: {}
    },
    name: { title: '姓名', value: '', alert: null, width: 110, height: 76 },
    mobile: { title: '联系方式', value: '', alert: null, width: 110, height: 76 },
    wx: { title: '微信号码', value: '', alert: null, width: 110, height: 76 },
    qq: { title: 'QQ号码', value: '', alert: null, width: 110, height: 76 },
    companyName: { title: '公司名称', value: '', alert: null, width: 110, height: 76 },
    companyJob: { title: '公司职位', value: '', alert: null, width: 110, height: 76 },
    email: { title: '邮箱', value: '', alert: null, width: 110, height: 76 },
    address: { title: '地址', value: '', alert: null, width: 110, height: 76 },
    video: { title: '视频', value: [], alert: null, width: 110, height: 76, limit: 1 },
    poster: { title: '视频封面', value: [], alert: null, width: 110, height: 76, limit: 1, },
    img: { title: '图片', value: [], alert: null, width: 110, height: 76 },
    desc: { title: '文字介绍', value: '', alert: null, width: 110, height: 250, showStatistic: true },
    clicked: false,
  };

  components = {
    name: customInput,
    mobile: customInput,
    wx: customInput,
    qq: customInput,
    companyName: customInput,
    companyJob: customInput,
    email: customInput,
    address: customInput,
    detailImg: customImg,
    poster: customImg,
    desc: customTextarea,
    customVideo,
  };

  onLoad(options) {
    this.memberInfo = wx.getStorageSync("memberInfo");

    // charAt 1. illegal number return '', 2. no number -> 0
    this.getInfo();
    this.getUploadToken(); 
  }

  onShow() { }

  methods = {
    async submit(){
      let param, res, poster, video,
          imgList = [];

      if(this.clicked) return ;

      if(!this.validate()) return ;

      // upload img
      if(!this.imgConfig.body.token) return mp.showModal('get upload Token error, 暂时无法上传图片');

      for(let i = 0, len = this.img.value.length; i < len; i++){
        if(!/^https:/g.test(this.img.value[i])){
          res = await mp.uploadImg(this.imgConfig.url, this.img.value[i], null, this.imgConfig.body);

          if(res.data) imgList.push(`${this.imgConfig.cdnUrl}${JSON.parse(res.data).hash}`);
        }else{
          imgList.push(this.img.value[i]);
        }
      }
      
      // poster 
      if(this.poster.value.length){
        if(!/^https:/g.test(this.poster.value[0])){
          res = await mp.uploadImg(this.imgConfig.url, this.poster.value[0], null, this.imgConfig.body);
        }

        poster = res && res.data ? `${this.imgConfig.cdnUrl}${JSON.parse(res.data).hash}` : this.poster.value[0];
      }
      

      if(this.video.value.length){
        if(!/^https:/g.test(this.video.value[0])){
          res = await mp.uploadFile(this.imgConfig.url, this.video.value[0], null, this.imgConfig.body);
        }

        video = res && res.data ? `${this.imgConfig.cdnUrl}${JSON.parse(res.data).hash}` : this.video.value[0];
      }

      this.clicked = true;

      param = {
        card_name: this.name.value,
        card_mobile: this.mobile.value,
        card_weixin: this.wx.value,
        card_qq: this.qq.value,
        card_email: this.email.value,
        card_company: this.companyName.value,
        card_position: this.companyJob.value,
        card_address: this.address.value,
        card_introduce: this.desc.value,
        card_video: video || '',
        card_video_image: poster || '',
        card_images: imgList,
      };
      
      this.save(param);
    }
  };

  validate(){
    let validateArr = ['name', 'mobile', 'wx', 'qq', 'companyName', 'companyJob', 'email', 'address', 'desc'],
        result;

    result = validateArr.some(v => {

      if(this[v].alert){ 
        wx.showModal({ content: this[v].alert, showCancel: false, }); 
        return true; 
      }

    });

    return !result;
  }

  async save(param){
    let ctn;
    wx.showLoading({ title: 'Loading...' });

    let res = await shttp.post(`/api/v2/member/card`).send(param).end();

    if(res && res.data) ctn = '提交成功!';

    if(res.error) ctn = res.error;

    wx.hideLoading();
    wx.showModal({ content: ctn, showCancel: false });

    this.clicked = false;
  }

  async getInfo(){
    wx.showLoading({ title: 'Loading...' });

    let param = {
      member_id: this.memberInfo.member_id, 
    };

    let res = await shttp.get(`/api/v2/member/card`).query(param).end();
    
    if(res && res.data){
      let o = res.data;

      this.name.value = o.card_name;
      this.mobile.value = o.card_mobile;
      this.wx.value = o.card_weixin;
      this.qq.value = o.card_qq;
      this.companyName.value = o.card_company;
      this.companyJob.value = o.card_position;
      this.email.value = o.card_email;
      this.address.value = o.card_address;
      this.video.value = o.card_video ? [o.card_video] : [];
      this.poster.value = o.card_video_image ? [o.card_video_image] : [];
      this.img.value = o.card_images || [];
      this.desc.value = o.card_introduce;
    }

    wx.hideLoading();
    this.$apply();

    if(res.error) return wx.showModal({ content: res.error, showCancel: false });

  }

  async getUploadToken(){
    let url = `/api/v2/common/imgkeyqiniu`;
    let res = await shttp.get(url).end();

    if(typeof res === 'string' || res.error) return wx.showModal({ content: `getUploadToken: ${res.error || res}`, showCancel: false });

    this.imgConfig.body.token = res.data;
    this.imgConfig.body.config = "{ useCdnDomain: true }";
  }
}
</script>