<style scoped>
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
.comment-imgs {
  margin-top: 8rpx;
  display: flex;
  flex-wrap: wrap;
}
.comment-imgItem {
  width: 176rpx;
  height: 176rpx;
  margin-right: 2rpx;
  margin-bottom: 2rpx;
}
.comment-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.star-image {
  width: 32rpx;
  height: 32rpx;
  margin-right: 5rpx;
  margin-left: 5rpx;
}
</style>


<template>
  <view class="container">
    <view class="comment">
      <repeat for="{{commentList}}" item="item">
        <view class="item">
          <view class="user">
            <image src="{{item.geval_frommemberavatar}}" class="head">
            {{item.geval_frommembername}}
            <block wx:for="{{item.geval_scores}}" wx:key>
                <image class="star-image" src="../../images/icon_pingfen_hl@2x.png">
              </block>
              <block wx:for="{{5-item.geval_scores}}" wx:key>
                <image class="star-image" src="../../images/icon_pingfen@2x.png">
              </block>
          </view>
          <view>{{item.geval_content}}</view>
          <view class="comment-imgs" wx:if="{{item.geval_image.length>0}}">
            <repeat for="{{item.geval_image}}" item="img" index="index">
              <image src="{{img}}" class="comment-imgItem" mode="aspectFill">
            </repeat>
          </view>
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
      this.send = {
        goods_id: options.goodsId,
        page: this.page,
        goods_type: "real"
      };
    this.getcommentList();
  }
  onShow() {}
  methods = {};
  async getcommentList() {
    wx.showLoading({
      title: "加载中"
    });
    const res = await shttp
      .get(`/api/v2/member/goodsevaluate`)
      .query(this.send)
      .end();
    if (res.status == 0) {
      wx.hideLoading();
      if (res.data != null && res.data.length != 0) {
        res.data.forEach(element => {
          element.geval_image =
            element.geval_image !== "" ? JSON.parse(element.geval_image) : [];
        });
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
