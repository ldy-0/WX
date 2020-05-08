<template>
	<view class="scroll-warpper">
		<view class="btn-warpper">
			<view style="" @tap="cancel">取消</view>
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
</template>

<script>
import api from '@/api/api';
import * as gd from '@/common/global';
import upload from '@/common/upload';

export default {
	props: {
		config: Array,
	},
	
	data() {
		return {
			imgList: [],
			fileList: [],

			value:[0,0,0],
			arrayProvince: [],
			arrayCity: [],
			arrayDistrict: [],
			provinceIndex: 0,
			cityIndex: 0,
			areaIndex: 0,
			province: null,
			city: null,
			district: null,

			cos: null,
		};
	},
	
	computed: {
	},
	
	methods: {
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

		setArea() {
			uni.showLoading({ title: 'Loading', mask: true })

			this.province = this.arrayProvince[this.provinceIndex];
			this.city = this.arrayCity[this.cityIndex];

			if(this.arrayDistrict.length > 0){
				this.district = this.arrayDistrict[this.areaIndex];
			}else{
				this.district = {};
			}

			uni.hideLoading()
      this.$emit('confirm', [this.province, this.city, this.district]);
		},

		cancel(){ this.$emit('cancel'); },

		//地址查询
		async getProvince() {
			const res = await api.getArea({ level: 1 });
			uni.hideLoading();
			if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取省份信息失败!', icon: 'none', });

				if(res.status==0){
					this.arrayProvince = Object.keys(res.data).map(k => ({ area_id: Number(k), area_name: res.data[k], }));
					this.getCity(this.arrayProvince[0].area_id);
				}
		},

		async getCity(pid) {
			const res = await api.getArea({ level: 2, parentId: pid });
			uni.hideLoading();
			if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取城市信息失败!', icon: 'none', });

			if(res.status==0){
				this.arrayCity = res.data;
				this.cid = this.arrayCity[0].area_id;
				this.getDistrict(this.cid);
			}
		},

		async getDistrict(cid) {
			const res = await api.getArea({ level: 3, parentId: cid });
			uni.hideLoading();
			if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取区域信息失败!', icon: 'none', });

			if(res.status==0){
				this.arrayDistrict = res.data;
			}
		},
		
		emit(param, e) {
			this.$emit('emit', param);
		},
		
	},

  created() {
		this.getProvince();
	},

	updated() {
		console.log('mo');
	}

}
</script>

<style>
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
</style>
