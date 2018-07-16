<style lang="stylus">
  .notice
    .header
      margin-top 20px
</style>

<template>
<div>
  <!-- 编辑和添加共用 -->
  <!-- out -->
<el-dialog
  :title="isAddItem?'新增轮播图':'编辑轮播图'"
  :visible.sync="addNewShow"
  width="80%" 
  >
  <el-dialog :visible.sync="dialogVisible" append-to-body>
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
  <el-form :model="formForNotive" ref="ruleForm" :rules="rules" >
    <el-form-item  label="图片"  :label-width="formLabelWidth" prop="fileList1">
          <el-upload 
          :auto-upload="false"
            action=""
          :limit="imgLimit1"
          list-type="picture-card" 
          :on-success="onsuccess" 
          :on-preview="preview"
          :on-remove="remove1" 
          :on-change="change1" 
          :before-upload="beforeup" 
          :before-remove="beforere" 
          :file-list="formForNotive.fileList1"
          >
          <i class="el-icon-plus"></i>
        </el-upload>
    </el-form-item>
    <el-form-item label="标题" :label-width="formLabelWidth" prop='title'>
      <el-input v-model="formForNotive.title" auto-complete="off"></el-input>
    </el-form-item>
    {{jumpType}}
    <el-form-item label="跳转类型" :label-width="formLabelWidth">
        <el-select v-model="jumpType" placeholder="请选择">
            <el-option
            v-for="item in jumpTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item v-if="jumpType=='tiao'" label="跳转图片" :label-width="formLabelWidth" prop="fileList2">
      <el-upload 
              :auto-upload="false"
                action=""
                :limit="imgLimit1"
              list-type="picture-card" 
              :on-success="onsuccess" 
              :on-preview="preview" 
              :on-remove="remove2" 
              :on-change="change2" 
              :before-upload="beforeup" 
              :before-remove="beforere" 
              :file-list="formForNotive.fileList2" 
              >
              <i class="el-icon-plus"></i>
        </el-upload>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addNewShow = false">取 消</el-button>
    
    <el-button v-if="isAddItem" type="primary" @click="addNewBanner('ruleForm')"
     :disabled="waitAddNotice"
     :loading="waitAddNotice">确 定</el-button>
     <el-button v-else type="primary" @click="editNewBanner('ruleForm')"
     :disabled="waitAddNotice"
     :loading="waitAddNotice">确认修改</el-button>
  </span>
</el-dialog>
<!-- body -->
<el-container class="notice">
<el-header class="header">
  <el-form :inline="true" :model="formInline" class="form">
    <el-form-item>
      <el-button type="primary" icon="el-icon-edit-outline" @click="addItem">新增轮播图</el-button>
    </el-form-item>
  </el-form>       
</el-header>
<el-main>
    <el-table
      :data="tableData"
      stripe 
      v-loading="listLoading" element-loading-text="给我一点时间"
      style="width: 100%" >
      <el-table-column label="图片">
        <template slot-scope="scope">
          <div style="width:100px;height:100px;align-items:center;display:flex;">
            <img :src="scope.row.image" alt="" style="width:100px">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="标题" 
        prop="title"
        >
      </el-table-column>
        <el-table-column
        label="跳转类型" 
        prop="type"
        >
      </el-table-column>
      <el-table-column
        label="操作" 
        min-width='300px'
        >
        <template slot-scope="scope">
        <el-button size="mini" type="primary" @click="editItem(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="deleteItem(scope.$index, scope.row)">删除</el-button>
        
        </template>
      </el-table-column>
    </el-table>

<!-- footer     -->
</el-main>
    <el-footer>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next" :total="total">
      </el-pagination>
    </el-footer>
