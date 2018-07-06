<style lang="stylus">
  .notice
    .header
      margin-top 20px
</style>

<template>
<div>
  <!-- 编辑和添加共用 -->
<el-dialog
  :title="isAddItem?'编辑商品':'新增商品'"
  :visible.sync="addNewShow"
  width="70%"
  >
  <el-dialog :visible.sync="dialogVisible" append-to-body>
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
  
  <el-form :model="formForNotive">
    <el-form-item  label="商品图片"  :label-width="formLabelWidth">
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
          :file-list="fileList1"
          >
          <i class="el-icon-plus"></i>
        </el-upload>
    </el-form-item>
    <el-form-item label="商品名称" :label-width="formLabelWidth">
      <el-input v-model="formForNotive.goodsName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="商品价格" :label-width="formLabelWidth">
      <el-input v-model="formForNotive.goodsPrice" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="商品编号" :label-width="formLabelWidth">
      <el-input v-model="formForNotive.goodsNum" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="商品库存" :label-width="formLabelWidth">
      <el-input v-model="formForNotive.goodsTotal" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="商品类型" :label-width="formLabelWidth">
      <el-input v-model="formForNotive.goodsType" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="商品描述" :label-width="formLabelWidth">
      <el-input v-model="formForNotive.goodsDescribe" type="textarea" auto-complete="off"></el-input>
    </el-form-item>
    {{formForNotive.activeName}}
    <el-form-item label="规格" :label-width="formLabelWidth">
        <el-tabs v-model="formForNotive.activeName">
            <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        </el-tabs>
    </el-form-item>
    <el-form-item label="运费" :label-width="formLabelWidth">
      <el-input v-model="formForNotive.goodsTrans" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="商品详情设置" :label-width="formLabelWidth">
      <div>
        <el-button type="primary" icon="el-icon-edit-outline" @click="addDetailItem">添加段落
          {{formForNotive.goodsDetail}}
        </el-button>
        <div v-for="item of formForNotive.goodsDetail" >
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
              :file-list="item.fileList" 
              >
              <i class="el-icon-plus"></i>
            </el-upload>
            <hr>
            <el-input v-model="item.title" auto-complete="off"></el-input>
            <el-input v-model="item.content" auto-complete="off"></el-input>
        </div>
      </div>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addNewShow = false">取 消</el-button>
    <el-button type="primary" @click="addNewNotice"
     :disabled="waitAddNotice"
     :loading="waitAddNotice">确 定</el-button>
  </span>
</el-dialog>
<el-dialog
  title="商品明细"
  :visible.sync="detailShow"
  width="80%"
  >
    <el-container>
      <el-main>
      <el-table
        :data="detailTableData"
        stripe 
        v-loading="detailListLoading" element-loading-text="给我一点时间"
        style="width: 100%" >
        <el-table-column
          label="时间" 
          prop="time"
          >
        </el-table-column>
          
          <el-table-column
          label="姓名" 
          prop="username"
          >
          </el-table-column>
        <el-table-column
          label="联系方式"
          prop="phone"
          >
        </el-table-column>
        <el-table-column
          label="消费详情"
          prop='detail'
          >
        </el-table-column>
        <el-table-column
          label="类型" 
          prop="type"
          >
        </el-table-column>
      </el-table>
      </el-main>
      <el-footer>
        <el-pagination background @size-change="handleSizeChange_detail" 
          @current-change="handleCurrentChange_detail" :current-page="listQuery_detail.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery_detail.limit" layout="total, sizes, prev, pager, next" :total="total_detail">
        </el-pagination>
      </el-footer>
    </el-container>
  <span slot="footer" class="dialog-footer">
    <el-button @click="detailShow = false">返 回</el-button>
  </span>
</el-dialog>
<el-container class="notice">
<el-header class="header">
  <el-form :inline="true" :model="formInline" class="form">
    <el-form-item>
      <el-button type="primary" icon="el-icon-edit-outline" @click="addItem">新增商品</el-button>
    </el-form-item>
    <el-form-item>
      <el-input style="width: 340px;" placeholder="请输入商品名称、编码" v-model="listQuery.search"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="searchByDate">查询</el-button>
    </el-form-item>
    <!-- 在listQuery中添加 ？ -->
    <!-- <el-form-item>
      <el-select v-model="industry" placeholder="请选择行业">
        <el-option
          v-for="item in industryList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-button type="primary" icon="el-icon-search" @click="searchByDate">查询</el-button> -->
  </el-form>       
