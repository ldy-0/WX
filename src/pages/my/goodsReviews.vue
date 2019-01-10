<style>
page {
  background: #f4f4f4;
}
</style>
<style scoped>
.container {
  background: #f4f4f4;
  margin-bottom: 94rpx;
}
.container .warpGoodList._1653eb4:nth-of-type(odd) {
  box-shadow: 0 -3rpx 5rpx #ddd, 0 3rpx 5rpx #ddd;
}
.container .warpGoodList._1653eb4:nth-of-type(even) {
  box-shadow: 0 3rpx 5rpx #ddd, 0 -3rpx 5rpx #ddd;
}
.container .warpGoodList {
  border-top: solid 1px #efefef;
  border-bottom: solid 1px #efefef;
  margin-bottom: 23rpx;
  background: #fff;
  padding-bottom: 30rpx;
}
.container .warpGoodList .content {
  padding: 20rpx;
}
.container .warpGoodList .content .msgtext {
  width: 100%;
  height: 251rpx;
  font-size: 32rpx;
}
.container .img_div._1653eb4,
.container .addfile {
  width: 162rpx;
  height: 162rpx;
  margin: 19rpx 19rpx 0 0;
  display: flex;
  color: #aeaeae;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.container .img_div .textimg._1653eb4,
.container .addfile .textimg {
  color: #b6b6b6;
  font-size: 22rpx;
  padding-top: 20rpx;
}
.container .img_div .images._1653eb4,
.container .addfile .images {
  width: 100%;
  height: 100%;
}
.container .fileContent {
  width: 100%;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 23rpx;
  display: flex;
}
.container .fileContent .addicon {
  width: 54rpx;
  height: 61rpx;
}
.container .fileContent .addfile {
  border: dashed 2px #d9d9d9;
}
.container .goodsContent {
  box-sizing: border-box;
  margin: 8rpx 20rpx 30rpx 20rpx;
  width: 100%;
  height: auto;
}
.container .goodsContent .goodsSrcList {
  display: flex;
  margin-bottom: 6rpx;
}
.container .goodsContent .goodsImg {
  border-radius: 10rpx;
  width: 160rpx;
  height: 160rpx;
  flex: 0 0 auto;
}
.container .goodsContent .goodsInfo {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 0 10rpx;
  padding: 15rpx 0;
  padding-left: 26rpx;
  background: #fff;
  color: #333333;
  font-size: 28rpx;
}
.container .goodsContent .goodsInfo .prdname {
  width: 525rpx;
  font-size: 28rpx;
  height: 63rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-bottom: 18rpx;
}

.btn_comfir {
  height: 88rpx;
  background: #ff4444;
  bottom: 0rpx;
  width: 600rpx;
  font-size: 36rpx;
  color: #fffefe;
  text-align: center;
  line-height: 88rpx;
  margin: 0 auto;
  border-radius: 10rpx;
}
.attitude {
  height: 100rpx;
  border-top: solid 1rpx #f7f7f7;
  border-bottom: solid 1rpx #f7f7f7;
  display: flex;
  box-sizing: border-box;
  padding-left: 29rpx;
  align-items: center;
  position: relative;
}
.star-image {
  width: 36rpx;
  height: 36rpx;
  margin-right: 10rpx;
  margin-left: 10rpx;
}
.attitude-txt {
  color: #222222;
  font-size: 28rpx;
  margin-right: 21rpx;
}

.fileContent {
  width: 100%;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 23rpx;
  display: flex;
}
.addicon {
  width: 54rpx;
  height: 61rpx;
}
.addfile {
  border: dashed 2px #d9d9d9;
}
.img_div,
.addfile {
  width: 162rpx;
  height: 162rpx;
  margin: 19rpx 19rpx 0 0;
  display: flex;
  color: #aeaeae;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.textimg {
  color: #b6b6b6;
  font-size: 22rpx;
  padding-top: 20rpx;
}
.images {
  width: 100%;
  height: 100%;
}
.img_div {
  position: relative;
}
.cha-img {
  width: 44rpx;
  height: 44rpx;
  position: absolute;
  top: -20rpx;
  right: -20rpx;
}
.prdprice {
  color: #dd3d27;
  font-size: 32rpx;
}
.prdprice text {
  font-size: 28rpx;
}
</style>
<template>
  <view class="container">
    <repeat for="{{goodsList}}" key="index" index="pindex" item="item">
      <view class="warpGoodList">
        <view wx:if="{{true}}" class="goodsContent">
          <view class="goodsSrcList">
            <image class="goodsImg" src="{{item.goods_image}}" mode="aspectFill">
            <view class="goodsInfo">
              <text class="prdname">{{item.goods_name}}</text>
              <view class="prdprice">
                <text>￥</text>
                {{item.goods_pay_price}}
              </view>
            </view>
          </view>
        </view>
        <view class="attitude">
          <text class="attitude-txt">评分</text>
          <repeat for="{{item.stars}}" item="pf" index="index">
            <image
              class="star-image"
              @tap="selectstar"
              data-index="{{index}}"
              data-pindex="{{pindex}}"
              src="{{pf<item.Att?checkedSrc: normscr}}"
            >
          </repeat>
        </view>

        <view class="content">
          <textarea
            class="msgtext"
            bindinput="textVal"
            data-pindex="{{pindex}}"
            maxlength="140"
            placeholder="请输入评论..."
          />
        </view>
        <view class="fileContent">
          <repeat
            wx:if="{{item.cosimgList.length!=0}}"
            for="{{item.cosimgList}}"
            index="index"
            item="url"
          >
            <view class="img_div">
              <image class="images" src="{{url}}" mode="aspectFill">
              <image
                class="cha-img"
                data-index="{{index}}"
                data-pindex="{{pindex}}"
                @tap="clearImg"
                src="../../images/icon_sousuo_cha@2x.png"
                alt
              >
            </view>
          </repeat>
          <view
            class="addfile"
            wx:if="{{item.cosimgList.length<6}}"
            data-pindex="{{pindex}}"
            @tap="choseimg"
          >
            <image class="addicon" src="../../images/img_shangchuan@2x.png">
            <text class="textimg">添加图片</text>
          </view>
        </view>
      </view>
    </repeat>
    <view class="btn_comfir" @tap="comfir({{pindex}})">提交</view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import { uploadSeriesFile, uploadFile } from "../../utils/tencent-cos";
export default class GoodsReviews extends wepy.page {
  config = {
    navigationBarTitleText: "商品评价"
  };
  data = {
    //要评价的商品列表
    goodsList: [],
    //订单
    order: {},
    //以下为星星操作
    //未选择星
    normscr: "../../images/icon_pingfen@2x.png",
    //选择星
    checkedSrc: "../../images/icon_pingfen_hl@2x.png"
  };

  components = {};
  methods = {
    //选择星星
    selectstar(e) {
      let index = e.currentTarget.dataset.index;
      let pindex = e.currentTarget.dataset.pindex;
      this.goodsList[pindex].Att = index + 1;
    },
    choseimg(e) {
      console.log(e);
      let pindex = e.currentTarget.dataset.pindex;
      var that = this;
      wx.chooseImage({
        count: 6 - Number(that.goodsList[pindex].cosimgList.length), // 默认9
        sizeType: ["original"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          let tempFilePaths = res.tempFilePaths;
          console.log(tempFilePaths);
          for (let i = 0; i < tempFilePaths.length; i++) {
            uploadFile(tempFilePaths[i]).then(data => {
              console.log("对象存储图片", data);
              if (that.goodsList[pindex].cosimgList.length > 6) return;
              that.goodsList[pindex].cosimgList.push(data);
              console.log(that.goodsList[pindex].cosimgList);
              that.$apply();
            });
          }
          if (that.goodsList[pindex].cosimgList.length > 6) {
            that.goodsList[pindex].cosimgList = that.cosimgList.slice(0, 6);
          }
        }
      });
    },
    //获取文字信息
    textVal(e) {
      let pindex = e.currentTarget.dataset.pindex;
      this.goodsList[pindex].textMsg = e.detail.value;
    },
    clearImg(e) {
      let index = e.currentTarget.dataset.index;
      let pindex = e.currentTarget.dataset.pindex;
      this.goodsList[pindex].cosimgList.splice(index, 1);
      this.$apply();
    },
    //提交评价
    comfir(idx) {
      this.sendGoodcommit(idx);
    }
  };
  onShow() {}
  onLoad(options) {
    this.order = JSON.parse(decodeURIComponent(options.commitList));
    this.goodsList = this.goodsList.concat(this.order.order_goods);

    this.goodsList.forEach(element => {
      element.stars = [0, 1, 2, 3, 4];
      element.key = 0;
      element.Att = 5;
      element.cosimgList = [];
      element.textMsg = null;
    });
    console.log(this.goodsList);
  }
  sendGoodcommit(pindex) {
    // if (!item.textMsg) {
    //   return wx.showToast({
    //     title: "请填写评论",
    //     icon: "none",
    //     duration: 2000
    //   });
    // }
    this.goodsList.forEach(item => {
      let send = {
        goods_id: item.goods_id,
        order_id: this.order.order_id,
        order_no: this.order.order_sn,
        content: item.textMsg,
        goods_type: "real",
        geval_image: item.cosimgList,
        score: item.Att
      };
      this.sendPost(send);
    });

    this.$apply();
  }
  async sendPost(send) {
    const res = await shttp
      .post(`/api/v2/member/goodsevaluate`)
      .send(send)
      .end();
    if (res.status == 0) {
      wx.showToast({
        title: "评价成功",
        icon: "none",
        duration: 2000
      });
      wx.navigateBack();
    } else if (res.status == 1) {
      wx.showToast({
        title: res.error,
        icon: "none",
        duration: 2000
      });
    }
  }
  events = {};
}
</script>
