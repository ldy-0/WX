<template>
  <div class="container" :class='{ ios: isIos }'>

    <topBar :config='config'></topBar>

    <div class='wrap'>

      <slide :config='slideConfig'></slide>

      <div class='goods_info'>
        <div class='goods_name'>{{goods.goods_name}}</div>
        <div class='goods_price s-fc-4'>{{goods.goods_price}}</div>
        <div style='display: flex; align-items: center;' v-if='isDesign'>
          <image style='width: 26rpx; height: 26rpx;' src='/static/goods/icon_pingfen@2x.png' />
          <div class='s-fc-7'>{{goods.SKUList && goods.SKUList[0].evaluation_good_star}}</div>
        </div>
        <div class='s-fc-5' style='margin: 20rpx 0 0; font-size: 24rpx;' v-else>
          <span>销量：{{getSale}}</span>
          <span style='margin-left: 170rpx;'>库存：{{getStorage}}</span>
        </div>
      </div>

      <div class='row' v-if='!isDesign' @click='showModal'>
        <div>规格</div>
        <image class='right_arrow' src='/static/my/right_arrow.png' />
      </div>

      <div class='comment_wrap'>
        <div>宝贝评价({{commentTotal}})</div>
        <div v-for='(item, index) in commentList' :key='index'>
          <div style='display: flex; margin: 20rpx 0 0;'>
            <image class='user_img' :src='item.geval_frommemberavatar' />
            <div class='user_name' style='margin-left: 20rpx;'>{{item.geval_frommembername}}</div>
          </div>
          <div style='margin: 10rpx 0 0;'>{{item.geval_content}}</div>
          <image class='comment_img' :src='img' v-for='(img, i) in item.imgs' :key='i' />
        </div>
        <div style='height: 100rpx; overflow: hidden;'><div class='btn s-fc-3' @click='loadComment'>查看评论</div></div>
      </div>

      <div class='detail_wrap'>
        <div style='height: 68rpx; line-height: 68rpx; font-size: 30rpx; color: #333; text-align: center;'>商品详情</div>
        <div v-for='(item, index) in goods.goods_body' :key='index'>
          <div style='margin-bottom: 30rpx;'>{{item.content}}</div>
          <image class='detail_img' :src='item.img' mode='aspectFill' />
        </div>
      </div>

      <div class='bottom_bar' v-if='isDesign'>
        <div style='flex-grow: 1; display: flex; justify-content: center;'>
          <button class='type_btn' :open-type='barList[0].type' plain='true'>
            <image class='bottom_icon' :src='barList[0].img' />
            <div style='font-size: 20rpx;'>{{barList[0].title}}</div>
          </button>
        </div>
        <div class='appoinment_btn s-fc-1 s-bg-3' @click="goSubmit">立即预约</div>
      </div>
      <div class='bottom_bar' v-else>
        <div class='left'>
          <button class='type_btn' :open-type='item.type' v-for='(item, index) in barList' :key='index' plain='true' @click='go(item)'>
            <image class='bottom_icon' :src='item.img' />
            <div style='font-size: 20rpx;'>{{item.title}}</div>
          </button>
        </div>
        <div class='bottom_btn'><div class='s-fc-1 s-bg-2' @click="showModal">加入购物车</div></div>
        <div class='bottom_btn'><div class='s-fc-1 s-bg-3' @click='showModal'>立即购买</div></div>
      </div>
      

    <div class='modal' v-if='isShowModal'>
      <div class='mask' @click='hideModal'></div>
      <div class='content_center' v-if='isAppoinment'>
        <div class='content_title'>
          <div>预约信息</div>
          <image style='width: 24rpx; height: 24rpx; margin-left: 220rpx;' src='/static/goods/close.png' @click='hideModal' />
        </div>

          <picker mode="date" :start="currentDate" :end="endDate" @change="setDate" style='width: 630rpx; padding: 0 30rpx;'>
            <view class="picker">
              <view> {{appoinment.date || '请选择服务日期:'}}</view>
              <image class='picker_icon' src='/static/bottom_arrow.png' />
            </view>
          </picker>

        <div class='textarea'>
          <textarea placeholder="备注" placeholder-style='margin-left: 30px;' @input='setContent'></textarea>
          <div class='textarea_count'>{{getContentLength}}/120</div>
        </div>

        <div class='submit_btn s-fc-1 s-bg-3' @click='submitAppoinment'>提交</div>
      </div>
      <div class='content' v-else>
        <div style='display: flex;'>
          <image class='goods_thub' :src='goods.goods_image' mode='aspectFill' />
          <div class='s-fc-6' style='margin-left: 40rpx; font-size: 37rpx;'>{{getSkuPrice}}</div>
        </div>
        <scroll-view scroll-y='true' style='height: 240rpx;'>
          <div class='sku'>
            <div class='sku_item' :class='{ checked: item.goods_id === sku.goods_id }' v-for='(item, index) in goods.SKUList' :key='index' @click='changeSku(item)'>{{item.goods_spec || '无'}}</div>
          </div>
        </scroll-view>
        <div class='modal_row'>
          <div class=''>购买数量</div>
          <div class='count'>
            <div class='number_box' @click='minus'><image src='/static/minus.png' style='width: 20rpx; height: 2rpx; margin-right: 20rpx;' /></div>
            <div class='number'>{{goods.qty}}</div>
            <div class='number_box' @click='add'><image src='/static/add.png' style='width: 20rpx; height: 20rpx; margin-left: 20rpx;' /></div>
          </div>
        </div>
        <div class='modal_row' v-if="goods.gc_name === '项目经理' ">温馨提示：项目经理服务最少购买1天。</div>
        <div class='modal_row' v-else-if="goods.gc_name === '施工员' ">温馨提示：施工员服务最少购买10平。</div>
        <div class='modal_row' v-else></div>
        <div class='bottom'>
          <div class='s-fc-1 s-bg-2' @click='addCart'>加入购物车</div>
          <div class='s-fc-1 s-bg-3' @click='goSubmit'>立即购买</div>
        </div>
        <image class='close' src='/static/goods/close.png' @click='hideModal' />
      </div>
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
      userInfo: {},
      config: {
        title: '商品详情',
        color: '#222',
        bg: '#fff',
        backImg: '/static/left_arrow.png'
      },
      slideConfig: {
        height: '750rpx',
        autoplay: false,
        data: []
      },
      id: null,
      goods: {},
      sku: null,
      commentList: [],
      commentTotal: 0,
      commentPage: 1,
      barList: [
        { title: '客服', img: '/static/goods/concat.png', type: 'concat' },
        { title: '购物车', img: '/static/goods/shoppingCart.png' }
      ],
      isDesign: false,
      isAppoinment: false, // 是否为预约
      next: '', //
      isShowModal: false,
      appoinment: {
        date: '',
        content: ''
      },
      currentDate: '',
      endDate: ''
    }
  },

  components: {
    topBar,
    slide
  },

  computed: {
    getSale () { return this.goods.SKUList && this.goods.SKUList.reduce((p, v) => p + v.goods_salenum, 0) },
    getStorage () { return this.goods.SKUList && this.goods.SKUList.reduce((p, v) => p + v.goods_storage, 0) },
    getSkuPrice () { return this.sku && this.sku.goods_price },
    getContentLength () { return this.appoinment.content.length },
    isIos () { return wx.getStorageSync('isIos') }
  },

  methods: {
    showModal () { this.isShowModal = true },
    hideModal () { this.isShowModal = false },
    changeSku (item) {
      this.sku = item
      this.goods.qty = 1
    },
    minus () { this.goods.qty > 1 ? this.goods.qty-- : wx.showModal({ content: '商品数量至少为1', showCancel: false }) },
    add () { this.goods.qty++ },
    async addCart () {
      if (this.goods.gc_name === '施工员' && this.goods.qty < 10) {
        return wx.showModal({ content: '施工员服务最少购买10平。' })
      }

      if (!this.isAppoinment && ['家政保洁', '项目经理', '施工员'].indexOf(this.goods.gc_name) !== -1) {
        this.isAppoinment = true
        this.next = 'cart'
        return this.initDate()
      }
      this.isAppoinment = false

      let param = {
        goods_id: this.sku.goods_id,
        quantity: this.goods.qty,
        remark: [this.appoinment.date, this.appoinment.content]
      }

      let res = await api.addCart(param)
      res ? wx.showToast({ title: '添加成功', duration: 2000 }) : wx.showToast({ title: '添加失败', icon: 'none', duration: 2000 })
      this.appoinment.date = '' // clear appoinment
      this.appoinment.content = ''
    },
    goSubmit () {
      if (this.goods.gc_name === '施工员' && this.goods.qty < 10) {
        return wx.showModal({ content: '施工员服务最少购买10平。' })
      }

      if (!this.isAppoinment && ['家政保洁', '项目经理', '施工员'].indexOf(this.goods.gc_name) !== -1) {
        this.isAppoinment = true
        this.next = 'submit'
        return this.initDate()
      }
      this.isAppoinment = false

      this.appoinment.date = '' // clear appoinment
      this.appoinment.content = ''

      this.goods.sku = this.sku
      console.log('sumbit', this.goods)
      wx.navigateTo({
        url: `/pages/submit/main?goods=${encodeURIComponent(JSON.stringify(this.goods))}`
      })
    },
    submitAppoinment () {
      console.log('appoinment', this.goods, this.appoinment)
      if (this.appoinment.date === '' || this.appoinment.content === '') {
        return wx.showModal({ content: '请完善预约信息', showCancel: false })
      }

      this.goods.appoinment = JSON.parse(JSON.stringify(this.appoinment))
      this.next === 'cart' ? this.addCart() : this.goSubmit()
    },
    setDate (e) {
      this.appoinment.date = e.mp.detail.value
      console.log(this.appoinment)
    },
    setContent (e) {
      if (this.appoinment.content.length >= 120) {
        return wx.showModal({ content: '内容不能超过120个字符', showCancel: false })
      }

      this.appoinment.content = e.mp.detail.value
      console.log(this.appoinment)
    },
    go (item) {
      if (item.title !== '购物车') return null

      wx.navigateTo({ url: '/pages/shoppingCart/main' })
    },
    initDate () {
      this.currentDate = new Date().toISOString().split('T')[0]
      // this.endDate = this.currentDate.split('-').reduce((p, v) => { return `${p}-${Number(v) > 31 ? Number(v) + 1 : v}` }, '')
      let date = this.currentDate.split('-')
      this.endDate = Number(date[1]) === 12 ? `${Number(date[0]) + 1}-1-${date[2]}` : `${date[0]}-${Number(date[1]) + 1}-${date[2]}`
      console.log(this.currentDate, this.endDate)
    },
    async getGoods () {
      wx.showLoading({ title: 'Loading...' })

      let res = await api.getGoods(this.id)

      res.qty = 1
      // res.appoinment = this.appoinment
      this.goods = res
      this.sku = this.goods.SKUList[0]
      this.slideConfig.data = res.goodsimagesList.map(v => { return { img: v.goodsimage_url } })

      this.getCommentList(this.commentPage = 1)

      wx.hideLoading()
    },
    loadComment () {
      this.getCommentList(++this.commentPage)
    },
    async getCommentList () {
      let list = this.goods.SKUList

      for (let i = 0, len = list.length; i < len; i++) {
        let param = {
          goods_id: list[i].goods_id,
          page: this.commentPage,
          limit: 2
        }

        let res = await api.getCommentList(param)

        res.data.forEach(function (v) {
          v.imgs = v.geval_image !== '' ? JSON.parse(v.geval_image) : []
        })
        this.commentList = this.commentList.concat(res.data)
        this.commentTotal = res.pagination.total
      }
    }
  },

  created () {
    if (!wx.getStorageSync('userInfo')) {
      // wx.reLaunch({
      //   url: '/pages/authorization/main?referer=/pages/index/main'
      // })
    }
    console.log('reLaunch')
  },

  onLoad (params) {
    this.id = params.id
    this.isDesign = params.isDesign

    this.isAppoinment = false
    this.isShowModal = false
    this.sku = null
    this.commentList = []

    this.getGoods()
  },

  // onPullDownRefresh () {
  //   wx.reLaunch({
  //     url: '/pages/index/main'
  //   })
  // }
  onShareAppMessage () {

  }

}
</script>

