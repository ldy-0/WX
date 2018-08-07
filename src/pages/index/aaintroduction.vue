<template>
  <div class="intro">
      <div class="intro-banner" @click="gotoExperience">
      </div>
      <div class="intro-rev">
          <div class="intro-rev-h">
              小程序革命
          </div>
          <div class="intro-rev-c">
              <div class="intro-rev-l">
                  <div class="intro-rev-l-h">
                      独立APP困境？
                  </div>
                  <div class="intro-rev-l-c">
                      <div class="intro-rev-l-i">
                          创业初期和微型企业的困境?
                      </div>
                      <div class="intro-rev-l-i">
                          独立APP开发成本高、周期长?
                      </div>
                      <div class="intro-rev-l-i">
                          独立APP安装和活跃量提成成本难?
                      </div>
                  </div>
              </div>
              <div class="intro-rev-r">
                  <img class="intro-rev-r-i" src="@/images/xcxname-box1-img1.jpg" />
                  <div class="intro-rev-r-c">
                      <div class="intro-rev-r-p1">
                          有没有不用安装,用完即走的APP?
                      </div>
                      <div class="intro-rev-r-p2">
                          微信生态下,触手可及、用完即走的小程序实现您的梦想!
                      </div>
                      <div class="intro-rev-r-line"></div>
                      <div class="intro-rev-r-p3">
                          融合易小商城紧随微信生态的步伐,打造出融合易电商小程序,
                      </div>
                      <div class="intro-rev-r-p3">
                          让大家提前感受触手可及、用完即走的快感!
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="intro-adv">
          <div class="intro-adv-h">
              小程序的优势
          </div>
          <div class="intro-adv-c">
              <div class="intro-adv-item">
                  <img src="@/images/xcx-box2-img1.png" />
                  <p>用户体验好,原生APP交互体验,美观流畅</p>
              </div>
              <div class="intro-adv-item">
                  <img src="@/images/xcx-box2-img2.png" />
                  <p>降低获客成本,扫一扫二维码即可获取用户</p>
              </div>
              <div class="intro-adv-item">
                  <img src="@/images/xcx-box2-img3.png"  />
                  <p>增加获取渠道,在微信生态链中获得更多用户</p>
              </div>
              <div class="intro-adv-item">
                  <img src="@/images/xcx-box2-img4.png"  />
                  <p>开发周期短,商家可快速打造自己的电商平台</p>
              </div>
          </div>
      </div>
      <div class="intro-ent">
          <div class="intro-ent-h">小程序多入口</div>
          <div class="intro-ent-c">
              <div class="intro-ent-item">
                  <img src="@/images/xcx-box3-img1.png" />
                  <div class="intro-ent-item-h">
                      扫码进入应用
                  </div>
                  <div class="intro-ent-item-p">
                      当商家做线下活动时，一个二维码搞定一切
                  </div>
              </div>
              <div class="intro-ent-item">
                  <img src="@/images/xcx-box3-img2.png" />
                  <div class="intro-ent-item-h">
                      桌面快捷图标
                  </div>
                  <div class="intro-ent-item-p">
                      当用户喜欢小猪电商时可以设置桌面图标
                  </div>
              </div>
              <div class="intro-ent-item">
                  <img src="@/images/xcx-box3-img3.png" />
                  <div class="intro-ent-item-h">
                      微信内部
                  </div>
                  <div class="intro-ent-item-p">
                      微信内部点击小程序，即可查找所有应用
                  </div>
              </div>
              <div class="intro-ent-item">
                  <img src="@/images/xcx-box3-img4.png" />
                  <div class="intro-ent-item-h">
                      更多入口
                  </div>
                  <div class="intro-ent-item-p">
                      后期可能嵌入微信社交中 一个@即可进入
                  </div>
              </div>
          </div>
      </div>
      <div class="intro-use">
          <div class="intro-use-h">小程序功能</div>
          <div class="intro-use-w clearfix">
              <div class="intro-use-c">
              <div class="intro-use-ia">
                  <div class="intro-use-i1">
                      <img src="@/images/icon-home.png" alt="">
                      <p>首页</p>
                        <div class="intro-ab">
                        <h2>首页</h2>
                        <p> 展示商城广告、推荐商品、促销</p>
                        </div>
                  </div>
                  <div class="intro-use-i2">
                      <img src="@/images/icon-class.png" alt="">
                      <p>分类</p>
                    <div class="intro-ab">
                    <h2>分类</h2>
                    <p> 商品分类，一目了然</p>
                    </div>
                  </div>
                  <div class="intro-use-i3">
                      <img src="@/images/icon-goods.png" alt="">
                      <p>商品</p>
                        <div class="intro-ab">
                        <h2>商品</h2>
                        <p>展示商品信息，提供购买 </p>
                        </div>
                  </div>
                  <div class="intro-use-i4">
                      <img src="@/images/icon-package.png" alt="">
                      <p>套餐</p>
                    <div class="intro-ab">
                    <h2>套餐</h2>
                    <p> 将促销商品作为套餐出售</p>
                    </div>
                  </div>
              </div>
              <div class="intro-use-ib">
                  <div class="intro-use-i1">
                      <img src="@/images/icon-shopcart.png" alt="">
                      <p>购物车</p>
                        <div class="intro-ab">
                        <h2>购物车</h2>
                        <p>将商品放入购物车下达订单 </p>
                        </div>
                  </div>
                  <div class="intro-use-i2">
                      <img src="@/images/icon-comment.png" alt="">
                      <p>推荐</p>
                    <div class="intro-ab">
                    <h2>推荐</h2>
                    <p>向用户推荐商品 </p>
                    </div>
                  </div>
                  <div class="intro-use-i3">
                      <img src="@/images/icon-pay.png" alt="">
                      <p>支付</p>
                <div class="intro-ab">
                <h2>支付</h2>
                <p>接入微信支付，即时购买 </p>
                </div>
                  </div>
                  <div class="intro-use-i4">
                      <img src="@/images/icon-order.png" alt="">
                                    <p>订单</p>
                <div class="intro-ab">
                <h2>订单</h2>
                <p>下达订单，追踪交易状态 </p>
                </div>
                  </div>
              </div>
              <div class="intro-use-ic">
                  <div class="intro-use-i1">
                      <img src="@/images/icon-login1.png" alt="">
                      <p>登录</p>
                                        <div class="intro-ab">
                                        <h2>登录</h2>
                                        <p>支持微信账号登录 </p>
                                        </div>
                  </div>
                  <div class="intro-use-i2">
                      <img src="@/images/icon-msg1.png" alt="">
                      <p>通知</p>
                                    <div class="intro-ab">
                                    <h2>通知</h2>
                                    <p>系统通知，告知用户 </p>
                                    </div>
                  </div>
                  <div class="intro-use-i3">
                      <img src="@/images/icon-book1.png" alt="">
                      <p>收藏</p>
                                        <div class="intro-ab">
                                        <h2>收藏</h2>
                                        <p>收藏商品，随时购买 </p>
                                        </div>
                  </div>
                  <div class="intro-use-i4">
                      <img src="@/images/icon-onsale1.png" alt="">
                      <p>优惠券</p>
            <div class="intro-ab">
            <h2>优惠券</h2>
            <p>满足条件可使用优惠券</p>
            </div>
                  </div>
              </div>
          </div>
          </div>
      </div>
      <div class="intro-pro">
          <div class="intro-pro-h">
              小程序常见问题
          </div>
          <div class="intro-pro-c">
              <div class="intro-pro-item">
                  <div class="intro-pro-q">
                      <span>01 /</span>
                      什么是小程序
                  </div>
                  <div class="intro-pro-a">
                      小程序是一种不需要下载安装即可使用的应用，它实现了应用“触手可及”的梦想，用户扫一扫或者搜一下即可打开应用。也体现了“用完即走”的理念，用户不关心是否安装太多应用的问题。应用将无处不在，随时随地可用，但又无需安装卸载。
                  </div>
              </div>
          </div>
          <div class="intro-pro-c">
              <div class="intro-pro-item">
                  <div class="intro-pro-q">
                      <span>02 /</span>
                      它有什么作用
                  </div>
                  <div class="intro-pro-a">
                      它能满足用户的核心诉求：使用应用不再必须去应用商店下载、注册、登录，省去了一系列操作的麻烦。让使用应用变得简单方便。
                  </div>
              </div>
          </div>
          <div class="intro-pro-c">
              <div class="intro-pro-item">
                  <div class="intro-pro-q">
                      <span>03 /</span>
                      它能跟app一样吗？
                  </div>
                  <div class="intro-pro-a">
                      与原生态的app不同，微信小程序是指基于微信客户端通过调用接口可实现对手机设备的访问。
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
    export default {
        data(){
            return {
            }
        },
        mounted() {
        },
        methods:{
            gotoExperience(){

            }
        }
    };
