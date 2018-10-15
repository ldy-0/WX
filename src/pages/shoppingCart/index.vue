<template>
  <div class="container">

    <topBar :config='config'></topBar>

    <div class='wrap'>

      <div class='sub_bar' style='font-size: 32rpx;'>
        <div style='display: flex; align-items: center;'>
          <view class='check_wrap' style='width: 40rpx; margin: 0 14rpx;' @click='checkAll(item)'>
              <icon class="" v-if='isCheckAll' type="success" color="#786578" size="19" />
              <view class='big_circle' v-else></view>
          </view>
          <view class='s-fc-10'>全选</view>
        </div>
        <div class='' v-if='isEdited' @click='edit'>编辑</div>
        <div class='' v-else @click='edit'>完成</div>
      </div>

      <div class='goods' v-for='(item, index) in list' :key='index'>

        <view class='check_wrap' style='width: 40rpx; margin: 0 14rpx;' @click='check(item)'>
            <icon class="" v-if='item.checked' type="success" color="#786578" size="19" />
            <view class='big_circle' v-else></view>
        </view>

        <image class='goods_thub' :src='item.goods_image' />

        <div class='goods_detail'>
          <div class='goods_name s-fc-2'>{{item.goods_name}}</div>
          <div class='appoinment s-fc-11' v-if="item.appoinmentInfo">预约时间：{{item.appoinmentInfo}}</div>
          <div class='goods_number'>
            <div class='goods_price s-fc-9'>{{item.goods_price}}</div>
            <div class='count'>
              <div class='add' @click='minus(item)'>-</div>
              <div class='number s-fc-8' v-text='item.qty'></div>
              <div class='minus' @click='add(item)'>+</div>
            </div>
          </div>
        </div>

      </div>

      <div class='bottom_bar' v-if='isEdited'>
        <div>
          <div>合计：<span class='s-fc-9'>¥{{price}}</span></div>
        </div>
        <div class='submit_btn s-fc-1 s-bg-3' @click='submit'>结算({{count}})</div>
      </div>
      <div class='bottom_bar' style='justify-content: flex-end;' v-else>
        <div class='submit_btn s-fc-1 s-bg-3' @click='deleteItem'>删除</div>
      </div>

    </div>
  </div>
</template>

<script>
import topBar from '@/components/topBar'
import slide from '@/components/slide'
import goods from '@/components/goods'
import api from '@/utils/api'

export default {
  data () {
    return {
      userInfo: {},
      config: {
        title: '购物车',
        color: '#222',
        bg: '#fff',
        backImg: '/static/left_arrow.png'
      },
      goodsConfig: {
        margin: '20rpx 0 0'
      },
      list: [],
      isCheckAll: false,
      isEdited: true,
      canChange: true,
      isVirtual: true
    }
  },

  components: {
    topBar,
    slide,
    goods
  },

  computed: {
    count () { return this.list.reduce((p, v) => v.checked ? p + v.qty : p, 0) },
    price () { return this.list.reduce((p, v) => v.checked ? this.add_minus(p, Number(v.goods_total)) : p, 0) }
  },

  methods: {
    edit () { this.isEdited = !this.isEdited },
    check (item) {
      item.checked = !item.checked
      this.isCheckAll = this.list.every(v => v.checked)
    },
    checkAll () {
      this.isCheckAll ? this.list.forEach(v => { v.checked = false }) : this.list.forEach(v => { v.checked = true })
      this.isCheckAll = !this.isCheckAll
    },
    minus (item) {
      if (item.qty <= 1) return wx.showModal({ title: '提示', content: '商品数量不能低于1', showCancel: false })

      if (!this.canChange) {
        return null
      }
      this.canChange = false

      item.qty--
      this.update(item)
    },
    add (item) {
      if (!this.canChange) {
        return null
      }
      this.canChange = false

      item.qty++
      this.update(item)
    },
    deleteItem () {
      let _this = this
      wx.showModal({
        title: '提示',
        content: '确认删除吗？',
        async success (e) {
          _this.deleteCart()
        },
        fail (e) {console.log(e)}
      })
    },
    clear () {
      this.list.forEach((v, i) => { v.checked = false })

      this.isCheckedAll = false
      this.count = this.price = 0

    },
    add_minus (nub1, nub2) {
      let len1, len2, m
      try { len1 = nub1.toString().split('.')[1].length; }catch(e){len1 = 0;}
      try { len2 = nub2.toString().split('.')[1].length; }catch(e){len2 = 0;}
      m = 10 ** Math.max(len1, len2)
      return (nub1 * m + nub2 * m) / m
    },
    async update (item) {
      wx.showLoading({ title: '更新中...' })

      console.log('update ', item)
      let param = {
        cart_id: item.cart_id,
        quantity: item.qty,
        store_id: 1
      }
      let res = await api.updateCart(item.cart_id, param)
      res.store_cart_list ? item.goods_num = item.qty : item.qty = item.goods_num

      this.canChange = true
      wx.hideLoading()
    },
    async deleteCart () {
      let list = this.list
      for (let i = list.length - 1; i >= 0; i--) {
        if (list[i].checked) {
          let res = await api.deleteCart(list[i].cart_id, {
            cart_id: list[i].cart_id,
            store_id: 1
          })

          this.isCheckAll = false
          this.list = []
        }
      }
      this.getList()
    },
    submit () {
      if (this.count === 0) {
        return wx.showModal({ content: '请选择商品！', showCancel: false })
      }

      wx.navigateTo({
        url: `/pages/submit/main?goodsList=${encodeURIComponent(JSON.stringify(this.list.filter(v => v.checked)))}`
      })
    },
    async getList () {
      wx.showLoading({ title: 'Loading...' })

      let res = await api.getCartList({ store_id: 1 })

      if (res.store_cart_list.length === 0) {
        return wx.hideLoading()
      }

      let list = res.store_cart_list['1']

      list.forEach(v => { v.checked = false; v.qty = v.goods_num; v.appoinmentInfo = v.remark[0] !== ',' && v.remark[0].split(',')[0] })

      this.list = list
      wx.hideLoading()
    }
  },

  created () {
  },

  async onShow () {
    this.list = []
    this.isCheckAll = false

    this.getList()
  },

  onPullDownRefresh () {
    wx.reLaunch({
      url: '/pages/shoppingCart/main'
    })
  }

}
</script>

