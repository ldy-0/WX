<style scoped>
.container {
  background: #009b4c;
  height: 100vh;
}

.imgbox {
  padding-top: 148rpx;
  text-align: center;
}
.imgbox .image1 {
  width: 223rpx;
  height: 224rpx;
}

.btn {
  width: 441rpx;
  height: 70rpx;
  line-height: 70rpx;
  background: #fff;
  color: #009b4c;
  font-size: 30rpx;
  border-radius: 20rpx;
  text-align: right;
  padding-right: 120rpx;
  z-index: 99999;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAAwCAYAAABAIGlOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVEMDczREY0QTVBRDExRTg4QTQ1RDE1QjhCRUUzNDdGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVEMDczREY1QTVBRDExRTg4QTQ1RDE1QjhCRUUzNDdGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUQwNzNERjJBNUFEMTFFODhBNDVEMTVCOEJFRTM0N0YiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RUQwNzNERjNBNUFEMTFFODhBNDVEMTVCOEJFRTM0N0YiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5dHaLGAAAE/ElEQVR42syaeWwUVRzH35ZiFaFEgq1gBAUCRLkSSAUqBgLEpAIBCXImBKkhGuXUhACJB0Gj4QpXCBLlD6AKSMEawEYICJQgRxEBSwuElCMgkSNQEKWU7y/7XZ1MZ+a93Z2Z3V/yCd3hHfPd9+b9jtmI+mqQStByQG/QHbwIWoBnwRPgIYiA6+ACuAjKQDk4ony0usISo3aZcY6bDYaDN0Bf0Njgy+jIvyfw35OgGBSBUyokyzBsJ4LmgirwNRhkINLNXgJzKHgDyE8XoeNBBW8ux+f5R4B9YBV4KlVCG4K1YA2fvSDtbXACDAxbaEseGmNVeCZzloJ3gxjc6TB6BhwArVRqbDl4HCwMckUz+cykSmTMFoBRQQrdAtpq+tSATWB7AvMdAhvBOYO2RQb3kpBQ8XOva9qfYnAgp2UBeAXcMpxrCsgDb4IOYKVBn61+C5VoZqmhq6m2fN4P3jfo9xNYYvn8ALwDfjfwuW/5KVS+7Sc1bW+6hG87DOZxi9NKDfp+7pfQDMNVkVVv5nC9vUHfLi7XuxrG1MP9ENqHPkxnWQ7bW8QvNugrz39Ph2sDDO9zqh9+tH8c7UfT9XzPrS4328agX0P65vngPL/ckZo+t8Gf4B54jGP8m4zQrnH2yU8iEP/A5foNsI1ZTRVTu1rJwsB90CAZkTGhrVMYGGxncFBGMeJ2XuZWfRo05z3WsH01D8Sj7FNrOlEEiXcFJwjTDoKJTNX60dUM4TlgaucZuKxB8n3Sr3zUT5vEg+kFcBrsYgCSFec4z/NROBFZPbgYdNYJvReSwBsM6daDn+lb2/s09lBwHGJneQmtCkHkX/TBTRh49A9onnkQuxk0cBJ6JGCRcmrmMs49xkMnSBsGfoHYiF1oacAT51HowRDPAalO/mgXWs5DIQiT5Pk4+MOgbSW4ajiu+NezmjYFWNWZ9lP3ywBEioOfQbHZHu1qmWSLi2vHw8rLRGBHtu1MN+OaEEBsS6vQb8Aln4XOZtg2TdNOyqff8e87rFOdcWn7kP9fyc9SUCs0qFb8J7SOuaafJvnnhwbtnIrYlz3a24ODcs34o7CqudaAYSdY5pPIYzxtJxlmNlbrycPEzR1+ZLs2x8TP2quAkpd2UtHXDcnYD4xTTYpsXbgq34JGjHYyNYlBC36Z3ZVZEa1PxOElk5Qa94IeSQiNVffDdCledtgp1v0b9FLRimCidl2lvmRqtWy3oP4BI4xPlHmVz74rMtJIaJ3uZj4GvyYwcKMA3FUyVqMT2tzjBNSlUOfSSOgZndBhqn4Z9BZPyN80OafUey6midAy3RvvEbb4coWK1llj27IDT+d2JJfbtimzlM1gchoILfYS+pz6/32lxJ9z6TKsdtojIZA0aUMaCN1WV1hS7bV1x3F75jG+rIj3pFPRVxa7Uyx0mq5mJKvRTUXfgCVj41Mo8gusZqVO6FmfJqvm7gjb9kBkvXw0aFvHtC0sk2T/NXs2EJZ9Bt4LYR55Y5+P1bxvvZgZ8nZazrKK/NymbQDjL4LA6W75Xdi2i6mZrPA/Po/t+hY9VYH3XT6zUsD+NAHXFSurOLoSZ6ee+I8e/TaJqV+lS5PilxS8s7kYdxlSCodV9CcBexiNibghHOMatm5Ougu1WxaFSih5h9SPSgpLVGT14AKWVCSPHoNrRemydU1MTs1r4IqbSItYCfN6U2wre5Ve7JEAAwBhPBR6cu1vHwAAAABJRU5ErkJggg==);
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
</style>
<template>
  <view class="container">
    <view class="imgbox">
      <image class="image1" src="../images/icon_logo@2x.png" alt=""/>
      <view class="tip_wel">Welcome !</view>
      <view class="wx_name">悦合邦社区服务</view>
    </view>
    <button class="btn" open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="onGotUserInfo">微信登入</button>
 </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../utils/http";
