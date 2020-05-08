<template>
	<view class="news_page_wrap s_bg_f">
		<view class="">
      <view class="new_wrap" hover-class="uni-list-cell-hover" v-for="(item, key) in list" :key="key" @click="goDetail(item)">
				<view class="new_img_wrap">
					<image class="new_img img" :src="item.information_image" v-if="item.classify_id == 1"></image>
					<video class="new_img img" id="myVideo" enable-danmu danmu-btn controls
					       :src="item.information_video" :poster="item.information_image" @error="playError" @click.stop="" v-if="item.classify_id == 2"></video>
				</view>

        <view class="new_body">
          <view class="new_title s_fc_block">{{ item.information_title }}</view>
          <view class="new_time s_fc_gray">
            <text>{{ item.time }}</text>
          </view>
        </view>
			</view>

		</view>

		<!-- <uni-load-more :status="status"  :icon-size="16" :content-text="contentText" /> -->
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import newApi from '@/api/news';
import utils from '@/common/util.js';

export default {
	components: {
		// uniLoadMore
	},
	data() {
		return {
      banner: {},

      list: [],
      page: 1,
      limit: 10,
      total: 0,

			last_id: '',
			reload: false,
			status: 'more',
			contentText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多'
			}
		};
  },

	onLoad() {
		this.getList();
  },

	onPullDownRefresh() {
    this.list = [];
    this.page = 1;
    this.total = 0;

		this.getList();
    uni.stopPullDownRefresh();
  },

	onReachBottom() {
    if(this.total <= this.page * this.limit) return console.log('----');

		this.page++;
		this.getList();
  },

	methods: {
		playError(e) {
			console.log('playError', e);
			uni.showModal({ content: e.target.errMsg, showCancel: false })
		},

		async getList() {
      let param = { page: this.page, limit: this.limit, };

      uni.showLoading({ title: 'loading...', mask: true, });

      let res = await newApi.getNewsList(param);
      uni.hideLoading();
      if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '!', icon: 'none', });
      
      if(res.data) {
        res.data.forEach(this.format);
        this.list = this.reload ? res.data : this.list.concat(res.data);
        this.total = res.pagination ? res.pagination.total : this.list.length;
      }
    },

    format(v) {
      v.time = utils.toString(v.addtime * 1000);

			return v;
		},   

		goDetail(item) {
			uni.navigateTo({
				url: `./detail?id=${item.information_id}`,
			});
		},
		
	}
};
</script>

<style>
.news_page_wrap{
  min-height: 100vh;
	font-family: "PingFang SC";
}

.new_wrap{
  padding: 30rpx 30rpx 0;
  word-break: break-all;
}
.new_img_wrap{
	width: 100%;
  height: 380rpx;
}
.new_img{
  display: block;
  border-radius: 10rpx;
}

.new_body{
  padding: 20rpx 0 0;
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
</style>
