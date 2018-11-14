<style>
.row-div {
  margin: 40px;
  font-size: 20px;
}
</style>


<template>
  <div>
    <div v-if="show" class="row-div">是否开启分销
        <el-switch style="margin-left:120px;"
          active-value="distribution"
          inactive-value="notdistribution"
          v-model="distribution_state">
        </el-switch>
    </div>
    <div v-if="show_s" class="row-div">是否开启分享获得积分
        <el-switch style="margin-left:40px;"
          active-value="share"
          inactive-value="notshare"
          v-model="share_state">
        </el-switch>
    </div>
    <div class="row-div">每次分享获得积分
        <el-input v-model="share_integral" style="width:200px;margin-left:140px;" placeholder="请输入内容"></el-input>
    </div>
    <div class="row-div">每次点击分享链接获得积分
        <el-input v-model="link_integral" style="width:200px;margin-left:60px;" placeholder="请输入内容"></el-input>
    </div>
    <div class="row-div">积分/现金
        <el-input v-model="convert_integral" style="width:200px;margin-left:60px;" placeholder="请输入内容"></el-input> 积分 = 
        <el-input v-model="convert_money" style="width:200px;margin-left:6px;" placeholder="请输入内容"></el-input> 现金
    </div>
    <div style="margin-left:280px;">
        <el-button type="primary" @click="keepSetting">保存</el-button>
    </div>
  </div>
</template>
<script>
import { getSettingInfo, postSetting } from "@/api/distribution";
export default {
  created() {
    //获取
    this.getSomeList();
  },
  data() {
    return {
      distribution_state: null, //分销状态: 0总平台关闭 ; 1商家关闭 ; 2商家开启
      share_state: null, //分享状态: 0总平台关闭 ; 1商家关闭 ; 2商家开启
      share_integral: null, //分享积分
      link_integral: null, //点击链接积分
      convert_integral: null, //兑换积分
      convert_money: null,
      show: true,
      show_s: true
    };
  },
  methods: {
    getSomeList() {
      getSettingInfo({}).then(res => {
        console.log(res);
        if (res.data.distribution_state === 1) {
          this.distribution_state = "notdistribution";
        } else if (res.data.distribution_state === 2) {
          this.distribution_state = "distribution";
        } else {
          this.show = false;
        }
        if (res.data.share_state === 1) {
          this.share_state = "notshare";
        } else if (res.data.share_state === 2) {
          this.share_state = "share";
        } else {
          this.show_s = false;
        }
        this.share_integral = res.data.share_integral;
        this.link_integral = res.data.link_integral;
        this.convert_integral = res.data.convert_integral;
        this.convert_money = res.data.convert_money;
      });
    },
    keepSetting() {
      console.log(this.distribution_state);
      console.log(this.share_state);
      let data = {
        distribution_state: this.distribution_state,
        share_state: this.share_state,
        share_integral: this.share_integral,
        link_integral: this.link_integral,
        convert_integral: this.convert_integral,
        convert_money: this.convert_money
      };
      postSetting(data).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
