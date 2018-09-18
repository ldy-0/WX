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
        <el-button slot="append" icon="el-icon-search" @click="searchNumber"></el-button>
    </div>
<el-container class="notice">
<el-main>
    <el-table
      :data="tableData"
      style="width: 100%" >

    <el-table-column
        label="头像">
        <template slot-scope="scope">
        <img :src="scope.row.subscriber_avatar" alt="" style="width:50px;height:50px;">
      </template>
    </el-table-column>

    <el-table-column
        label="昵称" 
        prop="subscriber_nickname">
    </el-table-column>

    <el-table-column
        label="手机号" 
        prop="subscriber_phone">
    </el-table-column>

    <el-table-column
        label="名字" 
        prop="subscriber_name">
    </el-table-column>

    <el-table-column
        label="孩子年龄" 
        prop="subscriber_age">
    </el-table-column>

    <el-table-column
        label="孩子年级" 
        prop="subscriber_grade">
    </el-table-column>

    <el-table-column
        label="所在城市" 
        prop="subscriber_city">
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
import { getMemberList, postSearchNumber } from "@/api/answer";
export default {
  created() {
    this.getList_api(1, 0);
  },
  data() {
    return {
      inputPhoneNum: "",
      tableData: []
    };
  },
  methods: {
    getList_api: function(page, limit) {
      var data = {
        page: page,
        limit: limit
      };
      getMemberList(data).then(res => {
        this.tableData = res.data;
        console.log(res.data);
      });
    },
    searchNumber: function() {
      var data = {
        phone: this.inputPhoneNum
      };
      postSearchNumber(data).then(res => {
        console.log(res.data);
        this.tableData = res.data;
      });
    }
  }
};
</script>