# 微信小程序通用库
`提供一些微信小程序的页面组件模板。`

## 
- template
  + page
- page
完整页面
- component

## 独立组件
  + ### 星评
  > 可以直接设置单个属性或设置一个配置对象。
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

> level为0时，需要设置config.level也为0.

  + number

## 获取/Get 
`git clone https://github.com/person-0/wx.git`