</el-header>
<el-main>
    <el-table
      :data="tableData"
      stripe 
      v-loading="listLoading" element-loading-text="给我一点时间"
      style="width: 100%" >

      <el-table-column
        label="商品图片"
        >
        <template slot-scope="scope">
          <img :src="scope.row.goodsImage" alt="" width="100px">
        </template>
      </el-table-column>
      <el-table-column
        label="商品名" 
        prop="goodsName"
        >
      </el-table-column>
      <el-table-column
        label="类型" 
        prop="goodsType"
        >
      </el-table-column>
      <el-table-column
        label="编号" 
        prop="goodsNum"
        >
      </el-table-column>
        <el-table-column
        label="状态" 
        prop="goodsState"
        >
      </el-table-column><el-table-column
        label="价格" 
        prop="goodsPrice"
        >
      </el-table-column><el-table-column
        label="库存" 
        prop="goodsTotal"
        >
      </el-table-column><el-table-column
        label="销量" 
        prop="goodsSell"
        >
      </el-table-column>
      <el-table-column
        label="操作" 
        min-width='300px'
        >
        <template slot-scope="scope">
        <el-button size="mini" type="primary" @click="editItem(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="lookItem(scope.$index, scope.row)">下架商品</el-button>
        <el-button size="mini" type="info" @click="lookItem(scope.$index, scope.row)">查看明细</el-button>
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
      imgLimit1:1,
      imgLimit2:2,
      dialogImageUrl: '',
        dialogVisible: false,
        fileList1: [{url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3994633895,563142661&fm=27&gp=0.jpg'}],
        fileList2: [{url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3994633895,563142661&fm=27&gp=0.jpg'}],
      isAddItem:true,
      listQuery_detail: {
        page: 1,
        limit: 20,
        search:"",
        time:""
      },
      total_detail:1,
      detailListLoading:false,
      detailShow:false,
      detailTableData:[
        {
          time:'2014.1.2',
          username: '张三',
          phone: '123456',
          detail: '一个汉堡',
          type: '餐饮',
        }
      ],
      industryList: [{
          value: 'edu',
          label: '教育'
        }, {
          value: 'others',
          label: '其他'
        }],
      cityOptions:[
        {
          value: 'bj',
          label: '北京',
          children: [
            {value: 'chaoyang',
            label: '朝阳区'},{
            value: 'xicheng',
            label: '西城区'}
          ]
        },
        {
          value: 'wh',
          label: '武汉',
          children: [
            {value: 'qiaokou',
            label: '硚口'},{
            value: 'donghu',
            label: '东湖'}
          ]
        }
      ],
      waitAddNotice:false,
      formForNotive:{
        goodsName:'奥术大师',
        goodsPrice:'100',
        goodsNum:'100',
        goodsTotal:'100',
        goodsType:'100',
        goodsDescribe:'好东西',
        activeName:'second',
        goodsTrans:'10',
        goodsDetail:[
          {
            fileList:[],
            title:'xxx',
            content:'cccxxx',
          }
        ]
      },
      addNewShow:false,
      formLabelWidth:'140px',
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
          goodsImage:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3942989250,3371488751&fm=27&gp=0.jpg',
          goodsName: '老北京鸡肉卷',
          goodsType: '炸鸡',
          goodsNum: '123987',
          goodsState: '在售',
          goodsPrice: '321',
          goodsTotal: '321',
          goodsSell: '321',
        //   opera: '查看123'
        },
        {
          goodsImage:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4005596794,992112216&fm=27&gp=0.jpg',
          goodsName: '香辣鸡腿堡',
          goodsType: '炸鸡',
          goodsNum: '1223987',
          goodsState: '在售',
          goodsPrice: '3221',
          goodsTotal: '3221',
          goodsSell: '3212',
        //   opera: '查看123'
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
        title:'当前商品名称',
        username:'当前商品名称',
        phone:'当前商品名称',
        account:'当前商品名称',
        name:'当前商品名称',
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