<style lang="stylus">
  .notice
    .header
      margin-top 20px
</style>

<template>
<div>
  <!-- out -->
  <!-- 编辑和添加共用 -->
<el-dialog
  :title="isAddItem?'新增店铺':'编辑店铺'"
  :visible.sync="addNewShow"
  width="70%" 
  >
  <el-dialog :visible.sync="dialogVisible" append-to-body>
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
  <el-form :model="formForNotive" >
    <el-form-item label="店铺名称" :label-width="formLabelWidth">
      <el-input v-model="formForNotive.title" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="店主姓名" :label-width="formLabelWidth">
      <el-input v-model="formForNotive.username" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="联系方式" :label-width="formLabelWidth">
      <el-input v-model="formForNotive.phone" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="店主账号" :label-width="formLabelWidth">
      <el-input :disabled="!isAddItem" v-model="formForNotive.account" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item  label="所属行业"  :label-width="formLabelWidth">
      <el-select v-model="formForNotive.industry" placeholder="请选择行业">
        <el-option
          v-for="item in industryList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    {{formForNotive.province}}+{{formForNotive.city}}
    <!-- 默认 0 17 湖北 武汉 -->
    <el-form inline>
      <el-form-item  label="省"  :label-width="formLabelWidth">
        <el-select filterable @change="provinceChange" v-model="formForNotive.province" placeholder="请选择">
          <el-option
            v-for="item in optionsProvince"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="城市">
        <el-select filterable v-model="formForNotive.city" placeholder="请选择">
          <el-option
            v-for="item in optionsCity"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <el-form-item  label="上传营业执照"  :label-width="formLabelWidth">
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
    <el-form-item  label="身份证(正反面)"  :label-width="formLabelWidth">
          <el-upload 
          :auto-upload="false"
            action="" 
            :limit="imgLimit2"
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
    <!-- <el-form-item label="公告内容" :label-width="formLabelWidth">
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="formForNotive.content">
      </el-input>
    </el-form-item> -->
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addNewShow = false">取 消</el-button>
    <el-button v-if="isAddItem" type="primary" @click="addShop"
     :disabled="waitAddNotice"
     :loading="waitAddNotice">确 定</el-button>
     <el-button v-else type="primary" @click="editShop"
     :disabled="waitAddNotice"
     :loading="waitAddNotice">确认修改</el-button>
  </span>
</el-dialog>
<el-container class="notice">
<el-header class="header">
  <el-form :inline="true" :model="formInline" class="form">
    <el-form-item>
      <el-button type="primary" icon="el-icon-edit-outline" @click="addItem">新增店铺</el-button>
    </el-form-item>
    <el-form-item>
      <el-input style="width: 340px;" placeholder="请输入联系方式或店名" v-model="listQuery.search"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
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
        <!-- <template slot-scope="scope">
          <i class="el-icon-edit-outline"></i>
          <span style="margin-left: 10px">{{ scope.row.lastvisit }}</span>
        </template> -->
      </el-table-column>
      <el-table-column
        label="操作" 
        min-width='300px'
        >
        <template slot-scope="scope">
        <el-button size="mini" type="primary" @click="editItem(scope.$index, scope.row)">查看和编辑</el-button>
        <el-button size="mini" type="danger" v-if="scope.row.isUp" @click="downItem(scope.$index, scope.row,0)">下架店铺</el-button>
        <el-button size="mini" v-else type="success" @click="downItem(scope.$index, scope.row,1)">上架店铺</el-button>
        <!-- <el-button size="mini" type="info" @click="lookItem(scope.$index, scope.row)">查看明细</el-button> -->
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
import {getPostionList_api,getIndustryList_api,addShop_api,editShop_api,getShop_api,upDownShop} from '@/api/admin'
import uploadFn from '@/utils/aahbs'

const formForNotive = { //此页面 静态数据
        title:'我的店铺',
        username:'',
        phone:'',
        account:'',
        province:'',
        industry:'',

        province:'',
        city:'',

        fileList1:[],//[{url:'xxx},{raw:File}] 格式
        fileList2:[],
      }
