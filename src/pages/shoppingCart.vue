<style lang="sass">
@import '../pages/base.sass'

.container
  font: 32rpx PingFang-SC-Medium
  background: #F4F4F4
  min-height: 100vh
.topBar
  display: flex
  justify-content: space-between
  line-height: 88rpx
  height: 88rpx
  padding: 0 30rpx
  color: #000
  background: #FFFFFF
  border-top: 1rpx solid #F4F4F4 
  .fullSelect
    display: flex
    align-items: center
    
.big_circle
  @include flex
  justify-content: center
  width: 38rpx
  height: 38rpx
  margin-right: 10rpx
  border: 1rpx solid #c3c3c3
  border-radius: 50%
  .fill_circle
    width: 16rpx
    height: 16rpx
    border-radius: 50%
    background: $orange

.item
  display: flex
  justify-content: space-around
  align-items: center
  height: 250rpx
  border-bottom: 1rpx solid #EEEEEE
  background: #fff
  margin: 0 24rpx 0 24rpx
  image
    width: 180rpx
    height: 180rpx
    
  .info
    position: relative
    width: 360rpx
    height: 180rpx
    font-size: 24rpx
    .desc
      width: 100%
      height: 80rpx
      display: -webkit-box
      -webkit-box-orient: vertical
      -webkit-line-clamp: 2
      overflow: hidden
    .sub_desc
      margin: 20rpx 0
      font-size: 24rpx
      color: #999
      width: 100%
      height: 35rpx
      display: -webkit-box
      -webkit-box-orient: vertical
      -webkit-line-clamp: 1
      overflow: hidden
    .price
      font-size: 28rpx
      color: $orange
    .number_wrap
      position: absolute
      bottom: -20rpx
      right: 0
      display: flex
      line-height: 50rpx
      text-align: center
      .minus, .add
        width: 50rpx
        height: 50rpx
        color: #888
        background: #EEEEEE
      .minus
        @include flex
        justify-content: center
        image
          width: 26rpx
          height: 2rpx
      .add
        @include flex
        justify-content: center
        image
          width: 26rpx
          height: 26rpx
      .number
        width: 90rpx
        color: #202020
        border-left: 1rpx solid $BG_WHITE
        border-right: 1rpx solid $BG_WHITE
        background: #EEEEEE

$bottomBarHeight: 100rpx
$rightLength: 44rpx

.bottomBar
  position: fixed
  bottom: 0rpx
  display: flex
  align-items: center
  width: 100%
  height: $bottomBarHeight
  font-size: 28rpx
  color: #282425
  background: #fff
  .sum
    flex-grow: 1
    padding: 0 25rpx
    text-align: right
    text
      font: 32rpx PingFang-SC-Bold
      color: #AF0000
  .btn
    width: 190rpx
    line-height: $bottomBarHeight
    background: $orange
    text-align: center
    color: #fff
  .share, .del
    width: 100rpx
    line-height: 44rpx
    border: 1rpx solid #282425
    border-radius: 10rpx
    text-align: center
  .share
    position: absolute
    right: 130rpx+$rightLength
  .del
    position: absolute
    right: $rightLength
.list  
  padding-bottom: 120rpx 
.shop-goods
  background: #fff
  margin: 20rpx 24rpx 0 24rpx
  border-radius: 20rpx
.shop-info
  @include flex
  padding: 25rpx
  font-size: 24rpx
  image
    width: 32rpx
    height: 32rpx
    
    margin: 0 23rpx
.empty-placeholder
  margin-top: 0
  padding-top: 70rpx    
</style>

