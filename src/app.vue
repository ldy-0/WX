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
      "pages/home", //首页
      "pages/classify", //商品分类
      "pages/shoppingCart", //购物车
      "pages/mine", //我的
      "pages/article/search", //搜索
      "pages/store/searchResult", //搜索结果
      // "pages/shopList", //店铺列表页
      "pages/article/advertisingPage", //banner跳转页
      "pages/store/more", //推荐更多
      "pages/store/goodsList", //商品列表
      "pages/store/goodsDetails", //商品详情
      "pages/store/pointGoodsDetail", //积分商品详情
      "pages/store/firmOrder", //提交订单（购买)
      "pages/store/commentList", //评价表
      "pages/store/bought", //购买完成
      "pages/store/grouponItem", // 每个团购详情展示
      "pages/store/groupon", //店铺商品团购列表
      //   "pages/store/pointbought",//积分购买完成
      //  "pages/store/pointorderdetail",//积分订单详情
      "pages/store/orderdetail", //订单详情
      "pages/store/selectreturn", //选择退款还是退货
      "pages/store/refund", //退款
      "pages/store/refundDetail", //退款详情
      "pages/store/retundgood", //退货
      "pages/store/retundGoodDetail", //退货详情
      "pages/outWeb",//外链
      "pages/my/addressList", //收货地址列表
      "pages/my/addAddress", //收货地址编辑
      "pages/my/orderList", //订单列表
      "pages/my/aftersale", //售后管理
      "pages/my/collectList", //我的收藏
      //  "pages/my/sharepage", //分销页面
      "pages/my/goodsReviews", //商品评价
      "pages/my/assessed", //商品评价完成
      "pages/my/groupbuyList", //团购列表
      "pages/my/groupbuyDatail", //团购详情
      "pages/article/aboutUs", //关于云仓
      "pages/article/advisory", //新闻资讯
      "pages/article/videos", //视频列表
      "pages/article/couponList", //优惠券列表
      "pages/article/advisoryDetail", //新闻资讯详情
      "pages/article/caseDetail" //案例详情
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
      color: "#8e8e8e",
      selectedColor: "#f17f30",
      backgroundColor: "#ffffff",
      borderStyle: "block",
      list: [
        {
          pagePath: "pages/home",
          text: "首页",
          iconPath: "./images/tab_shouye@2x.png",
          selectedIconPath: "./images/tab_shouye_hl@2x.png"
        },
        {
          pagePath: "pages/classify",
          text: "分类",
          iconPath: "./images/tab_fenlei@2x.png",
          selectedIconPath: "./images/tab_fenlei_hl@2x.png"
        },
        {
          pagePath: "pages/shoppingCart",
          text: "购物车",
          iconPath: "./images/tab_gouwuche@2x.png",
          selectedIconPath: "./images/tab_gouwuche_hl@2x.png"
        },
        {
          pagePath: "pages/mine",
          text: "我的",
          iconPath: "./images/tab_wode@2x.png",
          selectedIconPath: "./images/tab_wode_hl@2x.png"
        }
      ]
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
