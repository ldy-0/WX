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
  width: 500px;
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
<div class="el-div">
    <!-- <el-button type="primary" icon="el-icon-edit" @click="toAddClass">添加分类</el-button> -->
    <div class="input-search">
        <div class="block">
            <el-date-picker
                  v-model="inputTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
            </el-date-picker>
        </div>
        <el-button slot="append" icon="el-icon-search" @click="searchTime"></el-button>
    </div>
    <div style="width:20px;height: 30px;"></div>
        <div class="input-search">
        <el-input v-model="inputRoomTitle" placeholder="房间名搜索"></el-input>
        <div style="width:1px;height: 30px;"></div>
        <el-button slot="append" icon="el-icon-search" @click="searchRoomTitle"></el-button>
    </div>
    <div style="width:20px;height: 30px;"></div>
    <el-dialog title="详情" :visible.sync="dialogFormVisible">
      
      <el-dialog title="" :visible.sync="dialogFormVisible_info" append-to-body>
      <el-button type="primary" icon="document" :loading="downloadLoading" @click="toExport">导出</el-button>        
      <el-table :data="dialogTableData_info" style="width: 100%" >
      <el-table-column
        label="题目"
        prop="information_title"
        >
      </el-table-column>

      <el-table-column
        label="选项" 
        prop="elect"
        >
      </el-table-column>

        <el-table-column
        label="正确项"
        prop="answers"
        >
      </el-table-column>
    </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible_info = false">取 消</el-button>
        </div>
    </el-dialog>

        <el-table
      :data="dialogTableData"
      style="width: 100%" >
      <el-table-column
        label="昵称"
        prop="subscriber_nickname"
        >
      </el-table-column>

      <el-table-column
        label="姓名" 
        prop="subscriber_name"
        >
      </el-table-column>

        <el-table-column
        label="手机号"
        prop="subscriber_phone"
        >
      </el-table-column>
      <el-table-column
        label="答对题数" 
        prop="right"
        >
      </el-table-column>

      <el-table-column
        label="答错题数" 
        prop="wrong"
        >
      </el-table-column>
      <el-table-column
        label="操作" 
        >

        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="toDialogInfo(scope.$index)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
    </el-dialog>
    <div style="width:20px;height: 30px;"></div>
    </div>

<el-container class="notice">
<el-main>
    <el-table
      :data="tableData"
      style="width: 100%" >
      <el-table-column
        label="时间" 
        prop="start_time"
        >
      </el-table-column>
      <el-table-column
        label="房间名" 
        prop="room_name"
        >
      </el-table-column>
      <el-table-column
        label="参与人数" 
        prop="number"
        >
      </el-table-column>
      <el-table-column
        label="操作" 
        >
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="toAwsInfo(scope.$index)">详情</el-button>
          <el-button size="mini" type="danger" @click="toDelete(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
</el-main>

<el-footer>
  <el-pagination
    layout="prev, pager, next"
    :total="tableDataLength"
    :page-size="10"
     @current-change="handleCurrentChange">>
  </el-pagination>
</el-footer>
</el-container>
    </div>
    
</template>
<script>
import {
  getAwsHistory,
  putRoomNameSearch,
  postTimeSearch,
  getRoomAwsHistory,
  deleteHistoryList,
  getSortDetails
} from "@/api/answer";

export default {
  created() {
    getAwsHistory({ page: 1, limit: 0 }).then(res => {
      this.tableDataLength = res.data.length;
    });
    this.getHistoryList_api(1, 10);
  },
  data() {
    return {
      tableDataLength: 0,
      inputTime: null,
      inputRoomTitle: null,
      dialogTableData_info: [],
      downloadLoading: false,
      dialogFormVisible_info: false,
      dialogFormVisible: false,
      dialogTableData: [],
      formLabelWidth: "80px",
      tableData: []
    };
  },
  methods: {
    handleCurrentChange: function(val) {
      this.getHistoryList_api(val, 10);
    },
    getHistoryList_api: function(page, limit) {
      var data = {
        page: page,
        limit: limit
      };
      getAwsHistory(data).then(res => {
        console.log("class list res", res.data);
        this.tableData = [];
        this.tableData = res.data;
      });
    },
    toDelete: function(id) {
      console.log(this.tableData[id].record_id);
      var data = {
        record_id: this.tableData[id].record_id
      };
      deleteHistoryList(data).then(res => {
        this.tableData.splice(id, 1);
      });
    },
    toAwsInfo: function(id) {
      this.dialogFormVisible = true;
      var data = {
        record_id: this.tableData[id].record_id
      };
      getRoomAwsHistory(data).then(res => {
        console.log("ress", res.data);
        this.dialogTableData = res.data;
      });
    },
    toDialogInfo: function(id) {
      this.dialogFormVisible_info = true;
      var data = {
        history_id: this.dialogTableData[id].history_id
      };
      getSortDetails(data).then(res => {
        console.log("resssss", res.data);
        this.dialogTableData_info = res.data;
      });
    },

    searchTime: function() {
      var data = {
        start_time: Math.round(Date.parse(this.inputTime[0]) / 1000),
        end_time: Math.round(Date.parse(this.inputTime[1]) / 1000)
      };
      postTimeSearch(data).then(res => {
        this.tableData = res.data;
        console.log(this.tableData);
      });
    },
    searchRoomTitle: function() {
      var data = {
        name: this.inputRoomTitle
      };
      putRoomNameSearch(data).then(res => {
        this.tableData = res.data;
        console.log(this.tableData);
        // this.getHistoryList_api(1, 0);
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    toExport: async function() {
      //导出
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = ["题目", "用户选项", "正确选项"];
        const filterVal = ["information_title", "elect", "answers"];
        const tableDataAll = this.dialogTableData_info;
        const data = this.formatJson(filterVal, tableDataAll);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "商家题目列表"
        });
        this.downloadLoading = false;
      });
    }
  }
};
</script>