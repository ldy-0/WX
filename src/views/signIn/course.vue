<style lang="css">
  .header{
    margin-top: 20px;
  }

.time{
  display: flex; 
  align-items: center;
}

.custom_detail{
  position: relative;
  width: 50%;
  height: 200px;
  margin: 20px 0;
  padding: 30px 10px;
  border: 1px solid gray;
}
.close{
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>

<template>
<div>

<custom-dialog :config='dialogConfig' :visible='canShowForm' :detail='formData' @cancel='clearForm' @submit='saveCoulse' @addDetail='addTeacher'>
  <div class='custom_detail' v-for='(item, index) in detailList' :key='index'>
    <el-form label-width="100px"  :model='item' ref='detailForm' :rules='detailRule' >
      <i class='el-icon-close close' @click='deleteDetail(index)'></i>

      <el-form-item label="老师" prop='teacher'>
        <el-select v-model='item.teacher' placeholder="请选择老师">
            <el-option v-for="option in teacherList" :key="option.teacher_id" :label="option.teacher_name" :value="option.teacher_id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="教学点" style='margin: 20px 0;' prop='address'>
        <el-select v-model='item.address' placeholder="请选择教学点">
            <el-option v-for="option in addressList" :key="option.address_id" :label="option.address_name" :value="option.address_id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="可预约人数" prop='max_stunum'>
        <el-input v-model="item.max_stunum" auto-complete="off" @input='inputSum'></el-input>
      </el-form-item>

    </el-form>
  </div>
</custom-dialog>

<el-container class="notice">

<el-header class="header">
  <customHead :config='headConfig' @add='showForm' @searchByKeyWord='searchByKeyWord'></customHead>
</el-header>

<el-main>
  <custom-table :config='tableConfig'
                :data='tableData'
                :classList='tableClass'
                :total='total'
                :isLoading='listLoading'
                @update='showForm'
                @delete='deleteCourse'
                @showStudent='showStudent'
                @change='change'></custom-table>

</el-main>
</el-container>

<!-- edit coulse --> 
  <el-dialog :visible.sync='canShowStudent' width='80%'>
    <el-form :inline="true" :model="formInline" class="form">

      <el-form-item>
        <el-input style="width: 340px;" placeholder="请输入联系方式" v-model="studentKeyword"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchStudent">查询</el-button>
      </el-form-item>

      <!-- <el-form-item>
        <upload-excel-component :on-success='importDone' :before-upload="beforeUpload"></upload-excel-component>
      </el-form-item> -->

    </el-form>

    <custom-table :config='studentConfig'
                  :data='studentList'
                  :classList='studentClass'
                  :total='studentTotal'
                  :isLoading='loadStudent'
                  @showAdd='showAdd'
                  @showMinus='showMinus'
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
import customHead from '@/components/customHead/index.vue' 
import customTable from '@/components/customTable/index.vue' 
import customDialog from '@/components/customDialog/index.vue' 

export default {
  created(){
    this.getClassList();
    this.getTeacherList();
    this.getAddressList();

    this.getList()
  },

  components: {
    customHead,
    customTable,
    customDialog,
  },

  data() {
    return {
      detailList: [],
      detailRule: {
          'teacher': [ { required: true, message: '请选择类别', trigger: 'change' }, ],
          'address': [ { required: true, message: '请选择教学点', trigger: 'change' } ],
          'max_stunum': [ { required: true, message: '请输入可预约人数', trigger: 'blur' } ],
      },
      error: null,
      headConfig: {
        showAdd: true,
        showSearchByKeyWord: true,
        title: '添加课程',
        inputWidth: '300px',
        placeholder: '请输入课程名',
      },
      listLoading: false,
      tableConfig: {
        showOperate: true,
        showUpdate: true,
        showStudent: true,
        showDelete: true,
      },
      tableData: [],
      tableClass: [
        { key: '姓名', value: 'course_name' },
        { key: '总期数', value: 'course_semester' },
        { key: '价格', value: 'price' },
        { key: '可预约人数', value: 'max_stunum' },
        { key: '已预约人数', value: 'stu_num' },
        { key: '老师', value: 'teacher', isMulti: true, }, // 
        { key: '教学点', value: 'address_name', },
        { key: '时间段', value: 'times', isMulti: true, },
      ],
      listQuery: {
        page: 1,
        limit: 10,
      },
      total:1,
      formLabelWidth:'100px',
      // 
      dialogConfig: {
        width: '60%',
        labelWidth: '100px',
        canSubmit: true,
        classList: [
          { key: '课程名称', value: 'course_name', isText: true, },
          { key: '课程分类', value: 'course_class', isSelect: true, list: [], id: 'storegc_id', name: 'storegc_name' },
          { key: '期数', value: 'course_semester', isInteger: true, },
          { key: '上课时间', value: 'course_time', isDates: true, },
          // { key: '教学点', value: 'teach_address', placeholder: '请选择教学点(可多选)', list: [], id: 'address_id', name: 'address_name', isMultiSelect: true, },
          // { key: '教师', value: 'teacher', placeholder: '请选择教学点(可多选)', list: [], id: 'teacher_id', name: 'teacher_name', isMultiSelect: true, },
          { key: '可预约人数', value: 'max_stunum', isInteger: true, },
          { key: '添加老师', value: 'detail', isDetail: true, },
        ],
        rules: {
          'course_name': [ { required: true, message: '请输入名字', trigger: 'blur' }, ],
          'course_class': [ { required: true, message: '请选择类别', trigger: 'change' }, ],
          'course_semester': [
              { required: true, message: '请输入期数', trigger: 'blur' },
              { type: 'number', message: '周期值必须为数字', trigger: 'blur' },
              { type: 'number', min: 1, message: '周期值必须大于0', trigger: 'blur' },
          ],
          'teach_address': [ { required: true, message: '请选择教学点', trigger: 'change' } ],
          'teacher': [ { required: true, message: '请选择老师', trigger: 'change' } ],
          'max_stunum': [
              { required: true, message: '请输入可预约人数', trigger: 'blur' },
              { type: 'number', message: '可预约人数必须为数字', trigger: 'blur' },
              { type: 'number', min: 1, message: '可预约人数必须大于0', trigger: 'blur' },
          ],
        }
      },
      canShowForm: false, // 是否显示添加/修改课程弹窗
      canSubmit:false,
      isAddItem:true, // 是否是添加课程
      formData: {
        course_time: [],
        teacher: [],
      },
      formInline: {},
      addressList: [],
      teacherList: [],
      // student
      canShowStudent: false, 
      studentConfig: {
        showOperate: true,
        showAdd: true,
        showMinus: true,
        showDelete: true,
      },
      loadStudent: false,
      studentKeyword: null,
      studentList: [],
      studentClass: [
        { key: '学生姓名', value: 'student_name' },
        { key: '家长姓名', value: 'parent_name' },
        { key: '家长手机', value: 'parent_mobile' },
        { key: '总期数', value: 'name' },
        { key: '已上期数', value: 'name' },
        { key: '剩余期数', value: 'name' },
      ],
      student: {
        page: 1,
        limit: 10,
        cschedule_id: null,
        student_state: 0,
      },
      studentTotal: 0,
    }
  },
  methods: {
    searchByKeyWord(v){
      this.listQuery.course_name = v;
      console.log('address search :', this.listQuery);

      this.getList();
    },
    showForm(row){
      this.canShowForm = true;
      this.dialogConfig.canSubmit = true;

      this.isAddItem = !row;
      this.initForm(row);
      console.log('showForm :', this.dialogConfig, row);
    },
    clearForm(done){ this.canShowForm = false; },
    initForm(item){
      let detail = {};

      for(let key in (item || this.formData)){ detail[key] = item ? item[key] : Array.isArray(this.formData[key]) ? [] : '' }

      if(item){
        let addressConfig = this.dialogConfig.classList[3];
        // addressConfig.placeholder = '请选择教学点';
        // addressConfig.isMultiSelect = false;
        // addressConfig.isSelect = true;
        // detail.teach_address = item.address_id;
        detail.course_time = Array.isArray(item.time) ? item.time.map(t => { 
          let date = new Date(Number(t[0])),
              dateStr = date.toLocaleDateString(),
              times = t[1].split('-'),
              startTimes = times[0].split(':'),
              endTimes = times[1].split(':');

          return { start: `${dateStr} ${times[0]}`,
                   end: `${dateStr} ${times[1]}`,
                   startTemp: `${date.getTime() + (Number(startTimes[0]) * 3600 + Number(startTimes[1]) * 60) * 1000}`,
                   endTemp: `${date.getTime() + (Number(endTimes[0]) * 3600 + Number(endTimes[1]) * 60) * 1000}`,
                  };
        }) : ['']
      }

      console.log('init form data done', detail);
      this.formData = detail;
    },
    deleteDate(index){
      console.log('delete date', index);
      this.formData.times.splice(index, 1);
    },
    addDate(e){
      console.log('add date', e, this.formData.times);
      this.formData.times.push({ start: e[0].toLocaleString(), end: e[1].toLocaleString() });
    },
    // detail
    addTeacher(){
      console.log();
      this.detailList.push({ teacher: '', address: '', max_stunum: '', }); 
    },
    deleteDetail(index){
      this.detailList.splice(index, 1);
    },
    inputSum(v){
      console.log('input sum', v); 
      
      if(isNaN(Number(v)))return this.error = { message: '值必须为数字' };

      if(v <= 0 || v % 1 !== 0)return this.error = { message: '值必须为正整数' };

      this.error = null;
    },
    getDateTemp(t){ return t.getTime() - ( t.getHours() * 3600 + t.getMinutes() * 60 + t.getSeconds() ) * 1000; },
    async saveCoulse () {
      let times = this.formData.course_time;

      for(let i = 0, len = this.$refs[`detailForm`].length; i < len; i++){
        console.log(this.$refs);
        let res = await this.$refs[`detailForm`][i].validate().catch(e => e);
        if(!res) return ;
      }

      if(this.error) return this.$message.error(this.error);

      // if(this.formData.course_semester !== times.length) return this.$message.error({ message: '课程期数必须和上课时间数量一致!' });

      // if(){};

      this.dialogConfig.canSubmit = false;

      times.forEach((v, i) => {
        let start = new Date(times[i].startTemp),
            end = new Date(times[i].endTemp);

        times[i] = `${this.getDateTemp(start)}|${start.getHours()}:${start.getMinutes()}-${end.getHours()}:${end.getMinutes()}` 
      });
      console.log('save course param:', this.formData, this.detailList)
      
      let res = this.isAddItem ? await api.setCoulse(this.formData, this) : await api.updateCourse(this.formData, this);

      this.canShowForm = false;
      this.getList();
      
    },
    async getList() { 
      this.listLoading = true

      let res = await api.getCoulseList(this.listQuery);
      res.data.forEach(v =>  v.times = Array.isArray(v.time) ? v.time.map(t => `${new Date(Number(t[0])).toLocaleDateString()} ${t[1]}`) : [''] );

      this.tableData = res.data;
      this.total = res.pagination.total;
      console.log('get course', this.tableData, this.total);
      this.listLoading = false
    },
    async deleteCourse(item){
      let res = await api.deleteCoulse({ cschedule_id: item.cschedule_id }, this);
      console.log('delete course', item);
    },
    showStudent(row){
      this.canShowStudent = true;

      this.student.cschedule_id = row.cschedule_id;
      this.getStudentList();
    },
    change(v){
      console.log('change', v);
      this.listQuery.page = v.page;
      this.listQuery.limit = v.limit; 
      this.getList()
    },
    // student
    searchStudent(){
      console.log('search student', this.studentKeyword);
      this.student.search = this.studentKeyword;
      this.getStudentList();
    },
    async getStudentList(){
      this.loadstudent = true;

      let res = await api.getCourseStudent(this.student, this);
      
      this.studentList = res.data;
      this.studentTotal = res.pagination ? res.pagination.total : this.studentList.length;

      this.loadstudent = false;
    },
    async showAdd(item){
      console.log('add ', item);
      let param = {
        stucourse_id: 1,
        buy_semester: 1,
      };

      let res = await api.changeSemester(param, this);
    },
    showMinus(item){
      console.log('minus', item);
    },
    deleteStudent(item){
      console.log('delete student:', item);

    },
    changeStudent(v){
      this.student.page = v.page;
      this.student.limit = v.limit;
      this.getStudentList()
    },
    // 
    async getClassList(){
      let res = await api.getClassList(null, this);
      console.log('teacher list:', res.data);
      
      this.dialogConfig.classList[1].list = res.data;
    },
    async getTeacherList(){
      let res = await api.getTeacherList(null, this);
      console.log('teacher list:', res.data);
      
      this.teacherList = res.data;
      // this.dialogConfig.classList[4].list = res.data;
    },
    async getAddressList(){
      let res = await api.getAddressList(null, this);
      console.log('address list:', res);
      
      this.addressList = res.data;
      // this.dialogConfig.classList[3].list = res.data;
    },
    
  }
}
</script>