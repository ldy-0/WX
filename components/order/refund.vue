<template>
  <view class="return_dialog_wrap s_fc_11 s_bg_f">
    <view class="return_title fs32 bold">退款原因</view>

    <uni-icons class="i_close" type="close" color="#ccc" size="20" @tap="close" />

    <scroll-view class="reason_list_wrap s_fc_10 mt30" scroll-y>
      <radio-group @change="changeReason">
        <view class="reason_item flex" v-for="(item, index) in reasonList" :key="index">
          <radio style="transform:scale(0.8)" :value="String(index)" :checked="index === currentReason" color="#32B48F" />

          <view class="ml10">{{item.reason_info}}</view>
        </view>
      </radio-group>
    </scroll-view>

    <view class="return_btn fs32 s_fc_f s_bg_11" @tap="submit">确定</view>
  </view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue'
import orderApi from '@/api/order';
import * as gd from '@/common/global.js';

export default {
  props: {
    config: Object,
  },

  components: {
    uniIcons,
  },
  
  data() {
    return {
      reasonList: [
        '拍错/多拍',
        'a',
      ],
      currentReason: null,
    };
  },
  
  computed: {
    isRefund(){ return this.config.order_state_id == gd.ORDER_PAYED; },
  },
  
  methods: {
    close(){
      this.$emit('close');
    },

    changeReason(e) {
      this.currentReason = this.reasonList[e.detail.value];
    },

    submit() {
      if(!this.currentReason) return uni.showToast({ title: '请选择退款原因!', icon: 'none', mask: true, });
        
      let param = {
        order_id: this.config.order_id,
        refund_type: this.isRefund ? gd.RETURN_MONEY : gd.RETURN_GOODS,
        reason_id: this.currentReason.reason_id,
        reason_info: this.currentReason.reason_info,
      };

      this.refund(param);
    },

    async refund(param) {
      uni.showLoading({ title: 'loading...', mask: true, });

      let res = await orderApi.aftersale(param);
      if(res && res.status == 0) {
        return this.$emit('success', this.config);
      }

      uni.hideLoading();
      uni.showToast({ title: res ? res.error || res : '提交失败!', icon: 'none', });
    },

    async getReasonList() {
      let param = {};

      uni.showLoading({ title: 'loading...', mask: true, });

      let res = await orderApi.getReasonList(param);
      uni.hideLoading();
      if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取退款原因失败!', icon: 'none', });
      
      if(res.data) {
        this.reasonList = res.data;
      }
    },
  },

  created() {
    this.getReasonList();
  },
}
</script>

<style>
.return_dialog_wrap{
  padding: 0 30rpx 30rpx;
}
.return_title{
  padding: 40rpx 0 30rpx;
  text-align: center;
}

.reason_list_wrap{
  height: 280rpx;
  border-bottom: 4rpx solid #F9F9F9;
}
.reason_item{
  padding: 24rpx 0;
  border-bottom: 1rpx solid #F9F9F9;
}

.return_btn{
  width: 630rpx;
  height: 84rpx;
  margin: 100rpx auto 0;
  line-height: 84rpx;
  border-radius: 42rpx;
  text-align: center;
}

.i_close{
	position: absolute;
	top: 10rpx;
	right: 40rpx;
	width: 36rpx;
	height: 36rpx;
}

.s_fc_10{ color: #222848; }
.s_fc_11{ color: #5E5C75; }
.s_fc_12{ color: #BABABA; }

.s_bg_11{ background: #32B48F; }
</style>