<style lang="stylus">
  .notice
    .header
      margin-top 20px
  .margin-btm20
    margin-bottom 20px
// #app    
//   .out-dialog
//     .el-dialog
//       padding-right 10%
      
</style>

<template>
<div>
  <!-- 编辑和添加共用 -->
<el-dialog
  :title="isAddItem?'新增商品':'编辑商品'"
  :visible.sync="addNewShow" 
   
  width="70%" 
  class="out-dialog"
  >
  <el-dialog :visible.sync="dialogVisible" append-to-body>
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
  <el-form :model="formForNotive" v-loading="editLoading" ref="ruleForm" :rules="rules" size="medium" >
    <el-form-item  label="商品图片"  :label-width="formLabelWidth"  prop="fileList1">
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
    <p class="hbs-margin-left140">请选择一张图片,建议像素 750*750</p>
    <!-- 普通、预售 -->
    <el-form-item label="商品类型" :label-width="formLabelWidth" prop="goodsType">
      <el-select v-model="formForNotive.goodsType" placeholder="请选择">
        <el-option
          v-for="item in goodsTypehbsList" 
          :key="item.value" 
          :label="item.label" 
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="商品名称" :label-width="formLabelWidth" prop="goodsName">
      <el-input v-model="formForNotive.goodsName" auto-complete="off"></el-input>
    </el-form-item>
    <!-- <el-form-item label="商品价格" :label-width="formLabelWidth" prop="goodsPrice">
      <el-input v-model="formForNotive.goodsPrice" auto-complete="off"></el-input>
    </el-form-item> -->
    <el-form-item label="商品编号" :label-width="formLabelWidth" prop="goodsNum">
      <el-input v-model="formForNotive.goodsNum" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="校区" :label-width="formLabelWidth" prop="school">
      <el-select v-model="formForNotive.school" placeholder="请选择校区">
        <el-option
          v-for="item in schoolList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <!-- <el-form-item label="商品库存" :label-width="formLabelWidth" prop="goodsTotal">
      <el-input v-model="formForNotive.goodsTotal" auto-complete="off"></el-input>
    </el-form-item> -->
    <el-form-item label="商品分类" :label-width="formLabelWidth" prop="industry">
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
    <el-form-item label="商品描述" :label-width="formLabelWidth" prop="goodsDescribe">
      <el-input v-model="formForNotive.goodsDescribe" type="textarea" auto-complete="off"></el-input>
    </el-form-item>

    <!-- {{formForNotive.size}} -->
    <el-form-item label="规格" :label-width="formLabelWidth" >
      <!-- size 和 size2xxx 都是单独的属性 -->
        <el-tabs v-model="formForNotive.size" style="margin-top:-3px;margin-left:10px">
            <el-tab-pane label="统一规格" name="one" 
              :disabled="!isAddItem&&formForNotive.size!=='one'" >
              <el-form :model="formForNotiveChild1" :inline="true"   ref="ruleFormChild1" :rules="rulesChild1" class="margin-btm20">
                <el-form-item label="价格" prop="price">
                  <el-input v-model.number="formForNotiveChild1.price" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="库存" prop="count">
                  <el-input v-model.number="formForNotiveChild1.count" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="多规格" name="mutil" 
               :disabled="!isAddItem&&formForNotive.size!=='mutil'"  >
              <div  v-for="(formItem,index) of formForNotiveChild2List"  :key="index" class="margin-btm20">
                <el-form :inline="true"  :model="formItem"  ref="ruleFormChild2" :rules="rulesChild2">
                <!-- <el-form :inline="true"  :model="formItem" > -->
                  <el-form-item label="名称"  prop="name">
                    <el-input v-model="formItem.name" auto-complete="off" ></el-input>
                  </el-form-item>
                  <el-form-item label="价格"  prop="price">
                    <el-input v-model.number="formItem.price" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="库存"  prop="count">
                    <el-input v-model.number="formItem.count" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-button @click="deleteSize_out(index)">删除</el-button>
                </el-form>
                
              </div>
              <div style="margin-top:10px;margin-left:10px">
                  <el-button @click="addSize_out">添加规格</el-button>
              </div>
            </el-tab-pane>
        </el-tabs>
    </el-form-item>
    <el-form-item label="运费" :label-width="formLabelWidth" prop="goodsTrans">
      <el-input v-model.number="formForNotive.goodsTrans" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="商品详情设置" :label-width="formLabelWidth" prop="fileList2" >
      <el-upload 
        :auto-upload="false"
          action=""
          :limit="9"
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
    <p class="hbs-margin-left140">建议尺寸：宽750*高不限 ，最多上传9张图</p>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addNewShow = false">取 消</el-button>
     <el-button v-if="isAddItem" type="primary" @click="addNewNotice('ruleForm')"
     :disabled="waitAddNotice"
     :loading="waitAddNotice">确 定</el-button>
     <el-button v-else type="primary" @click="editNewNotice('ruleForm')"
     :disabled="waitAddNotice"
     :loading="waitAddNotice">确认修改</el-button>
  </span>
