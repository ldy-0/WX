<style scoped>
.container {
  background: #4fb84a;
  height: 100vh;
}

.imgbox {
  text-align: center;
  box-sizing: border-box;
  padding-top: 140rpx;
}
.imgbox .image1 {
  width: 214rpx;
  height: 294rpx;
}

.btn {
  width: 441rpx;
  height: 70rpx;
  line-height: 70rpx;
  background: #fff;
  color: #4fb84a;
  font-size: 30rpx;
  border-radius: 20rpx;
  text-align: right;
  padding-right: 120rpx;
  z-index: 99;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAAwCAYAAABAIGlOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkE3OEFEMEVENTBGOTExRTk4RThDQTFGN0UwQzUxRDU0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkE3OEFEMEVFNTBGOTExRTk4RThDQTFGN0UwQzUxRDU0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTc4QUQwRUI1MEY5MTFFOThFOENBMUY3RTBDNTFENTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTc4QUQwRUM1MEY5MTFFOThFOENBMUY3RTBDNTFENTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6V8mrvAAAFBUlEQVR42syaeWxUVRTGb2GwiFiiQSoQcIFQomwJpiIVokHT2BooEgTFhOASgsEFl8QoCS5BgnGLijH+ofyBFgrSurC0QSIuNYhYRMDSUoIVjWAEiRREKfidzDfy8vre3DMzb5mT/ELncZf3zb3vnuVNwZSNFSZL6wfGg7HgKtAfDATngzOgABwBP4ODoBE0ge0mQKsrX6dql8hw3CIwDdwGbgC9FV/GcP49h//uBrWgGuwxEVk3ZTsR9BxoBe+AWxUi/exqsJCCa0BZvgidDZp5c/0Cnn86+BK8DS6KS2gPsAIs57MXpt0HdoGboxY6gIfGLBOdyZwN4P4wBvc6jC4FX4PBJh5bBnqCl8Nc0QSfmbhEpuwlMDNMoXVgiKVPB1gDNmQx3zawGuxXtK1W3EtWQsXPVVra72FwIKelRBrXg2PKuR4CpeB2UALeUvT5MGihEs28rnQ17Y7PX4EHFP3qwWuOz6fBPPCDwufeHaRQ+bYvsLT90yd826iY52Of6w2KvkuCEtpNuSqy6hd7XB+m6DvK5/poZUw9LQihE+jDbFbosb1F/KuKvvL8j/O4dpPyPh8Owo9OyqD9HXQ9H3Cry81eqejXg775RXCAX+4MS5+/wGFwEpzHMf7NRejoDPuU5RCIP+Zz/ShYz6ymlaldJzgLToHuuYhMCb0sxsBgA4ODRooRt3Mtt+oloC/vsYPt23kgfsc+ndqJCpB4N3OCKG0ruIep2o10NZN5DmjtAAOX5Ui+dweVjwZpc3kwXQH2gs0MQAozHOdyPgq7quora8FIm9CTEQk8ypDufbCJvnVYQGNXgZ0Q+2Q6oa0RiPyDPvhCBh6TQppnMcSuBd29hG4PWaScmsWMc3fw0AnTpoLPIbbALbQh5IlLKXRrhOeAVCc/cQtt4qEQhknyvBP8qGjbAg4pxxX/2mZpU4FVfcJ96r4Qgkhx8I9SbFGadp1MssXFDeVhlc5E4HC2HUk345sQQOwAp9B3wS8BC32KYdsCSzspn67i38dZp9rn0/YM/7+Fn6Wgdq+iWvG/0LPMNYM0yT8fV7TzKmL/mqa9Ozhosow/E6ta7AwYPgVvBCRyB0/bucrMxmnjeJj4ucNFrmsLNX7WXQWUvHSESb5uyMU+YpyqKbKN4qqsBL0Y7SQsiUF/fpljja6INsFrwFvAF+CaHIS2KdO3lI0hWptlMqs5l3jFun+D60yyIpitHTHxl0ydVuQX1J9mhPGM0Vf5nNYzpoTB1+/abuZp8E0WA/cKwV3lYh02oX3TnIC2FGp/HgndZxM61XQtgx7jCfm9JeeUes/BPBHaaHvjPd0VX75pknXW1LYs4ek8lBRz2/ZhlrIWPJgHQmvTCR1kzr2vlPhT3ng3u9rsTZMQSJpUkwdC19eVr2tPt3Xv4vYspc9qzvSkM8lXFp/FLHSBrWZUQye+LceJZscocilWs8UmtC2gydq5O6K2LRDZJR8N295j2haVSbJf7s4GorLnwfwI5pE39mVYzVPOi4mIt9MyllXk5zZDQhj/FQh8xC+/i9o2MzWTFf4n4LF936LHFXif4DMrBexns3BdqbKKpyvxsoSJ135ixWARY+qJdGlS/JKCdxEX4wRDSuFbk/xJwBZGYyJuMseTF8bzPKOXHH7dGbYVUqiEksdJF5Nfd1bVV1awpCJ59J24Vp0vW1djcmr+Dn7zE+kQK2HeeIod7K7Si/0nwACq7xMlRqCP4wAAAABJRU5ErkJggg==);
  background-size: 58rpx 48rpx;
  background-repeat: no-repeat;
  letter-spacing: 2rpx;
  background-position: 118rpx center;
  font-weight: 500;
  margin-top: 115rpx;
}

