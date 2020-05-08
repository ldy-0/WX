<template>
	<view>
		<view class="order_list_wrap page_wrap s_bg_10">

      <invoice :config="item" v-for="(item, key) in list" :key="key"></invoice>

		</view>

		<!-- <uni-load-more :status="status"  :icon-size="16" :content-text="contentText" /> -->
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import invoice from '@/components/invoice/index.vue';
import orderApi from '@/api/order';
import utils from '@/common/util.js';
import * as gd from '@/common/global.js';

export default {
	components: {
    invoice,
	},
	data() {
		return {
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

	methods: {
    init() {
      this.list = [];
      this.page = 1;
      this.total = 0;

      this.getList();
    },

		async getList() {
      let param = { page: this.page, limit: this.limit, };
      
      uni.showLoading({ title: 'loading...', mask: true, });

      let res = await orderApi.getInvoiceList(param);
      uni.hideLoading();
      if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取发票信息失败!', icon: 'none', });
      
      if(res.data) {
        res.data.forEach(this.format);
        this.list = this.list.concat(res.data);
        this.total = res.pagination ? res.pagination.total : this.list.length;
      }
    },

    format(v) {
      v.time = utils.toString(v.add_time * 1000);

			return v;
		},   
		
  },
  
  onLoad(param) {
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
};
</script>

<style>
.order_list_wrap{
  box-sizing: border-box;
  padding: 0 30rpx 20rpx;
}

.s_fc_11{ color: #3E3F55; }

.s_bg_10{ background: #F4F4F6; }
</style>
