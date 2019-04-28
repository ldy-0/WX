<style>
.container {
  font: 32rpx PingFangSC-Regular;
  color: #000;
  background: #f4f4f4;
  min-height: 100vh;
}

.row_between {
  width: 100%;
  background-color: #f4f4f4;
  height: 152rpx;
  text-align: center;
  position: fixed;
  bottom: 0rpx;
  box-sizing: border-box;
  padding-left: 30rpx;
}
.row_between view{
  height: 88rpx;
  background-color: #4fb84a;
  border-radius: 10rpx;
  color: #fff;
  font-size: 36rpx;
  line-height: 88rpx;
  width: 690rpx;

}
.row_between image {
  width: 15rpx;
  height: 25rpx;
}

.flex {
  display: flex;
  align-items: center;
}

.address {
  box-sizing: border-box;
  height: 170rpx;
  padding: 23rpx 30rpx 16rpx;
  border-top: 1rpx solid #f4f4f4;
  background: #fff;
}
.address .address_info {
  margin: 10rpx 0;
  font-size: 24rpx;
  color: #979797;
}
.address .other_info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.address .operate_info {
  display: flex;
  justify-content: flex-end;
  font-size: 28rpx;
}
.address .operate_info .operate_btn {
  display: flex;
  align-items: center;
  margin-left: 48rpx;
}
.address .operate_info .operate_btn image {
  width: 26rpx;
  height: 26rpx;
  margin-right: 12rpx;
}
.address .default {
  font-size: 22rpx;
  color: #4fb84a;
}

.inline {
  display: inline-block;
  margin-left: 50rpx;
}


.myAddress{
  width: 100%;
  height: 88rpx;
  background-color: #f6f6f6;
  color: #979797;
  letter-spacing: 1rpx;
  font-size: 32rpx;
  box-sizing: border-box;
  padding: 25rpx 0 0 30rpx;
}
.user_info{
  color: #222;
  font-size: 32rpx;
}
</style>

<template>
  <view class="container">
    <view class="myAddress">我的地址</view>
    <view class="row_between" @tap="add">
      <view>新增地址</view>
      <!-- <image src="../../images/icon_zuojiantou@2x.png"> -->
    </view>
    <repeat for="{{addressList}}" index="index" item="item">
      <view class="address" @tap="choose" data-address="{{item}}">
        <view class="user_info">
          {{item.address_realname}}
          <text class="inline">{{item.address_mob_phone}}</text>
        </view>
        <view class="address_info">{{item.area_info}}{{item.address_detail}}</view>
        <view class="other_info">
          <view class="default" wx:if="{{item.address_is_default==='1'}}">[默认地址]</view>
          <view></view>
          <view class="operate_info">
            <view class="operate_btn" @tap.stop="modify({{index}})">
              <image src="../../images/icon_xiugai@2x.png">
              <view>修改</view>
            </view>
            <view class="operate_btn" @tap.stop="del({{index}})">
              <image src="../../images/icon_shanchu@2x.png">
              <view>删除</view>
            </view>
          </view>
        </view>
      </view>
    </repeat>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import {
  showSuccessToast,
  showFailToast,
  exploitToast
} from "../../utils/tools";
export default class Address extends wepy.page {
  config = {
    navigationBarTitleText: "地址管理"
  };
  data = {
    addressList: [],
    type: "",
    referer: null,
  };

  components = {};

  methods = {
    add() {
      wx.navigateTo({
        url: "./addAddress?isNull=" + !Boolean(this.addressList.length)
      });
    },
    modify(index) {
      let address = this.addressList[index];
      wx.setStorageSync("address", address);
      wx.navigateTo({
        url: "./addAddress?type=edit"
      });
    },
    del(index) {
      let that = this;
      let id = this.addressList[index].address_id;
      wx.showModal({
        content: "确认删除该地址吗？",
        success: res => {
          if (res.confirm) {
            that.delete(id, index);
          }
        }
      });
    }
  };
  onLoad(option) {
    this.referer = option.referer;
    this.type = option.type;
    console.log(option.type);
  }
  async onShow(options) {
    this.getaddressList();
    this.$apply();
  }

  async delete(id, index) {
    const res = await shttp
      .delete(`/api/v2/member/address/${id}`)
      .end();
    console.log(res);
    if (res.data == 1) {
      this.addressList.splice(index, 1);
      this.$apply();
      return showSuccessToast("删除成功");
    }
    showFailToast("删除失败");
  }
  //获取地址列表
  async getaddressList() {
    wx.showLoading({
      title: "加载中",
      mask: true
    });
    const res = await shttp
      .get("/api/v2/member/address")
      .query({})
      .end();
    console.log(res.data);

    if (res.status === 0) {
      this.addressList = res.data;
      wx.hideLoading();
    } else {
      wx.hideLoading();
    }
    this.$apply();
  }
  choose(e) {
    if(this.referer === 'my') return ;

    console.log("选中");
    if (this.type == "order") {
      let address = e.currentTarget.dataset.address;
      wx.setStorageSync("address", address);
      wx.navigateBack();
    } else {
      let address = e.currentTarget.dataset.address;
      wx.setStorageSync("return_address", address);
      wx.navigateBack();
    }
  }
}
</script>