<template>
	<view class="page_wrap" :style="{ paddingTop: navBarHeight + 'px', }">
    <!-- 导航栏 -->
    <view class="nav_wrap flex s_bg_main" :style="{ height: navBarHeight + 'px', paddingTop: statusHeight + 'px', }">
      <uni-icons class="ml10" type="arrowleft" color="white" size="24" @tap="goBack" />

      <search class="search_wrap" :config="searchConfig" @confirm="search"></search>
    </view>

    <view class="">
      <scroll-view id="tab-bar" class="tabbar_wrap flex s_fc_11 s_bg_f" :style="{ top: navBarHeight + 'px', }" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
          <view class="tabbar_item" v-for="(tab,index) in tabBarList" :key="tab.title" :id="tab.status" @click="changeStatus(index)">
            <view class="tabbar_title" :class="tabIndex==index ? 'tabbar_title_active' : ''">{{tab.title}}</view>
          </view>
      </scroll-view>
    </view>

		<view class="order_list_wrap s_bg_10">

      <order :config="item" v-for="(item, key) in list" :key="key" @success="init" @return="openReturnDialog(item)"></order>

		</view>

    <uni-popup ref="popup" type="bottom">
		  <refund :config="detail" @success="init" @close="closeReturnDialog"></refund>	
		</uni-popup>
		<!-- <uni-load-more :status="status"  :icon-size="16" :content-text="contentText" /> -->
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue'	
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import order from '@/components/order/index.vue';
import refund from '@/components/order/refund.vue';
import search from '@/components/common/search.vue'
import orderApi from '@/api/order';
import utils from '@/common/util.js';
import * as gd from '@/common/global.js';

export default {
	components: {
    uniPopup,
    order,
    refund,
    search,
	},
	data() {
		return {
      searchConfig: {
        inputColor: '#222848',
        background: 'rgba(255, 255, 255, 1)',
        placeholder: '搜索商品名称',
      },

      tabBarList: [
        { title: '全部', },
        { title: '待付款', status: gd.ORDER_UN_PAY, },
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
      goodsName: null,
      detail: null,
      
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
    goBack() {
      uni.navigateBack();
    },

    search(v) {
      this.goodsName = v;
      
      this.init();
    },
    
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

      // 退款成功
      if(e) this.closeReturnDialog();

      this.getList();
    },

		async getList() {
      let param = { page: this.page, limit: this.limit, order_type: gd.NORMAL_ORDER, };
      
      if(this.status) param.order_state = this.status;

      if(this.goodsName) param.goods_name = this.goodsName;

      uni.showLoading({ title: 'loading...', mask: true, });

      let res = await orderApi.getOrderList(param);
      uni.hideLoading();
      if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取订单列表失败!', icon: 'none', });
      
      if(res.data) {
        res.data.forEach(this.format);
        this.list = this.list.concat(res.data);
        this.total = res.pagination ? res.pagination.total : this.list.length;
      }
    },

    format(v) {
      v.order_goods.forEach(goods => {
        goods.skuStr = goods.goods_spec ? Object.keys(goods.goods_spec).map(k => goods.goods_spec[k]).join('; ') : '统一规格';
      });

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
.nav_wrap{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	box-sizing: border-box;
	z-index: 998;
}
.search_wrap{
	width: 630rpx;
	height: 60rpx;
	line-height: 60rpx;
	margin: 0 0 0 20rpx;
	border-radius: 30rpx;
}

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
  padding: 120rpx 30rpx 20rpx;
}

.popup_wrap{
  z-index: 1000;
}

.s_fc_10{ color: #222848; }
.s_fc_11{ color: #3E3F55; }

.s_bg_10{ background: #F4F4F6; }
</style>
