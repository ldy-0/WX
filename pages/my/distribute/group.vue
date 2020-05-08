<template>
	<view class="group_page_wrap page_wrap s_bg_10">
		<view class="user_container">
			<image class="bg_img" src="../../../static/my/userBg.png"></image>

			<view class="user_wrap mt20 s_bg_f">
				<view class="user_info flex">
					<view class="user_avatar s_bg_f">
            <avatar class="i_avatar" :src="user && user.member_avatar || '../../../static/my/avatar.png'" @update="getUser"></avatar>
					</view>

					<view class="user_title s_fc_12">{{user ? user.member_truename : ''}}</view>

					<view class="user_mobile ml20 s_fc_10">{{user ? user.member_mobile : ''}}</view>

					<view class="user_identity ml30 s_fc_14 s_bg_12">级别：{{identity}}</view>
				</view>

			  <view class="statistic_wrap flex s_fc_12">
					<view class="statistic_item">
						<view class="center">
							<image class="i_user" src="../../../static/my/group.png"></image>
							<view class="ml20">总人数</view>
						</view>
						<view class="fs40 s_fc_price">{{memberLength}}</view>
					</view>

					<view class="statistic_line s_bg_11"></view>

					<view class="statistic_item">
						<view class="center">
							<image class="i_price" src="../../../static/my/money.png"></image>
							<view class="ml20">总消费金额</view>
						</view>
						<view class="fs40 s_fc_price">{{totalAmount}}</view>
					</view>
				</view>

			</view>
		</view>

    <!-- 我的团队 -->
		<view class="group_wrap mt40">
      <view class="flex">
        <view class="module_title bold s_fc_11">我的团队</view>
      </view>

      <view class="group_list_wrap mt40 s_fc_12 s_bg_f">
				<view class="group_item between" v-for="(item, index) in list" :key="index">
					<view class="flex">
						<view class="bold">{{item.member_truename}}</view>
						<view class="ml30 s_fc_10">{{item.member_mobile}}</view>
					</view>

					<view class="group_price_wrap">
						<view>总消费金额</view>
						<view class="s_fc_13">¥{{item.saleroom}}</view>
					</view>
				</view>
      </view>

		</view>
		
	</view>
</template>

<script>
	import api from '@/api/api.js';
	import userApi from '@/api/user.js';
	import distributeApi from '@/api/distribute.js';
	import avatar from '@/components/common/avatar.vue'
  import uniPopup from '@/components/uni-popup/uni-popup.vue'	
  import * as gd from '@/common/global.js';
	
	export default {
		components: {
			avatar,
			uniPopup,
		},
		
		data() {
			return {
				user: null,

				detail: null,

        list: [],
        page: 1,
        limit: 10,
        total: 0,
				
			}
		},

		computed: {
      isStore(){ return this.user && this.user.member_rank == gd.DRUGSTORE; },
      isProvinceDealer(){ return this.user && this.user.member_rank == gd.PROVINCE_DEALER; },
      isCityDealer(){ return this.user && this.user.member_rank == gd.CITY_DEALER; },
			isDealer(){ return this.isProvinceDealer || this.isCityDealer; },

			identity(){ return this.isDealer ? `${this.isProvinceDealer ? '省' : '市'}服务商` : this.isStore ? `药房` : ''; },
			
			memberLength(){ return this.detail && this.detail.member.length; },
			totalAmount(){ return this.detail && this.detail.saleroom_sum; },
		},
		
		methods: {
			
      async getList() {
        uni.showLoading({ title:'Loading', mask: true });

				const res = await distributeApi.getGroupList(this.user.member_id);
        uni.hideLoading();
        if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取团队信息失败!', icon: 'none', });

				if (res.status === 0) {
					this.detail = res.data;
					res.data.member.forEach(this.format);
					this.list = res.data.member;
				}
      },
      
      format(v) {
        return v;
			},
			
			async getUser() {
        uni.showLoading({ title:'Loading', mask: true, })

        const res = await userApi.getInfo({ });
        uni.hideLoading();
        if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取用户信息失败!', icon: 'none', });

				if(res.status == 0){
					uni.setStorageSync('user', this.user = res.data);
				}
      },
			
		  init() {
				this.list = [];
        this.page = 1;
        this.total = 0;

        this.getList();
      }	
		},
		
		onShow(param){
		},
		
		onLoad(param){
			this.user = uni.getStorageSync('user');
				
      this.getList();
    },

    onReady() {
			uni.setNavigationBarColor({ frontColor: '#ffffff', backgroundColor: '#3fd4a7', });
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

	}
</script>

<style>
.group_page_wrap{
}
.user_container{
	position: relative;
	padding: 70rpx 30rpx 0;
	z-index: 1;
}
.bg_img{
	position: absolute;
	top: -180rpx;
	left: 0;
	width: 100%;
	height: 380rpx;
	z-index: -1;
}
.user_wrap{
	padding: 0 20rpx;
  border-radius: 16rpx;	
}
.user_info{
	position: relative;
	padding: 30rpx 0;
}
.user_title{
	width: 130rpx;
  margin: 0 0 0 120rpx;	
}
.user_mobile{
	font-size: 26rpx;
}
.user_identity{
	padding: 0 16rpx;
	font-size: 20rpx;
  border-radius: 28rpx;	
}
.identity{
}
.user_avatar{
	position: absolute;
	top: -70rpx;
	left: -25rpx;
  padding: 10rpx; 	
	border-radius: 50%;
}
.i_avatar{
	width: 128rpx;
	height: 128rpx;
	border-radius: 50%;
	overflow: hidden;
}

.statistic_wrap{
	padding: 30rpx 0;
	border-top: 1rpx solid #F9F9F9;
}
.statistic_item{
	flex-grow: 1;
	text-align: center;
}

.statistic_line{
  width: 4rpx;
	height: 114rpx;
}

.group_wrap{
	padding: 0 30rpx;
}
.group_list_wrap{
	border-radius: 16rpx;
}
.group_item{
  padding: 24rpx 56rpx 24rpx 32rpx;
	border-bottom: 1rpx solid #F9F9F9;
}
.group_price_wrap{
	text-align: center;
}
	
.module_title{
	position: relative; 
	z-index: 1;
	line-height: 1.3;
}
.module_title::after{
	content: '';
	position: absolute;
	bottom: -2rpx;
	left: 0;
	width: 100%;
	height: 14rpx;
	border-radius: 7rpx;
	background: linear-gradient(150deg, #47F8CC 0%, #67F1B7 100%);
	z-index: -1;
}

.i_user{
	position: relative;
	top: -4rpx;
	width: 40rpx;
	height: 40rpx;
}
.i_price{
	position: relative;
	top: -2rpx;
	width: 36rpx;
	height: 36rpx;
}
	
.s_fc_10{ color: #5E5C75; }
.s_fc_11{ color: #181818}
.s_fc_12{ color: #222848; }
.s_fc_13{ color: #FD5052; }
.s_fc_14{ color: #F9D0A4; }

.s_bg_10{ background: #F4F4F6; }
.s_bg_11{ background: #222848; }
.s_bg_12{ background: #29282E; }
</style>
