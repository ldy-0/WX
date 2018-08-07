<template>
  <div>
    <!-- <vbanner></vbanner> -->
    <img class="ex-banner" src="http://webiteimg-1253114089.file.myqcloud.com/topsee/3.jpg"></img>
    <div class="example">
        <div class="ex-head">
          <div class="ex-head-t">行业小程序案例</div>
        </div>
        <ul class='case_classify'>
            <li class="case_classify_item" 
                :class="currentClassify === item.case_classid ? 'checked' : '' " 
                v-for='item in caseClassifyList' 
                @click='changeClassify(item)'>{{item.case_classname}}</li>
            <li class='case_classify_item'><span @click="showSearch">搜索>></span>
                <div class='search_wrap' v-if="isShowSearch">
                    <input class='search_input' placeholder="请输入关键字" v-model='keyWord' />
                    <button class='search_btn s-1' @click='search'>确定</button>
                    <button class='search_btn s-2' @click='clearSearch'>取消</button>
                </div>
            </li>
        </ul>
        <div class="ex-wrap"  ref="exwrap" >
          <div class="ex-item" v-for="(item,index) of reallist" 
          :key="index">
            <examplecom class="ex-item-is" :one="item"></examplecom>
          </div>
        </div>
        <div class="ex-btm">
          <div class="ex-btm-line"></div>
          <div class="ex-btm-txt">看了那么多案例，不如自己来一个</div>
          <div class="ex-btm-line"></div>
        </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