</el-container>
</div>
</template>
<script>
import {getBannerList_api , deleteBanner_api , addBanner_api , editBanner_api} from '@/api/seller'
import uploadFn from '@/utils/aahbs'
// getList 接口 获取
// addNotice 接口 添加
const formForNotive = {}
export default {
  data() {
    return {
      //out
      dialogImageUrl: '',
      imgLimit1:1,
      dialogVisible: false,
      fileList1: [{url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3994633895,563142661&fm=27&gp=0.jpg'}],
      fileList2: [{url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3994633895,563142661&fm=27&gp=0.jpg'}],
      jumpType:'butiao',
      jumpTypeOptions:[{
          value:'tiao',
          label:'跳'
      },{
          value:'butiao',
          label:'bu跳'
      }],
      
      isAddItem:true,
      waitAddNotice:false,
      formForNotive:{},
      rules: {
        title: [
            { required: true, message: '请输入标题', trigger: 'blur',min: 1 }
        ],        
        fileList1:[
          {
            type: "array", required: true, len: 1,
            message: '请选择一张图片',
          }
        ],
      },
      addNewShow:false,
      formLabelWidth:'80px',
      //header
      formInline: {},
      // body 
      listLoading: false,
      tableData:[],
      listQuery: {
        page: 1,
        limit: 20
      },
      total:1,
    }
  },
  created(){
    this.getList()
  },
  methods: {
    //file upload
    onsuccess(){
        console.log('sucess----',arguments)
      },
      beforere(){
        console.log('beforere----',arguments)
      },
      beforeup(){
        console.log('beforeup----',arguments)
      },
      remove() {
        console.log('remove----',arguments)
      },
      change() {
        console.log('change----',arguments)
      },
      preview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log('preview----',arguments)
      },
    
    // getList_detail(){
    //   console.log('getList_detail 暂时留白')
    // },
    // handleSizeChange_detail(val) {
    //   this.listQuery_detail.limit = val
    //   this.getList_detail()
    // },
    // handleCurrentChange_detail(val) {
    //   this.listQuery_detail.page = val
    //   this.getList_detail()
    // },
    preview(file) { //预览任意图片
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log('preview----',arguments)
    },
    remove1() { //每次改变图片获取最新的filelist
        console.log('remove----',arguments)
        this.formForNotive.fileList1 = arguments[1]
    },
    change1() {
      console.log('change----',arguments)
      this.formForNotive.fileList1 = arguments[1]
    },
    remove2() { //每次改变图片获取最新的filelist
        console.log('remove----',arguments)
        this.formForNotive.fileList2 = arguments[1]
    },
    change2() {
      console.log('change----',arguments)
      this.formForNotive.fileList2 = arguments[1]
    },
    addItem(){
      this.isAddItem = true,
      this.addNewShow = true,
      this.formForNotive = Object.assign({},formForNotive)
    },
    async addNewBanner(formName){
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
      let sendData = new FormData() 
      let allUrl1 = await uploadFn(this.formForNotive.fileList1[0].raw)
      if(this.jumpType == "tiao"){
        let allUrl2 = await uploadFn(this.formForNotive.fileList2[0].raw)
      }
      try{
          sendData.append('banner_pic',allUrl1[0])
        if(allUrl2){
          sendData.append('banner_url',allUrl2[0])
        }
      }catch(err){
        this.waitAddNotice = false
        console.log(err,'图片不能为空')
      }
      sendData.append("banner_order",1)
      
      addBanner_api(sendData).then((data)=>{
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
        console.error('接口错误')
      })
    },


    //body
    getList() {
      this.listLoading = true
      let sendData = Object.assign({},this.listQuery)
      getBannerList_api(sendData).then(response => {
        if(response.data != null){
        if(response&&response.status == 0 ){
          let result = response.data
          let tempTableData = []
  
          result.forEach((aData)=>{
            let temp_fileList1 =[]
            let temp_fileList2 =[]
            if(aData.banner_pic){
              temp_fileList1.push({url:aData.banner_pic})
            }
            if(aData.banner_url){
              temp_fileList2.push({url:aData.banner_url})
            }
            tempTableData.push({
              fileList1:temp_fileList1,
              fileList2:temp_fileList2,
              image:aData.banner_pic,
              id:aData.banner_id,
              order:aData.banner_order
            })
          })
          this.tableData = tempTableData
          this.total = response.pagination&&response.pagination.total?response.pagination.total:1
          }
          
        
        console.log("getList",response)
        // this.list = response.data
        
        
        this.listLoading = false
      }else{
        this.listLoading = false
      }
      
      })
      
    },

    editItem(index,rowData){
      // this.editLoading = true
      console.log(rowData)
      this.formForNotive = Object.assign({},rowData)
      this.isAddItem = false
      this.addNewShow = true
    },

  async editNewBanner(formName){
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
      let sendData = {}
      let allUrl1,allUrl2
      if(this.formForNotive.fileList1[0].raw){
         allUrl1 = await uploadFn(this.formForNotive.fileList1[0].raw)
         allUrl1 = allUrl1[0]
      }else{
         allUrl1 = this.formForNotive.fileList1[0].url
      }
      sendData['banner_pic'] = allUrl1

    if(this.jumpType == "tiao"){          //判断是否有第二个上传图片
      if(this.formForNotive.fileList2[0].raw){
         allUrl2 = await uploadFn(this.formForNotive.fileList2[0].raw)
         allUrl2 = allUrl2[0]
      }else{
         allUrl2 = this.formForNotive.fileList2[0].url
      }
      sendData['banner_url'] = allUrl2
    }
      
      sendData['banner_id'] = this.formForNotive.id
      sendData['banner_order'] = this.formForNotive.order

      editBanner_api(sendData).then(data=>{
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
        console.error('接口错误')
      })
  },
    
    deleteItem(index,row){
      let id = row.id
      this.$confirm(`此操作将删除该条目, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteBanner(id)
      }).catch(()=>{
        this.$notify.info({
          title: '消息',
          message: '已取消'
        });
      })
    },
    deleteBanner(id){

      deleteBanner_api(id).then(res=>{
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
        console.error('....')
      })
    },

    //footer
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    }
  }
}
</script>
