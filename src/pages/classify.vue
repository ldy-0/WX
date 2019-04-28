<style>
page {
  background: #fff;
}
</style>
<style scoped>
.container {
  height: 100%;
  background: #fff;
  font: 28rpx PingFang-SC-Medium;
}

.wrap {
  display: flex;
  margin-top: 96rpx;
  height: 100%;
}
.first_class_list {
  flex-shrink: 0;
  box-sizing: border-box;
  width: 170rpx;
  height: 100%;
  text-align: center;
}
.first_class_item {
  height: 110rpx;
  border-left: 4px solid transparent;
  line-height: 110rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.first_class_sel{
  border-left: 4px solid #4fb84a;
}

.content_wrap {
  flex-grow: 1;
  margin: 0 50rpx;
}
.two_class_item{
  border-bottom: 2rpx solid #e9e9e9;
}
.two_class_title{
  padding: 30rpx 0;
  font-weight: bold;
}

.third_class_item{
  width: 33.3%;
  margin: 20rpx 0 30rpx 0;
  display: flex;
}
.center{
  justify-content: center;
}
.end{
  justify-content: flex-end;
}
.class_img{
  width: 124rpx;
  height: 124rpx;
  background: #ccc;
}
.class_name{
  width: 124rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}

.flex{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.search {
  height: 96rpx;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-bottom: 1rpx solid #eee;
}
.search .search_content {
  display: flex;
  align-items: center;
  width: 690rpx;
  height: 60rpx;
  border-radius: 10rpx;
  color: #666;
  background: #ededed;
}
.search .search_content image {
  width: 23rpx;
  height: 25rpx;
  margin-left: 31rpx;
  margin-right: 2%;
}
.standard-box {
  position: fixed;
  z-index: 99999;
  height: 100vh;
  background: rgba(1, 1, 1, 0.3);
  width: 100%;
  top: 0;
  left: 0;
}
.product {
  position: absolute;
  background: #fff;
  bottom: 0;
  left: 0;
  width: 100%;
}
.product .base_info {
  position: absolute;
  display: flex;
  padding: 0 30rpx;
  top: -38rpx;
  width: 100%;
  /* height: 180rpx; */
}
.product .base_info image {
  width: 180rpx;
  height: 180rpx;
  margin-right: 23rpx;
  border-radius: 20rpx;
}
.product .base_info .product_standard {
  font-size: 24rpx;
  color: #636363;
}
.delete-btn {
  position: absolute;
  width: 28rpx;
  height: 28rpx;
  padding: 30rpx;
  top: 0;
  right: 0;
  background: #fff;
  border-radius: 50%;
}
.product .standard_wrap {
  background: #fff;
  margin-top: 188rpx;
  padding: 0 30rpx;
}
.product .standard_wrap .standard_title {
  margin: 0 30rpx 30rpx;
  color: #222;
  font-size: 28rpx;
}
.product .standard_wrap .standard_info {
  display: flex;
  padding-left: 30rpx;
}
.product .standard_wrap .standard_info view {
  margin: 0 40rpx 30rpx 0;
  padding: 7rpx 25rpx;
  border-radius: 5rpx;
  border: solid 1rpx #d3d3d3;
  font-size: 28rpx;
  color: #333333;
}
.product .row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.product .row .number_title {
  margin: 36rpx 30rpx;
  color: #222;
  font-size: 28rpx;
}
.product .row .number_wrap {
  display: flex;
  margin-right: 30rpx;
  height: 64rpx;
  border: solid 1rpx #d3d3d3;
  border-radius: 5rpx;
}
.minus,
.add {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 82rpx;
}
.minus-bg {
  background-color: #f8f8f8;
}
.icon_minus {
  width: 19rpx;
  height: 2rpx;
}
.icon_add {
  width: 20rpx;
  height: 20rpx;
}
.number {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26rpx;
  width: 80rpx;
  color: #333;
  border-left: 1rpx solid #d3d3d3;
  border-right: 1rpx solid #d3d3d3;
}

.bottom_bar {
  position: fixed;
  bottom: 0rpx;
  display: flex;
  width: 100%;
  background: #fff;
  height: 104rpx;
}
.add_btn {
  /* position: absolute; */
  width: 100%;
  text-align: center;
  height: 76rpx;
  line-height: 76rpx;
  margin-right: 20rpx;
  background: #f17f30;
  color: #fff;
  /* bottom: 0; */
}
.product_name {
  font-size: 32rpx;
  color: #333333;
  margin-right: 12rpx;
  margin-top: 60rpx;
  margin-bottom: 20rpx;
}
.product_price {
  font-size: 40rpx;
  color: #dd3d27;
  margin-right: 12rpx;
}
.empty-placeholder {
  margin-left: 120rpx;
}

.s_fc_1{ color: #fff; }
.s_fc_2{ color: #222; }
.s_fc_3{ color: #4fb84a; }

.s_bg_1{ background: #fff; }
.s_bg_2{ background: #f3f4f5; }
</style>

<template>
  <view class="container">
    <view class="search">
      <navigator url="./article/search" class="search_content">
        <image src="../images/icon_sousuo@2x.png" class="iconfont icon-search">
        <text>搜索商品</text>
      </navigator>
    </view>

    <view class="wrap">
      <view class="first_class_list s_bg_2">
        <scroll-view scroll-y style='height: 100%;'>
          <repeat for="{{firstClassList}}" index="index" item="item">
            <view class="first_class_item s_fc_2 {{ checkId == item.storegc_id ? 'first_class_sel s_fc_3 s_bg_1' : '' }}" @tap="changeFirstClass({{index}})" >{{item.storegc_name}}</view>
          </repeat>
        </scroll-view>
      </view>

      <view class="content_wrap">
        <scroll-view scroll-y style='height: 100%;'>
          <repeat for="{{twoClassList}}" index="index" item="item" wx:if="{{!is_empty}}">

            <view class='two_class_item'>
              <view class='two_class_title'>{{item.storegc_name}}</view>

              <view class='flex'>
                <repeat for='{{item.classList}}' index='i' item='v'>

                  <view class="third_class_item {{(i + 1) % 3 === 2 ? 'center' : (i + 1) % 3 === 0 ? 'end' : ''}}" @tap='goSearchResult({{v}})'>
                    <view>
                      <image class='class_img' src='{{v.storegc_pic}}' mode='aspectFill' />
                      <view class='class_name'>{{v.storegc_name}}</view>
                    </view>
                  </view>

                </repeat>
              </view>
            </view>

          </repeat>
        </scroll-view>

        <placeholder :show.sync="is_empty" message="还没有相关的内容"></placeholder>
      </view>
    </view>

  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../utils/http";
import Placeholder from "../components/placeholder";
import multiSku from "../components/multiSku";

export default class Classify extends wepy.page {
  config = {
    navigationBarTitleText: "分类",
    disableScroll: true,
  };
  data = {
    firstClassList: [],
    twoClassList: [],
    checkId: 0, // 当前选中的一级分类Id
    //二级的商品列表
    goodsList: [],
    //当前页面
    page: 1,
    is_empty: false,
    showStandard: false,
    //
    isChecked: null,
    // 数量
    size: 1,
  };
  components = {
    placeholder: Placeholder,
    multiSku,
  };
  computed = {
    getSize: () => this.size,
  };
  methods = {
    goSearchResult(item) {
      wx.navigateTo({ url: `/pages/store/searchResult?storegc_id=${item.storegc_id}` });
    },
    //获取二级商品
    changeFirstClass(index) {
      this.checkId = this.firstClassList[index].storegc_id;
      this.getTwoClassList();
    },
    
  };

  onLoad() {}
  onShow() {
    this.page = 1;

    this.getClassList();
  }

  async getClassList() {
    wx.showLoading({ title: "加载中" });

    let res = await shttp.get(`/api/v2/member/storegc`).query({}).end();

    if (res.status === 0){
      this.classObj = res.data;
      this.firstClassList = this.classObj[0].map(v => v[1]);
      this.checkId = this.firstClassList[0].storegc_id;
      this.getTwoClassList();
    }

    wx.hideLoading();
    this.$apply();
  }

  getTwoClassList(){
    let two_class = this.classObj[this.checkId],
        list = two_class ? two_class.map(v => v[1]) : [];

    list.forEach(v => {
      let third_class = this.classObj[v.storegc_id];
      v.classList = third_class ? third_class.map(o => o[1]) : [];
    });

    this.twoClassList = list;
  }


  //上拉加载更多
  // onReachBottom() {
  //   this.page = this.page + 1;
  // }

}
</script>

