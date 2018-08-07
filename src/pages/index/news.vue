<template>
  <div class="news_wrap">
      <div class="news-l">
          <div class="news-l-head">
              <img src="../../images/bg.jpg" alt=""> <!-- activeIndex -->
          </div>

          <div class='news'>
              <div class='news_title'>行业资讯</div>
              <ul>
                  <li class='item' v-for='item in newsList'>
                      <div class='item_title'>{{item.consult_title}}</div>
                      <div class='item_content'>{{item.consult_content}}</div>
                      <div class='item_time'>{{item.ctime}}</div>
                  </li>
              </ul>
              <ul class='pagination'>
                  <li class='total'>共{{total}}记录</li>
                  <li class='top' @click="changePage('-')">&lt;</li>
                  <li class='item' :class="item === params.page ? 'checked' : ''" v-for='item in paginationList' @click='changePage(item)'>{{item}}</li>
                  <!-- <li class='item' v-if='paginationList.length > 10'>...</li> -->
                  <li class='end' @click="changePage('+')">&gt;</li>
              </ul>
          </div>
      </div>
      <div class="news-r"></div>
  </div>
</template>

<script>
import $ from "jquery"
import vbanner from "@/pages/components/vbanner"
export default {
  components:{
    vbanner
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
            limit: 1,
        },
        startPage: 1,
        paginationList: [],
        // PaginationSIze: 4,
    };
  },
  created(){
      this.getNewsList(this.params);
  },
  methods: {
    getNewsList(params){
        let query = '';

        for(let key in params){
            query += (query === '' ? '?' : '&') + key + '=' + params[key];
        }

        this.http.get("http://web.healthsource.com.cn/api/v1/home/news" + query).then(res => {

            if(res.data.status === 0){
                this.newsList = res.data.data;
                this.total = res.data.pagination.total;
                for(let i = 0, len = this.total; i * this.params.limit < len; i++){
                    this.paginationList[i] = this.startPage + i ; // i + 1;
                }
            }else{
                this.newsList = [];
            }
            // callback();
            // let content = document.getElementsByClassName('item_content');
            // console.log(content);
        });
    },
    changePage(page){
        if(page === '+'){
            this.params.page < this.paginationList.length ? this.params.page++ : void(0);
        }else if(page === '-'){
            this.params.page > 1 ? this.params.page-- : void(0);
        }else{
            this.params.page = page;
        }

        this.getNewsList(this.params);
    },
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
        .item_title
            height: 30px;
            line-height : 30px;
            font: bold 16px 'MicrosoftYaHei';
            margin-bottom: 10px;
            overflow hidden;
        .item_time
            font: 7px 'MicrosoftYaHei';
            color: #a5b8d6;
.news-r
    width 350px
    min-height 200px
    background-color #ddd

.pagination
    margin-bottom: 35px;
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
</style>
