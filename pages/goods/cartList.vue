<template>
	<view class="cart_page_wrap page_wrap s_bg_f">
    <view v-if="list.length">
      <view class="">

          <view class="cart_wrap" v-for="(item, key) in list" :key="key" >
            <uni-swipe-action>
              <uni-swipe-action-item :show="item.showDelete">
                <cart :config="item" @change="update"></cart>

                <template v-slot:right>
                  <view class="del_wrap s_fc_f s_bg_12" @tap="openDelDialog(item)">
                    <image class="i_del img" src="../../static/goods/delete.png"></image>
                    <view class="fs24">删除</view>
                  </view>
                </template>
              </uni-swipe-action-item>
            </uni-swipe-action>
          </view>

      </view>

      <view class="bottom_bar between s_bg_f9">
        <view class="ml40 flex">
          <view class="check_wrap s_fc_10">
            <view class="i_circle" :class="[checkAll ? 'i_circle_hide' : '']" @tap="changeCheck">
              <image class="i_check img" src="../../static/goods/checked.png" v-if="checkAll"></image>
            </view>

            <view class="fs24">全选</view>
          </view>

          <view class="ml130 s_fc_12">合计：<text class="s_fc_price">¥</text><text class="goods_price s_fc_price">{{price}}</text></view>
        </view>

        <view class="flex s_fc_f">
          <view class="btn s_bg_11" @tap="goSubmit">去结算</view>
        </view>
      </view>
    </view>

    <view class="empty_wrap" v-else>
      <image class="i_empty mt100 img" src="../../static/goods/empty.png" v-if="checkAll"></image>
      <view class="empty_desc fs24 s_fc_11">购物车还是空空如也哦！</view>
      <view class="home_btn s_fc_f s_bg_13" @tap="goHome">去首页看看</view>
    </view>
		<!-- <uni-load-more :status="status"  :icon-size="16" :content-text="contentText" /> -->
	</view>
</template>

<script>
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import cart from '@/components/goods/cart.vue';
import goodsApi from '@/api/goods';
import utils from '@/common/util.js';
import * as gd from '@/common/global.js';

export default {
	components: {
    uniSwipeAction,
    uniSwipeActionItem,
    cart,
		// uniLoadMore
	},
	data() {
		return {
      id: null,

      actionOption: [{
        text: '删除',
        style: {
          backgroundColor: '#FD5252',
        },
      }],

      list: [],
      page: 1,
      limit: 10,
      total: 0,

      price: 0,

			status: 'more',
			contentText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多'
			}
		};
  },

  computed: {
    cartIdList(){ return this.list.filter(v => v.checked).map(v => `${v.cart_id}|${v.goods_num}`); },
    checkAll(){ return this.list.filter(v => v.cart_status == 0).every(v => v.checked); },
  },

	methods: {
    changeCheck() {
      // if(this.list.some(v => v.cart_status == 1)) return uni.showToast({ title: '有商品已过期, 无法全选!', icon: 'none', });

      let isAll = !this.checkAll;
      this.list.filter(v => v.cart_status == 0).forEach(v => v.checked = isAll);
      this.checkout();
    },

    update() {
      this.checkout();
    },

    openDelDialog(item) {
      uni.showModal({ content: '确认删除吗?', success: e => { if(e.confirm) this.deleteCart(item.cart_id); }, });
    },

    goSubmit(e) {
      if(!this.cartIdList.length) return ;

      uni.showLoading({ title: '...', mask: true, });
      uni.setStorageSync('skuList', this.list.filter(v => v.checked));

      uni.navigateTo({ url: `/pages/my/order/submit`, });
    },

    goHome(e) {
      // uni.showLoading({ title: '...', mask: true, });

      uni.switchTab({ url: `/pages/home/index`, });
    },

    async checkout() {
      // 没有选择商品
      if(!this.cartIdList.length) return this.price = 0;

      let param = { ifcart: 1, cart_id: this.cartIdList, };

      uni.showLoading({ title: 'loading...', mask: true, });

      let res = await goodsApi.checkout(param);
      uni.hideLoading();

      if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '结算失败!', icon: 'none', });
      
      if(res.data) {
        this.price = res.data.store_final_order_total[1];
      }
    }, 

    async deleteCart(cart_id) {
      let param = { cart_id, };

      uni.showLoading({ title: 'loading...', mask: true, });

      let res = await goodsApi.deleteCart(cart_id, param);
      uni.hideLoading();
      if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '删除失败!', icon: 'none', });
      
      if(res.data) {
        uni.showToast({ title: '删除成功!', icon: 'success', });
        this.init();
      }
    },

		async getList() {
      let param = { page: this.page, limit: this.limit, },
          list;

      uni.showLoading({ title: 'loading...', mask: true, });

      let res = await goodsApi.getCartList(param);
      uni.hideLoading();
      if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取购物车信息失败!', icon: 'none', });
      
      if(res.data) {
        list = res.data.store_cart_list[1] || [];
        list.forEach(this.format);
        this.list = this.list.concat(list);
        this.total = res.pagination ? res.pagination.total : this.list.length;
      }
    },

    format(v) {
      v.checked = false;

			return v;
		},

    init() {
      this.list = [];
      this.page = 1;
      this.total = 0;
      this.price = 0;

      this.getList();
    },
  },
  
  onShow(param) {
    this.init();
  },

	onPullDownRefresh() {
    this.init();
    uni.stopPullDownRefresh();
  },

	onReachBottom() {
    if(this.total <= this.page * this.limit) return console.log('----');

		this.page++;
		this.getList();
  },

};
</script>

<style>
.cart_page_wrap{
  padding: 0 0 80rpx; 
}

.cart_wrap{
  padding: 50rpx 0 44rpx;
  border: 4rpx solid #F9F9F9;
}

.bottom_bar{
  position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100rpx;
	text-align: center;
}

.check_wrap{
  text-align: center;
}
.i_circle{
  flex-shrink: 0;
  width: 32rpx;
  height: 32rpx;
  margin: 0 auto;
  border: 2rpx solid #979797;
  border-radius: 50%;
  box-sizing: border-box;
}
.i_circle_hide{
  border: none;
}
.i_check{
  display: block;
  border-radius: 50%;
}

.del_wrap{
  width: 120rpx;
  text-align: center;
}
.i_del{
  display: block;
  width: 36rpx;
  height: 36rpx;
  margin: 40rpx auto 0;
}

.goods_price{
  font-size: 36rpx;
}

.btn{
	width: 212rpx;
	height: 72rpx;
	margin: 0 24rpx 0 0;
	line-height: 72rpx;
	text-align: center;
	border-radius: 40rpx;
}

.empty_wrap{
  text-align: center;
}
.i_empty{
  width: 570rpx;
  height: 380rpx;
}
.empty_desc{
  margin: 64rpx 0 0;
}
.home_btn{
  width: 414rpx;
  margin: 124rpx auto 0;
  padding: 20rpx 0;
  font-size: 32rpx;
  line-height: 1.3;
  border-radius: 40rpx;
  text-align: center;
}

.s_fc_10{ color: #222848; }
.s_fc_11{ color: #5E5C75; }
.s_fc_12{ color: #3E3F55; }

.s_bg_10{ background: #F9F9F9; }
.s_bg_11{ background: linear-gradient(136deg, #FE705A 0%, #FD4750 100%); }
.s_bg_12{ background: #FD5252; }
.s_bg_13{ background: #32B48F; }
</style>
