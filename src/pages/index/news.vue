<template>
  <div>
      <div v-if='isDetail'>
          <div class='newsDetail_head'>
              <div class='newsDetail_title'>{{newsDetail.consult_title}}</div>
              <div class='newsDetail_subTitle'>
                  <span>{{newsDetail.ctime}}</span>
              </div>
          </div>
          <div class='newsDetail_body'>
              <div class='newsDetail_content'>{{newsDetail.consult_content}}</div>
          </div>
      </div>
      <div class="news_wrap" v-else>
        <div class="news-l">
            <div class="news-l-head">
                <img src="../../images/news/main.jpg" alt=""> <!-- activeIndex -->
            </div>

            <div class='news'>
                <div class='news_title'>行业资讯</div>
                <ul>
                    <li class='item' v-for='item in newsList'>
                        <div class='item_title' @click='goNewsDetail(item.consult_id)'>{{item.consult_title}}</div>
                        <!-- <div class='item_content'>{{item.consult_content}}</div> -->
                        <div>
                            <span class='item_time'>微客立-{{item.ctime}}</span>
                            <span class='item_kan'><img src='../../images/news/kan.png' />0</span>
                            <span class='item_zan'><img src='../../images/news/zan.png' />0</span>
                        </div>
                    </li>
                </ul>
                <ul class='pagination'>
                    <!-- <li class='total'>共{{total}}记录</li>
                    <li class='top' @click="minusPage()">&lt;</li>
                    <li class='item' :class="item === params.page ? 'checked' : ''" v-for='item in paginationList' @click='changePage(item)'>{{item}}</li>
                    <li class='end' @click="addPage()">&gt;</li> -->
                    <li class='top' @click="minusPage()">&lt;</li>
                    <li class='item' v-if='paginationList[paginationIndex - 1]' @click="switchPage('-')">...</li>
                    <li class='item' :class="item === params.page ? 'checked' : ''" v-for='item in paginationList[paginationIndex]' @click='changePage(item)'>{{item}}</li>
                    <li class='item' v-if='paginationList[paginationIndex + 1]' @click="switchPage('+')">...</li>
                    <li class='end' @click="addPage()">&gt;</li>
                </ul>
            </div>
        </div>
        <div class="news-r">
            <div class='classify_list'>
                <div class='classify_title'>媒体播报</div>
                <img class='classify_img' src='../../images/news/media_l.png' />
                <ul>
                    <li class='item' v-for='(item, index) in mediaNews' @click='goNewsDetail(item.consult_id)'>
                        <span class='item_index'>{{index + 1}}</span>
                        <span class='item_title'>{{item.consult_title}}</span>
                    </li>
                </ul>
            </div>
            <div class='classify_list'>
                <div class='classify_title'>干货分享</div>
                <img class='classify_img' src='../../images/news/share_l.png' />
                <ul>
                    <li class='item' v-for='(item, index) in shareNews' @click='goNewsDetail(item.consult_id)'>
                        <span class='item_index'>{{index + 1}}</span>
                        <span class='item_title'>{{item.consult_title}}</span>
                    </li>
                </ul>
            </div>
            <div class='classify_list'>
                <div class='classify_title'>经典案例</div>
                <img class='classify_img' src='../../images/news/case_l.png' />
                <ul>
                    <li class='item' v-for='(item, index) in caseNews' @click='goNewsDetail(item.consult_id)'>
                        <span class='item_index'>{{index + 1}}</span>
                        <span class='item_title'>{{item.consult_title}}</span>
                    </li>
                </ul>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import $ from "jquery"
import vbanner from "@/pages/components/vbanner"
import pagination from './newsDetail'

