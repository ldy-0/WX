<style lang="stylus">
  .notice
    .header
      margin-top 20px
</style>

<template>
<div>

<el-container class="notice">

  <el-header class="header">

    <custom-head :config='headConfig' @add='showForm' @searchByDate='getDate' @searchByStatus='getStatus'></custom-head> 

  </el-header>

  <custom-table :config='tableConfig' 
                :data='list' 
                :classList='classList' 
                :total='total' 
                :isLoading='isLoading' 
                @update='showForm'
                @delete='deleteItem'
                @change='change'></custom-table>

  <div v-if='isShowForm'>
    <custom-dialog :config='dialogConfig'
                  :visible='isShowForm'
                  :detail='formData'
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

export default {
  mixins: [base, dialog_1],

  data() {
    return {
      headConfig: {
        showAdd: true,
        title: '新增服务项目',
      },
      dialogConfig: {
        width: '80%',    
        labelWidth: '120px',
        canSubmit: true,
        classList: [],
        addList: [
          { key: '服务项目名称', value: 'storegc_name', isText: true },
          // { key: '价格(¥)', value: 'price', isNumber: true },
        ],
        rules: {
          'storegc_name': [ 
            { required: true, message: '请输入服务项目名称!', trigger: 'blur' },
            { message: '服务项目名称必须是1~15位!', min: 1, max: 15 } 
          ],
          'store_time': [ 
            { required: true, message: '请设置评论时间!', trigger: 'change' },
          ],
        }
      },
      formData: {},
      isAdd: true,
      tableConfig: {
        showOperate: true,
        updateTitle: '编辑',
        showDelete: true,
      },
      classList: [
        { key: '昵称', value: 'storegc_name' },
      ],
    }
  },

  methods: {
    getDate(v){
      this.param.search = v;
      // this.getList();
    },
    getStatus(v){
      this.param.status = v;
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
            storegc_name: o.storegc_name,
            storegc_parent_id: 0,
          };

      console.error(imgs, this.formData, 'submit param : ', param);
      this.save(param);
    },

    // request
    async getList(){
      this.isLoading = true;
      let res = await api.getServiceList(this.param, this);

      if(res && res.data){
        res.data.forEach(v => {
          // v.comment_image = v.comment_img[0].url;
        });

        this.list = res.data;
        this.total = res.pagination ? res.pagination.total : 0;
      }
      // console.error('get list res: ', res, this.list);
      this.isLoading = false;
    },

    async save(param){
      let res = this.isAdd ? await api.setService(param, this) : await api.updateService(this.formData.storegc_id, param, this);

      this.isShowForm = false;
      this.getList();
    },

    async deleteItem(item){
      let res = await api.deleteService(item.storegc_id, null, this);

      this.getList();
    },
  },


}
</script>