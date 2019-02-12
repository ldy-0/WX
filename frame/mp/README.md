# mpvue 
`常用`

[TOC]

## 目录

  #### 1. components/组件
  1. [slide/轮播图](#slide)

  #### 2. notes/笔记

***

## component
  
  + slide
    > 轮播图 
    ### 属性
      - config : Object  
      
        #### 配置属性 
      
          |属性名|类型|默认|描述|
          |------|-----|------|-------|
          | `data` | Array | - | 数据(数组中每项为一个对象，对象必须有img属性) |
          | `height` | Number | 476 | 高度 |
          | `indicatorDots` | Boolean | true | 是否显示面板指示点 |
          | `indicatorActiveColor` | String | '#fff' | 当前选中的指示点颜色 |

      - go : [Function] 
        > 点击回调函数

    #### 例子 
    ```js

      <!--  -->
      <slider :config.sync='swiperConfig' @go='callback'></slider>
      <!-- 配置对象 -->
      swiperConfig: {
        data: [
          { img: '', }
        ],
      },

    ```

  + 顶部栏 / topBar
    ### 属性
      - config: object
      
        #### 配置属性 
      
          |属性名|类型|默认|描述|
          |------|-----|------|-------|
          | `onlyLeft` | Boolean | false | 设置顶部栏内容排列方式(onlyLeft为true时，顶部栏内容左对齐，否则居中对齐) |
          | `title` | String | '' | 设置顶部栏的主内容(当onlyLeft为true时，主内容居左) |
          | `leftTitle` | String | '' | 设置顶部栏的左端内容(仅在onlyLeft为true时有效) |
          | `rightTitle` | String | '' | 设置顶部栏的右端内容 |
          | `height` | String | '130rpx' | 设置顶部栏高度 |
          | `color` | String | 无 | 设置顶部栏字体颜色 |
          | `bg` | String | 无 | 设置顶部栏背景颜色 |
 
  + modal 
    ### 属性
      - config: object
      
        #### 配置属性 

          |属性名|类型|默认|描述|
          |------|-----|------|-------|
          | `width` | String | '' | 设置弹窗宽度(当设置width时，弹窗居中对齐，否则底部对齐) |
          | `height` | String | '' | 设置弹窗高度 |
          | `noClose` | Boolean | false | 设置点击弹窗遮罩层时是否触发click事件 |

      - click: [Function]
        > 点击遮罩层时触发

## notes

## FAQ/常见问题

   * ### config

      1. page blank  

          解决方法：在页面中添加下面代码
          ```javascript
            onReady () {
              wx.showLoading({ title: 'Loading' })

              setTimeout(() => wx.hideLoading(), 1000)
            }
          ```

      2. 开发工具外部预览,打包时提示"error: /app.json not find"  

          原因：dist目录被删除重建  
          解决方法： 开发工具指定路径改为dist上级目录  
          详情：[开发者工具外部预览时提示"error: /app.json not find"](https://developers.weixin.qq.com/community/develop/doc/000664874d08b0d03c672cd6a57000?highLine=app.json%2520not%2520found)

## 获取/Get 
`git clone https://github.com/person-0/wx.git`