</el-dialog>
<!-- <el-dialog
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
</el-dialog> -->
<el-container class="notice">
<el-header class="header" style="height:auto;">
  <el-form :inline="true" :model="formInline" class="form">
    <el-form-item>
      <el-button type="primary" icon="el-icon-edit-outline" @click="addItem">新增商品</el-button>
    </el-form-item>
    <!-- 2018/7/12 取消搜索 -->
    <!-- <el-form-item>
      <el-input style="width: 340px;" placeholder="请输入商品名称、编码" v-model="listQuery.search"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchByDate">查询</el-button>
    </el-form-item> -->
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
  <el-form :inline="true"  class="form">
    <el-badge :value="selectedItem.length" style="margin-right:20px">
      <el-button :type="selectedItem.length?'primary':''" round icon="el-icon-tickets">{{selectedItem.length>0?'已选'+selectedItem.length+'条目':'请勾选项目'}}</el-button>
    </el-badge>
    <el-form-item>
      <el-button type="success" round @click="downMutilItem(1)"  :disabled="selectedItem.length<1">批量上架</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="danger" round @click="downMutilItem(0)" :disabled="selectedItem.length<1">批量下架</el-button>
    </el-form-item>
  </el-form>        
</el-header>
<el-main>
    <el-table
      :data="tableData"
      stripe 
      v-loading="listLoading" element-loading-text="给我一点时间" 
      @selection-change="handleSelectionChange"
      style="width: 100%" >
      <el-table-column
        type="selection"
        width="105">
      </el-table-column>
      <el-table-column
        label="商品图片"
        >
        <template slot-scope="scope">
          <div style="width:100px;height:100px;align-items:center;display:flex;">
            <img :src="scope.row.goodsImage" alt="" style="width:100px">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="商品名" 
        prop="goodsName"
        >
      </el-table-column>
      <el-table-column
        label="类型" 
        prop="goodsTypeTXT"
        >
      </el-table-column>
      <el-table-column
        label="编号" 
        prop="goodsNum"
        >
      </el-table-column>
        <!-- <el-table-column
        label="状态" 
        prop="goodsState"
        >
      </el-table-column> -->
      <el-table-column
        label="价格" 
        prop="goodsPrice"
        >
      </el-table-column>
      <!-- <el-table-column
        label="库存" 
        prop="goodsTotal"
        >
      </el-table-column> -->
      <!-- <el-table-column
        label="销量" 
        prop="goodsSell"
        >
      </el-table-column> -->
      <el-table-column
        label="操作" 
        min-width='300px'
        >
        <template slot-scope="scope">
        <el-button size="mini" type="primary" @click="editItem(scope.$index, scope.row)">编辑和查看</el-button>
        <el-button size="mini" type="danger" v-if="scope.row.isUp" @click="downItem(scope.$index, scope.row,0)">下架商品</el-button>
        <el-button size="mini" v-else type="success" @click="downItem(scope.$index, scope.row,1)">上架商品</el-button>
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
import {addGoods_api,getGoodsList_api,getSchoolList_api,getGoods_api,upDownGoods_api,editGoods_api} from '@/api/seller'
import uploadFn from '@/utils/aahbs'