</script>

<style lang="stylus">
.intro-banner
    width 100%
    height 450px
    background url("http://webiteimg-1253114089.file.myqcloud.com/topsee/4.jpg") no-repeat 
    background-size cover
.intro-rev
    padding-bottom 40px
    .intro-rev-h
        text-align center   
        font-size 46px
        font-weight 700
        color #323232
        margin-top 80px
        margin-bottom 50px
    .intro-rev-c
        width 1204px
        margin 0 auto
        display flex
        align-items center
        .intro-rev-l
            position relative
            padding 30px 0 20px 0
            width 290px
            height 280px
            color #434343
            background-color #f0f0f0
            &:before,&:after
                z-index -1
                content ""
                height 0
                width 0
                position absolute
                top 0
                right -6px
                border-top 5px solid transparent
                border-right 3px solid transparent
                border-left 3px solid #999
                border-bottom 5px solid #999
            &:after
                top 100%
                margin-top -10px
                transform rotateX(180deg)
            .intro-rev-l-h
                margin 0 auto
                width 250px
                font-size 27px
                padding-bottom 14px
                margin-bottom 20px
                border-bottom 1px solid #dcdcdc 
            .intro-rev-l-c
                .intro-rev-l-i
                    margin 0 auto
                    width 250px
                    height 50px
                    background-color #fff 
                    font-size 13px
                    text-align center
                    line-height 50px
                    border-radius 4px
                    margin-bottom 20px
                    transition all .2s
                .intro-rev-l-i:hover
                    background-color #ff0000
                    color #ffffff  
        .intro-rev-r
            flex 1
            background-color rgba(39,102,165,0.83)
            height  310px
            display flex
            align-items center
            .intro-rev-r-i
                width 284px
                height 178px
                margin-right 30px
                margin-left 30px
            .intro-rev-r-c
                flex 1
                color #ffffff
                .intro-rev-r-p1
                    font-size 28px
                    margin-bottom 4px
                .intro-rev-r-p2
                    font-size 20px
                    margin-bottom 4px
                .intro-rev-r-line
                    width 80px
                    height 3px
                    background-color #fff
                    margin 10px 0 20px 0
                .intro-rev-r-p3
                    font-size 16px
                    line-height 36px
