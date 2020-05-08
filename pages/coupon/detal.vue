<template>
	<view class="goods_page_wrap s_bg_f s_fc_gray">
    <view class="banner_wrap">
      <banner class="banner" ref='banner' :config='bannerConfig' @emit="preview"></banner>

      <view class="banner_desc fs24 s_fc_f s_bg_10">{{bannerConfig.index + 1}}/{{bannerConfig.list.length}}</view>
    </view>

		<view class="goods_body_wrap s_bg_f">
      <view class="mt10 flex">
        <view class="goods_price bold s_fc_price">¥{{detail.goods_price}}</view>
        <view class="goods_marketprice ml20 s_fc_11">¥{{detail.goods_marketprice}}</view>
      </view>

      <view class="goods_title mt20 s_fc_10">{{detail.goods_name}}</view>

			<view class="flex s_fc_gray">
			  <view class="">{{detail.goods_advword}}</view>
			  <view class="ml48">销量：{{detail.goods_advword}}</view>
			  <view class="ml48">库存：{{detail.goods_advword}}</view>
		  </view>
		</view>

    <!-- sku -->
    <view class="comment_wrap between s_fc_12" @tap="openSkuDialog">
      <view class="flex">
        <view class="bold fs24 s_fc_13">已选</view>

        <view class="ml50 fs24">规格：{{sku ? sku.goods_spec: ''}}</view>
      </view>

      <uni-icons class="bold ml20" type="arrowright" color="black" size="15" />
    </view>

    <!-- 评价 -->
    <view class="comment_wrap s_fc_13" @tap="goComment">
			<view class="between">
				<view class="bold fs32 s_fc_12">商品评价</view>

				<view class="flex">
					<view class="fs24">查看全部<text class="s_fc_12">{{commentTotal}}</text>条评价</view>

					<uni-icons class="bold ml20" type="arrowright" color="black" size="15" />
				</view>
			</view>

			<view class="fs24 s_fc_13">发货速度快，药品质量好</view>
    </view>

    <!-- 详情 -->
    <view class="goods_content_wrap">
      <rich-text :nodes="detail.goods_body"></rich-text>
    </view>

		<view class="bottom_bar between">
			<view class="ml40 flex">
				<view class="">
					<image class="i_contact" src="../../static/logo.png"></image>
					<view class="contact fs20">客服</view>
				</view>

				<view class="ml60" v-if="!isSeckill" @tap="goCart">
					<view class="cart_img_wrap">
						<image class="i_cart" src="../../static/logo.png"></image>
						<view class="cart_num s_fc_f s_bg_13">{{cartNum}}</view>
					</view>
					<view class="cart fs20">购物车</view>
				</view>
			</view>

			<view class="seckill_btn flex s_bg_11 s_fc_f" @tap="goSubmit" v-if="isSeckill">
				<view class="fs24">倒计时：</view>
				<uni-countdown class="seckill_goods_countdown fs24" :day="1" :hour="1" :minute="12" :second="40" color="#fff" splitor-color="#fff" background-color="transparent" />
				<view class="ml30">立即秒杀</view>
			</view>
			<view class="flex s_fc_f" v-else>
				<view class="btn s_bg_11" @tap="openSkuDialog('cart')">加入购物车</view>
				<view class="btn s_bg_12" @tap="openSkuDialog">立即购买</view>
			</view>
		</view>

    <!-- sku -->
	  <uni-popup ref="popup" type="bottom">
			<sku :config="detail" @close="closeSkuDialog" @change="changeSku"></sku>
		</uni-popup>	

	</view>
</template>

