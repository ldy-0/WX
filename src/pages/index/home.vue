<template>
  <div class="home">
      <vbanner></vbanner>
      <div>
        <div class="nav-bar">
            <ul>
                <li><span><img src="@/images/icon_shejituandui.png"></span><span class="red-a">100+</span>设计团队</li>
                <li><span><img src="@/images/icon_shouhou.png"></span><span class="red-a">30+</span>售后支持</li>
                <li><span><img src="@/images/icon_kaifa.png"></span><span class="red-a">10+</span>年开发经验</li>
                <li><span><img src="@/images/icon_anli.png"></span><span class="red-a">10+</span>万合作案例</li>
                <li><span><img src="@/images/icon_daili.png"></span><span class="red-a">200+</span>全国代理商</li>
            </ul>
        </div>
        <div class="content-min before">
            <div class="list-a">
                <div class="title">
                    <span class="left"><img src="@/images/shiliang2.png"/></span>
                    <p>微客立小程序</p>
                    <span class="right"><img  src="@/images/shiliang2.png" class="flip-horizontal"></span>
                </div>
                <div id="clear"></div>
                <div class="list-a-left left">
                    <p>
                        <span><img src="@/images/dline.png"/></span>
                        最新合作小程序
                    </p>
                    <div class="banner-min" id="bannermin">
                        <div class="sections">
                            <div class="section" id="sec0"><a href="#"></a></div>
                            <div class="section" id="sec1"><a href="#"></a></div>
                            <div class="section" id="sec2"><a href="#"></a></div>
                            <div class="section" id="sec3"><a href="#"></a></div>
                        </div>
                    </div>
                </div>
                <div class="list-a-right right">
                    <div>
                        <p>
                            <span><img src="@/images/dline.png"/></span>
                            行业小程序
                        </p>
                        <span class="min-see">30+行业垂直深度小程序方案，拓展行业从此无忧</span>
                    </div>
                    <div class="clear"></div>
                    <div>
                        <ul id="see">
                            <div v-for="see in sees">
                                <li>
                                    <div class="list-a-list ">
                                        <img  class="hyIco" data-himg="icon_06_b.png" :src="see.url" style="display: none;"/>
                                        <img  class=" hyIcoB" style="display: inline;" :src="see.img"/>
                                        <div class="list-a-title">{{see.title}}</div>
                                        <a rel="nofollow" href="http://p.qiao.baidu.com/cps/chat?siteId=11885065&userId=24595144">
                                            <div class="jianjie_btn qqbtn_1001" id="">我要定制</div>
                                        </a>
                                    </div>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-max bg-b before">
            <div class="content-min">
                <div class="list-b">
                <div class="title title-w-b">
                    <span class="left"><img src="@/images/shiliang3.png"></span>
                    <p>专属定制，信心之选</p>
                    <span class="right"><img src="@/images/shiliang3.png" class="flip-horizontal"></span>
                </div>
                <p>微客立区别其它的小程序公司，在于专属1V1定制企业小程序</p>
                <ul id="list-b">
                    <div v-for="list in lists">
                        <li>
                            <div class="list-b-list ">
                                <div  :class=" 'item-img'+list.num"></div>
                                <div class="list-b-title">{{list.title}}</div>
                            </div>
                        </li>
                    </div>
                </ul> 
            </div>
            </div>
        </div>
        <div id="clear"></div>
      </div>
      <div class="content-min">
          <div class="list-c">
              <div class="title title-w-c">
                  <span class="left"><img src="@/images/shiliang4.png"></span>
                  <p>微客立小程序覆盖行业</p>
                  <span class="right"><img src="@/images/shiliang4.png" class="flip-horizontal"></span>
              </div>
              <ul>
                  <li class="bg-list-a">
                      <a >
                          <div class="list-c-list">
                              <img  class=" hyIcoB" style="display: inline;" src="@/images/canyin.png">
                          </div>
                      </a>
                  </li>
                  <li class="bg-list-b">
                      <a >
                          <div class="list-c-list">
                              <img  class=" hyIcoB" style="display: inline;" src="@/images/dianshang.png">
                          </div>
                      </a>
                  </li>
                  <li class="bg-list-c">
                      <a >
                          <div class="list-c-list">
                              <img  class=" hyIcoB" style="display: inline;" src="@/images/js.png">
                          </div>
                      </a>
                  </li>
                  <li class="bg-list-d">
                      <a >
                          <div class="list-c-list">
                              <img  class=" hyIcoB" style="display: inline;" src="@/images/my.png">
                          </div>
                      </a>
                  </li>
                  <li class="bg-list-e">
                      <a >
                          <div class="list-c-list">
                              <img  class=" hyIcoB" style="display: inline;" src="@/images/hq.png">
                          </div>
                      </a>
                  </li>

                  <li class="bg-list-f">
                      <a >
                          <div class="list-c-list">
                            
                              <img  class=" hyIcoB" style="display: inline;" src="@/images/ktv.png">
                          </div>
                      </a>
                  </li>
                  <li class="bg-list-g">
                      <a >
                          <div class="list-c-list">
                              <img  class=" hyIcoB" style="display: inline;" src="@/images/jb.png">
                          </div>
                      </a>
                  </li>
                  <li class="bg-list-h">
                      <a >
                          <div class="list-c-list">
                              <img  class=" hyIcoB" style="display: inline;" src="@/images/jy.png">
                          </div>
                      </a>
                  </li>
                  <li class="bg-list-i">
                      <a >
                          <div class="list-c-list">
                              <img  class=" hyIcoB" style="display: inline;" src="@/images/ls.png">
                          </div>
                      </a>
                  </li>
                  <li class="bg-list-j">
                      <a >
                          <div class="list-c-list">
                              <img  class=" hyIcoB" style="display: inline;" src="@/images/jd.png">
                          </div>
                      </a>
                  </li>
                  <li class="bg-list-k">
                      <a >
                          <div class="list-c-list">
                              <img  class=" hyIcoB" style="display: inline;" src="@/images/spa.png">
                          </div>
                      </a>
                  </li>
                  <li class="bg-list-l">
                      <a >
                          <div class="list-c-list">
                              <img  class=" hyIcoB" style="display: inline;" src="@/images/qc.png">
                          </div>
                      </a>
                  </li>
                  
              </ul> 
              
          </div>
      </div>
      <div class="content-max bg-c before">
        <div class="list-d">
            <p>行业先锋大洗牌，一起来赢小程序战役，全球合作伙伴招募</p>
            <input type="botton" value="合作咨询" onclick='location.href=("http://p.qiao.baidu.com/cps/chat?siteId=11885065&userId=24595144")'/>
        </div>
      </div>
      <div id="clear"></div>
      <div class="content-min">
        <!-- 案例 -->
        <div class="list-e">
            <div class="title title-w-c">
                <span class="left"><img src="@/images/shiliang5.png"></span>
                <p>微客立小程序合作案例</p>
                <span class="right"><img src="@/images/shiliang5.png" class="flip-horizontal"></span>
            </div>
            <!-- <ul class='case_classify'>
                <li class="case_classify_item" 
                    :class="currentClassify === item.case_classid ? 'checked' : '' " 
                    v-for='item in caseClassifyList' 
                    @click='changeClassify(item)'>{{item.case_classname}}</li>
                <li class='case_classify_item' @click="showSearch">搜索>>
                    <div class='search_wrap' v-if="isShowSearch">
                        <input class='search_input' placeholder="请输入关键字" v-model='keyWord' />
                        <button class='search_btn s-1' @click='search'>确定</button>
                        <button class='search_btn s-2' @click='clearSearch'>取消</button>
                    </div>
                </li>
            </ul> -->
            <ul id="app" v-if='caseList[0]'>
                <div v-for="site in sites"> <!-- caseList -->
                    <li>
                        <div class="box">
                            <div class="box-content">
                                <div class="box-wrapper">
                                    <img  class=" hyIcoB"  :src="site.img"> <!-- site.case_qrcodeimg -->
                                </div>
                            </div>
                            <div class="box-overlay magictime"> <!-- data-hover="bombRightOut" data-return="" -->
                                <img :src="site.url" class=" hyIco" > <!-- site.case_img --> 
                            </div>
                            <a class="link" href="#" target="_blank"></a>                       
                        </div>
                    </li>
                </div>
            </ul>
            <div class='no_case' v-else>暂无数据</div>
        </div>
        
      </div>
      <div id="clear"></div>
      <!--企业定制搜索-->
      <div class="content-max bg-d before">
          <div class="footer-search">
              <div class="join_us_context">
              抢占移动互联新机遇
                <div class="left_line"></div>
                <div class="right_line"></div>
                <div class="join_us_now">立即加入</div>
                <div class="know_more">
                    <input type="text" v-model="tel" placeholder="请输入手机号" />
                    <div class="more" @click="sendTel">定制服务</div>
                </div>
            </div>
          </div>
      </div>
      <div id="clear"></div>
  </div>
