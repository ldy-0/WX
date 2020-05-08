<template>
	<view class="page_wrap">
    <!-- <view class="">
      <scroll-view id="tab-bar" class="tabbar_wrap flex s_fc_11 s_bg_f" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
          <view class="tabbar_item" v-for="(tab,index) in tabBarList" :key="tab.title" :id="tab.status" @click="changeStatus(index)">
            <view class="tabbar_title" :class="tabIndex==index ? 'tabbar_title_active' : ''">{{tab.title}}</view>
          </view>
      </scroll-view>
    </view> -->

		<view class="order_list_wrap s_bg_10">

      <aftersale :config="item" v-for="(item, key) in list" :key="key" @success="init" @return="openReturnDialog(item)"></aftersale>

		</view>

		<!-- <uni-load-more :status="status"  :icon-size="16" :content-text="contentText" /> -->
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue'	
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import aftersale from '@/components/order/aftersale.vue';
import orderApi from '@/api/order';
import utils from '@/common/util.js';
import * as gd from '@/common/global.js';

export default {
	components: {
    uniPopup,
    aftersale,
	},
	data() {
		return {
      tabBarList: [
        { title: '全部', },
      ],
      tabIndex: 0,
      scrollInto: '',

      list: [],
      page: 1,
      limit: 10,
      total: 0,
      status: null,
      detail: null,
      
			contentText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多'
			}
		};
  },

	methods: {
	  changeStatus(index) {
      this.tabIndex = index;
      this.status = this.tabBarList[index].status;

      this.init();
    },

    openReturnDialog(item) {
      this.$refs.popup.open();
      this.detail = item;
    },

    closeReturnDialog() {
      this.$refs.popup.close();
      this.detail = null;
    },

    init(e) {
      this.list = [];
      this.page = 1;
      this.total = 0;

      this.getList();
    },

		async getList() {
      let param = { page: this.page, limit: this.limit, };
      
      if(this.status) param.order_state = this.status;

      uni.showLoading({ title: 'loading...', mask: true, });

      let res = await orderApi.getAftersaleList(param);
      uni.hideLoading();
      if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取售后订单列表失败!', icon: 'none', });
      
      if(res.data) {
        res.data.forEach(this.format);
        this.list = this.list.concat(res.data);
        this.total = res.pagination ? res.pagination.total : this.list.length;
      }
    },

    format(v) {
      v.type = gd.NORMAL_ORDER;

			return v;
		},   

  },

  onShow() {
    this.init();
  },
  
  onLoad(param) {
    this.status = param.status;
    this.tabBarList.some((v, i) => { if(v.status == this.status) return this.tabIndex = i; });
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
  width: 20%;
  height: 100%;
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
  padding: 0rpx 30rpx 20rpx;
}

.popup_wrap{
  z-index: 1000;
}

.s_fc_10{ color: #222848; }
.s_fc_11{ color: #3E3F55; }

.s_bg_10{ background: #F4F4F6; }
</style>
