<template>
	<view class="income_list_page_wrap page_wrap s_bg_10">
    <!-- <view class="">
      <scroll-view id="tab-bar" class="tabbar_wrap flex s_fc_11 s_bg_f" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
          <view class="tabbar_item" v-for="(tab,index) in tabBarList" :key="tab.title" :id="tab.status" @click="changeStatus(index)">
            <view class="tabbar_title" :class="tabIndex==index ? 'tabbar_title_active' : ''">{{tab.title}}</view>
          </view>
      </scroll-view>
    </view> -->

		<view class="list_wrap s_bg_f" v-if="isWithdraw">
      <withdraw class="list_item" :config="item" v-for="(item, key) in list" :key="key"></withdraw>
		</view>
    <view class="list_wrap s_bg_f" v-else>
      <income class="list_item" :config="item" v-for="(item, key) in list" :key="key"></income>
		</view>

		<!-- <uni-load-more :status="status"  :icon-size="16" :content-text="contentText" /> -->
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import withdraw from '@/components/distribute/withdraw.vue';
import income from '@/components/distribute/income.vue';
import distributeApi from '@/api/distribute';
import utils from '@/common/util.js';
import * as gd from '@/common/global.js';

export default {
	components: {
    withdraw,
    income,
		// uniLoadMore
	},
	data() {
		return {
      tabBarList: [
        { title: '全部', },
        { title: '待付款', status: gd.ORDER_UN_PAY, },
      ],
      tabIndex: 0,
      scrollInto: '',

      type: 'income',
      typeList: [
        { title: '提现明细', type: 'withdraw', subTitle: '提现', },
        { title: '收益明细', type: 'income', subTitle: '收益', },
      ],
			status: null,

      list: [],
      page: 1,
      limit: 10,
      total: 0,

			contentText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多'
			}
		};
  },

  computed: {
    isWithdraw(){ return this.type === 'withdraw'; },
  },

	onLoad(param) {
    this.type = param.type;
    this.typeList.some((v, i) => { if(v.type == this.type) return uni.setNavigationBarTitle({ title: v.title, }), true; });

    // this.status = param.status;
    // this.tabBarList.some((v, i) => { if(v.status == this.status) return this.tabIndex = i; });

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

      uni.showLoading({ title: 'loading...', mask: true, });

      let res = await (this.isWithdraw ? distributeApi.getWithdrawList(param) : distributeApi.getIncomeList(param));
      uni.hideLoading();

      if(res && res.status == 0) {
        res.data.forEach(this.format);
        this.list = this.list.concat(res.data);
        return this.total = res.pagination ? res.pagination.total : this.list.length;
      }

      return uni.showToast({ title: res ? res.error || res : '获取信息失败!', icon: 'none', });
    },

    format(v) {
			return v;
		},   

		goDetail(item) {
			uni.navigateTo({
				url: `./detail?id=${item.information_id}`,
			});
		},
		
	}
};
</script>

<style>
.income_list_page_wrap{
  padding: 28rpx 30rpx 40rpx;
}

.tabbar_wrap{
  position: fixed;
  top: 88rpx;
  width: 100%;
  height: 120rpx;
  line-height: 120rpx;
  z-index: 1;
}
.tabbar_item{
  display: inline-block;
  width: 20%;
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

.list_wrap{
  padding: 10rpx 30rpx 60rpx;
  border-radius: 16rpx;
}
.list_item:last-child{
  border: none;
}

.s_fc_10{ color: #222848; }
.s_fc_11{ color: #3E3F55; }

.s_bg_10{ background: #F4F4F6; }
</style>
