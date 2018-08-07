<template>
 <!-- @mouseover="activeNow" @mouseleave="peaceNow" -->
  <div class="excom">
    <div class="excom-i">
        <img class="excom-i-img" :src="one.case_img" alt=""> <!-- one.img -->
        <div class="excom-cover"></div>
        <div class="excom-slide">
            <img :src="one.case_qrcodeimg" alt=""> <!-- one.code -->
            <div class="excom-slide-txt">
                扫码体验
            </div>
        </div>
    </div>
    <div class="excom-btm">
        {{one.name}}
    </div>
  </div>
</template>
<script>
    export default {
        props:{
            one:Object
        },
        data(){
            return {
                // one:{
                //     code:require("@/test/1.png"),
                //     img:require("@/test/img1.jpg"),
                //     name:"测试1321"
                // }
            }
        },
        mounted() {
        },
        methods:{
        }
        
    };
</script>
<style lang="stylus">
.excom
    width 267px
    box-shadow 2px 2px  6px #888888
    overflow hidden
    .excom-i
        height 460px
        width 100%
        position relative
        &:hover
            .excom-cover
                opacity 1
            .excom-slide
                 transform translateX(0)
        .excom-i-img
            width 100%
            height 100%
        .excom-cover
            position absolute
            background-color rgba(0,0,0,.6)
            z-index 5
            top 0
            left 0
            right 0
            bottom 0
            opacity 0
            transition .5s opacity
        .excom-slide
            z-index 10
            position absolute
            top 0
            left 0
            right 0
            bottom 0
            transition .5s transform
            transform translateX(100%)
            img 
                width 100%
                margin-top 60px
            .excom-slide-txt
                color #ffffff
                text-align center
                height 40px
                line-height 40px
                font-size 18px
    .excom-btm
        box-sizing border-box
        border-top 1px solid #eeeeee
        height 40px
        line-height 42px
        font-size 18px
        color #444444
        text-align center
</style>
