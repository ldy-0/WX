## 微信小程序

#### UI
- view
    1. \r\n无效，text中有效
- input
    1. [focus闪屏问题](https://blog.csdn.net/luoyumeiluoyumei/article/details/81509694)
- image
    1. [微信小程序多张image图片排列有空隙解决方案](http://www.mamicode.com/info-detail-1729479.html)
- canvas 
    1. 不能显示base64图片
- 顶部栏  
    [状态栏+标题栏(胶囊按钮高度32px + 状态栏到胶囊按钮间距 * 2(Android: 8, ios: 6))](https://www.jb51.net/article/158860.htm)


#### package
1. 普通分包的所有限制都对独立分包有效。独立分包隶属于普通分包
2. 独立分包中不能依赖主包和其他分包中的内容,如：js文件、template、wxss、自定义组件、插件等,

#### api
- android7.0.0-7.0.6: 支付接口调用后会触发onshow回调(支付失败触发一次，支付成功触发两次): 
https://developers.weixin.qq.com/community/develop/doc/0006466c7fc2303f2f08a78795b800?highLine=onshow%2520%25E6%2589%25A7%25E8%25A1%258C2%25E6%25AC%25A1
- wx.createSelectorQuery()
    获取的top(距离屏幕顶)
- onPageScroll
    获取的top(距离顶部栏)

#### error
1.  getLocation:fail 1  
https://developers.weixin.qq.com/community/develop/doc/00080cd5c44158254d9704f4e51000

2.  预览或上传时: selectedIconPath=images/tab/my_sel.png, file not found  
原因：文件名包含tab  
https://developers.weixin.qq.com/community/develop/doc/0004022429c5f0e2fa17e3de15b000

3.  fail ssl hand shake error  
原因：证书链部署不完全导致   
https://blog.51cto.com/leoheng/2376032


#### 开发工具与真机区别
1.  图片路径  
开发工具ignore大小写，真机区别大小写