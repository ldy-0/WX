<template>
  <div class="container">

    <topBar :config='config' title='首页'></topBar>

    <div class='wrap'>

      <div class='add' @click='go(null)'>
          <view style='font-weight: bold;'>添加新地址</view>
          <image class='right_arrow' src='/static/my/right_arrow.png' />
      </div>   

      <div class='address_list s-fc-2'>
        <view class='address' v-for='(item, index) in list' :key='index' @click='selectAddress(item)'>
            <view>
              <view class='user_info'>{{item.address_realname}}<text class='inline'>{{item.address_mob_phone}}</text></view>
              <view class='address_info'>{{item.area_info}}</view>
            </view>
              <view class='other_info'>
                <view class='default' v-if='Number(item.address_is_default)'>[默认地址]</view>
                <view v-else></view>
                <view class='operate_info'>
                    <view class='operate_btn' @click='go(item)'>
                      <image src='/static/my/edit.png' />
                      <view>修改</view>
                    </view>
                    <view class='operate_btn' @click='deleteAddress(item)'>
                      <image src='/static/my/delete.png' />
                      <view>删除</view>
                    </view>
                </view>
              </view>
        </view>
      </div>
      

    </div>
  </div>
</template>

<script>
import topBar from '@/components/topBar'
import slide from '@/components/slide'
import api from '@/utils/api'

export default {
  data () {
    return {
      config: {
        title: '地址管理',
        color: '#222',
        bg: '#fff',
        backImg: '/static/left_arrow.png'
      },
      list: [
        // { name: '购物车', phone: 13211111111, img: '' },
        // { name: '我的卡劵', phone: 13111111111, address: 'sfksdfkKSDFM<lsk破开神佛考生的分数都快发送的看法实力派v感慨地说佛v觉得佛教给vi的风景sfsdfjkd', img: '' },
        // { title: '地址管理', img: '', url: 'pages/addressList/main' },
        // { title: '整居定制', img: '' },
        // { title: 'aksfdosdfojsdfcv', img: '' }
      ],
      currentPage: 1,
      limit: 2
    }
  },

  components: {
    topBar,
    slide
  },

  methods: {
    go (item) {
      wx.navigateTo({
        url: '/pages/address/add/main?item=' + encodeURIComponent(JSON.stringify(item))
      })
    },
    selectAddress (item) {
      if(!this.canSel) return ; 
      
      wx.setStorageSync('address', item)
      wx.navigateBack({ detail: 1 })
    },
    deleteAddress (item) {
      wx.showModal({
        content: '确认删除该地址吗?',
        async success (e) {
          let res = e.confirm && await api.deleteAddress(item.address_id) //FIXME: 
          console.log(e, res)
        }
      })
    },
    async getList (page) {
      let param = {
        page,
        limit: this.limit
      }

      let res = await api.getAddressList(param)

      if (!res) return null

      this.list = res
    }
  },

  created () {
    console.log('addressList create')
  },

  onLoad (param) {
    if(param.referer) this.canSel = true
  },

  onShow () {
    this.getList(this.currentPage)
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
  font: 32rpx 'PingFang-SC-Medium'; 
  background: #f5f5f5;
}

.right_arrow{
  width: 16rpx;
  height: 26rpx;
}

.add{
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* width: 100%; */
  height: 88rpx;
  padding: 0 20rpx;
  border-top: 1rpx solid #F4F4F4;
  background: #fff;
}

.address_list{
  background: #fff;
}
.address{
  box-sizing: border-box;
  height: 171rpx;
  padding: 20rpx 25rpx 0;
  border-top: 1rpx solid #F4F4F4;
}
.address_info{
  margin: 10rpx 0;
  height: 36rpx;
  line-height: 36rpx;
  font-size: 24rpx;
  overflow: hidden;
}
.other_info{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.operate_info{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 28rpx;
}
.operate_btn{
  display: flex;
  align-items: center;
  margin-left: 48rpx;
}
.operate_btn image{
  width: 26rpx;
  height: 26rpx;
  margin-right: 12rpx;
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
  color: #000;
}
.s-fc-3{
  color: #888;
}
</style>
