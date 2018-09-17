<style lang="sass">
page
  height: 100%
  width: 100%
  font-family: arial, 'PingFang SC', 'Microsoft Yahei', 'Hiragino Sans GB'
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
      "pages/index1",
      "pages/index2",
      "pages/index3",
    ],
    window: {
      backgroundTextStyle: "dark",
      navigationBarBackgroundColor: "#FFFFFF",
      navigationBarTitleText: "",
      navigationBarTextStyle: "black",
      enablePullDownRefresh: false,
      backgroundColor: "#EFEFEF"
    },
    tabBar: {
      color: "#888888",
      selectedColor: "#888888",
      backgroundColor: "#ffffff",
      borderStyle: "block",
      list: [
        {
          pagePath: "pages/index1",
          text: "index1",
          iconPath: "images/tab_shouye_yellow@2x.png",
          selectedIconPath: "images/tab_shouye@2x.png"
        },
        {
          pagePath: "pages/index2",
          text: "index2",
          iconPath: "images/tab_gouwuche@2x.png",
          selectedIconPath: "images/tab_gouwuche_yellow@2x.png"
        },
        {
          pagePath: "pages/index3",
          text: "index3",
          iconPath: "images/tab_wode@2x.png",
          selectedIconPath: "images/tab_wode_yellow@2x.png"
        }
      ]
    },
    networkTimeout: {
      request: 10000,
      downloadFile: 10000
    }
  };

  globalData = {
    userInfo: {}
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
    }
  }
}
</script>
