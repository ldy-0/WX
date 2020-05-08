<template>
	<view class="page_wrap" :style="{ paddingTop: navBarHeight + 'px', }">
		<!-- 导航栏 -->
		<view class="nav_wrap flex s_bg_main" :style="{ height: navBarHeight + 'px', paddingTop: statusHeight + 'px', }">
			<uni-icons type="arrowleft" color="white" size="24" @tap="goBack" />

			<search class="search_wrap" :config="searchConfig" @confirm="search"></search>
		</view>

		<view class="s_bg_10">

      <goods :config="item" v-for="(item, key) in list" :key="key"></goods>

		</view>

		<!-- <uni-load-more :status="status"  :icon-size="16" :content-text="contentText" /> -->
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue'
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import goods from '@/components/goods/index.vue';
import search from '@/components/common/search.vue'
import goodsApi from '@/api/goods';
import utils from '@/common/util.js';

export default {
	components: {
		search,
		goods,
		uniIcons,
		// uniLoadMore
	},
	data() {
		return {
			id: null,
			
			searchConfig: {
				color: '#CFCFCF',
				background: 'rgba(255, 255, 255, 1)',
				placeholder: '商品名称',
			},
			name: '',

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
		statusHeight(){ return this.statusBar; },
	},

	methods: {
		goBack(){ uni.navigateBack(); },

    search(name) {
			this.name = name.trim();
      this.init();
		},

		init(){
			this.list = [];
			this.page = 1;
			this.total = 0;

			if(this.name) this.getList();
		},

		async getList() {
      let param = { page: this.page, limit: this.limit, name: this.name, };

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
		
		uni.hideLoading();
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

<style scoped>
.nav_wrap{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	box-sizing: border-box;
	z-index: 998;
}
.search_wrap{
	width: 600rpx;
	height: 60rpx;
	line-height: 60rpx;
	margin: 0 0 0 30rpx;
	border-radius: 30rpx;
}

.s_bg_10{ background: #F9F9F9; }
</style>
<style>
.search_wrap input{
	color: #000;
}
</style>
