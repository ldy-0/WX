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
  
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<template>
<div>
<!-- 弹窗 -->
<el-dialog :title="isAddItem?'新增资讯':'编辑资讯'" :visible.sync="addNewShow" width="30%">
  <el-form :model="formForNotive"  ref="ruleForm" :rules="rules" >
    <el-form-item label="案列名称" :label-width="formLabelWidth"  prop="value">
      <el-input v-model.number="formForNotive.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label='分类' :label-width="formLabelWidth">
      <el-select v-model="formForNotive.currentClassify" placeholder="请选择">
        <el-option v-for="item in classifyList" :label="item.case_classname" :value="item.case_classid"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="图片" :label-width="formLabelWidth" prop="imgList">
      <!-- <input type='file' v-on:change='uploadImg' /> -->
      <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :on-change='addImage'
        :before-upload="beforeAvatarUpload">
        <img v-if="formForNotive.imageUrl" :src="formForNotive.imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="二维码" :label-width="formLabelWidth">
      <el-upload
        class="avatar-uploader"
        action= "http://webiteimg-1253114089.file.myqcloud.com/images/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="formForNotive.qrUrl" :src="formForNotive.qrUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <!-- <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
      <el-input v-model.number="formForNotive.price" auto-complete="off"></el-input>
    </el-form-item> -->
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

<el-container class="notice">

<el-header class="header">
<el-form :inline="true" :model="formInline" class="form">
  <el-form-item>
    <el-button type="primary" @click="addItem">新增资讯</el-button>
  </el-form-item>
  <el-select v-model="currentClassify" placeholder="请选择">
    <el-option v-for="item in classifyList" :label="item.case_classname" :value="item.case_classid"></el-option>
  </el-select>
</el-form>       
</el-header>

<el-main>
    <el-table :data="tableData" stripe v-loading="listLoading" element-loading-text="给我一点时间" style="width: 100%" >
      <el-table-column label="案例名字" prop="case_name"></el-table-column>
      <el-table-column label="分类" prop='case_classname'></el-table-column>
      <!-- <el-table-column label="价格" >
        <template slot-scope="scope">
          <el-tag size="medium" >{{ scope.row.price}}</el-tag>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="密码" prop="password"></el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="editItem(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteItem(scope.$index, scope.row)">删除</el-button>
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

