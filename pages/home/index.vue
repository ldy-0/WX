<template>
	<view class="page_wrap home_page_wrap" :style="{ paddingTop: navBarHeight + 'px', }">
		<view class="s_bg_f7">
      <view class="banner_wrap">
        <banner class="banner" ref='banner' :config='bannerConfig' @emit="goBanner"></banner>
      </view>

      <!-- 导航栏 -->
			<view class="nav_wrap flex s_bg_main" :style="{ height: navBarHeight + 'px', paddingTop: statusHeight + 'px', }">
				<search class="search_wrap" :config="searchConfig" @emit="goSearch"></search>
			</view>
			
      <!-- 菜单栏 -->
			<view class="menu_list_wrap flex">
				<view class="menu" v-for='(item, index) in menuList' :key="index" @tap="goMenu(item, $event)">
					<image class="i_menu" :src="item.src"></image>
					<view class="menu_title s_fc_10">{{item.title}}</view>
				</view>
			</view>
		</view>

    <!-- 优惠券 -->
    <view class="coupon_wrap mt40" @tap="goCoupon">
      <image class="i_coupon" src="../../static/home/coupon_bg.png"></image>
    </view>

		<uni-popup class="popup_wrap" ref="popup" type="center" :maskClick="false">
			<view class="coupon_img_wrap">
				<image class="coupon_img img" src="../../static/coupon/new_coupon.png"></image>

				<view class="new_coupon_title bold s_fc_f">{{newCoupon.vouchertemplate_price}}元优惠卷</view>

				<view class="accept_btn bold s_fc_14 s_bg_f" @tap="acceptNewCoupon">立即领取</view>
				
				<image class="i_close" src="../../static/common/close.png" @tap="acceptNewCoupon"></image>
			</view>
		</uni-popup>

    <!-- 限时秒杀 -->
		<view class="seckill_wrap">
      <view class="flex">
        <image class="i_seckill" src="../../static/home/seckill.png"></image>

        <view class="module_title fs40 bold s_fc_12">限时秒杀</view>
      </view>

      <view class="s_bg_f">
        <view class="seckill_title_wrap mt20 between" @tap="goSeckill">
          <view class="seckill_title bold s_fc_price">秒杀商品，福利大放送</view>
          <view class="seckill_more fs24 s_fc_10">查看更多 >></view>
        </view>

        <view class="flex">
          <view class="seckill_goods ml30" v-for="(item, index) in seckillList" :key="index" @tap="goSeckillDetail(item, index, $event)">
            <view class="seckill_img_wrap">
              <image class="img" :src="item.rule_image"></image>
            </view>

            <view class="seckill_info_wrap flex">
              <view class="recommend_title s_fc_price">¥{{item.goods_price}}</view>
              <view class="seckill_marketprice ml10 s_fc_11">¥{{item.goods.goods_price}}</view>
            </view>
          </view>
        </view>
      </view>

		</view>
		
		<!-- 精选商品 -->
		<view class="select_wrap mt40">
      <view class="flex">
        <view class="module_title bold s_fc_12">精选商品</view>
      </view>

      <view class="goods_list_wrap mt20 between">

        <view class="goods_wrap mt20 s_bg_f" v-for="(item, index) in goodsList" :key="index" @tap="goGoods(item, index, $event)">
          <image class="goods_img_wrap" :src="item.goods_image"></image>
          <view class="goods_name bold s_fc_0">{{item.goods_name}}</view>
          <view class="goods_desc s_fc_13">{{item.goods_specname}}</view>
          <view class="bold mt10 s_fc_price">¥{{item.goods_price}}</view>
        </view>

      </view>
		</view>

	</view>
</template>

<script>
import api from '@/api/api.js';
import goodsApi from '@/api/goods.js';
import couponApi from '@/api/coupon.js';
import userApi from '@/api/user.js';
import uniPopup from '@/components/uni-popup/uni-popup.vue'	
import banner from '@/components/common/banner.vue'
import search from '@/components/common/search.vue'
import moduleList from '@/components/common/moduleList.vue'
import storeList from '@/components/common/storeList.vue'
import * as gd from '@/common/global.js';
	
