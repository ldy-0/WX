<style scoped>
page {
  background: #f5f5f5;
}
.container {
  min-height: 100%;
  font: 28rpx PingFang-SC-Medium;
}

.video_wrap{
  width: 100%;
  height: 400rpx;
  background: #ccc;
}
.video{
  width: 100%;
  height: 100%;
}

.swiper {
  height: 400rpx;
  background: #c6c6d1;
}
.swiper image {
  width: 100%;
  height: 100%;
}

.info_wrap{
  position: relative;
  padding: 30rpx;
}

.attr_item{
  margin-bottom: 20rpx;
  font-size: 30rpx;
  line-height: 1.2;
  overflow: hidden;
}
.attr_value{
  word-break: break-all;
}

.store_desc{
  line-height: 48rpx;
}

.attr_icon{
  flex-shrink: 0;
  width: 36rpx;
  height: 36rpx;
  margin-right: 20rpx;
}
.i_name{
  width: 32rpx;
  height: 32rpx;
}
.i_mobile{
  width: 26rpx;
  height: 32rpx;
}
.i_wx{
  width: 32rpx;
  height: 26rpx;
}
.i_qq{
  width: 27rpx;
  height: 32rpx;
}
.i_companyName{
  width: 30rpx;
  height: 26rpx;
}
.i_companyJob{
  width: 32rpx;
  height: 26rpx;
}
.i_email{
  width: 30rpx;
  height: 23rpx;
}
.i_address{
  width: 26rpx;
  height: 32rpx;
}

.vice_info_wrap{
  flex-shrink: 0;
  width: 160rpx;
  font-size: 28rpx;
}
.visit_wrap{
  text-align: right;
}
.vice_attr_list{
  justify-content: flex-end;
}
.vice_attr_item{
  width: 40rpx;
  padding: 20rpx 0 0 30rpx; 
  font-size: 20rpx;
  text-align: center;
}
.vice_attr_icon{
  width: 40rpx;
  height: 36rpx;
}
.i_visit{
  width: 34rpx;
  height: 26rpx;
  margin-right: 4rpx;
}
.i_save{
  width: 32rpx;
  height: 36rpx;
}
.i_share{
  width: 34rpx;
  height: 34rpx;
}

