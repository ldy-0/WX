<style scoped>
.container {
  font-size: 28rpx;
}

.public_form_wrap{
  padding: 0 82rpx 0 74rpx;
}
.form_input_wrap{
  padding: 60rpx 0 28rpx;
  border-bottom: 2rpx solid #E5E5E5;
}
.form_img_wrap{
  padding: 38rpx 0 28rpx;
  border-bottom: 2rpx solid #E5E5E5;
}
.form_title{
  position: relative;
  height: 100%;
  width: 140rpx;
  font-size: 32rpx;
  line-height: 1.3;
}
.form_img_title{
  width: 224rpx;
}
.form_input{
  flex-grow: 1;
  height: 100%;
  margin: 0 0 0 18rpx;
  font-size: 26rpx;
  color: #000;
}
.form_img{
  margin: 0 0 0 40rpx;
}
.placeholder {
  font-size: 28rpx;
  color: rgba(89, 90, 109, 0.4); 
}

.save {
  position: fixed;
  bottom: 48rpx;
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

.i_notice{
  width: 28rpx;
  height: 28rpx;
}

.s_fc_10{ color: #32B48F; }
.s_fc_11{ color: #BDBDC5; }
.s_fc_12{ color: #3E3F55; }
.s_fc_13{ color: #55C6AD; }
.s_fc_14{ color: #595A6D; }
</style>

<template>
	<view class="container page_wrap s_bg_f">
		<view class="public_form_wrap s_fc_11">
      <view class="form_input_wrap flex">
				<view class="form_title">公司名称：</view>
				<input type="text" class="form_input" @input="setName" :value="name" placeholder="请输入公司名称" placeholder-class="placeholder" disabled>
			</view>

      <view class="form_input_wrap flex">
				<view class="form_title ">公司税号：</view>
				<input type="text" class="form_input" @input="setTax" :value="tax" placeholder="请输入公司税号" placeholder-class="placeholder" disabled>
			</view>

      <view class="form_input_wrap flex">
				<view class="form_title ">开户行：</view>
				<input type="text" class="form_input" @input="setBank" :value="bank" placeholder="请输入开户行" placeholder-class="placeholder" disabled>
			</view>

      <view class="form_input_wrap flex">
				<view class="form_title ">开户账号：</view>
				<input type="text" class="form_input" @input="setAccount" :value="account" placeholder="请输入开户账号" placeholder-class="placeholder" disabled>
			</view>

      <view class="form_img_wrap flex">
				<view class="form_title form_img_title">上传支付凭证：</view>
        <upload class="form_img" :config="imgConfig" @success="changeImg"></upload>
			</view>

      <view class="mt30 s_fc_10 flex">
        <image class="i_notice" src="../../../static/logo.png"></image>
        <view class="ml20">请将货款打入公司对公账户</view>
      </view>

			<view class="save" @tap="submit">确定</view>
		</view>

	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import upload from '@/components/upload/index.vue'
  import userApi from '@/api/user';
  import orderApi from '@/api/order';
  import uploadUtil from '@/common/upload';

	export default {
    components: {
      upload,
      uniIcons,      
    },

		data() {
			return {
        name: '湖北博伦科欣健康科技有限公司',
        tax: '91420112MA4K4RKX52',
        bank: '中国农业银行武汉东西湖支行',
        account: '17082101040035781',

        id: null,     // 订单Id
        pay_sn: null, // 订单支付密钥

        imgList: [],
        imgConfig: {
          limit: 1,
        },

        doing: false,
			}
    },

		methods: {
			setName(e){ this.name = e.detail.value },
			setTax(e){ this.tax = e.detail.value; },
			setBank(e){ this.bank = e.detail.value; },
      setAccount(e){ this.account = e.detail.value; },
      changeImg(list) {
        this.imgList = list;
      },

			async submit(e) {
        let param = {}, img,
					phone = /^[1-9]\d{10}$/,
          notEmpty = /^\S+$/;

        if (!notEmpty.test(this.pay_sn)) return uni.showToast({ title: "pay_sn不能为空!", icon: "none", duration: 1000 });

        // if (!notEmpty.test(this.tax)) return uni.showToast({ title: "公司税号不能为空!", icon: "none", duration: 1000 });

        // if (!notEmpty.test(this.bank)) return uni.showToast({ title: "开户行不能为空!", icon: "none", duration: 1000 });

        // if (!notEmpty.test(this.account)) return uni.showToast({ title: "开户账号不能为空!", icon: "none", duration: 1000 });

        if (!this.imgList.length) return uni.showToast({ title: "支付凭证不能为空!", icon: "none", duration: 1000 });

        uni.showLoading({ title:'Loading', mask: true, });
        if(this.doing) return ;
        this.doing = true;

        let res = await uploadUtil.uploadImg(this.imgList[0]);
        if(!res || typeof res === 'string' || res.error) return uni.hideLoading(this.doing = false), uni.showToast({ title: res ? res.error || res : '上传图片失败!', icon: 'none', });
        if(res.cdnUrl) img = res.cdnUrl;

        param = {
          pay_sn: this.pay_sn,
          contrary_image: img,
        };
        
        this.save(param);
      },

			async save(param) {
        const res = await orderApi.publicPay(param);

        if(res && res.status === 0) {
          console.log(this.id);
					return uni.showModal({ content: '提交成功!', showCancel: false, success: e => { if(e.confirm) uni.redirectTo({ url: `/pages/my/order/detail?id=${this.id}` }); } });
        }

        uni.hideLoading(this.doing = false);
        return uni.showToast({ title: res ? res.error || res : '提交对公支付失败!', icon: 'none', });
			},

		},
		onLoad(opt) {
      uni.hideLoading();
      this.id = opt.id;
      this.pay_sn = opt.sn;
		},
		onShow() {},

	}
</script>