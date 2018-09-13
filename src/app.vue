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
import { SHOPID } from "./constant/configConstant";
export default class extends wepy.app {
  config = {
    pages: [
      "pages/authorization", //授权页
      "pages/home", //首页
      "pages/shoppingCart", //购物车
      "pages/mine", //我的
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
          pagePath: "pages/home",
          text: "首页",
          iconPath: "images/tab_shouye_yellow@2x.png",
          selectedIconPath: "images/tab_shouye@2x.png"
        },
        {
          pagePath: "pages/shoppingCart",
          text: "购物车",
          iconPath: "images/tab_gouwuche@2x.png",
          selectedIconPath: "images/tab_gouwuche_yellow@2x.png"
        },
        {
          pagePath: "pages/mine",
          text: "我的",
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
    const userInfo = await signIn(false);
    if (userInfo.status === 0) {
      let auth = userInfo.data.token;
      let cartNum = userInfo.data.cart_num;
      wx.setStorageSync("token", auth);
      wx.setStorageSync("cartNum", cartNum);
    }
    if (SHOPID) {
      wx.setStorageSync("shopId", SHOPID);
    } else {
      wx.removeStorageSync("shopId");
    }

    // const memberSelf = await shttp.get("/v1/member/self").end();
    // if (memberSelf.status == "success") {
    //   let data = memberSelf.result;
    //   wx.setStorageSync("memberSelf", data);
    // }
  }
}
</script>
