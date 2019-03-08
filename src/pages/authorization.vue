<style scoped>
.container {
  background: #f17f30;
  height: 100vh;
}

.imgbox {
  text-align: center;
}
.imgbox .image1 {
  width: 614rpx;
  height: 427rpx;
  background: #f17f30;
}

.btn {
  width: 441rpx;
  height: 70rpx;
  line-height: 70rpx;
  background: #fff;
  color: #f17f30;
  font-size: 30rpx;
  border-radius: 20rpx;
  text-align: right;
  padding-right: 120rpx;
  z-index: 99;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAAwCAYAAABAIGlOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjAyRDQwMjdBMDcyRDExRTlBRDc1QTE4Mjc3RTY0OUFBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjAyRDQwMjdCMDcyRDExRTlBRDc1QTE4Mjc3RTY0OUFBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDJENDAyNzgwNzJEMTFFOUFENzVBMTgyNzdFNjQ5QUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDJENDAyNzkwNzJEMTFFOUFENzVBMTgyNzdFNjQ5QUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7cEEMsAAAE+0lEQVR42syaeWwUZRjGZ0uxUnAJBlvAiAoEiMrRQApSIBo0JtUQjiCIJATREAmHBUmIkLBAlGA4jIox/gH8IVZQqSgBaYBwlnAuIkdpgZCKhiOARUoBKeV5s8/KZDoz37e7M7P7Jr/QHb5jnv2++d5jNlQ7r7eRpOWBAaAPeA60B0+CFuA+CIFr4E9wAVSAKDhseGjhSFSrXXai44KRYAR4CbTS+DK68+8J/PcEKAOl4KQRkGVpthNBC0E1WAne0BDpZM+DuRS8DhRlitDxoJI3l+fx/KPAHvANaJMuoc3Bt2A1nz0/7T1wHLwatNAOPDTeNoIzmbMcTPZjcLvDqB3YBzoa6bEV4FGwzM8VzeYzky6RcVsKxvgp9GfQWdGnDvwINicx30HwAzin0bZU416SEip+7nVF+5MMDuS0LAYDQa3mXNNBIXgTdANfa/TZ4LVQiWa+0HQ1NabPe8FUjX5bwOemz/fA++APDZ/7jpdC5dtuqWj7j0P49pvGPL86XC/X6LvIK6FZmqsiq/64zfWuGn17OlzvpRlTj/RC6CD6MJXl2GxvEf+ZRl95/vvbXHtF8z4/8MKPDkmg/Vt0PT9xq8vNdtLo15y+eQk4zy93tKLPv+AyqAePcIz/UhHaK8E+RSkE4h86XL8ONjGrqWZq1wAawR3QLBWRcaFPpzEw2MzgoIJixO3041Z9ArTlPdaxfQ0PxCPs06A7UQiJdyUnCNL2g4lM1V6mqxnKc0DXzjNwWY3k+4RX+aiXNokH07PgNNjOACQnwXGe4aNw/EakoAz0UAmtD0jgdYZ034Gt9K1dPRp7GDgGsR+5Ca0OQORV+uDHGHgM8WmejyF2PWhmJ/SwzyLl1MxnnHuUh46fNhzsgtiQVWi5zxMXUuj+AM8BqU5utAqN8lDwwyR5PgZOabStApc0xxX/elbRphirOtt66n7qg0hx8DMpNuzSroFJtri4Ljys3EwEdmfbHnQzjgkBxHYwC10F/vJY6ByGbSWKdlI+Xcu/b7JOdcah7X3+fxU/S0HtXY1qxf9CG5lremmSf87SaGdXxP7bpb01OFCV6sdgVfPNAcM28KVHIo/ytJ2kmdmYrT8PEyd3OM9yba6On7VWASUvfcGIvW5IxX5hnKpTZOvJVfke5DLayVYkBu35ZfYx9Ipog0I2L5mk1Lgb9E1BaLy6H6RLcbNDdrHubfCiEasIJmvXjPSXTM0Wdgrq7zHCmG/oV/msuyIrg4Q2qm4mAg4kMXCuD+4qFatTCW3rcgKqUqhzGST0jErocKNpGbSWJ+TvipxT6j0XMkRoheqN9yhLfPmVEauzxrdlN57OXUg+t21rZinrwbQMEFrmJvQp4+H7Sok/F9JlmO20S0IgadK6DBC6KRyJ1rht3XHcnoWMLysTPemM2CuLHWkWWqKqGclqSDRxMMWJxqdR5GKsZpVK6FmPJqvh7gjadkJkk3zUb1vDtC0ok2T/NWs2EJR9AqYEMI+8sS/Cat4xX8wOeDutYFlFfm7T2Yfxl0PgDKf8LmjbztRMVviux2M7vkVPV+B9i8+sFLAXJOG64mUVW1di69RT+NGj1yYx9WC6NCl+ScE7zMW4xZBSOGTEfhKwk9GYiBvKMa5g6+ZlulCr5VCohJI3SdNEMxI1bkQKillSkTx6LK6VZsrW1TE5Na+Ai04iTWIlzBtAsR2tVXqxBwIMAKFyF16EAZw+AAAAAElFTkSuQmCC);
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
      <image class="image1" src="" alt=""/>
      <view class="tip_wel">Welcome !</view>
      <!-- <view class="wx_name">授权演示文字</view> -->
    </view>
    <button wx:if='{{getinfoBtn}}' class="btn" open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="onGotUserInfo">微信登入</button>
    <button wx:if='{{!getinfoBtn}}' class="btn" @tap="onGotPhone">微信登入</button>
    <getPhone wx:if='{{getPhoneShow}}' class="getPhone" @SMSPhoneNum.user="SMSPhoneFn" @WXPhoneNum.user="WXPhoneFn" @hidePhonebox.user="hideboxphone"></getPhone>  
 </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../utils/http";