const formForNotive = {
        fileList1:[],
        goodsType:0,
        goodsName:'奥术大师',
        // goodsPrice:'100',
        goodsNum:'100',
        school:'',
        // goodsTotal:'100',
        industry:0,
        goodsDescribe:'暂无描述',
        goodsTrans:0,
        size:'one',
        fileList2:[],
      }
const formForNotiveChild1 = {
  price:10,
  count:100
}
const formForNotiveChild2List = [{
      }]
export default {
  created(){
    this.getSchoolList()
    this.getList()
  },
  data() {
    return {
      // out
        editLoading:false,//此页面的编辑页为 获取单条详情方式，故添加loading
        imgLimit1:1,
        imgLimit2:2,
        dialogImageUrl: '',
        dialogVisible: false,

        schoolList:[{label:'校区1',value:1},{label:'校区2',value:2},],
        goodsTypehbsList:[
          {
            value:0,
            label:'普通商品'
          },{
            value:1,
            label:'预约商品'
          }
        ],
        industryList: [{
            value: 0,
            label: '教育'
          }, {
            value: 1,
            label: '其他'
          }
        ],

        formForNotive:Object.assign({},formForNotive),
        rules: {
          goodsType: [
              { required: true, message: '请输入商品类型', trigger: 'blur' ,type:'number'},
          ],
          goodsName: [
              { required: true, message: '请输入商品名', trigger: 'blur' },
              { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          // goodsPrice: [
          //     { type:"string",required: true, message: '请输入商品价格', trigger: 'blur',min: 1},
          // ],
          goodsNum: [
              { type:"string",required: true, message: '请输入商品编号', trigger: 'blur',min: 1},
          ],
          school: [
              { type:"number",required: true, message: '请输入校区，如果没有校区请先添加校区(运营=>校区)', trigger: 'blur'},
          ],
          // goodsTotal: [
          //     { type:"string",required: true, message: '请输入库存', trigger: 'blur',min: 1},
          // ],
          industry: [
              { type:"number",required: true, message: '请输入行业', trigger: 'blur'},
          ],
          goodsElement: [
              { type:"number",required: true, message: '请输入商品属性', trigger: 'blur',min: 1},
          ],
          goodsDescribe: [
              { type:"string",required: true, message: '请输入描述', trigger: 'blur',min: 1},
          ],
          goodsTrans: [
              { type:"number",required: true, message: '请输入运费', trigger: 'blur',min: 0},
          ],
          fileList1:[
            {
              type: "array", required: true, len: 1,
              message: '请选择一张图片',
              // fields: {
              //   0: {required: true}
              // }
            }
          ],
          fileList2:[
            {
              type: "array", required: true, min: 1,
              message: '至少选择一张图片',
            }
          ],
          
        },
        formForNotiveChild1:Object.assign({},formForNotiveChild1),
        rulesChild1:{
          price: [
              { required: true, message: '请输入商品价格,不少于0', trigger: 'blur' , min: 0,type:'number'},
          ],
          count: [
              { required: true, message: '请输入商品库存,不少于0的整数', trigger: 'blur' , min: 0,type:'integer'},
          ]
        },
        formForNotiveChild2List:Object.assign([],formForNotiveChild2List),
        rulesChild2:{
          name: [
              { required: true, message: '请输入名称', trigger: 'blur' , min: 1,type:'string'},
          ],
          price: [
              { required: true, message: '请输入商品价格,不少于0', trigger: 'blur' , min: 0,type:'number'},
          ],
          count: [
              { required: true, message: '请输入商品库存,不少于0', trigger: 'blur' , min: 0,type:'number'},
          ]
        },
        waitAddNotice:false,
        addNewShow:false,
        isAddItem:true,
      //head
        formInline: {},
      //body
        selectedItem:[],
      //FOOT
        listQuery_detail: {
          page: 1,
          limit: 20,
          search:"",
          time:""
        },
        total_detail:1,
      // --------------------
      //out
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
      
      formLabelWidth:'140px',
      //header
      industry:'',
      
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
      //初始化数据
      getSchoolList(){ //获取 行业列表 
        return new Promise((res,rej)=>{
          getSchoolList_api({limit:0}).then(data=>{
            if(data.status===0){
              let tempData = []
              for(let i = 0 ,len = data.data.length;i<len;i++){
                tempData.push({
                  label:data.data[i].school_name,
                  value:data.data[i].school_id,
                })
              }
              this.schoolList = tempData
              res()
            }else{
              console.error('manageShop:getSchoolList_api 状态码为1')
              rej(data)
            }
          }).catch(e=>{
            console.error('manageShop:getSchoolList_api 接口错误')
            rej()
          })
        })
      },
      //规格2
      addSize_out(){
        this.formForNotiveChild2List.push({})
      },
      deleteSize_out(index){
        this.formForNotiveChild2List.splice(index,1)
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
      onsuccess(){
        console.log('sucess----',arguments)
      },
      beforere(){
        console.log('beforere----',arguments)
      },
      beforeup(){
        console.log('beforeup----',arguments)
      },
      preview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log('preview----',arguments)
      },
      getFiles(arr){ //得到文件数组
        let files = []
        let urls = [] 
        arr.forEach(item=>{
          if(item.raw){
            files.push(item.raw)
          }else{
            urls.push(item.url)
          }
        })
        console.log('-----------------',arr,'-----------------')
        return {
          files,urls
        }
      },
      //添加新商品条目
      async addNewNotice(formName){
          console.log(this.$refs)
          if(this.formForNotive.size === 'one'){
            //如果 size是统一 仅对统一表单进行验证
            let resChild1 = await new Promise((res,rej)=>{
              this.$refs['ruleFormChild1'].validate((valid) => {
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
              if(!resChild1){
                return 
              }
          }else{
            //如果 size是 多个 仅对 多个表单进行验证
            let formChild2PromiseList = []
            for(let i=0;i<this.formForNotiveChild2List.length;i++){
              console.log(this.formForNotiveChild2List.length)
              let one = new Promise((res,rej)=>{
                this.$refs['ruleFormChild2'][i].validate((valid) => {
                    if (valid) {
                      // alert('submit!');
                      res(true)
                    } else {
                      rej(false)
                      // console.log('error submit!!');
                      // return false;
                    }
                  })
                })
              formChild2PromiseList.push(one)
            }
            let resChild2 = await Promise.all(formChild2PromiseList)
              if(!resChild2){
                return 
              }
          }
        //基础验证
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
        // 通过验证

        this.waitAddNotice = true
        let sendData = {}

        // 类型转换
        this.formForNotiveChild1.price =  this.formForNotiveChild1.price?Number(this.formForNotiveChild1.price):0

        //废物值
        sendData.cate_id = 764
        sendData.cate_name = '自定义分类'
        sendData.type_id = 0
        sendData.mobile_body = 764
        sendData.goods_marketprice = this.formForNotive.goodsPrice
        sendData.goods_costprice = this.formForNotive.goodsPrice
        sendData.goods_discount = 1
        // 近似 废物值
        sendData.is_virtual = false
        sendData.virtual_limit = 10
        sendData.virtual_indate = ''
        sendData.is_platform_store = false
        sendData.is_virtual = false

        // 商品图片
        let urls1 = await uploadFn(this.formForNotive.fileList1[0].raw)
        sendData.goods_image = urls1[0]
        console.log('urls1',urls1,'-------------------------')

        // 商品详情 万金油
        let fileAndUrl = this.getFiles(this.formForNotive.fileList2)
        let files2 = fileAndUrl.files
        console.log('files2',files2,'-------------------------')
        let urls2Piece1 = await uploadFn(files2)
        console.log('urls2Piece1',urls2Piece1,'-------------------------')
        let urls2 = urls2Piece1.concat(fileAndUrl.urls)
        sendData.goods_body= urls2?JSON.stringify(urls2):''

        // 商品类型 
        sendData.is_appoint= this.formForNotive.goodsType===1
        //商品名称
        sendData.goods_name= this.formForNotive.goodsName
        //商品价格
        if(this.formForNotive.size === 'one'){
          sendData.goods_price= this.formForNotiveChild1.price
          sendData.goods_marketprice = this.formForNotiveChild1.price
          sendData.goods_costprice = this.formForNotiveChild1.price
        }else{
          // 类型转换
          let temp = this.formForNotiveChild2List[0].price?Number(this.formForNotiveChild2List[0].price):0
          sendData.goods_price= temp
          sendData.goods_marketprice = temp
          sendData.goods_costprice = temp
        }
        // 商品编号
        sendData.goods_serial= this.formForNotive.goodsNum
        // 校区
        sendData.school_id= this.formForNotive.school
        for(let i=0,len=this.schoolList.length;i<len;i++){
          //获取校区名
          if(this.schoolList[i].value===this.formForNotive.school){
            sendData.school_name = this.schoolList[i].label
            break
          }
        }
        
        //库存 放在规格里 sendData.goodsTotal= this.formForNotive.goodsTotal

        //分类
        sendData.storegc_id= this.formForNotive.industry
        //描述
        sendData.goods_advword= this.formForNotive.goodsDescribe
        //规格
        sendData.spec_name= this.formForNotive.size
        if(this.formForNotive.size === 'one'){
          //单规格
          sendData.spec_value= null
          sendData.goods_storage= this.formForNotiveChild1.count
        }else{
          // 多规格
          let tempMutil = []
          let tempSepc_value = []
          for(let i=0,len=this.formForNotiveChild2List.length;i<len;i++){
            tempMutil.push({
              price:this.formForNotiveChild2List[i].price,
              marketprice:this.formForNotiveChild2List[i].price,
              sp_value:this.formForNotiveChild2List[i].name,
              stock:this.formForNotiveChild2List[i].count
            })
            tempSepc_value.push(this.formForNotiveChild2List[i].name)
          }
          sendData.spec_value = tempSepc_value
          sendData.goods_storage = ''
          sendData.spec = tempMutil
        }
        // 运费
        sendData.goods_freight= this.formForNotive.goodsTrans

        addGoods_api(sendData).then(data=>{
          this.waitAddNotice = false
          this.addNewShow = false
          if(data.status===0){
            this.$notify({
              title: '上传成功',
              message: '已新增商品',
              type: 'success'
            })
            this.getList()
          }else{
            this.$notify({
              title: '上传失败',
              message: '新增商品失败',
              type: 'error'
            })
          }
        }).catch(e=>{
          this.waitAddNotice = false
          this.addNewShow = false
          console.error('manageShop:addGoods_api 接口错误')
        })
      },
      async editNewNotice(formName){
          if(this.formForNotive.size === 'one'){
            //如果 size是统一 仅对统一表单进行验证
            let resChild1 = await new Promise((res,rej)=>{
              this.$refs['ruleFormChild1'].validate((valid) => {
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
              if(!resChild1){
                return 
              }
          }else{
            //如果 size是 多个 仅对 多个表单进行验证
            let formChild2PromiseList = []
            for(let i=0;i<this.formForNotiveChild2List.length;i++){
              console.log(this.formForNotiveChild2List.length)
              let one = new Promise((res,rej)=>{
                this.$refs['ruleFormChild2'][i].validate((valid) => {
                    if (valid) {
                      // alert('submit!');
                      res(true)
                    } else {
                      rej(false)
                      // console.log('error submit!!');
                      // return false;
                    }
                  })
                })
              formChild2PromiseList.push(one)
            }
            let resChild2 = await Promise.all(formChild2PromiseList)
              if(!resChild2){
                return 
              }
          }
        //基础验证
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
        // 通过验证
        
        this.waitAddNotice = true
        let sendData = {}
        // gc_id
        //id
        sendData.goods_commonid = this.formForNotive.id
        //good_state
        sendData.goods_state = this.formForNotive.isUp
        // 类型转换
        this.formForNotiveChild1.price =  this.formForNotiveChild1.price?Number(this.formForNotiveChild1.price):0
        //废物值 编辑特殊情况
        if(this.formForNotive.size === 'mutil'){
          sendData.goods_commend = 0
          sendData.gc_id = 764
          sendData.cate_id = 764
          sendData.cate_name = '自定义分类'
          sendData.type_id = 0
          sendData.goods_discount = 1
        }
        sendData.mobile_body = 764
        sendData.goods_marketprice = this.formForNotive.goodsPrice
        sendData.goods_costprice = this.formForNotive.goodsPrice
        // 近似 废物值
        sendData.is_virtual = false
        sendData.virtual_limit = 10
        sendData.virtual_indate = ''
        sendData.is_platform_store = false
        sendData.is_virtual = false

        // 商品图片
        console.log(this.formForNotive.fileList1[0],'商品图片-----')
        if(this.formForNotive.fileList1[0].raw){
          let urls1 = await uploadFn(this.formForNotive.fileList1[0].raw)
          sendData.goods_image = urls1[0]
          console.log('urls1',urls1,'-------------------------')
        }else{
           sendData.goods_image = this.formForNotive.fileList1[0].url
        }
        

        // 商品详情 万金油
        let fileAndUrl = this.getFiles(this.formForNotive.fileList2)
        let files2 = fileAndUrl.files
        console.log('files2',files2,'-------------------------')
        let urls2Piece1 = await uploadFn(files2)
        console.log('urls2Piece1',urls2Piece1,'-------------------------')
        let urls2 = urls2Piece1.concat(fileAndUrl.urls)
        sendData.goods_body= urls2?JSON.stringify(urls2):''

        // 商品类型 
        sendData.is_appoint= this.formForNotive.goodsType===1
        //商品名称
        sendData.goods_name= this.formForNotive.goodsName
        //商品价格
        if(this.formForNotive.size === 'one'){
          sendData.goods_price= this.formForNotiveChild1.price
          sendData.goods_marketprice = this.formForNotiveChild1.price
          sendData.goods_costprice = this.formForNotiveChild1.price
        }else{
          // 类型转换
          let temp = this.formForNotiveChild2List[0].price?Number(this.formForNotiveChild2List[0].price):0
          sendData.goods_price= temp
          sendData.goods_marketprice = temp
          sendData.goods_costprice = temp
        }
        // 商品编号
        sendData.goods_serial= this.formForNotive.goodsNum
        // 校区
        sendData.school_id= this.formForNotive.school
        for(let i=0,len=this.schoolList.length;i<len;i++){
          //获取校区名
          if(this.schoolList[i].value===this.formForNotive.school){
            sendData.school_name = this.schoolList[i].label
            break
          }
        }
        
        //库存 放在规格里 sendData.goodsTotal= this.formForNotive.goodsTotal

        //分类
        if(this.formForNotive.size === 'one'){
          sendData.goods_stcids= this.formForNotive.industry
        }else{
          sendData.storegc_id= this.formForNotive.industry
        }
        //描述
        sendData.goods_advword= this.formForNotive.goodsDescribe
        //规格
        if(this.formForNotive.size === 'one'){
          //单规格
          // sendData.spec_value= null
          sendData.goods_storage= this.formForNotiveChild1.count
        }else{
          sendData.spec_name= this.formForNotive.size
          // 多规格
          let tempMutil = []
          let tempSepc_value = []
          for(let i=0,len=this.formForNotiveChild2List.length;i<len;i++){
            tempMutil.push({
              price:this.formForNotiveChild2List[i].price,
              marketprice:this.formForNotiveChild2List[i].price,
              sp_value:this.formForNotiveChild2List[i].name,
              stock:this.formForNotiveChild2List[i].count
            })
            tempSepc_value.push(this.formForNotiveChild2List[i].name)
          }
          sendData.spec_value = tempSepc_value
          sendData.goods_storage = ''
          sendData.spec = tempMutil
        }
        // 运费
        sendData.goods_freight= this.formForNotive.goodsTrans

        editGoods_api(sendData).then(data=>{
          this.waitAddNotice = false
          this.addNewShow = false
          if(data.status===0){
            this.$notify({
              title: '成功',
              message: '已修改商品',
              type: 'success'
            })
            this.getList()
          }else{
            this.$notify({
              title: '失败',
              message: '修改商品失败',
              type: 'error'
            })
          }
        }).catch(e=>{
          this.waitAddNotice = false
          this.addNewShow = false
          console.error('manageShop:addGoods_api 接口错误')
        })
      },
    //head
      addItem(){ //显示 弹框
        this.isAddItem = true
        this.addNewShow = true
        this.formForNotive = Object.assign({},formForNotive)
        this.formForNotiveChild1 = Object.assign({},formForNotiveChild1)
        this.formForNotiveChild2List = Object.assign([],formForNotiveChild2List)
      },
    //body
      handleSelectionChange(row){ //批量处理
        this.selectedItem = row
      },
      editItem(index,raw){ //由于该页面结构出现变化 故该方法需要给 正式方法传一个id
        if(!raw||!raw.id){
            this.$notify.error({
              title: '错误',
              message: 'id不存在'
          })
          return
        }
        this.isAddItem = false
        this.addNewShow = true
        this.editLoading = true
        let id = raw.id
        let sendData = {
          goods_commonid:id
        }
        getGoods_api(sendData).then(data=>{
          this.editLoading = false
          this.waitAddNotice = false
          if(data.status===0){
            data = data.data 
            //获取数据成功，这填充数据，三个formNative
            let tempForm = {}
            tempForm.id = data.goods_commonid
            //
            
            tempForm.isUp = data.goods_state 
            //商品图片
            tempForm.fileList1 = [{url:data.goods_image}]
            tempForm.goodsType = data.is_appoint 
            tempForm.goodsName = data.goods_name
            tempForm.goodsNum = data.goods_serial
            tempForm.school = data.school_id
            tempForm.industry = Number(data.goods_stcids)
            tempForm.goodsDescribe = data.goods_advword
            tempForm.size = data.spec_value?'mutil':'one'
            tempForm.goodsTrans = Number(data.goods_freight)
            console.log(tempForm)
            try{
              let tempImgs = JSON.parse(data.goods_body)
              let tempFileList2 = []
              for(let i=0,len = tempImgs.length;i<len;i++){
                tempFileList2.push({
                  url:tempImgs[i]
                })
              }
              tempForm.fileList2 = tempFileList2
            }catch(error){
              tempForm.fileList2 = []
            }
            this.formForNotive = tempForm //基础form完成填充
            // 此时需要 判断 规格 单或多
            let tempForm2 = {} //单规格 零时变量
            let tempForm3 = [] //多规格 零时变量
            if(tempForm.size==='mutil'){
                for(let i = 0 ,len = data.SKUList.length;i<len;i++){
                  tempForm3.push({
                    price:Number(data.SKUList[i].goods_price),
                    name:data.SKUList[i].goods_spec,
                    count:Number(data.SKUList[i].goods_storage),
                  })
                }
                this.formForNotiveChild2List = tempForm3 
            }else{
              tempForm2 = {
                price:Number(data.goods_price),
                count:Number(data.SKUList[0].goods_storage)
              }
              this.formForNotiveChild1 = tempForm2
            }
          }else{
            this.$notify({
              title: '失败',
              message: '数据获取失败',
              type: 'error'
            })
          }
        }).catch(e=>{
          this.waitAddNotice = false
          this.editLoading = false
          console.error('manageShop:getGoods_api 接口错误')
        })
        // this.formForNotive =  Object.assign({},this.tableData)

        // this.formForNotiveChild1 = Object.assign({},formForNotiveChild1)
        // this.formForNotiveChild2List = Object.assign([],formForNotiveChild2List)
      },
      async downShop(id,wantUp,mutil){ //批量传mutil
        let sendData = {
          goods_commonid:[id],
          type:wantUp===0?'offline':'online'
        }
        if(mutil){
          let tempIdList = []
          for(let i =0 ;i<this.selectedItem.length;i++){
            tempIdList.push(this.selectedItem[i].id)
          }
          sendData = {
            goods_commonid:tempIdList,
            type:wantUp===0?'offline':'online'
          }
        }else{
          sendData = {
            goods_commonid:[id],
            type:wantUp===0?'offline':'online'
          }
        }
        upDownGoods_api(sendData).then(res=>{
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
          console.error('upDownShop')
        })
      },
      async downMutilItem(wantUp){
        this.$confirm(`此操作将${wantUp===1?'批量上架':'批量下架'}该商品, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.downShop(0,wantUp,true) //批量
        }).catch(()=>{
          this.$notify.info({
            title: '消息',
            message: '已取消'
          });
        })
      },
      async downItem(index,data,wantUp){
        let id = data.id
        this.$confirm(`此操作将${wantUp===1?'上架':'下架'}该商品, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.downShop(id,wantUp)
        }).catch(()=>{
          this.$notify.info({
            title: '消息',
            message: '已取消'
          });
        })
      },
      getList() {
        this.listLoading = true
        let sendData = Object.assign({},this.listQuery)
        // if(!sendData.time){
        //   delete sendData.time
        // }
        getGoodsList_api(sendData).then(response => {
          // 这里由于结构做了调整，导致编辑页面需要的数据无法从列表获取，这里只需要给tableData额外传一个id
          if(response&&response.status==0){
            let result = response.data
            let tempTableData = []
            result.forEach((aData)=>{
              
              let temp_fileList1 =[]
              let temp_fileList2 =[]
              if(aData.goods_image){
                temp_fileList1.push({url:aData.goods_image})
              }
              if(aData.id_card_front){
                temp_fileList2.push({url:aData.id_card_front})
              }
              if(aData.id_card_behind){
                temp_fileList2.push({url:aData.id_card_behind})
              }
              // goodstotal 库存 前后端不一致 需要特殊处理
              let goodsTotal = 0
              if(aData.spec_name==='one'){
                goodsTotal = aData.goods_storage
              }else{
                goodsTotal = aData.goods_storage
              }
              //对  mutil类型的表单 处理

              // ！！！！！这里暂停工作 因为暂时没有接口
              
              tempTableData.push({
                //后端生成
                id:aData.goods_commonid,
                isUp:aData.goods_state,
                //前后统一
                
                goodsImage:aData.goods_image,//显示
                goodsType:aData.is_appoint?1:0,
                goodsTypeTXT:aData.is_appoint?'虚拟':'实体',//显示补充，实际无用

                goodsName:aData.goods_name,//显示
                goodsPrice:aData.goods_price,//显示
                goodsNum:aData.goods_serial,//显示
                // goodsState:'在售',//显示 ！！！ 掩耳盗铃
                // goodsSell:Math.floor(Math.random()*1000),//显示 ！！！ 掩耳盗铃
                // school:aData.school_id,
                //库存没有接受的字段
                // goodsTotal:goodsTotal,//显示

                // industry:aData.storegc_id, 
                // goodsElement:aData.store_id,
                // goodsDescribe:aData.goods_advword,
                // goodsTrans:aData.goods_freight,
                // size:aData.spec_name,

                //child1 one 类型的表单
                // childForm1:{
                //   price:aData.spec_value,
                //   count:aData.goods_storage
                // },
                //child2 mutil类型的表单
                // childForm2:[],
                // fileList1:temp_fileList1,
                // fileList2:temp_fileList2,
              })
            })
            this.tableData = tempTableData
            this.total = response.pagination&&response.pagination.total?response.pagination.total:1
          }else{

          }
          console.log("getList",response)
          // this.list = response
          this.listLoading = false
        }).catch(e=>{
          this.listLoading = false
        })
      },
    // -------------------------------------------------------------
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
    
  }
}
</script>