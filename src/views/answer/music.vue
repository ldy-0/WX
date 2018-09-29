<style>
@import url("//unpkg.com/element-ui@2.4.6/lib/theme-chalk/index.css");
.div {
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.div-1 {
  width: 1500px;
  height: 400px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.title {
  font-size: 30px;
  margin: 20rpx;
  width: 200px;
  height: 40px;
}
.lab {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin: 20rpx;
  width: 600px;
  height: 40px;
  border: 1px solid #9a9a9a;
}
</style>

<template>
<div class="div">
    <div class="div-1">
    <div class="title">背景音乐</div>
    <div class="lab">{{fliename}}</div>
    <div style="width:40px;height:40px;"></div>
    <el-upload
        :auto-upload="false"
        action=""
        :on-change="handlePicture"
        :on-remove="handleRemove"
        :on-success="handUpSuccess"
        :show-file-list="false">
        <el-button type="primary" size="medium" >选择</el-button>
    </el-upload>
    </div>
    <el-button type="primary" size="medium" @click="addMusic" >确定</el-button>
</div>
</template>

<script>
import { postMusic } from "@/api/answer";
import uploadFn from "@/utils/aahbs";
export default {
  created() {},
  data() {
    return {
      fliename: "",
      url: ""
    };
  },
  methods: {
    addMusic: function() {
      console.log(this.url);
      var data = {
        bg_music: this.url[0]
      };
      postMusic(data).then(res => {
        console.log(res.data);
      });
    },
    async handlePicture(file, fileList) {
      console.log("change0", file);
      this.fliename = file.name;
      this.url = await uploadFn(file.raw);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.fliename = "";
    },
    handUpSuccess: function(response, file, fileList) {
      console.log("fileList", fileList);
      console.log("file", file);
    }
  }
};
</script>