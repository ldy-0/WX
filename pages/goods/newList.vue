<template>
	<view class="page_wrap">
		<view class="s_bg_10">

      <goods :config="item" v-for="(item, key) in list" :key="key"></goods>

		</view>

		<!-- <uni-load-more :status="status"  :icon-size="16" :content-text="contentText" /> -->
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import goods from '@/components/goods/index.vue';
import goodsApi from '@/api/goods';
import utils from '@/common/util.js';
import * as gd from '@/common/global.js';

export default {
	components: {
    goods,
		// uniLoadMore
	},
	data() {
		return {
      id: null,

      list: [],
      page: 1,
      limit: 10,
      total: 0,

			last_id: '',
			status: 'more',
			contentText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多'
			}
		};
  },

	methods: {
		async getList() {
      let param = { page: this.page, limit: this.limit, gc_id_2: 2, };

      uni.showLoading({ title: 'loading...', mask: true, });

      let res = await goodsApi.getGoodsList(param);
      uni.hideLoading();
      if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '!', icon: 'none', });
      
      if(res.data) {
        res.data.forEach(this.format);
        this.list = this.list.concat(res.data);
        this.total = res.pagination ? res.pagination.total : this.list.length;
      }
    },

    format(v) {
      v.type = gd.NEW_GOODS;

			return v;
		},

    init() {
      this.list = [];
      this.page = 1;
      this.total = 0;

      this.getList();
    },
  },
  
  onLoad(param) {
    // uni.setNavigationBarTitle({ title: param.title, });
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

.s_bg_10{ background: #F9F9F9; }
</style>
