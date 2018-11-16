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
  height: 100vh;
}
.container .content_list {
  width: 100%;
  height: 100rpx;
  border-top: solid 1rpx #f0f0f0;
  justify-content: space-between;
  display: flex;
  background: #fff;
  box-sizing: border-box;
  padding: 0 31rpx;
  align-items: center;
}
.container .content_list .left_view {
  display: flex;
  flex-direction: column;
}
.container .content_list .left_view .name {
  font-size: 28rpx;
  color: #222;
}
.container .content_list .left_view .add_time {
  font-size: 22rpx;
  color: #999;
}
.container .content_list .color_succ {
  color: #3bbc44;
  font-size: 28rpx;
}
.container .content_list .color_load {
  color: #3ba5bc;
  font-size: 28rpx;
}
.container .content_list .color_fail {
  color: #e50012;
  font-size: 28rpx;
}
</style>  

<template>
  <view class='container'>
      <tab :tabOption="tab" :nowindex.sync="nowindex" @tabitem.user="tabitem"></tab>
           <repeat for="{{infoList}}" item="item" key="index">
       <view class="content_list">
           <view class="left_view">
               <text class="name">提现¥{{item.money}}元</text>
               <text class="add_time">{{item.ctime}}</text>
           </view>
           <view  class="{{item.status=='成功'?'color_succ': (item.status=='处理中'?'color_load':'color_fail')}}">{{item.status}}</view>
       </view>
           </repeat>
    <!--暂无数据显示-->
    <placeholder :show.sync="is_empty" message="还没有相关的内容"></placeholder>
  </view>
</template>

<script>
import wepy from "wepy";
import Floatingmenu from "../../components/floatingmenu";
import Tab from "../../components/tab";
import Placeholder from "../../components/placeholder";
import { shttp } from "../../utils/http";
export default class Mine extends wepy.page {
  config = {
    enablePullDownRefresh: true,
    navigationBarTitleText: "提现明细"
  };
  data = {
    //显示提示的
    is_empty: false,
    //顶部栏目
    tab: {
      tabList: ["全部", "成功", "失败", "处理中"]
    },
    //主体部分显示哪一个
    nowindex: Number,
    //要请求的状态
    nowStatus: "",
    //当前状态数据列表
    infoList: [],
    //当前页数
    page: 1
  };

  components = {
    tab: Tab,
    placeholder: Placeholder
  };
  //下拉刷新
  onPullDownRefresh() {
    //获取提现明细
    this.getMoneyList();
  }
  onLoad(options) {
    wx.showLoading({
      title: "加载中"
    });
    this.nowindex = 0;
    //获取提现明细
    this.getMoneyList();
  }

  onShow() {}

  methods = {
    //切换效果
    async tabitem(e) {
      console.log("切换");
      console.log(e);
      switch (e) {
        case 0:
          this.nowindex = e;
          this.nowStatus = "";
          this.getMoneyList();
          break;
        case 1:
          this.nowindex = e;
          this.nowStatus = 1;
          this.getMoneyList();
          break;
        case 2:
          this.nowindex = e;
          this.nowStatus = 2;
          this.getMoneyList();
          break;
        default:
          this.nowindex = e;
          this.nowStatus = 0;
          this.getMoneyList();
      }
    }
  };
  //获取提现详情列表
  async getMoneyList() {
    this.infoList = [];
    let parmas = {};
    if (this.nowindex) {
      parmas = {
        page: this.page,
        status: this.nowStatus
      };
    } else {
      parmas = {
        page: this.page
      };
    }
    const res = await shttp
      .get(`/api/v1/member/withdraw?limit=10`)
      .query(parmas)
      .end();
    if (res.data.length != 0) {
      this.is_empty = false;
      this.infoList = res.data;
    } else {
      this.is_empty = true;
    }

    console.log(this.infoList);
    wx.stopPullDownRefresh();
    wx.hideLoading();
    this.$apply();
  }
}
</script>