export default {
  components:{
    vbanner,
  },
  mounted(){
    console.log("example mounted!")
  },
  data(){
    return {
        newsList: [],
        total: 0,
        params: {
            page: 1,
            limit: 10,
            consult_classid: 26,
        },
        startPage: 1,
        paginationList: [],
        PaginationSize: 10,
        paginationIndex: 0,
        mediaNews: [],
        shareNews: [],
        caseNews: [],
        isDetail: false,
        newsDetail: null,
    };
  },
  watch: {
    newsDetail(){
        this.$nextTick(function(){
            $('.newsDetail_content')[0].innerHTML = this.newsDetail.consult_content;
        });
    }
  },
  created(){
      let params = {
          page: 1,
          limit: 4,
      };

    //   this.getNewsList(this.params);
    this.getNewsList(this.params, () => {
        this.paginationList[0] = [];

        for(let i = 0, len = this.total; i * this.params.limit < len; i++){

            if(this.paginationList[this.paginationList.length - 1].length > 3){
                this.paginationList.push([]);
            }

            this.paginationList[this.paginationList.length - 1].push(this.startPage + i); // i + 1;
        }
    });

      params.consult_classid = 27;
      this.getClassifyNews(params, data => this.mediaNews = data);
      params.consult_classid = 28;
      params.limit = 8;
      this.getClassifyNews(params, data => this.shareNews = data);
      params.consult_classid = 29;
      this.getClassifyNews(params, data => this.caseNews = data);
  },
  methods: {
    getNewsList(params, callback){
        let query = '';

        for(let key in params){
            query += (query === '' ? '?' : '&') + key + '=' + params[key];
        }

        this.http.get("http://web.healthsource.com.cn/api/v1/home/news" + query).then(res => {

            if(res.data && res.data.status === 0){
                this.newsList = res.data.data;
                this.total = res.data.pagination.total;
            }else{
                this.newsList = [];
            }
            callback();
        });
    },
    goNewsDetail(id){

        this.isDetail = true;
        this.http.get("http://web.healthsource.com.cn/api/v1/home/newsinfo?consult_id=" + id).then(res => {
            
            if(res.data && res.data.status === 0){
                this.newsDetail = res.data.data;

                this.http.get("http://web.healthsource.com.cn/api/v1/home/news_pageview?consult_id=" + id).then(res => {

                    if(res.data && res.data.status === 0){

                    }
                });
            }

        });

    },
    // getNewsList(params){
    //     let query = '';

    //     for(let key in params){
    //         query += (query === '' ? '?' : '&') + key + '=' + params[key];
    //     }

    //     this.http.get("http://web.healthsource.com.cn/api/v1/home/news" + query).then(res => {

    //         if(res.data.status === 0){
    //             this.newsList = res.data.data;
    //             this.total = res.data.pagination.total;
    //             for(let i = 0, len = this.total; i * this.params.limit < len; i++){
    //                 this.paginationList[i] = this.startPage + i ; // i + 1;
    //             }
                
    //         }else{
    //             this.newsList = [];
    //         }
    //         // callback();
    //     });
    // },
    getClassifyNews(params, callback){
        let query = '';

        for(let key in params){
            query += (query === '' ? '?' : '&') + key + '=' + params[key];
        }

        this.http.get("http://web.healthsource.com.cn/api/v1/home/news" + query).then(res => {

            if(res.data.status === 0){
                callback(res.data.data);
            }else{
                callback([]);
            }
        });
    },
    changePage(page){
        this.params.page = page;

        this.getNewsList(this.params);
    },
    addPage(){
        let arr = this.paginationList[this.paginationIndex];
        if(!this.paginationList[this.paginationIndex + 1] && this.params.page === arr[arr.length - 1]){
            return alert('end');
        }

        this.params.page < arr[arr.length - 1] ? this.params.page++ : this.params.page = this.paginationList[++this.paginationIndex][0];
        // this.params.page < this.paginationList.length ? this.params.page++ : void(0);
        this.getNewsList(this.params);
    },
    minusPage(){
        if(this.params.page === 1){
            return alert('first');
        }

        this.params.page > this.paginationList[this.paginationIndex][0] ? this.params.page-- : this.params.page = this.paginationList[--this.paginationIndex][0];
        // this.params.page > 1 ? this.params.page-- : void(0);
        this.getNewsList(this.params);
    },
    switchPage(operate){
        operate === '-' ? this.paginationIndex-- : this.paginationIndex++;
        this.params.page = this.paginationList[this.paginationIndex][0];
        this.getNewsList(this.params);
    }
  }
}
</script>
<style lang="stylus">
.news_wrap
    margin-top 28px
    display flex
    justify-content center
.news-l
    width 800px
    min-height 500px
    margin-right 57px
    .news-l-head
        img
            width: 800px
            height: 500px
    .news_title
        width: 100%
        margin: 60px 0 40px
        font: bold 22px 'MicrosoftYaHei-Bold'
        color: #333
        text-align: left
    .item
        height: 110px
        border-top: 1px solid #eee;
        .item_title
            height: 30px;
            line-height : 30px;
            margin: 30px 0 10px;
            font: 22px 'MicrosoftYaHei';
            color: #000;
            overflow hidden;
        .item_time
            margin-right: 80px;
            font: 14px 'MicrosoftYaHei';
            color: #a5b8d6;
        .item_kan, .item_zan
            margin-right: 15px;
            color: #999;
            img
                margin-right: 4px;
.news-r
    width 340px
    min-height 200px
    .classify_list
        margin-bottom: 50px;
        .classify_title
            height: 30px;
            line-height: 30px;
            font: bold 20px 'MicrosoftYaHei';
            color: #333;
            border-bottom: 1px solid #3091f2;
        .classify_img
            width: 340px;
            height: 200px;
            margin: 20px 0 10px;
        .item
            height: 20px;
            line-height: 20px;
            margin: 10px 0;
            .item_index
                display: inline-block;
                width: 18px;
                height: 18px;
                line-height: 18px;
                border-radius: 3px;
                font-style: italic;
                color: #666;
                background: #f5f5f5;
                text-align: center;
            .item_title
                margin-left: 4px;
                font: 14px 'MicrosoftYaHei'
                color: #000

.pagination
    margin: 35px 0;
    .top, .item, .end, .total
        display: inline-block;
        width: 40px;
        height: 30px;
        line-height: 30px;
        margin: 0 10px;
        border: 1px solid #ddd;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
    .item
        color: #666;
        background: #fff;
    .checked
        border: none;
        color: #fff;
        background: #1291ea;
    .total
        width: 70px;

.newsDetail_head
    margin: 0 5%;
    border-bottom: 1px solid #000;
    .newsDetail_title
        margin: 20px 0;
        font: bold 24px 'MicrosoftYaHei';
        color: #333;
        text-align: center;
    .newsDetail_subTitle
        margin: 10px 0;
        font: 14px 'MicrosoftYaHei';
        text-align: center;
.newsDetail_content
    margin: 20px 5%;
    p
        text-indent: 2em;
</style>
