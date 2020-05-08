<template>
	<view class="distribute_page_wrap page_wrap s_bg_11">

    <view class="user_container s_bg_main">
      <view class="user_wrap s_bg_f">

        <view class="info_wrap between s_fc_10">
          <view>
            <view class="info_title fs36">历史总收益</view>
            <view class="fs40 s_fc_11">{{user && user.consume_amount.income_amount}}</view>
          </view>

          <view class="line"></view>

          <view>
            <view class="info_title fs36">可提现收益</view>
            <view class="fs40 s_fc_11">{{withdrawAmount}}</view>
          </view>
        </view>

        <view>
          <view class="withdraw_btn mt30 s_fc_f s_bg_10" @tap="goWithdraw">提现申请</view>
        </view>
      </view>
    </view>

    <view class="module_wrap bold s_fc_12">
      <view class="module between s_bg_f" v-for="(item, index) in moduleList" :key="index" @tap="go(item)">
        <view>{{item.title}}</view>

				<uni-icons type="arrowright" color="gray" size="12" />
      </view>
    </view>
		
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
  import userApi from '@/api/user';
  import * as gd from '@/common/global.js';

	export default {
		components: {
      uniIcons,
		},
		data() {
			return {
        user: null,

        moduleList: [
          { title: '提现明细', path: '/pages/my/distribute/list?type=withdraw', },
          { title: '收益明细', path: '/pages/my/distribute/list?type=income', },
        ],
			}
    },

    computed: {
      withdrawAmount(){ return this.user && this.user.consume_amount.withdraw_amount; },
    },

		methods: {
      goWithdraw() {
        if(this.withdrawAmount <= 0) return uni.showModal({ content: '无法提现!', showCancel: false, });

        uni.showLoading({ title:'Loading', mask:true })

        uni.navigateTo({ url: `/pages/my/distribute/withdraw`, });
      },

      go(item) {
				if(item.path) uni.navigateTo({ url: item.path, });
      },

      async getUser() {
        uni.showLoading({ title:'Loading', mask: true });

        const res = await userApi.getInfo();
        uni.hideLoading();
        if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取用户信息失败!', icon: 'none', });

				if(res.data){
					this.user = res.data;
				}
      },		
    },

    onShow() {
      this.getUser(); 
    },
    
	}
</script>

<style>
.distribute_page_wrap{
  min-height: 100vh;
}

.user_container{
  padding: 60rpx 30rpx 0;
  height: 400rpx;
  box-sizing: border-box;
}
.user_wrap{
  height: 340rpx;
  padding: 30rpx 82rpx;
  border-radius: 16rpx;
  box-sizing: border-box;
}
.info_wrap{
  text-align: center;
}
.info_title{
  height: 112rpx;
  line-height: 112rpx;
  font-weight: bold;
}
.line{
  align-self: flex-start;
  height: 112rpx;
  border: 3rpx solid #222848;
}

.withdraw_btn{
  width: 180rpx;  
  height: 60rpx;
  line-height: 60rpx;
  box-shadow: 0px 4px 8px 0px rgba(173, 173, 173, 0.5);
  border-radius: 42rpx;
  text-align: center;
}

.module_wrap{
}
.module{
  margin: 24rpx 30rpx 0;
  padding: 24rpx 30rpx;
  border-radius: 16rpx;
}

.s_fc_10{ color: #222848; }
.s_fc_11{ color: #FD5052; }
.s_fc_12{ color: #3E3F55; }

.s_bg_10{ background: #32B48F; }
.s_bg_11{ background: #F9F9F9; }
</style>