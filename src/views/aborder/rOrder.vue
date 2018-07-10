<style lang="stylus">
  .notice
    .header
      margin-top 20px
</style>

<template>
<div>
<el-dialog
  title="商品明细"
  :visible.sync="detailShow"
  width="80%"
  >
    <el-form >
      <el-form-item label="商品名称">
        <div>"创意美术课"</div>
      </el-form-item>
      <el-form-item label="商品编码">
        <div>"创意美术课"</div>
      </el-form-item>
      <el-form-item label="物流公司">
        <div>"创意美术课"</div>
      </el-form-item>
      <el-form-item label="物流单号">
        <div>"创意美术课"</div>
      </el-form-item>
    </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="detailShow = false">返 回</el-button>
  </span>
</el-dialog>
<el-container class="notice">
<el-header class="header" style="height:auto !important">
  <el-form :inline="true" :model="formInline" class="form">
    <el-form-item>
      <el-button type="primary" :plain="activButton!=1" icon="el-icon-edit-outline" @click="changeStaticType(1)">所有订单</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :plain="activButton!=2" icon="el-icon-edit-outline" @click="changeStaticType(2)">申请退款订单</el-button>
    </el-form-item>
    <!-- <el-form-item>
      <el-button type="primary" :plain="activButton!=3" icon="el-icon-edit-outline" @click="changeStaticType(3)">申请退货订单</el-button>
    </el-form-item> -->
    <el-form-item>
      <el-button type="primary" :plain="activButton!=4" icon="el-icon-edit-outline" @click="changeStaticType(4)">退款订单记录</el-button>
    </el-form-item>
    <!-- <el-form-item>
      <el-button type="primary" :plain="activButton!=5" icon="el-icon-edit-outline" @click="changeStaticType(5)">退货订单记录</el-button>
    </el-form-item> -->
  </el-form>
  <el-form :inline="true" :model="formInline" class="form">
    <el-form-item>
      <el-input style="width: 340px;" placeholder="请输入联系方式或店名" v-model="listQuery.search"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="searchByDate">查询</el-button>
    </el-form-item>
    <el-form-item label="订单类型">
      <el-select v-model="orderType" placeholder="请选择">
        <el-option
          v-for="item in orderTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    <el-button type="primary" icon="el-icon-search" @click="searchByDate">查询</el-button>
    </el-form-item>
    <el-form-item label="订单状态">
      <el-select v-model="orderState" placeholder="请选择">
        <el-option
          v-for="item in orderStateOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    <el-button type="primary" icon="el-icon-search" @click="searchByDate">查询</el-button>
    </el-form-item>
    <!-- <el-form-item label="时间">
      <el-date-picker
        style="width:400px"
        v-model="dataRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button type="primary" icon="el-icon-search" @click="searchByDate">查询</el-button>
    </el-form-item> -->
   
  </el-form>  
  <el-form  :inline="true" :model="formInline" class="form">
    
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
      <!-- <el-table-column
        label="类型" 
        prop="goodsType"
        >
      </el-table-column> -->
      <el-table-column
        label="编号" 
        prop="goodsNum"
        >
      </el-table-column>
      <el-table-column
        label="买家账号" 
        prop="customer"
        >
      </el-table-column>
      <el-table-column
        label="买家电话" 
        prop="customerPhone"
        >
      </el-table-column>
        <el-table-column
        label="状态" 
        prop="goodsState"
        >
      </el-table-column>
      <el-table-column
        label="价格" 
        prop="goodsPrice"
        >
      </el-table-column>
      <el-table-column
        label="类别" 
        prop="buyType"
        >
      </el-table-column>
      <el-table-column
        label="下单时间" 
        prop="buyTime"
        >
      </el-table-column>
      <el-table-column
        label="操作" 
        >
        <template slot-scope="scope">
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
//getROrderList_api 接口异常 php :未定义变量 bannnerModel
import {getROrderList_api} from '@/api/seller'
export default {
  created(){
    // this.getList()
  },
  data() {
    return {
      //out
      detailShow:false,
      //header
      orderState:'',
      orderStateOptions:[{
          value: 'yifahuo',
          label: '已发货'
        }, {
          value: 'weifahuo',
          label: '未发货'
        }],
      dataRange:'',
      activButton:1,
      orderType:'',
      orderTypeOptions: [{
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
          goodsImage: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=112835804,3321024037&fm=27&gp=0.jpg',
          goodsName:'香辣鸡腿堡',
          goodNum:'1213',
          custom:'黄邦胜huangbangsheng',
          customPhone:'13720263524',
          goodsState:'已发货',
          goodsPrice:'18.5',
          buyType:'团购',
          buyTime:'2018-7-1',
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
    // body table表单获取数据
      getList() {
        this.listLoading = true
        let sendData = Object.assign({},this.listQuery)
        
        getROrderList_api(sendData).then(response => {
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
    //尝试 测试 接口 ----------------------------------
    //header
    changeStaticType(index){
      this.activButton = index
      console.log('search changeStaticType')
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
      this.formForNotive = {}
    },
    //body
    editItem(){
      this.isAddItem = false
      this.addNewShow = true
      //获取数据 填充form
      this.formForNotive = {
        title:'当前店铺名称',
        username:'当前店铺名称',
        phone:'当前店铺名称',
        account:'当前店铺名称',
        name:'当前店铺名称',
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
    
  }
}
</script>