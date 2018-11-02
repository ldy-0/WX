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

    <customHead :config='headConfig' @searchByDate='searchByDate'></customHead>

    <el-table :data="list" stripe v-loading="loadList" element-loading-text="给我一点时间" style="width: 100%" >
      <el-table-column :label='item.key' :prop='item.value' v-for='(item, index) in classList' :key='index'></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="showIn(scope.$index, scope.row)">查看签到</el-button>
          <el-button size="mini" type="primary" @click="showOut(scope.$index, scope.row)">查看离开</el-button>
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

    <customHead :config='studentHeadConfig' @searchByKeyWord='searchStudent' @exportFile='exportXLS'></customHead>

    <custom-table :config='studentConfig' 
                  :data='studentList' 
                  :classList='studentClass' 
                  :isLoading='loadStudent' 
                  :total='studentTotal'
                  @change='changeStudent'>
    </custom-table>

    <span slot="footer" class="dialog-footer">
      <el-button @click="canShowStudent=false">取消</el-button>
    </span>
  </el-dialog>

</div>
</template>
<script>

import api from '@/api/seller' 
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import customHead from '@/components/customHead/index.vue'
import customTable from '@/components/customTable/index.vue'

export default {
  components: {
    UploadExcelComponent,
    customHead,
    customTable,
  },
  created(){
    console.log('create');
    this.getList()
  },
  data() {
    return {
      formLabelWidth:'80px',
      address: null,
      addressList: [],
      headConfig: {
        showSearchByDate: true,
        // title: '添加教学点',
        inputWidth: '300px',
        // placeholder: '请输入地址点',
      },
      studentHeadConfig: {
        showSearchByKeyWord: true,
        showExport: true,
        inputWidth: '300px',
        placeholder: '请输入手机号',
      },
      classList: [
        { key: '课程名称', value: 'name' },
        { key: '总期数', value: 'num_total' },
        { key: '已上期数', value: 'num' },
        { key: '老师', value: 'teacher' },
        { key: '教学点', value: 'address' },
        { key: '时间段', value: 'times' },
      ],
      listConfig: { // student
        page: 1,
        limit: 10,
      },
      loadList: false,
      list: [],
      listTotal: null,

      canShowStudent: false,
      loadStudent: false,
      studentKeyword: null,
      studentConfig: {
        showOperate: true,
        showUpdate: true,
        showDelete: true,
      },
      studentClass: [
        { key: '学生姓名', value: 'name' },
        { key: '家长姓名', value: 'name' },
        { key: '家长手机号', value: 'phone' },
        { key: '签到老师', value: 'teacher' },
      ],
      studentList: [],
      student: {
        page: 1,
        limit: 10,
      },
      studentTotal: 0,
    }
  },
  methods: {
      searchByDate(v){
        console.log('search', v);
      },
      searchStudent(v){
        console.log('search', v);
      },
      showIn(index, row){
        this.canShowStudent = true;
        let signin = { key: '签到时间', value: 'signinTime' };
        this.studentClass.some(v => v.key === '签到时间') ? void(0) : this.studentClass.push(signin);

        this.getStudentList();
      },
      showOut(){
        this.canShowStudent = true;
        let signout = { key: '离开时间', value: 'signoutTime' };
        this.studentClass.some(v => v.key === '离开时间') ? void(0) : this.studentClass.push(signout);

        this.getStudentList();
      },
      exportXLS(loading){

        import('@/vendor/Export2Excel').then(excel => {
          console.log('import', excel);
          const tHeader = this.studentClass.map(v => v.key); 
          const values = this.studentClass.map(v => v.value); 
          const data = this.studentList.map(o => values.map(v => o[v]) );

          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename,
            autoWidth: this.autoWidth
          })

          loading.close();
        })

      },
      //
      async getList() { 
        this.loadList = true;

        let res = await api.getSignList(this.listConfig, this); //FIXME: api
        // this.list = res.data;
        // this.listTotal = res.pagination.total;
        // console.log('coulse list', res);
        
        this.list = [
          { name: 'k1', phone: 10, parentName: 'skfjkdsf看视频低空飞过佛i给fig水平高奋斗过v佛光v就' },
          { name: 'k1sdfkjsdfgdp', phone: 10, parentName: 'skfjkdsf看视频低空飞过佛i给fig水平高奋斗过v佛光v就' },
        ];
        this.listTotal = this.list.length;
        this.loadList = false;
      },
    sizeChange(val){
      this.listConfig.limit = val;
      console.log('size change', this.listConfig);
      this.getList();
    },
    pageChange(val){
      this.listConfig.page = val;
      console.log('page change', this.listConfig);
      this.getList();
    },
    getStudentList(){
      this.loadStudent = true;

      this.studentList = [
        { name: 'k1', phone: 10, parentName: 'skfjkdsf看视频低空飞过佛i给fig水平高奋斗过v佛光v就' },
        { name: 'k1sdfkjsdfgdp', phone: 10, parentName: 'skfjkdsf看视频低空飞过佛i给fig水平高奋斗过v佛光v就' },
      ];
      this.student.total = this.studentList.length;
      this.loadStudent = false;
    },
    changeStudent(v){
      console.log('change student list:', v);
      this.student = v;
      this.getStudentList();
    },
    
  }
}
</script>