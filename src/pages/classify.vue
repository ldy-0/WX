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
  height: 100%;
  font: 28rpx PingFang-SC-Medium;
}

.wrap {
  display: flex;
  height: 100%;
  background: #eee;
}
.wrap .class_list {
  width: 195rpx;
  height: 100%;
  text-align: center;
  background: #f4f4f4;
  overflow-y: scroll;
  overflow-x: hidden;
  flex-shrink: 0;
}
.wrap .class_list .class_item {
  line-height: 110rpx;
  height: 110rpx;
  color: #222222;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.wrap .class_list .sel {
  border-left: solid 4px #ff4444;
  background: #fff;
}
.wrap .content_wrap {
  flex-grow: 1;
  background: #fff;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 20rpx 0 20rpx 20rpx;
}
.wrap .content_wrap .row {
  height: 320rpx;
  font-size: 26prx;
  width: 250rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-right: 15rpx;
  overflow: hidden;
  margin-bottom: 15rpx;
  border-radius: 10rpx;
  box-shadow: 0 1px 1px #ddd;
}
.wrap .content_wrap .row .goodimg {
  width: 250rpx;
  height: 200rpx;
  flex-shrink: 0;
  margin-right: 21rpx;
  background: gray;
}
.wrap .content_wrap .row .goodsInfo {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.wrap .content_wrap .row .goodsInfo .goodsname {
  max-height: 100rpx;
  min-height: 70rpx;
  color: #666666;
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.wrap .content_wrap .row .goodsInfo .price {
  height: 40rpx;
  line-height: 40rpx;
  color: #ff4444;
}

.search {
  height: 96rpx;
  background: #f4f4f4;
}
.search .search_content {
  display: flex;
  align-items: center;
  width: 93%;
  height: 60rpx;
  border-radius: 30rpx;
  background: #fff;
}
.search .search_content image {
  width: 23rpx;
  height: 25rpx;
  margin-left: 31rpx;
  margin-right: 2%;
}
</style>

<template>
  <view class="container">
     <!-- <floatingmenu></floatingmenu> -->
      <view class="search">
          <navigator url="./article/search" class="search_content" >
          <image src='../images/icon_sousuo@2x.png' class="iconfont icon-search" /> 
          <text>搜索商品</text>
          </navigator>
      </view>
      <view class="wrap">
          <view class="class_list">
              <repeat for="{{classList}}" index="index" item="item">
                <view class="class_item {{ checkedList[index] ? 'sel' : '' }}" @tap="getTwo({{index}})">{{item.storegc_name}}</view>
              </repeat>
          </view>
            <scroll-view scroll-y style="height: 100%">
          <view class="content_wrap">
    
              <repeat for="{{goodsList}}" index="index" item="item">
            <view class="row" @tap="intoDetail({{item.goods_commonid}})"> 
                <!-- <image class="goodimg" src="../images/logo.png"></image>   -->
                <image class="goodimg"  mode='aspectFill' src="{{item.goods_image}}"></image>  
                <view class="goodsInfo">
                    <text class="goodsname">{{item.goods_name}}</text> 
                    <text class="price">￥{{item.goods_price}}</text>
                </view>
            </view>
              </repeat>

          </view>
        </scroll-view>
      </view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../utils/http";
import Floatingmenu from "../components/floatingmenu";
export default class Classify extends wepy.page {
  config = {
    enablePullDownRefresh: true,
    navigationBarTitleText: "分类"
  };
  data = {
    // 一级列表
    classList: [],
    //选中效果
    checkedList: [],
    //二级的标题
    title: "",
    //二级的商品列表
    goodsList: [],
    //当前页面
    page: 1,
    //当前一级类id
    topId: ""
  };

  computed = {
    //更新视图
    updateTitle() {
      return this.title;
    }
  };
  //下拉刷新
  onPullDownRefresh() {
    this.getRootCateTopLevel();
  }
  //上拉触底事件
  // onReachBottom() {
  //   console.log(this.goodsList)
  //   if (this.goodsList.length < 10) return;
  //      wx.showLoading({
  //       title: "加载更多"
  //     });
  // }
  methods = {
    //进入商品详情
    intoDetail(id) {
      // console.log("商品id=>"+id)
      wx.navigateTo({
        url: `./store/goodsDetails?goods_commonid=${id}`
      });
    },
    //获取二级商品
    getTwo(idx) {
      this.page = 1;
      wx.showLoading({
        title: "加载中"
      });
      this.checkedList.forEach((v, i) => (this.checkedList[i] = false));
      this.checkedList[idx] = true;
      //console.log(this.checkedList)
      console.log(this.classList);
      this.title = this.classList[idx].storegc_name;
      this.topId = this.classList[idx].storegc_id;
      this.getGoods();
    }
  };
  async getGoods() {
    console.log("当前一级id");
    console.log(this.topId);
    let result = await shttp
      .get(`/api/v2/member/goodscommon?store_id=1`)
      .query({
        gc_id: this.topId,
        page: this.page,
        limit: 1000
      })
      .end();
    //  console.log("商品")
    //   console.log(result.data)
    if (result.data.length == 0) {
      wx.hideLoading();
      wx.showToast({
        title: "暂无相关商品",
        icon: "none",
        duration: 1000
      });
      this.goodsList = [];
      this.$apply();
    } else {
      wx.hideLoading();
      this.goodsList = result.data;
    }

    this.$apply();
  }
  components = {
    floatingmenu: Floatingmenu
  };

  async onLoad() {
    wx.showLoading({
      title: "加载中"
    });
    //获取一级分类
    this.getRootCateTopLevel();
  }
  async getRootCateTopLevel() {
    wx.showLoading({
      title: "加载中"
    });
    let res = await shttp.get(`/api/v2/member/storegc/1`).end();
    //  console.log("进去getcate返回结果");
    //  console.log(res.data);
    this.classList = [];
    this.checkedList = [];
    res.data.forEach((v, i) => {
      this.classList.push(v);
      this.checkedList[i] = false;
    });
    this.checkedList[0] = true;
    this.title = this.classList[0].storegc_name;
    let oneid = this.classList[0].storegc_id;
    let result = await shttp
      .get(`/api/v2/member/goodscommon?store_id=1`)
      .query({
        gc_id: oneid,
        page: 1
      })
      .end();
    //   console.log("商品")
    //    console.log(result)
    this.goodsList = result.data;
    wx.hideLoading();
    wx.stopPullDownRefresh();
    this.$apply();
  }
}
</script>

