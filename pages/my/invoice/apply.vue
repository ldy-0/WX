<style scoped>
.container {
  font: 28rpx PingFangSC-Regular, "PingFang SC";
  min-height: 100vh;
}

.register_title_wrap{
  padding: 80rpx 70rpx 10rpx 70rpx;
}
.register_form_wrap{
  padding: 0 70rpx 40rpx;
}
.form_input_wrap{
	padding: 0 0 30rpx;
  border-bottom: 1rpx solid #F5F5F5;
}
.form_title{
  position: relative;
  height: 100%;
  line-height: 1.3;
	font-size: 32rpx;
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
  margin: 0 0 0 20rpx;
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
  height: 88rpx;
  line-height: 88rpx;
  font-size: 32rpx;
  text-align: center;
  color: #fff;
  background: #32B48F;
  border-radius: 42rpx;
  box-shadow:2px 6px 12px -2px rgba(207,251,234,1);
}
	
.list_height {
	height: 88rpx;
	line-height: 88rpx;
}

.setting {
	padding: 20rpx;
	background: #fff;
}

.area_wrap{
  flex: 1;
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
    <view class="register_title_wrap">
      <view class="fs40 bold s_fc_13">请填写以下申请发票信息</view>
      <view class="fs28 s_fc_11">根据提示填写信息，确保信息完整无误</view>
    </view>

		<view class="register_form_wrap s_fc_14">
			<view class="form_input_wrap flex mt60">
				<view class="form_title">公司名称：</view>
				<input type="text" class="form_input" @input="setCompanyName" :value="companyName" placeholder="请输入您的公司名称" placeholder-class="placeholder">
			</view>

      <view class="form_input_wrap flex mt60">
				<view class="form_title">开户行：</view>
				<input type="text" class="form_input" @input="setBank" :value="bank" placeholder="请输入开户行名称" placeholder-class="placeholder">
			</view>

      <view class="form_input_wrap flex mt60">
				<view class="form_title">公司税号：</view>
				<input type="text" class="form_input" @input="setTax" :value="tax" placeholder="请输入您的公司税号" placeholder-class="placeholder">
			</view>

			<view class="form_input_wrap flex mt60">
				<view class="form_title">开户账号：</view>
				<input type="text" class="form_input" @input="setBankNo" :value="bankNo" placeholder="请输入您的开户行帐号" placeholder-class="placeholder">
			</view>

			<view class="form_input_wrap flex mt60">
				<view class="form_title">所在地区：</view>
				<view class="area_wrap ml20 fs24 flex" :class="[province ? 's_fc_14' : 'placeholder']" @tap="openPicker">{{areaInfo}}</view>

				<uni-icons class="" type="arrowright" color="#000" size="16" />
			</view>

      <view class="form_input_wrap flex mt60">
				<view class="form_title">详细地址：</view>
				<input type="text" class="form_input" @input="setAddress" :value="address" placeholder="请输入您的详细地址" placeholder-class="placeholder">
			</view>

			<view class="form_input_wrap flex mt60">
				<view class="form_title">姓名：</view>
				<input type="text" class="form_input" @input="setName" :value="name" placeholder="请输入您的姓名" placeholder-class="placeholder">
			</view>

			<view class="form_input_wrap flex mt60">
				<view class="form_title">电话：</view>
				<input type="number" class="form_input" @input="setMobile" :value="mobile" placeholder="请输入您的电话" placeholder-class="placeholder">
			</view>

      <!-- <view class="form_input_wrap form_upload_wrap flex mt20">
				<view class="form_title form_upload_title form_require">营业执照：</view>

        <upload class="form_upload" :config="licenseConfig" @success="setLicense"></upload>
			</view> -->

			<view class="save mt80" @tap="submit">提交申请</view>
		</view>

		<region v-show="visible" @cancel="closePicker" @confirm="setArea"></region>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import upload from '@/components/upload/index.vue'
	import area from '@/components/common/area.vue'
  import orderApi from '@/api/order';

	export default {
    components: {
      upload,
			region: area,
      uniIcons,      
    },

		data() {
			return {
				pay_sn: '',

				name: '',
				companyName: '',
        mobile: '',
        tax: '',
				bank: '',
        bankNo: '',
        address: '',
        licenseList: [],
        licenseConfig: {
          limit: 1,
				},
				
				visible: false,

				doing: false,

				province: null,
				city: null,
				district: null,
			}
		},

		computed: {
			areaInfo(){ return this.province ? `${this.province.area_name}${this.city.area_name}${this.area.area_name}` : '省、市、区'; },
		},

		methods: {
			openPicker(){ this.visible = true; },
			closePicker(){ this.visible = false; },
			setArea(arr){
				this.visible = false;
        [this.province, this.city, this.area] = arr;
			},

			setName(e){ this.name = e.detail.value; },
			setCompanyName(e){ this.companyName = e.detail.value; },
			setMobile(e){ this.mobile = e.detail.value },
			setBank(e){ this.bank = e.detail.value; },
			setBankNo(e){ this.bankNo = e.detail.value },
			setTax(e){ this.tax = e.detail.value; },
      setAddress(e){ this.address = e.detail.value; },

			submit(e) {
				let param = {},
					phone = /^[1-9]\d{10}$/,
					notEmpty = /^\S+$/;
					
				if(!this.pay_sn) return uni.showToast({ title: "pay_sn不能为空!", icon: "none", duration: 1000 });

        if (!notEmpty.test(this.companyName)) return uni.showToast({ title: "公司姓名不能为空!", icon: "none", duration: 1000 });

        if (!notEmpty.test(this.bank)) return uni.showToast({ title: "开户行不能为空!", icon: "none", duration: 1000 });

        if (!notEmpty.test(this.tax)) return uni.showToast({ title: "公司税号不能为空!", icon: "none", duration: 1000 });

        if (!notEmpty.test(this.bankNo)) return uni.showToast({ title: "开户账号不能为空!", icon: "none", duration: 1000 });

        if (!this.city) return uni.showToast({ title: "请选择所在地区!", icon: "none", duration: 1000 });

				if (!notEmpty.test(this.address)) return uni.showToast({ title: "详细地址不能为空!", icon: "none", duration: 1000 });

        if (!notEmpty.test(this.name)) return uni.showToast({ title: "姓名不能为空!", icon: "none", duration: 1000 });

				if (!phone.test(this.mobile)) return uni.showToast({ title: "手机号未填写或填写不正确!", icon: "none", duration: 1000 });
				
				if(this.doing) return ;
				this.doing = true;

        param = {
					pay_sn: this.pay_sn,
					invoice_company: this.companyName,
					invoice_reg_bname: this.bank,
					invoice_company_code: this.tax,
					invoice_reg_baccount: this.bankNo,
					invoice_rec_province: this.areaInfo,
					invoice_goto_addr: this.address,
					invoice_rec_name: this.name,
					invoice_rec_mobphone: this.mobile,
        };
				
				this.save(param);
      },

			async save(param) {
        uni.showLoading({ title:'Loading', mask: true })

				const res = await orderApi.applyInvoice(param);

				if(res && res.status === 0) {
					return uni.showModal({ content: '申请成功!', showCancel: false, success(e){ if(e.confirm) uni.navigateBack(); } });
				}

        uni.hideLoading(this.doing = false);
        return uni.showToast({ title: res ? res.error || res : '申请失败!', icon: 'none', });
			},

		},

		onLoad(opt){
			this.pay_sn = opt.sn;
		},
		onShow(){},

	}
</script>