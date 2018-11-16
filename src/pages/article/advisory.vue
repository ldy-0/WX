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
  background: #fff;
}

.flex {
  display: flex;
  align-items: center;
}
.flex image {
  margin-left: 20rpx;
}
.flex .pageInfo {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  height: 142rpx;
}
.flex .pageInfo .title {
  font-size: 28rpx;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 420rpx;
}
.flex .pageInfo view {
  height: 30rpx;
  width: 497rpx;
  line-height: 30rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.flex .pageInfo .time {
  font-size: 26rpx;
  color: #a9a9a9;
}

.arrow {
  width: 16rpx;
  height: 26rpx;
}
.arrow image {
  width: 43rpx;
  height: 42rpx;
  margin-top: 30rpx;
}

.row_between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  line-height: 192rpx;
  height: 192rpx;
  padding: 0 30rpx;
  border-bottom: 1rpx solid #eeeeee;
  background: #fff;
  font-size: 25rpx;
  color: #aaaaaa;
}
.row_between .icon {
  width: 224rpx;
  height: 150rpx;
  margin-right: 15rpx;
}
</style>  

<template>
  <view class='container'>
  
    <view class='my_manage'>
      <repeat for='{{articleList}}' item='item'>
          <view class='row_between'   @tap="gotoNews({{item.dynamic_id}})" >
              <view class='flex'>
                  <image class='icon' src='{{item.dynamic_images[0].url}}' />
                  <view class="pageInfo">
                      <view class="title">{{item.dynamic_title}}</view>
                      <view >{{item.dynamic_created_at}}</view>
                  </view>
              </view>
              <image class='arrow' src='../../images/icon_zuojiantou@2x.png' />
          </view>
      </repeat>
    </view>

    <!--暂无数据显示-->
    <placeholder :show.sync="is_empty" message="还没有相关的内容"></placeholder>
  </view>
</template>

<script>
import wepy from "wepy";

import Placeholder from "../../components/placeholder";
import getTimes from "../../utils/formatedate.js";
import { shttp } from "../../utils/http";
export default class Mine extends wepy.page {
  config = {
    navigationBarTitleText: "新闻资讯"
  };
  data = {
    //显示提示的
    is_empty: false,
    //文章列表
    articleList: [],
    //默认第一页
    page: 1
  };

  components = {
    placeholder: Placeholder
  };

  onLoad(options) {
    //获取文章列表
    this.getArticleList();
    this.$apply();
  }
  //上拉加载更多
  onReachBottom() {
    this.page = this.page + 1;
    //获取文章列表
    this.getArticleList();
  }
  onShow() {}
  //获取文章列表
  async getArticleList() {
    wx.showLoading({
      title: "加载中..."
    });
    const res = await shttp
      .get(`/api/v2/member/dynamic`)
      .query({
        dynamic_type: "news",
        limit: 1000
      })
      .end();
    console.log(res);
    this.articleList = this.toJSON(res.data);
    console.log(this.articleList);
    if (this.articleList.length == 0) {
      this.is_empty = true;
    } else {
      this.is_empty = false;
    }
    wx.hideLoading();
    this.$apply();
  }

  methods = {
    //进入新闻详情
    gotoNews(id) {
      wx.navigateTo({
        url: "./advisoryDetail?id=" + id
      });
    }
  };
  // 格式化数据
  toJSON(arr) {
    //  console.log("进来的对象")
    //  console.log(arr)
    if (arr.length == 0) return [];
    let array = [];
    for (let i = 0; i < arr.length; i++) {
      let obj = {};
      for (var key in arr[i]) {
        if (key == "dynamic_images") {
          if (arr[i][key]) {
            // console.log(arr[i][key])
            obj[key] = JSON.parse(arr[i][key]);
          } else {
            obj[key] = "";
          }
        } else if (key == "dynamic_created_at") {
          obj[key] = getTimes.formatTime(arr[i][key] * 1000, "Y-M-D h:m:s");
          //      console.log(obj[key])
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