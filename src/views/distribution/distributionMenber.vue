<template>
  <div class="app-container">
    <!--预览图片开始 -->
    <el-dialog :visible.sync="dialogVisible">
      <div class="filter-container" v-if="isShowSeach">
        <el-input style="width:240px;" placeholder="请输入手机号/昵称" v-model="search"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="dialogTableSearch()">查询</el-button>
      </div>
      <el-table :data="dialogTable" style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column label="用户头像">
          <template slot-scope="scope">
            <img :src="scope.row.member_avatar" style="width:50px;height: 50px;">
          </template>
        </el-table-column>
        <el-table-column label="昵称" prop="member_truename"></el-table-column>
        <el-table-column label="手机号" prop="member_mobile"></el-table-column>
        <el-table-column label="历史积分" prop="history_integral"></el-table-column>
        <el-table-column label="历史佣金" prop="history_commission"></el-table-column>
        <el-table-column label="创造积分" prop="create_integral"></el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>-->
      </el-table>
    </el-dialog>
    <!--预览图片结束 -->
    <!--顶部菜单开始 -->
    <div class="filter-container">
      <el-input style="width: 340px;" placeholder="请输入手机号/昵称" v-model="listQuery.search"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="tableListSearch()">查询</el-button>
    </div>
    <!--顶部菜单结束 -->
    <!--中间表格开始 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="用户头像">
        <template slot-scope="scope">
          <img :src="scope.row.member_avatar" style="width:50px;height: 50px;">
        </template>
      </el-table-column>
      <el-table-column label="昵称" prop="member_truename"></el-table-column>
      <el-table-column label="手机号" prop="member_mobile"></el-table-column>
      <el-table-column label="历史积分" prop="history_integral"></el-table-column>
      <el-table-column label="历史佣金" prop="history_commission"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="lookingSuperior(scope)">查看上级</el-button>
          <el-button type="primary" size="mini" @click="lookingSubordinate(scope)">查看下级</el-button>
          <!-- <el-button type="danger" size="mini">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!--中间表格结束 -->
    <!-- 表格分页开始 -->
    <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
		 :page-sizes="[10,20,30]" :page-size="listQuery.limit"  layout="total, sizes, prev, pager, next" background>
    </el-pagination>-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.page"
      :page-sizes="[10,20,30]"
      :page-size="listQuery.limit"
      layout="total, sizes, prev, pager, next"
      background
      :total="total"
    ></el-pagination>
    <!--表格分页结束 -->
  </div>
</template>
<script>
import { getMemberList, getSaler } from "@/api/distribution";
export default {
  created() {
    //获取列表
    this.getSomeList();
  },
  data() {
    return {
      total: 0,
      isShowSeach: true,
      //会员列表
      tableData: [],
      dialogTable: [],
      //分页（请求参数）
      listQuery: {
        page: 1,
        limit: 10,
        search: ""
      },
      dialogVisible: false,
      search: ""
    };
  },
  methods: {
    //改变每页条数
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getSomeList();
    },
    //选择哪一页
    handleCurrentChange(val) {
      console.log(val);
      this.listQuery.page = val;
      this.getSomeList();
    },
    //查询
    tableListSearch() {
      if (!this.listQuery.search) return;
      this.getSomeList();
    },
    dialogTableSearch() {
      if (this.search === "") {
        return;
      } else {
        let data = {
          member_id: this.member_id,
          search: this.search
        };
        getSaler(data).then(res => {
          console.log(res);
          this.dialogTable = [];
          this.dialogTable = res.data.data;
        });
      }
    },
    //以下为api操作
    getSomeList() {
      let getData = Object.assign({}, this.listQuery);
      getMemberList(getData).then(res => {
        this.tableData = res.data;
        this.total = res.pagination.total
      });
    },
    lookingSuperior(scope) {
      this.search = "";
      let data = {
        parent_id: scope.row.parent_id
      };
      getSaler(data).then(res => {
        console.log(res);
        this.dialogTable = res.data;
        this.dialogVisible = true;
        this.isShowSeach = false;
      });
    },
    lookingSubordinate(scope) {
      this.search = "";
      this.member_id = scope.row.member_id;
      let data = {
        member_id: scope.row.member_id
      };
      getSaler(data).then(res => {
        console.log(res);
        this.dialogTable = res.data;
        this.dialogVisible = true;
        this.isShowSeach = true;
      });
    }
  }
};
</script>
