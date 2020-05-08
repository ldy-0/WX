<template>
	<view class="goods_page_wrap page_wrap s_bg_10">
    <!-- 地址 -->
    <view class="address_wrap mt20 s_bg_f">
			<view class="address_empty between s_fc_12" @tap="goAddress">
				<view class="" v-if="address">
            <view class="address_info_wrap flex">
              <view class="">{{address.address_realname}}</view>
              <view class="ml40">{{address.address_mob_phone}}</view>
            </view>

            <view class="fs24 s_fc_13">{{address.area_info}}{{address.address_detail}}</view>
				</view>

				<view class="flex" v-else>
					<view class="bold fs32">收货地址</view>

					<view class="ml60 fs24 s_fc_13">请填写收货地址</view>
				</view>

				<uni-icons class="bold ml20" type="arrowright" color="black" size="15" />
			</view>
    </view>

    <!-- goods -->
		<view class="goods_list_wrap mt20 s_bg_f">
			<view class="goods_wrap " v-for="(item, index) in goodsList" :key="index">
				<view class="flex">
					<image class="goods_img" :src="item.goods_image"></image>

					<view class="goods_body ml30">
						<view class="goods_title s_fc_10">{{item.goods_name}}</view>
						<view class="fs24 s_fc_gray">{{item.goods_spec || ''}}</view>

						<view class="between mt10 s_fc_gray">
							<view class="fs32 s_fc_price">¥{{item.goods_price}}</view>
							<view class="s_fc_0">x{{item.goods_num}}</view>
						</view>
					</view>
				</view>

				<view class="remark_wrap flex s_fc_11">
					<view class="fs24">订单备注：</view>
					<input type="text" class="remark_input fs24" @input="setRemark(item, $event)" :value="item.remark" placeholder="" placeholder-class="placeholder">
				</view>
			</view>
		</view>

    <!-- 优惠券 -->
    <view class="coupon_wrap mt20 s_fc_14 s_bg_f" @tap="openCouponDialog" v-if="showCoupon">
			<view class="between">
				<view class="">优惠券</view>

				<view class="price flex s_fc_15">
					<view class="" v-if="couponList.length">有<text class="coupon_num s_fc_f s_bg_14">{{couponList.length}}</text>张优惠券可用</view>
					<view class="" v-else>暂无优惠券可用</view>

					<uni-icons class="bold ml20" type="arrowright" color="black" size="15" />
				</view>
			</view>
    </view>

		<view class="price_list_wrap mt20 s_fc_13 s_bg_f">
			<view class="price_wrap between">
				<view class="s_fc_14">商品金额</view>
				<view class="price fs32 s_fc_12">¥{{goodsPrice}}</view>
			</view>

			<view class="between" v-if="showCoupon">
				<view class="s_fc_14">优惠券抵扣</view>
				<view class="price fs32 s_fc_price">-¥{{deductPrice}}</view>
			</view>

			<view class="between">
				<view class="s_fc_14">总运费</view>
				<view class="price fs32 s_fc_price">¥{{freight}}</view>
			</view>
    </view>

    <!-- pay -->
		<view class="pay_list_wrap mt20 s_fc_12 s_bg_f">
			<radio-group @change="changePay">
				<view class="pay_item flex">
					<view class="radio_wrap flex">
						<radio style="transform:scale(0.6)" value="alipay_app" :checked="currentPay == 'ali'" color="#FF6B6E" />
						<image class="i_ali " src="../../../static/order/ali.png"></image>
					</view>
					<view class="fs24">支付宝</view>
				</view>

				<view class="pay_item flex">
					<view class="radio_wrap flex">
						<radio style="transform:scale(0.6)" value="wxpay_app" :checked="currentPay == 'wx'" color="#FF6B6E" />
						<image class="i_wx" src="../../../static/order/wx.png"></image>
					</view>
					<view class="fs24">微信</view>
				</view>

        <view class="pay_item pay_item_other between" @tap="goSubmit()" v-if="!isSeckill">
					<view class="flex">
						<view class="radio_wrap flex">
							<radio style="transform:scale(0.6); visibility: hidden;" value="wx" :checked="currentPay == 'wx'" color="#FF6B6E" />
							<image class="i_pay" src="../../../static/order/pay.png"></image>
						</view>
						<view class="fs24">对公支付</view>
					</view>

					<uni-icons class="bold ml20" type="arrowright" color="black" size="15" />
				</view>
			</radio-group>
    </view>

		<view class="bottom_bar between s_fc_12 s_bg_f">
			<view class="ml40 flex">合计：<text class="fs36 s_fc_price">¥{{price}}</text></view>

			<view class="flex s_fc_f">
				<view class="btn s_bg_11" @tap="goSubmit">提交订单</view>
			</view>
		</view>

    <!-- 优惠券列表 -->
	  <uni-popup ref="popup" type="bottom">
			<view class="coupon_list_container s_fc_12 s_bg_f">
				<view class="coupon_list_title fs32 bold">优惠券</view>

				<uni-icons class="i_close" type="close" color="#ccc" size="20"  @tap="closeCoupon" />

        <scroll-view class="coupon_list_wrap mt30" scroll-y>
					<radio-group>
						<view class="between" v-for="(item, index) in couponList" :key="index">
							<radio style="transform:scale(0.8)" :value="String(index)" :checked="index == currentCoupon" color="#FF6B6E" @tap="changeCoupon(index)" />

							<couponItem :config="item"></couponItem>
						</view>
					</radio-group>
        </scroll-view>

				<view class="coupon_btn fs32 s_fc_f s_bg_13" @tap="closeCoupon">确定</view>
			</view>
		</uni-popup>	

	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue'