import GetPhone from "../components/getPhone";
export default class Authorization extends wepy.page {
  config = {
    navigationBarTitleText: "",
    navigationBarBackgroundColor: "#f17f30",
    navigationBarTextStyle: "white"
  };

  data = {
    path: null,
    shareType: null,
    getPhoneShow: false,
    isMobileNum: true, //是否强制手机授权。默认强制
    isWxInfo: true, //是否强制用户微信信息授权。默认强制
    getinfoBtn: true
  };

  components = {
    getPhone: GetPhone
  };
  onLoad(options) {
    if (options.shareType == "activity") {
      this.shareType = options.shareType;
    } else if (options.path) {
      this.path = options.path;
    } else {
      this.path = "/pages/home";
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
    if (this.path) {
      switch (this.path) {
        case "/pages/home":
          wx.switchTab({
            url: "/pages/home"
          });
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
  isStorageUserInfo1() {
    this.wxUserInfo = wx.getStorageSync("memberInfo");
    console.log(this.wxUserInfo);
    if (this.wxUserInfo.wx_name) {
      if (this.wxUserInfo.member_mobile) {
        this.goNav();
      } else {
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
  //获取用户信息,onGotUserInfo中所用到的api接口
  async onGotUserInfo(e) {
    console.log(e);
    let wxUserInfo = e.detail.userInfo;
    if (wxUserInfo != null) {
      const res = await shttp
        .post(`/api/v2/member/memberinfo`)
        .send({
          wx_name: wxUserInfo.nickName,
          wx_avatar: wxUserInfo.avatarUrl
        })
        .end();
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
      if (data == 1 && this.isMobileNum) {
        this.goNav();
      } else if (data == 2 && !this.isMobileNum) {
        this.goNav();
      }
    },
    WXPhoneFn(data, evt) {
      if (data == 1 && this.isMobileNum) {
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
