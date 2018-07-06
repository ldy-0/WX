<style lang="stylus">
  .notice
    .header
      margin-top 20px
</style>

<template>
<div>
<el-container class="notice">
<el-header class="header">
  <el-form :inline="true" :model="formInline" class="form">
    <el-form-item>
      <el-input style="width: 340px;" placeholder="请输入联系方式或店名" v-model="listQuery.search"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="searchByDate">查询</el-button>
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
        label="店主姓名"
        >
        <template slot-scope="scope">
          <i class="el-icon-edit-outline"></i>
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="联系方式"
        >
        <template slot-scope="scope">
          <i class="el-icon-edit-outline"></i>
          <span style="margin-left: 10px">{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="店名"
        >
        <template slot-scope="scope">
          <i class="el-icon-edit-outline"></i>
          <span style="margin-left: 10px">{{ scope.row.shopname }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="联系方式"
        >
        <template slot-scope="scope">
          <i class="el-icon-edit-outline"></i>
          <span style="margin-left: 10px">{{ scope.row.lastvisit }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="opare"
        label="操作"
        >
        <template slot-scope="scope">
        <el-button 
         type="primary"
          size="mini"
          @click="lookDetail(scope.$index, scope.row)">添加访问量</el-button>
          <el-button 
         type="primary"
          size="mini"
          @click="lookDetail(scope.$index, scope.row)">添加活动</el-button>
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
// getList 接口 获取
// addNotice 接口 添加
export default {
  data() {
    return {
      //out
      waitAddNotice:false,
      formForNotive:{
        title:'',
        content:''
      },
      addNewShow:false,
      formLabelWidth:'80px',
      //header
      industry:'',
      industryList: [{
          value: 'edu',
          label: '教育'
        }, {
          value: 'others',
          label: '其他'
        }],
      formInline: {},
      // body
      listLoading: false,
      tableData: [
        {
          username: '张三',
          phone: '123456',
          shopname: '肯德基',
          industry: '餐饮',
          lastvisit: '321',
          opera: '查看123'
        }
      ],
      // footer
      listQuery: {
        page: 1,
        limit: 20,
        search:"",
        time:""
      },
      total:1,
    }
  },
  methods: {
    //out
    addNewNotice(){
      this.waitAddNotice = true
      setTimeout(()=>{
        //发送成功该做的事情
        this.waitAddNotice = false
        this.addNewShow = false
        this.form = {}
        this.$notify({
          title: '发送成功',
          message: '这是一条成功的提示消息',
          type: 'success'
        })
        //如果失败
        // this.waitAddNotice = false
      },2000)
    },
    lookDetail() {
      console.log(arguments)
    },
    searchByDate(){
      if(!this.dataRange||!this.dataRange.length||this.dataRange.length!==2){
        return console.log("日期错误")
      }
      let dateS = this.dataRange[0]
      let dateE = this.dataRange[1]
      let Sstr = dateS.getFullYear()+'-'+(dateS.getMonth()+1>9?(dateS.getMonth()+1):('0'+dateS.getMonth()))+'-'+(dateS.getDate()+1>9?(dateS.getDate()+1):('0'+dateS.getDate()))
      let Estr = dateE.getFullYear()+'-'+(dateE.getMonth()+1>9?(dateE.getMonth()+1):('0'+dateE.getMonth()))+'-'+(dateE.getDate()+1>9?(dateE.getDate()+1):('0'+dateE.getDate()))
      this.listQuery.time = Sstr+','+Estr
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    getList() {
      this.listLoading = true
      let sendData = Object.assign({},this.listQuery)
      if(!sendData.time){
        delete sendData.time
      }
      fetchNoticeList(sendData).then(response => {
        if(response.data&&response.data.status==="success"){
          let result = response.data.result
          let tempTableData = []
          result.forEach((aData)=>{
            tempTableData.push({
              name:aData.name,
              phone:aData.phone,
              deviceCode:aData.deviceCode,
              swingCard:aData.swingCard,
              cashBack:aData.cashBack
            })
          })
          this.tableData = tempTableData
        }
        console.log("getList",response)
        // this.list = response.data
        this.total = response.data.paging.total
        this.listLoading = false
      })
    },
  }
}
</script>