import uniPopup from '@/components/uni-popup/uni-popup.vue'	
import couponItem from '@/components/coupon/index.vue'	
import goodsApi from '@/api/goods';
import orderApi from '@/api/order';
import couponApi from '@/api/coupon';
import userApi from '@/api/user';
import utils from '@/common/util.js';
import mathjs from '@/common/math';

export default {
	components: {
		uniIcons,
		uniPopup,
		couponItem,
	},

	data() {
		return {
			address: null,

			sku: null,
			skuList: [],

			currentCoupon: -1,
			coupon: null,
			couponList: [],

			currentPay: '',
				
			price: 0,
			goodsPrice: 0,
			deductPrice: 0,
			freight: 0,

		}
	},
	
	computed: {
		cartIdList(){ return this.goodsList.map(v => `${v.cart_id || v.goods_id}|${v.goods_num}`); },
		goodsList(){ return this.sku ? [this.sku] : this.skuList; },
		isCart(){ return !this.sku; },
		isSeckill(){ return this.sku && this.sku.seckill_id; },
		showCoupon(){ return !this.isSeckill; },
	},
	
	methods: {
		goAddress(e){
			uni.showLoading({ title: '...', mask: true, });

			uni.navigateTo({ url: `/pages/my/address/index?type=submitOrder`, });
		},

		setRemark(item, e) {
			item.remark = e.detail.value;
		},

		openCouponDialog(type) {
			if(!this.couponList.length) return ;

			this.$refs.popup.open();
		},

		closeCouponDialog(type) {
			this.$refs.popup.close();
		},

		changeCoupon(i) {
			if(i == this.currentCoupon) return this.currentCoupon = -1;

			let coupon = this.couponList[i];

			this.currentCoupon = i;
			 
		  // 优惠券领取
			if(coupon.type == 0) this.acceptCoupon(coupon);
		},

		closeCoupon() {
			this.coupon = this.couponList[this.currentCoupon];
			this.closeCouponDialog();
			this.checkout();
		},

		async acceptCoupon(item) {
      if(item.type == 1) return uni.showToast({ title: '已领取!', icon: 'none', mask: true, });

      let param = { vouchertemplate_id: item.vouchertemplate_id };
      
      uni.showLoading({ title: 'loading...', mask: true, });

      let res = await couponApi.accept(param);
      uni.hideLoading();
      if(!res || typeof res === 'string' || res.error) return this.currentCoupon = -1, uni.showToast({ title: res ? res.error || res : '领取失败!', icon: 'none', });
      
      if(res.data) {
        item.type = 1;
        uni.showToast({ title: '领取成功!', icon: 'success', mask: true, });
      }
    },

		changePay(e) {
			this.currentPay = e.detail.value;
		},

		async getCouponList() {
			uni.showLoading({ title: 'loading...', mask: true, });

			let res = await couponApi.getValidList(this.price);
			uni.hideLoading();
			
			if(res && res.data) {
				res.data.filter(v => v.vouchertemplate_gettype == 3 || (v.vouchertemplate_gettype == 4 && v.type == 1)).forEach(this.formatCoupon);
				return this.couponList = res.data;
			}

			uni.showToast({ title: res ? res.error || res : '获取优惠券信息失败!', icon: 'none', });
		},

		formatCoupon(v) {
			
			return v;
		},

		goSubmit(e) {
			if(!this.address) return uni.showToast({ title: '请选择地址!', icon: 'none', });
			
			let param = { ifcart: this.isCart ? 1 : 0, cart_id: this.cartIdList, address_id: this.address.address_id, pay_name: 'online', order_from: 2, };
			
			param.pay_message = this.goodsList.map(v => v.remark);

			if(this.coupon) param.voucher = { [this.coupon.vouchertemplate_store_id]: this.coupon.voucher_id };

      // 秒杀
			if(this.isSeckill) param.seckill_id = this.sku.seckill_id;

      // 对公支付
			if(!e){
				this.currentPay = 'contrary_pay';
			}

			if(!this.currentPay) return uni.showToast({ title: `请选择支付方式!`, icon: 'none', });
			param.payment_code = this.currentPay;

			this.submitOrder(param);
		},

		async submitOrder(param) {
			uni.showLoading({ title: 'loading...', mask: true, });

			let res = await orderApi.submit(param);

			if(res && res.status == 0) {
				if(this.currentPay == 'contrary_pay') return uni.redirectTo({ url: `/pages/my/order/publicPay?id=${res.data.order_id}&sn=${res.data.pay_sn}`, });
				if(this.isSeckill) this.cancelOrder({ state_type: 'order_cancel', pay_sn: res.data.pay_sn, });
				return ;
			}

			uni.hideLoading();
			uni.showToast({ title: res ? res.error || res : '提交订单失败!', icon: 'none', });
		},

		async checkout() {
			let param = { ifcart: this.isCart ? 1 : 0, cart_id: this.cartIdList, city_id: this.address.city_id, };

			if(this.coupon) param.voucher_list = { [this.coupon.vouchertemplate_store_id]: this.coupon.voucher_id };

      // 秒杀
			if(this.isSeckill) param.seckill_id = this.sku.seckill_id;

			uni.showLoading({ title: 'loading...', mask: true, });

			let res = await goodsApi.checkout(param);
			uni.hideLoading();
			if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '结算失败!', icon: 'none', });
			
			if(res.data) {
				this.price = res.data.store_final_order_total[1];
				this.goodsPrice = res.data.goods_total[1];	
				this.freight = res.data.freight_list[1];
				this.deductPrice = mathjs.subtract(mathjs.add(this.goodsPrice, this.freight), this.price);

				if(this.showCoupon && !this.coupon) this.getCouponList();
			}
		},

		async cancelOrder(param) {
			let res = await orderApi.cancelOrder(param);

			if(res && res.status == 0) {
				return ;
			}

			uni.showToast({ title: res ? res.error || res : '取消订单失败!', icon: 'none', });
		},	

		async getAddress() {
			let res = await userApi.getAddressList();
			if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取地址信息失败!', icon: 'none', });
		
			if(res.data && res.data.length) {
				let address = res.data.filter(v => v.address_is_default == 1)[0];
				this.address = address || res.data[0];
				this.checkout();
			}
		},

		format(v) {
			v.goodsNum = 1;

			v.goods_body = v.goods_body.replace(/(<img )/g, '$1style="width: 100%;" ');

			return v;
		},
	},

	onLoad(opt) {
		this.getAddress();

		let sku = uni.getStorageSync('sku'),
				skuList = uni.getStorageSync('skuList');
		// 商品
		if(sku){
			sku.remark = '';
			this.sku = sku;
			uni.removeStorageSync('sku');
		}

    // 购物车
		if(skuList){
			skuList.forEach(v => v.remark = '');
			this.skuList = skuList;
			uni.removeStorageSync('skuList');
		}
	},

	onShow() {
		let address = uni.getStorageSync('return_address');
	  // 选择地址
		if(address){
			this.address = address;
			uni.removeStorageSync('return_address');
			this.checkout();
		}
	},

}
</script>

