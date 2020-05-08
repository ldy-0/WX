<template>
  <view class="goods_wrap flex s_bg_f" hover-class="uni-list-cell-hover">
    <view class="circle_wrap">
      <view class="i_circle" :class="[config.checked ? 'i_circle_hide' : '']" @tap="changeCheck(config)" v-if="config.cart_status == 0">
        <image class="i_check img" src="../../static/goods/checked.png" v-if="config.checked"></image>
      </view>

      <view class="invalid_title fs24 s_fc_f s_bg_10" v-else>失效</view>
    </view>

    <view class="goods_img_wrap">
      <image class="goods_img" :src="config.goods_image"></image>
    </view>

    <view class="goods_body ml24 s_fc_11">
      <view class="goods_title s_fc_10">{{ config.goods_name }}</view>

      <view class="goods_desc">{{config.goods_spec || '无'}}</view>

      <view class="goods_price_wrap between">
        <view class="goods_price s_fc_price">¥{{config.goods_price}}</view>
        
        <view class="flex" v-if="config.cart_status == 0">
          <uni-icons class="" type="minus" :color="config.goods_num > 1 ? '#333' : '#ccc'" size="20" @tap="changeNum(-1)" />
          <input class="input_wrap s_fc_0 s_bg_11" type="number" v-model="config.goods_num" @input="input" />
          <uni-icons class="" type="plus" color="#333" size="20" @tap="changeNum(1)" />
        </view>
      </view>
    </view>
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
        goods_num: 1,
        timeout: null,
			};
		},
		
		computed: {
		},
		
		methods: {
      changeCheck(item) {
        if(item.cart_status == 1) return uni.showToast({ title: '已过期!', icon: 'none', });

        this.config.checked = !this.config.checked;  

        this.$emit('change');
      },

      changeNum(v) {
        let num = Number(this.config.goods_num);
        v = Number(v);

        if(v < 0 && num <= 1) return ;

        this.changeCart(num + v);
      },

      input(event) {
        if(this.timeout) clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
          if(this.config.goods_num >= 1 && this.config.goods_num % 1 === 0){
            return this.changeCart(event.target.value);
          }

          this.config.goods_num = this.goods_num;
          uni.showToast({ title: '输入数量不正确!', icon: 'none', });
        }, 600);
      },
      
      async changeCart(num) {
        let param = { cart_id: this.config.cart_id, quantity: num, },
            list;

        uni.showLoading({ title: 'loading...', mask: true, });

        let res = await goodsApi.changeCart(this.config.cart_id, param);
        uni.hideLoading();
        if(!res || typeof res === 'string' || res.error) return this.config.goods_num = this.goods_num, uni.showToast({ title: res ? res.error || res : '!', icon: 'none', });
        
        if(res.data) {
          this.goods_num = this.config.goods_num = num;
          if(this.config.checked) this.$emit('change');
        }
      },

      goDetail() {
        // uni.navigateTo({ url: `/pages/classify/list?id=${this.config.goods_commonid}`, });
      },		
    },
    
    created() {
      this.goods_num = this.config.goods_num;
    },
	}
</script>

<style>
.goods_wrap{
  padding: 0 40rpx 0 30rpx;
  word-break: break-all;
}
.goods_img_wrap{
  flex-shrink: 0;
}
.goods_img{
  display: block;
	width: 164rpx;
  height: 144rpx;
}

.goods_body{
  width: 420rpx;
  align-self: flex-start;
}
.goods_title{
  font-size: 28rpx;
  font-weight: 600;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.goods_price_wrap{
  position: relative;
  top: 12rpx;
}
.goods_price{
  font-size: 28rpx;
  font-weight: 600;
}
.goods_marketPrice{
  font-size: 24rpx;
  text-decoration: line-through;
}

.goods_desc{
  font-size: 24rpx;
  line-height: 2.4;
}

.circle_wrap{
  width: 56rpx;
}
.i_circle{
  flex-shrink: 0;
  width: 32rpx;
  height: 32rpx;
  border: 2rpx solid #979797;
  border-radius: 50%;
  box-sizing: border-box;
}
.i_circle_hide{
  border: none;
}
.i_check{
  position: relative;
  display: block;
  border-radius: 50%;
}
.invalid_title{
  position: relative;
  left: -16rpx;
  line-height: 1.3;
  text-align: center;
  border-radius: 20rpx;
}

.input_wrap{
  width: 100rpx;
  margin: 0 10rpx;
  font-size: 28rpx;
  text-align: center;
}

.s_fc_10{ color: #222848; }
.s_fc_11{ color: #5E5C75; }
.s_fc_12{ color: #BABABA; }

.s_bg_10{ background: #aaa; }
.s_bg_11{ background: #F2F2F2; }
</style>