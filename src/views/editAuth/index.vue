<style lang="stylus">
.notice {
    .header {
        margin-top: 20px;
    }
}

.margin-btm20 {
    margin-bottom: 20px;
}
</style>

<template>
<div>
<el-container class="notice">
    <el-header class="header" style="height:auto;">
        <el-form :inline="true" class="form">
            <el-form-item>
            <el-input style="width: 340px;" placeholder="请输入店名或联系方式" v-model="listQuery.search"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
            </el-form-item>
            <el-form-item label="时间">
            <el-date-picker
                style="width:400px"
                v-model="listQuery.time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
            </el-form-item>
        </el-form>
    </el-header>
    <el-main>
        <el-table
        :data="tableData"
        stripe 
        v-loading="listLoading" element-loading-text="给我一点时间" 
        style="width: 100%" >
        <el-table-column
            label="店铺ID" 
            prop="store_id"
            >
        </el-table-column>
        <el-table-column
            label="店主姓名" 
            prop="contacts_name"
            >
        </el-table-column>
        <el-table-column
            label="联系方式" 
            prop="contacts_phone"
            >
        </el-table-column>
        <el-table-column
            label="店名" 
            prop="store_name"
            >
        </el-table-column>
        <el-table-column
            label="行业" 
            prop="storeclass_name"
            >
        </el-table-column>
        <el-table-column
            label="申请时间" 
            prop="addtime"
            >
        </el-table-column>
        <el-table-column
            label="独立小程序" 
            prop="independent"
            >
            <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.independent?'是':'否'}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column
            label="操作" 
            min-width='200px'
            >
            <template slot-scope="scope">
                <span v-if='scope.row.audit_status==0' style="padding-left:20px;display:inline-block">
                    <el-button size="mini" type="success" @click="changeItem(scope.$index, scope.row,1)">同意</el-button>
                    <el-button size="mini" type="info" @click="changeItem(scope.$index, scope.row,2)">拒绝</el-button>
                </span>
                <span v-else>
                    {{scope.row.audit_status==1?'已同意':'已拒绝'}}
                </span>
            </template>
        </el-table-column>
        </el-table>
    </el-main>
<el-footer>
  <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next" :total="total">
  </el-pagination>
</el-footer>
</el-container>
</div>
</template>
<script>
import {getEditAuth_api,editEditAuth_api} from "@/api/admin";

export default {
  created() {
    this.getList()
  },
  data() {
    return {
      formInline: {},
      // body
      listLoading: false,
      tableData: [],
      //FOOT
      listQuery: {
        page: 1,
        limit: 20,
        search: "",
        time: ""
      },
      total: 1
    };
  },
  methods: {
    search() {
      // 此时listQuery已经改变
      this.listQuery.page = 1;
      this.getList();
    },
    async getList() {
      this.listLoading = true;
      let sendData = {
        page: this.listQuery.page,
        limit: this.listQuery.limit,
        search: this.listQuery.search ? this.listQuery.search : null
      };
      // time单独处理
      if (this.listQuery.time) {
        sendData.starttime =
          this.listQuery.time[0]
            .getTime()
            .toString()
            .slice(0, 10); 
        sendData.endtime =
          this.listQuery.time[1]
            .getTime()
            .toString()
            .slice(0, 10);
      } else {
        sendData.time = null;
      }
      await getEditAuth_api(sendData)
        .then(response => {
          if (response && response.status === 0) {
            this.tableData = response.data;
            this.total =
              response.pagination && response.pagination.total
                ? response.pagination.total
                : 0;
          } else {
          }
          console.log("getList", response);
          this.listLoading = false;
        })
        .catch(e => {
          this.listLoading = false;
        });
    },
    changeItem(index,row,status){
        let sendData = {
            audit_id: row.audit_id,
            status:status
        }
        editEditAuth_api(sendData).then(res=>{
            if(res.status == 0){
                this.$notify({
                    title: '已改变状态',
                    message: '',
                    type: 'success'
                })
                this.getList();
            }else{
                this.$notify({
                    title: '授权失败',
                    message: '',
                    type: 'fail'
                })
            }
        })
    },
    //foot
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    }
  }
};
</script>