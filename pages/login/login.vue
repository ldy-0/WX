<style scoped>
.bg_img{
  display: block;
  width: 100%;
  height: 580rpx;
}

.login_dialog_wrap{
  position: fixed;
  top: 400rpx;
  left: 56rpx;
  right: 56rpx;
  padding: 50rpx 70rpx 70rpx;
  border-radius: 12rpx;
	box-shadow: 0px 4px 13px -2px rgba(76, 188, 161, 0.47);	
}
.login_dialog_title{
  font-size: 40rpx;
}
.form_input_wrap{
  height: 80rpx;
  border-bottom: 1rpx solid #F5F5F5;
}
.form_title{
  height: 100%;
  width: 100rpx;
  font-weight: 500
}
.form_input{
  flex-grow: 1;
  height: 100%;
  font-size: 24rpx;
  color: #000;
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
  width: 46rpx;
  height: 44rpx;
}
.save {
  height: 88rpx;
  line-height: 88rpx;
  font-size: 32rpx;
  text-align: center;
  color: #fff;
  background: #32B48F;
  border-radius: 42rpx;
  box-shadow:2px 6px 12px -2px rgba(207,251,234,1);
}

.container {
	font: 28rpx PingFangSC-Semibold, PingFang SC;;
	height: 100vh;
}

.placeholder {
	font-size: 28rpx;
	color: rgba(89, 90, 109, 0.65);
}

.s_fc_10{ color: #32B48F; }
.s_fc_11{ color: #9596A2; }
.s_fc_12{ color: #3E3F55; }
</style>
<template>
	<view class="container s_fc_12 s_bg_f">
    <view class="">
      <image class="bg_img" src="../../static/login/bg.png" mode=""></image>
    </view>

		<view class="login_dialog_wrap s_bg_f">
      <view class="login_dialog_title bold s_fc_10">你好，欢迎登陆博伦科欣！</view>

			<view class="form_input_wrap flex mt80">
				<view class="form_title">
          <image class="i_account" src="../../static/login/account.png" mode=""></image>
        </view>
				<input type="text" class="form_input" @input="setAccount" :value="account" placeholder="请输入您的账号" placeholder-class="placeholder">
			</view>

      <view class="form_input_wrap flex mt80">
				<view class="form_title">
          <image class="i_pwd" src="../../static/login/pwd.png" mode=""></image>
        </view>
				<input type="password" class="form_input" @input="setPwd" :value="pwd" placeholder="请输入您的密码" placeholder-class="placeholder">
			</view>

			<view class="save bold mt70" @tap="submit">立即登陆</view>

      <view class="between mt20">
        <view class="fs24 s_fc_10" @tap="go('register')">立即注册</view>
        <view class="fs24 s_fc_11" @tap="go('pwd')">忘记密码</view>
      </view>
		</view>
		
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
  import userApi from '@/api/user';

	export default {
    components: {
      uniIcons,      
    },

		data() {
			return {
        account: '',
        pwd: '',

        doing: false,
			}
		},
		watch:{
    },

		methods: {
			setAccount(e){ this.account = e.detail.value; },
			setPwd(e){ this.pwd = e.detail.value },

      go(type) {
        uni.navigateTo({ url: `/pages/login/${type}`, });
      },

			submit(e) {
				let param = {},
					phone = /^[1-9]\d{10}$/,
          notEmpty = /^\S+$/;

        if(!notEmpty.test(this.account)) return uni.showToast({ title: "账号不能为空!", icon: "none", duration: 1000 });

        if(!notEmpty.test(this.pwd)) return uni.showToast({ title: "密码不能为空!", icon: "none", duration: 1000 });

        if(this.doing) return ;
        this.doing = true;

        param = {
          member_name: this.account,
          member_password: this.pwd,          
        };
				
        this.login(param);
      },

			async login(param) {
        uni.showLoading({ title:'Loading', mask:true })

				let res = await userApi.login(param);
        if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '登录失败!', icon: 'none', }), uni.hideLoading(this.doing = false);

				if (res.status === 0) {
          uni.setStorageSync('token', res.data.token);
					uni.switchTab({ url: `/pages/home/index`, });
				}
			},

    },

		onLoad(opt) {

    },

		onShow() {},

	}
</script>