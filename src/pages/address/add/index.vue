<template>
  <div class="container">

    <topBar :config='config'></topBar>

    <div class='wrap'>

      <form bindsubmit='submit'>

          <view class='row_flex'>收件人： <input type='text' name='name' class='inline s-fc-4' @input='setConsignee' :value='address.consignee' /></view>

          <view class='row_flex'>联系方式：<input type='text' name='phone' class='inline s-fc-4' @input='setPhone' :value='address.phone' /></view>

          <view class="row_flex">
              <view>所在地区：</view>
              <view class='flex' @click='openAddressPicker'> 
                  <view class='flex' style='display: flex;'>
                      <view>{{province ? province.name : '省'}}</view>
                      <!-- <image class="cityup" src="../../images/My/cityup.png"></image> -->
                  </view>
                  <view class='flex' style='display: flex;>
                      <view>{{city ? city.name : '市' }}</view>
                      <!-- <image class="cityup" src="../../images/My/cityup.png"></image> -->
                  </view>
                  <view class='flex' style='display: flex;>
                      <view>{{area ? area.name : '区' }}</view>
                      <!-- <image class="cityup" src="../../images/My/cityup.png"></image> -->
                  </view>
              </view>
              <!-- <areaPicker @areaArray.user="areaChange"></areaPicker> -->
              <areap ref='area'></areap>
          </view>

          <view class='row_flex'>详细地址：<input type='text' name='detail' class='inline s-fc-4' @input='setStreet' :value='address.street' /></view>

          <view class='setting'>
              <view>
                  <view>设为默认地址</view>
                  <view class='comment s-fc-2'>注：每次下单时会使用该地址</view>
              </view>
              <switch name='isDefault' :checked='address.isDefault'></switch>
          </view>

          <button class='save_btn s-fc-1' formType='submit'>保存</button>
      </form>     

    <!-- <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form> -->
    <!-- <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a> -->
    </div>
  </div>
</template>

<script>
import topBar from '@/components/topBar'
import slide from '@/components/slide'
import area from '@/components/area'

export default {
  data () {
    return {
      userInfo: {},
      config: {
        title: '新增地址',
        color: '#222',
        bg: '#fff',
        backImg: '/static/back_gray.png'
      },
      slideConfig: {
        height: '500rpx',
        autoplay: false,
        data: [
          { img: '/static/toolBar/classify.png' },
          { img: '/static/toolBar/home.png' }
        ]
      },
      address: {
        id: '',
        consignee: '',
        phone: '',
        zoneId: '',
        street: '',
        isDefault: '' },
      list: [
        { title: '购物车', phone: 13211111111, img: '' },
        { title: '我的卡劵', phone: 13111111111, address: 'sfksdfkKSDFM<lsk破开神佛考生的分数都快发送的看法实力派v感慨地说佛v觉得佛教给vi的风景sfsdfjkd', img: '' },
        { title: '地址管理', img: '', url: 'pages/addressList/main' },
        { title: '整居定制', img: '' },
        { title: 'aksfdosdfojsdfcv', img: '' }
      ]
    }
  },

  components: {
    topBar,
    slide,
    areap: area
  },

  methods: {
    openAddressPicker(){
        console.log('--openAddressPicker--');
        //this.$invoke("areaPicker", "openAddressPicker");
        this.$refs.area.openAddressPicker();
    },
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    add (item) {
      wx.navigateTo({
        url: '/pages/address/add/main'
      })
    }
  },

  created () {
    if (!wx.getStorageSync('userInfo')) {
      wx.reLaunch({
        url: '/pages/authorization/main?referer=/pages/index/main'
      })
    }
    console.log('reLaunch')
  },

  onPullDownRefresh () {
    wx.reLaunch({
      url: '/pages/index/main'
    })
  }

}
</script>

<style scoped>
.wrap{
  width: 100%;
  font: 28rpx 'PingFang-SC-Medium'; 
  color: #666;
  background: #f5f5f5;
}

.row_flex{
  display: flex;
  align-items: center;
  margin-bottom: 1rpx;
  padding-left: 23rpx;
  background: #fff;
}

.setting{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 149rpx;
  padding: 0 23rpx;
  background: #fff;
}
.comment{
  margin: 22rpx 0 0;
  font-size: 26rpx;
}

.inline{
  flex-grow: 1;
  height: 101rpx;
}

.save_btn{
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  border-radius: 0;
  font-size: 36rpx;
  background: #786578;
  text-align: center;
}

.right_arrow{
  width: 16rpx;
  height: 26rpx;
  background: #ccc;
}


.default{
  font-size: 22rpx;
}
.inline{
  margin-left: 40rpx;
}


.s-fc-1{
  color: #fff;
}
.s-fc-2{
  color: #999;
}
.s-fc-3{
  color: #786578;
}
.s-fc-4{
  color: #333;
}
</style>
