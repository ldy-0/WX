<style lang="stylus">
  .notice
    .header
      margin-top 20px
  
  .detail
    position: relative;
    margin: 20px 0 0;
    border: 1px solid #c0c4cc;
    .detail_close
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      padding: 10px 20px;
    .detail_item
      margin: 20px 0;
    .detail_input
      width: 400px
</style>

<template>
<div>

<el-container class="notice">

  <el-header class="header">

    <custom-head :config='headConfig' @add='updateForm' @search='getKeyword'></custom-head> 

  </el-header>

  <custom-table :config='tableConfig' 
                :data='list' 
                :classList='classList' 
                :total='total' 
                :isLoading='isLoading' 
                @update='updateForm'
                @custom='commend'
                @judge='judge'
                @delete='deleteItem'
                @change='change'></custom-table>

  <div v-if='isShowForm'>
    <custom-dialog :config='dialogConfig'
                  :visible='isShowForm'
                  :detail='formData'
                  @select='addDetail'
                  @submit='submit'
                  @cancel='cancel'>
        
        <div class='detail_wrap'>
          <el-form class='detail' v-for='(item, index) in detailList' :key='index' :model='item' ref='detail' :rules='detailRule'>

            <!-- <div @click='deleteDetail(index)'>
              <el-icon class='detail_close el-icon el-icon-close'></el-icon>
            </div> -->

            <el-form-item class='detail_item' label-width='100px' label='服务类型' prop='service_id'>
              <div v-text='item.service_name'></div>
              <!-- <el-select :value='item.service_id' @change='changeServiceType(item, $event)' >
                <el-option :label='v.service_name' :value='v.service_id' v-for='(v, i) in selectList' :key='i'></el-option>
              </el-select> -->
            </el-form-item>

            <el-form-item class='detail_item' label-width='100px' label='服务价格' prop='price'>
              <el-input type='number' class='detail_input' v-model='item.price'></el-input>
            </el-form-item>

          </el-form>
        </div>

    </custom-dialog>
  </div>


</el-container>
</div>
</template>
<script>

import api from './api.js'
import base from './base.js'
import dialog_1 from './dialog_1.js'
import dialog_2 from './dialog_2.js'

