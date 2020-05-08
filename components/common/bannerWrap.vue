<template>
	<view>
		<view class="banner_wrap">
			<image class='banner_bg' :src="bannerBgUrl"></image>
			<banner :config="bannerConfig" class="banner" @go="goTest"></banner>
		</view>
		
	</view>
</template>

<script>
	import api from '@/api/api.js';
	import banner from '@/components/common/banner.vue'
	
	export default {
		props: {
			config: { type: Object },
		},
		
		data() {
			return {
				bannerConfig: {
					list: [],
					dot: true,
					autoplay: true,
					valueKey: 'banner_pic',
					width: '700rpx',
					height: '400rpx',
				},
			};
		},
		
		computed: {
			bannerBgUrl(){ return this.config ? this.config.img.home.url : ''; },
		},
		
		methods: {
			async getBannerList(){
				let res = await api.getBannerList();
				
				if(typeof res === 'string' || !res || res.error) this.handleError(res ? res.error || res : '获取轮播图失败!');
				
				this.bannerConfig.list = res.data;
			},
			
			handleError(content){
				uni.showModal({
					content,
					showCancel: false,
				});
			},
		},
		
		mounted() {
			this.getBannerList();
		},
		
		components: {
			banner,
		}
	}
</script>

<style>
.banner_wrap{
	position: relative;
	height: 540rpx;
}
.banner_bg{
	width: 100%;
	height: 450rpx;
}
.banner{
	position: absolute;
	top: 140rpx;
	left: calc(50% - 350rpx);
	width: 700rpx;
	height: 400rpx;
	overflow: hidden;
	border-radius: 20rpx;
}
</style>
