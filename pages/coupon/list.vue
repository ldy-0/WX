<template>
	<view class="page_wrap my_coupon_page_wrap s_bg_f">
    <view class="">
      <!-- <scroll-view id="tab-bar" class="" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto"> -->
        <view class="tabbar_wrap between s_fc_11 s_bg_f">
          <view class="tabbar_item" v-for="(tab,index) in tabBarList" :key="tab.title" :id="tab.status" @click="changeStatus(index)">
            <view class="tabbar_title" :class="tabIndex==index ? 'tabbar_title_active' : ''">{{tab.title}}</view>
          </view>
        </view>
      <!-- </scroll-view> -->
    </view>


		<view class="order_list_wrap s_bg_f">

      <coupon :config="item" v-for="(item, key) in list" :key="key"></coupon>

		</view>

		<!-- <uni-load-more :status="status"  :icon-size="16" :content-text="contentText" /> -->
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import coupon from '@/components/coupon/index.vue';
import couponApi from '@/api/coupon';
import utils from '@/common/util.js';
import * as gd from '@/common/global.js';

export default {
	components: {
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

	onLoad(param) {
    this.status = param.status || 1;
    this.tabBarList.some((v, i) => { if(v.status == this.status) return this.tabIndex = i; });

		this.getList();
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
	  changeStatus(index) {
      this.tabIndex = index;
      this.status = this.tabBarList[index].status;

      this.init();
    },

    init() {
      this.list = [];
      this.page = 1;
      this.total = 0;

      this.getList();
    },

		async getList() {
      let param = { page: this.page, limit: this.limit, };
      
      if(this.status) param.voucher_state = this.status;

      uni.showLoading({ title: 'loading...', mask: true, });

      let res = await couponApi.getList(param);
      uni.hideLoading();
      if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取优惠券信息失败!', icon: 'none', });
      
      if(res.data) {
        res.data.forEach(this.format);
        this.list = this.list.concat(res.data);
        this.total = res.pagination ? res.pagination.total : this.list.length;
      }
    },

    format(v) {
			return v;
		},   
		
	}
};
</script>

<style>
.my_coupon_page_wrap{
}

.tabbar_wrap{
  position: fixed;
  top: 0rpx;
  width: 100%;
  height: 120rpx;
  padding: 0 36rpx 0 50rpx;
  z-index: 2;
  box-sizing: border-box;
  border-bottom: 4rpx solid #F4F4F6;
}
.tabbar_item{
  height: 100%;
  line-height: 120rpx;
  text-align: center;
}
.tabbar_title{
  display: inline;
  padding: 0 0 8rpx 0;
  box-sizing: border-box;
}
.tabbar_title_active{
  border-bottom: 8rpx solid #40D5A8;
  border-radius: 4rpx;
}

.order_list_wrap{
  box-sizing: border-box;
  padding: 120rpx 60rpx 20rpx 50rpx;
}

.s_fc_11{ color: #3E3F55; }

.s_bg_10{ background: #F4F4F6; }
</style>
