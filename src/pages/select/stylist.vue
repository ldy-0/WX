<style scoped>
page {
  background: #fff;
}

.container {
  height: 100vh;
}

.title_wrap{
  padding: 30rpx 20rpx;
  font-size: 24rpx;
}
.title{
  font-size: 40rpx;
}
.sub_title{
  margin: 10rpx 0 0;
}

.stylist_item{
  padding: 10rpx 20rpx;
  border-top: 2rpx solid #eee;
}
.stylist_img_wrap{
  position: relative;
}
.stylist_img{
  width: 148rpx;
  height: 148rpx;
  margin-right: 10rpx;
  border-radius: 18rpx;
  /* background: gray; */
}
.stylist_status{
  position: absolute;
  left: calc(50% - 52rpx);
  bottom: 0;
  width: 104rpx;
  height: 28rpx;
  line-height: 28rpx;
  border-radius: 14rpx;
  font-size: 20rpx;
  text-align: center;
}

.stylist_name, .stylist_desc{
  width: 300rpx; 
  height: 1.2em;
  /* line-height: 1.2; */
  overflow: hidden;
}
.stylist_name{
  font-size: 32rpx;
}
.stylist_desc{
  margin: 8rpx 0 0;
  font-size: 24rpx;
}

.stylist_price{
  margin: 20rpx 0 0;
  font-size: 32rpx;
}
.stylist_price1{
  font-size: 36rpx;
}

.application_btn{
  width: 160rpx;
  height: 60rpx;
  line-height: 60rpx;
  font-size: 24rpx;
  border-radius: 10rpx;
  text-align: center;
}
.application_desc{
  font-size: 24rpx;
  margin: 20rpx 0 0;
}

.item{
  padding: 30rpx;
  border-bottom: 2rpx solid #e4e4e4;
  font-size: 28rpx;
}
.clear{
  line-height: 1;
  border: none;
}

.model{
  box-sizing: border-box;
  position: fixed;
  top: calc(50% - 120rpx);
  left: calc(50% - 120rpx);
  width: 240rpx;
  height: 240rpx;
  padding: 36rpx 0 0;
  border-radius: 10rpx;
  font-size: 26rpx;
  text-align: center;
}
.i_alert{
  width: 20rpx;
  height: 100rpx;
  margin-bottom: 24rpx;
}


.flex {
  display: flex;
  align-items: center;
}

.arrow {
  width: 16rpx;
  height: 26rpx;
}


.between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.s-fc-1{ color: #fff; }
.s-fc-2{ color: #222; }
.s-fc-3{ color: #8e939a; }
.s-fc-4{ color: #10325f; }

.s-bg-1{ background: #fff; }
.s-bg-2{ background: #f5f5f5; }
.s-bg-3{ background: #999; }
.s-bg-4{ background: #10325f; }
.s-bg-5{ background: rgba(0, 0, 0, 0.7); }
</style>

<template>
  <view class="container s-bg-2">

    <view class='title_wrap s-bg-1 s-fc-3'>
      <view class='title s-fc-2'>{{title}}</view>
      <view class='sub_title'>{{subTitle}}</view>
    </view>

    <view class='stylist_list s-bg-1'>
      <repeat for='{{list}}' wx:key='index'>

        <view class='stylist_item between'>

          <view class='flex'>
            <view class='stylist_img_wrap'>
              <image class='stylist_img' src='{{item.goods_img}}' mode='aspectFill' />
              <view class='stylist_status s-fc-1 s-bg-3' wx:if='{{item.isTomorrow}}'>今日休息</view>
            </view>
            <view class=''>
              <view class='stylist_name'>{{item.goods_name}}</view>
              <view class='stylist_desc s-fc-3'>{{item.goods_advword}}</view>
              <view class='stylist_price s-fc-4'><text class='stylist_price1'>¥{{item.price1}}</text>.{{item.price2}}</view>
            </view>
          </view>
          <view class='' @tap='goSelectTime({{item}})'>
            <view class='application_btn s-fc-1 s-bg-4'>{{item.isTomorrow ? '立即预约' : '预约时间'}}</view>
            <view class='application_desc s-fc-4'>{{application_desc}}{{item.lastTime}}</view>
          </view>

        </view>

      </repeat>
    </view>

    <view class='model s-fc-1 s-bg-5' wx:if='{{showModal}}'>
      <image class='i_alert' src='{{alertURL}}' />
      <view class=''>{{tip1}}</view>
      <view class=''>{{tip2}}</view>
    </view>

  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";

export default class Mine extends wepy.page {
  config = {
    navigationBarTitleText: "选择发型师"
  };
  data = {
    alertURL: '../../images/select/alert.png',
    title: '选择发型师',
    subTitle: '选择您最喜欢的发型师为您服务',
    application_desc: '最早可约',
    tip1: '为了更好的服务您',
    tip2: '请绑定手机号',
    store_id: null, // param
    storegc : null,
    address: '',
    currentPage: 1,
    limit: 10,
    list: [],
    total: 0,
    showModal: false,
  };

  components = {};

  onLoad(options) {
    this.store_id = options.id;
    if(options.storegc) this.storegc = JSON.parse(options.storegc);
    this.address = options.address;

    // wx.showToast({ title: '为了更好的提供...', image: '' });

    this.getList();
  }

  onShow() {
    
  }

  methods = {
    goSelectTime(item){
      let param,
          url = '';

      // add Address Info
      item.storegc = this.storegc;
      item.address = this.address;
      param = encodeURIComponent(JSON.stringify(item));

      let user = wx.getStorageSync('memberInfo');
      // console.error(user);
      url = user.member_mobile ? `/pages/select/time?stylist=${param}` : `/pages/select/phone?param=${param}`;

      if(user.member_mobile) return wx.navigateTo({ url });

      this.showModal = true;
      setTimeout(() => {
        this.showModal = false;
        wx.navigateTo({ url });
      }, 600);
      // wx.navigateTo({ url: `/pages/select/time?id=${this.store_id}&storegc_id=${this.storegc_id}&goods_commonid=${this.goods_commonid}` });
    }  

  };

  // utils
  format(v){
        let date = new Date(),
            tomorrow = null,
            time = null;

        let arr = String(v.goods_price).split('.');

        v.price1 = arr[0];
        v.price2 = arr[1];

        v.goods_img = (JSON.parse(v.goods_image)).url;
        // date.getDay() === 6 ? tomorrow = 0 : tomorrow++;

        // 
        v.isTomorrow = v.appointment_date.indexOf(date.getDay()) === -1;

        v.appointment_frame.some(v => { if(new Date(v).getTime() > new Date().getTime()){ time = v; return true; } return false; });
        // if(time){
        //   let lasttime = new Date(time);
        //   console.error(lasttime);
        //   v.lastTime = `${lasttime.getHours() < 10 ? '0' : '' + lasttime.getHours()}${lastTime.getMinutes() < 10 ? '0' : '' + lasttime.getMinutes()}`;
        // }
        v.lastTime = v.appointment_frame[0];

  };

  async getList(){
      let res = await shttp.get(`/api/v2/member/goodsList`).query({
        page: this.currentPage,
        limit: this.limit,
        store_id: this.store_id,
        storegc_id: this.storegc.storegc_id,
      }).end();

      if(res && res.data){

        res.data.forEach(this.format);

        this.list = res.data;
        this.total = res.pagination && res.pagination.total || this.list.length;
      }
      
      this.$apply();
    }

}
</script>