<style lang="stylus">
  .notice
    .header
      margin-top 20px
</style>

<template>
<div>
  <!-- 编辑和添加共用 -->
<el-dialog
  :title="isAddItem?'新增商品':'编辑商品'"
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
          :file-list="formForNotive.fileList1"
          >
          <i class="el-icon-plus"></i>
        </el-upload>
    </el-form-item>
    <!-- 普通、预售 -->
    <el-form-item label="商品类型" :label-width="formLabelWidth">
      <el-select v-model="formForNotive.goodsType" placeholder="请选择">
        <el-option
          v-for="item in goodsTypehbsList" 
          :key="item.value" 
          :label="item.label" 
          :value="item.value">
        </el-option>
      </el-select>
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
    <el-form-item label="校区" :label-width="formLabelWidth">
      <el-input v-model="formForNotive.school" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="商品库存" :label-width="formLabelWidth">
      <el-input v-model="formForNotive.goodsTotal" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="商品分类" :label-width="formLabelWidth">
      <!-- <el-input v-model="formForNotive.industry" auto-complete="off"></el-input> -->
      <el-select v-model="formForNotive.industry" placeholder="请选择行业">
        <el-option
          v-for="item in industryList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    
    <!-- <el-form-item label="商品属性" :label-width="formLabelWidth">
      <el-select v-model="formForNotive.goodsElement"
       placeholder="请选择行业">
          <el-option
            v-for="item in goodsElementList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item label="商品描述" :label-width="formLabelWidth">
      <el-input v-model="formForNotive.goodsDescribe" type="textarea" auto-complete="off"></el-input>
    </el-form-item>

    {{formForNotive.size}}
    <el-form-item label="规格" :label-width="formLabelWidth">
      <!-- size 和 size2xxx 都是单独的属性 -->
        <el-tabs v-model="formForNotive.size" style="margin-top:-3px;margin-left:10px">
            <el-tab-pane label="统一规格" name="one" >
              <el-form v-if="formForNotive.size1" :inline="true">
                <el-form-item label="价格" >
                  <el-input v-model="formForNotive.size1.price" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="库存" >
                  <el-input v-model="formForNotive.size1.count" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="多规格" name="mutil">
              <div v-if="formForNotive.size2">
                <el-form :inline="true" v-for="(item,index) of formForNotive.size2" :key="index">
                  {{index}}
                  <el-form-item label="名称" >
                    <el-input v-model="item.name" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="价格" >
                    <el-input v-model="item.price" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="名称" >
                    <el-input v-model="item.count" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-button @click="deleteSize_out(index)">删除</el-button>
                </el-form>
                <div style="margin-top:10px;margin-left:10px">
                  <el-button @click="addSize_out">添加规格</el-button>
                </div>
              </div>
            </el-tab-pane>
        </el-tabs>
    </el-form-item>
    <el-form-item label="运费" :label-width="formLabelWidth">
      <el-input v-model="formForNotive.goodsTrans" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="商品详情设置" :label-width="formLabelWidth">
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
        :file-list="formForNotive.fileList2" 
        >
        <i class="el-icon-plus"></i>
      </el-upload>
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
import {getIndustryList_api} from '@/api/admin'
import uploadFn from '@/utils/aahbs'

const formForNotive = {

        goodsType:2,

        goodsName:'奥术大师',
        goodsPrice:'100',
        goodsNum:'100',
        school:'100',
        goodsTotal:'100',

        industry:'others',

        goodsElement:'123',
        goodsDescribe:'好东西',

        size:'one',
        size1:{
          price:'哈哈',
          count:123
        },
        size2:[
          {
          name:'m',
          price:'哈哈',
          count:123
          },{
            name:'s',
            price:'哈哈s',
            count:1232
          }
        ],
        fileList1:[],
        fileList2:[],
      }
export default {
  created(){
    // this.getList()
    // this.getIndustryList()
  },
  data() {
    return {
      // out
        
        goodsTypehbsList:[
          {
            value:1,
            label:'普通商品'
          },{
            value:2,
            label:'预约商品'
          }
        ],
        industryList: [{
            value: 'edu',
            label: '教育'
          }, {
            value: 'others',
            label: '其他'
          }
        ],
        formForNotive:Object.assign({},formForNotive),
      //head
        
      // --------------------
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
      
      addNewShow:false,
      formLabelWidth:'140px',
      //header
      industry:'',
      
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
    // out
      //规格2
      addSize_out(){
        this.formForNotive.size2.push([])
      },
      deleteSize_out(index){
        this.formForNotive.size2.splice(index,1)
      },
      //图片相关
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
      getFiles(arr){ //得到文件数组
        let files = []
        let urls = []
        arr.forEach(item=>{
          if(item.url){
            urls.push(item.url)
          }else{
            files.push(item.raw)
          }
        })
        return arr2
      },
      //添加新商品条目
      async addNewNotice(){
        this.waitAddNotice = true
        let sendData = {}
        sendData = {

        }
        let urls1 = await uploadFn(this.formForNotive.fileList1[0].raw)
        sendData.img1 = urls1[0]
        
        let files2 = this.getFiles(this.formForNotive.fileList2).files  
        let urls2 = await uploadFn(files2)
        sendData.img2s= urls2


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
    //head
    addItem(){ //显示 弹框
      // this.editLoading = false
      this.isAddItem = true
      this.addNewShow = true
      this.formForNotive = Object.assign({},formForNotive)
    },
    // ------------------------
    //out
      getIndustryList(){ //获取 行业列表 
        return new Promise((res,rej)=>{
          getIndustryList_api().then(data=>{
            if(data.status===0){
              let tempData = []
              for(let i = 0 ,len = data.data.length;i<len;i++){
                tempData.push({
                  label:data.data[i].storeclass_name,
                  value:data.data[i].storeclass_id,
                })
              }
              this.industryList = tempData
              res()
            }else{
              console.error('manageShop:getIndustryList_api 状态码为1')
              rej(data)
            }
          }).catch(e=>{
            console.error('manageShop:getIndustryList_api 接口错误')
            rej()
          })
        })
      },
    // ------------------------------------
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
    
    // addItem(){
    //   this.isAddItem = true
    //   this.addNewShow = true
    //   // this.formForNotive = {}
    // },
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