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
  background: #f4f4f4;
  height: 100%;
}

.search_wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font: 28rpx PingFangSC-Regular;
  background: #fff;
}
.search_wrap .search {
  color: #888;
}
.search_wrap .search .search_content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  width: 607rpx;
  line-height: 60rpx;
  height: 60rpx;
  border-radius: 30rpx;
  text-align: left;
  background: #f7f7f7;
}
.search_wrap .search .search_content image {
  width: 23rpx;
  height: 25rpx;
}
.search_wrap .search .search_content .search_text {
  width: 500rpx;
  font-size: 26rpx;
}
.search_wrap .cancle {
  color: #636363;
  height: 108rpx;
  line-height: 108rpx;
  width: 100rpx;
  text-align: center;
}

.search_history {
  position: absolute;
  top: 238rpx;
  width: 100%;
  color: #666;
  background: #ededed;
}
.search_history .search_history_item {
  line-height: 90rpx;
  margin: 4rpx 0;
  padding-left: 30rpx;
  background: #fff;
}

.history {
  font-size: 26rpx;
  color: #888;
  padding: 0 30rpx;
  width: 100%;
  box-sizing: border-box;
}
.history .history_title {
  display: flex;
  justify-content: space-between;
  margin: 30rpx 0;
}
.history .history_title image {
  width: 29rpx;
  height: 29rpx;
}
.history .history_list .history_item {
  display: inline-block;
  line-height: 50rpx;
  margin: 10rpx 30rpx 10rpx 0rpx;
  padding: 5rpx;
  border: 1rpx solid #636363;
  border-radius: 4rpx;
}
</style>
<template>
  <view class="container">
      
      <view class="search_wrap">
          <view class="search">
              <view class="search_content">
                <image src='../../images/icon_sousuo@2x.png' />
                <input class="search_text" bindinput='getInput' auto-focus="true" placeholder="搜索商品"  />
              </view>
          </view>
          <view class="cancle" @tap='search()'>搜索</view>
      </view>

      <view class="history" wx:if="{{isHave}}">
          <view class="history_title">
              <view>历史记录</view>
              <image src="../../images/shanchu_shdz_icon@2x.png" class="delete" @tap="deleteHistory()" />
          </view>
          <view class="history_list">
              <repeat for="{{sercherStorageList}}" key="index" item="item">
                <view class="history_item" @tap="click({{item.name}})">{{item.name}}</view>
              </repeat>
          </view>
      </view>
  </view>  
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";

export default class searchPage extends wepy.page {
  config = {
    navigationBarTitleText: "搜索"
  };
  data = {
    //搜索框内容
    inputVal: "",
    //历史记录列表
    sercherStorageList: [],
    //是否显示历史记录
    isHave: false
  };
  onShow() {
    console.log("缓存");
    this.sercherStorageList = this.openLocation();
    if (this.sercherStorageList.length != 0) {
      this.isHave = true;
    }
    console.log(this.sercherStorageList);
  }
  components = {};

  computed = {};

  methods = {
    //获取输入框内容
    getInput(e) {
      this.inputVal = e.detail.value;
    },
    //开始搜索，并记录历史
    search(e) {
      let serVal = this.inputVal;
      if (serVal) {
        this.searchHistory(serVal);
        this.startSearch(serVal);
      }
    },
    // 历史记录点击回掉函数
    click(name) {
      console.log(name);
      wx.navigateTo({
        url: "../store/searchResult?name=" + name
      });
    },
    deleteHistory() {
      wx.setStorageSync("searchData", []);
      this.sercherStorageList = [];
      this.$apply();
    }
  };
  //以下为自定义方法
  async startSearch(name) {
    wx.navigateTo({
      url: "../store/searchResult?name=" + name
    });
  }
  //获取缓存
  openLocation() {
    let res = wx.getStorageSync("searchData") || [];
    return res;
  }
  //添加缓存
  searchHistory(serVal) {
    let res = this.judgeRepeat(serVal);
    if (!res) return;
    let searchData = this.sercherStorageList;
    if (searchData.length > 4) {
      searchData.shift();
    }
    searchData.push({
      id: this.sercherStorageList.length,
      name: serVal
    });
    wx.setStorageSync("searchData", searchData);
  }

  //如果搜索结果与本地存储相同， 则不行存储

  judgeRepeat(serVal) {
    let repeat_bool = true;
    for (let i = 0; i < this.sercherStorageList.length; i++) {
      if (this.sercherStorageList[i].name == serVal) {
        repeat_bool = false;
      }
    }
    return repeat_bool;
  }
}
</script>
