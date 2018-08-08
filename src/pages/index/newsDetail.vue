<template>
  <div>
      <div v-if='newsDetail'>
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

    this.getNewsDetail(this.$route.query.id);

  },
  methods: {

    getNewsDetail(id){

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

  }
}
</script>
<style lang="stylus">
.news_wrap
    margin-top 28px
    display flex
    justify-content center


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
