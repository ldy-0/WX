<style lang="stylus">
  .notice
    .header
      margin-top 20px
</style>

<template>
<div>

<el-container class="notice">

  <el-header class="header">

    <custom-head :config='headConfig' @add='showForm'></custom-head> 

  </el-header>

  <custom-table :config='tableConfig' 
                :data='list' 
                :classList='classList' 
                :total='total' 
                :isLoading='isLoading' 
                @custom='showForm'
                @delete='deleteUser'
                @change='change'></custom-table>

  <!-- add user -->
  <div v-if='isShowForm'>
    <custom-dialog :config='dialogConfig'
                  :visible='isShowForm'
                  :detail='formData'
                  @submit='submit'
                  @cancel='cancel'></custom-dialog>
  </div>

</el-container>
</div>
</template>
<script>

import api from './api.js'
import base from './base.js'
import auth from './auth.js'

export default {
  mixins: [base, auth],

  data() {
    return {
      headConfig: {
        showAdd: true,
        title: '添加成员',
      },
      dialogConfig: {
        width: '80%',    
        canSubmit: true,
        classList: [],
        addList: [
          { key: '姓名', value: 'admin_nick', isText: true, },
          { key: '账号', value: 'admin_name', isText: true },
          { key: '密码', value: 'admin_pwd', isText: true },
          { key: '门店列表', value: 'store', isRadio: true, },
          { key: '订单列表', value: 'order', isRadio: true, },
          { key: '首页轮播图', value: 'banner', isRadio: true, },
          { key: '折扣券', value: 'coupon', isRadio: true },
          { key: '权限列表', value: 'auth', isRadio: true, },
        ],
        updateList: [
          { key: '密码', value: 'admin_pwd', isText: true },
        ],
        rules: {
          'admin_nick': [ 
            { required: true, message: '请输入姓名!', trigger: 'blur' },
            { message: '姓名必须是6~15位!', min: 1, max: 15 } 
          ],
          'admin_name': [ 
            { required: true, message: '请输入账号!', trigger: 'blur' },
            { message: '账号名称必须是3~15位!', min: 6, max: 15 } 
          ],
          'admin_pwd': [ 
            { required: true, message: '请输入密码!', trigger: 'blur' },
            { message: '密码不能少于6位!', min: 6 } 
          ],
        }
      },
      formData: {},
      isAdd: true,
      tableConfig: {
        showOperate: true,
        showDelete: true,
        custom: '修改密码'
      },
      classList: [
        { key: '账号', value: 'admin_name', },
        { key: '门店列表', value: 'store', isIcon: true },
        { key: '订单列表', value: 'order', isIcon: true },
        { key: '首页轮播图', value: 'banner', isIcon: true },
        { key: '折扣券', value: 'coupon', isIcon: true },
        { key: '权限', value: 'auth', isIcon: true },
      ],
    }
  },

  methods: {
    initForm(item){
      let o = {};

      if(item){
        item.admin_pwd = '';
        return this.formData = item;
      }

      this.dialogConfig.addList.forEach(v => o[v.value] = v.isRadio ? 0 : '');
      this.formData = o;
    },
    submit(){
      let o = this.formData,
          param = {
            admin_name: o.admin_name,
            admin_nick: o.admin_nick,
            admin_password: o.admin_pwd,
            admin_limits: this.getAuthList(o),
          };

      console.error(this.formData, 'user param : ', param);
      this.saveUser(param);
    },
    getAuthList(obj){
      let arr = [];

      for(let key in obj){ if(!/admin/.test(key) && obj[key] === 1) arr.push(key); }

      return arr;
    },

    // request
    async getList(){
      this.isLoading = true;
      let res = await api.getUserList(this.param, this);

      if(res && res.data){
        res.data.forEach(v => {
          // manager
          if(v.is_admin) this.classList.slice(1).forEach(o => v[o.value] = 1);
          v.admin_limits.forEach(k => v[k] = 1);
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

    async deleteUser(item){
      let res = await api.deleteUser(item.admin_id, null, this);

      this.getList();
    },
  },

  created(){
  }

}
</script>