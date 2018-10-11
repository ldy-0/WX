# mpvue 
`常用`

## 

## 组件 / component
  
  + 轮播图 / slide
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
 
## 获取/Get 
`git clone https://github.com/person-0/wx.git`
