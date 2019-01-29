<style lang="stylus">
  .notice
    .header
      margin-top 20px

  .form
    width: 80%;
    margin: 100px 0 0;
</style>

<template>
<div>

<el-container class="notice">

  <!-- <el-header class="header">

    <custom-head :config='headConfig' @add='showForm'></custom-head> 

  </el-header> -->

  <custom-form class='form' :config='formConfig' :detail='formData' @submit='submit'></custom-form>

</el-container>
</div>
</template>
<script>

import api from './api.js'
import base from './base.js'

export default {
  mixins: [base],

  data() {
    return {
      formConfig: {
        width: '80%',    
        labelWidth: '200px',
        canSubmit: true,
        showCancel: true,
        isCenter: true,
        classList: [
          { key: '门店名字', value: 'store_name', isText: true, },
          { key: '门店账号', value: 'store_nick', isText: true, },
          { key: '门店图片', value: 'store_img', limit: 5, isImg: true, },
          { key: '营业时间', value: 'store_time', isMultiSelect: true, id: 'id', name: 'value', list: [] },
          { key: '门店地址', value: 'store_address', isAddress: true, },
          { key: '门店描述', value: 'store_detail', isTexts: true, },
        ],
        rules: {
          'store_name': [ 
            { required: true, message: '请输入门店名称!', trigger: 'blur' },
            { message: '门店名称必须是1~15位!', min: 1, max: 15 } 
          ],
          'store_time': [ 
            { required: true, message: '请选择营业时间!', trigger: 'change' },
          ],
        }
      },
      formData: {},
      isAdd: true,
    }
  },

  methods: {
    initOfficeHours(){
      this.formConfig.classList[3].list = [
        { id: 1, value: '周一' }, 
        { id: 2, value: '周二' }, 
        { id: 3, value: '周三' },
        { id: 4, value: '周四' },
        { id: 5, value: '周五' },
        { id: 6, value: '周六' },
        { id: 7, value: '周日' },
      ];
    },
    // initForm(item){
    //   let o = {};

    //   if(item){
    //     item.admin_pwd = '';
    //     return this.formData = item;
    //   }

    //   this.dialogConfig.addList.forEach(v => o[v.value] = v.isRadio ? 0 : '');
    //   this.formData = o;
    // },
    submit(img){
      let o = this.formData,
          param = {
            admin_name: o.img,
            admin_nick: o.detail,
          };

      console.error(img, this.formData, 'user param : ', param);
      return ;
      this.saveUser(param);
    },
    // getAuthList(obj){
    //   let arr = [];

    //   for(let key in obj){ if(!/admin/.test(key) && obj[key] === 1) arr.push(key); }

    //   return arr;
    // },

    // request
    async getList(){
      this.isLoading = true;
      let res = { 
          store_name: 'ajksdfjosdjfisdjfl',
          store_nick: 'ajksdfjosdjfisdjfl',
          store_img: [{url: "http://admin-1256953590.cos.ap-shanghai.myqcloud.com/1547108788492icon_fanhui%402x.png"}],
          store_time: [2, 5], 
          store_address: '武汉', 
          isUp: true }; //await api.getUserList(this.param, this);

        this.formData = res;
      if(res && res.data){
        res.data.forEach(v => {
          // v.admin_limits.forEach(k => v[k] = 1);
        });

        // this.list = res.data;
        // this.total = res.pagination ? res.pagination.total : 0;
      }
      // console.error('get list res: ', res, this.list);
      this.isLoading = false;
    },


    // async saveUser(param){
    //   let res = this.isAdd ? await api.setUser(param, this) : await api.updateUser(this.formData.admin_id, param, this);

    //   this.isShowForm = false;
    //   this.getList();
    // },

    // async deleteUser(item){
    //   let res = await api.deleteUser(item.admin_id, null, this);

    //   this.getList();
    // },
  },

  created(){
    this.initOfficeHours();
  }

}
</script>