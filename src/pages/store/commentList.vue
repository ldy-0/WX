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
.comment {
  padding: 20rpx;
  font-size: 28rpx;
  color: #000;
  background: #fff;
}
.comment .more_btn {
  width: 180rpx;
  line-height: 50rpx;
  height: 50rpx;
  margin: 0rpx auto;
  color: #ff7900;
  border-radius: 25rpx;
  text-align: center;
  border: 1rpx solid #ff7900;
}
.comment .item {
  border-bottom: 1rpx solid #f4f4f4;
  padding-bottom: 20rpx;
}
.comment .item .user {
  display: flex;
  align-items: center;
}
.comment .item .head {
  margin: 24rpx 20rpx 20rpx 0;
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
}
</style>


<template>
  <view class="container">
    <view class="comment">
      <repeat for="{{commentList}}" item="item">
        <view class="item">
          <view class="user">
            <image src="{{item.geval_frommemberavatar}}" class="head" />
            {{item.geval_frommembername}}
          </view>
          <view>{{item.geval_content}}</view>
          <!-- <view>一件十盒 送无纺布</view> -->
        </view>
      </repeat>
    </view>
    <!--暂无数据显示-->
    <placeholder :show.sync="is_empty" message="还没有此类商品"></placeholder>
  </view>
</template>
<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import Placeholder from "../../components/placeholder";
export default class CommentList extends wepy.page {
  config = {
    navigationBarTitleText: "商品评论"
  };
  data = {
    commentList: [],
    page: 1,
    is_empty: false,
    goods_id: null,
    send: {}
  };
  components = {
    placeholder: Placeholder
  };
  onLoad(options) {
    if (options.virtual == 1) {
      this.send = {
        goods_id: options.goodsId,
        page: this.page,
        goods_type: "virtual"
      };
    } else if (options.virtual == 0) {
      this.send = {
        goods_id: options.goodsId,
        page: this.page,
        goods_type: "real"
      };
    }

    this.getcommentList();
  }
  onShow() {}
  methods = {};
  async getcommentList() {
    wx.showLoading({
      title: "加载中"
    });
    const res = await shttp
      .get(`/api/v1/member/goods_evaluate`)
      .query(this.send)
      .end();
    if (res.status == 0) {
      wx.hideLoading();
      if (res.data != null && res.data.length != 0) {
        this.commentList = this.commentList.concat(res.data);
      } else {
        if (this.commentList.length == 0) {
          this.is_empty = true;
        }
      }
    } else {
      wx.hideLoading();
      if (this.commentList.length == 0) {
        this.is_empty = true;
      }
    }
    this.$apply();
  }
  //上拉加载
  onReachBottom() {
    this.page = this.page + 1;
    this.send.page = this.page;
    this.getcommentList();
    this.$apply();
  }
}
</script>