export default {
	components: {
		uniPopup,
		banner,
		search,
		moduleList,
		storeModule: storeList,
	},
	
	data() {
		return {
			searchConfig: {
				color: '#CFCFCF',
				background: 'rgba(255, 255, 255, 1)',
				placeholder: '商品名称',
				disabled: true,
			},
			bannerConfig: {
				list: [],
				// dot: true,
				circular: true,
				autoplay: true,
				valueKey: 'banner_pic',
				width: '100%',
				height: '300rpx',
			},

			menuList: [
				{ title: '每日新品', src: "../../static/home/new.png", path: '/pages/goods/newList', },
				{ title: '商品分类', src: "../../static/home/class.png", path: '/pages/classify/index', isswitch: true, },
				{ title: '平台简介', src: "../../static/home/company.png", path: '/pages/about/platform', },
				{ title: '分享好友', src: "../../static/home/share.png", path: '/pages/about/share', },
			],

			seckillList: [],

			goodsList: [],
			page: 1,
			limit: 10,
			total: 0,
			
			user: null,

			newCoupon: {},
		}
	},

	computed: {
		navBarHeight(){ return this.navBar; },
		statusHeight(){ return this.statusBar; },

		isStore(){ return this.user && this.user.member_rank == gd.DRUGSTORE; },
	},
	
	methods: {
		goSearch() {
			uni.navigateTo({ url: `/pages/classify/search`, });
		},

		goBanner(item) {
			if(item.banner_type == 0) return ;
			// 图片
			if(item.banner_type == 1) return uni.previewImage({ current: 0, urls: [item.banner_url], });
      // 商品
			if(item.banner_type == 2) return uni.navigateTo({ url: `/pages/goods/detail?id=${item.banner_url}`, });
		},

		goMenu(item, e){
			if(item.isswitch) return uni.switchTab({ url: item.path, });

			uni.navigateTo({ url: item.path });
		},
		
		goCoupon(){
			if(!this.isStore) return uni.showModal({ content: `仅药房用户可以购买!`, showCancel: false, });

			uni.showLoading({ title: '...', mask: true, });

			uni.navigateTo({ url: '/pages/coupon/all', });
		},
		
		goSeckill(){
			uni.navigateTo({ url: '/pages/goods/seckillList', });
		},

		goSeckillDetail(item){
			uni.navigateTo({ url: `/pages/goods/detail?ruleId=${item.rule_id}`, });
		},
		
		goGoods(item){
			uni.navigateTo({ url: `/pages/goods/detail?id=${item.goods_commonid}`, });
		},

		closeCouponDialog() {
			this.$refs.popup.close();
		},

		async acceptNewCoupon() {
			uni.showLoading({ title:'Loading', mask:true })

			let param = { vouchertemplate_id: this.newCoupon.vouchertemplate_id, };

			const res = await couponApi.accept(param);
			uni.hideLoading();
			this.closeCouponDialog();
			// if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取轮播图信息失败!', icon: 'none', });

			if (res.status === 0) {
			}
		},

		async getNewCoupon() {
			let param = { type: 4, };

			const res = await couponApi.getAllList(param);
			if(res && res.status === 0){
				this.$refs.popup.open();
				return this.newCoupon = res.data[0];
			}

			if(res && res.error == '没有更多优惠券') return ;
			uni.showToast({ title: res ? res.error || res : '获取新人优惠券信息失败!', icon: 'none', });
		},

		async getBannerList() {
			let param = {};

			const res = await api.getBannerList(param);
			if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取轮播图信息失败!', icon: 'none', });

			if (res.status === 0) {
				this.bannerConfig.list = res.data;
			}
		},
		
		async getSeckillList() {
			let param = { limit: 3, };

			uni.showLoading({ title:'Loading', mask:true })

			const res = await goodsApi.getSeckillList(param);
			uni.hideLoading();
			if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取秒杀信息失败!', icon: 'none', });

			if (res.status === 0) {
				this.seckillList = res.data;
			}
		},
		
		async getGoodsList() {
			let param = { page: this.page, limit: this.limit, };

			uni.showLoading({ title:'Loading', mask:true })

			const res = await goodsApi.getGoodsList(param);
			uni.hideLoading();
			if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取商品信息失败!', icon: 'none', });

			if (res.status === 0) {
				res.data.forEach(this.format);
				this.goodsList = this.goodsList.concat(res.data);
				this.total = res.pagination ? res.pagination.total : this.goodsList.length;
			}
		},
		
		format(v) {
			v.skuStr = v.goods_advword;

			return v;
		},
		
		async getUser() {
			const res = await userApi.getInfo();
			if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取用户信息失败!', icon: 'none', });

			if (res.status === 0) {
				uni.setStorageSync('user', this.user = res.data);
				// 未领取新人券的药房用户
				if(this.isStore && this.user.voucher_new == 0) this.getNewCoupon();
			}
		},
		
		init() {
			this.goodsList = [];
			this.seckillList = [];
			this.bannerConfig.list = [];
			this.page = 1;
			this.total = 0;

			this.getBannerList();
			this.getSeckillList();
			this.getGoodsList();
		}	
	},
	
	onShow(param){
		this.getUser();
	},
	
	onLoad(param){
		this.init();
	},

	onPullDownRefresh() {
		this.init();
		uni.stopPullDownRefresh();
	},

	onReachBottom() {
		if(this.total <= this.page * this.limit) return console.log('----');

		this.page++;
		this.getGoodsList();
	},

	onBackPress(e){
		console.error('index back');
	},
}
</script>

