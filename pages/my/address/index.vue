<template>
	<view class="container page_wrap s_bg_f">
		<view class="add_btn s_fc_f s_bg_10" @tap="go()">新建收货地址</view>

    <radio-group @change="radioChange">
      <view class="address_wrap flex s_fc_12 s_bg_f" @tap="choose(item)" v-for="(item,index) in addressList" :key="index">
          <radio style="transform: scale(0.7)" :value="String(index)" :checked="index === currentIndex" color="#32B48F" />	

          <view class="address_info_wrap ml30">
            <view class="flex">
              <view class="user_name">{{item.address_realname}}</view>
              <view class="ml40">{{item.address_mob_phone}}</view>
            </view>

            <view class="fs24 s_fc_13">{{item.area_info}}{{item.address_detail}}</view>
          </view>

          <view class="other-info" @tap.stop="go(item)">
            <image class="i_edit " :src="'../../../static/my/edit.png'" mode=""></image>
          </view>
      </view>
    </radio-group>
	</view>
</template>

<script>
  import userApi from '@/api/user';

	export default {
		data() {
			return {
        addressList: [],
        currentIndex: -1,

				type: ""
			}
		},
		methods: {
      radioChange(e) {
        console.log(e); 
      },

			go(item) {
        let url = `/pages/my/address/detail`;

        if(item){
          uni.setStorageSync("address", item);
          url = `/pages/my/address/edit`;
        }

				uni.navigateTo({ url, });
      },

			//获取地址列表
			async getAddressList() {
        uni.showLoading({ title: "加载中", mask: true });

				let res = await userApi.getAddressList();
        uni.hideLoading();
        if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取地址信息失败!', icon: 'none', });

				if (res.status === 0) {
          res.data.forEach((v, i) => { if(v.address_is_default == 1) this.currentIndex = i; });
					this.addressList = res.data;
				}
      },

			choose(item) {
				if (this.type == "submitOrder") {
					uni.setStorageSync("return_address", item);
					uni.navigateBack();
				}
			},
    },

		onLoad(option) {
      this.type = option.type;
    },

		onShow() {
			this.getAddressList();
    },
    
    onPullDownRefresh() {
      this.list = [];

      this.getAddressList();
      uni.stopPullDownRefresh();
    },
	}
</script>

<style>
.container {
  padding: 0 0 120rpx 0;
}

.add_btn{
  position: fixed;
  bottom: 36rpx;
  left: 30rpx;
  right: 30rpx;
  box-sizing: border-box;
  padding: 0 20rpx;
  height: 88rpx;
  font-size: 32rpx;
  line-height: 88rpx;
  border-radius: 44rpx;
  text-align: center;
  z-index: 1;
}

.address_wrap{
  padding: 24rpx 40rpx 24rpx 20rpx;
  border-bottom: 20rpx solid #F9F9F9;
}
.address_info_wrap{
  width: 560rpx;
  overflow: hidden;
}
.user_name{
  width: 300rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.i_radio .uni-radio-input{
  width: 20rpx;
  height: 20rpx;
}

.i_edit{
  flex-shrink: 0;
  width: 33rpx;
  height: 32rpx;
}

.s_fc_12{ color: #3E3F55; }
.s_fc_13{ color: #AEADB5; }

.s_bg_10{ background: #32B48F; }
</style>
