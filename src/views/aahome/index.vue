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
  <div class="dashboard-container" id="home">
    <!-- <el-form :model="formForNotive" >
      <el-form-item  label="所属行业" >
        <el-select v-model="formForNotive.industry" placeholder="请选择行业">
          <el-option
            v-for="item in industryList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form> -->
    <!-- <input type="file" ref="i1" multiple >
    <button ref="b1" @click="upload">upload</button>
    <button  @click="getfile">getfile</button> -->
    <component :is="currentRole" class="dashboard-hbs " :class="down"></component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import admin from './admin'
import seller from './seller'

import {test} from '@/api/seller'

import uploadFn from '@/utils/aahbs'
let stop = false

export default {
  mounted(){
  },
  beforeDestroy(){
  },
  created() {
  },
  name: 'home',
  components: { 
    admin, 
    seller 
  },
  data() {
    return {
      //
      timer:"",
      timer2:"",
      formForNotive:{
        industry:'edu',
      },
      industryList: [{  //通过接口获取 created时
          value: 'edu',
          label: '教育'
        }, {
          value: 'others',
          label: '其他'
        }],
      currentRole: 'admin',
      down:''
    }
  },
  methods:{
    // getfile(){
    //   console.log(this.$refs['i1'].files)
    // },
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
  
  
}
</script>
