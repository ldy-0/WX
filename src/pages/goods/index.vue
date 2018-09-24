<template>
  <div class="container">

    <topBar :config='config'></topBar>

    <div class='wrap'>

      <slide :config='slideConfig'></slide>

      <div class='goods_info'>
        <div class='goods_name'>{{goods.name}}</div>
        <div class='goods_price s-fc-4'>{{goods.price}}</div>
        <div style='display: flex; align-items: center;' v-if='isVirtual'>
          <image style='width: 26rpx; height: 26rpx; background: #ccc;' src='' />
          <div>4.5</div>
        </div>
        <div class='s-fc-5' style='margin: 20rpx 0 0; font-size: 24rpx;' v-else>
          <span>{{goods.scale}}</span>
          <span style='margin-left: 170rpx;'>{{goods.qty}}</span>
        </div>
      </div>

      <div style='display: flex; justify-content: space-between; align-items: center; height: 88rpx; margin: 20rpx 0 0; padding: 0 20rpx; background: #fff;' v-if='!isVirtual'>
        <div>规格</div>
        <image class='right_arrow' src='' />
      </div>

      <div class='comment_wrap'>
        <div>宝贝评价(9666)</div>
        <div v-for='(item, index) in commentList' :key='index'>
          <div style='display: flex; margin: 20rpx 0 0;'>
            <image class='user_img' src='' />
            <div class='user_name' style='margin-left: 20rpx;'>nnamenamenamenameame</div>
          </div>
          <div style='margin: 10rpx 0 0;'>产品作用很快就凸显出来了，很开心能买到这么好的产品，后期会继续购买继续关注的！</div>
          <image class='comment_img' src='' />
        </div>
        <div style='height: 100rpx; overflow: hidden;'><div class='btn s-fc-3'>查看评论</div></div>
      </div>

      <div class='detail_wrap'>
        <div style='height: 68rpx; line-height: 68rpx; font-size: 30rpx; color: #333; text-align: center;'>商品详情</div>
        <div style='margin-bottom: 30rpx;'>如果你无法简洁的表达你的想法，那只能够说明你还不够了解它。--阿尔伯特·爱因斯坦</div>
        <image class='detail_img' v-for='(item, index) in slideConfig.data' :key='index' />
      </div>

      <div class='bottom_bar' v-if='isVirtual'>
        <div style='flex-grow: 1; display: flex; justify-content: center;'>
          <div>
            <image class='bottom_icon' src='' />
            <div style='font-size: 20rpx;'>{{barList[0].title}}</div>
          </div>
        </div>
        <div class='appoinment_btn s-fc-1 s-bg-3' @click="showModal">立即预约</div>
      </div>
      <div class='bottom_bar' v-else>
        <div class='left'>
          <div v-for='(item, index) in barList' :key='index'>
            <image class='bottom_icon' src='' />
            <div style='font-size: 20rpx;'>{{item.title}}</div>
          </div>
        </div>
        <div class='bottom_btn'><div class='s-fc-1 s-bg-2' @click="showModal">加入购物车</div></div>
        <div class='bottom_btn'><div class='s-fc-1 s-bg-3' @click='showModal'>立即购买</div></div>
      </div>
      

    <div class='modal' v-if='isShowModal'>
      <div class='mask' @click='hideModal'></div>
      <div class='content_center' v-if='isVirtual'>
        <div class='content_title'>预约信息</div>

          <picker mode="date" :value="date" start="2015-09-01" end="2017-09-01" @change="setDate">
            <view class="picker">
              <view>请选择服务日期: {{date}}</view>
              <image class='picker_icon' src='' />
            </view>
          </picker>

        <div class='textarea'>
          <textarea placeholder="备注" placeholder-style='margin-left: 30px;'>
          
          </textarea>
          <div class='textarea_count'>0/120</div>
        </div>

        <div class='submit_btn s-fc-1 s-bg-3' @click='goSubmit'>提交</div>
      </div>
      <div class='content' v-else>
        <div style='display: flex;'>
          <image class='goods_thub' src='' />
          <div class='s-fc-6' style='margin-left: 40rpx; font-size: 37rpx;'>1434</div>
        </div>
        <div class='modal_row'>
          <div class=''>购买数量</div>
          <div class='count'>
            <div>-</div>
            <div class='number'>1</div>
            <div>+</div>
          </div>
        </div>
        <div class='modal_row'>温馨提示：项目经理服务最少购买1天。</div>
        <div class='bottom'>
          <div class='s-fc-1 s-bg-2'>加入购物车</div>
          <div class='s-fc-1 s-bg-3'>立即购买</div>
        </div>
      </div>
    </div>
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
        height: '750rpx',
        autoplay: false,
        data: [
          { img: '/static/toolBar/classify.png' },
          { img: '/static/toolBar/home.png' }
        ]
      },
      goods: {},
      commentList: [
        { title: '购物车', phone: 13211111111, img: '' },
        { title: '我的卡劵', phone: 13111111111, address: 'sfksdfkKSDFM<lsk破开神佛考生的分数都快发送的看法实力派v感慨地说佛v觉得佛教给vi的风景sfsdfjkd', img: '' },
        { title: '地址管理', img: '', url: 'pages/addressList/main' },
        { title: '整居定制', img: '' },
        { title: 'aksfdosdfojsdfcv', img: '' }
      ],
      barList: [
        { title: '客服', img: '' },
        { title: '购物车', img: '' }
      ],
      isVirtual: true,
      isShowModal: false,
      date: ''
    }
  },

  components: {
    topBar,
    slide
  },

  methods: {
    showModal () {
      this.isShowModal = true
    },
    hideModal () {
      this.isShowModal = false
    },
    setDate (e) {
      this.date = e.mp.detail.value
      console.log(e)
    },
    goSubmit () {
      wx.navigateTo({
        url: '/pages/submit/main?goods=goods'
      })
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

  onLoad (params) {
    this.goods = {
      name: '看到放送控股快速打开v功德佛楼盘数量大幅v哦的上空飞过v哦梵蒂冈v顺利破发v看到法国v端口sf',
      price: 123324930,
      qty: 192334,
      scale: 34504935
    }
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
  margin: 20rpx 0 0;
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
.appoinment_btn{
  width: 560rpx;
  height: 76rpx;
  line-height: 76rpx;
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
    height: 456rpx;
    padding: 20rpx;
    background: #fff;
  }
  .content .goods_thub{
    width: 180rpx;
    height: 180rpx;
    background: #ccc;
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
    margin: 30rpx 0 0;
    font-size: 34rpx;
    text-align: center;
  }
  .picker{
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
    background: #ccc;
  }
  .textarea{
    position: relative;
    width: 630rpx;
    height: 200rpx;
    margin: 30rpx auto 0;
    border: 1rpx solid #969696;
    border-radius: 10rpx;
  }
  .textarea_count{
    position: absolute;
    bottom: 0rpx;
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
.s-bg-2{
  background: #d6c1d2;
}
.s-bg-3{
  background: #786578; 
}
</style>