<style scoped>
.wrap{
  width: 100%;
  font: 28rpx 'PingFang-SC-Medium'; 
  color: #222;
  background: #f5f5f5;
}

.goods_info{
  width: 100%;
  height: 186rpx;
  padding: 20rpx 20rpx 0;
  background: #fff;
}
.goods_name{
  font-size: 32rpx;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.goods_price{
  margin: 30rpx 0 0;
  font-size: 37rpx;
}

.row{
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  height: 88rpx; 
  margin: 20rpx 0 0; 
  padding: 0 20rpx; 
  background: #fff;
}

.comment_wrap{
  margin: 20rpx 0 0;
  padding: 20rpx 20rpx 0;
  background: #fff;
}
.user_img{
  width: 50rpx;
  height: 50rpx;
  background: #ccc;
}
.comment_img{
  width: 226rpx;
  height: 226rpx;
  margin: 20rpx 6rpx 0 0;
  background: #ccc;
}
.more{
  height: 100rpx;
  line-height: 100rpx;
  background: #fff;
}
.btn{
  width: 180rpx;
  height: 50rpx;
  line-height: 50rpx;
  margin: 25rpx auto 0;
  border: 1rpx solid #786578;
  border-radius: 25rpx;
  text-align: center;
}

.detail_wrap{
  margin: 20rpx 0 100rpx;
  padding: 0 20rpx;
  background: #fff;
}
.detail_img{
  width: 100%;
  height: 500rpx;
  background: #ccc;
}

.bottom_bar{
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100rpx;
  padding: 0 20rpx;
  background: #fff;
  text-align: center;
}
.type_btn{
  line-height: 1.2;
  padding: 0;
  border: none;
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
.appoinment_btn{
  width: 560rpx;
  height: 76rpx;
  line-height: 76rpx;
  border-radius: 10rpx;
  font-size: 30rpx;
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
    height: 700rpx;
    padding: 20rpx;
    background: #fff;
  }
  .content .close{
    position: absolute;
    top: 30rpx;
    right: 25rpx;
    width: 26rpx;
    height: 26rpx;
  }
  .content .goods_thub{
    width: 180rpx;
    height: 180rpx;
    background: #ccc;
  }

  .sku{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 30rpx 0 0;
    padding: 0 30rpx;
  }
  .sku_item{
    flex-shrink: 0;
    box-sizing: border-box;
    min-width: 150rpx;
    margin: 10rpx 30rpx 10rpx 0;
    padding: 15rpx 30rpx;
    border-radius: 26rpx;
    font-size: 22rpx;
    text-align: center;
  }
  .checked{
    background: #eee;
  }

  .modal .modal_row{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 88rpx;
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
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 30rpx 0 0;
    padding: 0 30rpx;
    font-size: 34rpx;
    text-align: center;
  }
  .picker{
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 630rpx;
    height: 88rpx;
    margin: 30rpx auto 0;
    padding: 0 10rpx;
    border: 1rpx solid #969696;
    border-radius: 10rpx;
    color: #b6b6b6;
    font-size: 30rpx;
  }
  .picker_icon{
    width: 24rpx;
    height: 14rpx;
  }
  .textarea{
    position: relative;
    width: 630rpx;
    height: 200rpx;
    margin: 30rpx auto 0;
    border: 1rpx solid #969696;
    border-radius: 10rpx;
  }
  textarea{
    width: 630rpx;
    height: 200rpx;
    padding: 30rpx 0 0 30rpx;
  }
  .textarea_count{
    position: absolute;
    right: 10rpx;
    bottom: 20rpx;
  }
  .submit_btn{
    width: 360rpx;
    height: 70rpx;
    line-height: 70rpx;
    margin: 30rpx auto;
    border-radius: 10rpx;
    text-align: center;
  }

.count{
  display: flex;
  align-items: center;
}
.number_box{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 58rpx;
  height: 58rpx;
}
.number{
  width: 80rpx;
  height: 58rpx;
  line-height: 58rpx;
  border: 1rpx solid #e6e6e6;
  border-radius: 10rpx;
  text-align: center;
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
  color: #222;
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
  color: #a4a4a4;
}
.s-bg-2{
  background: #d6c1d2;
}
.s-bg-3{
  background: #786578; 
}
</style>
