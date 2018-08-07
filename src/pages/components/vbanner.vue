<template>
  <div>
    <!--轮播banner-->    
    <div class="content-max">
        <div class="banner" id="banner">
            <div class="sections">
                <div class="section" id="section0"><a  value="1"></a></div>
                <div class="section" id="section1"><a ></a></div>
                <div class="section" id="section2"><a ></a></div>
                <div class="section" id="section3"><a ></a></div>
            </div>
        </div>
    </div>
    <div id="clear"></div>
  </div>
</template>

<script>
    import $ from "jquery";
    import pageSwitch from "@/js/pageSwitch.min.js"
    export default {
        data(){
            return {
                str:{
                    direction:'horizontal',
                    easing:'ease-in',
                    duration:1000,
                    autoPlay:true,
                    loop:'true'
                },  
                stra:{
                    direction:'horizontal',
                    easing:'ease-in',
                    duration:1000,
                    autoPlay:false,
                    loop:'true'
                }
            }
        },
        mounted() {
            console.log("vbanner mounted!");
            this.bannerMove()
        },
        methods:{
            bannerMove(){
                pageSwitch($)
                $("#banner").PageSwitch(this.str);
            }
        }
        
    };
</script>

<style>
</style>
