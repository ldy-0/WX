<style lang="stylus">
  .notice
    .header
      margin-top 20px
    .big-icon
      font-size 30px
      color #409EFF
    .big-icon-no
      font-size 30px
      color #F56C6C
</style>

<template>
<div>
  <!-- 新增 -->
<el-dialog
  :title="isAddItem?'新增分公司':'编辑分公司'"
  :visible.sync="addNewShow"
  width="30%"
  >
  <el-form :model="formForNotive"  ref="ruleForm" :rules="rules" >
    <el-form-item label="姓名" :label-width="formLabelWidth"  prop="username">
      <el-input v-model="formForNotive.username" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机号" :label-width="formLabelWidth"  prop="tel">
      <el-input v-model="formForNotive.tel" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="账号" :label-width="formLabelWidth" prop="account">
      <el-input v-model="formForNotive.account" 
      :disabled="!isAddItem" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
      <el-input v-model="formForNotive.password" auto-complete="off" 
      :placeholder="(!isAddItem)&&'此处可修改密码'"></el-input>
    </el-form-item>
    
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addNewShow=false" >取消</el-button>
    <el-button v-if="isAddItem" type="primary" @click="addAuth('ruleForm')"
     :disabled="waitAddNotice"
     :loading="waitAddNotice">确 定</el-button>
    <el-button v-else type="primary" @click="editAuth('ruleForm')"
    :disabled="waitAddNotice" 
    :loading="waitAddNotice">确认修改</el-button>
  </span>
</el-dialog>

  <!-- 分公司下属公司 -->
<el-dialog
  title="下属店铺"
  :visible.sync="addNewShow2"
  width="70%"
  >
    <el-table
      :data="tableData2"
      stripe 
      v-loading="listLoading" element-loading-text="给我一点时间"
      style="width: 100%" 
      >
      <el-table-column
        label="店铺ID"
        prop="id"
        >
      </el-table-column>
      <el-table-column
        label="店主姓名"
        prop="username"
        >
      </el-table-column>
      <el-table-column
        label="联系方式" 
        prop="phone"
        >
      </el-table-column>
      <el-table-column
        label="店名" 
        prop="title"
        >
      </el-table-column>
      <el-table-column
        label="行业" 
        prop="industryName"
        >
      </el-table-column>
      <el-table-column
        label="剩余访问量" 
        prop="lastvisit"
        >

      </el-table-column>
      <el-table-column
        label="独立小程序" 
        prop="hasPayDataTXT"
        >
      </el-table-column>
      <el-table-column
        label="操作" 
        min-width='200px'
        >
        <template slot-scope="scope">
            <el-button size="mini" type="info" @click="lookShop(scope.$index, scope.row)">查看订单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-footer>
      <el-pagination background @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="listQuery2.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery2.limit" layout="total, sizes, prev, pager, next" :total="total2">
      </el-pagination>
    </el-footer>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addNewShow2=false" >取消</el-button>
  </span>
</el-dialog>
  <!-- 分公司下属公司 订单-->
<el-dialog
  title="订单"
  :visible.sync="addNewShow3"
  width="60%"
  >
    <el-table
      :data="tableData3"
      stripe 
      v-loading="listLoading" element-loading-text="给我一点时间"
      style="width: 100%" >
      <el-table-column
        label="订单号" 
        prop="order_sn"
        >
      </el-table-column>
      <el-table-column
        label="订单价格" 
        prop="order_amount"
        >
      </el-table-column>
      <el-table-column
        label="运费" 
        prop="shipp_fee"
        >
      </el-table-column>
      <el-table-column
        label="下单时间" 
        prop="add_time"
        >
      </el-table-column>
      <el-table-column
        label="状态" 
        prop="order_state"
        >
      </el-table-column>
    </el-table>
    <el-footer>
      <el-pagination background @size-change="handleSizeChange3" @current-change="handleCurrentChange3" :current-page="listQuery3.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery3.limit" layout="total, sizes, prev, pager, next" :total="total3">
      </el-pagination>
    </el-footer>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addNewShow3=false" >取消</el-button>
  </span>
</el-dialog>

