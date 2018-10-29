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
<el-dialog :title="isAddItem ? '新增老师' : '编辑老师' " :visible.sync="canShow" width="60%">

  <el-form :model="formData"  ref="ruleForm" :rules="rules" >

    <el-form-item label="姓名" :label-width="formLabelWidth" prop="teacher_name">
      <el-input v-model="formData.teacher_name" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="联系方式" :label-width="formLabelWidth" prop="teacher_mobile">
      <el-input v-model="formData.teacher_mobile" auto-complete="off"></el-input>
    </el-form-item>
    
  </el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="canShow=false" >取消</el-button>
    <el-button type="primary"  :disabled="!canSubmit" :loading='!canSubmit' @click="submit('ruleForm')">确 定</el-button>
  </span>
</el-dialog>

<el-container class="notice">

<el-header class="header">
  <customHead :config='headConfig' @add='showForm' @searchByKeyWord='searchByKeyWord'></customHead>
</el-header>

<el-main>
  <custom-table :config='tableConfig' 
                :data='tableData' 
                :classList='tableClass' 
                :isLoading='listLoading' 
                :total='total'
                @showDetail='showCourse'
                @delete='deleteTeacher'
                @authUpdate='authUpdate'
                @authShow='authShow'
                @change='change'></custom-table>
    
</el-main>

