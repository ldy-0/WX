<style>
    .row-div{
        margin: 40px;
        font-size: 20px;
    }
</style>


<template>
  <div>
    <div class="row-div">是否开启分销
        <el-switch style="margin-left:120px;"
          v-model="isDistribution">
        </el-switch>
    </div>
    <div class="row-div">是否开启分享获得积分
        <el-switch style="margin-left:40px;"
          v-model="isShare">
        </el-switch>
    </div>
    <div class="row-div">每次分享获得积分
        <el-input v-model="input" style="width:200px;margin-left:140px;" placeholder="请输入内容"></el-input>
    </div>
    <div class="row-div">每次点击分享链接获得积分
        <el-input v-model="input" style="width:200px;margin-left:60px;" placeholder="请输入内容"></el-input>
    </div>
    <div class="row-div">积分/现金
        <el-input v-model="input" style="width:200px;margin-left:60px;" placeholder="请输入内容"></el-input> 积分 = 
        <el-input v-model="input" style="width:200px;margin-left:6px;" placeholder="请输入内容"></el-input> 现金
    </div>
    <div style="margin-left:280px;">
        <el-button type="primary">保存</el-button>
    </div>
  </div>
</template>
<script>
// import { getMemberList_api } from "@/api/distribution";
export default {
  created() {
    //获取
    // this.getMemberList();
  },
  data() {
    return {
      isDistribution: true,
      isShare: false
    };
  },
  methods: {}
};
</script>
