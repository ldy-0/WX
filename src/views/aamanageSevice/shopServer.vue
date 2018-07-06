<style lang="stylus">
  .notice
    .header
      margin-top 20px
</style>

<template>
<div>
  <!-- 两个 弹框！！！ 1 2 -->
<el-dialog
  title="添加访问量"
  :visible.sync="addNewShow"
  width="50%"
  >
  <el-form :model="formForNotive">
    <el-form-item label="添加访问量" :label-width="formLabelWidth">
      <el-input v-model="formForNotive.visitCount" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addNewShow = false">取 消</el-button>
    <el-button  type="primary" @click="addNewNotice"
     :disabled="waitAddNotice"
     :loading="waitAddNotice">确 定</el-button>
  </span>
</el-dialog>
<el-dialog
  title="添加活动"
  :visible.sync="addNewShow2"
  width="50%"
  >
  <el-form :model="formForNotive2">
    <el-form-item label="添加活动" :label-width="formLabelWidth">
      <el-input v-model="formForNotive2.active" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addNewShow2 = false">取 消</el-button>
    <el-button  type="primary" @click="addNewNotice2"
     :disabled="waitAddNotice2"
     :loading="waitAddNotice2">确 定</el-button>
  </span>
</el-dialog>
<el-container class="notice">
<el-header class="header">
  <el-form :inline="true" :model="formInline" class="form">
    <el-form-item>
      <el-input style="width: 340px;" placeholder="请输入联系方式或店名" v-model="listQuery.search"></el-input>
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
          @click="addItem(scope.$index, scope.row)">添加访问量</el-button>
          <el-button 
         type="primary"
          size="mini"
          @click="addItem2(scope.$index, scope.row)">添加活动</el-button>
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
const formForNotive = {
        visitCount:'',
        // num:''
      }
const formForNotive2 = {
        active:'',
        // num:''
      }      
export default {
  data() {
    return {
      //out
        //访问量
      formForNotive:Object.assign({},formForNotive),
      waitAddNotice:false,
      addNewShow:false,
        //活动
      formForNotive2:Object.assign({},formForNotive2),
      waitAddNotice2:false,
      addNewShow2:false,
      
      // --------------------
      //out
      
      formLabelWidth:'130px',
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
            title: '成功',
            message: '发送成功',
            type: 'success'
          })
          //如果失败
          // this.waitAddNotice = false
        },2000)
      },
      addNewNotice2(){
        this.waitAddNotice2 = true
        setTimeout(()=>{
          //发送成功该做的事情
          this.waitAddNotice2 = false
          this.addNewShow2 = false
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
    //head
      search(){ // 此时listQuery已经改变
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
    //body
      addItem(){ //显示 弹框
        // this.editLoading = false
        this.isAddItem = true
        this.addNewShow = true
        this.formForNotive = Object.assign({},formForNotive)
      },
      addItem2(){ //显示 弹框
        // this.editLoading = false
        this.isAddItem2 = true
        this.addNewShow2 = true
        this.formForNotive2 = Object.assign({},formForNotive2)
      },
    //foot
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
    // --------------------------------
    //out

    
    
  }
}
</script>