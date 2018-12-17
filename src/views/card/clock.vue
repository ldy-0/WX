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
</style>

<template>
<div>

<el-container class="notice">

  <el-main>

    <customHead :config='headConfig' 
                @searchByKeyWord='searchByName' 
                @searchByDate='searchByDate' 
                @changeState='changeState'
                @exportFile='exportXLS'></customHead>

    <custom-table :config='tableConfig'
                :data='list'
                :classList='classList'
                :total='listTotal'
                :isLoading='loadList'
                @delete='deleteParent'
                @change='change'></custom-table>

  </el-main>

</el-container>

  <!-- List -->
  <!-- <el-dialog :visible.sync='canShowStudent' width='80%'>

  </el-dialog> -->

</div>
</template>
<script>

import api from '@/api/card' 
import { getNames } from '@/utils/auth' 
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
    this.getList()
  },
  data() {
    return {
      headConfig: {
        showSearchByKeyWord: true,
        inputWidth: '300px',
        placeholder: '请输入联系方式',
        showSearchByDate: true,
        dateWidth: '400px',
        showSelect: true,
        categories: [
          { id: 0, title: '全部' },
          { id: 1, title: '有学生' },
        ],
        showExport: true
      },
      // list
      tableConfig: {
        showOperate: true,
        showDelete: true,
      },
      classList: [
        { key: '姓名', value: 'card_name' },
        { key: '手机号', value: 'card_mobile' },
        { key: '公司固话', value: 'card_telephone' },
        { key: '邮箱', value: 'card_email' },
        { key: '公司地址', value: 'card_company' },
        { key: '打卡时间', value: 'sign_time' },
        { key: '学生姓名', value: 'student_name', isMulti: true },
      ],
      listConfig: {
        page: 1,
        limit: 10,
      },
      loadList: false,
      list: [],
      listTotal: null,
    }
  },
  methods: {
    searchByName(v){ this.getList(this.listConfig.search = v); },
    searchByDate(v){ 
      this.listConfig.starttime = new Date(v.startDate).getTime()/1000;
      this.listConfig.endtime = new Date(v.endDate).getTime()/1000;
      console.log(v, this.listConfig);
      this.getList(this.listConfig); 
    },
    changeState(v){
      if(v) this.listConfig.type = v
      this.getList();
    },
    exportXLS(loading){

      import('@/vendor/Export2Excel').then(excel => {
        console.log('import', excel);
        const tHeader = this.classList.map(v => v.key); 
        const values = this.classList.map(v => v.value); 
        const data = this.list.map(o => values.map(v => o[v]) );

        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: `打卡列表-第${this.listConfig.page}页`,
          autoWidth: this.autoWidth
        })

        loading.close();
      })

    },
    async deleteParent(item){
      let res = await api.deleteClock({ cardsign_id: item.cardsign_id }, this);

      this.getList();
    },
    async getList() { 
      this.loadList = true;

      let res = await api.getClockList(this.listConfig, this); 
      if(res.data){
        this.list = res.data;
        this.listTotal = res.pagination ? res.pagination.total : 0;
      }
      console.log('list res:', this.list);
      
      this.loadList = false;

      this.listConfig = { page: this.listConfig.page, limit: this.listConfig.limit };
    },
    change(v){
      this.listConfig.page = v.page;
      this.listConfig.limit = v.limit;
      console.log('size change', this.listConfig);
      this.getList();
    },
    
  }
}
</script>