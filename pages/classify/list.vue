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
import search from '@/components/common/search.vue'
import goodsApi from '@/api/goods';
import utils from '@/common/util.js';

export default {
	components: {
		search,
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
	
	computed: {
		navBarHeight(){ return this.navBar; },
	},

	methods: {
		async getList() {
      let param = { page: this.page, limit: this.limit, gc_id_2: this.id, };

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
      v.skuStr = '0.33gx9粒x4板/盒';

			return v;
		},

		goDetail(item) {
			uni.navigateTo({
				url: `/pages/classify/list?id=${item.information_id}`,
			});
		},
		
	},

	onLoad(param) {
    this.id = param.id;
    uni.setNavigationBarTitle({ title: param.title, });

		this.getList();
	},
	onPullDownRefresh() {
    this.list = [];
    this.page = 1;
    this.total = 0;

    this.getList();
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
