<style>
@import url("//unpkg.com/element-ui@2.4.6/lib/theme-chalk/index.css");
.div {
  margin: 20px;
  display: flex;
  flex-direction: column;
}
.el-div {
  /* margin: 20px; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-flow: nowrap;
}
.input-search {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 320px;
}

.el-form {
  width: 750px;
}
.el-form-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: nowrap;
}
</style>

<template>
<div class="div">
    <div class="input-search">
        <el-input v-model="inputPhoneNum" placeholder="搜索手机号"></el-input>
        <div style="width:1px;height: 30px;"></div>
        <el-button slot="append" icon="el-icon-search"></el-button>
    </div>
<el-container class="notice">
<el-main>
    <el-table
      :data="tableData"
      style="width: 100%" >

    <el-table-column
        label="头像">
        <template slot-scope="scope">
        <img :src="scope.row.userPic" alt="" style="width:50px;height:50px;">
      </template>
    </el-table-column>

    <el-table-column
        label="昵称" 
        prop="nickName">
    </el-table-column>

    <el-table-column
        label="手机号" 
        prop="phoneNumber">
    </el-table-column>

    <el-table-column
        label="名字" 
        prop="name">
    </el-table-column>

    <el-table-column
        label="孩子年龄" 
        prop="age">
    </el-table-column>

    <el-table-column
        label="孩子年级" 
        prop="grade">
    </el-table-column>

    <el-table-column
        label="所在城市" 
        prop="city">
    </el-table-column>
    
    </el-table>
</el-main>
<!-- <el-footer>
  <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next" :total="total">
  </el-pagination>
</el-footer> -->
</el-container>
</div>
</template>

<script>
export default {
  data() {
    return {
      inputPhoneNum: "",

      tableData: [
        { userPic: "../../../static/img/plane.png", nickName: "qwe", phoneNumber:"13356895412" , name:"sanh" , age:"12" , city:"wuhan" , grade : "6" },
        { userPic: "../../../static/img/plane.png", nickName: "qwe", phoneNumber:"13356895412" , name:"sanh" , age:"12" , city:"wuhan" , grade : "6" },
        { userPic: "../../../static/img/plane.png", nickName: "qwe", phoneNumber:"13356895412" , name:"sanh" , age:"12" , city:"wuhan" , grade : "6" }
      ]
    };
  },
  methods: {

  }
};
</script>