export default {
  mixins: [base, dialog_1, dialog_2],

  data() {
    return {
      headConfig: {
        showAdd: true,
        title: '添加发型师',
        placeHolder: '发型师名称搜索'
      },
      dialogConfig: {
        width: '80%',    
        canSubmit: true,
        classList: [],
        addList: [
          { key: '设计师名字', value: 'stylist_name', isText: true, },
          { key: '图片', value: 'stylist_img', limit: 1, isImg: true, },
          { key: '工作时间', value: 'stylist_time', isMultiSelect: true, id: 'id', name: 'value', list: [] },
          { key: '可预约时间', value: 'appoinment_time', text: '添加时间', isMultiTime: true },
          { key: '签名', value: 'stylist_sign', isText: true, },
          { key: '价格', value: 'detailList', placeholder: '添加服务', isDetail: true, id: 'service_id', name: 'service_name', list: [] },
        ],
        rules: {
          'stylist_name': [ 
            { required: true, message: '请输入设计师名字!', trigger: 'blur' },
            { message: '设计师名字必须是1~15位!', min: 1, max: 15 } 
          ],
          'stylist_time': [ 
            { required: true, message: '请选择营业时间!', trigger: 'change' },
          ],
          'stylist_address': [ 
            { required: true, message: '请输入门店地址!', trigger: 'blur' },
          ],
        }
      },
      formData: {},
      isAdd: true,
      tableConfig: {
        showOperate: true,
        updateTitle: '编辑',
        custom: '大屏推荐',
        judge: ['isUp', '下架', '上架'],
        showDelete: true,
      },
      classList: [
        { key: '图片', value: 'stylist_image', isImg: true },
        { key: '名字', value: 'stylist_name' },
        { key: '价格(¥)', value: 'stylist_price' },
        { key: '价格(¥)', value: 'stylist_price' },
        { key: '签名', value: 'stylist_sign' },
        { key: '账号', value: 'service_type' },
      ],
      detailList: [],
      serviceList: [],
      selectList: [],
      detailRule: {
        'price': [ 
          { required: true, message: '请输入价格!', trigger: 'blur' },
          // { message: '设计师名字必须是1~15位!', min: 1, max: 15 } 
        ],
        'service_id': [ 
          { required: true, message: '请选择营业时间!', trigger: 'change' },
        ],
      }
    }
  },

  computed: {
    // selectList(){ let arr = this.serviceList.filter(v => !v.isChecked); console.error(arr); return arr; }
  },

  methods: {
    initOfficeHours(){
      this.dialogConfig.addList[2].list = [
        { id: 1, value: '周一' }, 
        { id: 2, value: '周二' }, 
        { id: 3, value: '周三' },
        { id: 4, value: '周四' },
        { id: 5, value: '周五' },
        { id: 6, value: '周六' },
        { id: 7, value: '周日' },
      ];
    },
    getKeyword(v){
      this.param.search = v;
      // this.getList();
    },
    initForm(item){
      let o = {},
          addList = this.dialogConfig.addList;

      // FIXME: Service
      let service = [
        { service_id: 10, service_name: 'ssdfksjfojfoadakf开始大批饭卡手动阀噶色哦高房价恐怕是的顾客豆腐干1' },
        { service_id: 11, service_name: 'sssdfksjfojfoadakf开始大批饭卡手动阀噶色哦高房价恐怕是的顾客豆腐干12' },
        { service_id: 12, service_name: 'sssdfksjfojfoadakf开始大批饭卡手动阀噶色哦高房价恐怕是的顾客豆腐干13' },
        { service_id: 13, service_name: 's4' },
      ];

      addList[addList.length - 1].list = service;

      if(item){
        this.detailList = item.detailList;
        item.detailList = item.detailList.map(v => v.service_id);
        return this.formData = item;
      }

      this.detailList = [];
      addList.forEach(v => o[v.value] = v.isImg || v.isMultiTime ? [] : '');
      this.formData = o;
    },
    
    addDetail(arr){
      // if(true){

      // }
      let serviceList = this.dialogConfig.addList[this.dialogConfig.addList.length - 1].list,
          detailList = this.detailList,
          new_arr;

      detailList = detailList.filter(v => arr.indexOf(v.service_id) !== -1 );

      new_arr = arr.filter(id => !detailList.some(v => v.service_id === id));

      this.detailList = detailList.concat(new_arr.map(v => { 
        let service_name;

        serviceList.forEach(service => { if(service.service_id === v) service_name = service.service_name });
        return { service_id: v, service_name, price: null }; 
      }));
    },
    // deleteDetail(i){
    // },
    // changeServiceType(item, id){
    //   this.serviceList.forEach(v => { 
    //     if(item.service_id === v.service_id) v.isChecked = false;
    //     if(v.service_id === id) v.isChecked = true;
    //   });

    //   item.service_id = id;
    //   // console.error(JSON.stringify(item), this.serviceList)
    // },
    async submit(imgs){
      // Validate DetailList
      let o = this.formData,
          arr = this.$refs.detail || [],
          error = null;

      for(let i = 0, len = arr.length; i < len; i++){
        let res = await arr[i].validate();
        if(!res) return ;
      }

      error = this.detailList.some(v => v.price <= 0 ? true : false);
      if(error) return this.$message.error('价格必须大于零');

      let param = {
            admin_name: o.stylist_name,
            work_time: o.stylist_time,
            appoinment_time: o.appoinment_time,
            detailList: this.detailList,
          };

      console.error(imgs, this.formData, 'user param : ', param);
      this.saveUser(param);
    },

    updateForm(item){
      if(this.dialogConfig.isCustom){
        delete this.dialogConfig.isCustom;
        this.dialogConfig.isDisabled = false;
      } 

      this.showForm(item);
    },
    commend(item){
      debugger;
      // this.dialogConfig.isCustom = true;
      // this.dialogConfig.isDisabled = true;
      this.showForm();
    },
    judge(item){
      item.isUp = !item.isUp;
    },

    // request
    async getList(){
      this.isLoading = true;
      let res = {data: [{ 
          stylist_name: 'ajksdfjosdjfisdjfl',
          stylist_img: [{url: "http://admin-1256953590.cos.ap-shanghai.myqcloud.com/1547108788492icon_fanhui%402x.png"}],
          stylist_time: [1],
          appoinment_time: ['2018/11/11 12:11:32'],
          detailList: [{ service_id: 10, service_name: 'ssdkflskfjf4', price: 12 },{ service_id: 12, service_name: 'ssdkflskfjf4', price: 12 } ],
          isUp: true }]}; //await api.getUserList(this.param, this);

      if(res && res.data){
        res.data.forEach(v => {
          v.stylist_image = v.stylist_img[0].url;
          // v.admin_limits.forEach(k => v[k] = 1);
        });

        this.list = res.data;
        this.total = res.pagination ? res.pagination.total : 0;
      }
      // console.error('get list res: ', res, this.list);
      this.isLoading = false;
    },

    async saveUser(param){
      let res = this.isAdd ? await api.setUser(param, this) : await api.updateUser(this.formData.admin_id, param, this);

      this.isShowForm = false;
      this.getList();
    },

    async deleteItem(item){
      let res = await api.deleteUser(item.admin_id, null, this);

      this.getList();
    },
  },

  created(){
    this.initOfficeHours();
  }

}
</script>