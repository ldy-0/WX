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
    <el-form :inline="true"  class="form"> <!--:model="formInline" -->

      <el-form-item>
        <el-input style="width: 340px;" placeholder="请输入联系方式" v-model="keyword"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchStudent">查询</el-button>
      </el-form-item>

      <!-- <el-form-item>
        <upload-excel-component :on-success='importDone' :before-upload="beforeUpload"></upload-excel-component>
      </el-form-item> -->

    </el-form>

    <custom-table :config='studentConfig' 
                  :data='studentList' 
                  :classList='studentClass' 
                  :isLoading='loadStudent' 
                  :total='studentTotal'
                  @update='updatePhone'
                  @showDetail='showCourse'
                  @delete='deleteStudent'
                  @change='changeStudent'>
    </custom-table>

  </el-main>

</el-container>

  <!-- coulse List -->
  <el-dialog :visible.sync='canShowCoulse'>
    <!-- <el-select v-model="address" placeholder="请选择教学点">
        <el-option
          v-for="item in addressList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
    </el-select> -->

    <custom-table :config='courseConfig' 
                  :data='courseList' 
                  :classList='courseClass' 
                  :isLoading='loadCourse' 
                  :total='courseTotal'
                  @change='changeCourse'>

    </custom-table>   

    <span slot="footer" class="dialog-footer">
      <el-button @click="canShowCoulse=false">取消</el-button>
    </span>
  </el-dialog>

</div>
</template>
<script>

import api from '@/api/seller' 
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import customTable from '@/components/customTable/index.vue'

export default {
  components: {
    UploadExcelComponent,
    customTable,
  },
  created(){
    this.getStudentList()
  },
  data() {
    return {
      formLabelWidth:'80px',
      canShowCoulse: false,
      loadCoulse: false,
      coulse: {
        page: 1,
        limit: 10,
      },
      coulseList: [],
      coulseTotal: '',
      address: null,
      addressList: [],
      canShowStudent: false,
      loadStudent: false,
      studentConfig: {
        showOperate: true,
        showUpdate: true,
        showLook: true,
        showDelete: true,
      },
      studentClass: [
        { key: '学生姓名', value: 'name' },
        { key: '家长姓名', value: 'name' },
        { key: '家长手机', value: 'name' },
        { key: '分类', value: 'name' },
      ],
      studentList: [],
      student: {
        page: 1,
        limit: 10,
      },
      studentTotal: 0,
      keyword: '',
      courseConfig: {
      },
      courseClass: [
        { key: '课程名称', value: 'name' },
        { key: '总期数', value: '' },
        { key: '已上期数', value: '' },
        { key: '教学点', value: 'address' },
        { key: '时间点', value: '' },
      ],
      loadCourse: false,
      courseList: [],
      coulse: {
        page: 1,
        limit: 10,
      },
      courseTotal: 0,
    }
  },
  methods: {
    searchStudent(){
      console.log('search student', this.keyword);
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
    updatePhone(item){
      console.log('update student:', item);
    },
    showCourse(index, rowData){
      console.log(rowData)
      
      this.canShowCoulse = true;
      this.getCourseList();
    },
    deleteStudent(item){
      console.log('delete student:', item);
    },
    changeStudent(v){
      console.log('change student list:', v);
      this.student = v;
      this.getStudentList();
    },
    // course
    async getCourseList(){
      this.loadCourse = true;

      // let courseList = await api.getCoulseList(this.coulse); //FIXME: api error
      // this.courseList = courseList.data;
      this.courseList = [
        { name: 'k1', num: 10, numed: 2, address: 'skfjkdsf看视频低空飞过佛i给fig水平高奋斗过v佛光v就', time: new Date().toLocaleString() },
        { name: 'k1', num: 10, numed: 2, address: 'skfjkdsf看视频低空飞过佛i给fig水平高奋斗过v佛光v就', time: new Date().toLocaleString() },
        { name: 'k1', num: 10, numed: 2, address: 'skfjkdsf看视频低空飞过佛i给fig水平高奋斗过v佛光v就', time: new Date().toLocaleString() },
        { name: 'k1', num: 10, numed: 2, address: 'skfjkdsf看视频低空飞过佛i给fig水平高奋斗过v佛光v就', time: new Date().toLocaleString() }
      ];
      console.log('get coulse', this.courseList);
      this.courseTotal = this.courseList.length; // courseList.pagination.total;
      this.loadCourse = false;  
    },
    changeCourse(v){
      console.log('change course list:', v);
      this.course = v;
      this.getCourseList();
    },
    
  }
}
</script>