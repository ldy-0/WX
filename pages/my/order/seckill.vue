<template>
	<view class="page_wrap">
    <view class="">
      <scroll-view id="tab-bar" class="tabbar_wrap flex s_fc_11 s_bg_f" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
          <view class="tabbar_item" v-for="(tab,index) in tabBarList" :key="tab.title" :id="tab.status" @click="changeStatus(index)">
            <view class="tabbar_title" :class="tabIndex==index ? 'tabbar_title_active' : ''">{{tab.title}}</view>
          </view>
      </scroll-view>
    </view>

		<view class="order_list_wrap s_bg_10">

      <order :config="item" v-for="(item, key) in list" :key="key"></order>

		</view>

		<!-- <uni-load-more :status="status"  :icon-size="16" :content-text="contentText" /> -->
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import order from '@/components/order/index.vue';
import orderApi from '@/api/order';
import utils from '@/common/util.js';
import * as gd from '@/common/global.js';

export default {
	components: {
    order,
		// uniLoadMore
	},
	data() {
		return {
      tabBarList: [
        { title: '全部', },
        { title: '待发货', status: gd.ORDER_PAYED, },
        { title: '待收货', status: gd.ORDER_SEND, },
        { title: '待评价', status: gd.ORDER_RECEIVE, },
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
    this.status = param.status;
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
      let param = { page: this.page, limit: this.limit, order_type: gd.SECKILL_ORDER, };
      
      if(this.status) param.order_state = this.status;

      uni.showLoading({ title: 'loading...', mask: true, });

      let res = await orderApi.getOrderList(param);
      uni.hideLoading();
      if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '!', icon: 'none', });
      
      if(res.data) {
        res.data.forEach(this.format);
        this.list = this.list.concat(res.data);
        this.total = res.pagination ? res.pagination.total : this.list.length;
      }
    },

    format(v) {
      v.type = gd.SECKILL_ORDER;

			return v;
		},   
		
	},
};
</script>

<style>
.tabbar_wrap{
  position: fixed;
  top: 0;
  width: 100%;
  height: 120rpx;
  line-height: 120rpx;
  z-index: 1;
}
.tabbar_item{
  display: inline-block;
  width: 25%;
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
  padding: 120rpx 30rpx 20rpx;
}

.s_fc_11{ color: #3E3F55; }

.s_bg_10{ background: #F4F4F6; }
</style>
