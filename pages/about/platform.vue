<template>
	<view class="home_page_wrap page_wrap s_bg_f">
		<view class="">
      <view class="banner_wrap">
        <banner class="banner" ref='banner' :config='bannerConfig'></banner>
      </view>
		</view>

		<view class="">
			<view class="company_title fs40 bold s_fc_12">{{detail && detail.company_name}}</view>

      <view class="company_desc s_fc_10">{{detail.company_content}}</view>
		</view>

    <!-- 公司坐标 -->
    <view class="map_wrap mt40">
			<view class="flex">
        <view class="module_title bold s_fc_12">公司坐标</view>
      </view>

      <image class="coord_bg mt30" :src="detail.company_image"></image>
    </view>

		<!-- 联系我们 -->
		<view class="contact_wrap mt40 s_fc_13">
      <view class="flex">
        <view class="module_title bold s_fc_12">联系我们</view>
      </view>

      <view class="link_item flex">
        <view class="link_icon">
					<image class="i_mobile" src="../../static/about/mobile.png"></image>
				</view>

				<view>{{detail.company_phone}}</view>
			</view>

			<view class="link_item flex">
        <view class="link_icon">
					<image class="i_address" src="../../static/about/address.png"></image>
				</view>

				<view>{{detail.company_site}}</view>
			</view>

			<view class="link_item flex">
        <view class="link_icon">
					<image class="i_phone" src="../../static/about/phone.png"></image>
				</view>

				<view>{{detail.company_call}}</view>
			</view>

			<view class="link_item flex">
        <view class="link_icon">
					<image class="i_site" src="../../static/about/web.png"></image>
				</view>

				<view>{{detail.company_website}}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import api from '@/api/api.js';
	import aboutApi from '@/api/about.js';
  import uniPopup from '@/components/uni-popup/uni-popup.vue'	
	import banner from '@/components/common/banner.vue'
	
	export default {
		components: {
			uniPopup,
			banner,
		},
		
		data() {
			return {
        bannerConfig: {
					list: [],
					// dot: true,
					autoplay: true,
					circular: true,
					valueKey: 'url',
					width: '100%',
					height: '300rpx',
				},

				detail: {},

        page: 1,
        limit: 10,
        total: 0,
				
			}
		},
		
		methods: {
      async getInfo() {
        uni.showLoading({ title:'Loading', mask:true })

				const res = await aboutApi.getCompany({});
        uni.hideLoading();
        if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取平台信息失败!', icon: 'none', });

				if (res.status === 0) {
          this.detail = this.format(res.data[0]);
				}
      },
      
      format(v) {
				try{
					this.bannerConfig.list = JSON.parse(v.company_banner);
				}catch(e){
					console.log(e.message);
				}

        return v;
      },
			
		  init() {
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

	}
</script>

<style>
.home_page_wrap{
	min-height: 100vh;
}

.banner_wrap{
	box-sizing: border-box;
}
.banner{
	overflow: hidden;
}

.company_title{
  padding: 64rpx 0 38rpx;	
	line-height: 1.3;
	text-align: center;
}
.company_desc{
	padding: 0 40rpx;
	line-height: 1.3;
}
	
.map_wrap{
	padding: 0 40rpx;
}
.coord_bg{
	width: 100%;
	height: 280rpx;
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

.contact_wrap{
  padding: 0 40rpx 20rpx;
}
.link_item{
	padding: 50rpx 0 30rpx;
	border-bottom: 2rpx solid #E5E5E5;
}
.link_item:last-child{
	border: none;
}
.link_icon{
	width: 88rpx;
}
.i_mobile{
	display: block;
	width: 42rpx;
	height: 44rpx;
}
.i_address, .i_site{
	display: block;
	width: 44rpx;
	height: 44rpx;
}
.i_phone{
	display: block;
	width: 46rpx;
	height: 46rpx;
}
	
.s_fc_10{ color: #5E5C75; }
.s_fc_11{ color: #B0B0B0}
.s_fc_12{ color: #282D4D; }
.s_fc_13{ color: #2A2F4F; }
</style>