import { showSuccessToast, showFailToast } from "../utils/tools";
export default class Authorization extends wepy.page {
  config = {
    navigationBarTitleText: "微信授权",
    navigationBarBackgroundColor: "#009b4c",
    navigationBarTextStyle: "#fff"
  };

  data = {
    path: null,
    shareType: null
  };

  components = {};
  onLoad(options) {
    console.log(options.shopId, "shouquan");
    if (options.path == "/pages/public/publicList") {
      wx.setStorageSync("shopId", options.shopId);
      this.path = `${options.path}?type=${options.type}&gohome=1&shopId=${
        options.shopId
      }`;
    } else if (options.shareType == "bargain") {
      wx.setStorageSync("shopId", options.shopId);
      this.shareType = options.shareType;
    } else {
      wx.setStorageSync("shopId", options.shopId);
      this.path = "/pages/home";
    }
  }
  onShow() {
    this.wxUserInfo = wx.getStorageSync("wxUserInfo") || null;
    if (this.wxUserInfo != null) {
      if (this.path == "/pages/home") {
        wx.switchTab({
          url: "/pages/home"
        });
      } else if (this.shareType == "bargain") {
        wx.navigateBack();
      } else {
        wx.redirectTo({
          url: this.path
        });
      }
    }
  }

  //获取用户信息
  async onGotUserInfo(e) {
    let wxUserInfo = e.detail.userInfo;
    wx.setStorageSync("wxUserInfo", wxUserInfo);
    if (wxUserInfo != null) {
      const res = await shttp
        .post("/api/v1/member/memberinfo")
        .send({
          wx_name: wxUserInfo.nickName,
          wx_avatar: wxUserInfo.avatarUrl
        })
        .end();
      //获取个人资料/api/v1/member4/profile
      const memberRes = await shttp.get(`/api/v1/member/memberinfo`).end();
      let memberInfo = memberRes.data;
      wx.setStorageSync("memberInfo", memberInfo);
      if (this.path == "/pages/home") {
        wx.switchTab({
          url: "/pages/home"
        });
      } else if (this.shareType == "bargain") {
        wx.navigateBack();
      } else {
        wx.redirectTo({
          url: this.path
        });
      }
    }
  }
}
</script>
