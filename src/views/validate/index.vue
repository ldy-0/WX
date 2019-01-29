<style lang="stylus">
  .notice
    .header
      margin-top 20px
  
</style>

<template>
<div>

<el-container class="notice">

  <el-header class="header">

    <custom-head :config='headConfig' @search='getKeyword' @searchByDate='getKeyword' @searchByStatus='getStatus'></custom-head> 

  </el-header>

  <custom-table :config='tableConfig' 
                :data='list' 
                :classList='classList' 
                :total='total' 
                :isLoading='isLoading' 
                @show='showDetail'
                @auth='validate'
                @delete='deleteItem'
                @change='change'></custom-table>

  <div v-if='isShowForm'>
    <custom-dialog :config='dialogConfig'
                  :visible='isShowForm'
                  :detail='formData'
                  @auth='validate'
                  @submit='submit'
                  @cancel='cancel'>
                  
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
        // title: '添加门店',
        placeHolder: '门店名搜索',
        // selectList: [],
        // dateWidth: '400px',
        // selectLabelList: [ '订单状态', '门店' ],
        // selectList: [ 
        //   [  
        //     { id: 0, name: '全部' },
        //     { id: 1, name: '待退款' },
        //     { id: 2, name: '已退款' },
        //   ], 
        //   []
        // ]
      },
      dialogConfig: {
        width: '80%',    
        canSubmit: true,
        showAuth: true,
        classList: [],
        addList: [
          { key: '门店名字', value: 'store_name', isText: true, },
          { key: '门店账号', value: 'store_member_name', isText: true, },
          // { key: '门店密码', value: 'store_password', isText: true, },
          { key: '门店图片', value: 'store_images', limit: 5, isImg: true, },
          { key: '营业时间', value: 'store_day', isMultiSelect: true, id: 'id', name: 'value', list: [] },
          { key: '营业时间点', value: 'store_time', timeType: 'timerange'  },
          { key: '门店地址', value: 'store_address', isAddress: true, },
          { key: '门店描述', value: 'store_description', isTexts: true, },
        ],
        // rules: {
        //   'store_name': [ 
        //     { required: true, message: '请输入门店名称!', trigger: 'blur' },
        //     // { message: '门店名称必须是6~15位!', min: 6, max: 15 } 
        //   ],
        //   'store_time': [ 
        //     { required: true, message: '请选择营业时间!', trigger: 'change' },
        //   ],
        // }
      },
      formData: {},
      isAdd: true,
      tableConfig: {
        showOperate: true,
        showDetail: true,
        showAuth: true,
        // judge: ['order_status', '同意', ''],
      },
      classList: [
        // { key: '商品图片', value: 'store_image', isImg: true },
        { key: '门店名字', value: 'store_name', },
        { key: '营业时间', value: 'worktime', isMulti: true },
        { key: '门店地址', value: 'store_address' },
      ],
      dateList: [],
    }
  },

  methods: {
    initOfficeHours(){
      this.dateList = this.dialogConfig.addList[3].list = [
        { id: 1, value: '周一' }, 
        { id: 2, value: '周二' }, 
        { id: 3, value: '周三' },
        { id: 4, value: '周四' },
        { id: 5, value: '周五' },
        { id: 6, value: '周六' },
        { id: 7, value: '周日' },
      ];
    },
    getKeyword(v, type){
      if(v) this.param.search = v;
      this.getList();
    },
    getStatus(v, i){
      this.param.search = v;
      // this.getList();
    },
    initForm(item){
      let o = {};

      if(item){
        return this.formData = item;
      }

      this.dialogConfig.addList.forEach(v => o[v.value] = v.isImg ? [] : '');
      this.formData = o;
    },
    submit(imgs){
      let o = this.formData,
          param = {
            admin_name: o.admin_name,
            admin_nick: o.admin_nick,
            admin_password: o.admin_pwd,
          };

      console.error(imgs, this.formData, 'user param : ', param);
      this.saveUser(param);
    },

    showDetail(item){
      this.dialogConfig.isDisabled = true;
      this.showForm(item);
    },
    async validate(item, state){
      let res = await api.updateValidate(item.storeinfo_id, { state: state === 1 ? 1 : 2 }, this);

      this.getList();
    },

    // util
    format(v){
      let time = v.store_workingtime.split('|');

      // time
      v.worktime = time[0].split(',').map(v => {
        let date = this.dateList.filter(date => date.id == v);
        return date[0] ? date[0].value : '';
      });
      v.store_day = time[0].split(',').map(v => parseInt(v));
      v.store_time = time[1] ? time[1].split(',').map(v => new Date(v)) : '';

      return v;
    },

    // request
    async getList(){
      this.isLoading = true;
      let res = await api.getValidateList(this.param, this);

      if(res && res.data){
        res.data.forEach(this.format);

        this.list = res.data.filter(v => [1, 2].indexOf(v.state) === -1);
        this.total = res.pagination ? res.pagination.total : 0;
      }
      // console.error('get list res: ', res, this.list);
      this.isLoading = false;
      delete this.param.search;
    },

    async saveUser(param){
      let res = this.isAdd ? await api.setUser(param, this) : await api.updateUser(this.formData.admin_id, param, this);

      this.isShowForm = false;
      this.getList();
    },

    async deleteItem(item){
      let res = await api.deleteValidate(item.storeinfo_id, null, this);

      this.getList();
    },

    // async getStoreList(){
    //   let res = {data: [{ 
    //       store_id: 0,
    //       store_name: 'ajksdfjosdjfisdjfl',
    //       }, { 
    //       store_id: 1,
    //       store_name: 'abbbbbbbbbbbbbbb',
    //       }]}; //await api.getUserList(this.param, this);

    //   if(res && res.data){
    //     // this.headConfig.selectList[1] = res.data.map(v => { return { id: v.store_id, name: v.store_name } });
    //   }
    // },
  },

  created(){
    // this.getStoreList();
    this.initOfficeHours();
  }

}
</script>