<template>
  <div class="container">

    <topBar :config='config' title='首页'></topBar>

    <div class='wrap'>

      <div class='search'>
        <image class='search_icon' src='' />
        <div class='search_content s-fc-2'>搜索</div>
      </div>

      <swiper class='class_wrap' :indicator-dots="false" :autoplay="false" :interval="interval" :duration="2000">
        <block v-for="(row, index) in classList" :key='index'>
          <swiper-item >
            <view class='class_row'>
              <view class='class_item checked s-fc-6' v-for='(item, i) in row' :key='i'>{{item.title}}</view>
            </view>
          </swiper-item>
        </block>
      </swiper>
      <swiper class='class_wrap' :indicator-dots="false" :autoplay="false" :interval="interval" :duration="2000">
        <block v-for="(row, index) in classList" :key='index'>
          <swiper-item >
            <view class='class_row'>
              <view class='class_item checked s-fc-6' v-for='(item, i) in row' :key='i'>{{item.title}}</view>
            </view>
          </swiper-item>
        </block>
      </swiper>

      <div class='list_wrap'>
        <div class='row' v-for='(row, i) in list' :key='i'>
          <div class='item' v-for='(item, index) in row' :key='index' @click='goGoods(index)'>
            <img class='item_img' src='' />
            <div class='item_desc'>
              <div class='item_title s-fc-4'>{{item.title}}</div>
              <div class='item_price s-fc-5'>{{item.price}}</div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div> -->

    

    <!-- <div class='modal'>
      <div class=''></div> 
    </div> -->

    <!-- <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form> -->
    <!-- <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a> -->
  </div>
</template>

<script>
import card from '@/components/card'
import topBar from '@/components/topBar'
import slide from '@/components/slide'

export default {
  data () {
    return {
      userInfo: {},
      config: {
        title: '家具选购',
        color: '#fff',
        bg: '#937d8a',
        backImg: '/static/back_gray.png'
      },
      classList: [
        [ { title: '餐厅系列' },
          { title: '客厅系列' },
          { title: '客厅系列' },
          { title: '书房系列' } ],
        [ { title: 'a厅系列' },
          { title: '客b系列' },
          { title: '客厅系列' },
          { title: '设计师+' } ]
      ],
      list: [
        [ { title: '设计师+skdfj老师开发商的风控但是佛挡杀佛可是大佛国际饭店根本就没法的保密', price: '3495043.45', img: '' }, { title: '半包定制', img: '' } ],
        [ { title: '易居管家', img: '' }, { title: '整居定制', img: '' } ],
        [ { title: 'aksfdosdfojsdfcv', img: '' } ]
      ],
      currentClass: '设计师+监理师'
    }
  },

  components: {
    card,
    topBar,
    slide
  },

  methods: {
    goGoods () {
      wx.navigateTo({
        url: '/pages/goods/main?id=a'
      })
    },
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    }
  },

  created () {
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

.container{
  font-family: 'PingFang-SC-Medium';
}

.wrap{

}

.search{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 610rpx;
  height: 76rpx;
  line-height: 76rpx;
  margin: 30rpx auto 0;
  border: 1rpx solid #eee;
  text-align: center;
}
.search_icon{
  width: 28rpx;
  height: 28rpx;
}
.search_content{
  font-size: 28rpx;
}

.class_wrap{
  height: 86rpx;
}
.class_row{
  display: flex;
  align-items: center;
  margin: 30rpx 0 0;
  padding: 0 30rpx;
}
.class_item{
  width: 144rpx;
  height: 52rpx;
  line-height: 52rpx;
  margin-right: 30rpx;
  border-radius: 26rpx;
  font-size: 22rpx;
  text-align: center;
}
.checked{
  background: #eee;
}

.tab{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 88rpx;
  background: #fff;
}
.tab_item{
  height: 86rpx;
  line-height: 86rpx;
  font-size: 30rpx;
  font-weight: bold;
}
.checked{
  border-bottom: 2rpx solid #937d8a;
}

.list_wrap{
  padding: 0 20rpx;
  background: #fff;
}
.row{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30rpx 0 0;
}
.item{
  flex-shrink: 0;
  width: 350rpx;
  height: 480rpx;
  background: #fff;
  border-radius: 10rpx;
  box-shadow: 0rpx 1rpx 7rpx rgba(0, 0, 0, 0.15);
}
.item_img{
  width: 350rpx; 
  height: 350rpx;
  background: #ccc;
}
.item_title, .item_price{
  height: 36rpx;
  line-height: 36rpx;
  margin: 20rpx 0 0 20rpx;
  font-size: 28rpx;
  overflow: hidden;
}

.s-fc-1{
  color: #fff;
}
.s-fc-2{
  color: #999;
}
.s-fc-3{ 
  color:#322a2b; /* tab_item */
}
.s-fc-4{ 
  color: #666;
}
.s-fc-5{
  color: #ff4444; 
}
.s-fc-6{
  color: #131313;
}
</style>
