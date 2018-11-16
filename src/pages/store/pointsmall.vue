<style>
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
  width: 250rpx;
  height: 100%;
  text-align: center;
  background: #f4f4f4;
  overflow-y: scroll;
  overflow-x: hidden;
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
}
.wrap .content_wrap .content_title {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  background: #f4f4f4;
  font-size: 28rpx;
  color: #a8a8a8;
  padding-left: 26rpx;
}
.wrap .content_wrap .row {
  height: 163rpx;
  font-size: 26prx;
  box-sizing: border-box;
  padding: 20rpx 30rpx 19rpx 26rpx;
  display: flex;
  border-bottom: solid 1rpx #e7e7e7;
}
.wrap .content_wrap .row .goodimg {
  width: 121rpx;
  height: 100%;
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
</style>

<template>
  <view class="container">
    <!-- <floatingmenu></floatingmenu> -->
      <view class="wrap">
          <view class="class_list">
              <repeat for="{{classList}}" index="index" item="item">
                <view class="class_item {{ checkedList[index] ? 'sel' : '' }}" @tap="getTwo({{index}})">{{item.psubsection_numerical}}</view>
              </repeat>
          </view>

          <view class="content_wrap">
            <view class="content_title">
                  {{title}}
            </view>
              <repeat for="{{goodsList}}" index="index" item="item">
            <view class="row" @tap="intoDetail({{item.pgoods_id}})"> 
                <!-- <image class="goodimg" src="../images/logo.png"></image>   -->
                <image class="goodimg" src="{{item.pgoods_image[0]||''}}"></image>  
                <view class="goodsInfo">
                    <text class="goodsname">{{item.pgoods_name}}</text> 
                    <text class="price">{{item.pgoods_cost}}</text>
                </view>
            </view>
              </repeat>

          </view>
        
      </view>
  </view>
</template>

<script>
import wepy from "wepy";

import { shttp } from "../../utils/http";
export default class Classify extends wepy.page {
  config = {
    //enablePullDownRefresh: true,
    navigationBarTitleText: "积分商城"
  };
  data = {
    //前面特殊的一级
    topsList: [
      { psubsection_numerical: "全部" },
      { psubsection_numerical: "我可兑换" }
    ],
    // 一级列表
    classList: [],
    //选中效果
    checkedList: [],
    //二级的标题
    title: "",
    //二级的商品列表
    goodsList: []
  };

  computed = {
    //更新视图
    updateTitle() {
      return this.title;
    }
  };

  methods = {
    //进入商品详情
    intoDetail(id) {
      console.log("商品id==>" + id);
      wx.navigateTo({
        url: `./pointGoodsDetail?goods_commonid=${id}`
      });
    },
    //获取二级商品
    getTwo(idx) {
      wx.showLoading({
        title: "加载中"
      });
      this.checkedList.forEach((v, i) => (this.checkedList[i] = false));
      this.checkedList[idx] = true;
      this.title = this.classList[idx].psubsection_numerical;
      let categoryId = this.classList[idx].psubsection_numerical;

      this.getGoods(categoryId);
    }
  };
  //获取全部商品

  //获取该类下面的商品列表
  async getGoods(id) {
    let parmas = {};
    if (id == "全部") {
      parmas = {
        page: 1,
        limit: 10
      };
    } else if (id == "我可兑换") {
      parmas = {
        page: 1,
        limit: 10,
        exchangeable: true
      };
    } else {
      parmas = {
        subsection: id,
        page: 1,
        limit: 10
      };
    }

    let result = await shttp
      .get(`/api/v1/member/integralgoods`)
      .query(parmas)
      .end();
    // console.log("商品列表")
    //  console.log(result.data)
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
      let goodsArr = result.data;
      this.goodsList = this.toJSON(goodsArr);
      //  console.log("格式化后的列表")
      //  console.log(this.goodsList)
    }

    this.$apply();
  }

  components = {};

  async onLoad() {
    wx.showLoading({
      title: "加载中"
    });
    //获取一级分类
    this.getRootCateTopLevel();
  }
  async getRootCateTopLevel() {
    let res = await shttp.get(`/api/v1/member/getsubsection`).end();
    console.log("进去getcate返回结果");
    console.log(res.data);
    res.data.forEach((v, i) => {
      this.classList.push(v);
      this.checkedList[i] = false;
    });

    this.classList = this.topsList.concat(this.classList);
    console.log(this.classList);
    this.checkedList[0] = true;
    this.title = this.classList[0].psubsection_numerical;
    // let oneid = this.classList[0].psubsection_numerical;
    let result = await shttp
      .get(`/api/v1/member/integralgoods`)
      .query({
        page: 1,
        limit: 100000
      })
      .end();
    if (result.data.length == 0) {
      wx.hideLoading();
      wx.showToast({
        title: "暂无相关商品",
        icon: "none",
        duration: 1000
      });
    } else {
      wx.hideLoading();
      let goodsArr = result.data;
      this.goodsList = this.toJSON(goodsArr);
      //   console.log("格式化后的列表")
      //   console.log(this.goodsList)
    }

    this.$apply();
  }
  // 格式化数据
  toJSON(arr) {
    //  console.log("进来的对象")
    //console.log(arr)
    if (arr.length == 0) return [];
    let array = [];
    for (let i = 0; i < arr.length; i++) {
      let obj = {};
      for (var key in arr[i]) {
        if (key == "pgoods_image") {
          if (arr[i][key]) {
            // console.log(arr[i][key])
            obj[key] = JSON.parse(arr[i][key]);
          } else {
            obj[key] = "";
          }
        } else {
          obj[key] = arr[i][key];
        }
      }

      array.push(obj);
    }
    // console.log("返回的对象")
    return array;
  }
}
</script>

