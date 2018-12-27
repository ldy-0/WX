<style>


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
  font: 32rpx PingFang-SC-Medium;
  background: #f4f4f4;
  height: 100%;
}

.topBar {
  display: flex;
  justify-content: space-between;
  line-height: 88rpx;
  padding: 0 30rpx;
  color: #000;
  background: #ffffff;
}
.topBar .fullSelect {
  display: flex;
  align-items: center;
}

.list {
  margin-bottom: 149rpx;
}

.big_circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40rpx;
  height: 40rpx;
  margin-right: 10rpx;
  border: 1rpx solid #282425;
  border-radius: 50%;
}
.big_circle .fill_circle {
  width: 50%;
  height: 50%;
  border-radius: 50%;
  background: #ff4444;
}

.item {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 250rpx;
  border-top: 1rpx solid #eeeeee;
  background: #fff;
}
.item image {
  width: 180rpx;
  height: 180rpx;
}
.item .info {
  position: relative;
  width: 446rpx;
  height: 180rpx;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
}
.item .info .sub_desc {
  margin: 20rpx 0;
  font-size: 20rpx;
}
.item .info .price {
  width: 180rpx;
  line-height: 44rpx;
  border-radius: 22rpx;
  font-size: 37rpx;
  color: #ff4444;
  text-align: left;
}
.item .info .number_wrap {
  position: absolute;
  bottom: 0rpx;
  right: 26rpx;
  display: flex;
  line-height: 50rpx;
  text-align: center;
}
.item .info .number_wrap .minus,
.item .info .number_wrap .add {
  width: 50rpx;
  height: 50rpx;
  color: #888;
  background: #eeeeee;
}
.item .info .number_wrap .minus image,
.item .info .number_wrap .add image {
  width: 25rpx;
}
.item .info .number_wrap .minus {
  display: flex;
  align-items: center;
  justify-content: center;
}
.item .info .number_wrap .minus image {
  height: 2rpx;
}
.item .info .number_wrap .add image {
  height: 25rpx;
}
.item .info .number_wrap .number {
  width: 90rpx;
  color: #202020;
  border-left: 1rpx solid #fff;
  border-right: 1rpx solid #fff;
  background: #eeeeee;
}

.bottomBar {
  position: fixed;
  bottom: 0rpx;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100rpx;
  font-size: 28rpx;
  color: #282425;
  background: #fff;
}
.bottomBar .sum {
  flex-grow: 1;
  padding: 0 25rpx;
  text-align: right;
}
.bottomBar .sum text {
  font: 32rpx PingFang-SC-Bold;
  color: #fc5a4f;
}
.bottomBar .btn {
  margin-right: 20rpx;
  width: 190rpx;
  line-height: 80rpx;
  overflow: hidden;
  border-radius: 10rpx;
  background: #ff4444;
  text-align: center;
  color: #fff;
}
.bottomBar .buttonStyle {
  text-align: center;
  line-height: 100rpx;
  width: 190rpx;
  background: #ff4444;
  text-align: center;
  padding: 0rpx;
  border: 0 !important;
  border-radius: 0 !important;
  color: #fff;
  background: #ff4444;
}
.bottomBar .share,
.bottomBar .del {
  width: 100rpx;
  height: 44rpx;
  border: 1rpx solid #282425;
  border-radius: 10rpx;
  text-align: center;
}
.bottomBar .share {
  position: absolute;
  right: 174rpx;
}
.bottomBar .del {
  position: absolute;
  right: 44rpx;
}

.section {
  height: 128rpx;
  justify-content: flex-end;
  align-items: center;
  background: #fff;
  display: flex;
  color: #333333;
}
.section .section__title {
  font-size: 28rpx;
}
.section picker {
  width: 210rpx;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  border: solid 1rpx #999999;
  border-radius: 10rpx;
  color: #999999;
  margin: 0 24rpx;
}
</style>

<template>
  <view class="container">
      <view wx:if="{{!is_empty}}">
          <view class='topBar' wx:if="{{!is_empty}}">
              <view class='fullSelect'>
                  <view class='big_circle' @tap='checkAll'>
                    <view class="{{checkedAll}}"></view>
                  </view>
                  <view>全选</view>
              </view>
              <view @tap="done()" wx:if="{{isEdit}}">完成</view>
              <view @tap="edit()" wx:else>编辑</view>
          </view>
          <view class='list' wx:if="{{!is_empty}}">
              <repeat for="{{tableData}}" index="index" item="item">
                  <view class='item'>
                      <view class='big_circle'  @tap='check({{index}})'>
                          <view  class="{{tableData[index].active ? 'fill_circle' : ''}}"></view>
                      </view>
                      <image src="{{item.goods_image||item.pgoods_image}}" mode="aspectFill"/>
                      <view class='info'>
                          <view class='desc'>{{item.goods_name||item.pgoods_name}}</view>
                          <view class='price'>¥{{item.goods_price|| item.pgoods_price}}</view>
                          <view class='number_wrap'>
                            <view class='minus' @tap='minus({{item}})'>
                                <image src="../images/icon_jian@2x.png" />
                            </view>
                            <view class='number'>{{item.goods_num||item.pgoods_choosenum}}</view>
                            <view class='add' @tap='add({{item}})'>
                                <image src='../images/icon_jia@2x.png' />
                            </view>
                          </view>
                      </view>
                  </view>
              </repeat>
          </view>

          <view class='bottomBar' wx:if='{{isEdit}}'>
              <view class='del' @tap='delete'>删除</view>
          </view>
          <view class='bottomBar' wx:else>
              <view class='sum'>合计：<text>¥{{allMoney}}</text></view>
              <view class='btn'   @tap='goFirmOrder()'>结算({{countItem}})</view>
          </view>
         
      </view> 
     <!--暂无数据显示-->
      <placeholder :show.sync="is_empty" message="购物车是空的呢"></placeholder> 

  </view>
