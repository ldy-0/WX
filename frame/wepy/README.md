# 微信小程序通用库
`提供一些微信小程序的页面组件模板。`

## 
- template
  + page
- page
完整页面
- component

## 独立组件
  + ### 下拉框
    #### 配置项

<table>
  <thead>
    <th>property</th>
    <th>type</th>
    <th>desc</th>
  </head>
  <tbody>
    <tr>
      <td class='property'>index</td>
      <td>Number</td>
      <td>index in for</td>
    </tr>
    <tr>
      <td class='property'>key</td>
      <td>String</td>
      <td>proxy property name</td>
    </tr>
    <tr>
      <td class='property'>obj</td>
      <td>Object</td>
      <td>obj必须有titleKey, valueKey, showList属性。当key有值时，obj必须有key属性，obj[key]必须有titleKey, valueKey, showList属性。</td>
    </tr>
    <tr>
      <td class='property'>list</td>
      <td>Array</td>
      <td>下拉数组</td>
    </tr>
    <tr>
      <td class='property'>click</td>
      <td>Function</td>
      <td>点击下拉框标题时触发, 第一个参数为obj, 第二个参数为index</td>
    </tr>
    <tr>
      <td class='property'>change</td>
      <td>Function</td>
      <td>点击下拉数组某项时触发,第一个参数为obj, 第二个参数为点击项，第三个参数为index</td>
    </tr>
  </tbody>
</table>


  + ### 星评
    #### 配置项
  
    |属性名|类型|描述|
    |------|-----|-------|
    |`level`|Number|评价等级|
    |`canModify`|Boolean |是否可以修改, `true`表示可以修改 |
    |`onlySel`| Boolean |是否只显示评价等级对应的星|
    | `size` | Number | 图标大小 |
    | `interval` | Number | 图标间隔大小 |
    |`src` | String | 未选中图标路径 |
    | `sel_src` | String | 选中图标路径 |
    | `config` | Object | 配置对象 |

    > 可以直接设置单个属性或设置一个配置对象。

    > level为0时，需要设置config.level也为0.

  + number
  
  + swiper
    > 轮播图
    ### 参数 
      - config : Object  
      
        #### 配置属性 
      
          |属性名|类型|默认|描述|
          |------|-----|------|-------|
          | `height` | Number | 476 | 高度 |
          | `indicatorDots` | Boolean | true | 是否显示面板指示点 |
          | `indicatorActiveColor` | String | '#fff' | 当前选中的指示点颜色 |
          | `autoplay` | Boolean | true | 是否自动切换 |
          | `interval` | Number | 3000 | 自动切换时间间隔 |
          | `duration` | Number | 1000 | 滑动动画时长 |
          | `circular` | Boolean | true | 是否循环 |
          | `data` | Array | - | 数据(数组中每项为一个对象，对象必须有imgUrl属性) |

      - click : [Function] 
        > 点击回调函数


    #### 例子 
    ```js
    <!--  -->
    <slider :config.sync='swiperConfig' @click.user='goGoodsDetail'></slider>
    <!-- 配置对象 -->
    swiperConfig: {
      data: [
        { imgUrl: '', }
      ],
    },
    ```
 
## 获取/Get 
`git clone https://github.com/person-0/wx.git`


<style>
.property{
  color: #00ffff;
}
</style>