import { getCaseClassify_api, getCaseList_api, deleteCase_api, addCase_api, editCase_api } from '@/api/admin' 
import upLoadFile from '@/utils/aahbs.js'
const formForNotive = { //此页面 静态数据
  price:"",
  value:"",
  imgList: [],
}
export default {
  created(){
    this.getList(this.listQuery)
    this.getClassifyList()
  },
  data() {
    return {
      //out
      //状态层
      waitAddNotice:false,
      addNewShow:false,
      isAddItem:true,
      // rolesList:['manage','auth','store','affiche'],
      rolesList:[
        {
          label:'affiche',
          text:'公告'
        },{
          label:'store',
          text:'店铺管理'
        },{
          label:'manage',
          text:'运营管理'
        },{
          label:'auth',
          text:'授权管理'
        },
      ],
      formLabelWidth: '140px', // 弹框1 左侧文字默认宽度
      formForNotive: Object.assign({}, formForNotive),
      rules: {
        name: [
          // { type:"integer",required: true, message: '请输入流量数', trigger: 'blur',min: 1},
          { type: 'string', required: true, message: '请输入案例名称', trigger: 'blur' }
        ],
        price: [
          { type:"number",required: true, message: '请输入金额', trigger: 'blur',min: 0},
        ],
      },
      currentClassify: '',
      classifyList: [],
      img_name: '',
      //body  
      tableData: [],
      waitAddNotice:false,
      formForNotive:{
        name:'',
        account:'',
        password:'',
      },
      addNewShow:false,
      formLabelWidth:'80px',
      //header
      industry:'',
      industryList: [
        {
          value: 'edu',
          label: '教育'
        }, {
          value: 'others',
          label: '其他'
        }],
      formInline: {},
      // body
      listLoading: false,
      // footer
      listQuery: {
        page: 1,
        limit: 20,
        // search:"",
        // time:""
      },
      total: 0,
    }
  },
  methods: {
    // out
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
      
      this.formForNotive.imageUrl = '1'
      this.formForNotive.qrUrl = '12'
      let sendData = {
        case_name: this.formForNotive.name,
        case_classid: this.formForNotive.currentClassify,
        case_img: this.formForNotive.imageUrl,
        case_qrcodeimg: this.formForNotive.qrUrl,
        // flowpackage_value:this.formForNotive.value,
        // flowpackage_price:this.formForNotive.price,
      }
      addCase_api(sendData).then(data=>{
        alert(JSON.stringify(data));
        this.waitAddNotice = false
        this.addNewShow = false
        if(data.status===0){
          this.$notify({ title: '成功', message: '操作成功', type: 'success' })
          this.getList(this.listQuery)
        }else{
          this.$notify({ title: '失败', message: '操作失败', type: 'error' })
        }
      }).catch(e=>{
        this.waitAddNotice = false
        this.addNewShow = false
        console.error('manageShop:addFlowPackage_api 接口错误')
      })
    },
    addItem(){ //显示 弹框
      // this.editLoading = false
      this.isAddItem = true
      this.addNewShow = true
      this.formForNotive = Object.assign({},formForNotive)
    },
    async editAuth(formName) {
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
      this.formForNotive.name = res.case_name
      let sendData = {
        case_id: res.case_id,
        case_name: res.case_name,
        case_classid: res.case_classid,
        case_img: res.case_img,
        case_qrcodeimg: res.case_qrcodeimg
        // 后端生成
        // flowpackage_id:this.formForNotive.id,
        // flowpackage_value:this.formForNotive.value,
        // flowpackage_price:this.formForNotive.price,
      }
      editCase_api(sendData).then(data=>{
        this.waitAddNotice = false
        this.addNewShow = false
        if (data.status === 0) {
          this.$notify({ title: '成功', message: '操作成功', type: 'success' })
          this.getList()
        }else{
          this.$notify({ title: '失败', message: '操作失败', type: 'error' })
        }
      }).catch(e=>{
        this.waitAddNotice = false
        this.addNewShow = false
        console.error('editAuth_api 接口错误')
      })
    },
    editItem(index,rowData){
      console.log(rowData)
      // this.editLoading = true
      this.formForNotive = Object.assign({},rowData)
      this.isAddItem = false
      this.addNewShow = true
    },
    // body
    getList(params) { //获取列表
      this.listLoading = true
      // let sendData = Object.assign({},this.listQuery)

      getCaseList_api(params).then(response => {
        
        if (response && response.status === 0) {

          this.tableData = response.data
          this.total = response.pagination.total ? response.pagination.total : 1
        }

        console.log("getList", response)
        // this.list = response
        this.listLoading = false
      })
    },
    deleteItem(index, row) {

      this.$confirm(`此操作将删除该条目, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteNewNotice(row.case_id)
      }).catch(()=>{
        this.$notify.info({ title: '消息', message: '已取消' })
      })
    },
    deleteNewNotice(id) {
      let sendData = {
        case_id: id
      }

      deleteCase_api(sendData).then(res=> {
        if(res&&res.status===0) {
          this.$notify({ title: '成功', message: '操作成功', type:'success' })
          this.getList(this.listQuery)
        }else{
          this.$notify({ title: '错误', message: '操作失败', type:'error' })
        }
      }).catch(err=>{
        console.error('deleteAdmin_api')
      })
    },
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
    // searchByDate(){
    //   if(!this.dataRange||!this.dataRange.length||this.dataRange.length!==2){
    //     return console.log("日期错误")
    //   }
    //   let dateS = this.dataRange[0]
    //   let dateE = this.dataRange[1]
    //   let Sstr = dateS.getFullYear()+'-'+(dateS.getMonth()+1>9?(dateS.getMonth()+1):('0'+dateS.getMonth()))+'-'+(dateS.getDate()+1>9?(dateS.getDate()+1):('0'+dateS.getDate()))
    //   let Estr = dateE.getFullYear()+'-'+(dateE.getMonth()+1>9?(dateE.getMonth()+1):('0'+dateE.getMonth()))+'-'+(dateE.getDate()+1>9?(dateE.getDate()+1):('0'+dateE.getDate()))
    //   this.listQuery.time = Sstr+','+Estr
    //   this.listQuery.page = 1
    //   this.getList()
    // },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    getClassifyList(){

      getCaseClassify_api({}).then(response => {

        if (response && response.status === 0) {
          this.classifyList = response.data
        }

      })

    },
    beforeAvatarUpload(file){
      
      return true
    },
    handleAvatarSuccess(res, file){
      alert(res, file);
    },
    addImage(e) {
      
      
      // let reader = new FileReader(); //文件预览对象
      // console.log(e)
      // let files = e.target.files.map(v => v.raw)
      alert(JSON.stringify(e))
      upLoadFile(e.raw).then(v => {
        alert('then')
      }).catch(e => alert('catch'))
      // reader.readAsDataURL(e.target.files[0]); //设置要预览的文件
      // reader.onload = function(e) {//监听文件加载完成事件

      //   upLoadFile(e.target.result).then(v => {
      //     alert(v)
      //   }).catch(e => alert(e))
        
      // }
    }
  }
}
</script>