<style lang="stylus">
  .notice
    .header
      margin-top 20px
    .big-icon
      font-size 30px
      color #409EFF
    .big-icon-no
      font-size 30px
      color #b19999
      // color #F56C6C
</style>

<template>
<div>

<el-container class="notice">

  <el-main>
    <el-form :inline="true"  class="form"> 

      <el-form-item label="">
        <el-input style="width: 340px;" placeholder="请输入手机号" v-model="keyword"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
      </el-form-item>

    </el-form>

    <el-table :data="list" stripe v-loading="loadList" element-loading-text="给我一点时间" style="width: 100%" >
      <el-table-column :label='item.key' :prop='item.value' v-for='(item, index) in classList' :key='index'></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="showItem(scope.$index, scope.row)">查看</el-button>
          <el-button size="mini" type="danger" @click="deleteItem(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination background 
                  @size-change="sizeChange" 
                  @current-change="pageChange" 
                  :current-page="listConfig.page" 
                  :page-sizes="[10,2,30, 50]" 
                  :page-size="listConfig.limit" 
                  layout="total, sizes, prev, pager, next" :total="listTotal">
    </el-pagination>

  </el-main>

</el-container>

  <!-- coulse List -->
  <el-dialog :visible.sync='canShowStudent'>

    <el-form :data="detail" stripe v-loading="loadStudent" element-loading-text="给我一点时间" style="width: 100%" :disabled='true'>

      <el-form-item :label="item.key" :prop="item.value" v-for='(item, index) in formList' :key='index'>
          <el-input style="width: 340px;" v-model="detail[item.value]"></el-input>
      </el-form-item>

    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="canShowStudent=false">取消</el-button>
    </span>
  </el-dialog>

</div>
</template>
<script>

import api from '@/api/seller' 
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

export default {
  components: {
    UploadExcelComponent
  },
  created(){
    this.getList()
  },
  data() {
    return {
      formLabelWidth:'80px',
      address: null,
      addressList: [],
      classList: [
        { key: '预约人', value: 'name' },
        { key: '联系方式', value: 'num_total' },
        { key: '预约课程', value: 'coulse' },
        { key: '预约老师', value: 'teacher' },
        // { key: '教学点', value: 'address' },
        { key: '时间段', value: 'times' },
      ],
      listConfig: { // student
        page: 1,
        limit: 10,
        coulseId: 0,
        teacherId: 0,
        parentName: '',
        parentPhone: 1,
      },
      keyword: '',
      loadList: false,
      list: [],
      listTotal: null,
      canShowStudent: false,
      loadStudent: false,
      detail: {},
      formList: [
        { key: '预 约 人 ', value: 'name' },
        { key: '联系方式', value: 'phone' },
        { key: '学生姓名', value: 'name' },
        { key: '家长姓名', value: 'parentName' },
        { key: '预约课程', value: 'teacher' },
        { key: '预约老师', value: 'teacher' },
        { key: '预约时间', value: 'teacher' },
      ]
    }
  },
  methods: {
      search(){
        this.listConfig.keyword = this.keyword;
        console.log('search', this.listConfig);
      },
      showItem(index, row){
        this.canShowStudent = true;

        this.getDetail(row.id)
      },
      deleteItem(index,row){
        let id = row.id
        this.$confirm(`此操作将删除该条目, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteItem(id);
        }).catch(()=>{
          console.log('delete student cancel');
          this.$notify.info({ title: '消息', message: '已取消' });
        })
      },
      //
      getList() { //获取列表
        this.loadList = true;

        // let sendData = Object.assign({},this.listQuery)
        
        this.list = [
          { name: 'k1', coulse: 'kk1', phone: 10, parentName: 'skfjkdsf看视频低空飞过佛i给fig水平高奋斗过v佛光v就' },
          { name: 'k1sdfkjsdfgdp', phone: 10, teacher: 't2', parentName: 'skfjkdsf看视频低空飞过佛i给fig水平高奋斗过v佛光v就' },
        ];
        this.listTotal = this.list.length;
        this.loadList = false;
      },
      getDetail(id){
        this.detail = { name: 'k1sdfkjsdfgdp', phone: 10, parentName: 'skfjkdsf看视频低空飞过佛i给fig水平高奋斗过v佛光v就' };
      },
      deleteItem(id){
        console.log('delete id:', id);
      },
    sizeChange(val){
      this.listConfig.search = val;
      console.log('size change', this.listConfig);
    },
    pageChange(val){
      this.listConfig.search = val;
      console.log('page change', this.listConfig);
    }
    
  }
}
</script>