<el-container class="notice">
  <el-header class="header">
  <el-form :inline="true" :model="formInline" class="form">
    <el-form-item>
      <el-button type="primary" icon="el-icon-edit-outline" @click="addItem">新增分公司</el-button>
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
          label="姓名" 
          prop="username"
          >
        </el-table-column>
        <!-- icon测试 -->
        <el-table-column 
          label="手机号" 
          prop="tel"
          >
        </el-table-column>
        <el-table-column 
          label="账号" 
          prop="account"
          >
        </el-table-column>
        <el-table-column 
          label="是否禁用" 
          prop="lock"
          >
          <template slot-scope="scope">
            <el-tag size="medium" :type="scope.row.lock?'warning':'info'">{{ scope.row.lock?'是':'否'}}</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column 
          label="密码" 
          prop="password"
          >
        </el-table-column> -->
        <el-table-column
          label="操作"
          >
          <template slot-scope="scope">
          <el-button
            size="mini" 
            :type="scope.row.lock?'':'warning'" 
            @click="editItem(scope.$index, scope.row)">
            {{ scope.row.lock?'解禁':'禁用'}}</el-button>
          <el-button
            size="mini" 
            type="danger" 
            @click="deleteItem(scope.$index, scope.row)">删除</el-button>
          <el-button
            size="mini" 
            type="primary" 
            @click="lookItem(scope.$index, scope.row)">查看</el-button>
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

