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
  min-height: 100%;
  font: 28rpx PingFangSC-Medium;
  background: #fff;
}

.wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 88rpx;
}
.wrap .search {
  display: flex;
  align-items: center;
  width: 580rpx;
  height: 56rpx;
  padding: 0 30rpx;
  border-radius: 30rpx;
  background: #f7f7f7;
}
.wrap .search .search_content {
  flex-grow: 1;
  background: #f7f7f7;
  text-align: left;
  padding: 0 18rpx;
}
.wrap .search .icon_search {
  width: 23rpx;
  height: 25rpx;
  flex-shrink: 0;
}
.wrap .search .icon_cancle {
  width: 30rpx;
  height: 30rpx;
  flex-shrink: 0;
}
.wrap .cancle {
  color: #636363;
  height: 108rpx;
  line-height: 108rpx;
  width: 100rpx;
  text-align: center;
}

.bodycontent {
  width: 100%;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 23rpx 17rpx;
  display: flex;
  background: #fff;
}
.bodycontent .redlist {
  background: #fff;
  width: 345rpx;
  height: 530rpx;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 10rpx 10rpx 0 0;
  margin-right: 20rpx;
  margin-bottom: 19rpx;
  border: solid 1px #f6f6f6;
}
.bodycontent .title_page {
  width: 100%;
  height: 350rpx;
  background: gray;
}
.bodycontent .redinfo {
  display: flex;
  align-items: center;
  padding-left: 21rpx;
  padding-right: 25rpx;
  position: relative;
}
.bodycontent .redinfo .prdname {
  width: 100%;
  font-size: 28rpx;
  height: 73rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.bodycontent .price {
  padding: 35rpx 0rpx 28rpx 20rpx;
  color: #ff4444;
  font-size: 36rpx;
}
</style>

<template>
  <view class="container">
    <view class="wrap">
      <view class="search">
        <image class="icon_search" src="../../images/icon_sousuo@2x.png">
        <input class="search_content" value="{{iptValue}}" bindinput="getInput">
        <image class="icon_cancle" src="../../images/icon_sousuo_cha@2x.png" @tap="clear">
      </view>
      <view class="cancle" @tap="search">搜索</view>
    </view>

    <view class="bodycontent">
      <repeat for="{{goodList}}" key="index" index="index" item="item">
        <view class="redlist" @tap="intoDetail({{item.goods_commonid}})">
          <image class="title_page" src="{{item.goods_image}}" mode="aspectFill">
          <view class="redinfo">
            <text class="prdname">{{item.goods_name}}</text>
          </view>
          <view class="price">
            <text wx:if="{{item.is_vip}}">{{item.goods_price}}德分</text>
            <text wx:else>￥{{item.goods_price}}</text>
          </view>
        </view>
      </repeat>
    </view>

    <!--暂无数据显示-->
    <placeholder :show.sync="is_empty" message="暂无相关商品呢"></placeholder>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import Placeholder from "../../components/placeholder";
export default class Result extends wepy.page {
  data = {
    //空结果提示
    is_empty: false,
    //商品列表
    goodList: [],
    //搜索内容
    iptValue: "",
    storegc_id: null,
    //历史记录列表
    sercherStorageList: []
  };

  computed = {};

  components = {
    placeholder: Placeholder
  };

  methods = {
    //进入商品详情
    intoDetail(id) {
      wx.navigateTo({
        url: `./goodsDetails?goods_commonid=${id}`
      });
    },
    //获取输入框内容
    getInput(e) {
      this.iptValue = e.detail.value;
    },
    //清空输入框
    clear() {
      this.iptValue = "";
      this.$apply();
    },
    //开始搜索，并记录历史
    search(e) {
      console.log("开始搜索");
      let serVal = this.iptValue;
      console.log(serVal);
      if (serVal) {
        this.searchHistory(serVal);
        this.startSearch(serVal);
      }
    }
  };
  async onLoad(option) {
    this.iptValue = option.name;

    if(option.storegc_id){
      this.storegc_id = option.storegc_id;
      return this.searchByClass();
    }

    this.startSearch(this.iptValue);
  }

  async searchByClass(){
    wx.showLoading({ title: 'Loading...' });

    let param = {
      gc_id: this.storegc_id,
    };

    if(this.$parent.globalData.type == 2){
      param.is_vip = 0;      
    };

    let res = await shttp.get(`/api/v2/member/goodscommon`).query(param).end();

    if(res.data){
      this.goodList = res.data;
      this.is_empty = !this.goodList.length;
    }

    this.$apply();
    wx.hideLoading();

    if(res.error) wx.showModal({ content: res.error, showCancel: false, });
  }

  //开始搜索
  async startSearch(name) {
    let param = {
          name: name,
          page: 1,
          limit: 10
        };

    if(this.$parent.globalData.type == 2){
      param.is_vip = 0;      
    };

    let res = await shttp.get(`/api/v2/member/goodscommon?store_id=1`).query(param).end();
    console.log("搜索结果", res);

    this.goodList = res.data;
    if (res.data.length == 0) {
      this.is_empty = true;
    }
    this.$apply();
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