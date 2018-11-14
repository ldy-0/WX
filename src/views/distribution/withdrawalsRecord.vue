<template>
	<div class="app-container">
		<div class="filter-container">
			<el-input style="width: 260px;" placeholder="请输入手机号" v-model="listQuery.search"></el-input>
			<el-button type="primary" icon="el-icon-search" @click="tableListSearch()">查询</el-button>

      <el-date-picker style="margin-left:60px;"
        v-model="searchTime"
        type="daterange"
        value-format="timestamp"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button type="primary" icon="el-icon-search" @click="timeSearch()">查询</el-button>

      <el-select style="margin-left:60px;" v-model="selectValue" placeholder="请选择" @change="selectSearch">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
		</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column type="index" width="50">
			</el-table-column>
      <el-table-column label="时间" prop="withdraw_time">
			</el-table-column>
			<el-table-column label="用户头像">
				<template slot-scope="scope">
					<img :src="scope.row.member_avatar" style="width:50px;height: 50px;">
				</template>
			</el-table-column>
			<el-table-column label="昵称" prop="member_truename">
			</el-table-column>
			<el-table-column label="手机号" prop="member_mobile">
			</el-table-column>
      <el-table-column label="提现账号" prop="withdraw_number">
			</el-table-column>
      <el-table-column label="账户姓名" prop="withdraw_name">
			</el-table-column>
      <el-table-column label="提现金额" prop="withdraw_money">
			</el-table-column>
      <el-table-column label="剩余佣金" prop="withdraw_surplus">
			</el-table-column>
      <el-table-column label="状态" prop="withdraw_status">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.withdraw_status == 0">待处理</el-tag>
          <el-tag v-if="scope.row.withdraw_status != 0" type="success">已完成</el-tag>
        </template>
			</el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
        <el-button type="primary" style="margin: 10px;" size="mini" v-if="scope.row.withdraw_status == 0" @click="changeState(scope)">改变状态</el-button>
        <el-button type="danger" style="margin: 10px;" size="mini" @click="deleteList(scope)">删除</el-button>
        </template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
		 :page-sizes="[10,20,30]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next" background>
		</el-pagination>
	</div>
</template>
<script>
import { getWithdraw, editState, deleteWithdraw } from "@/api/distribution";
export default {
  created() {
    //获取列表
    this.getMemberList({});
  },
  data() {
    return {
      //列表
      tableData: [],
      //分页（请求参数）
      listQuery: {
        page: 1,
        limit: 10,
        search: ""
      },
      //弹框是否打开
      dialogVisible: false,
      searchTime: "",
      selectValue: "",
      options: [
        {
          value: "1",
          label: "已完成"
        },
        {
          value: "0",
          label: "待处理"
        }
      ]
    };
  },
  methods: {
    //改变每页条数
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getMemberList({});
    },
    //选择哪一页
    handleCurrentChange(val) {
      console.log(val);
      this.listQuery.page = val;
      this.getMemberList({});
    },
    //查询
    tableListSearch() {
      if (!this.listQuery.search) return;
      this.getMemberList({});
    },
    timeSearch() {
      console.log(this.searchTime);
      this.getMemberList({
        start_time: this.searchTime[0] / 1000,
        end_time: this.searchTime[1] / 1000
      });
    },
    selectSearch() {
      console.log(this.selectValue);
      this.getMemberList({
        status: this.selectValue
      });
    },
    //以下为api操作
    getMemberList(data) {
      let getData = Object.assign(data, this.listQuery);
      getWithdraw(getData).then(res => {
        this.tableData = res.data;
        console.log(this.tableData);
      });
    },
    changeState(scope) {
      console.log(scope.row);
      let data = {
        member_withdrawid: scope.row.member_withdrawid,
        status: 1
      };
      editState(data).then(res => {
        console.log(res);
        this.getMemberList({});
      });
    },
    deleteList(scope) {
      console.log(scope.row);
      let data = {
        member_withdrawid: scope.row.member_withdrawid,
        delete: 1
      };
      deleteWithdraw(data).then(res => {
        console.log(res);
        this.getMemberList({});
      });
    }
  }
};
</script>
