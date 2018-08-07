<template>
  <div>
    <!--公司介绍-->
    <div class="content-max bg-e after">
        <div class="content-min">
            <div class="footer-see">
                <div class="phone">
                    <ul>
                        <li>
                            <img src="@/images/logo.png">
                        </li>
                        <li class="new">
                            <img src="@/images/icon_400dianhua.png">
                            <p>17771873405【微信】</p>
                            
                        </li>
                        <li class="new">
                            <img src="@/images/icon_zuoji.png">
                            <p>027-83995127</p>
                            
                        </li>
                        <li class="new">
                            <img src="@/images/icon_shouji.png">
                            <p>17771873405</p>
                            
                        </li>
                        <li class="new">
                            <img src="@/images/icon_dingwei.png">
                            <p>武汉市硚口区古田丰盛路国际企业峰汇A3座4楼</p>
                            
                        </li>
                        
                    </ul>
                    
                </div>
                <div class="see-list">
                    <h2>资讯动态</h2>
                    <ul v-for='item in newsList'>
                        <li class="see-list-top">
                            <span class="icon"></span>
                            <a href="">{{item.consult_title}}</a>
                        </li>
                    </ul>


                </div>
                <div class="see">
                    <div class="img-see">
                        <img src="@/images/weixin.png">
                    </div>
                    <p class="big">17771873405【同微信】</p>
                    <p>服务咨询（7*24小时）</p>
                </div>
            </div>
        </div>
    </div>
    <div id="clear"></div>
    <!--版权申明-->
    <div class="content-max bg-e ">
        <div class="footer">
            <p>© 2017 - 2018 武汉佰益源科技信息有限公司 营业执照编号:91420100MA4KMHXRXE      鄂ICP备17012268号-4</p>
        </div>
        
    </div>
    <div id="clear"></div>
  </div>
</template>
<script>

export default {
    data(){
        return {
            newsList: [],
        }
    },
    mounted() {
    },
    methods:{
        getHotList(params){
            let query = '';

            for(let key in params){
                query += (query === '' ? '?' : '&') + key + '=' + params[key];
            }

            this.http.get("http://web.healthsource.com.cn/api/v1/home/news" + query).then(res => {

                if(res.data.status === 0){
                    console.log(res.data)
                    this.newsList = res.data.data;
                }
                
            });
        }
    },
    created(){

        this.getHotList({
            is_hot: 1,
            page: 1,
            limit: 5,
        });
    }
};
</script>

<style>
</style>
