<template>
  <view class="goods_wrap s_bg_f" hover-class="uni-list-cell-hover">
    <view class="flex">
      <view class="goods_img_wrap">
        <image class="goods_img" :src="config.goods_image"></image>
      </view>

      <view class="goods_body ml48">
        <view class="price_wrap flex">
          <view class="goods_price s_fc_price">¥{{sku.goods_price}}</view>

          <view class="goods_marketPrice ml20 s_fc_12">¥{{sku.goods_marketprice}}</view>
        </view>

        <view class="flex">
          <view class="goods_desc">销量：{{ sku.goods_salenum}}</view>
          <view class="goods_desc ml40">库存：{{ sku.goods_storage}}</view>
        </view>
      </view>
    </view>

    <view class="mt50">
      <view class="s_fc_13">规格</view>

      <view>
        <scroll-view class="sku_wrap" scroll-y="true">
          <view class="goods_sku mt20" v-for="(item, index) in config.spec_name" :key="index" @tap="changeSku(index)">

            <view class="sku_title" :class="[currentIndex === index ? 'goods_sku_sel s_fc_14 s_bg_12' : 's_fc_13 s_bg_11']">{{item}}</view>

          </view>
        </scroll-view>
      </view>
    </view>

    <view class="mt30">
      <view class="s_fc_13">数量</view>

      <view class="mt20 flex">
        <uni-icons class="" type="minus" :color="goodsNum > 1 ? '#333' : '#ccc'" size="20" @tap="changeNum(-1)" />
				<input class="input_wrap s_fc_0 s_bg_11" type="number" v-model="goodsNum" @input="input" />
        <uni-icons class="" type="plus" color="#333" size="20" @tap="changeNum(1)" />
      </view>
    </view>

    <!-- <view class="goods_body ml30 s_fc_11">
      <view class="goods_title s_fc_10">{{ config.goods_name }}</view>

      <view class="goods_desc">{{config.skuStr}}</view>
    </view> -->

    <view class="submit_btn s_bg_10 s_fc_f" @tap="goSubmit">确定</view>

    <uni-icons class="i_close" type="close" color="#ccc" size="20" @tap="close" />
  </view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
  import goodsApi from '@/api/goods';

	export default {
    components: {
      uniIcons,
    },

		props: {
      config: Object,
		},
		
		data() {
			return {
        currentIndex: 0,
        sku: null,

        goodsNum: 1,
			};
		},
		
		computed: {
		},
		
		methods: {
      changeSku(i) {
        this.currentIndex = i;
        this.sku = this.config.SKUList[i];

        this.$emit('change', this.sku);
      },

      changeNum(v) {
        v = Number(v);

        if(v < 0 && this.goodsNum <= 1) return ;

        this.goodsNum += v;
      },

      input(event) {
				this.goodsNum = Number(event.target.value);
			},

      close() { this.$emit('close'); },

      async addCart() {
        let param = { goods_id: this.sku.goods_id, quantity: this.sku.goods_num, };

        uni.showLoading({ title: 'loading...', mask: true, });

        let res = await goodsApi.addCart(param);
        uni.hideLoading();
        if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '添加失败!', icon: 'none', });
        
        uni.showToast({ title: '添加成功!', icon: 'success', });
        this.$emit('close', 'cart');
      },

      goSubmit() {
        if(this.sku.goods_storage <= 0) return uni.showToast({ title: '库存不足!', icon: 'none', });

        if(this.goodsNum >= 1 && this.goodsNum <= this.sku.goods_storage && this.goodsNum % 1 === 0){
          uni.showLoading({ title: '跳转中...', mask: true, });

          this.sku.goods_num = this.goodsNum;
          this.sku.goods_spec = this.config.spec_name[this.currentIndex];

          if(this.config.isCart) return this.addCart();

          let url = `/pages/my/order/submit`;
          uni.setStorageSync('sku', this.sku);

          return uni.navigateTo({ url: url, });
        }

        uni.showToast({ title: '购买数量不正确!', icon: 'none', mask: false, });
      },		
    },
    
    created() {
      this.changeSku(0); 
    },
	}
</script>

<style>
.goods_wrap{
  position: relative;
  padding: 40rpx 20rpx;
  word-break: break-all;
}
.goods_img{
  display: block;
	width: 168rpx;
  height: 150rpx;
}


.goods_title{
  height: 72rpx;
  font-size: 28rpx;
  font-weight: 600;
  line-height: 1.3;
  overflow: hidden;
}
.goods_body{
  align-self: flex-end;
}
.price_wrap{
  position: relative;
}
.goods_price{
  font-size: 48rpx;
  font-weight: 600;
  line-height: 1.3;
}
.goods_marketPrice{
  font-size: 32rpx;
  text-decoration: line-through;
  line-height: 1.3;
}

.goods_desc{
  position: relative;
  top: 8rpx;
  font-size: 24rpx;
  line-height: 1.4;
}

.sku_wrap{
  height: 250rpx;
}
.goods_sku{
}
.sku_title{
  display: inline-block;
  padding: 0 60rpx;
  font-size: 28rpx;
  border-radius: 30rpx;
  border: 2rpx solid transparent;
}
.goods_sku_sel{
  border: 2rpx solid #E06753;
}

.input_wrap{
  width: 100rpx;
  margin: 0 10rpx;
  font-size: 28rpx;
  text-align: center;
}

.submit_btn{
  width: 630rpx;
  height: 68rpx;
  margin: 96rpx auto 0; 
  font-size: 32rpx;
  line-height: 68rpx;
  border-radius: 40rpx;
  text-align: center;
}

.i_close{
  position: absolute;
  top: 40rpx;
  right: 42rpx;
  line-height: 1;
}

.s_fc_10{ color: #222848; }
.s_fc_11{ color: #5E5C75; }
.s_fc_12{ color: #BABABA; }
.s_fc_13{ color: #48495E; }
.s_fc_14{ color: #E06753; }

.s_bg_10{ background: #FD5052; }
.s_bg_11{ background: #F2F2F2; }
.s_bg_12{ background: #FFE9ED; }
</style>