import {getAgentList_api,addAgent_api,editAgent_api,deleteAgent_api} from '@/api/admin' 
const formForNotive = { //此页面 静态数据
  username:"",
  account:"",
  password:"",
  tel:""
}
export default {
  created(){
    this.getList()
  },
  data() {
    var checkTel = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('电话不能为空'));
        }
        if (!Number.isInteger(Number(value))) {
          callback(new Error('请输入数字值'));
        } else {
          if (value.length===11&&/(1[0-9][0-9]{9})/.test(value)) {
            callback();
          } else {
            callback(new Error('请输入正确的手机号码'));
          }
        }
    };
    return {
      //导出
        tableDataAll:'',
        autoWidth:true,
        filename:'店铺管理Excel',
        exportExcelStatus:'导出',
        downloadLoading:false,
      //out
        shopId:'',
        companyId:'',
        waitAddNotice:false,
        addNewShow:false,
        addNewShow2:false,
        addNewShow3:false,
        isAddItem:true,
        formLabelWidth:'140px',
        formForNotive:Object.assign({},formForNotive),
        rules: {
          username: [
              { required: true, message: '请输入昵称', trigger: 'blur',min: 1 }
          ],
          tel: [
              { required: true, validator:checkTel}
          ],
          account: [
              { required: true, message: '账号名称必须是6~15位', trigger: 'blur',min: 6,max:15 }
          ],
          password: [
              { required: true, message: '请输入密码，长度至少6位', trigger: 'blur',min: 6 }
          ]
        },
        tableData: [],
        tableData2: [],
        tableData3: [],
        formInline: {},
        listLoading: false,
        // footer
        listQuery: {
          page: 1,
          limit: 20,
          search:"",
          time:""
        },
        total:1,
        listQuery2: {
          page: 1,
          limit: 20,
          search:"",
          time:""
        },
        total2:1,
        listQuery3: {
          page: 1,
          limit: 20,
          search:"",
          time:""
        },
        total3:1,
    }
  },
  methods: {
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      },
      async handleDownload() {
        this.downloadLoading = true
        let allRes = await this.getList3(true,this.shopId).catch(e=>{
          this.$notify({
              title: '失败',
              message: '操作失败:'+e.toString(),
              type: 'error'
            })
          return 0
        })
        console.log('allRes',allRes)
        if(!allRes){
          this.downloadLoading = false
          return console.log('获取数据失败:handleDownload')
        }
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['店铺ID', '店主姓名', '联系方式', '店名', '行业','剩余访问量','独立小程序','上架状态']
          const filterVal = ['id', 'username', 'phone', 'title', 'industryName','lastvisit','hasPayDataTXT','isUpTXT']
          const tableDataAll = this.tableDataAll
          const data = this.formatJson(filterVal, tableDataAll)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename,
            autoWidth: this.autoWidth
          })
          this.downloadLoading = false
        })
      },
    // out-------------------------------------------------
      async addAuth(formName){
        let res = await new Promise((res,rej)=>{
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            res(true)
          } else {
            res(false)
            // console.log('error submit!!');
            // return false;
          }
          })
        })
        if(!res){
          return 
        }
        this.waitAddNotice = true
        let sendData = {
          admin_nick:this.formForNotive.username,
          admin_name:this.formForNotive.account,
          admin_password:this.formForNotive.password,
          agent_telephone:this.formForNotive.tel,
          admin_gid:0,
        }
        addAgent_api(sendData).then(data=>{
          this.waitAddNotice = false
          this.addNewShow = false
          if(data.status===0){
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success'
            })
            this.getList()
          }else{
            this.$notify({
              title: '失败',
              message: '操作失败',
              type: 'error'
            })
          }
        }).catch(e=>{
          this.waitAddNotice = false
          this.addNewShow = false
          console.error('manageShop:addIndustry_api 接口错误')
        })
      },
      addItem(){ //显示 弹框
        // this.editLoading = false
        this.isAddItem = true
        this.addNewShow = true
        this.formForNotive = Object.assign({},formForNotive)
      },
      async editAuth(id,lockTarget){
        let sendData = {
          // 后端生成
          admin_id:id,
          lock_state:lockTarget
        }
        editAgent_api(sendData).then(data=>{
          this.waitAddNotice = false
          this.addNewShow = false
          if(data.status===0){
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success'
            })
            this.getList()
          }else{
            this.$notify({
              title: '失败',
              message: '操作失败',
              type: 'error'
            })
          }
        }).catch(e=>{
          this.waitAddNotice = false
          this.addNewShow = false
          console.error('editAuth_api 接口错误')
        })
      },
      editItem(index,row){
        let id = row.id
        let lockTarget = row.lock===0?1:row.lock===1?0:''
        this.$confirm(`禁用分公司，使其无法登陆后台, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.editAuth(id,lockTarget)
        }).catch(()=>{
          this.$notify.info({
            title: '消息',
            message: '已取消'
          });
        })
      },
    // body-------------------------------------------------
      getList() { //获取列表
        this.listLoading = true
        let sendData = Object.assign({},this.listQuery)
        getAgentList_api(sendData).then(response => {
          if(response&&response.status==0){
            let result = response.data
            let tempTableData = []
            result.forEach((aData)=>{
              tempTableData.push({
                //后端生成
                id:aData.admin_id,
                //前后统一
                tel:aData.agent_telephone,
                username:aData.admin_nick,
                password:aData.admin_password,
                account:aData.admin_name,
                //
                lock:aData.lock_state
              })
            })
            this.tableData = tempTableData
            this.total = response.pagination.total?response.pagination.total:1
          }else{
          }
          console.log("getList",response)
          // this.list = response
          this.listLoading = false
        })
      },
      lookItem(index,row){
        this.listLoading = true
        this.companyId = row.id
        this.addNewShow2 = true
        this.getList2(row.id)
      },
      getList2(id){
        let sendData = Object.assign({},this.listQuery)
        sendData.id = id
        getAgentList_api(sendData).then(response => {
          if(response&&response.status==0){
            let result = response.data
            let tempTableData = []
            result.forEach((aData)=>{
              tempTableData.push({
                //后端生成
                id:aData.admin_id,
                //前后统一
                tel:aData.agent_telephone,
                username:aData.admin_nick,
                password:aData.admin_password,
                account:aData.admin_name,
                //
                lock:aData.lock_state
              })
            })
            this.tableData2 = tempTableData
            this.total2 = response.pagination.total?response.pagination.total:1
          }else{
          }
          console.log("getList",response)
          // this.list = response
          this.listLoading = false
        })
      },
      lookShop(index,row){
        this.listLoading = true
        this.shopId = row.id
        this.addNewShow3 = true
        this.getList3(row.id)
      },
      getList3(all,id){
        let flag = false

        let sendData = Object.assign({},this.listQuery)
        if(all){
          sendData.limit = 0
        }
        sendData.id = id
        getAgentList_api(sendData).then(response => {
          if(response&&response.status==0){
             flag = true

            let result = response.data
            let tempTableData = []
            result.forEach((aData)=>{
              tempTableData.push({
                //后端生成
                id:aData.admin_id,
                //前后统一
                tel:aData.agent_telephone,
                username:aData.admin_nick,
                password:aData.admin_password,
                account:aData.admin_name,
                //
                lock:aData.lock_state
              })
            })
              if(all){
                  this.tableDataAll = tempTableData
              }else{
                  this.tableData3 = tempTableData
                  this.total3 = response.pagination&&response.pagination.total?response.pagination.total:1
              }
          }
          this.listLoading = false
        })
        return flag
      },

      //----------------------------------------------------
      deleteItem(index,row){
        let id = row.id
        this.$confirm(`此操作将删除该条目, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteNewNotice(id)
        }).catch(()=>{
          this.$notify.info({
            title: '消息',
            message: '已取消'
          });
        })
      },
      deleteNewNotice(id){
        let sendData = {
          admin_id:id,
        }
        deleteAgent_api(sendData).then(res=>{
          if(res&&res.status===0){
              this.$notify({
              title: '成功',
              message: '操作成功',
              type:'success'
            });
            this.getList()
          }else{
            this.$notify({
              title: '错误',
              message: '操作失败',
              type:'error'
            });
          }
        }).catch(err=>{
          console.error('deleteAdmin_api')
        })
      },

      
    //out
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleSizeChange2(val) {
      this.listQuery2.limit = val
      this.getList(this.companyId)
    },
    handleCurrentChange2(val) {
      this.listQuery2.page = val
      this.getList(this.companyId)
    },
    handleSizeChange3(val) {
      this.listQuery3.limit = val
      this.getList(this.shopId) 
    },
    handleCurrentChange3(val) {
      this.listQuery3.page = val
      this.getList(this.shopId)
    },
    
  }
}
</script>