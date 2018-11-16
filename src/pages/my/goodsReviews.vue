<style scoped>
.tips {
  width: 100%;
  text-align: center;
  line-height: 100rpx;
  font-size: 30rpx;
}

.link-list > navigator {
  position: relative;
  margin: 5rpx 0;
  padding-right: 50rpx;
  line-height: 88rpx;
  background: white;
}

.link-list text {
  display: block;
  text-indent: 20rpx;
  font-size: 32rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.link-list image {
  width: 16rpx;
  height: 25rpx;
  margin-top: -12rpx;
  position: absolute;
  right: 20rpx;
  top: 50%;
}

.search {
  overflow: hidden;
  height: 108rpx;
  font: 28rpx PingFang-SC-Medium;
  color: #969696;
  background: #fff;
  text-align: center;
}
.search .search_content {
  width: 690rpx;
  line-height: 68rpx;
  margin: 20rpx auto;
  border-radius: 34rpx;
  background: #f2f2f2;
}

.search_text {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-search {
  width: 40rpx;
  height: 40rpx;
}

.nodata {
  margin-top: 50%;
  font-size: 38rpx;
  text-align: center;
}

.wire-gray {
  height: 20rpx;
  width: 100%;
  background: #f4f4f4;
}

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
  border-radius: 10rpx 0rpx 0rpx 10rpx;
  width: 160rpx;
  height: 160rpx;
  flex: 0 0 auto;
}
.container .goodsContent .goodsInfo {
  border-radius: 0 10rpx;
  padding-left: 26rpx;
  background: #f4f4f4;
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
</style>
<template>
  <view class="container">
  <repeat for="{{goodsList}}" key="index" index="index" item="item">
    <view class="warpGoodList">
      <view class="content">
      <textarea class="msgtext"  bindinput="textVal" data-num="{{index}}" maxlength="140" placeholder="请输入评论..." />
      </view>
      <view class="fileContent">
        <repeat for="{{localimgList[index]}}" key="index" index="index" item="item">  
          <view class="img_div">
             <image class="images" src="{{item}}"></image>
          </view>
        </repeat>
        <!-- <view class="addfile" @tap="choseimg({{index}})">
          <image class="addicon" src="../../images/icon_tianjiatupian@2x.png"></image>
          <text class="textimg">添加图片</text>
        </view> -->
      </view>
      <view wx:if="{{true}}" class="goodsContent">
         <view class="goodsSrcList">
            <image  class="goodsImg" src="{{item.goods_image}}" ></image>
            <view class="goodsInfo">
              <text class="prdname">{{item.goods_name}}</text>
            </view>
         </view>
      </view>
      <view class="btn_comfir"  @tap="comfir({{item}},{{index}})">提交</view>
    </view>
   </view> 
   </repeat>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import { uploadSeriesFile } from "../../utils/tencent-cos";
export default class GoodsReviews extends wepy.page {
  config = {
    navigationBarTitleText: "商品评价"
  };
  data = {
    //评论内容
    textMsg: [],
    //send图片路径列表
    imgList: [],
    //本地路径
    // localimgList: [],
    //要评价的商品列表
    goodsList: [
      // { goods_name: "牛奶", goods_image: "../../images/admin_code.png" },
      // { goods_name: "蒙牛", goods_image: "../../images/admin_code.png" }
    ],
    //订单
    order: {}
  };

  components = {};
  methods = {
    //获取文字信息
    textVal(e) {
      // console.log("评论文字")
      // console.log(e)
      this.textMsg[e.currentTarget.dataset.num] = e.detail.value;
      // console.log(this.textMsg)
    },
    //继续添加图片
    choseimg(idx) {
      let that = this;
      wx.chooseImage({
        count: 9, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          console.log("图片选择成功");
          console.log(res);
          //  console.log(that.imgList);
          //    console.log(res.tempFilePaths);
          let arr = [];
          arr = res.tempFilePaths;
          //  that.localimgList[idx] = that.localimgList[idx].concat(filepath);
          console.log("图片");
          console.log(arr);
          // that.events.upimg(filepath, that);
          let result = uploadSeriesFile(arr);
          console.log("返回的结果");
          console.log(result);
          that.$apply();
        }
      });
    },
    //提交评价
    comfir(item, idx) {
      // console.log(item)
      // console.log(this.order)
      // console.log(this.textMsg)
      // return
      this.sendGoodcommit(item, idx);
      // wx.navigateTo({
      //   url: "./assessed"
      // });
    }
  };
  async sendGoodcommit(item, idx) {
    if (!this.textMsg[idx]) {
      return wx.showToast({
        title: "请填写评论",
        icon: "none",
        duration: 2000
      });
    }
    this.commentList = [];
    const res = await shttp
      .post(`/api/v1/member/goods_evaluate`)
      .send({
        goods_id: item.goods_id,
        order_id: this.order.order_id,
        order_no: this.order.order_sn,
        content: this.textMsg[idx],
        goods_type: "real"
      })
      .end();

    console.log("评价结果");
    console.log(res);
    return;
    if (res.data) {
      this.commentList = res.data;
    } else {
      wx.showToast({
        title: "暂无相关评论",
        icon: "none",
        duration: 2000
      });
    }
    this.$apply();
  }
  onShow(options) {}
  onLoad(options) {
    this.order = JSON.parse(decodeURIComponent(options.commitList));
    this.goodsList = this.goodsList.concat(this.order.order_goods);
    console.log(this.goodsList);
    return;
    for (let i = 0; i < this.goodsList.length; i++) {
      let arr = [];
      this.localimgList.push(arr);
    }
    console.log("二维数组");
    console.log(this.localimgList);
    //  this.localimgList
  }
  events = {
    //上传图片
    upimg(imgurl, that) {
      wx.uploadFile({
        url: "http://106.14.145.66:3000/v1/public/file",
        filePath: imgurl[0],
        name: "images",
        success: function(res) {
          console.log("成功上传返回");
          let backimg = JSON.parse(res.data);
          that.imgList = that.imgList.concat(backimg.result);
          console.log(that.imgList);
          wx.hideLoading();
        }
      });
    }
  };
}
</script>
