<template>
	<view class="page_wrap share_page_wrap s_bg_10">
		<view class="bg_img_wrap">
      <image class="img" src="../../static/about/shareBg.png"></image>
		</view>

		<view class="share_dialog_wrap s_bg_f">
			<view class="share_title fs40 bold s_fc_12">扫描下方二维码</view>

			<view class="qrcode_wrap">
				<image class="img" :src="detail.link_pic"></image>
			</view>

			<view class="line"></view>

      <view class="share_desc s_fc_10">复制下载地址发送给好友即可</view>

		  <view class="copy_btn fs36 s_fc_f s_bg_11" @tap="copy">复制链接</view>
		</view>
		
	</view>
</template>

<script>
	import api from '@/api/api.js';
	import aboutApi from '@/api/about.js';
  import uniPopup from '@/components/uni-popup/uni-popup.vue'	
	
	export default {
		components: {
			uniPopup,
		},
		
		data() {
			return {
				detail: {},

        goodsList: [],
        page: 1,
        limit: 10,
        total: 0,
				
			}
		},
		
		methods: {
			copy() {
				let opt = { data: this.detail.link_url, };

				opt.success = () => uni.showToast({ title: '复制成功!', });
				opt.fail = err => uni.showToast({ title: '复制失败!', });

        uni.setClipboardData(opt);
			},

      async getInfo() {
        uni.showLoading({ title:'Loading', mask:true })

				const res = await aboutApi.getLink({});
        uni.hideLoading();
        if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取分享信息失败!', icon: 'none', });

				if (res.status === 0) {
          this.detail = res.data;
				}
      },
			
		  init() {
        this.goodsList = [];
        this.seckillList = [];
        this.bannerConfig.list = [];
        this.page = 1;
        this.total = 0;

        this.getInfo();
      }	
		},
		
		onShow(param){
		},
		
		onLoad(param){
      this.getInfo();
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

	}
</script>

<style>
.share_page_wrap{
	min-height: 100vh;
}

.bg_img_wrap{
	padding: 80rpx 0 0;
  height: 446rpx;	
}

.share_dialog_wrap{
	position: relative;
	margin: -100rpx 50rpx 0;
	padding: 0 0 30rpx;
	border-radius: 32rpx;
	text-align: center;
}

.share_title{
  padding: 40rpx 0;	
	line-height: 1.3;
	text-align: center;
}
.share_desc{
	padding: 28rpx 0 36rpx;
	line-height: 1.3;
}

.qrcode_wrap{
	width: 412rpx;
	height: 408rpx;
	margin: 0 auto;
}

.line{
	width: 500rpx;
	margin: 48rpx auto 0;
	border: 1rpx dashed #32B48F;
}
	
.copy_btn{
	width: 288rpx;
	height: 80rpx;
	margin: 0 auto;
	line-height: 80rpx;
	letter-spacing: 2rpx;
	border-radius: 40rpx;
	box-shadow: 0px 4px 8px 0px rgba(161, 161, 161, 0.5);
}
	
.s_fc_10{ color: #5E5C75; }
.s_fc_11{ color: #B0B0B0}
.s_fc_12{ color: #282D4D; }
.s_fc_13{ color: #A2A2A2; }

.s_bg_10{ background: #32B48F; }
.s_bg_11{ background: linear-gradient(138deg, #3FD3A6 0%, #44DDAD 100%); }
</style>