</template>
<script>
import $ from "jquery";
import vbanner from "@/pages/components/vbanner";
import pageSwitch from "@/js/pageSwitch.min.js";
export default {
  data() {
    return {
      tel: "",
      lists: [
        { num: "0", url: "icon_jianrongxingqiang_hl.png", title: "兼容性强" },
        { num: "1", url: "icon_tieqiexuqiu_hl.png", title: "贴切需求" },
        { num: "2", url: "icon_gongnengqiquan_hl.png", title: "功能齐全" },
        { num: "3", url: "icon_suishixiugai_hl.png", title: "随时更改" }
      ],
      sees: [
        {
          img: require("@/images/icon_guanwang.png"),
          url: require("@/images/icon_guanwang_1.png"),
          title: "官网小程序"
        },
        {
          img: require("@/images/icon_dianshang.png"),
          url: require("@/images/icon_dianshang_1.png"),
          title: "电商小程序"
        },
        {
          img: require("@/images/icon_yuyue.png"),
          url: require("@/images/icon_yuyue.png"),
          title: "预约小程序"
        },
        {
          img: require("@/images/icon_diancan.png"),
          url: require("@/images/icon_diancan_1.png"),
          title: "点餐小程序"
        },
        {
          img: require("@/images/icon_waimai.png"),
          url: require("@/images/icon_waimai_1.png"),
          title: "外卖小程序"
        },
        {
          img: require("@/images/icon_jiudian.png"),
          url: require("@/images/icon_jiudian_1.png"),
          title: "酒店小程序"
        },
        {
          img: require("@/images/icon_yingxiao.png"),
          url: require("@/images/icon_yingxiao_1.png"),
          title: "营销小程序"
        },
        {
          img: require("@/images/icon_daodian.png"),
          url: require("@/images/icon_daodian_1.png"),
          title: "到店小程序"
        }
      ],
      sites: [
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/1.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/1.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/2.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/2.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/3.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/3.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/4.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/4.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/5.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/5.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/6.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/6.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/7.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/7.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/8.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/8.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/9.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/9.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/10.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/10.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/11.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/11.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/12.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/12.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/13.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/13.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/14.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/14.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/15.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/15.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/16.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/16.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/17.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/17.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/18.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/18.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/19.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/19.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/20.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/20.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/21.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/21.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/22.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/22.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/23.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/23.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/24.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/24.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/25.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/25.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/26.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/26.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/27.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/27.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/28.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/28.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/29.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/29.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/30.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/30.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/31.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/31.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/32.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/32.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/33.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/33.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/34.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/34.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/35.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/35.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/36.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/36.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/37.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/37.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/38.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/38.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/39.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/39.png"
        },
        {
          img: "http://webiteimg-1253114089.file.myqcloud.com/home/40.jpg",
          url: "http://webiteimg-1253114089.file.myqcloud.com/home/40.png"
        }
      ],
      currentClassify: 0, // 当前分类Id
      caseClassifyList: [], // 案例分类数据
      caseList: [], // 指定分类下的案例数据
      isShowSearch: false,
      keyWord: '',
    };
  },
  components: {
    vbanner
  },
  mounted() {
    console.log("home mounted!");
    this.init();
  },
  computed: {

  },
  methods: {
    sendTel() {
      let pass = this.checkTel(this.tel);
      if (!pass) {
        return;
      }
      this.http
        .post("http://web.healthsource.com.cn/api/v1/home/servertel", { //http://www.minivictory.cn "http://101.132.172.106:9001/visitors"
          telephone: this.tel
        })
        .then(response => {
          this.tel = "";
          alert("发送成功！");
          console.log(response);
        //   this.http.get("http://web.healthsource.com.cn/api/v1/admin/servertel", {
        //       page: 0, limit: 10,
        //   }).then(res => {
        //       console.log(res);
        //   });
        });
    },
    checkTel(obj) {
      var reg = /^1[0-9]{10}$/;
      if (obj == "" || !reg.test(obj)) {
        alert("请输入正确格式的电话号码！");
        return false;
      } else {
        return true;
      }
    },
    changeClassify(item){
        
        let params = item.case_classid === 0 ? null : {
            case_classid: item.case_classid,
        };

        this.currentClassify = item.case_classid;
        this.getCaseList(params);
        
    },
    showSearch(){
        this.isShowSearch = !this.isShowSearch;
    },
    search(){

        this.getCaseList({
            keyword: this.keyWord,
        });

    },
    clearSearch(){
        this.keyWord = '';
    },
    init() {
    
      pageSwitch($);
      $("#bannermin").PageSwitch({
        direction: "horizontal",
        easing: "ease-in",
        duration: 1000,
        autoPlay: true,
        loop: "false"
      });

      this.getCaseClassify();
      this.getCaseList();
    },
    fly() {

      $(".box").hover(
        function() {
          var overlay = $(this).find(".box-overlay");
          overlay
            .removeClass(overlay.data("return"))
            .addClass(overlay.data("hover"));
        },
        function() {
          var overlay = $(this).find(".box-overlay");
          overlay
            .removeClass(overlay.data("hover"))
            .addClass(overlay.data("return"));
        }
      );
    },
    getCaseClassify(){
        this.http.get("http://web.healthsource.com.cn/api/v1/admin/caseclass", {}).then(res => {

            if(res.data.status === 0){
                this.caseClassifyList = res.data.data;
                this.caseClassifyList.unshift({ case_classid: 0, case_classname: '全部' });
            }
            
        });
    },
    getCaseList(params){
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
            
        });

    }
  }
};
</script>

<style>
.nav-bar > ul {
  line-height: 80px;
  text-align: center;
  height: 80px;
}

.case_classify{
    margin: 10px auto;
    border: 1px solid #d5d5d5;
    border-radius: 6px;
}
.case_classify .case_classify_item{
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

.box:hover .box-overlay{
    -webkit-animation: bombRightOut 1s;
    -moz-animation: bombRightOut 1s;
    -ms-animation: bombRightOut 1s;
    animation: bombRightOut 1s;
}

.search_wrap{
    position: absolute;
    font-family: 微软雅黑,宋体,Arial,sans-serif;
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
/* @keyframes bombRightOut{
    0%{opacity:1;
    transform-origin:50% 50%;
    transform:rotate(0deg);
    -webkit-filter:blur(0px);}
    50%{opacity:1;
    transform-origin:200% 50%;
    transform:rotate(160deg);
    -webkit-filter:blur(0px);}
    100%{opacity:0;transform-origin:200% 50%;transform:rotate(160deg);-webkit-filter:blur(20px);}} */
</style>
