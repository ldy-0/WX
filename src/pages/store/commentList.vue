<style scoped>
.comment_wrap{
  margin: 20rpx 0 0;
  padding: 0 40rpx;
}

.comment_item{
  padding: 30rpx 0;
}
.comment_avatar{
  flex-shrink: 0;
  width: 60rpx;
  height: 60rpx;
  margin-right: 10rpx;
  /* background: gray; */
}
.comment_info{
  flex-grow: 1;
  margin: 20rpx 0 0;
  font-size: 24rpx;
}
.comment_name{
  width: 240rpx;
  height: 1.2em;
  line-height: 1.2;
  font-size: 28rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.comment_level, .comment_service, .comment_content{
  margin: 10rpx 0 0;
}
.score_title{
  margin-right: 10rpx;
}
.score{
  margin-right: 6rpx;
}
.i_assess{
  width: 16rpx;
  height: 16rpx;
  margin-right: 4rpx;
}

/* detail */
.detail_item{
  font-size: 28rpx;
}
.i_detail{
  flex-shrink: 0;
  width: 34rpx;
  height: 30rpx;
  margin-right: 10rpx;
  /* background: gray; */
}
.detail_desc{

}

.flex{
  display: flex;
  align-items: center;
}
.between{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.s-fc-1{ color: #fff; }
.s-fc-2{ color: #222; }
.s-fc-3{ color: #969696; }
.s-fc-4{ color: #8e939a; }
.s-fc-5{ color: #10325f; }

.s-bg-1{ background: #fff; }

/* .comment {
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
} */
</style>


<template>
  <view class="container">

    <view class='comment_wrap s-bg-1'>
      <view class='comment_list'>
        <repeat for='{{commentList}}' wx:key='index'>

          <view class='comment_item'>

            <view class='flex' style='align-items: flex-start;'>
              <image class='comment_avatar' src='{{item.comment_avatar}}' />
              <view class='comment_info s-fc-4'>

                <view class='between'>
                  <view class='comment_name s-fc-2'>{{item.geval_frommembername}}</view>
                  <view class='comment_time'>{{item.comment_time}}</view>
                </view>
                
                <view class='comment_level flex' style='align-items: baseline;'>
                  <view class='score_title'>星级</view>
                  <view class='score flex'>
                      <repeat for='{{5}}' item='v' index='i' wx:key='i'>
                      <image class='i_assess' src="{{i + 1 > item.geval_scores ? '../../images/order/assess.png' : '../../images/order/assess_sel.png'}}" mode='aspectFill' />
                    </repeat>
                  </view>
                </view>

                <view class='comment_service'>服务 {{item.comment_service}}</view>

                <view class='comment_content s-fc-2'>{{item.geval_content}}</view>

              </view>
            </view>

          </view>

        </repeat>
      </view>
    </view>
    <!-- <view class="comment">
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
    </view> -->
    <!--暂无数据显示-->
    <placeholder :show.sync="is_empty" message="还没有相关评论"></placeholder>
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
    store_id: null,
    storegc: null,
    commentList: [],
    page: 1,
    limit: 10,
    is_empty: false,
    goods_id: null,
    send: {},
    total: 0,
    canLoad: true,
  };
  components = {
    placeholder: Placeholder
  };
  onLoad(options) {
    this.store_id = options.id;
    if(options.storegc) this.storegc = JSON.parse(decodeURIComponent(options.storegc));

    this.send = {
      page: this.page,
      limit: this.limit,
      // store_id: options.id,
      // goods_type: 'all',
    };
    // if (options.virtual == 1) {
    //   this.send = {
    //     goods_id: options.goodsId,
    //     page: this.page,
    //     goods_type: "virtual"
    //   };
    // } else if (options.virtual == 0) {
    //   this.send = {
    //     goods_id: options.goodsId,
    //     page: this.page,
    //     goods_type: "real"
    //   };
    // }

    this.getcommentList();
  }
  onShow() {}
  methods = {};
  async getcommentList() {
    wx.showLoading({
      title: "加载中"
    });

    const res = await shttp
      .get(`/api/v2/member/goodsevaluate/${this.store_id}`)
      .query(this.send)
      .end();
    if (res.status == 0) {
      wx.hideLoading();
      if (res.data != null && res.data.length != 0) {

        res.data.forEach(v => {
          let t = new Date(v.geval_addtime * 1000),
              avatar;

          v.comment_time = `${t.getFullYear()}/${t.getMonth() + 1}/${t.getDate()} ${t.getHours()}:${t.getMinutes()}`;

          avatar = JSON.parse(v.geval_frommemberavatar);
          v.comment_avatar = avatar[0] ? avatar[0].url : '';

          v.comment_service = this.storegc ? this.storegc.filter(o => o.storegc_id == v.geval_goodsspec)[0].storegc_name : v.geval_goodsspec;
        });

        this.commentList = this.commentList.concat(res.data);
        this.total = res.pagination ? res.pagination.total : this.commentList.length;
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

    this.canLoad = true;
    this.$apply();
  }
  //上拉加载
  onReachBottom() {
    if(!this.canLoad || this.total <= this.commentList.length) return ;

    this.canLoad = false;

    this.page = this.page + 1;
    this.send.page = this.page;
    this.getcommentList();
    this.$apply();
  }
}
</script>
