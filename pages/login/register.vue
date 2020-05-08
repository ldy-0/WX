<style scoped>
.container {
  font: 28rpx PingFangSC-Semibold, PingFang SC;
  min-height: 100vh;
}

.register_title_wrap{
  padding: 40rpx 70rpx 10rpx 70rpx;
}
.register_form_wrap{
  padding: 0 70rpx 40rpx;
}
.form_input_wrap{
	padding: 0 0 30rpx;
  border-bottom: 1rpx solid #F5F5F5;
}
.form_title{
	flex-shrink: 0;
  position: relative;
	font-size: 30rpx;
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
  margin: 0 0 0 10rpx;
	font-size: 24rpx;
	color: #000;
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
</style>

<template>
	<view class="container s_fc_12 s_bg_f">
    <view class="register_title_wrap">
      <view class="fs40 bold s_fc_13">请填写以下注册信息</view>
      <view class="fs28 s_fc_11">建议您提交的信息以最新为标准</view>
    </view>

		<view class="register_form_wrap s_fc_14">
			<view class="form_input_wrap flex mt80">
				<view class="form_title form_require">姓名：</view>
				<input type="text" class="form_input" @input="setName" :value="name" placeholder="请输入您的姓名" placeholder-class="placeholder">
			</view>

      <view class="form_input_wrap flex mt80">
				<view class="form_title form_require">手机号：</view>
				<input type="number" class="form_input" @input="setMobile" :value="mobile" placeholder="请输入您的手机号" placeholder-class="placeholder">
			</view>

      <view class="form_input_wrap flex mt80">
				<view class="form_title form_require">验证码：</view>
				<input type="text" class="form_input" @input="setCaptcha" :value="captcha" placeholder="请输入您的验证码" placeholder-class="placeholder">
        <view class="captcha_btn fs24" @tap="startCountdown">{{smsText}}</view>
			</view>

      <view class="form_input_wrap flex mt80">
				<view class="form_title form_require">药房名称：</view>
				<input type="text" class="form_input" @input="setCompanyName" :value="companyName" placeholder="请输入您的药房名称" placeholder-class="placeholder">
			</view>

			<view class="flex mt80">
				<view class="form_title form_require">所在地区：</view>
				<view class="area_wrap flex" @tap="handlePicker" :class="[ area == '省、市、区' ? 'placeholder' : 's_fc_0' ]">{{area}}</view>

				<uni-icons class="" type="arrowright" color="#000" size="16" />
			</view>

      <view class="form_input_wrap flex mt80">
				<view class="form_title form_require">收货地址：</view>
				<input type="text" class="form_input" @input="setAddress" :value="address" placeholder="请输入您的收货地址" placeholder-class="placeholder">
			</view>

      <view class="form_input_wrap form_upload_wrap flex mt20">
				<view class="form_title form_upload_title form_require">营业执照：</view>

        <upload class="form_upload" :config="licenseConfig" @success="setLicense"></upload>
			</view>

      <view class="form_input_wrap form_upload_wrap flex mt20">
				<view class="form_title form_upload_title">食品经营许可证：</view>

        <upload class="form_upload" :config="foodConfig" @success="setFood"></upload>
			</view>

      <view class="form_input_wrap form_upload_wrap flex mt20">
				<view class="form_title form_upload_title">二类医疗器械备案证：</view>

        <upload class="form_upload" :config="medicalConfig" @success="setMedical"></upload>
			</view>

			<view class="save mt150" @tap="submit">提交注册</view>
		</view>

		<view v-if="visible" class="scroll-warpper">
			<view class="btn-warpper">
        <view style="" @tap="handleCancelPicker">取消</view>
        <view style="color: #0F3066;" @tap="setArea">确定</view>
			</view>

			<picker-view  class="picker-warpper" indicator-style="height: 88rpx;line-height:88rpx" :value="value" @change="changeArea">
				<picker-view-column>
					<view style="height: 88rpx;line-height: 88rpx;text-align: center;" v-for="(item,index) in arrayProvince" :key="index">{{item.area_name}}</view>
				</picker-view-column>
				<picker-view-column>
					<view style="height: 88rpx;line-height: 88rpx;text-align: center;" v-for="(item,index) in arrayCity" :key="index">{{item.area_name}}</view>
				</picker-view-column>
				<picker-view-column>
					<view style="height: 88rpx;line-height: 88rpx;text-align: center;" v-for="(item,index) in arrayDistrict" :key="index">{{item.area_name}}</view>
				</picker-view-column>
			</picker-view>
		</view>
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue'
import upload from '@/components/upload/index.vue'
import api from '@/api/api';
import userApi from '@/api/user';
import * as gd from '@/common/global';
import uploadUtil from '@/common/upload';

export default {
	components: {
		upload,
		uniIcons,
	},

	data() {
		return {
			name: '',
			mobile: '',
			captcha: '',
			companyName: '',
			address: '',
			licenseList: [],
			licenseConfig: {
				limit: 1,
			},
			foodList: [],
			foodConfig: {
				limit: 1,
			},
			medicalList: [],
			medicalConfig: {
				limit: 1,
			},

			//地址选择
			arrayProvince: [],
			arrayCity: [],
			arrayDistrict: [],
			value:[0,0,0],
			province: "",
			city: "",
			district: "",
			areaid: null,
			visible:false,
			provinceIndex: 0,
			cityIndex: 0,
			areaIndex: 0,

			countdown: 60,
			interval: null,

			doing: false,
		}
	},

	computed: {
		smsText(){ return this.interval ? this.countdown : '获取验证码'; },
		area(){ return this.province ? `${this.province.area_name}${this.city.area_name}${this.district.area_name}` : '省、市、区'; },
	},

	watch:{
	},

	methods: {
		startCountdown() {
			if(!/^[1-9]\d{10}$/.test(this.mobile)) return uni.showToast({ title: '手机号未填写或填写不正确!', icon: 'none', });

			if(this.interval) return ;
			this.interval = setInterval(() => this.countdown <= 0 ? this.clearCountdown() : this.countdown--, 1000);

			this.getSms();
		},
		
		clearCountdown() {
			clearInterval(this.interval);
			this.interval = null;
			this.countdown = 60;
		},

		async getSms() {
			let res = await api.getSms({ mobile: this.mobile, type: gd.SMS_REGISTER, });
			uni.hideLoading();
			if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取短信验证码信息失败!', icon: 'none', });

			if(res.status == 0){
			}
		},

		handlePicker(){ this.visible = true; },
		handleCancelPicker(){ this.visible = false; },

		setArea() {
			uni.showLoading({ title:'Loading', mask:true })

			this.visible = false;
			this.province = this.arrayProvince[this.provinceIndex];
			this.city = this.arrayCity[this.cityIndex];

			if(this.arrayDistrict.length > 0){
				this.areaid = this.arrayDistrict[this.areaIndex].area_id;
				this.district = this.arrayDistrict[this.areaIndex];
			}else{
				this.areaid = this.arrayCity[this.cityIndex].area_id;
				this.district = {};
			}

			uni.hideLoading()
		},

		changeArea(e) {
			let arr = e.detail.value;

			if(this.provinceIndex == arr[0]){
				if(this.cityIndex == arr[1]) return this.areaIndex = arr[2];

				this.cityIndex = arr[1];
				this.areaIndex = 0;
				this.value = [this.provinceIndex, this.cityIndex, this.areaIndex];
				return this.getDistrict(this.arrayCity[this.cityIndex].area_id);
			}

			this.provinceIndex = arr[0];
			this.cityIndex = this.areaIndex = 0;
			this.value = [this.provinceIndex, this.cityIndex, this.areaIndex];
			this.getCity(this.arrayProvince[this.provinceIndex].area_id);
		},

		setName(e){ this.name = e.detail.value; },
		setMobile(e){ this.mobile = e.detail.value },
		setCompanyName(e){ this.companyName = e.detail.value },
		setCaptcha(e){ this.captcha = e.detail.value; },
		setAddress(e){ this.address = e.detail.value; },
		setLicense(e){ this.licenseList = e; },
		setFood(e){ this.foodList = e; },
		setMedical(e){ this.medicalList = e; },

		async submit(e) {
			let param = {},
			  licenseImg, foodImg, medicalImg,
				phone = /^[1-9]\d{10}$/,
				notEmpty = /^\S+$/;

			if (!notEmpty.test(this.name)) return uni.showToast({ title: "姓名不能为空!", icon: "none", duration: 1000 });

			if (!phone.test(this.mobile)) return uni.showToast({ title: "手机号未填写或填写不正确!", icon: "none", duration: 1000 });

			if (!notEmpty.test(this.captcha)) return uni.showToast({ title: "验证码不能为空!", icon: "none", duration: 1000 });

			if (!notEmpty.test(this.companyName)) return uni.showToast({ title: "药房名称不能为空!", icon: "none", duration: 1000 });

			if (!this.city) return uni.showToast({ title: "请选择所在地区!", icon: "none", duration: 1000 });

			if (!notEmpty.test(this.address)) return uni.showToast({ title: "收货地址不能为空!", icon: "none", duration: 1000 });

			if (!this.licenseList.length) return uni.showToast({ title: "营业执照不能为空!", icon: "none", duration: 1000 });	

			let res = await uploadUtil.uploadImg(this.licenseList[0]);
			if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '上传图片失败!', icon: 'none', });

			if(res.cdnUrl) licenseImg = res.cdnUrl;
			// licenseImg = 'https://blkx-1302950457.file.myqcloud.com/%E5%88%87%E5%9B%BE%402x%2818%29.png';

			param = {
				name: this.name,
				phone: this.mobile,
				code: this.captcha,
				pharmacy_name: this.companyName,
				province_id: this.province.area_id,
				city_id: this.city.area_id,
				region_id: this.district.area_id,
				address: this.area,
				address_detail: this.address,
				business_licence: licenseImg,
			};
			
			if(this.foodList.length){
				res = await uploadUtil.uploadImg(this.foodList[0]);
				if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '上传图片失败!', icon: 'none', });

				if(res.cdnUrl) param.food_permit = res.cdnUrl;
			}

			if(this.medicalList.length){
				res = await uploadUtil.uploadImg(this.medicalList[0]);
				if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '上传图片失败!', icon: 'none', });

				if(res.cdnUrl) param.record_certificate = res.cdnUrl;
			}

			if(this.doing) return ;
			this.doing = true;
			
			this.save(param);
		},

		async save(param) {
			uni.showLoading({ title:'Loading', mask:true })

			let res = await userApi.register(param);
			if (res && res.status === 0) {
				uni.showToast({ title: '提交成功!', duration: 1000 });
				return uni.navigateBack();
			}

			uni.hideLoading(this.doing = false);
			uni.showToast({ title: res ? res.error || res : '提交失败!', icon: 'none', });
		},

		async getProvince() {
			const res = await api.getFreeArea(0);
			uni.hideLoading();
			if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取省份信息失败!', icon: 'none', });

			if(res.status==0){
				this.arrayProvince = res.data;
				this.getCity(res.data[0].area_id);
			}
		},

		async getCity(pid) {
			const res = await api.getFreeArea(pid);
			uni.hideLoading();
			if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取城市信息失败!', icon: 'none', });

			if(res.status==0){
				this.arrayCity = res.data;
				this.getDistrict(this.cid = this.arrayCity[0].area_id);
			}
		},

		async getDistrict(cid) {
			const res = await api.getFreeArea(cid);
			uni.hideLoading();
			if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取区域信息失败!', icon: 'none', });

			if(res.status==0){
				this.arrayDistrict = res.data;
			}
		},

	},
	onLoad(opt) {
		this.getProvince();
	},
	onShow() {},

}
</script>