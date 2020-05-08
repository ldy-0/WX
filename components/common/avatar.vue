<template>
	<view @tap="changeImg">
		<image class="img" :src="src" mode=""></image>
	</view>
</template>

<script>
import api from '@/api/api';
import userApi from '@/api/user';
import * as gd from '@/common/global';
import upload from '@/common/upload';

export default {
	props: {
		src: String,
	},
	
	data() {
		return {
			imgList: [],
			fileList: [],

			cos: null,
		};
	},
	
	computed: {
	},
	
	methods: {
		changeImg() {
			uni.chooseImage({ count: 1, success: this.success, fail: this.fail });
		},
		
		success(e) {
			this.imgList = e.tempFilePaths;
			this.fileList = e.tempFiles;
			this.$emit('success', this.fileList);

			this.updateAvatar(this.fileList[0]);
		},

		async updateAvatar(file) {
			uni.showLoading({ title: 'Loading', mask: true, });

			let res = await upload.uploadImg(file);
			if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '上传图片失败!', icon: 'none', });
			// let res = { Location: 'blkx-1302950457.cos.ap-nanjing.myqcloud.com/%E5%88%87%E5%9B%BE%402x%2818%29.png', };

      if(res.Location){
				res = await userApi.setInfo({ member_avatar: res.cdnUrl, });
				uni.hideLoading();
				if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '修改头像失败!', icon: 'none', });

				this.$emit('update');
			}
		},
		
		fail(e) {
			console.log('err', e);
		},

		emit(param, e) {
			this.$emit('emit', param);
		},
		
	},

  created() {
	},

}
</script>

<style>

</style>
