import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    pages: [
      'pages/index/main',
      'pages/logs/main',
      'pages/counter/main',
      'pages/authorization/main'
    ],
    window: {
      'backgroundTextStyle': 'light',
      'navigationBarBackgroundColor': '#fff',
      'navigationBarTitleText': 'WeChat',
      'navigationStyle': 'custom',
      'navigationBarTextStyle': 'black'
    },
    tabBar: {
      'color': '#ccc',
      'selectedColor': '#000',
      'list': [
        {
          'pagePath': 'pages/index/main',
          'text': '首页',
          'iconPath': 'static/toolBar/home.png',
          'selectedIconPath': 'static/toolBar/home_sel.png'
        }, {
          'pagePath': 'pages/logs/main',
          'text': '美食',
          'iconPath': 'static/toolBar/food.png',
          'selectedIconPath': 'static/toolBar/food_sel.png'
        }, {
          'pagePath': 'pages/counter/main',
          'text': '我的',
          'iconPath': 'static/toolBar/my.png',
          'selectedIconPath': 'static/toolBar/my_sel.png'
        }
      ]
    }
  }

}