<style>
.goods_page_wrap{
	padding: 0 24rpx 120rpx;
  word-break: break-all;
}

.address_wrap{
  position: relative;
	border-radius: 8rpx;
}
.address_empty{
	padding: 44rpx 20rpx;
}
.address_info_wrap{
  width: 560rpx;
  overflow: hidden;
}

.goods_list_wrap{
  border-radius: 8rpx;
}
.goods_wrap{
  padding: 20rpx 20rpx 10rpx;
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

.remark_wrap{
	margin: 0 0 0 170rpx;
}
.remark_input{
	flex-grow: 1;
}

.coupon_wrap{
  padding: 0 20rpx;
	border-radius: 8rpx;
}
.coupon_num{
	padding: 6rpx 10rpx;
	border-radius: 8rpx;
}
.coupon_list_container{
	position: relative;
	padding: 52rpx 28rpx 36rpx;
}
.coupon_list_title{
	text-align: center;
}
.coupon_list_wrap{
	height: 500rpx;
}
.coupon_btn{
	width: 630rpx;
	height: 68rpx;
	margin: 60rpx auto 0;
	line-height: 68rpx;
	text-align: center;
	border-radius: 42rpx;
}

.i_close{
	position: absolute;
	top: 20rpx;
	right: 40rpx;
	width: 36rpx;
	height: 36rpx;
}

.price_list_wrap{
  padding: 0 20rpx;
	border-radius: 8rpx;
}
.price{
	line-height: 2.4;
}

.pay_list_wrap{
	border-radius: 8rpx;
}
.pay_item{
	padding: 20rpx 0;
}
.pay_item_other{
	padding-right: 20rpx;
}
.radio_wrap{
  width: 120rpx;
	padding: 0 0 0 10rpx;
	box-sizing: border-box;
}

.bottom_bar{
  position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100rpx;
	text-align: center;
}

.btn, .seckill_btn{
	height: 72rpx;
	line-height: 72rpx;
	text-align: center;
	border-radius: 40rpx;
}
.btn{
	width: 212rpx;
	margin: 0 60rpx 0 0;
}
.seckill_btn{
  margin: 0 40rpx 0 0;
	padding: 0 40rpx;
}

.i_ali{
	display: block;
  width: 44rpx;	
	height: 44rpx;
}
.i_wx{
	display: block;
	width: 36rpx;
	height: 36rpx;
}
.i_pay{
	display: block;
	width: 34rpx;
	height: 28rpx;
}

.s_fc_10{ color: #222848; }
.s_fc_11{ color: #5E5C75; }
.s_fc_12{ color: #3E3F55; }
.s_fc_13{ color: #AEADB5; }
.s_fc_14{ color: #48495E; }
.s_fc_15{ color: #FF6C6E; }

.s_bg_10{ background: #F4F4F6; }
.s_bg_11{ background: linear-gradient(136deg, #FE705A 0%, #FD4750 100%); }
.s_bg_12{ background: linear-gradient(138deg, #FFC25F 0%, #FF9D45 100%); }
.s_bg_13{ background: #FD5A55; }
.s_bg_14{ background: linear-gradient(180deg, #C5D6E4 0%, #6F8FAD 40%, #6A8094 70%); }
</style>