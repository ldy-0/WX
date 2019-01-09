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
.home-discounts {
  margin: 0 20rpx;
  padding: 20rpx 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1rpx solid #e6e6e6;
}
.discounts-details {
  display: flex;
  width: 490rpx;
  padding-left: 30rpx;
  height: 80rpx;
  flex-direction: column;
  justify-content: space-between;
}
.discounts-detailsOne {
  font-size: 24rpx;
  color: #222222;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.discounts-bottom {
  font-size: 24rpx;
}
.discounts-bottom text {
  color: #af0000;
}
.discounts-goBtn {
  width: 120rpx;
  height: 44rpx;
  color: #ff7900;
  font-size: 28rpx;
  text-align: center;
  line-height: 44rpx;
  border-radius: 10rpx;
  border: 1rpx solid #ff7900;
}
image {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  overflow: hidden;
}
</style>
<template>
  <view class="container">
    <tab :tabOption="tab" :nowindex.sync="nowindex" @tabitem.user="tabitem"></tab>
    <repeat for="{{groupList}}" index="index" item="item">
      <view class="home-discounts">
        <image src="{{item.pintuangroup_avatar}}">
        <view class="discounts-details">
          <view class="discounts-detailsOne">{{item.pintuangroup_headname}}</view>
          <view class="discounts-bottom" wx:if="{{item.pintuangroup_state==1}}">剩余
            <text>{{wxTimerList[index].d!=0?wxTimerList[index].d+'天':''}} {{wxTimerList[index].wxTimer}}</text>结束，差
            <text>{{item.pintuangroup_surplus}}</text>人
          </view>
          <view class="discounts-bottom" wx:if="{{item.pintuangroup_state!=1}}">
            <text>已结束</text>
          </view>
        </view>
        <view
          class="discounts-goBtn"
          @tap="gogroupon"
          data-groupondata="{{item}}"
          wx:if="{{item.pintuangroup_state==1}}"
        >去拼团</view>
        <view
          class="discounts-goBtn"
          @tap="goDetail"
          data-groupondata="{{item}}"
          wx:if="{{item.pintuangroup_state!=1}}"
        >查看</view>
      </view>
    </repeat>
    <!--暂无数据显示-->
    <placeholder :show.sync="is_empty" message="还没有相关的拼团"></placeholder>
  </view>
</template>
<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import Tab from "../../components/tab";
import Placeholder from "../../components/placeholder";
import timer from "../../utils/wxTimer";
import dayjs from "dayjs";
export default class Groupon extends wepy.page {
  config = {
    navigationBarTitleText: "开团列表"
  };
  data = {
    tab: {
      tabList: ["未完成", "已完成"]
    },
    nowindex: 0,
    is_empty: false,
    groupList: [],
    commonid: null,
    wxTimerList: {},
    timeDatalist: [],
    sends: null,
    page: 1
  };
  onLoad(options) {
    this.commonid = options.commonid;
  }
  onShow() {
    this.sends = {
      pintuangroup_goods_id: this.commonid,
      page: this.page,
      limit: 1000
    };
    let e = Number(this.nowindex);
    switch (e) {
      case 0:
        if (this.timeDatalist.length != 0) {
          this.timeDatalist.forEach(item => {
            item.stop();
          });
          this.timeDatalist = [];
          this.wxTimerList = {};
        }
        this.sends.pintuangroup_state = 1;
        this.getGroupList(this.sends);
        break;
      case 1:
        this.sends.pintuangroup_state = 2;
        this.getGroupList(this.sends);
        break;

      default:
        break;
    }
  }

  components = {
    tab: Tab,
    placeholder: Placeholder
  };
  methods = {
    async tabitem(e) {
      this.nowindex = e;
      this.is_empty = false;
      this.page = 1;
      this.groupList = [];
      switch (e) {
        case 0:
          this.sends.pintuangroup_state = 1;
          this.getGroupList(this.sends);
          break;
        case 1:
          this.sends.pintuangroup_state = 2;
          this.getGroupList(this.sends);
          break;

        default:
          break;
      }
    }
  };
  //获取商品拼团列表
  async getGroupList(sends) {
    const res = await shttp
      .get(`/api/v2/member/groupbuy/${sends.pintuangroup_goods_id}`)
      .send(sends)
      .end();
    if (res.status == 0) {
      if (
        res.data != null &&
        res.data.pinlist.length != 0 &&
        this.nowindex == 0
      ) {
        let startTime = new Date().getTime();
        this.groupList = res.data.pinlist;
        console.log(this.groupList);
        this.groupList.forEach((item, index) => {
          let endTime = item.pintuangroup_endtime * 1000;
          if (startTime < endTime) {
            let hour = dayjs(endTime).diff(dayjs(startTime), "hour");
            let diffhour = hour * 60;
            let minute = dayjs(endTime).diff(dayjs(startTime), "minute");
            let diffminute = minute * 60;
            minute -= diffhour;
            let second = dayjs(endTime).diff(dayjs(startTime), "second");
            second -= diffminute;
            let beginTime = hour + ":" + minute + ":" + second;
            let wxTimer = index;
            wxTimer = new timer({
              beginTime: beginTime,
              name: wxTimer,
              complete: function() {
                item.pintuangroup_state = 0;
              }
            });
            wxTimer.start(this);
            this.timeDatalist.push(wxTimer);
          } else {
            item.pintuangroup_state = 0;
          }
        });
      } else if (
        res.data != null &&
        res.data.pinlist.length != 0 &&
        this.nowindex == 1
      ) {
        this.groupList = res.data.pinlist;
      }
    }
    if (this.groupList.length == 0) {
      this.is_empty = true;
    }
    this.$apply();
  }
  gogroupon(e) {
    let groupondata = e.currentTarget.dataset.groupondata;
    wx.navigateTo({
      url: `/pages/store/goodsDetails?scene=${"grouponing;" +
        groupondata.pintuangroup_id +
        ";" +
        groupondata.pintuangroup_goods_commonid}`
    });
  }
  goDetail(e) {
    let groupondata = e.currentTarget.dataset.groupondata;
    wx.navigateTo({
      url: `/pages/store/grouponItem?pintuangroupid=${
        groupondata.pintuangroup_id
      }`
    });
  }
  onUnload() {
    if (this.timeDatalist.length != 0) {
      this.timeDatalist.forEach(item => {
        item.stop();
      });
      this.wxTimerList = {};
      this.timeDatalist = [];
    }
  }
}
</script>    