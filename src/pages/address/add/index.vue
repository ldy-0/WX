<template>
  <div class="container">

    <topBar :config='config'></topBar>

    <div class='wrap'>

      <form @submit='submit'>

          <view class='row_flex'>收件人： <input type='text' name='name' class='inline s-fc-4' @input='setName' :value='address.address_realname' /></view>

          <view class='row_flex'>联系方式：<input type='text' name='phone' class='inline s-fc-4' v-model='address.address_mob_phone' /></view>

          <view class="row_flex">
              <view style='width: 140rpx; flex-shrink: 0;'>所在地区：</view>
              <view style='display: flex;' @click='showAddressPicker'> 
                  <view class='flex'>
                      <view>{{address.province ? address.province.name : '省'}}</view>
                      <image style="width: 25rpx; height: 15rpx;" src="/static/bottom_arrow.png" />
                  </view>
                  <view class='flex'>
                      <view>{{address.city ? address.city.name : '市' }}</view>
                      <image style="width: 25rpx; height: 15rpx;" src="/static/bottom_arrow.png" />
                  </view>
                  <view class='flex'>
                      <view>{{address.area ? address.area.name : '区' }}</view>
                      <image style="width: 25rpx; height: 15rpx;" src="/static/bottom_arrow.png" />
                  </view>
              </view>
              <areap ref='area' @getArea='getArea'></areap>
          </view>

          <view class='row_flex'>详细地址：<input type='text' name='detail' class='inline s-fc-4' v-model='address.address_detail' /></view>

          <view class='setting'>
              <view>
                  <view>设为默认地址</view>
                  <view class='comment s-fc-2'>注：每次下单时会使用该地址</view>
              </view>
              <switch name='isDefault' :checked='Number(address.address_is_default)'></switch>
          </view>

          <button class='save_btn s-fc-1' formType='submit'>保存</button>
      </form>     

    </div>
  </div>
</template>

<script>
import topBar from '@/components/topBar'
import slide from '@/components/slide'
import area from '@/components/area'
import api from '@/utils/api'

export default {
  data () {
    return {
      userInfo: {},
      config: {
        title: '新增地址',
        color: '#222',
        bg: '#fff',
        backImg: '/static/left_arrow.png'
      },
      address: {
        address_id: '',
        address_realname: '',
        address_mob_phone: '',
        address_detail: '',
        address_info: '',
        address_is_default: '',
        province: null,
        city: null,
        area: null
      }
    }
  },

  components: {
    topBar,
    slide,
    areap: area
  },

  methods: {
    setName (e) {
      let v = e.mp.detail.value
      console.log('phone', this.address)
      if (v.length > 15) {
        wx.showToast({ title: '用户名不能超过15个字符', icon: 'none', duration: 2000, })
        return this.address.address_realname
      }
      this.address.address_realname = v
    },
    // setPhone (e) { this.address.address_mob_phone = e.mp.detail.value },
    showAddressPicker () { this.$refs.area.openAddressPicker() },
    getArea (e) {
      this.address.province = e.province
      this.address.city = e.city
      this.address.area = e.area
    },
    submit (e) {
      let v = e.mp.detail.value
      let phone = /^((13[0-9])|(14[5|7|9])|(15([0-3]|[5-9]))|(17[0,1,3,5,6,7,8])|(18[0-9]))\d{8}$/
      if (!v.name) {
        return wx.showToast({ title: '姓名不能为空!', icon: 'none', duration: 1000 })
      }
      if (v.phone === '' || !phone.test(v.phone)) {
        return wx.showToast({ title: '手机号格式不正确!', icon: 'none', duration: 1000 })
      }
      if (!this.address.city) {
        return wx.showToast({ title: '请选择所在地区!', icon: 'none', duration: 1000 })
      }
      if (!v.detail) {
        return wx.showToast({ title: '请完善详细地址!', icon: 'none', duration: 1000 })
      }

      this.address.address_id ? this.save(v, this.address.address_id) : this.save(v)
    },
    async save (v, id) {
      console.log('info', v, id)
      let {province, city, area} = this.address
      let param = {
        address_realname: v.name,
        address_mob_phone: v.phone,
        address_tel_phone: v.phone,
        address_detail: v.detail,
        area_info: `${province.name}-${city.name}-${area.name}-${v.detail}`,
        address_is_default: Number(v.isDefault),
        province_id: province.id,
        city_id: city.id,
        area_id: area.id
      }

      let res = id ? await api.updateAddress(id, param) : await api.setAddress(param)
      if (res) {
        wx.navigateBack({ detail: 1 })
      }
    }

  },

  created () {
    console.log('add address')
  },

  onLoad (param) {
    console.log(param, this.address)
    this.address = param.item === 'null' ? {
      address_id: '',
      address_realname: '',
      address_mob_phone: '',
      address_detail: '',
      address_is_default: '',
      province: null,
      city: null,
      area: null
    } : JSON.parse(decodeURIComponent(param.item))
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

.flex{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 170rpx;
  margin-right: 20rpx;
}

.row_flex{
  display: flex;
  align-items: center;
  height: 100rpx;
  margin-bottom: 2rpx;
  padding: 0 40rpx 0 23rpx;
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
