<template>
	<view class="page_wrap my_page_wrap s_bg_11">

    <view class="user_container s_bg_main">
      <view class="user_wrap between s_bg_f">
        <view class="flex">
          <view>
            <avatar class="user_img" :src="user && user.member_avatar || '../../static/my/avatar.png'" @update="getUser"></avatar>
          </view>

          <view class="ml40 s_fc_gray">
            <view class="user_name_wrap flex s_fc_10">
              <view class="user_name">{{user ? user.member_truename : ''}}</view>
              <view class="region_wrap ml20 fs24">{{region}}</view>
            </view>
            <view class="mt10 fs24">{{user ? user.member_mobile : ''}}</view>
          </view>
        </view>

        <view class="user_level fs24 s_fc_11 s_bg_10">级别：{{identity}}</view>
      </view>
    </view>

    <view class="order_wrap s_fc_12 s_bg_f" v-if="isStore">
      <view class="order_nav between" @tap="goOrder">
        <view class="bold">我的订单</view>
        <view class="fs24 s_fc_gray">查看全部订单 >></view>
      </view>

      <view class="order_list_wrap mt40 between">
        <view class="order_status" v-for="(item, index) in orderList" :key="index" @tap="goOrder(item)">
          <view class="order_icon_wrap">
            <image :class="[item.class]" :src="item.img" mode=""></image>
            <view class="order_mark s_fc_f s_bg_price" v-if="user && user.order[item.from]">{{user.order[item.from]}}</view>
          </view>
          <view class="fs24">{{item.title}}</view>
        </view>
      </view>
    </view>

    <view class="module_wrap bold s_fc_12">
      <view class="module between s_bg_f" v-for="(item, index) in moduleList" :key="index" @tap="go(item)">
        <view>{{item.title}}</view>

				<uni-icons type="arrowright" color="gray" size="12" />
      </view>
    </view>
		
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import avatar from '@/components/common/avatar.vue'
  import userApi from '@/api/user';
  import * as gd from '@/common/global.js';

	export default {
		components: {
      uniIcons,
      avatar,
    },

		data() {
			return {
        user: null,

        orderList: [
          { title: '待付款', status: gd.ORDER_UN_PAY, class: 'i_unpay', img: '../../static/order/unPay.png', from: 'obligation', },
          { title: '待发货', status: gd.ORDER_PAYED, class: 'i_payed', img: '../../static/order/unSend.png', from: 'redact', },
          { title: '待收货', status: gd.ORDER_SEND, class: 'i_send', img: '../../static/order/sended.png', from: 'donate', },
          { title: '待评价', status: gd.ORDER_RECEIVE, class: 'i_eval', img: '../../static/order/unEval.png', from: 'evaluated', },
          { title: '售后',   class: 'i_aftersale', img: '../../static/order/aftersale.png', path: '/pages/my/order/aftersale', from: 'after_sale', },
        ],

        storeList: [
          { title: '秒杀订单', path: '/pages/my/order/seckill', },
          { title: '修改密码', path: '/pages/login/pwd', },
          { title: '我的优惠卷', path: '/pages/coupon/list', },
          { title: '我的收货地址', path: '/pages/my/address/index', },
          { title: '历史开票', path: '/pages/my/invoice/list', },
          { title: '分享', path: '/pages/about/share', },
        ],
        dealerList: [
          { title: '返利中心', path: '/pages/my/distribute/index', },
          { title: '我的团队', path: '/pages/my/distribute/group' },
          { title: '修改密码', path: '/pages/login/pwd', },
          // { title: '我的收货地址', path: '/pages/my/address/index', },
          { title: '分享', path: '/pages/about/share', },
        ],
			}
    },

    computed: {
      isStore(){ return this.user && this.user.member_rank == gd.DRUGSTORE; },
      isProvinceDealer(){ return this.user && this.user.member_rank == gd.PROVINCE_DEALER; },
      isCityDealer(){ return this.user && this.user.member_rank == gd.CITY_DEALER; },
      isDealer(){ return this.isProvinceDealer || this.isCityDealer; },
      region(){ return this.user ? this.isDealer ? `${this.user.rank_province_name}${this.user.rank_city_name || ''}` : `${this.user.pharmacy_name || ''}` : '' },
      identity(){ return this.isDealer ? `${this.isProvinceDealer ? '省' : '市'}服务商` : this.isStore ? `药房` : ''; },
      moduleList(){ return this.isStore ? this.storeList : this.dealerList; },
    },

		methods: {
      goOrder(item) {
        let queryStr = '';

        if(item.path) return uni.navigateTo({ url: item.path, });

        if(item.status) queryStr = `?status=${item.status}`;

        uni.navigateTo({ url: `/pages/my/order/list${queryStr}`, });
      },

      go(item) {
        console.log(item.path);
				if(item.path) uni.navigateTo({ url: item.path, });
      },

      async getUser() {
        uni.showLoading({ title:'Loading', mask: true, })

        const res = await userApi.getInfo({ });
        uni.hideLoading();
        if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取用户信息失败!', icon: 'none', });

				if(res.status == 0){
					uni.setStorageSync('user', this.user = res.data);
				}
      },		
    },

    onShow() {
      this.getUser(); 
    },
    
    onPullDownRefresh() {
      this.getUser();
      uni.stopPullDownRefresh();
    },
	}
</script>

<style>
.my_page_wrap{
}

.user_container{
  padding: 0 30rpx;
}
.user_wrap{
  padding: 30rpx 0 30rpx 30rpx; 
  border-radius: 28rpx 28rpx 0 0;
}
.user_img{
  flex-shrink: 0;
  width: 108rpx;
  height: 108rpx;
  border-radius: 50%;
}

.user_name_wrap{
  width: 320rpx;
  overflow: hidden;
}
.user_name{
  align-self: flex-start;
  font-size: 28rpx; 
  font-weight: bold;
  line-height: 1.3;
}
.region_wrap{
  width: 190rpx; 
  line-height: 1.3;
}

.user_level{
  padding: 0 20rpx;
  border-radius: 28rpx 0 0 28rpx;
}

.order_wrap, .module{
  margin: 24rpx 30rpx 0;
  padding: 24rpx 30rpx;
  border-radius: 16rpx;
}
.order_nav{
  padding: 0 0 20rpx;
  border-bottom: 1rpx solid #F9F9F9;
}
.order_status{
  text-align: center;
}
.order_icon_wrap{
  position: relative;
}
.order_mark{
  position: absolute;
  top: -10rpx;
  right: -10rpx;
  width: 40rpx;
  line-height: 1.3;
  font-size: 20rpx;
  border-radius: 20rpx;
}
.i_eval{
  width: 56rpx; 
  height: 56rpx;
}
.i_unpay, .i_payed, .i_send, .i_aftersale{
  width: 52rpx;
  height: 52rpx;
}

.module_wrap{
  padding: 0;
}

.s_fc_10{ color: #222848; }
.s_fc_11{ color: #F9D0A4; }
.s_fc_12{ color: #3E3F55; }

.s_bg_10{ background: #29282E; }
.s_bg_11{ background: #F9F9F9; }
</style>