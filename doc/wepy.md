
wepy
1. 类写法

- variable
  1. page中variable未在data中声明，重加载页面variable维持原值
  2. methods中的方法不能直接通过this访问

- directive
  1. wx:for中的item是备份，不是原对象

- component 
  1. 同页面多次引用一个组件，需要components多次声明
  2. 传值给子组件，如果传递是一个对象的属性，在子组件中js中值为undefined
  3. 不支持多级属性传值
  4. 组件中props中声明的变量名与组件名重复时，js中获取props变量为undefined

<!-- 传数组给子组件，直接在data中设置数组数据，数据不渲染 -->
<!-- - 只能在双引号中使用单引号 -->

兼容性:
1. android旧机型页面加载白屏问题
2. 日期格式问题 ios不支持iso写法，小米只支持UTC
3. android 4.4以下不支持delete请求方式
https://blog.csdn.net/yeshennet/article/details/79630316
4. android 4.4一下不支持tls1.2及以上版本
https://blog.csdn.net/txx_c/article/details/78949896

[视频默认全屏](https://www.cnblogs.com/MainActivity/p/9283617.html)  
[退出小程序](https://www.jianshu.com/p/d2223364bc15)  
[隐藏微信小程序剪贴板提示](https://www.cnblogs.com/webonline/p/9205358.html)  
授权：https://blog.csdn.net/onil_chen/article/details/77853942


<!-- mpvue 注意事项
1. 组件引入后，更改组件引用名，组件不重新加载
components: { sss: slider } 中途改为 { ssss: slider } ssss没有和slider关联
解决方法：删除dist文件夹
2. 组件不要与html，小程序标签重名
3.添加新页面，需要重新编译 -->