// import vbanner from "@/pages/components/vbanner";
import examplecom from "@/pages/components/examplecom";
export default {
  components: {
    // vbanner,
    examplecom
  },
  data() {
    return {
      count: 0,
      reallist: [],
      exlist: [
        {
          name: "蛋糕模板",
          value: 1,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/1.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img1.png"
        },
        {
          name: "美容模版",
          value: 2,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/2.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img2.png"
        },
        {
          name: "美食零售",
          value: 3,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/3.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img3.png"
        },
        {
          name: "仿土巴兔模板",
          value: 4,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/4.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img4.png"
        },
        {
          name: "上门服务",
          value: 5,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/5.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img5.png"
        },
        {
          name: "多店铺模板",
          value: 6,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/6.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img6.png"
        },
        {
          name: "企业官网",
          value: 7,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/7.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img7.png"
        },
        {
          name: "英语教育",
          value: 8,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/8.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img8.png"
        },
        {
          name: "按摩仪商城",
          value: 9,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/9.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img9.png"
        },
        {
          name: "家居百货品牌馆",
          value: 10,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/10.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img10.png"
        },
        {
          name: "宠物医院",
          value: 11,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/11.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img11.png"
        },
        {
          name: "洗浴SPA模板",
          value: 12,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/12.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img12.png"
        },
        {
          name: "鲜花到家模板",
          value: 13,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/13.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img13.png"
        },
        {
          name: "周末休闲度假",
          value: 14,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/14.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img14.png"
        },
        {
          name: "珠宝/饰品模板",
          value: 15,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/15.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img15.png"
        },
        {
          name: "食品饮料百货商城",
          value: 16,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/16.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img16.png"
        },
        {
          name: "主题酒店",
          value: 17,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/17.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img17.png"
        },
        {
          name: "广告制作门店",
          value: 18,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/18.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img18.png"
        },
        {
          name: "焊机商城",
          value: 19,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/19.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img19.png"
        },
        {
          name: "纸箱厂商",
          value: 20,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/20.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img20.png"
        },
        {
          name: "盘子女人坊",
          value: 21,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/21.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img21.png"
        },
        {
          name: "KTV预约",
          value: 22,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/22.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img22.png"
        },
        {
          name: "厦门帆船游艇",
          value: 23,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/23.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img23.png"
        },
        {
          name: "肠粉门店外卖",
          value: 24,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/24.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img24.png"
        },
        {
          name: "周边点餐美食",
          value: 25,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/25.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img25.png"
        },
        {
          name: "教育培训模板",
          value: 26,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/26.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img26.png"
        },
        {
          name: "美食老字号门店",
          value: 27,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/27.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img27.png"
        },
        {
          name: "冻品烧烤食品批发",
          value: 28,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/28.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img28.png"
        },
        {
          name: "建材装饰",
          value: 29,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/29.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img29.png"
        },
        {
          name: "餐饮到店模板",
          value: 30,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/30.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img30.png"
        },
        {
          name: "餐饮住宿平台模板",
          value: 31,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/31.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img31.png"
        },
        {
          name: "农产百货模板",
          value: 32,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/32.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img32.png"
        },
        {
          name: "进口酒业模板",
          value: 33,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/33.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img33.png"
        },
        {
          name: "幼儿早教中心模板",
          value: 34,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/34.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img34.png"
        },
        {
          name: "健身房模板",
          value: 35,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/35.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img35.png"
        },
        {
          name: "图书商城",
          value: 36,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/36.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img36.png"
        },
        {
          name: "母婴模板",
          value: 38,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/38.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img38.png"
        },
        {
          name: "数码潮品",
          value: 39,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/39.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img39.png"
        },
        {
          name: "周边数码",
          value: 40,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/40.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img40.png"
        },
        {
          name: "发烧耳机",
          value: 41,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/41.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img41.png"
        },
        {
          name: "百年婚庆",
          value: 42,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/42.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img42.png"
        },
        {
          name: "蔷薇恋人",
          value: 43,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/43.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img43.png"
        },
        {
          name: "玫瑰之旅",
          value: 44,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/44.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img44.png"
        },
        {
          name: "完美女人",
          value: 45,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/45.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img45.png"
        },
        {
          name: "天生丽质",
          value: 46,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/46.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img46.png"
        },
        {
          name: "老年养生馆",
          value: 47,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/47.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img47.png"
        },
        {
          name: "医药世家",
          value: 48,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/48.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img48.png"
        },
        {
          name: "养生指南",
          value: 49,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/49.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img49.png"
        },
        {
          name: "降魔KTV",
          value: 50,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/50.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img50.png"
        },
        {
          name: "樱桃来了",
          value: 51,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/51.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img51.png"
        },
        {
          name: "四川火锅",
          value: 52,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/52.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img52.png"
        },
        {
          name: "恋爱时光",
          value: 53,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/53.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img53.png"
        },
        {
          name: "芳香花店",
          value: 54,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/54.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img54.png"
        },
        {
          name: "妈咪爱宝贝",
          value: 55,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/55.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img55.png"
        },
        {
          name: "健康宝宝",
          value: 56,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/56.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img56.png"
        },
        {
          name: "宝贝呵护",
          value: 57,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/57.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img57.png"
        },
        {
          name: "卡通少女",
          value: 58,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/58.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img58.png"
        },
        {
          name: "海外美妆",
          value: 59,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/59.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img59.png"
        },
        {
          name: "暖暖厨房",
          value: 60,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/60.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img60.png"
        },
        {
          name: "身体保健",
          value: 61,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/61.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img61.png"
        },
        {
          name: "保健品海淘",
          value: 62,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/62.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img62.png"
        },
        {
          name: "家政帮",
          value: 63,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/63.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img63.png"
        },
        {
          name: "阿姨之家",
          value: 64,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/64.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img64.png"
        },
        {
          name: "金居家装",
          value: 65,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/65.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img65.png"
        },
        {
          name: "都市会所",
          value: 66,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/66.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img66.png"
        },
        {
          name: "舌尖上的美食",
          value: 67,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/67.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img67.png"
        },
        {
          name: "烧肉店",
          value: 68,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/68.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img68.png"
        },
        {
          name: "料理美食",
          value: 69,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/69.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img69.png"
        },
        {
          name: "夏日美食",
          value: 70,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/70.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img70.png"
        },
        {
          name: "婚纱摄影",
          value: 71,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/71.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img71.png"
        },
        {
          name: "洱海旅游",
          value: 72,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/72.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img72.png"
        },
        {
          name: "居家小店",
          value: 73,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/73.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img73.png"
        },
        {
          name: "古典婚纱",
          value: 74,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/74.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img74.png"
        },
        {
          name: "时常婚纱摄影",
          value: 75,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/75.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img75.png"
        },
        {
          name: "科教模板",
          value: 76,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/76.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img76.png"
        },
        {
          name: "图书模板",
          value: 77,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/77.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img77.png"
        },
        {
          name: "乐器类",
          value: 78,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/78.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img78.png"
        },
        {
          name: "书店模板",
          value: 79,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/79.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img79.png"
        },
        {
          name: "文学生活",
          value: 80,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/80.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img80.png"
        },
        {
          name: "宝宝潮衣",
          value: 81,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/81.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img81.png"
        },
        {
          name: "活力服饰",
          value: 82,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/82.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img82.png"
        },
        {
          name: "气质女装",
          value: 83,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/83.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img83.png"
        },
        {
          name: "休闲服饰",
          value: 84,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/84.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img84.png"
        },
        {
          name: "萌宝穿搭",
          value: 85,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/85.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img85.png"
        },
        {
          name: "商务服饰",
          value: 86,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/86.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img86.png"
        },
        {
          name: "致富之道",
          value: 87,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/87.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img87.png"
        },
        {
          name: "天天金融",
          value: 88,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/88.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img88.png"
        },
        {
          name: "新纪元",
          value: 89,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/89.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img89.png"
        },
        {
          name: "绿色家园",
          value: 90,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/90.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img90.png"
        },
        {
          name: "汤婆婆",
          value: 91,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/91.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img91.png"
        },
        {
          name: "温泉之旅",
          value: 92,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/92.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img92.png"
        },
        {
          name: "瑜伽之旅",
          value: 93,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/93.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img93.png"
        },
        {
          name: "大大票务",
          value: 94,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/94.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img94.png"
        },
        {
          name: "汽车天下",
          value: 95,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/95.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img95.png"
        },
        {
          name: "仿东方悍马",
          value: 96,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/96.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img96.png"
        },
        {
          name: "仿雪佛兰",
          value: 97,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/97.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img97.png"
        },
        {
          name: "光电LED彩灯",
          value: 98,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/98.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img98.png"
        },
        {
          name: "葡萄酒",
          value: 99,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/99.png",
          img: "http://webiteimg-1253114089.file.myqcloud.com/example/img99.png"
        },
        {
          name: "珠宝饰品",
          value: 100,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/100.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img100.png"
        },
        {
          name: "健康养生保健",
          value: 101,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/101.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img101.png"
        },
        {
          name: "美容美甲美妆",
          value: 102,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/102.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img102.png"
        },
        {
          name: "丽人美睫纹身",
          value: 104,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/104.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img104.png"
        },
        {
          name: "玻璃建材",
          value: 105,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/105.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img105.png"
        },
        {
          name: "美食展示招商",
          value: 106,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/106.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img106.png"
        },
        {
          name: "旅游自由行",
          value: 107,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/107.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img107.png"
        },
        {
          name: "科技教育",
          value: 108,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/108.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img108.png"
        },
        {
          name: "教育培训",
          value: 109,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/109.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img109.png"
        },
        {
          name: "宠物医院",
          value: 110,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/110.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img110.png"
        },
        {
          name: "瑜伽",
          value: 111,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/111.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img111.png"
        },
        {
          name: "医药急诊",
          value: 112,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/112.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img112.png"
        },
        {
          name: "农产品",
          value: 113,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/113.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img113.png"
        },
        {
          name: "多店铺餐饮",
          value: 114,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/114.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img114.png"
        },
        {
          name: "仿美团模板",
          value: 117,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/117.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img117.png"
        },
        {
          name: "同城社区",
          value: 118,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/118.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img118.png"
        },
        {
          name: "箱包皮具",
          value: 119,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/119.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img119.png"
        },
        {
          name: "塑料建材工程",
          value: 121,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/121.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img121.png"
        },
        {
          name: "金融财富",
          value: 122,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/122.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img122.png"
        },
        {
          name: "母婴旗舰店",
          value: 123,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/123.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img123.png"
        },
        {
          name: "茶楼酒家",
          value: 129,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/129.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img129.png"
        },
        {
          name: "婚纱摄影",
          value: 130,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/130.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img130.png"
        },
        {
          name: "鲜花婚庆策划",
          value: 131,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/131.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img131.png"
        },
        {
          name: "文化商城",
          value: 132,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/132.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img132.png"
        },
        {
          name: "名酒商城",
          value: 133,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/133.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img133.png"
        },
        {
          name: "手机游戏交易平台",
          value: 134,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/134.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img134.png"
        },
        {
          name: "成人用品",
          value: 135,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/135.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img135.png"
        },
        {
          name: "驾校培训",
          value: 136,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/136.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img136.png"
        },
        {
          name: "瑜伽培训",
          value: 137,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/137.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img137.png"
        },
        {
          name: "手机批发",
          value: 138,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/138.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img138.png"
        },
        {
          name: "智能电器商城",
          value: 139,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/139.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img139.png"
        },
        {
          name: "官网招商",
          value: 140,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/140.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img140.png"
        },
        {
          name: "养生健康商城",
          value: 141,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/141.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img141.png"
        },
        {
          name: "图文广告",
          value: 154,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/154.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img154.png"
        },
        {
          name: "口腔预约",
          value: 155,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/155.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img155.png"
        },
        {
          name: "汽车租赁",
          value: 156,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/156.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img156.png"
        },
        {
          name: "订牛奶",
          value: 157,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/157.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img157.png"
        },
        {
          name: "综合商城",
          value: 158,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/158.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img158.png"
        },
        {
          name: "跆拳道培训",
          value: 159,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/159.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img159.png"
        },
        {
          name: "年会策划",
          value: 160,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/160.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img160.png"
        },
        {
          name: "舌尖上的美食",
          value: 161,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/161.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img161.png"
        },
        {
          name: "鲜花店",
          value: 162,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/162.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img162.png"
        },
        {
          name: "五金地漏",
          value: 163,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/163.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img163.png"
        },
        {
          name: "教育培训",
          value: 164,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/164.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img164.png"
        },
        {
          name: "进口零食",
          value: 165,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/165.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img165.png"
        },
        {
          name: "幼儿体育",
          value: 166,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/166.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img166.png"
        },
        {
          name: "正品摩托车",
          value: 167,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/167.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img167.png"
        },
        {
          name: "精选特产",
          value: 168,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/168.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img168.png"
        },
        {
          name: "智能机器人",
          value: 169,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/169.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img169.png"
        },
        {
          name: "商家黄页",
          value: 170,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/170.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img170.png"
        },
        {
          name: "汽配服务平台",
          value: 171,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/171.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img171.png"
        },
        {
          name: "皮肤管理中心",
          value: 172,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/172.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img172.png"
        },
        {
          name: "好太太精品店",
          value: 173,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/173.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img173.png"
        },
        {
          name: "餐饮平台",
          value: 174,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/174.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img174.png"
        },
        {
          name: "特色食材",
          value: 175,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/175.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img175.png"
        },
        {
          name: "专业培训教育",
          value: 176,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/176.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img176.png"
        },
        {
          name: "鲜花礼品店",
          value: 177,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/177.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img177.png"
        },
        {
          name: "职工旅行社",
          value: 178,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/178.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img178.png"
        },
        {
          name: "女人购",
          value: 179,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/179.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img179.png"
        },
        {
          name: "眼镜总店",
          value: 181,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/181.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img181.png"
        },
        {
          name: "乐购超市",
          value: 182,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/182.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img182.png"
        },
        {
          name: "新概念英语教育",
          value: 183,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/183.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img183.png"
        },
        {
          name: "鲜花店",
          value: 184,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/184.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img184.png"
        },
        {
          name: "化妆护肤",
          value: 185,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/185.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img185.png"
        },
        {
          name: "装修报价",
          value: 186,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/186.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img186.png"
        },
        {
          name: "医药美容",
          value: 187,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/187.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img187.png"
        },
        {
          name: "产后护理",
          value: 188,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/188.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img188.png"
        },
        {
          name: "蜀道美食",
          value: 189,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/189.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img189.png"
        },
        {
          name: "速冻食品",
          value: 192,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/192.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img192.png"
        },
        {
          name: "羊绒围巾饰品商城",
          value: 193,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/193.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img193.png"
        },
        {
          name: "KTV",
          value: 194,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/194.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img194.png"
        },
        {
          name: "商务咨询",
          value: 195,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/195.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img195.png"
        },
        {
          name: "美食圈",
          value: 196,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/196.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img196.png"
        },
        {
          name: "内蒙古美食",
          value: 197,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/197.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img197.png"
        },
        {
          name: "民宿酒店",
          value: 198,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/198.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img198.png"
        },
        {
          name: "酒店宾馆预订",
          value: 199,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/199.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img199.png"
        },
        {
          name: "酒店宾馆",
          value: 200,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/200.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img200.png"
        },
        {
          name: "学生用品采购中心",
          value: 201,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/201.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img201.png"
        },
        {
          name: "欧陆主题大酒店",
          value: 202,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/202.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img202.png"
        },
        {
          name: "美食美客",
          value: 203,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/203.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img203.png"
        },
        {
          name: "草原特色美食",
          value: 204,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/204.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img204.png"
        },
        {
          name: "星级酒店宾馆",
          value: 205,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/205.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img205.png"
        },
        {
          name: "产后健康管理平台",
          value: 206,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/206.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img206.png"
        },
        {
          name: "有机农产品",
          value: 207,
          code: "http://webiteimg-1253114089.file.myqcloud.com/example/207.png",
          img:
            "http://webiteimg-1253114089.file.myqcloud.com/example/img207.png"
        }
      ],
      doc: "",
      screenH: "",
      wrap: "",
      currentClassify: 0, // 当前分类Id
      caseClassifyList: [], // 案例分类数据
      caseList: [], // 指定分类下的案例数据
      isShowSearch: false,
      keyWord: '',
    };
  },
  created() {

  },
  mounted() {
    console.log("example mounted!");
    this.doc = document.documentElement;
    this.wrap = this.$refs.exwrap;
    this.screenH = window.screen.availHeight;
    this.init();
    window.addEventListener("scroll", this.addList);
  },
  methods: {
    changeClassify(item){
        
        let params = item.case_classid === 0 ? null : {
            case_classid: item.case_classid,
        };

        this.currentClassify = item.case_classid;
        this.getCaseList(params, () => {
          let wrapToTop = this.wrap.getBoundingClientRect().top;
          let wrapToBottom = this.screenH - wrapToTop;
          wrapToBottom = wrapToBottom > 0 ? wrapToBottom : 0;
          let count = (Math.floor(wrapToBottom / 540) + 1) * 4;
          this.reallist = this.caseList.slice(0, count);// this.exlist.slice(0, count);
          this.count = count;

        });
        
    },
    showSearch(){
        this.isShowSearch = !this.isShowSearch;
    },
    search(){

        this.getCaseList({
            keyword: this.keyWord,
        }, () => {
        let wrapToTop = this.wrap.getBoundingClientRect().top;
        let wrapToBottom = this.screenH - wrapToTop;
        wrapToBottom = wrapToBottom > 0 ? wrapToBottom : 0;
        let count = (Math.floor(wrapToBottom / 540) + 1) * 4;
        this.reallist = this.caseList.slice(0, count);// this.exlist.slice(0, count);
        this.count = count;
      });

    },
    clearSearch(){
        this.keyWord = '';
    },
    init() {
      this.getCaseClassify();
      this.getCaseList(null, () => {
        let wrapToTop = this.wrap.getBoundingClientRect().top;
        let wrapToBottom = this.screenH - wrapToTop;
        wrapToBottom = wrapToBottom > 0 ? wrapToBottom : 0;
        let count = (Math.floor(wrapToBottom / 540) + 1) * 4;
        this.reallist = this.caseList.slice(0, count);// this.exlist.slice(0, count);
        this.count = count;
      });
      // 初次加载一部分
      
    },
    addList(e) {
        //   let supportPageOffset = window.pageXOffset !== undefined;
        //     let isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
        //     //TscrollTop 兼容之后的卷积高度
        //     let TscrollTop = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
        // 元素高
        let elH = this.wrap.offsetHeight //主动触发回流 reflow
        let elPosition = this.wrap.getBoundingClientRect()
        let elBtmToSBtm = this.screenH - elH - elPosition.top
        console.log(elBtmToSBtm)
        if (elBtmToSBtm > -200) {
            this.count += 8;
            this.reallist = this.caseList.slice(0, this.count);// this.exlist.slice(0, this.count);
        }
    },
    getCaseClassify(){
        this.http.get("http://web.healthsource.com.cn/api/v1/admin/caseclass", {}).then(res => {

            if(res.data.status === 0){
                this.caseClassifyList = res.data.data;
                this.caseClassifyList.unshift({ case_classid: 0, case_classname: '全部' });
            }
            
        });
    },
    getCaseList(params, callback){
        let query = '';

        for(let key in params){
            query += (query === '' ? '?' : '&') + key + '=' + params[key];
        }

        this.http.get("http://web.healthsource.com.cn/api/v1/home/cases" + query).then(res => {

            if(res.data.status === 0){
                this.caseList = res.data.data;
            }else{
                this.caseList = [];
            }
            callback();
        });

    }
  }
};
</script>

