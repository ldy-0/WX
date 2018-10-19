<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // console.log('app created and cache logs by setStorageSync')
    let system = wx.getSystemInfoSync()
    console.log('system', system)
    if (/iPhone X/.test(system.model)) wx.setStorageSync('isIos', true)
  }
}
</script>

<style>
page{
  height: 100%;
}

.container {
  height: 100%;
  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: center; */
  /* justify-content: space-between; */
  /* padding: 130rpx 0 0; */
  /* margin: 130rpx 0 0; */
  box-sizing: border-box;
}
/* 兼容iphoneX顶部栏 */
.ios{
  /* margin: 180rpx 0 0; */
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
