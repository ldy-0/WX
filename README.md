# 小程序开发项目基本框架
# castrol小程序
# APPID：wxfbd09955158d47fc
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
## 运行项目
* 安装依赖包： `npm install`
* 本地测试开发环境： `gulp`
  > 执行后会生成一个dist文件包，该目录由gulp指令自动编译生成，请不要直接修改该目录下的文件


## 发布项目
* 发布项目：`gulp -p`
  > 执行后会生成一个压缩代码后的dist文件包，由gulp -p指令自动编译生成，请不要直接修改该目录下的文件