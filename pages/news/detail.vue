<template>
	<view class="new_wrap page_wrap s_bg_f s_fc_gray">
		<view class="banner">
      <view class="new_title s_fc_black">{{detail.information_title}}</view>

			<view>
			  <text class="new_time s_fc_gray">{{detail.time}}</text>
		  </view>
		</view>

    <view v-if="detail.classify_id == 1">
		  <image class="new_img mt30" :src="detail.information_image"></image>
    
		  <view class="new_content_wrap mt30">
			  <rich-text :nodes="detail.information_content"></rich-text>
		  </view>
    </view>
    <view v-if="detail.classify_id == 2">
      <video class="new_video" id="myVideo" :src="detail.information_video" :poster="detail.information_image" @error="playError" enable-danmu danmu-btn controls></video>
    </view>

	</view>
</template>

<script>
const DETAIL_PAGE_PATH = '/pages/template/list2detail-detail/list2detail-detail';

import htmlParser from '@/common/html-parser'
import newApi from '@/api/news';
import utils from '@/common/util.js';


export default {
	data() {
		return {
			title: '',
			detail: {},
		}
	},
	
	methods: {
		playError(e) {
			uni.showModal({ content: e.target.errMsg, showCancel: false })
		},

		async getDetail() {
			uni.showLoading({ title: 'loading...', mask: true, });

			let res = await newApi.getNews(this.id);
			uni.hideLoading();
			if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '!', icon: 'none', });
		
			if(res.data) {
				this.detail = this.format(res.data);
			}
		},

		format(v) {
			v.time = utils.toString(v.addtime * 1000);

			v.information_content = v.information_content.replace(/(<img )/g, '$1style="width: 100%;" ');
			
			return v;
		},
	},

	onLoad(event) {
		this.id = event.id;
		
		this.getDetail();
	},

	onShareAppMessage() {
		return {
			title: this.banner.title,
			path: DETAIL_PAGE_PATH + '?detailDate=' + JSON.stringify(this.banner)
		}
	},
}
</script>

<style>
.new_wrap{
  padding: 30rpx 30rpx 0;
  word-break: break-all;
}
.new_img{
  display: block;
	width: 100%;
  height: 380rpx;
  border-radius: 10rpx;
}

.new_title{
  font-size: 40rpx;
  font-weight: 600;
  line-height: 1.4;
}

.new_time{
  font-size: 24rpx;
  line-height: 2;
}

.new_content_wrap{
  font-size: 30rpx;
  line-height: 1.4;
}

.new_video{
  width: 100%;
}
</style>
