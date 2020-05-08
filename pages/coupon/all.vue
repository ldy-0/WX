<template>
	<view class="coupon_page_wrap page_wrap s_bg_10" :style="{ paddingTop: navBarHeight + 'px', }">
    <!-- 导航栏 -->
    <view class="nav_wrap flex" :style="{ height: navBarHeight + 'px', paddingTop: statusHeight + 'px', }">
      <uni-icons class="ml20" type="arrowleft" color="white" size="20" @tap="goBack" />
    </view>

    <image class="bg_img img" src="../../static/coupon/bg.png"></image>

    <view class="main_wrap" :style="{ top: '-' + navBarHeight + 'px', }">
      <view class="main_img">
        <image class="title_img img" src="../../static/coupon/title.png"></image>
        <image class="img" src="../../static/coupon/main.png"></image>
      </view>

      <view class="order_list_wrap">

        <view class="coupon_wrap mb60 s_fc_11" :config="item" v-for="(item, key) in list" :key="key" @tap="accept(item)">
          <view class="coupon_body flex s_bg_f">
            <view class="coupon_price_wrap">
              <view>¥ <text class="coupon_price">{{item.vouchertemplate_price}}</text></view>

              <view class="fs24">{{item.vouchertemplate_price == 0 ? `满${item.vouchertemplate_limit}元可用` : `满${item.vouchertemplate_limit}减${item.vouchertemplate_price}`}}</view>
            </view>

            <view class="ml10">
              <view class="coupon_title">{{item.vouchertemplate_title}}</view>

              <view class="fs24 mt10">开始时间：{{item.startTime}}</view>

              <view class="fs24">失效时间：{{item.endTime}}</view>
            </view>

            <view class="btn fs24 ml20 s_fc_f" :class="[item.type == 0 ? 's_bg_11' : 's_bg_12']">{{item.type == 0 ? '领取' : '已领取'}}</view>
          </view>
        </view>

      </view>
    </view>

		<!-- <uni-load-more :status="status"  :icon-size="16" :content-text="contentText" /> -->
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue'
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import coupon from '@/components/coupon/index.vue';
import couponApi from '@/api/coupon';
import utils from '@/common/util.js';
import * as gd from '@/common/global.js';

export default {
	components: {
    uniIcons,
    coupon,
		// uniLoadMore
	},
	data() {
		return {
      tabBarList: [
        { title: '未使用', status: 1, },
        { title: '已使用', status: 2, },
        { title: '已过期', status: 3, },
      ],
      tabIndex: 0,
      scrollInto: '',

      list: [],
      page: 1,
      limit: 10,
      total: 0,
			status: null,

			contentText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多'
			}
		};
  },

  computed: {
    navBarHeight(){ return this.navBar; },
    statusHeight(){ return this.statusBar; },
  },

	onLoad(param) {
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

	methods: {
    goBack(){
      uni.navigateBack();
    },

    async accept(item) {
      if(item.type == 1) return uni.showToast({ title: '已领取!', icon: 'none', mask: true, });

      let param = { vouchertemplate_id: item.vouchertemplate_id };
      
      uni.showLoading({ title: 'loading...', mask: true, });

      let res = await couponApi.accept(param);
      uni.hideLoading();
      if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '领取失败!', icon: 'none', });
      
      if(res.data) {
        item.type = 1;
        uni.showToast({ title: '领取成功!', icon: 'success', mask: true, });
      }
    },
    
    init() {
      this.list = [];
      this.page = 1;
      this.total = 0;

      this.getList();
    },

		async getList() {
      let param = { page: this.page, limit: this.limit, type: 3, };
      
      uni.showLoading({ title: 'loading...', mask: true, });

      let res = await couponApi.getAllList(param);
      uni.hideLoading();
      if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '!', icon: 'none', });
      
      if(res.data) {
        res.data.forEach(this.format);
        this.list = this.list.concat(res.data);
        this.total = res.pagination ? res.pagination.total : this.list.length;
      }
    },

    format(v) {
      v.startTime = utils.toString(v.vouchertemplate_startdate * 1000).slice(2, -3);
      v.endTime = utils.toString(v.vouchertemplate_enddate * 1000).slice(2, -3);

			return v;
		},   
		
	}
};
</script>

<style>
.coupon_page_wrap{
  position: relative;
  z-index: 1;
}

.nav_wrap{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	box-sizing: border-box;
	z-index: 998;
}

.order_list_wrap{
  box-sizing: border-box;
  padding: 0 30rpx 60rpx;
}

.bg_img{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.main_wrap{
  position: relative;
}
.main_img{
  position: relative;
  height: 770rpx;
}
.title_img{
  position: absolute;
  top: 120rpx;
  left: calc(50% - 168rpx);
  width: 336rpx;
  height: 48rpx;
}

.coupon_wrap{
  position: relative;
  padding: 0 25rpx;
}
.coupon_wrap::after{
  content: '';
  position: absolute;
  bottom: -20rpx;
  left: 0;
  width: 100%;
  height: 40rpx;
  border-radius: 30rpx;
  background: #E23C2D;
  z-index: -1;
}
.coupon_body{
  height: 180rpx;
  border-radius: 30rpx;
  box-shadow: 0 0 30rpx 10rpx #ECA5AD inset;
  overflow: hidden;
}
.coupon_price_wrap{
  width: 200rpx;
  border-right: 1rpx dashed #FEDEB4;
  text-align: center;
  overflow: hidden;
  box-sizing: border-box;
}
.coupon_price{
  font-size: 52rpx;
}

.coupon_title{
  width: 280rpx;
  font-size: 28rpx;
  font-weight: 600;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn{
  position: relative;
  bottom: 30rpx;
  align-self: flex-end;
  width: 104rpx;
  height: 40rpx;
  line-height: 40rpx;
  text-align: center;
  border-radius: 20rpx;
}

.s_fc_11{ color: #FB674D; }

.s_bg_10{ background: linear-gradient(145deg, #D8D8D8 0%, #FB865E 0%, #FA493D 100%); }
.s_bg_11{ background: #FD5052; }
.s_bg_12{ background: #C5C4CA; }
</style>
