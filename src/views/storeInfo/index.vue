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

  <custom-form class='form' :config='formConfig' :detail='formData' @getLocation='getLocation' @submit='submit'></custom-form>

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
          // { key: '门店账号', value: 'store_member_name', isText: true, },
          // { key: '门店密码', value: 'store_password', isText: true, },
          { key: '门店图片', value: 'store_images', limit: 5, isImg: true, },
          { key: '营业时间', value: 'store_day', isMultiSelect: true, id: 'id', name: 'value', list: [] },
          { key: '营业时间点', value: 'store_time', timeType: 'timerange'  },
          { key: '门店地址', value: 'store_address', isAddress: true, },
          { key: '门店描述', value: 'store_description', isTexts: true, },
        ],
        rules: {
          'store_name': [ 
            { required: true, message: '请输入门店名称!', trigger: 'blur' },
            { message: '门店名称必须是1~15位!', min: 1, max: 15 } 
          ],
          'store_day': [ 
            { required: true, message: '请选择营业时间!', trigger: 'change' },
          ],
        }
      },
      formData: {},
      isAdd: true,
      dateList: [],
      location: {},
    }
  },

  methods: {
    
    initOfficeHours(){
      this.dateList = this.formConfig.classList[2].list = [
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
    getLocation(v){ this.location = v; },

    submit(img){
      let o = this.formData,
          param = {
            store_name: o.store_name,
            store_images: img,
            store_workingtime: `${o.store_day.join(',')}|${o.store_time}`,
            store_address: o.store_address,
            store_longitude: this.location.lng,
            store_latitude: this.location.lat,
            store_description: o.store_description,
            store_member_name: o.seller_name,
            seller_name: o.seller_name,
          };

      // return console.error(img, this.location, this.formData, 'user param : ', param);
      this.save(param);
    },
    // getAuthList(obj){
    //   let arr = [];

    //   for(let key in obj){ if(!/admin/.test(key) && obj[key] === 1) arr.push(key); }

    //   return arr;
    // },
    // util
    format(v){
      let time = v.store_workingtime.split('|');

      v.worktime = time[0].split(',').map(v => this.dateList.filter(date => date.id == v)[0].value );
      v.store_day = time[0].split(',').map(v => parseInt(v));
      v.store_time = time[1] ? time[1].split(',').map(v => new Date(v)) : '';

      v.store_member_name = v.member_name;

      // store state / 上下架状态(store_state 1上架状态 2下架状态)
      // v.isup = v.store_state == 1 ? true : false;

      // imgs
      v.store_images = v.store_images.map(v => { return { url: v } });

      return v;
    },

    // request
    async getStoreInfo(){
      let res = await api.getStoreInfo(null, this);

      if(res){
        // res.data.forEach(v => {});

        // this.list = res.data;
        // this.total = res.pagination ? res.pagination.total : 0;
        this.formData = this.format(res);
      }
      // console.error('get list res: ', res, this.list);
    },

    // async getList(){
    //   this.isLoading = true;
    //   let res = await api.getUserList(this.param, this);

    //   if(res){
    //     // res.data.forEach(v => {});

    //     // this.list = res.data;
    //     // this.total = res.pagination ? res.pagination.total : 0;
    //   }
    //   // console.error('get list res: ', res, this.list);
    //   this.isLoading = false;
    // },


    async save(param){
      let res = this.isAdd ? await api.setStoreInfo(param, this) : await api.updateUser(this.formData.admin_id, param, this);

      this.isShowForm = false;
      this.getStoreInfo();
    },

    // async deleteUser(item){
    //   let res = await api.deleteUser(item.admin_id, null, this);

    //   this.getList();
    // },

  },

  created(){
    this.initOfficeHours();
    this.getStoreInfo();
  },

}
</script>