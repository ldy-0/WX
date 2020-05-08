<template>
	<view class="goods_page_wrap page_wrap s_bg_10">
    <!-- goods -->
		<view class="order_info_container mt30 s_fc_10 s_bg_f">
			<view class="goods_list_wrap">

				<view class="goods_wrap flex" v-for="(item, index) in detail.order_goods" :key="index">
					<image class="goods_img" :src="item.goods_image"></image>

					<view class="goods_body ml20">
						<view class="goods_title">{{item.goods_name}}</view>
						<view class="mt10 s_fc_gray">{{item.goods_spec || '无'}}</view>

						<!-- <view class="between s_fc_gray">
							<view class="fs32 s_fc_price">¥{{item.goods_price}}</view>
							<view class="s_fc_12">x{{item.goods_num}}</view>
						</view> -->
					</view>
				</view>

			</view>
		</view>

		<view class="textarea_wrap flex mt30 s_bg_f">
			<view class="">
				<image class="i_edit" src="../../../static/my/edit.png"></image>
			</view>

			<textarea class="textarea ml20 fs24" placeholder="可以从多个角度评价宝贝，帮助更多的想买入的人" placeholder-class="textarea_placeholder" :maxlength="240" v-model="content" />
		</view>

	  <view class="upload_wrap mt30 s_fc_11">
			<upload class="" :config="uploadConfig" @success="changeImg"></upload>
			<view class="upload_desc mt20">上传照片，最多不超过6张</view>
		</view>

		<view class="submit_btn s_fc_f s_bg_11" @tap="submit">发布</view>

	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue'
import uniPopup from '@/components/uni-popup/uni-popup.vue'	
import upload from '@/components/upload/index.vue'
import goodsApi from '@/api/goods';
import orderApi from '@/api/order';
import userApi from '@/api/user';
import utils from '@/common/util.js';
import uploadUtil from '@/common/upload';

export default {
	components: {
		uniIcons,
		uniPopup,
		upload,
	},

	data() {
		return {
			doing: false,

			id: null,
			detail: {},

			content: '',
			imgList: [],

			uploadConfig: {
				limit: 6,	
			},

		}
	},
	
	computed: {
	},
	
	methods: {
		changeImg(list) {
			this.imgList = list;
		},

		async submit(e) {
			let imgList = [];

			if(!this.id) return uni.showToast({ title: 'order_id不能为空!', icon: 'none', });

			if(!this.content) return uni.showToast({ title: '评论内容不能为空!', icon: 'none', mask: true, });

			uni.showLoading({ title: 'Loading...', mask: true, });

      if(this.imgList.length){
				let res = await uploadUtil.uploadImgList(this.imgList);
				if(!res || typeof res === 'string' || res.error) return uni.hideLoading(), uni.showToast({ title: res ? res.error || res : '上传图片失败!', icon: 'none', });

				if(res) imgList = res;
			}

			let param = { 
				order_id: this.id,
				order_no: this.detail.order_sn,
				goods_id: this.detail.order_goods[0].goods_id,
				content: this.content,
				geval_image: imgList,
			};

			this.evaluate(param);
		},

		async evaluate(param) {

			let res = await orderApi.evaluate(param);
			uni.hideLoading();
			if(res && res.status == 0) {
				return uni.showModal({ content: '评价成功!', showCancel: false, success(e){ if(e.confirm) uni.navigateBack(); } });
			}

			uni.showToast({ title: res ? res.error || res : '评价失败!', icon: 'none', });
		},

		async getInfo() {
			let res = await orderApi.getOrder(this.id);
			if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取订单信息失败!', icon: 'none', });
		
			if(res.data) {
				this.detail = res.data[0];
				this.address = this.detail.order_reciver_info;
			}
		},

		format(v) {

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
	padding: 0 24rpx;
}

.order_info_container{
	padding: 0 20rpx 0;
  border-radius: 8rpx;
}
.goods_list_wrap{
}
.goods_wrap{
  padding: 30rpx 0 20rpx;
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

.textarea_wrap{
	align-items: flex-start;
	height: 400rpx;
  padding: 30rpx;
	border-radius: 16rpx;
}
.textarea{
	height: 100%;
}
.textarea_placeholder{
  font-size: 24rpx;
	color: rgba(94, 92, 117, 0.45);;
}
.i_edit{
	display: block;
	width: 24rpx;
	height: 24rpx;
}

.upload_desc{
	position: relative;
	font-size: 24rpx;
	left: -10%;
	width: 120%;
	transform: scale(0.83);
}

.submit_btn{
  position: fixed;
	bottom: 26rpx;
	left: calc(50% - 315rpx);
	width: 630rpx; 
	height: 84rpx;
	font-size: 32rpx;
	line-height: 84rpx;
	text-align: center;
	border-radius: 40rpx;
	letter-spacing: 2rpx;
}

.s_fc_10{ color: #222848; }
.s_fc_11{ color: #32B48F; }
.s_fc_12{ color: #3E3F55; }
.s_fc_13{ color: #AEADB5; }
.s_fc_14{ color: #48495E; }
.s_fc_15{ color: #FF6C6E; }

.s_bg_10{ background: #F4F4F6; }
.s_bg_11{ background: #32B48F; }
.s_bg_12{ background: linear-gradient(138deg, #FFC25F 0%, #FF9D45 100%);; }
.s_bg_13{ background: #FD5A55; }
.s_bg_14{ background: #627D97; }
</style>
