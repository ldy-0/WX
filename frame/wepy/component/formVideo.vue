<style scoped>
.flex{
  display: flex;
  align-items: center;
}
.between{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.m_img_wrap{
  display: flex;
  margin-bottom: 30rpx;
}

.title{
  flex-shrink: 0;
  height: 162rpx;
  margin: 0 30rpx 0 0;
  font-size: 28rpx;
}

.imgs_wrap{
  flex-wrap: wrap;
}
.img_wrap{
  position: relative; 
}
.img{
  width: 162rpx;
  height: 162rpx;
  margin: 0 16rpx 0 0;
  background: #ccc;
}
.i_close{
  position: absolute;
  top: 0;
  right: 20rpx;
  width: 24rpx;
  height: 24rpx;
}

.add_img_wrap{
  width: 162rpx;
  height: 162rpx;
  border: 2rpx dashed #c9c8d0;
  text-align: center;
}
.add_img{
  width: 54rpx;
  height: 60rpx;
  margin: 30rpx auto 10rpx;
}
.add_desc{
  font-size: 22rpx;
}

.s_fc_6{ color: #666; }
.s_fc_10{ color: #b6b6b6; }
</style>

<template>
  <view class='m_img_wrap'>
    <view class='title between' style="width: {{obj.width}}rpx;">
      <repeat for="{{obj.title || obj.name}}">
        <view>{{item}}</view>
      </repeat>
    </view>

    <view>
      <view class='imgs_wrap flex'>
        <repeat for='{{obj.value}}'>
          <view class='img_wrap'>
            <video class='img' src="{{item}}"></video>
            <image class='i_close' src='{{closeURL}}' @tap="close({{index}})" />
          </view>
        </repeat>

        <view class='add_img_wrap' @tap="addVideo" wx:if='{{obj.value.length < 9}}'>
          <image class='add_img' src='{{addImgURL}}' />
          <view class='add_desc s_fc_10'>添加视频</view>
        </view>
      </view>
      <!-- <view class='add_desc s_fc_2' style='margin: 20rpx 0 0;'>最多上传九张图片（可传微信二维码）</view> -->
    </view>

  </view>

</template>

<script>
import wepy from "wepy";
import mp from '../utils/wx';

export default class customInput extends wepy.component {
  props = {
    obj: Object
  };

  data = {
    addImgURL: '/images/order/upload.png',
    closeURL: '/images/order/close.png',
  };

  computed = {
    required(){ return 'alert' in this.obj; }
  }

  methods = {
    async addVideo(){
      let o = this.obj, 
          res;

      res = await mp.chooseVideo();

      console.error(res);
      if(res){
        let path = res[1].tempFilePaths,
            len = 9 - o.value.length;

        o.value = o.value.concat(path);
      }

      this.$apply();
    },
    close(index){
      this.obj.value.splice(index, 1);  
    },
    // input(e){ 
    //   let v = e.detail.value,
    //       o = this.obj;

    //   o.value = v;

    //   if(this.require && !v) return o.alert = `请输入${o.title || o.name}`;

    // },
  };
}
</script>