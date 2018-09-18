# 小程序开发项目基本框架
## 项目目录
```
├── dist                       小程序运行代码目录（该目录由gulp指令自动编译生成，请不要直接修改该目录下的文件）
├── node_modules               执行npm install 后生成的依赖文件夹 
├── src                        代码编写的目录（该目录为开发目录）
|   ├── components             组件目录（组件不属于完整页面，仅供完整页面或其他组件引用）
|   |   ├── com_a.wpy          可复用的组件a
|   |   └── com_b.wpy          可复用的组件b
|   ├── constant               项目全局变量配置文件夹
|   |   ├── configTemplate.js  项目开发必填（测试、正式服务器地址、登录接口、用户资料接口）
|   |   ├── regExpConstant.js  常用正则表达式
|   |   └── storageConstant.js 自定义全局变量
|   ├── pages                  页面目录（属于完整页面）
|   |   ├── index.wpy          index页面（经build后，会在dist目录下的pages目录生成index.js、index.json、index.wxml和index.wxss文件）
|   |   └── other.wpy          other页面（经build后，会在dist目录下的pages目录生成other.js、other.json、other.wxml和other.wxss文件）
|   └── app.wpy                小程序配置项（全局数据、样式、声明钩子等；经build后，会在dist目录下生成app.js、app.json和app.wxss文件）
└── package.json               项目的package配置
```
## 开发前准备
 * 开始项目时需在[configTemplate.js](..\src\constant\configTemplate.js)文件中配置好项目的相关参数
    >在[腾讯文档](https://docs.qq.com/sheet/BqI21X2yZIht16aEvJ2OmCjn1V9HaE4ejMTJ1ikqaA01VCbM4)中根据所需开发项目的订单号可查看该项目的开发必备信息
  * 验证所获取的信息是否正确（如appid和	secret是否正确）
    >[在线验证](https://mp.weixin.qq.com/debug/cgi-bin/apiinfo?t=index&type=%E5%9F%BA%E7%A1%80%E6%94%AF%E6%8C%81&form=%E8%8E%B7%E5%8F%96access_token%E6%8E%A5%E5%8F%A3%20/token&token=&lang=zh_CN)

## 运行项目
* 安装依赖包： `npm install`
* 本地测试开发环境： `gulp`
  > 执行后会生成一个dist文件包，该目录由gulp指令自动编译生成，请不要直接修改该目录下的文件
* 微信开发者工具运行项目：[详细教程](https://docs.qq.com/doc/DcElWR1dzWkpHT0Ju)

 
## 发布项目
* 发布项目：`gulp -p`
  > 执行后会生成一个压缩代码后的dist文件包，由gulp -p指令自动编译生成，请不要直接修改该目录下的文件
* 微信开发者工具发布项目：[详细教程](https://docs.qq.com/doc/DUXhpV0toY2FWU0ds)

## 自有js库
* 库名：`http.js`
  * 功能：`数据请求的get、put、post、detile的封装`
  * 文档： [查看使用范例](http://118.31.48.192/minivictory/appletofWeChat/blob/master/manual/http.md)
  * 备注:

## 三方js库
* 库名：`Day.js`
  - 功能：`Day.js有很多API 来解析、处理、校验、增减、展示时间和日期`
  - 文档： [查看使用文档](https://github.com/iamkun/dayjs/blob/HEAD/docs/zh-cn/README.zh-CN.md)
  - 备注:

* 库名：`calculatorjs.js`
  - 功能：`算术计算`
  - 文档： [查看使用文档](https://github.com/fzred/calculatorjs/blob/master/README-ZH.md)
  - 备注:

## 组件



备注： 有好的自有js库、三方js库、组件可以往这添加积累以供大家一起使用，提升开发效率😁
  



