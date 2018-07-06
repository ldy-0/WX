<style lang="stylus">
  .notice
    .header
      margin-top 20px
</style>

<template>
<div style="margin-top:20px">
    <el-dialog :visible.sync="dialogVisible" append-to-body>
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
<el-form :model="formForNotive" style="padding-left:100px;width:80%">
    <el-form-item label="店铺名称" :label-width="formLabelWidth">
      <el-input v-model="formForNotive.shopName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="联系方式" :label-width="formLabelWidth">
      <el-input v-model="formForNotive.phone" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="店铺名称" :label-width="formLabelWidth">
      <el-input v-model="formForNotive.shopPosition" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="定位" :label-width="formLabelWidth">
        ？？？
    </el-form-item>
    <el-form-item  label="店铺头像"  :label-width="formLabelWidth">
          <el-upload 
          :auto-upload="false"
            action=""
            :limit="imgLimit1"
          list-type="picture-card" 
          :on-success="onsuccess"
          :on-preview="preview"
          :on-remove="remove" 
          :on-change="change" 
          :before-upload="beforeup" 
          :before-remove="beforere" 
          :file-list="formForNotive.fileList1"
          >
          <i class="el-icon-plus"></i>
        </el-upload>
    </el-form-item>
    <el-form-item  label="店铺主图"  :label-width="formLabelWidth">
          <el-upload 
          :auto-upload="false"
            action=""
            :limit="imgLimit1"
          list-type="picture-card" 
          :on-success="onsuccess"
          :on-preview="preview"
          :on-remove="remove" 
          :on-change="change" 
          :before-upload="beforeup" 
          :before-remove="beforere" 
          :file-list="formForNotive.fileList2"
          >
          <i class="el-icon-plus"></i>
        </el-upload>
    </el-form-item>
    <el-form-item  label="店铺展示"  :label-width="formLabelWidth">
          <el-upload 
          :auto-upload="false"
            action=""
            :limit="9"
          list-type="picture-card" 
          :on-success="onsuccess"
          :on-preview="preview"
          :on-remove="remove" 
          :on-change="change" 
          :before-upload="beforeup" 
          :before-remove="beforere" 
          :file-list="formForNotive.fileList3"
          >
          <i class="el-icon-plus"></i>
        </el-upload>
    </el-form-item>
    <el-form-item label="店铺介绍" :label-width="formLabelWidth">
      <el-input v-model="formForNotive.shopText" type="textarea"  auto-complete="off"></el-input>
    </el-form-item>
    {{formForNotive.checkList}}
    <el-form-item label="提供服务" :label-width="formLabelWidth">
        <el-checkbox-group v-model="formForNotive.checkList">
            <el-checkbox label="wifi">wifi</el-checkbox>
            <el-checkbox label="car">停车位</el-checkbox>
            <el-checkbox label="alipay">支付宝</el-checkbox>
            <el-checkbox label="wechat">微信支付</el-checkbox>
        </el-checkbox-group>
    </el-form-item>
    <div style="text-align:center;padding-bottom:80px">
        <el-button type="danger" round>保存</el-button>
    </div>
</el-form>
</div>
</template>
<script>
// getList 接口 获取
// addNotice 接口 添加
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
      formForNotive:{
          fileList1:[],
          fileList2:[],
          fileList3:[],
          checkList:[],
          content:'formForNotive c'
      },
      addNewShow:false,
      formLabelWidth:'80px',
      //header
      industry:'',
      formInline: {},
      dataRange:'',
      // body 
      listLoading: false,
      tableData: [
        {
          image:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2544791346,860572115&fm=27&gp=0.jpg',
          date:'图一',
          content:'跳转图片'
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
    addDetailItem(){
      this.formForNotive.goodsDetail.push({
            fileList:[],
            title:'xxx',
            content:'cccxxx',
          })
    },
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
    
    getList_detail(){
      console.log('getList_detail 暂时留白')
    },
    handleSizeChange_detail(val) {
      this.listQuery_detail.limit = val
      this.getList_detail()
    },
    handleCurrentChange_detail(val) {
      this.listQuery_detail.page = val
      this.getList_detail()
    },
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
    addItem(){
      this.isAddItem = true
      this.addNewShow = true
      // this.formForNotive = {}
    },
    //body
    editItem(){
      this.isAddItem = false
      this.addNewShow = true
      //获取数据 填充form
      this.formForNotive = {
        title:'当前动态名称',
        username:'当前动态名称',
        phone:'当前动态名称',
        account:'当前动态名称',
        name:'当前动态名称',
        industry:'餐饮',
        city:['杭州','西湖']
      }
    },
    lookItem() {
      console.log(arguments)
      this.detailShow = true
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