<style scoped>
.home_page_wrap{
}

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
	margin: 0 0 0 30rpx;
	border-radius: 30rpx;
}

.banner_wrap{
	box-sizing: border-box;
	padding: 40rpx 30rpx 0;
}
.banner{
	border-radius: 16rpx;
	overflow: hidden;
}

.menu_list_wrap{
	padding: 30rpx 30rpx 0;
}
.menu{
	padding: 0 68rpx 0 0;
	text-align: center;
}
.menu_title{
	font-size: 24rpx;
}
.i_menu{
	width: 120rpx;
	height: 120rpx;
}

.i_coupon{
	width: 100%;
	height: 230rpx;
}
.popup_wrap{
	z-index: 1000;
}
.coupon_img_wrap{
	position: relative;
	width: 584rpx;
	height: 734rpx;
}
.coupon_img{
	display: block;
}
.new_coupon_title{
	position: absolute;
	left: 0;
	right: 0;
	bottom: 180rpx;
	font-size: 70rpx;
	letter-spacing: 4rpx;
	text-align: center;
}
.accept_btn{
	position: absolute;
	left: calc(50% - 180rpx);
	bottom: 70rpx;
	width: 360rpx;
	height: 76rpx;
	font-size: 36rpx;
	line-height: 76rpx;
	text-align: center;
	border-radius: 38rpx;
}	
.i_close{
	position: absolute;
	bottom: -100rpx;
	left: calc(50% - 26rpx);
	width: 52rpx;
	height: 52rpx;
}
	
.goods_list_wrap{
	flex-wrap: wrap;
}
#goods_wrap{
	background: brown;
}
.goods_wrap{
	flex-shrink: 0;
	width: 340rpx;
	padding: 36rpx 0 20rpx 20rpx;
	border-radius: 10rpx;
	box-sizing: border-box;
}
.goods_img_wrap{
	position: relative;
	left: 10rpx;
	width: 268rpx;
	height: 240rpx;
	overflow: hidden;
}
.goods_name{
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.goods_desc{
	height: 1.3em;
	line-height: 1.3;
	font-size: 24rpx;
	white-space: nowrap;
	overflow: hidden;
}
	
	.sm_module{
		width: 236rpx;
		padding: 0;
		border-radius: 20rpx;
		overflow: hidden;
		background: #0066CC;
	}
	.sm_module_img_wrap{
		height: 240rpx;
	}
	.sm_module_info_wrap{
		position: relative;
		top: -20rpx;
		background: #0066CC;
		transform: skew(0, -10deg);
	}
	.sm_module_info{
		position: relative;
		top: 20rpx;
		height: 166rpx;
		margin: 0 0 0 15rpx;
		transform: skew(0, 10deg);
	}
	.sm_module_desc{
		height: 4.2em;
		line-height: 1.4em;
	}
	
  .seckill_wrap{
    padding: 0 24rpx;
  }
  .i_seckill{
    width: 240rpx;
    height: 170rpx;
  }
  .seckill_title_wrap{
    height: 108rpx;
    padding: 0 20rpx;
    line-height: 108rpx;
  }
	.seckill_goods{
		width: 188rpx;
		overflow: hidden;
	}
	.seckill_img_wrap{
    height: 166rpx;
	}
	.seckill_info_wrap{
		padding: 15rpx 0;
	}
	.seckill_marketprice{
		font-size: 20rpx;
    text-decoration: line-through;
	}

  .select_wrap{
    padding: 0 24rpx 120rpx;
  }

  .module_title{
    position: relative; 
    z-index: 1;
  }
  .module_title::after{
    content: '';
    position: absolute;
    bottom: 10rpx;
    left: 0;
    width: 100%;
    height: 14rpx;
    border-radius: 7rpx;
    background: linear-gradient(150deg, #47F8CC 0%, #67F1B7 100%);
    z-index: -1;
  }
	
  .img{
    width: 100%;
    height: 100%;
  }
	
	.s_fc_10{ color: #5F5F5F; }
	.s_fc_11{ color: #B0B0B0}
	.s_fc_12{ color: #181818; }
	.s_fc_13{ color: #A2A2A2; }
	.s_fc_14{ color: #FF6134; }
</style>