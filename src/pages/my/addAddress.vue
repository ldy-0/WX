<style>
.container {
  font: 28rpx PingFangSC-Regular;
  color: #666;
  background: #f4f4f4;
  height: 100vh;
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

.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.row {
  line-height: 101rpx;
  margin-bottom: 1rpx;
  padding-left: 23rpx;
  background: #fff;
}
.row .info {
  color: #333;
}

.cityup {
  width: 26rpx;
  height: 16rpx;
  margin: 42rpx 30rpx 42rpx 10rpx;
}

.setting {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 149rpx;
  padding: 0 30rpx;
  background: #fff;
}

.comment {
  margin: 22rpx 0 0;
  font-size: 26rpx;
  color: #999;
}

.saveBox{
  height: 152rpx;
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 0 30rpx 0;
  position: fixed;
  bottom: 0;
}
.save {
  width: 690rpx;
  line-height: 88rpx;
  font-size: 36rpx;
  background: #4fb84f;
  text-align: center;
  color: #fff;
  border-radius: 10rpx;
}

.row_flex {
  display: flex;
  align-items: center;
  border-bottom: 1rpx solid #f0f0f0;
  padding-left: 30rpx;
  background: #fff;
}

.inline {
  display: inline-block;
  flex-grow: 1;
  height: 101rpx;
  color: #333;
}

.picker-group {
  display: flex;
  margin-left: 46rpx;
}

.picker-view {
  font-size: 28rpx;
}

.info_text {
  height: 100%;
  width: 163rpx;
}

.fiexdW {
  width: 112rpx;
  overflow: hidden;
}
</style>

<template>
  <view class="container">
    <form bindsubmit="submit">
      <view class="row_flex">
        <text class="info_text">收货人</text>
        <input
          type="text"
          name="name"
          class="inline"
          bindinput="setConsignee"
          value="{{address.consignee}}"
        >
      </view>

      <view class="row_flex">
        <text class="info_text">手机号码</text>
        <input
          type="text"
          name="phone"
          class="inline"
          bindinput="setPhone"
          value="{{address.phone}}"
          placeholder="11位手机号"
        >
      </view>
      <view class="row_flex">
        <view>选择地区</view>
        <view class="picker-group">
          <picker
            class="picker-box"
            bindchange="bindPickerChange"
            value="{{index}}"
            range="{{arrayProvince}}"
            data-type="province"
          >
            <view class="picker-view">
              <view class="flex">
                <view class="fiexdW">{{province ? province : '省'}}</view>
                <image class="cityup" src="../../images/icon_xiangxia@2x.png">
              </view>
            </view>
          </picker>
          <picker
            class="picker-box"
            bindchange="bindPickerChange"
            value="{{index}}"
            range="{{arrayCity}}"
            range-key="area_name"
            data-type="city"
          >
            <view class="picker-view">
              <view class="flex">
                <view class="fiexdW">{{city ? city : '市' }}</view>
                <image class="cityup" src="../../images/icon_xiangxia@2x.png">
              </view>
            </view>
          </picker>
          <picker
            class="picker-box"
            bindchange="bindPickerChange"
            value="{{index}}"
            range="{{arrayDistrict}}"
            range-key="area_name"
            data-type="district"
          >
            <view class="picker-view">
              <view class="flex">
                <view class="fiexdW">{{district ? district : '区' }}</view>
                <image class="cityup" src="../../images/icon_xiangxia@2x.png">
              </view>
            </view>
          </picker>
        </view>
      </view>
      <view class="row_flex">
        <text class="info_text">详细地址</text>
        <input
          type="text"
          name="detail"
          class="inline"
          bindinput="setStreet"
          value="{{address.street}}"
          placeholder="街道门牌信息"
        >
      </view>

      <view class="setting">
        <view>
          <view>设为默认地址</view>
          <view class="comment">注：每次下单时会使用该地址</view>
        </view>
        <switch name="isDefault" checked="{{address.isDefault}}"></switch>
      </view>
      <view class="saveBox">
        <button class="save" formType="submit">保存</button>
      </view>
      
    </form>
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
export default class AddAddress extends wepy.page {
  config = {
    navigationBarTitleText: "新增地址"
  };
  data = {
    //地址选择
    province: "",
    arrayProvince: [],
    city: "",
    arrayCity: [],
    district: "",
    arrayDistrict: [],
    pid: null,
    cid: null,
    areaid: null,
    //
    address: {
      id: "",
      consignee: "",
      phone: "",
      street: "",
      isDefault: false
    },
    // 是否是第一个地址
    isFirst: null,
    addressType: null
  };

  components = {};

  methods = {
    setConsignee: e => (this.data.address.consignee = e.detail.value),
    setPhone: e => (this.data.address.phone = e.detail.value),
    setStreet: e => (this.data.address.street = e.detail.value),
    submit(e) {
      let v = e.detail.value,
        phone = /^((0\d{2,3}-\d{7,8})|(1\d{10}))$/;
      this.address.isDefault = v.isDefault;

      if (!v.name) {
        return wx.showToast({
          title: "姓名不能为空!",
          icon: "none",
          duration: 1000
        });
      }
      if (v.phone === "" || !phone.test(v.phone)) {
        return wx.showToast({
          title: "手机号格式不正确!",
          icon: "none",
          duration: 1000
        });
      }
      if (!this.city) {
        return wx.showToast({
          title: "请选择所在地区!",
          icon: "none",
          duration: 1000
        });
      }
      if (!v.detail) {
        return wx.showToast({
          title: "请完善详细地址!",
          icon: "none",
          duration: 1000
        });
      }
      console.log(this.address);
      if (this.addressType == "edit") {
        this.modifyAddress(this.address);
      } else {
        this.saveAddress(this.address);
      }

      // this.data.address.id
      //   ? this.modifyAddress(this.data.address.id, v)
      //   : this.saveAddress(v);

      // this.data.isFirst ? wx.navigateBack({ delta: 2 }) : wx.navigateBack({});
      // if(this.data.isFirst){
      //   return wx.navigateBack({ delta: 2 });
      // }
      // wx.navigateBack({});
    }
  };

  onLoad(opt) {
    this.getProvince();
    let address = wx.getStorageSync("address");
    if (opt.type === "edit") {
      this.addressType = opt.type;
      this.address.id = address.address_id;
      this.address.consignee = address.address_realname;
      this.address.phone = address.address_mob_phone;
      this.address.street = address.address_detail;
      this.address.isDefault = address.address_is_default == 1 ? true : false;
      this.cid = address.city_id;
      this.areaid = address.area_id;
      this.pid = address.province_id;
      let arrArea = address.area_info.split(" ");
      this.province = arrArea[0];
      this.city = arrArea[1];
      this.district = arrArea[2];
      this.getCity(address.province_id);
      this.getDistrict(address.city_id);
    }
    this.$apply();
  }
  onShow() {}
  async saveAddress(address) {
    const res = await shttp
      .post("/api/v2/member/address")
      .send({
        city_id: this.cid,
        area_id: this.areaid,
        province_id: this.pid,
        area_info: this.province + " " + this.city + " " + this.district,
        address_tel_phone: address.phone,
        address_mob_phone: address.phone,
        address_realname: address.consignee,
        address_detail: address.street,
        address_is_default: address.isDefault ? 1 : 0
      })
      .end();
    // console.log(res);
    if (res.status === 0) {
      showSuccessToast("添加成功");
      wx.navigateBack();
    }
    console.log(`添加失败--${res}`);
  }

  async modifyAddress(address) {
    const res = await shttp
      .put(`/api/v2/member/address/${address.id}`)
      .send({
        city_id: this.cid,
        area_id: this.areaid,
        province_id: this.pid,
        area_info: this.province + " " + this.city + " " + this.district,
        address_tel_phone: address.phone,
        address_mob_phone: address.phone,
        address_realname: address.consignee,
        address_detail: address.street,
        address_is_default: address.isDefault ? 1 : 0
      })
      .end();
    console.log(res);
    if (res.status === 0) {
      showSuccessToast("修改成功");
      wx.removeStorageSync("address");
      wx.navigateBack();
    } else {
      showFailToast("修改失败");
    }
  }
  bindPickerChange(e) {
    let type = e.currentTarget.dataset.type;
    switch (type) {
      case "province":
        this.province = this.arrayProvince[e.detail.value];
        let pid = parseInt(e.detail.value) + 1;
        this.pid = pid;

        this.district = "";
        this.getCity(pid);
        break;
      case "city":
        this.city = this.arrayCity[e.detail.value].area_name;
        let cid = this.arrayCity[e.detail.value].area_id;
        this.cid = cid;
        this.district = "";
        this.getDistrict(cid);
        break;
      case "district":
        this.district = this.arrayDistrict[e.detail.value].area_name;
        this.areaid = this.arrayDistrict[e.detail.value].area_id;
        break;

      default:
        break;
    }
    this.$apply();
  }
  //地址查询
  async getProvince() {
    const res = await shttp
      .get("/api/v2/member/area")
      .query({
        level: 1
      })
      .end();
    this.arrayProvince = Object.values(res.data);
    this.$apply();
  }
  async getCity(pid) {
    const res = await shttp
      .get("/api/v2/member/area")
      .query({
        level: 2,
        parentId: pid
      })
      .end();
    this.arrayCity = res.data;
    this.city = this.arrayCity[0].area_name;
    this.cid = this.arrayCity[0].area_id;
    this.getDistrict(this.cid);
    this.$apply();
  }
  async getDistrict(cid) {
    const res = await shttp
      .get("/api/v2/member/area")
      .query({
        level: 3,
        parentId: cid
      })
      .end();
    this.arrayDistrict = res.data;
    this.district = this.arrayDistrict[0].area_name;
    this.areaid = this.arrayDistrict[0].area_id;
    this.$apply();
  }
}
</script>