<template>
  <view class="container">
      <view wx:if="{{!is_empty}}">
          <view class='topBar'>
              <view class='fullSelect'>
                  <view class='big_circle' @tap='checkAll'>
                    <view class="{{checkedAll}}"></view>
                  </view>
                  <view>全选</view>
              </view>
              <view @tap='done' wx:if='{{isEdit}}'>完成</view>
              <view @tap='edit' wx:else>编辑</view>
          </view>

          <view class='list'>
              <repeat for='{{cartList}}' index='index' item='item'>
                  <view class="shop-goods">
                    <view class="shop-info">
                      <view class='big_circle' @tap='checkShop' data-index="{{index}}">
                        <view class="{{item.checked ? 'fill_circle' : ''}}"></view>
                      </view>
                      <image src='{{item.store_avatar}}' />
                      {{item.store_name}}
                    </view>
                    <repeat for='{{item.data}}' index='index' item='goods'>
                       <view class='item'>
                      <view class='big_circle' @tap='checkGoods({{goods}})' data-index="{{index}}">
                          <view class="{{goods.checkGoods ? 'fill_circle' : ''}}"></view>
                      </view>
                      <image src='{{goods.goods_image}}' mode="aspectFit"/>
                      <view class='info'>
                          <view class='desc'>{{goods.goods_name}}</view>
                          <view class='sub_desc'>{{goods.goods_spec?goods.goods_spec:""}}</view>
                          <view class='price'>¥{{goods.goods_price}}</view>
                          <view class='number_wrap'>
                            <view class='minus' @tap='minus' data-index="{{index}}" data-goods="{{goods}}">
                                <image src='../images/icon_jian@2x.png' />
                            </view>
                            <view class='number'>{{goods.goods_num}}</view>
                            <view class='add' @tap='add' data-index="{{index}}" data-goods="{{goods}}">
                                <image src='../images/icon_jia@2x.png' />
                            </view>
                          </view>
                      </view>
                      </view>
                    </repeat>  
                  </view>
              </repeat>

          </view>

          <view class='bottomBar' wx:if='{{isEdit}}'>
              <!-- <view class='share'>分享</view> -->
              <view class='del' @tap='deleteBtn'>删除</view>
          </view>
          <view class='bottomBar' wx:else>
              <view class='sum'>合计：<text>¥{{getPrice}}</text></view>
              <view class='btn' @tap='goFirmOrder'>结算({{getCount}})</view>
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
import { onceClick } from "../utils/tools";
import { SHOPID } from "../constant/configConstant";
import Placeholder from "../components/placeholder";
import { showSuccessToast, showFailToast } from "../utils/tools";
export default class ShoppingCart extends wepy.page {
  // calc.add(0.1, 0.2) // 0.3 加
  // calc.sub(0.1, 0.2) // -0.1 减
  // calc.mul(0.1, 0.2) // 0.02 乘
  // calc.div(0.1, 0.2) // 0.5 除
  // calc.round(0.555, 2) // 0.56 保留两位小数
  config = {
    navigationBarTitleText: "购物车"
  };
  data = {
    //
    editable: false,
    // 总量
    count: 0,
    // 总价
    price: 0,
    //
    isCheckedAll: false,
    checkedList: [],
    //
    cartList: [],
    isEdit: false,
    storelist: [],
    is_empty: false,
    cartNum: null
  };

  computed = {
    checkedAll() {
      return this.isCheckedAll ? "fill_circle" : "";
    },
    getCount: () => this.count,
    getPrice: () => this.price
  };

  components = {
    placeholder: Placeholder
  };

