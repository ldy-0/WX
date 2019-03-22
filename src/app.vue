<style>
page {
  height: 100%;
  width: 100%;
  font-family: arial, "PingFang SC", "Microsoft Yahei", "Hiragino Sans GB";
  background: rgb(37, 34, 24);
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
      "pages/waiterHome", //SA首页
      "pages/register", //注册
      "pages/activity/activity", // 活动规则
      "pages/rankList/rankList", // 排行榜 
      "pages/story/index", // 品牌故事
      "pages/appointment/index", // 邀约 
      "pages/appointment/poster", // 邀约海报 
      "pages/challenge/index", // 极限挑战
      "pages/challenge/video", // 极限挑战视频
      "pages/limit/index", // 我的挑战
      "pages/limit/record", // 个人挑战记录
      "pages/client/index", // 未注册客户
      "pages/client/draw", // 抽奖
      "pages/client/prizeList", // 奖品列表
      "pages/client/reupload", // 个人重传页面 
      "pages/client/writeInfo", // 填写个人信息
      "pages/client/poster", // 个人抽奖海报 
    ],
    window: {
      backgroundTextStyle: "dark",
      navigationBarBackgroundColor: "#FFFFFF",
      navigationBarTitleText: "",
      navigationBarTextStyle: "black",
      enablePullDownRefresh: false,
      backgroundColor: "#252218",
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
    //微信用户登录换取token，并将token存入本地缓存中
    // const userInfo = await signIn(false);
    // console.error('user', userInfo);

    // if (userInfo.data.code === 1) {
    //   let auth = userInfo.header.Authorization;
    //   wx.setStorageSync("token", auth);

    //   // let url = true ? `/pages/waiterHome` : `/pages/client/index?type=noRegister`;
    //   // wx.navigateTo({ url });
    // }

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

  onHide(){
  }
  /**
   * 设置全局变量
   */
  globalData = {
    adviserTabBarList: [
      { title: "首页", path: '/pages/waiterHome', url: "../images/global/home.png", sel: "../images/global/home_sel.png" },
      { title: "活动规则", path: '/pages/activity/activity', url: "../images/global/register.png", sel: "../images/global/register_sel.png" },
      { title: "排行榜", path: '/pages/rankList/rankList', url: "../images/global/my.png", sel: "../images/global/my_sel.png" },
    ],
    clientTabBarList: [
      { title: "首页", path: '/pages/client/index', url: "../images/global/home.png", sel: "../images/global/home_sel.png" },
      { title: "我的奖品", path: '/pages/client/prizeList', url: "../images/global/register.png", sel: "../images/global/register_sel.png" },
    ],
    tabIndex: 0,
  };
}
</script>