.flex{
  display: flex;
}
.center{
  display: flex;
  justify-content: center;
  align-items: center;
}
.between{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal_item{
  height: 100rpx;
  line-height: 100rpx;
  font-size: 32rpx;
  text-align: center;
  border: none !important;
}
.border{
  border-bottom: 2rpx solid #f1f1f1 !important;
}

.poster_wrap{
  position: relative;
  top: 26rpx;
  left: 0;
}
.poster_main{
  position: relative;
  width: 550rpx;
  height: 830rpx;
  border-radius: 8rpx;
}
.canvas_wrap{
  /* border: 2rpx solid #4fb84a; */
  /* border-radius: 10rpx; */
}
.canvas{
  width: 210px;
  height: 350px;
}
.i_close{
  position: absolute;
  top: -25rpx;
  right: -25rpx;
  width: 52rpx;
  height: 52rpx;
}
.submit_btn{
  width: 550rpx;
  height: 90rpx;
  margin: 40rpx 0 0;
  border-radius: 5rpx;
  font-size: 32rpx;
  line-height: 90rpx;
  text-align: center;
}

.desc_wrap{
  margin: 30rpx 0 0;
}

.desc_img_wrap{
  display: flex;
  flex-direction: column;
}
.desc_img{
  width: 100%;
  min-height: 400rpx;
}

.error_wrap{
  height: 100vh;
  text-align: center;
}
.error{
  position: relative;
  top: calc(50% - 16rpx);
  font-size: 28rpx;
  line-height: 1.2;
}

.s-fc-1{ color: #fff; }
.s-fc-2{ color: #666; }
.s-fc-3{ color: #333; }
.s-fc-5{ color: #10325f; }
.s-fc-8{ color: #888; }
.s-fc-9{ color: #999; }
.s-fc-10{ color: #0e0e0e; }

.s-bg-1{ background: #fff; }
.s-bg-2{ background: #4fb84a; }
</style>

<template>
  <view class="container s-bg-1">
    <view class='error_wrap' wx:if="{{errStr}}">
      <view class='error'>{{errStr}}</view>
    </view>
    <view wx:else>
      <view class='video_wrap' wx:if="{{card.video}}">
        <video class='video' src='{{card.video}}' poster='{{card.poster}}'></video>
      </view>
      <view class="video_wrap" wx:else>

        <swiper class="swiper" indicator-active-color="{{indicatorActiveColor}}" indicator-color="{{indicatorColor}}" indicator-dots="{{indicatorDots}}" autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}" circular="true" >
          <repeat for="{{card.card_banner}}" key="index" index="index" item="item">
            <swiper-item>
              <image src="{{item.img}}" mode="aspectFill" @tap='goTo({{index}})' />
            </swiper-item>
          </repeat>
        </swiper>

      </view>

      <view class='info_wrap s-fc-2 s-bg-1'>

        <view class='between' style='align-items: flex-start;'>
          <view>
            <repeat for="{{attrArr}}">
              <view class="attr_item flex">
                <view class='attr_icon center'>
                  <image class="{{'i_' + item.name}}" src='{{item.url}}' />
                </view>
                <view class='attr_value'>{{card[item.name]}}</view>
              </view>
            </repeat>
          </view>

          <view class='vice_info_wrap'>
            <view class='visit_wrap'>
              <image class='i_visit' src='../images/card/visit.png' />
              <text>{{card.card_view}}</text>
            </view>
            <view class='vice_attr_list flex'>
              <repeat for="{{viceAttrArr}}">

                <view class='vice_attr_item' @tap='click({{item}})'>
                  <view class='vice_attr_icon center'>
                    <image class="{{'i_' + item.value}}" src='{{item.url}}' />
                  </view>
                  <view>{{item.name}}</view>
                </view>

              </repeat>
            </view>
          </view>
        </view>

        <view class='desc_wrap s-fc-3' wx:if="{{card.desc}}">{{card.desc}}</view>

        <view class='desc_img_wrap'>
          <repeat for='{{card.imgList}}'>
            <image class='desc_img' src='{{item}}' mode='aspectFill' style="height: {{heightList[index]}}rpx;" @load='loadImg({{index}})' />
          </repeat>
        </view>
            
        <!-- <rich-text class='store_desc s-fc-3' nodes='{{desc}}'></rich-text> -->

      </view>

      <modal :config.sync='modalConfig'>
        <view slot='bottom'>
          <button class='modal_item border' open-type='share' plain="true">发送给朋友</button>
          <view class='modal_item border' @tap='createPoster'>生成海报</view>
          <view class='modal_item' @tap='hideModal'>取消</view>
        </view>
      </modal>

      <!-- poster -->
      <poster :config.sync='posterConfig'>
        <view class='poster_wrap' slot='center'>
          <view class='poster_main center s-bg-1'>
            <view class='canvas_wrap'><canvas class='canvas' canvas-id='canvas'></canvas></view>
            <image class='i_close' src='../images/card/close.png' @tap='hidePoster' />
          </view>
          <view class='submit_btn s-bg-2 s-fc-1' @tap='savePoster'>确定</view>
        </view>
      </poster>
    </view>

  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../utils/http";
import { getCode } from "../utils/user-tools";
import getTimes from "../utils/formatedate.js";
import backTop from "../components/backTop";
import dayjs from "dayjs";
import timer from "../utils/wxTimer";
import {
  showSuccessToast,
  showFailToast,
  exploitToast
} from "../utils/tools";
import modal from '../components/model';
import mp from '../utils/wx';

export default class GoodsDetails extends wepy.page {
  config = {
    navigationBarTitleText: "名片"
  };
  data = {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 200,
    indicatorActiveColor: "#333333",
    indicatorColor: "#FFFFFF", //以上为轮播配置
    attrArr: [
      { name: 'name', url: '../images/card/name.png' },
      { name: 'mobile', url: '../images/card/mobile.png' },
      { name: 'wx', url: '../images/card/wx.png' },
      { name: 'qq', url: '../images/card/qq.png' },
      { name: 'companyName', url: '../images/card/companyName.png' },
      { name: 'companyJob', url: '../images/card/companyJob.png' },
      { name: 'email', url: '../images/card/email.png' },
      { name: 'address', url: '../images/card/address.png' },
    ],
    viceAttrArr: [
      { name: '保存', value: 'save', url: '../images/card/save.png' },
      { name: '分享', value: 'share', url: '../images/card/share.png' },
    ],
    card: {},
    desc: '',
    sharerId: null,
    modalConfig: {
      show: false,
    },
    posterConfig: {
      width: 576,
      height: 986,
      center: true,
      show: false,
    },
    memberInfo: null,
    errStr: null,
    heightList: [],
    pixelRatio: 1,
  };

  computed = {
    serviceList(){ return this.store && this.store.serviceList; },
    commentList(){ return this.store && this.store.commentList; },
  };

  components = {
    backTop,
    modal,
    poster: modal,
  };

  methods = {
    loadImg(index, e){
      let info = e.detail;

      this.heightList[index] = info.height * this.pixelRatio;
    },
    goTo(index){
      let url,
          item = this.card.card_banner[index];

      if(item.type === 'none') return ;

      if(item.type === 'img') url = `/pages/article/advertisingPage?imgurl=${item.targetImg}`;

      if(item.type === 'goods') url = `/pages/store/goodsDetails?goods_commonid=${item.goods.goods_commonid}`;

      wx.navigateTo({ url });
    },
    click(item){
      if(item.value === 'share'){
        return this.modalConfig.show = true;
      }

      if(item.value === 'save'){
        this.saveConcat();
      }
    },
    async createPoster(){
      let res,
          imgList = [];

      wx.showLoading({ title: 'Loading...' });

      res = await mp.getImg(this.memberInfo.wx_avatar);
      if(res && res.errMsg){
        wx.hideLoading();
        return wx.showModal({ content: res.errMsg, showCancel: false });
      }

      imgList.push(res);

      let qr_param = {
          page: "pages/authorization",
          scene: `sharer;${this.memberInfo.member_id}`,
          width: 450,
          is_hyaline: true,
          source: 1
      };

      res = await shttp.post(`/api/v2/member/wxcode`).send(qr_param).end();

      if(res && res.data){
        res = await mp.getImg(`https://cdn.health.healthplatform.xyz/${res.data.url.key}`);

        if(res && res.errMsg){
          wx.hideLoading();
          return wx.showModal({ content: res.errMsg, showCancel: false });
        }

        imgList.push(res);
      }

      this.drawImage(imgList);

      this.modalConfig.show = false;
      this.posterConfig.show = true;
      wx.hideLoading();
      this.$apply();
    },
    hidePoster(){
      this.$invoke('poster', 'hide');
    },
    async savePoster(){
      let res = await mp.getCanvasImg("canvas", 0, 0, 420, 700);

      if(res.errMsg){
        return wx.showModal({ content: res.errMsg, showCancel: false });
      }

      let saveRes = await mp.saveImg(res);
      console.error('save', res, saveRes);

      if(saveRes.errMsg === 'saveImageToPhotosAlbum:ok'){
        wx.showToast({ title: '保存成功', duration: 1000 });
      }

    },
    hideModal(){
      this.$invoke('modal', 'hide');
    },

  };

  onShareAppMessage(res){
      let path = `/pages/authorization?referer=${encodeURIComponent(`/pages/card?id=${this.memberInfo.member_id}`)}`;

      // console.error(path);
      return {
        title: '名片',
        path,
        success: function(res) {
          wx.showToast({ title: "转发成功", icon: "success", duration: 2000 });
        },
        fail: err => console.error('share: \n', err),
      };
  };

  onLoad(opt){
    // from self / 从我的商城进入
    if(opt.referer == 'self') wx.removeStorageSync('sharerId');

    // from sharer / 从其他人分享进入
    if(opt.id) {
      wx.setStorageSync('sharerId', opt.id);
      this.sharerId = wx.getStorageSync('sharerId');
      this.viceAttrArr.pop();
      console.error(this.sharerId, this.viceAttrArr);
    }

    let sys = wx.getSystemInfoSync();
    this.isSmall = sys.screenWidth <= 320;
    this.pixelRatio = sys.pixelRatio;
    console.error(sys, this.isSmall);
  }

  onShow() {
    this.memberInfo = wx.getStorageSync('memberInfo');
    this.getInfo();
  }

  drawImage(imgList){
    let ctx = wx.createCanvasContext("canvas");

    // if(this.isSmall){

    // }

    ctx.fillStyle = '#ffffff';
    ctx.setFillStyle('#ffffff');
    ctx.fillRect(0, 0, 210, 350);
    ctx.strokeStyle = '#4fb84a';
    ctx.setStrokeStyle('#4fb84a');
    ctx.moveTo(10, 0);
    ctx.lineTo(200, 0);
    ctx.quadraticCurveTo(210, 0, 210, 10);
    ctx.lineTo(210, 340);
    ctx.quadraticCurveTo(210, 350, 200, 350);
    ctx.lineTo(10, 350);
    ctx.quadraticCurveTo(0, 350, 0, 340);
    ctx.lineTo(0, 10);
    ctx.quadraticCurveTo(0, 0, 10, 0);
    ctx.stroke();

    ctx.save();
    ctx.beginPath();
    ctx.arc(105, 45, 30, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.clip();
    ctx.drawImage(imgList[0].path, 75, 15, 60, 60);
    ctx.restore();

    ctx.setTextAlign('center');
    ctx.setFontSize(12);
    ctx.fillStyle = '#666666';
    ctx.setFillStyle('#666666');
    ctx.fillText('秒美如画', 105, 100);

    ctx.setFontSize(14);
    ctx.fillStyle = '#4fb84a';
    ctx.setFillStyle('#4fb84a');
    ctx.fillText('Hi 这是我的名片，快保存吧~', 105, 146);

    ctx.drawImage(imgList[1].path, 75, 225, 60, 60);

    ctx.setFontSize(7);
    ctx.fillStyle = '#b9b9b9';
    ctx.setFillStyle('#b9b9b9');
    ctx.fillText('扫描或长按小程序码', 105, 315);

    ctx.draw();
  }

  async saveConcat(){
    let str,
        card = this.card,
        param = {
          firstName: card.name,
          mobilePhoneNumber: card.mobile,
          weChatNumber: card.wx,
          organization: card.companyName,
          title: card.companyJob,
          email: card.email,
          remark: card.desc,
        };

    let res = await mp.saveConcat(param);

    // console.error('saveConcat: ', res);
    if(res.errMsg === 'addPhoneContact:fail cancel') return ;

    str = /ok$/g.test(res.errMsg) ? '保存成功' : res.errMsg;

    wx.showModal({ content: str, showCancel: false });
  }

  async getInfo(){
    wx.showLoading({ title: 'Loading...' });

    let param = {
      member_id: this.sharerId || this.memberInfo.member_id, 
    };

    let res = await shttp.get(`/api/v2/member/card`).query(param).end();
    
    if(res && res.data){
      let o = res.data;

      this.card = {
        name: o.card_name,
        mobile: o.card_mobile,
        wx: o.card_weixin,
        qq: o.card_qq,
        address: o.card_address,
        companyName: o.card_company,
        companyJob: o.card_position,
        email: o.card_email,
        video: o.card_video,
        poster: o.card_video_image,
        desc: o.card_introduce,
        imgList: o.card_images || [],
        card_banner: o.card_banner,
        card_view: o.card_view,
      };

      // console.error(this.card);
    }

    this.heightList = this.card.imgList.map(v => '');

    wx.hideLoading();

    if(res.error) this.errStr = res.error; //return wx.showModal({ content: res.error, showCancel: false });

    this.$apply();
  }

}
</script>

