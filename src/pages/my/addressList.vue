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
  font: 32rpx PingFangSC-Regular;
  color: #000;
  background: #f4f4f4;
  min-height: 100vh;
}

.row_between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  line-height: 88rpx;
  padding: 0 20rpx;
  border-top: 1rpx solid #f4f4f4;
  background: #fff;
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
  height: 171rpx;
  padding: 25rpx 25rpx 0;
  border-top: 1rpx solid #f4f4f4;
  background: #fff;
}
.address .address_info {
  margin: 25rpx 0;
  font-size: 24rpx;
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
}

.inline {
  display: inline-block;
  margin-left: 50rpx;
}
</style>

<template>
  <view class='container'>

      <view class='row_between' @tap='add'>
          <view>添加新地址</view>
          <image src='../../images/icon_zuojiantou@2x.png' />
      </view>
      <repeat for='{{addressList}}' index='index' item='item'>
          <view class='address' @tap="choose" data-address='{{item}}'>
              <view class='user_info'>{{item.address_realname}}<text class='inline'>{{item.address_mob_phone}}</text></view>
              <view class='address_info'>{{item.area_info}}{{item.address_detail}}</view>
              <view class='other_info'>
                <view class='default' wx:if="{{item.address_is_default==='1'}}">[默认地址]</view>
                <view></view>
                <view class='operate_info'>
                    <view class='operate_btn' @tap.stop='modify({{index}})'>
                      <image src='../../images/icon_xiugai@2x.png' />
                      <view>修改</view>
                    </view>
                    <view class='operate_btn' @tap.stop='del({{index}})'>
                      <image src='../../images/icon_shanchu@2x.png' />
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
    navigationBarTitleText: "收货地址管理"
  };
  data = {
    //
    addressList: [],
    type: ""
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
    this.type = option.type;
    console.log(option.type);
  }
  async onShow(options) {
    this.getaddressList();
    this.$apply();
  }

  async delete(id, index) {
    const res = await shttp
      .delete(`/api/v1/member/address?address_id=${id}`)
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
      .get("/api/v1/member/address")
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