.btn::after {
  border: none;
}

.tip_wel {
  letter-spacing: 2rpx;
  font-size: 48rpx;
  color: #fff;
  margin-top: 117rpx;
}

.wx_name {
  font-size: 24rpx;
  letter-spacing: 2rpx;
  margin-top: 10rpx;
  color: #fff;
}
.getPhone {
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
}
</style>
<template>
  <view class="container">
    <view class="imgbox">
      <image class="image1" src="{{isMain ? '../images/global/main_logo.png' : '../images/global/card_logo.png' }}" alt=""/>
      <view class="tip_wel">Welcome !</view>
      <!-- <view class="wx_name">授权演示文字</view> -->
    </view>
    <button wx:if='{{getinfoBtn}}' class="btn" open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="onGotUserInfo">微信登入</button>
    <button wx:if='{{!getinfoBtn}}' class="btn" @tap="onGotPhone">微信登入</button>
    <getPhone :code.sync='code' wx:if='{{getPhoneShow}}' class="getPhone" @SMSPhoneNum.user="SMSPhoneFn" @WXPhoneNum.user="WXPhoneFn" @hidePhonebox.user="hideboxphone"></getPhone>  
 </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../utils/http";
import GetPhone from "../components/getPhone";
import { getCode } from "../utils/user-tools";
export default class Authorization extends wepy.page {
  config = {
    navigationBarTitleText: "",
    navigationBarBackgroundColor: "#4fb84a",
    navigationBarTextStyle: "white"
  };

  data = {
    path: null,
    shareType: null,
    getPhoneShow: false,
    isMobileNum: true, //是否强制手机授权。默认强制
    isWxInfo: true, //是否强制用户微信信息授权。默认强制
    getinfoBtn: true,
    referer: null,
    sharerId: null,
    code: null,
  };

  components = {
    getPhone: GetPhone
  };
  
  computed = {
    isMain(){ return this.$parent.globalData.type == 1; },
  }

  onLoad(options) {
    console.error(options);
    // 分享
    if(options.referer){
      this.referer = options.referer;
    }

    // 名片二维码
    if(options.scene){
      let arr = (decodeURIComponent(options.scene)).split(';');
      this.sharerId = arr[0] === 'sharer' ? arr[1] : null;
    }

    if (options.shareType == "activity") {
      this.shareType = options.shareType;
    } else if (options.path) {
      this.path = options.path;
    } else {
      this.path = this.isMain ? "/pages/home" : '/pages/card';
    }
  }
  onShow() {
    switch (this.$parent.globalData.authorizationStyle) {
      case "1":
        this.isStorageUserInfo1();
        break;
      case "2":
        this.isStorageUserInfo1();
        this.isMobileNum = false;
        break;
      case "3":
        this.isStorageUserInfo3();
        break;
      case "4":
        this.isStorageUserInfo1();
        this.isWxInfo = false;
        break;
      case "5":
        this.isStorageUserInfo1();
        this.isWxInfo = false;
        this.isMobileNum = false;
        break;
      case "6":
        this.isStorageUserInfo3();
        this.isWxInfo = false;
        break;
      case "7":
        this.isStorageUserInfo7();
        this.getinfoBtn = false;
        break;
      case "8":
        this.isStorageUserInfo7();
        this.getinfoBtn = false;
        this.isMobileNum = false;
        break;
      default:
        this.goNav();
        break;
    }
    this.$apply();
  }
  //页面跳转
  goNav() {
    if(this.referer){
      return wx.reLaunch({ url: decodeURIComponent(this.referer) });
    }

    if (this.path) {
      switch (this.path) {
        case "/pages/home":
          wx.switchTab({
            url: "/pages/home"
          });
          break;
        case '/pages/card':
          wx.reLaunch({ url: this.sharerId ? `${this.path}?id=${this.sharerId}` : this.path });
          break;
        default:
          wx.redirectTo({
            url: this.path
          });
          break;
      }
    } else if (this.shareType == "activity") {
      wx.navigateBack();
    }
  }
  //本地是否缓存了用户信息
  async isStorageUserInfo1() {
    this.wxUserInfo = wx.getStorageSync("memberInfo");
    // console.log(this.wxUserInfo);
    if (this.wxUserInfo.wx_name) {
      if (this.wxUserInfo.member_mobile) {
        this.goNav();
        // this.code = await getCode();
        // this.$apply();
        // this.getPhoneShow = true;
      } else {
        this.code = await getCode();
        this.$apply();
        this.getPhoneShow = true;
      }
    } else {
      this.getPhoneShow = false;
    }
    this.$apply();
  }