</el-container>

  <!-- coulse List -->
  <el-dialog :visible.sync='canShowCoulse'>
    <el-select v-model="address" placeholder="请选择教学点">
        <el-option v-for="item in addressList" :key="item.address_id" :label="item.address_name" :value="item.address_id"></el-option>
    </el-select>

    <!-- 详情：课程每期信息 -->
    <custom-table :config='courseConfig' 
                  :data='courseList' 
                  :classList='courseClass' 
                  :isLoading='loadCourse' 
                  :total='courseTotal'
                  @showDetail='showItemCourse'
                  @showStudent='showStudent'
                  @change='changeCourse'>

          <!-- <el-button size="mini" type="text" @click="showStudent(scope.$index, scope.row)">查看学生</el-button> -->

    </custom-table>

    <span slot="footer" class="dialog-footer">
      <el-button @click="canShowCoulse=false">取消</el-button>
    </span>
  </el-dialog>

  <!-- student List -->
  <el-dialog :visible.sync='canShowStudent'>
    <el-form :inline="true" :model="formInline" class="form">

      <el-form-item>
        <el-input style="width: 340px;" placeholder="请输入联系方式" v-model="studentKeyword"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchStudent">查询</el-button>
      </el-form-item>

      <el-form-item>
        <upload-excel-component :on-success='importDone' :before-upload="beforeUpload"></upload-excel-component>
      </el-form-item>

    </el-form>

    <custom-table :config='studentConfig' 
                  :data='studentList' 
                  :classList='studentClass' 
                  :isLoading='loadStudent' 
                  :total='studentTotal'
                  @update='updatePhone'
                  @delete='deleteStudent'
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
    this.getList()
  },
  data() {
    return {
      headConfig: {
        showAdd: true,
        showSearchByKeyWord: true,
        title: '添加教师',
        inputWidth: '300px',
        placeholder: '请输入联系方式',
      },
      canSubmit: false,
      canShow:false,
      isAddItem:true,
        rules: {
          teacher_name: [
              { required: true, message: '请输入昵称', trigger: 'blur', min: 1, },
              { required: true, message: '不能超过15个字符!', trigger: 'blur', max: 15 }
          ],
          teacher_mobile: [
              { required: true, message: '请输入手机号', trigger: 'blur' },
              { required: true, message: '手机号必须是11位', trigger: 'blur', min: 11, max: 11 },
          ],
      },
      formLabelWidth:'80px',
      formData: {
        teacher_name: '',
        teacher_mobile:'',
      },
      tableConfig: {
        showOperate: true,
        showDetail: true,
        showDelete: true,
        showAuthUpdate: true,
        showAuthShow: true,
      },
      tableData: [],
      tableClass: [
        { key: '名字', value: 'teacher_name' },
        { key: '手机号', value: 'teacher_mobile' },
      ],
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
      },
      total: 0,
      canShowCoulse: false,
      courseConfig: {
        showOperate: true,
        showDetail: true,
        showStudent: true,
      },
      courseClass: [
        { key: '课程名称', value: 'course_name' },
        { key: '总期数', value: 'course_semester' },
        { key: '已上期数', value: 'finished_semester' },
        { key: '教学点', value: 'address_name' },
        { key: '时间点', value: '' },
      ],
      loadCourse: false,
      courseList: [],
      coulse: {
        page: 1,
        limit: 10,
      },
      courseTotal: 0,
      address: null,
      addressList: [],
      
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
        { key: '家长手机', value: 'name' },
        { key: '分类', value: 'name' },
      ],
      studentList: [],
      student: {
        page: 1,
        limit: 10,
      },
      studentTotal: 0,
      formInline: {},
    }
  },
  methods: {
    searchByKeyWord(v){
      this.listQuery.search = v;
      console.log('address search :', this.listQuery);

      this.getList();
    },
    showForm(index, row){
      this.canShow = true;
      this.canSubmit = true;
      this.initForm();

      if(typeof index !== 'number') return this.isAddItem = true;

      this.isAddItem = false;
      this.initForm(row);
    },
    initForm(item){
      let detail = {};

      for(let key in (item || this.addressForm)){ detail[key] = item ? item[key] : '' }
      console.log(detail);
      this.formData = detail;
    },
    async submit(formName){
      
      let res = await this.$refs[formName].validate().catch(e => e);
      if(!res) return ;

      this.canSubmit = false 
      this.update()
    },
    async update(){
      let param = {

      }
      console.log('param --', this.formData);
      var addres = this.isAddItem ? await api.setTeacher(this.formData, this) : await api.updateTeacher(htis.formData, this);

      this.canSubmit = false
      this.canShow = false;
      this.getList();
    }, 
    async showCourse(row){
      console.log(row)

      let addressList = await api.getAddressList();
      this.addressList = addressList.data;
      // get coulse 
      this.canShowCoulse = true;

      this.coulse.teacher_id = row.teacher_id;
      this.getCourseList(); 
    },
      searchStudent(){
        console.log('search student', this.studentKeyword);
      },
      importDone({ results, header }) { // upload xls success
        this.tableData = results
        this.tableHeader = header
        console.log('-- import success', this.tableData, this.tableHeader)
      },
      beforeUpload(file) { // before upload xls
        const isLt2M = file.size / 1024 / 1024 < 1

        if (isLt2M) {
          return true
        }
        this.$message({
          message: 'Please do not upload files larger than 2m in size.',
          type: 'warning'
        })
        return false
      },
      
      // 
    async getList() { //获取列表
      this.listLoading = true
      
      let res = await api.getTeacherList(this.listQuery, this);
      console.log(res)
      this.tableData = res.data;
      this.total = res.pagination ? res.pagination.total : 0;
      this.listLoading = false
    },
    async deleteTeacher(item){
      let res = await api.deleteTeacher({teacher_id: item.teacher_id}, this);
      console.log('delete teacher:', item);
      this.getList();
    },
    authUpdate(item){
      console.log('auth update teacher:', item);
    },
    authShow(item){
      console.log('auth Show teacher:', item);
    },
    change(v){
      console.log('change list:', v);
      this.listQuery = v;
      this.getList();
    },
    // course 课程
    async getCourseList(){
      this.loadCourse = true;

      let courseList = await api.getTeacherCoulse(this.coulse); 
      this.courseList = courseList.data;
      
      console.log('get coulse', this.courseList);
      this.courseTotal = courseList.pagination.total;
      this.loadCourse = false;
    },
    async showItemCourse(item){
      console.log('item course', item);
      let res = await api.getTeacherItemCourse({teacher_id: item.teacher_id, cschedule_id: item.cschedule_id}, this);
      
    },
    showStudent(row){
      console.log('student', row);
      this.canShowStudent = true;

      this.getStudentList();
    },
    changeCourse(v){
      console.log('change course list:', v);
      this.course = v;
      this.getCourseList();
    },
    // 课程对应的学生 
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
    deleteStudent(item){
      console.log('delete student:', item);
    },
    changeStudent(v){
      console.log('change student list:', v);
      this.student = v;
      this.getStudentList();
    },
    
  }
}
</script>