<style scoped>
.container{
  height: 100%;
}

.wrap{
  width: 100%;
  height: 100%;
  margin-bottom: 100rpx;
  font: 28rpx 'PingFang-SC-Medium'; 
  color: #000;
  background: #f5f5f5;
}

.sub_bar{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88rpx;
  padding: 0 20rpx;
  background: #fff;
}

.big_circle{
  width: 40rpx;
  height: 40rpx;
  border: 1rpx solid #282425;
  border-radius: 50%;
}

.goods{
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 20rpx;
  padding: 20rpx;
  background: #fff;
}
.goods_thub{
  flex-shrink: 0;
  width: 180rpx;
  height: 180rpx;
  background: #ccc;
}
.goods_detail{
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 160rpx;
  margin-left: 20rpx;
  padding: 10rpx 0;
  overflow: hidden;
}
.goods_name{
  font-size: 32rpx;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.goods_price{
  height: 40rpx;
  font-size: 32rpx;
}
.goods_number{
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin: 70rpx 0 0; */
  font-size: 24rpx;
}

.appoinment{
  font-size: 24rpx;
}

.count{
  display: flex;
  align-items: center;
  font-size: 32rpx;
}
.add, .minus{
  width: 50rpx;
  height: 50rpx;
  line-height: 50rpx;
  background: #eee;
  text-align: center;
}
.number{
  width: 90rpx;
  height: 50rpx;
  line-height: 50rpx;
  margin: 0 2rpx;
  background: #eee;
  text-align: center;
}

.bottom_bar{
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100rpx;
  padding: 0 20rpx;
  background: #fff;
  text-align: center;
}
.left{
  flex-grow: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
}
.bottom_icon{
  width: 45rpx;
  height: 45rpx;
  background: #ccc;
}
.bottom_btn{
  width: 210rpx;
}
.bottom_btn div{
  width: 200rpx;
  height: 76rpx;
  line-height: 76rpx;
  border-radius: 10rpx;
  font-size: 30rpx;
  text-align: center;
}
.submit_btn{
  width: 190rpx;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 10rpx;
  text-align: center;
}

  .modal{
  }
  .mask{
    position: fixed;
    top: 0rpx;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.3;
    filter: alpha(opacity=30);
  }
  .content{
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 456rpx;
    padding: 20rpx;
    background: #fff;
  }
  
  .modal .bottom{
    display: flex;
    justify-content: space-between;
    height: 100rpx;
  }
  .modal .bottom div{
    width: 335rpx;
    height: 76rpx;
    line-height: 76rpx;
    border-radius: 10rpx;
    text-align: center;
  }
  .content_center{
    position: fixed;
    top: calc(50% - 280rpx);
    left: calc(50% - 345rpx);
    width: 690rpx;
    height: 570rpx;
    border-radius: 10rpx;
    background: #fff;
  }
  .content_title{
    margin: 30rpx 0 0;
    font-size: 34rpx;
    text-align: center;
  }
  

.circle{
  position: relative;
  width: 42rpx;
  height: 42rpx;
  margin-right: 10rpx;
  border: 1rpx solid #937d8a;
  border-radius: 50%;
}
.circle_sel{
  width: 24rpx;
  height: 24rpx;
  margin: 9rpx auto 0;
  border: 1rpx solid #937d8a;
  border-radius: 50%;
  background: #937d8a;
}

.inline{
  flex-grow: 1;
  height: 101rpx;
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
  color: #333;
}
.s-fc-3{
  color: #786578;
}
.s-fc-4{
  color: #ff4444;
}
.s-fc-5{
  color: #888;
}
.s-fc-6{
  color: #af0000;
}
.s-fc-7{
  color: #636363; 
}
.s-fc-8{
  color: #202020;
}
.s-fc-9{
  color: #fc5a4f; 
}
.s-fc-10{
  color: #010101; 
}
.s-fc-11{
  color: #999;
}

.s-bg-2{
  background: #d6c1d2;
}
.s-bg-3{
  background: #786578; 
}
.s-bg-4{
  background: #af0000;
}
</style>
