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
        placeHolder: '订单号搜索',
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
          { key: '门店账号', value: 'store_nick', isText: true, },
          { key: '门店密码', value: 'store_password', isText: true, },
          { key: '门店图片', value: 'store_img', limit: 5, isImg: true, },
          { key: '营业时间', value: 'store_time', isText: true }, // , isMultiSelect: true, id: 'id', name: 'value', list: []
          { key: '门店地址', value: 'store_address', isText: true, },
          { key: '门店描述', value: 'store_detail', isText: true, },
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
        { key: '营业时间', value: 'store_time' },
        { key: '门店地址', value: 'store_address' },
      ],
    }
  },

  methods: {
    // initOfficeHours(){
    //   this.dialogConfig.addList[2].list = [
    //     { id: 1, value: '周一' }, 
    //     { id: 2, value: '周二' }, 
    //     { id: 3, value: '周三' },
    //     { id: 4, value: '周四' },
    //     { id: 5, value: '周五' },
    //     { id: 6, value: '周六' },
    //     { id: 7, value: '周日' },
    //   ];
    // },
    getKeyword(v, type){
      type === 'date' ? this.param.search = v : this.param.search = v;
      // this.getList();
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
    validate(item, state){
      debugger;
      this.getList();
    },

    // request
    async getList(){
      this.isLoading = true;
      let res = await api.getValidateList(this.param, this);
      // {data: [{ 
      //     store_name: 'ajksdfjosdjfisdjfl',
      //     store_nick: 'ajksdfjosdjfisdjfl',
      //     store_password: 'ajksdfjosdjfisdjfl',
      //     store_img: [{url: "http://admin-1256953590.cos.ap-shanghai.myqcloud.com/1547108788492icon_fanhui%402x.png"}],
      //     store_time: '2018/11/11 12:11:23', 
      //     store_address: 'aksfdj兄弟fog v东莞看到佛佛佛佛佛佛佛佛佛佛发',
      //     store_status: 'aaa',
      //     isUp: true }]}; 

      if(res && res.data){
        res.data.forEach(v => {
          // v.store_image = v.store_img[0].url;
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
    // this.initOfficeHours();
  }

}
</script>