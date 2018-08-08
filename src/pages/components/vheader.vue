<template>
  <div>
    <!--头部-->
    <div class="content-max bg-a ">
        <div class="content-min">
            <div class="top">
                <p class="left">
                    您好，欢迎来到
                    <a class="blue" href="#">佰益源</a>旗下微客立小程序平台，500强上市公司合作企业，信心之选
                </p>
                <ul class="right"> 
                    <li>价格套餐</li>
                    <li class="number blue-a">027-83995127</li>
                    <li>小程序定制热线</li>
                </ul>
            </div>
            
        </div>
    </div>
    <div id="clear"></div>
    <!-- !!! logo -->
    <div class="content-min">
        <div class="logo ">
            <div class="logo-see left">
                <img src="@/images/logo-a.png">
            </div>

            <div class="logo-list right">
                <!-- onclick='location.href=("http://p.qiao.baidu.com/cps/chat?siteId=11885065&userId=24595144")' -->
                <input class="fixinput right" 
                    @click='submitco' 
                    type="submit" value="申请合作"  />
                <p class="right">已有<span class="Orange">156,664</span>商家与微客立合作</p>
            </div>
        </div>
    </div>
    <div id="clear"></div>
    <!--导航-->
    <div class="content-max gray-border vh-line">
        <div class="content-min">
            <div class="nav">
                <div class="nav-left left">
                    <ul>
                        <li><router-link 
                        :class="index<=1?'vh-active':''" 
                        to="/" @click.native="changeTab(1)">网站首页</router-link></li>
                        <li><router-link 
                         @click.native="changeTab(2)" 
                        :class="index===2?'vh-active':''" to="/example">合作案例</router-link></li>
                        <li>
                            <router-link @click.native="changeTab(3)" :class="index === 3 ? 'vh-active':''" to="/news">资讯动态</router-link>
                        </li>
                        <li>
                            <router-link @click.native="changeTab(4)" :class="index === 4 ? 'vh-active':''" to="/introduction">小程序介绍</router-link>
                        </li>
                        <!-- <li><router-link 
                        @click.native="changeTab(3)" 
                        :class="index===3?'vh-active':''" to="/business">招商加盟</router-link></li> -->
                        <!-- <li><router-link to="/news">资讯动态</router-link></li> -->
                        <li @click="toggleab"><a href="javascript:void(0)"  
                        :class="index>4?'vh-active':''">关于我们</a></li>
                        <div id="clear"></div>
                    </ul>
                </div>
                <div class="nav-right right">
                    <div id="mq" class="mq right red ">
                      <div class="qimo">
                        <div id="mq1">
                          <ul>
                                <li><a href='#' class="red " >功能公告-开放咻一咻营销插件上线!</a></li>
                                <li><a href='#' class="red ">功能公告-开放咻一咻营销插件上线!</a></li>
                                <li><a href='#' class="red ">功能公告-开放咻一咻营销插件上线!</a></li>
                                <li><a href='#' class="red ">功能公告-开放咻一咻营销插件上线! </a></li>
                                <li><a href='#' class="red ">功能公告-开放咻一咻营销插件上线!</a></li>
                          </ul>
                        </div>
                        <div id="mq2"></div>
                      </div>
                    </div>
                    <span class="right"><img src="@/images/icon_laba.png"></span>
                </div>
            </div>
        </div>
        <div class="about-us-tab" 
            v-show="showab" @mouseleave="toggleab" >
            <router-link @click.native="changeTab(5)" 
            to="/aboutus" class="about-us-item" >
                <span class="iconfont icon-sanjiaoright"></span>
                <span :class="index===5?'vh-active':''">公司简介</span>
            </router-link>
            <router-link @click.native="changeTab(6)" to="/recruit" class="about-us-item">
                <span class="iconfont icon-sanjiaoright"></span>
                <span :class="index===6?'vh-active':''">诚聘英才</span>
            </router-link>
        </div>
    </div>
    <div id="clear"></div>
    <!--轮播banner-->    
  </div>
</template>

<script>
    import $ from "jquery";
    export default {
        data(){
            return {
                index:1,
                showab:false,
                tablist:["/","/home","/example", "/news", "/introduction","/aboutus","/recruit"]
            }
        },
        mounted() {
            this.getIndex(this.$route.path)
            console.log("vheader mounted!");
            this.letMove()
        },
        methods:{
            submitco(){
                window.location.href = "http://p.qiao.baidu.com/cps/chat?siteId=11885065&userId=24595144"
            },
            getIndex(path){
                let tempIndex = this.tablist.indexOf(this.$route.path)
                this.index = tempIndex
            },
            changeTab(index){
                console.log(index)
                this.index = Number(index)
            },
            toggleab(){
                this.showab = !this.showab
            },
            letMove() {
                var demo = document.getElementById("mq");
                var demo1 = document.getElementById("mq1");
                var demo2 = document.getElementById("mq2");
                demo2.innerHTML = document.getElementById("mq1").innerHTML;
                function Marquee() {
                if (demo.scrollLeft - demo2.offsetWidth >= 0) {
                    demo.scrollLeft -= demo1.offsetWidth;
                } else {
                    demo.scrollLeft++;
                }
                }
                var myvar = setInterval(Marquee, 50);
                demo.onmouseout = function() {
                myvar = setInterval(Marquee, 30);
                };
                demo.onmouseover = function() {
                clearInterval(myvar);
                };
            }
            
            
        }
        
    };
</script>

<style>
    .vh-active{
        font-weight: 700;
    }
    .fixinput:hover{
        background-color: rgb(67, 204, 255);
    }
    .logo-list{
        padding-right: 0;
    }
    .nav-left.left>ul{
        display: flex;
        justify-content: center;
        width: 800px;
    }

    .vh-line{
       padding-bottom: 10px;
       border-bottom: 2px solid #DDDDDD;
       position: relative;
    }
    .about-us-tab{
        position: absolute;
        width: 100%;
        height: 97px;
        background-color:#ffffff;
        z-index: 10;
        top: 50px;
        left: 0;
        display: flex;
        justify-content: center;
    }
    .about-us-item{
        display: flex;
        width: 150px;
        align-items: center;
        color: #5F5F5F;
        font-size: 14px;
    }
    .about-us-item:link{
        color: #5F5F5F;
    }
    .icon-sanjiaoright{
        margin-right: 27px;
        color : #3091F2;
    }
</style>
