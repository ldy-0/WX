<template>
	<view class="goods_page_wrap page_wrap s_bg_10">
    <!-- 地址 -->
    <view class="address_wrap mt20 flex s_bg_f">
			<view class="address_icon">
				<image class="i_address" src="../../../static/about/address.png"></image>
			</view>

			<view class="ml30 between s_fc_10">
				<view class="" v-if="address">
					<view class="address_info_wrap bold flex">
						<view class="address_name">{{address.name}}</view>
						<view class="address_phone ml40">{{address.phone}}</view>
					</view>

					<view class="fs24 mt10">{{address.address}}</view>
				</view>

				<!-- <uni-icons class="bold ml20" type="arrowright" color="black" size="15" /> -->
			</view>
    </view>

    <!-- goods -->
		<view class="order_info_container mt20 s_fc_10 s_bg_f">
			<view class="order_info_wrap">
				<view class="order_info mt10 between">
					<view class="fs24">订单号:{{detail.order_sn}}</view>
					<view class="fs24">下单时间:{{detail.add_time}}</view>
				</view>

				<view class="order_info mt10 between">
					<view class="fs24">支付方式：{{detail.payStr}}</view>
					<view class="fs24 s_fc_price">{{detail.order_state}}</view>
				</view>
			</view>

			<view class="goods_list_wrap mt20">
				<view class="goods_wrap" v-for="(item, index) in detail.order_goods" :key="index">
					<view class="flex">
						<image class="goods_img" :src="item.goods_image"></image>

						<view class="goods_body ml20">
							<view class="goods_title s_fc_10">{{item.goods_name}}</view>
							<view class="s_fc_gray">{{item.goods_spec || '无'}}</view>

							<view class="between s_fc_gray">
								<view class="fs32 s_fc_price">¥{{item.goods_price}}</view>
								<view class="s_fc_12">x {{item.goods_num}}</view>
							</view>
						</view>
					</view>

					<view class="remark_wrap fs24 s_fc_11">备注：{{item.message}}</view>
				</view>
			</view>
		</view>

		<view class="price_list_wrap mt20 s_fc_13 s_bg_f">
			<view class="price_wrap between">
				<view class="s_fc_14">商品金额</view>
				<view class="price fs32 s_fc_12">¥{{goodsPrice}}</view>
			</view>

			<view class="price_wrap between">
				<view class="s_fc_14">优惠卷抵扣</view>
				<view class="price fs32 s_fc_price">-¥{{deductPrice}}</view>
			</view>

			<view class="price_wrap between">
				<view class="s_fc_14">总运费</view>
				<view class="price fs32 s_fc_price">¥{{freight}}</view>
			</view>

			<view class="price_wrap order_price_wrap between">
				<view class="s_fc_14"></view>
				<view class="price flex s_fc_price">
					<view class="s_fc_14">实付款：</view>
					<view class="fs36">¥{{detail.order_amount}}</view>
				</view>
			</view>
    </view>

		<!-- <view class="bottom_bar between s_fc_12 s_bg_f">
			<view class="flex s_fc_f">
				<view class="btn s_bg_11" @tap="goSubmit">订单</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
  import uniPopup from '@/components/uni-popup/uni-popup.vue'	
  import coupon from '@/components/coupon/index.vue'	
  import goodsApi from '@/api/goods';
  import orderApi from '@/api/order';
  import userApi from '@/api/user';
  import utils from '@/common/util.js';
  import mathjs from '@/common/math';

	export default {
    components: {
			uniIcons,
			uniPopup,
			coupon,
    },

		data() {
			return {
				payType: {
					contrary_pay: '对公支付',
					alipay_app: '支付宝APP支付',
					alipay: '支付宝PC支付',
					wxpay_app: '微信APP支付',
					wxpay_native: '微信PC支付',
				},

				id: null,
				detail: {},

				address: null,

				currentCoupon: -1,
				coupon: null,
				couponList: [],

				remark: '',
			}
		},
		
		computed: {
      goodsPrice(){ return this.detail.goods_total_prices; },
			freight(){ return this.detail.shipping_fee; },
			deductPrice(){ return this.goodsPrice ? mathjs.subtract(mathjs.add(this.goodsPrice, this.freight), this.detail.order_amount) : 0; },
		},
    
		methods: {
			goAddress(e){
        uni.showLoading({ title: '...', mask: true, });

				uni.navigateTo({ url: `/pages/my/address/index?type=submitOrder`, });
			},

      openCouponDialog(type) {
				this.currentCoupon = -1;
				this.coupon = null;
				this.$refs.popup.open();
			},

			closeCouponDialog(type) {
				this.$refs.popup.close();
			},

			changeCoupon(e) {
				this.currentCoupon = e.detail.value;
			},

			closeCoupon() {
				this.coupon = this.couponList[this.currentCoupon];
				this.closeCouponDialog();
			},

			async getInfo() {
        let res = await orderApi.getOrder(this.id);
        if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取订单信息失败!', icon: 'none', });
      
        if(res.data) {
					this.detail = this.format(res.data[0]);
					this.address = this.detail.order_reciver_info;
        }
      },

      format(v) {
				v.payStr = this.payType[v.payment_code] || '';

			  return v;
		  },
		},

		onLoad(opt) {
			this.id = opt.id;
			this.getInfo();
		},

		onShow() {
		},

	}
