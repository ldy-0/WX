<style scoped>
.container {
  font: 32rpx PingFang-SC-Medium;
  background: #fff;
  width: 100%;
  overflow: hidden;
  height: 100vh;
}

.swiper {
  height: 400rpx;
  background: #c6c6d1;
}
.swiper image {
  width: 100%;
  height: 100%;
}

.warp {
  background: #fff;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 26rpx 40rpx;
}
.warp .title {
  font-size: 34rpx;
  line-height: 48rpx;
  color: #333333;
  height: 48rpx;
}
.warp .addtime {
  font-size: 26rpx;
  color: #a9a9a9;
  line-height: 37rpx;
  height: 37rpx;
}
.warp .content {
  font-size: 30rpx;
  color: #222222;
  line-height: 40rpx;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.warp .content .text_img {
  width: 100%;
  height: 400rpx;
}
.warp .content .text_info {
  line-height: 48rpx;
  font-size: 28rpx;
  color: #222222;
  white-space: pre-wrap;
  box-sizing: border-box;
}
.bannerImag{
  width: 100%;
  height: 425rpx;
}

.bannerImag image{
  width: 100%;
  height: 100%;
}
.msg{
  width: 100%;
  box-sizing: border-box;
  padding: 20rpx 30rpx 0;
}
.msg .msgDetail{
  display: flex;
}
.msg .msgDetail image{
  width: 26rpx;
  height: 32rpx;
}
.msg .msgDetail:nth-child(2) image{
  width: 30rpx;
  height: 26rpx;
}
.msg .msgDetail:nth-child(3) image{
  width: 29rpx;
  height: 23rpx;
}
.msg .msgDetail view{
  color: #666;
  font-size: 28rpx;
  margin-left: 16rpx;
  margin-bottom: 25rpx;
}


</style>

<template>
  <view class="container">
    <!-- <swiper
      class="swiper"
      indicator-active-color="{{indicatorActiveColor}}"
      indicator-color="{{indicatorColor}}"
      indicator-dots="{{indicatorDots}}"
      autoplay="{{autoplay}}"
      interval="{{interval}}"
      duration="{{duration}}"
      circular="true"
    >
      <repeat for="{{bannerList}}" key="index" index="index" item="item">
        <swiper-item>
          <image src="{{item.url}}" mode="aspectFill">
        </swiper-item>
      </repeat>
    </swiper> -->
    <view class="bannerImag">
      <image src = "{{companyInfomation.company_image[0]}}"/>
    </view>

    <view class="msg">
      <view wx:for = "{{info}}" wx:key class="msgDetail">
        <view class="info_image"><image src = '{{item.url}}'/></view>
        <view class="info_msg">{{item.msg}}</view>
      </view>
    </view>



    <view class="warp">
      <view class="title">{{detailArticle.dynamic_title}}</view>
      <!-- <view class="addtime">{{detailArticle.dynamic_created_at}}</view>   -->
      <repeat for="{{detailArticle.dynamic_content}}" key="index" index="index" item="itemInfo">
        <view class="content">
          <image
            class="text_img"
            wx:if="{{itemInfo.Repeat_images[0].url}}"
            src="{{itemInfo.Repeat_images[0].url}}"
            mode="aspectFill"
          >
          <view class="text_info">{{itemInfo.Repeat_title}}</view>
        </view>
      </repeat>
    </view>
  </view>
</template>


<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import getTimes from "../../utils/formatedate.js";
export default class AboutUs extends wepy.page {
  config = {
    navigationBarTitleText: "关于"
  };
  data = {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 200,
    indicatorActiveColor: "#333333",
    indicatorColor: "#FFFFFF", //以上为轮播配置
    bannerList: [], //轮播图
    detailArticle: {} ,//案例详情
    companyInfomation:{
        "company_site": "湖北省武汉市", //地址
        "company_phone": "17621696631", //电话
        "company_email": "596230641@qq.com",//邮箱
        "company_name": "佰益源",   //公司名
        "company_content": "美丽的白雪公主受继母的嫉妒而被多次置于死地，最后在七个小矮人和王子的帮助下获得新生。爱慕虚荣、贪恋美貌的王后总是爱问镜子：“魔镜魔镜，谁是这个世界上最美的女人？”当镜子说是白雪公主时，王后就伪装成巫婆，骗白雪公主吃下毒苹果。吃下毒苹果的白雪公主被随后出现的王子救了，最终王子和公主幸福地生活在一起，王后得到了应有的惩罚。",  //简介内容
        "company_image": [
          "../../images/img_1_1@2x.png",
          "../../images/img_1_2@2x.png"
        ],//图片
    },
    info:[
      {
        url:"../../images/icon_9_dianhua@2x.png",
        msg:"18899995555"
      },
      {
        url:"../../images/icon_9_dizhi@2x.png",
        msg:"区国际硚口区国际硚口峰汇A3区国际硚口峰汇A3区国际硚口峰汇A3区国际硚口峰汇A3区国际硚口峰汇A3区国际硚口峰汇A3区国际硚口峰汇A3区国际硚口峰汇A3区国际硚口峰汇A3峰汇A3-402"
      },
      {
        url:"../../images/icon_6_youxiang@2x.png",
        msg:"byy@163.com"
      }
    ]
  };

  components = {};

  onLoad(options) {
    this.getCompanyList();
    this.getCompanyInfomation();
  }

  onShow() {}
  methods = {
    //进入商品详情
    intoDetail(id) {
      // console.log(id)
      wx.navigateTo({
        url: `store/goodsDetails?goods_commonid=${id}`
      });
    }
  };
  //获取公司信息
  async getCompanyInfomation(){
    const res = await shttp
      .get("/api/v2/member/company")
      .end()
      console.log("-----",res.data);
      
  }
  //获取公司列表
  async getCompanyList() {
    const res = await shttp
      .get(`/api/v2/member/dynamic`)
      .query({
        dynamic_type: "company"
      })
      .end();
    let list = res.data;
    if (res.status === 0) {
      if (list.length == 0) {
        wx.hideLoading();
        return wx.showToast({
          title: "暂无公司介绍",
          icon: "none",
          duration: 2000
        });
      } else {
        this.getCompanyDetail(list[0].dynamic_id);
      }
    }
    wx.stopPullDownRefresh();

    this.$apply();
  }
  //获取公司详情
  async getCompanyDetail(id) {
    const res = await shttp.get("/api/v2/member/dynamic/" + id).end();
    if (res.status === 0) {
      this.bannerList = JSON.parse(res.data.dynamic_images);
      this.detailArticle = res.data;
      this.detailArticle.dynamic_content = JSON.parse(res.data.dynamic_content);
      this.detailArticle.dynamic_created_at = getTimes.formatTime(
        res.data.dynamic_created_at * 1000,
        "Y-M-D h:m:s"
      );
    } else {
      wx.hideLoading();
    }
    wx.stopPullDownRefresh();
    wx.hideLoading();
    this.$apply();
  }
}
</script>
