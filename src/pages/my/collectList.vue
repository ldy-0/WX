<style scoped>
page{

}
.container {
  min-height: 100%;
  background: #fff;
}
.list-item {
  display: flex;
  height: 164rpx;
  align-items: center;
  padding: 18rpx 30rpx;
}
.list-itemImg {
  width: 164rpx;
  height: 164rpx;
  margin-right: 20rpx;
  border-radius: 5rpx;
}
.redinfo {
  width: 360rpx;
  height: 164rpx;
  margin-right: 35rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.btn {
  width: 110rpx;
  height: 44rpx;
  text-align: center;
  line-height: 44rpx;
  background-image: linear-gradient(-90deg, #fca768 0%, #4fb84a 100%),
    linear-gradient(#343434, #343434);
  background-blend-mode: normal, normal;
  border-radius: 5rpx;
  color: #fff;
  font-size: 24rpx;
}
.prdname {
  color: #222;
  width: 100%;
  font-size: 28rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.num_info {
  font-size: 26rpx;
  color: #dd3d27;
}
.btnbg {
  width: 110rpx;
  height: 44rpx;
  text-align: center;
  line-height: 44rpx;
  background: #d7d7d7;
  border-radius: 5rpx;
  color: #fff;
  font-size: 24rpx;
}
</style>  

<template>
  <view class="container">
    <view class="my_manage" wx:if="{{!is_empty}}">
      <repeat for="{{collectList}}" item="item">
        <view class="list-item" @tap="intoDetail({{item.goods_commonid}})">
          <image class="list-itemImg" src="{{item.goods_image}}" mode="aspectFill">
          <view class="redinfo">
            <text class="prdname">{{item.goods_name}}</text>
            <view class="num_info">￥{{item.goods_price}}</view>
          </view>
          <view class="btn" wx:if="{{item.isShow==1}}" @tap.stop="cancel" data-coupon="{{item}}" data-index="{{index}}">取消收藏</view>
          <view class="btnbg" wx:if="{{item.isShow==0}}">已取消</view>
        </view>
      </repeat>
    </view>
    <!--暂无数据显示-->
    <placeholder :show.sync="is_empty" message="还没有收藏呢"></placeholder>
  </view>
</template>

<script>
import wepy from "wepy";

import Placeholder from "../../components/placeholder";
import getTimes from "../../utils/formatedate.js";
import { shttp } from "../../utils/http";
export default class CollectList extends wepy.page {
  config = {
    navigationBarTitleText: "我的收藏"
  };
  data = {
    //显示提示的
    is_empty: false,
    //收藏列表
    collectList: [],
    //默认第一页
    page: 1,
    type: "all"
  };

  components = {
    placeholder: Placeholder
  };

  onLoad(options) {}
  //上拉加载更多
  onReachBottom() {
    this.page = this.page + 1;
    //获取收藏列表
    this.getcollectList();
  }
  onShow() {
    //获取收藏列表
    this.collectList = [];
    this.page = 1;
    this.getcollectList();
    this.$apply();
  }
  //获取收藏列表
  async getcollectList() {
    wx.showLoading({
      title: "加载中..."
    });
    const res = await shttp
      .get(`/api/v2/member/enshrine`)
      .query({
        limit: 10,
        page: this.page,
        store_id: 1
      })
      .end();
    if (res.status === 0) {
      if (res.data != null && res.data.length != 0) {
        res.data.forEach(element => {
          element.isShow = 1;
        });
        this.collectList = this.collectList.concat(res.data);
      }
    }
    if (this.collectList.length == 0) {
      this.is_empty = true;
    } else {
      this.is_empty = false;
    }
    wx.hideLoading();
    this.$apply();
  }

  methods = {
    async cancel(e) {
      let id = e.currentTarget.dataset.coupon.enshrine_id;
      let index = e.currentTarget.dataset.index;
      const res = await shttp.delete(`/api/v2/member/enshrine/${id}`).end();
      if (res.status == 0) {
        wx.showToast({
          title: "取消成功",
          icon: "success",
          duration: 2000
        });
        this.collectList[index].isShow = 0;
        this.$apply();
      } else if (res.status == 1) {
        wx.showToast({
          title: res.error,
          icon: "none",
          duration: 2000
        });
      }
      this.$apply();
    },
    //进入商品详情
    intoDetail(id) {
      wx.navigateTo({
        url: `/pages/store/goodsDetails?goods_commonid=${id}`
      });
    }
  };
}
</script>