  isStorageUserInfo3() {
    this.wxUserInfo = wx.getStorageSync("memberInfo");
    if (this.wxUserInfo.wx_name) {
      this.goNav();
    } else {
      this.getPhoneShow = false;
    }
    this.$apply();
  }

  isStorageUserInfo7() {
    this.wxUserInfo = wx.getStorageSync("memberInfo");
    if (this.wxUserInfo.member_mobile) {
      this.goNav();
    } else {
      this.getinfoBtn = false;
    }
  }
  //获取用户信息,onGotUserInfo中所s用到的api接口
  async onGotUserInfo(e) {
    console.log('userInfo: ', e);
    let wxUserInfo = e.detail;
    let code = await getCode();
    let userInfo = {
      code:code.code,
      iv:wxUserInfo.iv,
      encryptedData:wxUserInfo.encryptedData,
    }

    if(!this.isMain) userInfo.source = 1;

    const loginInfo = await shttp.post('/api/v2/member/login')
    .send(userInfo)
    .end();

    wx.setStorageSync("token",loginInfo.data.token);
    if (wxUserInfo != null) {
      // const res = await shttp
      //   .post(`/api/v2/member/memberinfo`)
      //   .send({
      //     wx_name: wxUserInfo.nickName,
      //     wx_avatar: wxUserInfo.avatarUrl
      //   })
      //   .end();
      //获取用户资料存入本地缓存
      const memberRes = await shttp.get("/api/v2/member/memberinfo").end();
      let memberInfo = memberRes.data;
      wx.setStorageSync("memberInfo", memberInfo);
      switch (this.$parent.globalData.authorizationStyle) {
        case "1":
          this.isStorageUserInfo1();
          break;
        case "2":
          this.isStorageUserInfo1();
          this.isMobileNum = false;
          break;
        case "3":
          this.isStorageUserInfo3();
          break;
        case "4":
          this.isStorageUserInfo1();
          this.isWxInfo = false;
          break;
        case "5":
          this.isStorageUserInfo1();
          this.isWxInfo = false;
          this.isMobileNum = false;
          break;
        case "6":
          this.isStorageUserInfo3();
          this.isWxInfo = false;
          break;
        default:
          break;
      }
    } else {
      console.log("授权取消");
      if (!this.isWxInfo) {
        //获取用户资料存入本地缓存
        const memberRes = await shttp.get("/api/v2/member/memberinfo").end();
        let memberInfo = memberRes.data;
        wx.setStorageSync("memberInfo", memberInfo);
        switch (this.$parent.globalData.authorizationStyle) {
          case "1":
            this.isStorageUserInfo1();
            break;
          case "2":
            this.isStorageUserInfo1();
            this.isMobileNum = false;
            break;
          case "3":
            this.isStorageUserInfo3();
            break;
          case "4":
            this.isStorageUserInfo1();
            this.isWxInfo = false;
          case "5":
            this.isStorageUserInfo1();
            this.isWxInfo = false;
            this.isMobileNum = false;
            break;
          case "6":
            this.isStorageUserInfo3();
            this.isWxInfo = false;
            break;
          default:
            break;
        }
      }
    }
  }
  async onGotPhone() {
    this.getPhoneShow = true;
    const memberRes = await shttp.get("/api/v2/member/memberinfo").end();
    let memberInfo = memberRes.data;
    wx.setStorageSync("memberInfo", memberInfo);
    switch (this.$parent.globalData.authorizationStyle) {
      case "7":
        this.isStorageUserInfo7();
        this.getinfoBtn = false;
        break;
      case "8":
        this.isStorageUserInfo7();
        this.getinfoBtn = false;
        this.isMobileNum = false;
        break;
      default:
        break;
    }
    this.$apply();
  }
  methods = {
    SMSPhoneFn(data, evt) {
      if (data == 1) {
        this.goNav();
      } else if (data == 2 && !this.isMobileNum) {
        this.goNav();
      }
    },
    WXPhoneFn(data, evt) {
      if (data == 1) {
        this.goNav();
      } else if (data == 2 && !this.isMobileNum) {
        this.goNav();
      }
    },
    hideboxphone(data, evt) {
      this.getPhoneShow = false;
      if (!this.isMobileNum) {
        this.goNav();
      }
    }
  };
}
</script>
