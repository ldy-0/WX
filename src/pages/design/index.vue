<template>
  <div class="container">

    <topBar :config='config' title='首页'></topBar>

    <!-- <slide :config='slideConfig'></slide> -->

    <div class='tab'>
      <div class='tab_item s-fc-3' :class='{ checked: item.title === currentClass }' v-for='(item, index) in classList' :key='index' @click='change'>{{item.title}}</div>
    </div>

    <div class='list_wrap'>
      <div class='row' v-for='(row, i) in list' :key='i'>
        <div class='item' v-for='(item, index) in row' :key='index' @click='goGoods(index)'>
          <img class='item_img' src='' />
          <div class='item_desc'>
            <div class='item_title s-fc-4'>{{item.title}}</div>
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
        title: '设计师+',
        color: '#fff',
        bg: '#937d8a',
        backImg: '/static/back_gray.png'
      },
      classList: [
        { title: '设计师+监理师' },
        { title: '设计师+搭配师' },
        { title: '设计师+易居学院' }
      ],
      list: [
        [ { title: '设计师+skdfj老师开发商的风控但是佛挡杀佛可是大佛国际饭店根本就没法的保密', img: '' }, { title: '半包定制', img: '' } ],
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

.container{
  font-family: 'PingFang-SC-Medium';
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
.item_title{
  height: 72rpx;
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
</style>
