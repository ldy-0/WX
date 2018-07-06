<style lang="stylus">
.dashboard-container
  .dashboard-hbs
    color #555
    margin-left 20%
    transition all 1s 
  .hbs-down
    transform translateY(100px)
</style>

<template>
  <div class="dashboard-container">
    <input type="file" ref="i1" multiple >
    <button ref="b1" @click="upload">upload</button>
    <button  @click="getfile">getfile</button>
    <component :is="currentRole" class="dashboard-hbs " :class="down"></component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import admin from './admin'
import seller from './seller'

import uploadFn from '@/utils/aahbs'

export default {
  name: 'home',
  components: { admin, seller },
  data() {
    return {
      currentRole: 'admin',
      down:''
    }
  },
  methods:{
    getfile(){
      console.log(this.$refs['i1'].files)
    },
    async upload(){
      let files = Array.prototype.slice.call(this.$refs['i1'].files) 
      let allUrl = await uploadFn(files)
      console.log(allUrl)
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (this.roles.includes('admin')||this.roles.includes('admin2')) {
      this.currentRole = 'admin'
    }else{
      this.currentRole = 'seller'
    }
  },
  mounted(){
    setTimeout(()=>{
      this.down = 'hbs-down'
    },1000)
  }
}
</script>