<style lang="stylus">
.ex-banner
  display block
  width 100%
.example {
  margin: 0 auto;
  padding-top: 40px;
  width: 1200px;

  .ex-head {
    margin: 0 auto;
    padding: 30px 0;
    text-align: center;
    color: #00a0e9;
    width: 600px;
    border-bottom: 2px solid #00a0e9;

    .ex-head-t {
      font-size: 22px;
      font-weight: 700;
    }
  }

  .ex-wrap {
    width: 1280px;
    padding-top: 40px;
    margin-right: -40px;
    display: flex;
    flex-wrap: wrap;

    .ex-item {
      margin-right: 38px;
      margin-bottom: 40px;
    }
  }
}

.ex-btm {
  width: 1200px;
  height: 60px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  .ex-btm-line {
    flex: 1;
    height: 1px;
    background-color: #cccccc;
  }

  .ex-btm-txt {
    font-size: 14px;
    color: #888;
    padding: 0 25px;
  }
}

.case_classify{
    margin: 10px auto;
    border: 1px solid #d5d5d5;
    border-radius: 6px;
}
.case_classify .case_classify_item{
    display: inline-block;
    width: 70px;
    height: 50px;
    line-height: 50px;
    padding: 0;
    font-size: 14px;
    color: #666;
    text-align: center;
}
.case_classify .case_classify_item:hover{
    cursor: pointer;
}
.case_classify .checked{
    color:#2995ff;
}

.no_case{
    margin: 30px 0 0;
    color: #666;
    text-align: center;
}

.search_wrap{
    position: absolute;
    font-family: '微软雅黑','宋体',Arial,sans-serif;
}
.search_input{
    width: 200px;
    height: 30px;
    line-height: 30px;
    margin: 10px;
}
.search_btn{
    width: 60px;
    height: 30px;
    line-height: 30px;
    border: none;
    text-align: center;
}
.s-1{
    color: #fff;
    background: #3091f2;
}
.s-2{
    border: 1px solid #dfdfdf;
    color: #888;
    background: #fff;
}
</style>