</template>

<script>
import wepy from "wepy";
import calc from "calculatorjs";
import { shttp } from "../utils/http";
import Placeholder from "../components/placeholder";
import { showSuccessToast, showFailToast } from "../utils/tools";
import { getCode } from "../utils/user-tools";
import getTimes from "../utils/formatedate.js";
export default class ShoppingCart extends wepy.page {
  config = {
    navigationBarTitleText: "购物车"
  };
  data = {
    //是否编辑
    isEdit: false,
    //购物车商品列表
    tableData: [],
    //商品个数
    countItem: 0,
    //总价
    allMoney: 0,
    //是否全选
    isCheckedAll: false,
    //是否显示提示
    is_empty: false,
    //初始日期
    date: "2016-09-01"
  };
  computed = {
    // isEdit() {
    //   return this.data.editable;
    // },
    nowDate: () => getTimes.formatTime(new Date(), "Y-M-D"),
    checkedAll() {
      return this.data.isCheckedAll ? "fill_circle" : "";
    }
  };
  components = {
    placeholder: Placeholder
  };
  methods = {
    //日期修改
    bindTimeChange_start: function(e) {
      console.log(e);
      // console.log("picker发送选择改变，携带值为", e.detail.value);
      this.editDateItem(e.detail.value, e.target.dataset.idx, "start");
      //  this.$apply();
    },
    //日期修改
    bindTimeChange_end: function(e) {
      console.log(e);
      // console.log("picker发送选择改变，携带值为", e.detail.value);
      this.editDateItem(e.detail.value, e.target.dataset.idx, "end");
      //  this.$apply();
    },
    //删除某个商品
    async delete() {
      if (this.isCheckedAll) {
        const res = await shttp.delete(`/api/v1/member/cart`).end();
        if (res.status == 0) {
          this.tableData = [];
          this.is_empty = true;
          this.cartPricing();
          this.$apply();
        } else {
          showFailToast(res.error);
        }
      } else {
        let arr = this.tableData.filter(function(x) {
          return x.active == true;
        });
        for (let i = 0; i < arr.length; i++) {
          this.deleteItem(arr[i].cart_id);
        }
      }
    },
    //编辑
    edit() {
      this.isEdit = true;

      this.$apply();
    },
    //编辑完成
    done() {
      this.isEdit = false;
      this.cartPricing();
      this.$apply();
    },
    //单选
    check(index) {
      console.log(index);
      console.log(this.tableData[index]);

      if (this.tableData[index].active) {
        this.tableData[index].active = false;
        //查看是否全部为false了，如果是全选否在不全选
        this.isCheckedAll = false;
        this.cartPricing();
        // }
      } else {
        //查看是否全部为true了，如果是全选否在不全选
        this.tableData[index].active = true;
        this.isCheckedAll = this.tableData.every(function(e) {
          return e.active == true;
        });

        this.cartPricing();
      }
      this.$apply();
    },
    //全选
    checkAll() {
      console.log(this.isCheckedAll);
      this.isCheckedAll = !this.isCheckedAll;
      if (this.isCheckedAll) {
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i]["active"] = true;
        }
        //全选，全部计算
        this.cartPricing();
        this.$apply();
      } else {
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i]["active"] = false;
        }
        //全不选，个数和总金额清0
        this.countItem = 0;
        this.allMoney = 0;
        this.$apply();
      }
    },

    //减少单个商品数量
    async minus(item) {
      let arr = this.tableData.filter(function(x) {
        return x.cart_id == item.cart_id;
      });
      console.log("要减少的商品");
      console.log(arr);
      if (arr[0].goods_num < 2) return;
      const res = await shttp
        .put(`/api/v1/member/cart`)
        .send({
          cart_id: item.cart_id,
          quantity: item.goods_num - 1
        })
        .end();
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].cart_id == item.cart_id) {
          this.tableData[i].goods_num = this.tableData[i].goods_num - 1;
        }
      }
      console.log("格式化后");
      console.log(this.tableData);
      this.$apply();
      this.cartPricing(); //计算
    },
    //增加单个商品数量
    async add(item) {
      const res = await shttp
        .put(`/api/v1/member/cart`)
        .send({
          cart_id: item.cart_id,
          quantity: Number(item.goods_num) + 1
        })
        .end();
      //  console.log(this.tableData)
      if (res.data.length != 0) {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].cart_id == item.cart_id) {
            this.tableData[i].goods_num =
              Number(this.tableData[i].goods_num) + 1;
          }
        }
        console.log("格式化后");
        console.log(this.tableData);
        this.$apply();
        this.cartPricing(); //计算
      } else {
        wx.showToast({
          title: res.error == "修改失败" ? "操作太频繁" : res.error,
          icon: "none",
          duration: 2000
        });
      }
    },
    //提交订单
    goFirmOrder(that) {
      if (that) {
        let arr = that.tableData.filter(function(x) {
          return x.active == true;
        });
        if (arr.length === 0) {
          return wx.showToast({
            title: "还没有选中任何商品！",
            icon: "none",
            duration: 2000
          });
        }
        wx.navigateTo({
          url:
            `/pages/store/firmOrder?type=cart&goods=` +
            encodeURIComponent(JSON.stringify(arr))
        });
      } else {
        let arr = this.tableData.filter(function(x) {
          return x.active == true;
        });
        if (arr.length === 0) {
          return wx.showToast({
            title: "还没有选中任何商品！",
            icon: "none",
            duration: 2000
          });
        }
        wx.navigateTo({
          url:
            `/pages/store/firmOrder?type=cart&goods=` +
            encodeURIComponent(JSON.stringify(arr))
        });
      }
    }
  };
  //获取手机号
  async getPhoneNumber(e) {
    if (e.detail.iv) {
      let code = await getCode();
      let data = {
        iv: e.detail.iv,
        encryptedData: e.detail.encryptedData,
        code: code.code
      };
      this.postPhone(data);
    } else {
      console.log("授权取消");
    }
  }

  onLoad() {}
  onShow() {
    this.allMoney = 0
    this.countItem = 0
    this.wxUserInfo = wx.getStorageSync("wxUserInfo");
    // console.log(this.wxUserInfo)

    wx.showLoading({
      title: "加载中"
    });
    this.isEdit = false;
    this.isCheckedAll = false;
    //获取购物车列表
    this.getCartList();
  }
  //获取购物车商品列表
  async getCartList() {
    const res = await shttp.get(`/api/v2/member/cart`).end();
    //console.log(res)
    console.log("第一次返回购物车商品列表");
    if (!res.data.store_cart_list["1"]) {
      this.tableData = [];
    } else {
      this.tableData = res.data.store_cart_list["1"];
    }
    console.log(this.tableData);
    if (!this.tableData || this.tableData.length == 0) {
      this.is_empty = true;
      wx.hideLoading();
      this.$apply();
      return;
    }
    //console.log(this.tableData)
    for (var i = 0; i < this.tableData.length; i++) {
      for (var k in this.tableData[i]) {
        this.tableData[i]["active"] = false;
      }
    }
    this.tableData = this.tableData.filter(function(x) {
      return x.goods_num != 0;
    });
    console.log("购物车商品列表");
    console.log(this.tableData);
    console.log("有刷新");
    if (this.tableData.length != 0) {
      this.is_empty = false;
    } else {
      this.is_empty = true;
    }
    this.$apply();
    wx.hideLoading();
    this.$apply();
  }
  //计算购物车商品总价
  async cartPricing() {
    let skuMaps = {};
    this.countItem = 0; //汇总数量清0
    this.allMoney = 0; //价格清0 因为总价格已tableData中的商品重新计算
    let arr = this.tableData.filter(function(x) {
      return x.active == true;
    });
    if (arr.length == 0) return;
    //进行数量和价格的汇总计算
    arr.forEach(element => {
      if (element.pgoods_choosenum) {
        this.countItem += element.pgoods_choosenum;
        this.allMoney = this.allMoney + element.goods_price * element.goods_num;
      } else {
        this.countItem += Number(element.goods_num);
        this.allMoney = this.allMoney + element.goods_price * element.goods_num;
      }
    });
    this.allMoney = this.allMoney.toFixed(2);
    this.$apply();
  }
  //购物车单个或者多个删除
  async deleteItem(cartid) {
    const res = await shttp
      .delete(`/api/v1/member/cart`)
      .send({
        cart_id: cartid
      })
      .end();
    // console.log(res)
    console.log(this.tableData);
    if (res.status == 0) {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].cart_id == cartid) {
          this.tableData.splice(i, 1);
        }
      }
      console.log("删除后");
      console.log(this.tableData);
      this.$apply();
    } else {
      showFailToast(result.error);
    }
  }
}
</script>