  methods = {
    edit() {
      this.isEdit = true;
    },
    done() {
      this.isEdit = false;
    },
    async minus(e) {
      onceClick(this, "minusClick", async () => {
        let storeIndex = e.currentTarget.dataset.goods.storeIndex;
        let goodsIndex = e.currentTarget.dataset.index;
        let goods = this.cartList[storeIndex].data[goodsIndex];
        if (goods.goods_num === 1) {
          return;
        }
        const res = await shttp
          .put(`/api/v1/member/cart`)
          .send({
            cart_id: goods.cart_id,
            quantity: goods.goods_num - 1
          })
          .end();
        if (res.status == 0) {
          goods.goods_num--;
          this.cartNum--;
          wx.setStorageSync("cartNum", this.cartNum);
          if (goods.checkGoods) {
            this.count--;
            this.price = calc.sub(this.price, goods.goods_price);
          }
        } else {
          showFailToast(res.error);
        }
        this.$apply();
      });
    },
    async add(e) {
      onceClick(this, "addClick", async () => {
        let storeIndex = e.currentTarget.dataset.goods.storeIndex;
        let goodsIndex = e.currentTarget.dataset.index;
        let goods = this.cartList[storeIndex].data[goodsIndex];
        const res = await shttp
          .put(`/api/v1/member/cart`)
          .send({
            cart_id: goods.cart_id,
            quantity: goods.goods_num + 1
          })
          .end();
        if (res.status == 0 && res.error == "") {
          goods.goods_num++;
          this.cartNum++;
          wx.setStorageSync("cartNum", this.cartNum);
          if (goods.checkGoods) {
            this.count++;
            this.price = calc.add(this.price, goods.goods_price);
          }
        } else {
          showFailToast(res.error);
        }

        this.$apply();
      });
    },
    goFirmOrder() {
      if (this.count === 0) {
        return wx.showToast({
          title: "还没有选中任何商品！",
          icon: "none",
          duration: 2000
        });
      }
      wx.navigateTo({
        url:
          `/pages/store/firmOrder?type=cart&goods=` +
          encodeURIComponent(JSON.stringify(this.cartList))
      });
    },
    async deleteBtn() {
      if (this.isCheckedAll) {
        const res = await shttp.delete(`/api/v1/member/cart`).end();
        if (res.status == 0) {
          this.cartList = [];
          this.price = 0;
          this.count = 0;
          this.cartNum = 0;
          wx.setStorageSync("cartNum", this.cartNum);
          this.is_empty = true;
          this.$apply();
        } else {
          showFailToast(res.error);
        }
        return;
      } else {
        let i = this.cartList.length;
        while (i--) {
          let z = this.cartList[i].data.length;
          while (z--) {
            if (this.cartList[i].data[z].checkGoods) {
              let cartId = this.cartList[i].data[z].cart_id;
              const res = await shttp
                .delete(`/api/v1/member/cart`)
                .send({
                  cart_id: cartId
                })
                .end();
              if (res.status == 0) {
                this.price = calc.sub(
                  this.price,
                  calc.mul(
                    this.cartList[i].data[z].goods_num,
                    this.cartList[i].data[z].goods_price
                  )
                );
                this.count = this.count - this.cartList[i].data[z].goods_num;
                this.cartNum =
                  this.cartNum - this.cartList[i].data[z].goods_num;
                wx.setStorageSync("cartNum", this.cartNum);
                this.cartList[i].data.splice(z, 1);
                this.$apply();
              } else {
                showFailToast(result.error);
              }
            }
          }
        }
        let y = this.cartList.length;
        while (y--) {
          if (this.cartList[y].data.length == 0) {
            this.cartList.splice(y, 1);
          }
        }
      }
      this.$apply();
    }
  };
  onLoad() {}
  onShow() {
    this.cartNum = wx.getStorageSync("cartNum");
    this.count = 0;
    this.price = 0;
    this.isCheckedAll = false;
    this.is_empty = false;
    wx.showLoading({
      title: "加载中"
    });
    this.getCartList();
    this.$apply();
  }

