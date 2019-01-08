<style scoped>
.container {
  padding: 30rpx;
}
.grouponItem {
  display: flex;
  font-size: 28rpx;
}
.grouponItem-l {
  display: flex;
  width: 147rpx;
  height: 60rpx;
  align-items: center;
}
.grouponItem-r {
  color: #222222;
  display: flex;
  height: 60rpx;
  align-items: center;
  width: 260rpx;
  margin-bottom: 40rpx;
}
.grouponItem-r image {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  margin-right: 26rpx;
  background: skyblue;
}
.grouponItem-rList {
  display: flex;
  flex-wrap: wrap;
  width: 520rpx;
}
</style>
<template>
  <view class="container">
    <view class="grouponItem">
      <view class="grouponItem-l">开团者：</view>
      <view class="grouponItem-r">
        <image src="{{groupondata.members[0].member_avatar}}">
        {{groupondata.members[0].member_name}}
      </view>
    </view>
    <view class="grouponItem">
      <view class="grouponItem-l">开团时间：</view>
      <view class="grouponItem-r">{{groupondata.pintuangroup_starttime}}</view>
    </view>
    <view class="grouponItem">
      <view class="grouponItem-l">团成员：</view>
      <view class="grouponItem-rList">
        <repeat for="{{groupondata.members}}" item="item">
          <view class="grouponItem-r">
            <image src="{{item.member_avatar}}">
            {{item.member_name}}
          </view>
        </repeat>
      </view>
    </view>
  </view>
</template>
<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import Placeholder from "../../components/placeholder";
import timer from "../../utils/wxTimer";
import dayjs from "dayjs";
export default class Groupon extends wepy.page {
  config = {
    navigationBarTitleText: "团购列表"
  };
  data = {
    groupondata: null
  };
  onLoad(options) {
    this.getgroupDetails(options.pintuangroupid);
  }
  onShow() {}

  components = {};
  async getgroupDetails(id) {
    const res = await shttp.get(`/api/v2/member/groupbuy/${id}/edit`).end();
    if (res.status == 0) {
      this.groupondata = res.data;
      this.groupondata.pintuangroup_starttime = dayjs(
        this.groupondata.pintuangroup_starttime * 1000
      ).format("YYYY-MM-DD HH:mm");
    }
    this.$apply();
  }
}
</script>    