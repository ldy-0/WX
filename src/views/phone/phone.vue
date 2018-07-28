<style lang="stylus">
  .notice
    .header
      margin-top 20px
</style>

<template>
<div>
<!-- 只显示 简单详情 -->
<el-container class="notice">
<!-- head -->
<el-header class="header">
  <el-form :inline="true" class="form"></el-form>       
</el-header>
<!-- body -->
<el-main>
  <el-table
    :data="tableData"
    stripe 
    v-loading="listLoading" element-loading-text="给我一点时间"
    style="width: 100%" >

    <el-table-column label="时间" prop="ctime"> <!-- time -->
      <!-- <template slot-scope="scope">
        <i class="el-icon-date"></i>
        <span style="margin-left: 10px">{{ scope.row.time }}</span>
      </template> -->
    </el-table-column>

    <el-table-column label="联系方式" prop="telephone"></el-table-column> <!-- title -->

  </el-table>
</el-main>
<!-- footer -->
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
import {getPhone_api, addNotice_api} from '@/api/admin'
export default {
  data() {
    return {
      //out
      waitAddNotice:false,
      formForNotive:{
        title:'',
        content:''
      },
      rules: {
        title: [
            { required: true, message: '请输入标题', trigger: 'blur',min: 1},
        ],
        content: [
            { required: true, message: '请输入内容', trigger: 'blur',min: 1, },
        ]
      },
      addNewShow:false,
      formLabelWidth:'80px',

      detailShow:false,
      detailForm:{
        title:'loading',
        content:'...'
      },
      //header
      // body
      listLoading: false,
      tableData: [
        // {
        //   time: '2018-7-1',
        //   title: '测试数据',
        //   content: '测试数据测试数据测试数据测试数据...',
        //   id:1
        // }
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
  created(){
    this.getList()
  },
  methods: {
    //header

    //body
    getList() { //获取phone列表
      this.listLoading = true
      let sendData = Object.assign({}, this.listQuery)

      getPhone_api(sendData).then(response => {
        if (response && response.status==0) {

          // let result = response.data
          // let tempTableData = []
          // result.forEach((aData)=>{
          //   tempTableData.push({
          //     id:aData.affiche_id,
          //     title:aData.affiche_title,
          //     content:aData.affiche_content,
          //     time:aData.add_time,
          //   })
          // })
          // this.tableData = tempTableData
          this.tableData = response.data
          this.total = response.pagination.total
        }
        console.log("getList", response)
        // this.list = response
        
        this.listLoading = false
      })

    },
    lookDetail(index) { //查看公告某条详情
      this.detailForm = this.tableData[index]
      this.detailShow = true
      console.log(arguments)
    },
    //footer
    
    
    searchByDate(){
      if (!this.dataRange || !this.dataRange.length || this.dataRange.length !== 2){
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
    
  }
}
</script>