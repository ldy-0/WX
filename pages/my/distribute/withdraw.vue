<style scoped>
.container {
  font: 28rpx "PingFang SC";
  min-height: 100vh;
}

.withdraw_title_wrap{
  padding: 80rpx 82rpx 10rpx 74rpx;
}
.withdraw_form_wrap{
  padding: 0 70rpx 40rpx;
}
.form_input_wrap{
  padding: 0 0 28rpx 0;
  border-bottom: 1rpx solid #E5E5E5;
}
.form_title{
  position: relative;
  height: 100%;
  font-size: 32rpx;
  line-height: 1.3;
}
.form_require::before{
  content: '*'; 
  position: absolute;
  top: -12rpx;
  left: -20rpx;
  font-size: 40rpx;
  color: #EB3F36;
}
.form_input{
  flex-grow: 1;
  height: 100%;
  margin: 0 0 0 16rpx;
  font-size: 24rpx;
}
.placeholder {
  font-size: 28rpx;
  color: rgba(89, 90, 109, 0.4); 
}

.form_upload_wrap{
  height: 210rpx;
}
.form_upload_title{
  width: 320rpx;
  line-height: 210rpx;
}
.form_upload{
  flex-grow: 1;
}

.captcha_btn{
  width: 160rpx;
  height: 62rpx;
  line-height: 62rpx;
  border-radius: 31rpx;
  border: 2rpx solid rgba(230, 230, 230, 1);
  text-align: center;
}

.i_account{
  position: relative;
  top: 16rpx;
  width: 48rpx;
  height: 48rpx;
}
.i_pwd{
  position: relative;
  top: 18rpx;
  width: 36rpx;
  height: 44rpx;
}
.save {
  position: fixed;
  bottom: 88rpx;
  left: 60rpx;
  right: 60rpx;
  height: 88rpx;
  line-height: 88rpx;
  font-size: 32rpx;
  text-align: center;
  color: #fff;
  background: #32B48F;
  border-radius: 42rpx;
}

	.picker-warpper{
		position: absolute;
		bottom: 0;
		height: 350rpx;
		width: 100%;
		background-color: #FFFFFF;
	}
	.scroll-warpper{
		position: fixed;
		bottom: 0rpx;
		z-index: 999;
		height: 438rpx;
		width: 100%;
		background-color: #FFFFFF;
	}

	.cityup {
		width: 26rpx;
		height: 16rpx;
		margin: 42rpx;
	}

	.list_height {
		height: 88rpx;
		line-height: 88rpx;
	}

	.setting {
		padding: 20rpx;
		background: #fff;
	}

	.picker-group {
		display: flex;
	}

	.picker-view {
		font-size: 28rpx;
	}

	.picker-column>view{
		display: flex;
		align-items: center;
	}
	.btn-warpper{
		height: 88rpx;
		width: 100%;
		background-color: #F9F9F9;
		display: flex;
		padding: 0 50rpx;
		box-sizing: border-box;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
	}
	.btn-warpper>view{
		width:88rpx;height: 88rpx;line-height: 88rpx;text-align: center;
	}

.area_wrap{
  flex: 1;
  height: 88rpx;
  white-space: nowrap;
  overflow: hidden; 
}

.s_fc_10{ color: #32B48F; }
.s_fc_11{ color:rgba(89,90,109,0.64); }
.s_fc_12{ color: #3E3F55; }
.s_fc_13{ color: #55C6AD; }
.s_fc_14{ color: #595A6D; }
</style>
<style>
.upload_wrap .upload_box{
  width: 100rpx;
}
</style>

<template>
	<view class="container s_fc_12 s_bg_f">
    <view class="withdraw_title_wrap">
      <view class="fs40 bold s_fc_13">请填写以下申请信息</view>
      <view class="s_fc_11">根据提示填写信息，即可完成提现申请</view>
    </view>

		<view class="withdraw_form_wrap s_fc_14">
      <view class="form_input_wrap flex mt60">
				<view class="form_title">手机号：</view>
				<input type="number" class="form_input" @input="setMobile" :value="mobile" placeholder="请输入您的手机号" placeholder-class="placeholder">
			</view>

      <view class="form_input_wrap flex mt60">
				<view class="form_title">提现金额：</view>
				<input type="digit" class="form_input" @input="setAmount" :value="amount" placeholder="请输入提现金额" placeholder-class="placeholder">
			</view>

      <view class="form_input_wrap flex mt60">
				<view class="form_title">银行卡号：</view>
				<input type="text" class="form_input" @input="setBankNo" :value="bankNo" placeholder="请输入您的银行卡号" placeholder-class="placeholder">
			</view>

      <view class="form_input_wrap flex mt60">
				<view class="form_title">持卡人姓名：</view>
				<input type="text" class="form_input" @input="setBankUser" :value="bankUser" placeholder="请输入您的银行卡开户姓名" placeholder-class="placeholder">
			</view>

      <view class="form_input_wrap flex mt60">
				<view class="form_title">开户行：</view>
				<input type="text" class="form_input" @input="setBank" :value="bank" placeholder="请输入您的开户行" placeholder-class="placeholder">
			</view>

			<view class="save" @tap="submit">提交申请</view>
		</view>

	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import upload from '@/components/upload/index.vue'
  import distributeApi from '@/api/distribute';

	export default {
    components: {
      upload,
      uniIcons,      
    },

		data() {
			return {
        mobile: '',
        amount: '',
        bankNo: '',
        bankUser: '',
        bank: '',

        limit: 10,

				doing: false,
			};
		},
		methods: {

			setMobile(e){ this.mobile = e.detail.value },
			setAmount(e){ this.amount = e.detail.value },
			setBankNo(e){ this.bankNo = e.detail.value },
			setBankUser(e){ this.bankUser = e.detail.value },
      setBank(e){ this.bank = e.detail.value },

			submit(e) {
				let param = {},
					phone = /^[1-9]\d{10}$/,
          notEmpty = /^\S+$/;

        if (!phone.test(this.mobile)) return uni.showToast({ title: "手机号未填写或填写不正确!", icon: "none", duration: 1000 });

        if (!(notEmpty.test(this.amount) && this.amount > 0)) return uni.showToast({ title: "提现金额未填写或填写不正确!", icon: "none", duration: 1000 });

        if (!notEmpty.test(this.bankNo)) return uni.showToast({ title: "银行卡号不能为空!", icon: "none", duration: 1000 });

        if (!notEmpty.test(this.bankUser)) return uni.showToast({ title: "持卡人姓名不能为空!", icon: "none", duration: 1000 });

        if (!notEmpty.test(this.bank)) return uni.showToast({ title: "开户行不能为空!", icon: "none", duration: 1000 });

        if(this.doing) return ;
        this.doing = true;

        param = {
          member_mobile: this.mobile,
          account: this.bankNo,
          money: this.amount,
          name: this.bankUser,
          branch: this.bank,
        };
				
        this.save(param);
      },

			async save(param) {
        uni.showLoading({ title:'Loading', mask: true })

        const res = await distributeApi.withdraw(param);

        if(res && res.status === 0){
					uni.showToast({ title: '提交成功', duration: 1000 });
					return setTimeout(() => { uni.navigateBack(); }, 500)
        }

        uni.hideLoading(this.doing = false);
        uni.showToast({ title: res ? res.error || res : '提交失败!', icon: 'none', });
			},

    },

		onLoad(opt) {

    },

		onShow() {},

	}
</script>