</script>

<style>
.goods_page_wrap{
	padding: 0 24rpx 20rpx;
  word-break: break-all;
}

.address_wrap{
  position: relative;
	padding: 20rpx 20rpx 10rpx;
	border-radius: 8rpx;
}
.address_info_wrap{
  width: 560rpx;
  overflow: hidden;
}
.address_icon{
	align-self: flex-start;
}
.i_address{
	width: 44rpx;
	height: 44rpx;
}
.address_name, .address_phone{
	line-height: 1.3;
}

.order_info_container{
	padding: 0 20rpx 0;
  border-radius: 8rpx;
}
.order_info_wrap{
	padding: 10rpx 0;
	border-bottom: 1rpx solid #F9F9F9;
}
.order_info{
	position: relative;
}
.goods_list_wrap{
}
.goods_wrap{
  padding: 20rpx 0 12rpx;
}
.goods_img{
	align-self: flex-start;
  flex-shrink: 0;
  display: block;
	width: 140rpx; 
  height: 124rpx;
}
.goods_body{
  flex-grow: 1;
  align-self: flex-start;
}
.goods_title{
  width: 480rpx;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.price_list_wrap{
  padding: 10rpx 20rpx 0;
	border-radius: 8rpx;
}
.price_wrap{
	padding: 12rpx 0 0;
}
.order_price_wrap{
	padding: 12rpx 0 10rpx 0;
}
.price{
	line-height: 1.3;
}

.remark_wrap{
	margin: 0 0 0 160rpx;
}

.bottom_bar{
  position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100rpx;
	text-align: center;
}

.btn{
	height: 72rpx;
	line-height: 72rpx;
	text-align: center;
	border-radius: 40rpx;
}
.btn{
	width: 212rpx;
	margin: 0 60rpx 0 0;
}

.s_fc_10{ color: #222848; }
.s_fc_11{ color: #5E5C75; }
.s_fc_12{ color: #3E3F55; }
.s_fc_13{ color: #AEADB5; }
.s_fc_14{ color: #48495E; }
.s_fc_15{ color: #FF6C6E; }

.s_bg_10{ background: #F4F4F6; }
.s_bg_11{ background: linear-gradient(136deg, #FE705A 0%, #FD4750 100%); }
.s_bg_12{ background: linear-gradient(138deg, #FFC25F 0%, #FF9D45 100%);; }
.s_bg_13{ background: #FD5A55; }
.s_bg_14{ background: #627D97; }
</style>