<script>
	const DETAIL_PAGE_PATH = '/pages/template/list2detail-detail/list2detail-detail';

	import banner from '@/components/common/banner.vue'
	import sku from '@/components/goods/sku.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
  import uniPopup from '@/components/uni-popup/uni-popup.vue'	
  import goodsApi from '@/api/goods';
  import utils from '@/common/util.js';

	function _handleShareChannels(provider) {
		let channels = [];
		for (let i = 0, len = provider.length; i < len; i++) {
			switch (provider[i]) {
				case 'weixin':
					channels.push({
						text: '分享到微信好友',
						id: 'weixin',
						sort: 0
					});
					channels.push({
						text: '分享到微信朋友圈',
						id: 'weixin',
						sort: 1
					});
					break;
				default:
					break;
			}
		}
		channels.sort(function(x, y) {
			return x.sort - y.sort;
		});
		return channels;
	}

	export default {
    components: {
			uniIcons,
			uniPopup,
			banner,
			sku,
    },

		data() {
			return {
        title: '',
        bannerConfig: {
          list: [],
          index: 0,
					// dot: true,
					autoplay: true,
					valueKey: 'goodsimage_url',
					width: '100%',
					height: '570rpx',
				},

        id: null,
				detail: {},
				cartNum: 0,

				commentTotal: 0,

				sku: null,
			}
		},
		
		computed: {
      isSeckill(){ return false; },
		},
    
		onLoad(opt) {
			this.id = opt.id;
			
			this.getDetail();
		  this.getCartList();	
		},

		methods: {
			preview(item) {
				uni.previewImage({ urls: [item.goodsimage_url] });
			},

      openSkuDialog(type) {
				this.detail.isCart = type == 'cart';
				this.$refs.popup.open();
			},

			closeSkuDialog(type) {
				this.$refs.popup.close();

				if(type == 'cart') this.getCartList();
			},

			changeSku(sku) {
        this.sku = sku;
			},

			goComment(e){
        uni.showLoading({ title: '...', mask: true, });

				uni.navigateTo({ url: `/pages/goods/commentList?id=${this.detail.SKUList[0].goods_id}`, });
			},

			goCart(e){
        uni.showLoading({ title: '...', mask: true, });

				uni.switchTab({ url: `/pages/goods/cartList`, });
			},

			goSubmit(e){
        uni.showLoading({ title: '...', mask: true, });

				uni.navigateTo({ url: `/pages/order/submit`, });
			},
			
			async getCommentList() {
        uni.showLoading({ title: 'loading...', mask: true, });

        let res = await goodsApi.getCommentList({ goods_id: this.detail.SKUList[0].goods_id, });
        uni.hideLoading();
        if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取评价信息失败!', icon: 'none', });
      
        if(res.data) {
          this.commentTotal = res.pagination ? res.pagination.total : res.data.length;
        }
			},
			
			async getCartList() {
        let res = await goodsApi.getCartList({});
        if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取购物车信息失败!', icon: 'none', });
      
        if(res.data) {
          this.cartNum = res.data.store_cart_list[1] ? res.data.store_cart_list[1].length : 0;
        }
      },

			async getDetail() {
        uni.showLoading({ title: 'loading...', mask: true, });

        let res = await goodsApi.getGoods(this.id);
        uni.hideLoading();
        if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '!', icon: 'none', });
      
        if(res.data) {
          this.detail = this.format(res.data);
					this.bannerConfig.list = this.detail.goodsimagesList;
					this.getCommentList();
        }
      },

      format(v) {
        // v.time = utils.toString(v.addtime * 1000);
				v.goodsNum = 1;

        v.goods_body = v.goods_body.replace(/(<img )/g, '$1style="width: 100%;" ');

			  return v;
		  },
		},

	onShareAppMessage() {
			return {
				title: this.banner.title,
				path: DETAIL_PAGE_PATH + '?detailDate=' + JSON.stringify(this.banner)
			}
		},

		onNavigationBarButtonTap(event) {
			const buttonIndex = event.index;
			if (buttonIndex === 0) {
				// 分享 H5 的页面
				const shareProviders = [];
				uni.getProvider({
					service: 'share',
					success: (result) => {
						// 目前仅考虑分享到微信
						if (result.provider && result.provider.length && ~result.provider.indexOf('weixin')) {
							const channels = _handleShareChannels(result.provider);
							uni.showActionSheet({
								itemList: channels.map(channel => {
									return channel.text;
								}),
								success: (result) => {
									const tapIndex = result.tapIndex;
									uni.share({
										provider: 'weixin',
										type: 0,
										title: this.banner.title,
										scene: tapIndex === 0 ? 'WXSceneSession' : 'WXSenceTimeline',
										href: 'https://uniapp.dcloud.io/h5' + DETAIL_PAGE_PATH + '?detailDate=' + JSON.stringify(this.banner),
										imageUrl: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png'
									});
								}
							});
						} else {
							uni.showToast({
								title: '未检测到可用的微信分享服务'
							});
						}
					},
					fail: (error) => {
						uni.showToast({
							title: '获取分享服务失败'
						});
					}
				});
			}
		},

	}
</script>

<style>
.goods_page_wrap{
  min-height: 100vh;
  word-break: break-all;
}

.banner_wrap{
  position: relative;
}
.banner_desc{
  position: absolute;
  bottom: 20rpx;
  right: 0;
  height: 34rpx;
  padding: 0 20rpx;
  line-height: 34rpx;
  border-radius: 200px 0px 0px 200px;
}

.goods_body_wrap{
  padding: 0 30rpx 20rpx;
}
.goods_price{
  font-size: 48rpx;
  line-height: 66rpx;
}
.goods_marketprice{
  font-size: 32rpx;
  text-decoration: line-through;
}
.goods_title{
  font-size: 40rpx;
  font-weight: 600;
  line-height: 48rpx;
}

.comment_wrap{
  padding: 20rpx 30rpx;
  border-top: 15rpx solid #F9F9F9;
}

.goods_content_wrap{
  font-size: 30rpx;
  line-height: 1.4;
  border-top: 15rpx solid #F9F9F9;
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
	margin: 0 24rpx 0 0;
}
.seckill_btn{
  margin: 0 40rpx 0 0;
	padding: 0 40rpx;
}

.contact, .cart{
  line-height: 1.3;	
}
.contact{
	margin: 14rpx 0 0;
}
.cart_img_wrap{
	position: relative;
}
.cart{
	margin: 10rpx 0 0;
}
.cart_num{
	position: absolute;
	top: -10rpx;
	right: -4rpx;
	width: 28rpx;
	height: 28rpx;
  font-size: 20rpx;	
	line-height: 28rpx;
	border-radius: 50%;
}
.i_contact{
	display: block;
  width: 46rpx;	
	height: 44rpx;
	margin: 0 auto;
}
.i_cart{
	display: block;
	width: 48rpx;
	height: 48rpx;
	margin: 0 auto;
}

.s_fc_10{ color: #222848; }
.s_fc_11{ color: #BABABA; }
.s_fc_12{ color: #3E3F55; }
.s_fc_13{ color: #AEADB5; }

.s_bg_10{ background: rgba(0, 0, 0, 0.24); }
.s_bg_11{ background: linear-gradient(136deg, #FE705A 0%, #FD4750 100%); }
.s_bg_12{ background: linear-gradient(138deg, #FFC25F 0%, #FF9D45 100%);; }
.s_bg_13{ background: #FD5A55; }
</style>
