<style lang="stylus">
  .notice
    .header
      margin-top 20px
</style>

<template>
<div>

<el-container class="notice">

  <el-header class="header">

    <custom-head :config='headConfig' @add='updateForm' @searchByDate='getDate' @searchByStatus='getStatus'></custom-head> 

  </el-header>

  <custom-table :config='tableConfig' 
                :data='list' 
                :classList='classList' 
                :total='total' 
                :isLoading='isLoading' 
                @show='look'
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


  <!-- <custom-dialog :config='dialogConfig_1'
                  :visible='isShowForm_1'
                  @cancel='hideForm_1'>

      <custom-table :config='tableConfig_1' 
                    :data='list_1' 
                    :classList='classList_1' 
                    :total='total_1' 
                    :isLoading='isLoading_1' 
                    @delete='deleteItem_1'
                    @change='change_1'></custom-table>

  </custom-dialog> -->

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
      headConfig: {},
      test: '',
      dialogConfig: {
        width: '80%',    
        canSubmit: true,
        classList: [],
        addList: [
          { key: '头像', value: 'member_avatar', isImg: true },
          { key: '昵称', value: 'member_truename', isText: true },
          { key: '星级', value: 'score', isRate: true },
          { key: '门店', value: 'store_id', isSelect: true, id: 'store_id', name: 'store_name', list: [] },
          { key: '服务', value: 'storegc_id', isSelect: true, id: 'storegc_id', name: 'storegc_name', list: [] },
          // { key: '价格(¥)', value: 'price', isNumber: true },
          { key: '评论时间', value: 'add_time', dateType: 'datetime' },
          { key: '评论内容', value: 'content', isTexts: true, },
        ],
        rules: {
          'member_truename': [ 
            { required: true, message: '请输入昵称!', trigger: 'blur' },
            // { message: '评论名称必须是6~15位!', min: 6, max: 15 } 
          ],
          'score': [ { required: true, message: '请!', trigger: 'change' }, ],
          'store_id': [ { required: true, message: '请选择门店!', trigger: 'change' }, ],
          'storegc_id': [ { required: true, message: '请选择服务!', trigger: 'change' }, ],
          'add_time': [ { required: true, message: '请设置评论时间!', trigger: 'change' }, ],
          'content': [ { required: true, message: '评论内容不能为空!', trigger: 'blur' }, ],
        }
      },
      formData: {},
      isAdd: true,
      tableConfig: {
        showOperate: true,
        showDetail: true,
        showDelete: true,
      },
      classList: [
        { key: '头像', value: 'comment_img', isImg: true },
        { key: '昵称', value: 'geval_frommembername' },
        { key: '星级', value: 'geval_scores' },
        { key: '服务', value: 'comment_service' },
        // { key: '价格(¥)', value: 'price' },
        // { key: '购买时间', value: 'payment_time' },
        { key: '评论时间', value: 'comment_time' },
        // { key: '类型', value: '' },
      ],
      serviceList: [],
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
    async initForm(item){
      let o = {};

      let store_res = await api.getStoreList(null, this);
      let service_res = await api.getServiceList(null, this);

      this.dialogConfig.classList[3].list = store_res;
      this.dialogConfig.classList[4].list = service_res;

      if(item){
        console.error(item);
        return this.formData = item;
      }

      this.dialogConfig.addList.forEach(v => o[v.value] = v.isImg ? [] : v.isRate ? 0 : '');
      this.formData = o;
    },
    submit(imgs){
      let o = this.formData,
          param;

      if(o.score < 1 || o.score > 5){ return this.$message.error('请设置评分'); }
          
      param = {
        member_truename: o.member_truename,
        member_avatar: JSON.stringify(imgs),
        store_id: o.store_id,
        store_name: this.getStoreName(o.store_id),
        storegc_id: o.storegc_id,
        score: o.score,
        add_time: o.add_time,
        content: o.content,
      };

      console.error(imgs, this.formData, 'user param : ', param);
      this.save(param);
    },
    updateForm(item){
      this.dialogConfig.isDisabled = false;
      this.showForm(item);
    },
    look(item){
      this.dialogConfig.isDisabled = true;
      this.showForm(item);
    },

    // util
    getStoreName(id){
      let arr = this.dialogConfig.classList[3].list;
      return arr.filter(v => v.store_id === id)[0].store_name;
    },

    format(v){
      let t = new Date(v.geval_addtime * 1000);

      try{
        v.member_avatar = JSON.parse(v.geval_frommemberavatar); 
        v.comment_img = v.member_avatar[0] && v.member_avatar[0].url;
      }catch(e){
        v.member_avatar = [];
      }

      // nick name
      v.member_truename = v.geval_frommembername;

      // score
      v.score = v.geval_scores;

      // store
      v.store_id = v.geval_storename;

      // service
      v.storegc_id = v.comment_service = this.serviceList.filter(o => o.storegc_id == v.geval_goodsspec)[0].storegc_name;

      // comment Time
      v.add_time = t;
      v.comment_time = `${t.toLocaleString()}`;

      v.content = v.geval_content;
    },

    // request
    async getList(){
      this.isLoading = true;

      this.param.isanonymous = 1;
      let res = await api.getCommentList(this.param, this);

      if(res && res.data){
        await this.getServiceList();

        res.data.forEach(this.format);

        this.list = res.data;
        this.total = res.pagination ? res.pagination.total : 0;
      }
      // console.error('get list res: ', res, this.list);
      this.isLoading = false;
    },

    async save(param){
      let res = this.isAdd ? await api.setComment(param, this) : await api.updateComment(this.formData.admin_id, param, this);

      this.isShowForm = false;
      this.getList();
    },

    async deleteItem(item){
      let res = await api.deleteComment(item.geval_id, null, this);

      this.getList();
    },

    async getServiceList(){
      let res = await api.getServiceList(null, this);

      if(res){
        this.serviceList = res;
      }
    }
  },

  mounted(){
    this.headConfig = {
        showAdd: true,
        title: '添加评论',
        // dateWidth: '400px',
        // selectLabel: '评价类型',
        // categories: [
        //   { id: 0, title: '全部' },
        //   { id: 1, title: '真实' },
        //   { id: 2, title: '虚拟' },
        // ]  
    };
    this.test = '135';
  },

  created(){
    this.getServiceList();
  }

}
</script>