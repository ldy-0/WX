<style lang="stylus">
  .notice
    .header
      margin-top 20px

  .form
    margin: 100px 0 0;
</style>

<template>
<div>

<el-container class="notice">

  <!-- <el-header class="header">

    <custom-head :config='headConfig' @add='showForm'></custom-head> 

  </el-header> -->

  <!-- <custom-table :config='tableConfig' 
                :data='list' 
                :classList='classList' 
                :total='total' 
                :isLoading='isLoading' 
                @custom='showForm'
                @delete='deleteUser'
                @change='change'></custom-table> -->

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
          { key: '新用户抵扣券折扣金额', value: 'newDiscount', isNumber: true, },
          { key: '普通抵扣券折扣金额', value: 'discount', isNumber: true, },
        ],
        rules: {
          // 'admin_name': [ 
          //   { required: true, message: '请输入姓名!', trigger: 'blur' },
          //   { message: '姓名必须是6~15位!', min: 6, max: 15 } 
          // ],
        }
      },
      formData: {},
      isAdd: true,
      disCoupon: null,
      newCoupon: null,
    };
  },

  methods: {
    // initForm(item){
    //   let o = {};

    //   if(item){
    //     item.admin_pwd = '';
    //     return this.formData = item;
    //   }

    //   this.dialogConfig.addList.forEach(v => o[v.value] = v.isRadio ? 0 : '');
    //   this.formData = o;
    // },
    submit(){
      let o = this.formData,
          newCoupon = this.newCoupon,
          disCoupon = this.disCoupon,
          param;

      param = {
        coupon: { [disCoupon.vouchertemplate_id]: Number(o.discount), [newCoupon.vouchertemplate_id]: Number(o.newDiscount) },
      };

      // return console.error(this.formData, 'user param : ', param);
      this.save(param);
    },

    // util
    format(v){
    },

    // request
    async getList(){
      this.isLoading = true;
      let res = await api.getCouponList(this.param, this); // { newDiscount: 2, discount: 1, }; 

      if(res && res.data){
        let arr = res.data;

        arr.forEach(this.format);

        // this.list = res.data;
        // this.total = res.pagination ? res.pagination.total : 0;
        this.disCoupon = arr[0];
        this.newCoupon = arr[1];
        this.formData = {
          discount: arr[0].vouchertemplate_price, // this.disCoupon.vouchertemplate_amount,
          newDiscount: arr[1].vouchertemplate_price,
        };
      return console.error('get list res: ', arr[0].vouchertemplate_amount, this.formData);
      }
      this.isLoading = false;
    },

    async save(param){
      let res = this.isAdd ? await api.setCoupon(param, this) : await api.updateCoupon(this.formData.admin_id, param, this);

      this.isShowForm = false;
      this.getList();
    },

    // async deleteUser(item){
    //   let res = await api.deleteUser(item.admin_id, null, this);

    //   this.getList();
    // },
  },


}
</script>