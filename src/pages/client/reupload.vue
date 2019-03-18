<style scoped>
page {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.bg_img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.banner_img {
  display: block;
  width: 714rpx;
  height: 344rpx;
  margin: 0 auto;
  margin-top: 18rpx;
}

.main_container{
  overflow: hidden;
}

.record_wrap{
  position: absolute;
  right: -200rpx;
  width: 500rpx;
  height: 60rpx;
  margin: 20rpx 0 0;
}
.record_bg{
  width: 100%;
  height: 100%;
  /* transform: skewX(-40deg); */
}
.record{
  position: absolute;
  top: 0;
  left: 70rpx;
  width: 100%;
  padding: 12rpx 0;
  font-size: 25rpx;
  font-weight: bold;
}

.main_wrap{
  position: relative;
  left: calc(50% - 325rpx);
  width: 650rpx;
  margin: 15rpx 0 0;
}

.video_desc{
  margin: 20rpx 0 0;
  font-size: 22rpx;
}
.dot{
  flex-shrink: 0;
  width: 14rpx;
  height: 14rpx;
  margin: 8rpx 10rpx 0 0;
  border-radius: 50%;
}

.addImg_wrap{
  width: 550rpx;
  height: 310rpx;
  margin: 150rpx auto 0;
  border: 2rpx solid #90704c;
  display: flex;
  justify-content: center;
  align-items: center;
}
.i_upload{
  width: 40rpx;
  height: 53rpx;
}
.upload_title{
  margin-left: 10rpx;
  font-size: 36rpx;
}
.img{
  width: 100%;
  height: 100%;
}

.btn_wrap{
  position: relative;
  width: 300rpx;
  height: 80rpx;
  margin: 40rpx auto 0;
}
.i_btn{
  width: 100%;
  height: 100%;
}
.btn_ctn{
  position: absolute;
  top: 25rpx;
  left: calc(50% - 50rpx);
  width: 100rpx;
  font-size: 25rpx;
  font-weight: bold;
}

.tip{
  width: 250rpx;
  margin: 30rpx auto 0;
  font-size: 22rpx;
}

.error_info{
  margin: 40rpx 0 0;
  font-size: 30rpx;
  text-align: center; 
}

.flex{
  display: flex;
  align-items: center;
}

.s_fc_1{ color: #fff; }
.s_fc_2{ color: #c49e71; }
.s_fc_3{ color: #5a2f08; }
.s_fc_4{ color: #c2996f; }
.s_fc_5{ color: #9d7c56; }
.s_fc_6{ color: #ddd; }

.s_bg_1{ background: #fff; }
.s_bg_2{ background: #c2996f; }
.s_bg_3{ background: #000; }
</style>

<template>
  <view class="container">
    <image class="bg_img" src="../../images/bg.png" mode='aspectFill' alt>
    <image class="banner_img" src="../../images/banner.png" alt>

    <view class='main_container' wx:if="{{type !== 'result'}}">
      <!-- <view class='record_wrap' @tap='goRecord'>
        <image class='record_bg' src='../../images/limit/skew.png' mode='aspectFill' />
        <view class='record s_fc_1'>个人挑战记录</view>
      </view> -->

      <view class="main_wrap s_fc_1">

        <view class='addImg_wrap s_bg_3' @tap='addImg'>
          <image class='img' src='{{img}}' mode='aspectFill' wx:if='{{img}}' />

          <image class='i_upload' src='../../images/limit/upload.png' wx:if='{{!img}}' />
          <view class='upload_title s_fc_5' wx:if='{{!img}}'>{{uploadTitle}}</view>
        </view>

        <view class='error_info s_fc_6'>
          <repeat for='{{errorInfo}}'>
            <view>{{item}}</view>
          </repeat>
        </view>

        <view class='btn_wrap' @tap='go'>
          <image class='i_btn' src='../../images/btn1.png' mode='aspectFill' />
          <view class='btn_ctn s_fc_3'>{{btnTitle}}</view>
        </view>

        <!-- <view class='tip s_fc_6' wx:if="type !== 'error'">{{tipTitle}}</view> -->
      </view>
    </view>

    <tabBar :list.sync='tabBarList'></tabBar>

  </view>
</template>

<script>
import wepy from "wepy";
import tabBar from "../../components/tabBar";
import { shttp } from "../../utils/http";
import req from "../../utils/request";
import mp from "../../utils/wx";

export default class Waiterhome extends wepy.page {
  config = {
    navigationBarTitleText: "",
  };

  data = {
    tabBarList: [],
    uploadTitle: '上传工单',
    errorInfo: ['服务顾问上传工单失败', '您可以再次上传工单推荐嘉实多极护', '专享产品的证明文件', '例如：保养工单 发票等激活奖品'],
    tipTitle: '必须使用嘉实多极护专享',
    type: 'upload',
    list: [],
    img: '',
    btnTitle: '确认上传',
    resultTitle: '上传成功！推荐车主扫码抽奖通过验证后即可获得相应积分',
    error: null,
    canSubmit: true,
  };

  components = {
    tabBar,
  };

  onLoad(param) {
    let gd = this.$parent.globalData;
    gd.tabIndex = -1;
    this.tabBarList = gd.clientTabBarList;
    this.$apply();

    if(param.type === 'result'){
      this.getResult();
    }else if(param.type === 'error'){
      this.initError(param.error);
    }else if(param.type === 'reupload'){
      this.initReUpload();
    }   
  }

  onShow() {}

  methods = {
    goRecord(){
      let url = `/pages/limit/record`;
      wx.navigateTo({ url, });
    },
    async addImg(){
      if(this.type === 'error') return ;

      let res = await mp.chooseImg();

      this.img = res[1].tempFilePaths[0]; 
      this.$apply();
    },
    async go(){
      let url;

      if(!this.canSubmit) return ;
      this.canSubmit = false;
      this.$apply();

      if(this.type === 'upload'){
        this.getResult();
      }else if(this.type === 'error'){
        this.img = null;
        this.initReUpload();
      }else if(this.type === 'reupload'){
        this.uploadImg();
      }
    },
  };

  async uploadImg(){
    let param = {
      file: this.img,
    };
    // console.error('upload img param', param);

    let res = await mp.uploadImg(`https://castrolmini.mgcc.com.cn/oss/api/v1/upload`, this.img, {
      'content-type': 'multipart/form-data',
      'Authorization': wx.getStorageSync('token'),
    });
    // console.error(res);

    if(res && res.data){
      let o, opt;
      try{
        o = JSON.parse(res.data);
        console.error('img', res.data);
      }catch(e){
        console.error(e);
      }

      if(!o){ return ; }
      opt = { image: o.data, nextPage: 'pages/client/index', }

      if(this.type === 'reupload'){
        opt.id = this.error.orderId;
        opt.orderStatus = 'AUDITING';
      }

      this.getResult(opt);
    }

  }

  initReUpload(param){
    this.type = 'reupload';
    this.btnTitle = '重新上传';
    this.canSubmit = true;
  }

  initError(param){
    let error;

    try{
      error = JSON.parse(param); 
    }catch(e){
      console.error(e);
    }

    this.type = 'error';
    this.btnTitle = '重传工单';
    this.img = error.url;
    this.error = error;
    this.canSubmit = true;
  }

  async getResult(param){
    wx.showLoading({ title: 'Loading...' });

    let res = await req.post(`/castrol/api/v1/order/status`, param, { 'Authorization': wx.getStorageSync('token'), }); 

    if(res && res.data){
      let gb = this.$parent.globalData;
      // this.qrcode = this.type === 'reupload' ? this.error.qrcode : res.data;
      // this.type = 'result';
      // this.btnTitle = '保存图片';

      gb.tabIndex = 1;
      return wx.redirectTo({ url: `/pages/client/prizeList`, });
      this.canSubmit = false;
    }

    this.canSubmit = true;
    this.$apply();
    wx.hideLoading();
  }

}
</script>
