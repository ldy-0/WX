<template>
  <div class="container">

    <topBar :config='config' title='首页'></topBar>

    <div class='wrap'>

      <div class='goods'>
        <image class='goods_thub' src='' />
        <div class='goods_detail'>
          <div class='goods_name s-fc-6'>sdkfjsdfoPksdfksodf考的排放口双方的山坡v可是东方十六分v【判断是非判断是否sdfsdfsdkf</div>
          <div class='goods_price s-fc-5'>8345.2934</div>
        </div>
      </div>

      <div class='star'>
        <div class='s-fc-4' style='margin: 0 30rpx;'>评分</div>
        <image class='star_icon' :src="level < index + 1 ? '/static/star.png' : '/static/star_sel.png' " v-for='(item, index) in levelList' :key='index' @click='changeLevel(index + 1)' />
      </div>

      <div class='textarea_wrap'>
        <textarea class='textarea' placeholder="请输入评论..." ></textarea>
        <div class='box' @click='addImg'>
          <image src='' style='width: 54rpx; height: 60rpx; margin: 20rpx 0 0;' src='/static/goods/icon_1_xiangji@2x.png' />
          <div>添加图片</div>
        </div>
      </div>

      <div class='btn s-fc-1'>提交</div>
      

    </div>

    <!-- <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div> -->

    <!-- <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a> -->
  </div>
</template>

<script>
import topBar from '@/components/topBar'
import slide from '@/components/slide'
import goods from '@/components/goods'

export default {
  data () {
    return {
      userInfo: {},
      config: {
        title: '评价',
        color: '#fff',
        bg: '#937d8a',
        backImg: '/static/back_gray.png'
      },
      goodsConfig: {
        padding: '20rpx 0 0',
        hidePrice: true
      },
      classList: [
        { title: '全部' },
        { title: '待退款' },
        { title: '已完成' }
      ],
      list: [
        { title: 'aksfdosdfojsdfcv', goods: { name: 'sdksdfodsfkoksdf开始大幅攀升地ffsd', price: 143.45234, qty: 3455 } },
        { title: 'aksfdosdfojsdfcv', goods: { name: 'sdksdfodsfkoksdf开始大幅攀升地ffsd', price: 143.45234, qty: 3455 } }
      ],
      currentClass: '全部',
      level: 3,
      levelList: [0, 0, 0, 0, 0]
    }
  },

  components: {
    topBar,
    slide,
    goods
  },

  methods: {
    goGoods () {
      wx.navigateTo({
        url: '/pages/goods/main?id=a'
      })
    },
    changeLevel (index) {
      console.log(index)
      this.level = index
    }
  },

  created () {
    
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
  height: 100%;
  font: 28rpx 'PingFang-SC-Medium';
  background: #f5f5f5;
}

.goods{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 182rpx;
  padding: 0 30rpx;
  background: #fff;
}
.goods_thub{
  flex-shrink: 0;
  width: 121rpx;
  height: 121rpx;
  background: #ccc;
}
.goods_detail{
  margin-left: 25rpx;
  overflow: hidden;
}
.goods_name{
  margin-bottom: 50rpx;
  text-overflow: ellipsis;
  overflow: hidden; 
  white-space: nowrap;
}

.star{
  display: flex;
  height: 100rpx;
  background: #fff;
}
.star_icon{
  width: 36rpx;
  height: 36rpx;
}

.textarea_wrap{
  position: relative;
  height: 500rpx;
  background: #fff;
}
.textarea{
  padding: 30rpx 0 0 30rpx;
}
.box{
  position: absolute;
  left: 30rpx;
  bottom: 30rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 162rpx;
  height: 162rpx;
  border: 1rpx dashed #d9d9d9;
  border-radius: 3rpx;
}

.btn{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 94rpx;
  line-height: 94rpx;
  background: #786578; 
  text-align: center;
}

.s-fc-1{
  color: #fff;
}
.s-fc-2{
  color: #888;
}
.s-fc-3{ 
  color:#666; /* tab_item */
}
.s-fc-4{ 
  color: #222;
}
.s-fc-5{
  color: #ff4444; 
}
.s-fc-6{
  color: #333;
}
</style>
