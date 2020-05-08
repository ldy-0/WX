<style scoped>
.container {
	font: 28rpx PingFangSC-Regular;
	/* height: 100vh; */
}

.row {
	line-height: 101rpx;
	margin-bottom: 1rpx;
	padding-left: 23rpx;
	background: #fff;
}

.button {
	background-color: #F86E25 !important;
}

.row .info {
	color: #333;
}

.list_height {
	height: 88rpx;
	line-height: 88rpx;
}

.setting {
	padding: 20rpx;
	background: #fff;
}

.comment {
	margin: 22rpx 0 0;
	font-size: 26rpx;
	color: #999;
}

.save {
	position: fixed;
	bottom: 36rpx;
	left: 30rpx;
	right: 30rpx;
	height: 88rpx;
	line-height: 88rpx;
	font-size: 32rpx;
	text-align: center;
	color: #fff;
	background: #32B48F;
	border-radius: 42rpx;
}

.row-flex {
	display: flex;
	align-items: center;
	border-bottom: 15rpx solid #F9F9F9;
	padding-left: 20rpx;
	background: #fff;
}

.inline {
	display: inline-block;
	flex-grow: 1;
	height: 101rpx;
	font-size: 24rpx;
	color: #000;
}

.info-text {
	height: 100%;
	width: 200rpx;
	font-family: "PingFang SC";
}

.fiexdW {
	width: 86rpx;
	overflow: hidden;
}

.placeholder {
	font-size: 24rpx;
	color: #BDBDBD
}

.area_wrap{
	flex: 1;
	height: 88rpx;
	white-space: nowrap;
	overflow: hidden; 
}

.s_fc_10{ color: #47485D; }
.s_fc_12{ color: #3E3F55; }
</style>
<template>
	<view class="container page_wrap s_fc_12 s_bg_f">
		<form @submit="submit">
			<view class="row-flex">
				<text class="info-text">收货人姓名</text>
				<input type="text" name="name" class="inline" @input="setConsignee" :value="address.address_realname" placeholder="请填写真实姓名" placeholder-class="placeholder">
			</view>

			<view class="row-flex">
				<text class="info-text">联系电话</text>
				<input type="text" name="phone" class="inline" @input="setPhone" :value="address.address_mob_phone" placeholder="请填写收货人手机号" placeholder-class="placeholder">
			</view>

			<view class="row-flex">
				<view class="info-text">所在地区</view>
				<view class="area_wrap fs24 flex" :class="[areaInfo == '省、市、区' ? 'placeholder' : 's_fc_0']" @tap="openPicker">{{areaInfo}}</view>

				<uni-icons class="mr40" type="arrowright" color="#000" size="16" />
			</view>

			<view class="row-flex">
				<text class="info-text">详细地址</text>
				<input type="text" name="detail" class="inline" @input="setStreet" :value="address.address_detail" placeholder="街道、楼牌号等" placeholder-class="placeholder">
			</view>

			<view class="setting flex s_fc_10">
        <radio style="transform: scale(0.7)" :checked="address.isDefault" color="#32B48F" @tap="changeDefault" />	
        <view class="ml20 fs24">设为默认地址</view>
			</view>

			<button class="save" type="#32B48F" form-type="submit">保存</button>
		</form>

		<region v-show="visible" @cancel="closePicker" @confirm="setArea"></region>
		
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import area from '@/components/common/area.vue'
  import userApi from '@/api/user';

	export default {
    components: {
			uniIcons,
			region: area,
    },

		data() {
			return {
				isClick: false,

				province: null,
				city: null,
				area: null,
				//
				address: {},
				// 是否是第一个地址
				addressType: null,
				visible:false,
			}
		},

		computed: {
			areaInfo(){ return this.province ? `${this.province.area_name}${this.city.area_name}${this.area.area_name}` : '省、市、区'; },
		},
		
		methods: {
      changeDefault() {
        this.address.isDefault = !this.address.isDefault;
      },
      
			setArea(arr){
				this.visible = false;
        [this.province, this.city, this.area] = arr;
			},
			openPicker(){ this.visible = true; },
			closePicker(){ this.visible = false; },

			setConsignee(e){ this.address.address_realname = e.detail.value },
			setPhone(e){ this.address.address_mob_phone = e.detail.value },
			setStreet(e){ this.address.address_detail = e.detail.value },

			submit(e) {
				let v = e.detail.value,
				  param,
					phone = /^[1-9]\d{10}$/,
					noEmpty = /^\S+$/;

				if(!noEmpty.test(v.name)) return uni.showToast({ title: "姓名不能为空!", icon: "none", duration: 1000 });

				if(!phone.test(v.phone)) return uni.showToast({ title: "手机号格式不正确!", icon: "none", duration: 1000 });

				if(!this.city) return uni.showToast({ title: "请选择所在地区!", icon: "none", duration: 1000 });

				if(!noEmpty.test(v.detail)) return uni.showToast({ title: "请完善详细地址!", icon: "none", duration: 1000 });

				if(this.isClick) return ;
				this.isClick = true;

				param = {
					address_realname: v.name,
					address_tel_phone: v.phone,
					address_mob_phone: v.phone,
					province_id: this.province.area_id,
					city_id: this.city.area_id,
					area_id: this.area.area_id,
					area_info: this.areaInfo,
					address_detail: v.detail,
					address_is_default: this.address.isDefault ? 1 : 0
				};

        this.save(param);
			},

			async save(param) {
        uni.showLoading({ title:'Loading', mask:true })

				const res = await userApi.setAddress(this.address.address_id, param);
        uni.hideLoading();
        if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '保存地址失败!', icon: 'none', }), this.isClick = false;

				if (res.status === 0) {
					uni.showToast({ title: '修改成功!', duration: 1000 });
					setTimeout(() => { uni.navigateBack(); }, 500)
				}
			},

			async del(id) {
				uni.showLoading({ title:'Loading', mask:true })

				if(this.isClick) return;
				this.isClick = true;

				let res = await userApi.deleteAddress(id);
        uni.hideLoading();
        if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '删除地址失败!', icon: 'none', }), this.isClick = false;

				if (res.status === 0) {
					uni.showToast({ title: '删除成功!', duration: 1000 });
					setTimeout(() => { uni.navigateBack(); }, 500)
				}
      },
			
		},
		onLoad(opt) {
			let address = uni.getStorageSync("address");

			if (address) {
				address.id = address.address_id;
				address.isDefault = address.address_is_default == 1 ? true : false;
				this.address = address;
				this.province = { area_id: address.province_id, area_name: address.area_info, };
				this.city = { area_id: address.city_id, area_name: '', };
				this.area = { area_id: address.area_id, area_name: '', };
        
        uni.removeStorageSync('address');
        uni.setNavigationBarTitle({ title: '编辑收货地址' });
			}

		},

    onNavigationBarButtonTap(e) {
				uni.showModal({
					content: "确认删除该地址吗？",
					success: res => {
						if(res.confirm) this.del(this.address.address_id);
					}
				});
		},
		onShow() {},

	}
</script>