.intro-adv
    background-color #f2f2f2
    width 100%
    height 414px
    padding-top 80px
    box-sizing border-box
    text-align center
    color #323232
    .intro-adv-h
        font-size 46px
        font-weight 700
        margin-bottom 50px
    .intro-adv-c
        width 1080px
        margin 0 auto 
        display flex
        justify-content space-between
        flex-wrap wrap
        .intro-adv-item
            color #444
            margin-bottom 58px
            width 474px
            height 68px
            background-color #fff
            display flex
            align-items center
            img 
                width 40px
                height 40px
                padding 0 20px
            p
                flex 1
                line-height 68px
                font-weight 700
                font-size 18px
                text-align center
                &:hover
                    color #ff0000
.intro-ent
    text-align center
    padding-top 80px
    box-sizing border-box
    height 480px
    color #000
    .intro-ent-h
        font-weight 700
        font-size 46px
    .intro-ent-c
        margin-top 10px
        display flex
        background-color #fff
        justify-content center
        .intro-ent-item
            width 325px
            height 272px
            img 
                padding 74px 0 46px 0
            .intro-ent-item-h
                font-size 20px
                color #1e1e1e
                margin-bottom 10px
            .intro-ent-item-p
                font-size 12px
                color #999
.intro-use
    width 100%
    height 500px
    background-color #f2f2f2
    text-align center
    .intro-use-h
        padding 36px 0 24px
        font-size 46px
        font-weight 700
        color #323232
    .intro-use-w
        margin 0 auto
        width 1200px
    .intro-use-c
        width 1200px
        margin 0 auto
        float left
        justify-content center
        &>div
            float left
            width 408px
            position relative
            font-size 0
            &>div
                font-size 20px
                float left
                position relative
                width 156px
                height 134px
                background url("../../images/box-bg.png") no-repeat center
                img 
                    padding-top 30px
                    margin-bottom 15px
                p
                    font-size 16px
                .intro-ab
                    width 100%
                    height 100%
                    left 0
                    top 0
                    color #fff
                    position absolute
                    opacity 0
                    transition all .5s
                    h2
                        font-size 16px
                        padding-top 30px
                        padding-bottom 10px
                    p
                        font-size 14px
                        padding 0 14px
                        line-height 20px
                    &:hover
                        opacity 1
            .intro-use-i1
                z-index 1
                margin-top 68px
                
            .intro-use-i2
                margin-left -30px
                z-index 2
            .intro-use-i3
                margin-left: -30px
                margin-top 68px
                z-index 3
            .intro-use-i4
                margin 142px 0 0 -282px 
                z-index 4
        .intro-use-ia
            display block
            color #1475f1
            & .intro-ab
                    background url("../../images/blue-bg.png") no-repeat center
        .intro-use-ib
            margin 78px 0 0 -36px
            color #2fe17a
            & .intro-ab
                    background url("../../images/green-bg.png") no-repeat center
        .intro-use-ic
            margin-left -36px
            color #ff6633
            & .intro-ab
                    background url("../../images/red-bg.png") no-repeat center
.intro-pro
    width 100%
    padding-top 80px
    text-align center
    .intro-pro-h
        padding-bottom 50px
        font-size 46px
        font-weight 700
        color #323232
    .intro-pro-c
        width 1200px
        margin 0 auto
        text-align left 
        .intro-pro-item
            margin-bottom 40px
            .intro-pro-q
                font-size 24px
                margin-bottom 20px
                color #3f3f3f
                span 
                    color #999
                    font-size 30px
                    display inline-block
            .intro-pro-a
                font-size 18px
                line-height 30px
                color #565656
        
</style>
