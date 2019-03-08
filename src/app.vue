<style>
page {
  height: 100%;
  width: 100%;
  font-family: arial, "PingFang SC", "Microsoft Yahei", "Hiragino Sans GB";
}
</style>

<script>
import wepy from "wepy";
import "wepy-async-function";
import { shttp } from "./utils/http";
import { signIn } from "./utils/user-tools";
export default class extends wepy.app {
  config = {
    pages: [
      "pages/authorization", //授权页
      "pages/register", //注册
      "pages/waiterHome", //首页1
    ],
    window: {
      backgroundTextStyle: "dark",
      navigationBarBackgroundColor: "#FFFFFF",
      navigationBarTitleText: "",
      navigationBarTextStyle: "black",
      enablePullDownRefresh: false,
      backgroundColor: "#EFEFEF",
      navigationStyle: "custom"
    },
    networkTimeout: {
      request: 10000,
      downloadFile: 10000
    }
  };
  constructor() {
    // inject async await function
    super();
    this.use("requestfix");
    this.use("promisify");
  }

  async onLaunch() {
    console.log("onLaunch");
    //微信用户登录换取token，并将token存入本地缓存中
    const userInfo = await signIn(false);
    if (userInfo.status === 0) {
      let auth = userInfo.data.token;
      wx.setStorageSync("token", auth);
      const memberRes = await shttp.get("/api/v2/member/memberinfo").end();
      let storageInfo = wx.getStorageSync("memberInfo");
      let memberInfo = {
        member_id: memberRes.data.member_id,
        member_points: memberRes.data.member_points,
        wx_avatar: storageInfo.wx_avatar ? storageInfo.wx_avatar : null,
        wx_name: storageInfo.wx_name ? storageInfo.wx_name : null,
        member_mobile: memberRes.data.member_mobile
      };
      wx.setStorageSync("memberInfo", memberInfo);
    }
    const updateManager = wx.getUpdateManager();

    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate);
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function() {
          wx.showModal({
            title: "更新提示",
            content: "新版本已经准备好，是否重启应用？",
            success: function(res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate();
              }
            }
          });
        });
        updateManager.onUpdateFailed(function(res) {
          // 新版本下载失败
          console.log(res);
        });
      }
    });
  }
  /**
   * 设置全局变量
   */
  globalData = {
    authorizationStyle: "1" //1: 强制需要用户微信信息和强制手机授权 //手机号验证白名单10987654321，验证码随意，如1111
    //2：强制需要用户微信信息和不强制手机授权
    //3：强制需要用户微信信息和不需要手机授权
    //4：不强制需要用户微信信息和强制手机授权
    //5：不强制需要用户微信信息和不强制手机授权
    //6：不强制需要用户微信信息和不需要手机授权
    //7：不需要用户微信信息和强制手机授权
    //8：不需要用户微信信息和不强制手机授权
    //9：不需要用户微信信息和不需要手机授权
  };
}
</script>
