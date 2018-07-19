<style lang="stylus">
  .notice
    .header
      margin-top 20px
  .margin-btm20
    margin-bottom 20px
</style>

<template>
<div>
<el-dialog
  title="预约详情"
  :visible.sync="detailShow"
  width="60%"
  >
  <el-form :model="detailForm">
    <el-form-item label="预约人" :label-width="formLabelWidth">
      <p class="hbs-no-margin-p">
        {{detailForm.name}}
      </p>
    </el-form-item>
    <el-form-item label="电话" :label-width="formLabelWidth">
      <p class="hbs-no-margin-p">
        {{detailForm.phone}}
      </p>
    </el-form-item>
    <el-form-item label="日期" :label-width="formLabelWidth">
      <p class="hbs-no-margin-p">
        {{detailForm.date}}
      </p>
    </el-form-item>
    <el-form-item label="预约店铺" :label-width="formLabelWidth">
      <p class="hbs-no-margin-p">
        {{detailForm.school}}
      </p>
    </el-form-item>
    <el-form-item label="课程" :label-width="formLabelWidth">
      <p class="hbs-no-margin-p">
        {{detailForm.class}}
      </p>
    </el-form-item>
    <el-form-item label="预约状态" :label-width="formLabelWidth">
      <p class="hbs-no-margin-p">
        {{detailForm.status}}
      </p>
    </el-form-item>


    <el-form-item label="预约ID" :label-width="formLabelWidth">
      <p class="hbs-no-margin-p">
        {{detailForm.id}}
      </p>
    </el-form-item>
    <el-form-item label="店铺ID" :label-width="formLabelWidth">
      <p class="hbs-no-margin-p">
        {{detailForm.storeId}}
      </p>
    </el-form-item>
    <el-form-item label="预约人ID" :label-width="formLabelWidth">
      <p class="hbs-no-margin-p">
        {{detailForm.memberId}}
      </p>
    </el-form-item>
    <el-form-item label="商品ID" :label-width="formLabelWidth">
      <p class="hbs-no-margin-p">
        {{detailForm.goodsId}}
      </p>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="detailShow = false">返回</el-button>
  </span>
</el-dialog>
<el-container class="notice">
<el-header class="header" style="height:auto;">
  <el-form :inline="true" class="form">
    <el-form-item>
      <el-input style="width: 340px;" placeholder="请输入预约人姓名或联系方式" v-model="listQuery.search"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
    </el-form-item>
    <el-form-item label="时间">
      <el-date-picker
        style="width:400px"
        v-model="listQuery.time"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
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
        label="预约人姓名" 
        prop="name"
        >
      </el-table-column>
      <el-table-column
        label="联系方式" 
        prop="phone"
        >
      </el-table-column>
      <el-table-column
        label="预约时间" 
        prop="dateTXT"
        >
      </el-table-column>
      <el-table-column
        label="付款时间" 
        prop="paydateTXT"
        >
      </el-table-column>
      <!-- 预约校区 -->
      <el-table-column
        label="预约店铺" 
        prop="school"
        >
      </el-table-column>
      <!-- 预约课程 -->
      <el-table-column
        label="预约商品" 
        prop="class"
        >
      </el-table-column>
      <el-table-column
        label="操作" 
        min-width='300px'
        >
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="lookItem(scope.$index, scope.row)">查看</el-button>
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
import {getAppointmentList_api} from '@/api/seller'

export default {
  created(){
    this.getList()
  },
  data() {
    return {
      detailForm:{},
      detailShow:false,
      //head
        formInline: {},
      //body
      formLabelWidth:'140px',
      // body
      listLoading: false,
      tableData: [
      ],
      //FOOT
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
    //   head
      search(){
        this.getList()
      },
    //body
      lookItem(index) { //查看某条详情
        this.detailForm = this.tableData[index]
        this.detailShow = true
      },
      getList(status) {
        this.listLoading = true
        let sendData = {
          page:this.listQuery.page,
          limit:this.listQuery.limit,
          search:this.listQuery.search?this.listQuery.search:null,
          // time:this.listQuery.time?this.listQuery.time:null,
        }
        // time单独处理
        if(this.listQuery.time){
          sendData.time = this.listQuery.time[0].getTime().toString().slice(0,10)+'-'+this.listQuery.time[1].getTime().toString().slice(0,10)
        }else{
          sendData.time = null
        }
        // let sendData = Object.assign({},this.listQuery)
        // sendData.appointment_status = status?status:
        getAppointmentList_api(sendData).then(response => {
          // 这里由于结构做了调整，导致编辑页面需要的数据无法从列表获取，这里只需要给tableData额外传一个id
          if(response&&response.status==0){
            let result = response.data
            let tempTableData = []
            result.forEach((aData)=>{
              tempTableData.push({
                //后端生成
                id:aData.appointment_id,
                storeId:aData.store_id,
                memberId:aData.member_id,
                goodsId:aData.goods_id,
                //前后统一
                name:aData.member_name,
                phone:aData.appointment_phone,

                date:aData.appointment_time,
                dateTXT:aData.appointment_date,
                paydateTXT:aData.payment_time,

                school:aData.appointment_address,
                class:aData.goods_name,
                status:aData.appointment_status
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
    //foot
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