  async getCartList() {
    let result = [];
    const res = await shttp.get(`/api/v1/member/cart`).end();
    if (res.status === 0) {
      let list = Object.values(res.data.store_cart_list);
      list.forEach(item => {
        result = result.concat(item);
      });
      let storelist = Object.values(res.data.store_list);
      this.storelist = storelist;
      wx.hideLoading();
      if (result.length == 0) {
        this.is_empty = true;
        this.$apply();
        return;
      }
    } else {
      wx.hideLoading();
      this.is_empty = true;
      this.$apply();
      return;
    }

    let map = {},
      nList = [];
    result.forEach(item => {
      if (!map[item.store_id]) {
        nList.push({
          store_id: item.store_id,
          store_name: item.store_name,
          data: [item]
        });
        map[item.store_id] = item;
      } else {
        //因为forEach不支持break，所以使用every实现
        nList.every(nItem => {
          if (nItem.store_id === item.store_id) {
            nItem.data.push(item);
            return false;
          }
          return true;
        });
      }
    });
    nList.forEach((item, index) => {
      item.checked = false;
      let storeIndex = index;
      item.data.forEach(goods => {
        goods.storeIndex = storeIndex;
        goods.checkGoods = false;
      });
    });
    this.cartList = nList;
    this.cartList;
    this.cartList.forEach((item, index) => {
      item.store_avatar = this.storelist[index].store_avatar;
    });
    this.$apply();
  }
  //店铺中的某件商品选择
  checkGoods(e) {
    let storeIndex = e.currentTarget.dataset.wpycheckgoodsA.storeIndex;
    let goodsIndex = e.currentTarget.dataset.index;
    //店铺中的某件商品选择
    this.cartList[storeIndex].data[goodsIndex].checkGoods = !this.cartList[
      storeIndex
    ].data[goodsIndex].checkGoods;
    let goods = this.cartList[storeIndex].data[goodsIndex];
    if (goods.checkGoods) {
      this.count = this.count + goods.goods_num;

      this.price = calc.add(
        this.price,
        calc.mul(goods.goods_num, goods.goods_price)
      );
    } else {
      this.count = this.count - goods.goods_num;

      this.price = calc.sub(
        this.price,
        calc.mul(goods.goods_num, goods.goods_price)
      );
    }

    //店铺反选
    const storeChecked = this.cartList[storeIndex].data.every(item => {
      return item.checkGoods == true;
    });
    if (storeChecked) {
      this.cartList[storeIndex].checked = true;
    } else {
      this.cartList[storeIndex].checked = false;
    }

    //全选的反选
    const allChecked = this.cartList.every(item => {
      return item.checked == true;
    });
    if (allChecked) {
      this.isCheckedAll = true;
    } else {
      this.isCheckedAll = false;
    }
    this.$apply();
  }
  //店铺选择
  checkShop(e) {
    let storeIndex = e.currentTarget.dataset.index;
    this.cartList[storeIndex].checked = !this.cartList[storeIndex].checked;
    if (this.cartList[storeIndex].checked) {
      this.cartList[storeIndex].data.forEach(item => {
        if (item.checkGoods) {
          console.log("商品已选");
        } else {
          item.checkGoods = true;
          this.price = calc.add(
            this.price,
            calc.mul(item.goods_num, item.goods_price)
          );
          this.count = this.count + item.goods_num;
        }
      });
    } else {
      this.cartList[storeIndex].data.forEach(item => {
        if (item.checkGoods) {
          item.checkGoods = false;
          this.price = calc.sub(
            this.price,
            calc.mul(item.goods_num, item.goods_price)
          );
          this.count = this.count - item.goods_num;
        } else {
          console.log("商品已取消");
        }
      });
    }
    //全选的反选
    const allChecked = this.cartList.every(item => {
      return item.checked == true;
    });
    if (allChecked) {
      this.isCheckedAll = true;
    } else {
      this.isCheckedAll = false;
    }
    this.$apply();
  }
  //全选
  checkAll() {
    this.isCheckedAll = !this.isCheckedAll;
    if (this.isCheckedAll) {
      this.cartList.forEach(item => {
        if (item.checked) {
          console.log("店铺已选");
        } else {
          item.checked = true;
          item.data.forEach(goods => {
            if (goods.checkGoods) {
              console.log("商品已选");
            } else {
              goods.checkGoods = true;
              this.price = calc.add(
                this.price,
                calc.mul(goods.goods_num, goods.goods_price)
              );
              this.count = this.count + goods.goods_num;
              this.$apply();
            }
          });
        }
      });
    } else {
      this.cartList.forEach(item => {
        if (item.checked) {
          item.checked = false;
          item.data.forEach(goods => {
            if (goods.checkGoods) {
              goods.checkGoods = false;
              this.price = calc.sub(
                this.price,
                calc.mul(goods.goods_num * goods.goods_price)
              );
              this.count = this.count - goods.goods_num;
              this.$apply();
            } else {
              console.log("商品已取消");
            }
          });
        } else {
          console.log("店铺已取消");
        }
      });
    }
    this.$apply();
  }
}
</script>

