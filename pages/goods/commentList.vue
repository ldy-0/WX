<template>
	<view class="comment_page_wrap page_wrap s_bg_f">
		<view class="">

      <comment :config="item" v-for="(item, key) in list" :key="key"></comment>

		</view>

		<!-- <uni-load-more :status="status"  :icon-size="16" :content-text="contentText" /> -->
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import comment from '@/components/goods/comment.vue';
import goodsApi from '@/api/goods';
import utils from '@/common/util.js';
import * as gd from '@/common/global.js';

export default {
	components: {
    comment,
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
      if(!this.id) return uni.showToast({ title: 'goods_commonid不能为空!', icon: 'none', });

      let param = { page: this.page, limit: this.limit, goods_commonid: this.id, };

      uni.showLoading({ title: 'loading...', mask: true, });

      let res = await goodsApi.getCommentList(param);
      uni.hideLoading();
      if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '!', icon: 'none', });
      
      if(res.data) {
        res.data.forEach(this.format);
        this.list = this.list.concat(res.data);
        this.total = res.pagination ? res.pagination.total : this.list.length;
      }
    },

    format(v) {
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
    this.id = param.id;

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
.comment_page_wrap{
  padding: 0 0 80rpx; 
}

.s_bg_10{ background: #F9F9F9; }
</style>
