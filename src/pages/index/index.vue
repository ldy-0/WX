<template>
  <div class="index">
      <!-- <button @click="submit">submit</button> -->
      <vheader></vheader>
      <router-view></router-view>
      <vfooter></vfooter>
  </div>
</template>

<script>
import $ from "jquery"
import vheader from "@/pages/components/vheader"
import vfooter from "@/pages/components/vfooter"
export default {
  components:{
    vheader,
    vfooter,
  },
  mounted(){
    console.log("index mounted!")
  },
  methods:{
    // submit(){
    //   this.http.post("http://101.132.172.106:9001/visitors")
    //   .then(response => (console.log(response)))
    // }
  }
}
</script>

<style>

</style>