export default {
  created(){
    this.getList()
    console.log('created',window.JSON.parse(localStorage.positonList))
    this.getPostionList()
    this.getIndustryList()
  },
  data() {
    return {
      //out
        //状态层
      // editLoading:false,
      waitAddNotice:false,
      addNewShow:false,
      isAddItem:true,
  
      positonList:[],
      optionsProvince:[{label:'湖北',value:17}],
      optionsCity:[{label:'武汉市',value:258}],
      dialogImageUrl: '', //上传图片大图显示
      dialogVisible: false,
      imgLimit1:1, //弹框图片限制
      imgLimit2:2,
      formLabelWidth:'140px',//弹框1 左侧文字默认宽度

      industryList: [{  //通过接口获取 created时
          value: 'edu',
          label: '教育'
        }, {
          value: 'others',
          label: '其他'
        }],
      formForNotive:Object.assign({},formForNotive),
      //head
      formInline: {},
      //body
      listLoading: false,
      tableData: [
        {
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
      // ------------------------
      
    }
  },
  methods: {

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
    getPostionList(){ //获取 位置列表
      if(localStorage.positonList&&typeof localStorage.positonList === 'string'&&localStorage.positonList.length>100){
        console.log('localStorage.positonList')
        this.positonList = window.JSON.parse(localStorage.positonList)
        this.optionsProvince = this.positonList[0]
        this.optionsCity = this.positonList[17]
        return
      }
      //第一次获取
      getPostionList_api().then(data=>{
        if(data.status===0){
          let tempData1 = []
          let tempData = []
          for(let key in data.data){
            tempData1[key] = data.data[key]
          }
          for(let i = 0 ,len = tempData1.length;i<len;i++){
            tempData.push([])
            // [0]
            for(let j = 0 , len2 = tempData1[i].length;j<len2;j++){
              tempData[i].push({
                label:tempData1[i][j][1],
                value:tempData1[i][j][0]
              })
            }
          }
          //对data处理完毕
          console.log(tempData)
          localStorage.positonList = window.JSON.stringify(tempData)
          this.positonList = tempData
          this.optionsProvince = this.positonList[0]
          this.optionsCity = this.positonList[17]
        }
      }).catch(e=>{
        console.error('manageShop:getPostionList_api 接口错误')
      })
    },
    provinceChange(index){ // 位置 改变的钩子 select联动
      this.optionsCity = this.positonList[index]
      this.formForNotive.city = this.positonList[index][0].value
    },
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
    async addShop(){
      this.waitAddNotice = true
      let sendData = new FormData() 
      
      let allUrl1 = await uploadFn(this.formForNotive.fileList1[0].raw)
      let allUrl2 = await uploadFn(this.formForNotive.fileList2[0].raw)
      let allUrl3 = await uploadFn(this.formForNotive.fileList2[1].raw)
      try{
        sendData.append('business_licence',allUrl1[0])
        sendData.append('id_card_front',allUrl2[0])
        sendData.append('id_card_behind',allUrl3[0])
      }catch(err){
        this.waitAddNotice = false
        console.log(err,'图片不能为空')
      }

      sendData.append('store_member_name',this.formForNotive.account)
        //store_telephone contacts_phone
      // sendData.append('store_telephone',this.formForNotive.phone)
      sendData.append('store_name',this.formForNotive.title)
      sendData.append('storeclass_id',this.formForNotive.industry)
      sendData.append('contacts_name',this.formForNotive.username)
        //store_telephone contacts_phone
      sendData.append('contacts_phone',this.formForNotive.phone)
      sendData.append('company_province_id',this.formForNotive.province)
      sendData.append('company_city_id',this.formForNotive.city)
      
      console.log(sendData)
      addShop_api(sendData).then(data=>{
        this.waitAddNotice = false
        this.addNewShow = false
        if(data.status===0){
          this.$notify({
            title: '上传成功',
            message: '已新增店铺',
            type: 'success'
          })
          this.getList()
        }else{
          this.$notify({
            title: '上传失败',
            message: '新增店铺失败',
            type: 'error'
          })
        }
      }).catch(e=>{
        this.waitAddNotice = false
        this.addNewShow = false
        console.error('manageShop:getPostionList_api 接口错误')
      })
    },
    async editShop(){ 
      this.waitAddNotice = true
      let sendData = {} 
      // let sendData = new FormData() 
      //图片处理
      let allUrl1,allUrl2,allUrl3
      if(this.formForNotive.fileList1[0].raw){
         allUrl1 = await uploadFn(this.formForNotive.fileList1[0].raw)
      }else{
         allUrl1 = this.formForNotive.fileList1[0].url
      }
      sendData['business_licence'] = allUrl1

      if(this.formForNotive.fileList2[0].raw){
         allUrl2 = await uploadFn(this.formForNotive.fileList2[0].raw)
      }else{
         allUrl2 = this.formForNotive.fileList2[0].url
      }
      sendData['id_card_front'] = allUrl2

      if(this.formForNotive.fileList2[1].raw){
         allUrl3 = await uploadFn(this.formForNotive.fileList2[1].raw)
      }else{
         allUrl3 = this.formForNotive.fileList2[1].url
      }
      sendData['id_card_behind'] = allUrl3

      sendData['store_id'] = this.formForNotive.id
      // sendData['seller_name'] = this.formForNotive.account
      sendData['store_name'] = this.formForNotive.title
      sendData['storeclass_id'] = this.formForNotive.industry
      sendData['contacts_name'] = this.formForNotive.username
      sendData['contacts_phone'] = this.formForNotive.phone
      sendData['company_province_id'] = this.formForNotive.province
      sendData['company_city_id'] = this.formForNotive.city
      
      // //后台生成 id
      // sendData.append('store_id',this.formForNotive.id)
      // // sendData.append('seller_name',this.formForNotive.account)
      //   //store_telephone contacts_phone
      // // sendData.append('store_telephone',this.formForNotive.phone)
      // sendData.append('store_name',this.formForNotive.title)
      // sendData.append('storeclass_id',this.formForNotive.industry)
      // sendData.append('contacts_name',this.formForNotive.username)
      //   //store_telephone contacts_phone
      // sendData.append('contacts_phone',this.formForNotive.phone)
      // sendData.append('company_province_id',this.formForNotive.province)
      // sendData.append('company_city_id',this.formForNotive.city)
      
      // //图片处理
      // if(this.formForNotive.fileList1[0].raw){
      //   let allUrl1 = await uploadFn(this.formForNotive.fileList1[0].raw)
      //   sendData.append('business_licence',allUrl1[0])
      // }else{
      //   let allUrl1 = this.formForNotive.fileList1[0].url
      //   sendData.append('business_licence',allUrl1)
      // }

      // if(this.formForNotive.fileList2[0].raw){
      //   let allUrl2 = await uploadFn(this.formForNotive.fileList2[0].raw)
      //   sendData.append('id_card_front',allUrl2[0])
      // }else{
      //   let allUrl2 = this.formForNotive.fileList2[0].url
      //   sendData.append('id_card_front',allUrl2)
      // }

      // if(this.formForNotive.fileList2[1].raw){
      //   let allUrl3 = await uploadFn(this.formForNotive.fileList2[1].raw)
      //   sendData.append('id_card_behind',allUrl3[0])
      // }else{
      //   let allUrl3 = this.formForNotive.fileList2[1].url
      //   sendData.append('id_card_behind',allUrl3)
      // }
      
      editShop_api(sendData).then(data=>{
        this.waitAddNotice = false
        this.addNewShow = false
        if(data.status===0){
          this.$notify({
            title: '上传成功',
            message: '已新增店铺',
            type: 'success'
          })
          this.getList()
        }else{
          this.$notify({
            title: '上传失败',
            message: '新增店铺失败',
            type: 'error'
          })
        }
      }).catch(e=>{
        this.waitAddNotice = false
        this.addNewShow = false
        console.error('manageShop:editShop_api 接口错误')
      })
    },
    //head
    addItem(){ //显示 弹框
      // this.editLoading = false
      this.isAddItem = true
      this.addNewShow = true
      this.formForNotive = Object.assign({},formForNotive)
    },
    search(){ // 此时listQuery已经改变
      this.getList()
    },
    //body
    getList() { //获取店铺列表
      this.listLoading = true
      let sendData = Object.assign({},this.listQuery)
      getShop_api(sendData).then(response => {
        if(response&&response.status==0){
          let result = response.data
          let tempTableData = []
          result.forEach((aData)=>{
            let temp_fileList1 =[]
            let temp_fileList2 =[]
            if(aData.business_licence){
              temp_fileList1.push({url:aData.business_licence})
            }
            if(aData.id_card_front){
              temp_fileList2.push({url:aData.id_card_front})
            }
            if(aData.id_card_behind){
              temp_fileList2.push({url:aData.id_card_behind})
            }
            tempTableData.push({
              //后端生成
              id:aData.store_id,
              industryName:aData.storeclass_name,
              //前后统一
              title:aData.store_name,
              username:aData.contacts_name,
              phone:aData.contacts_phone,
              account:aData.seller_name,
              province:aData.company_province_id,
              city:aData.company_city_id,
              industry:aData.storeclass_id,
              fileList1:temp_fileList1,
              fileList2:temp_fileList2,
              lastvisit:aData.total_view,
              isUp:aData.store_state
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
    editItem(index,rowData){
      // this.editLoading = true
      this.formForNotive = Object.assign({},rowData)
      //补洞
      this.optionsCity = this.positonList[this.formForNotive.province]

      this.isAddItem = false
      this.addNewShow = true
    },
    async downShop(id,wantUp){
      let sendData = {
        store_id:id,
        store_state:wantUp
      }
      upDownShop(sendData).then(res=>{
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
    async downItem(index,data,wantUp){
      let id = data.id
      this.$confirm(`此操作将${wantUp===1?'上架':'下架'}该店铺, 是否继续?`, '提示', {
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
    //footer
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    // -----------------
    //out
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
  }
}
</script>