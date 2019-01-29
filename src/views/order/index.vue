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
                @judge='done'
                @look='look'
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
import dialog_2 from './dialog_2.js'

export default {
  mixins: [base, dialog_1, dialog_2],

  data() {
    return {
      headConfig: {
        showAdd: true,
        // title: '添加门店',
        placeHolder: '订单号搜索',
        dateWidth: '400px',
        selectLabelList: [ '订单状态', ],
        // categories: [
        selectList: [ 
          [  
            { id: 0, name: '全部' },
            { id: 10, name: '待付款' },
            { id: 20, name: '待使用' },
            { id: 40, name: '已完成' },
          ], 
        ]
      },
      dialogConfig: {
        width: '80%',    
        canSubmit: true,
        classList: [],
        addList: [
          { key: '头像', value: 'comment_img', isImg: true },
          { key: '昵称', value: 'geval_frommembername', isText: true },
          { key: '星级', value: 'geval_scores', isRate: true },
          { key: '门店', value: 'geval_storename', isText: true  }, //isSelect: true, id: 'id', name: 'store_name', list: []
          { key: '服务', value: '', isSelect: true, id: 'id', name: 'service_name', list: [] },
          { key: '价格(¥)', value: 'geval_goodsprice', isNumber: true },
          { key: '评论时间', value: 'comment_time', isText: true },
          { key: '评论内容', value: 'comment_content', isTexts: true, },
        ],
        rules: {
          'store_name': [ 
            { required: true, message: '请输入门店名称!', trigger: 'blur' },
            // { message: '门店名称必须是6~15位!', min: 6, max: 15 } 
          ],
          'store_time': [ 
            { required: true, message: '请选择营业时间!', trigger: 'change' },
          ],
        }
      },
      formData: {},
      isAdd: true,
      tableConfig: {
        showOperate: true,
        judge: ['canChange', '完成', ''],
        lookTitle: '查看评论',
        showDelete: true,
      },
      classList: [
        { key: '商品图片', value: 'goods_img', isImg: true },
        { key: '商品名字', value: 'goods_name', },
        { key: '订单号', value: 'order_sn' },
        { key: '买家', value: 'buyer_name' },
        { key: '订单状态', value: 'order_state' },
        { key: '金额(¥)', value: 'order_amount' },
        { key: '下单时间', value: 'add_time' },
        { key: '门店', value: 'store_name' },
        { key: '发型师', value: 'stylist' },
        { key: '预约时间', value: 'time' },
      ],
      serviceList: [],
    }
  },

  methods: {
    getKeyword(v, type){
      if(type === 'date' && v){
        this.param.starttime = v.startDate.replace(/\//g, '-');
        this.param.endtime = v.endDate.replace(/\//g, '-');
      }else{
        this.param.search = v;
      }
      this.getList();
    },
    getStatus(v, i){

      if(i === 1){
        this.param.store_id = v[i];
      }else{
        if(v[0]) this.param.order_state = v[0];
      }
    
      // console.error(v, i, this.param);
      this.getList();
    },
    initForm(item){
      let o = {};

      if(item){
        return this.formData = this.format_(item);
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

    format_(v){
      let t = new Date(v.geval_addtime * 1000);

      // try{
        v.comment_img = [ {url: v.geval_frommemberavatar} ]; 
        // v.comment_img = v.member_avatar[0] && v.member_avatar[0].url;
      // }catch(e){
      //   v.member_avatar = [];
      // }
      // console.error(v.member_avatar);

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

      return v;
    },


    async done(item){
      let param = {
        state_type: 'order_receive',
      };
      // return console.error(param);
      let res = await api.updateOrder(item.order_id, param, this);
      this.getList();
    },
    async look(item){
      
      let res = await api.getCommentList(item.order_id, null, this);
      // console.error(res);

      this.dialogConfig.isDisabled = true;
      this.showForm(res.data);
    },

    // utils
    format(v){
      let goods = v.order_goods[0];

      v.time = `${v.appointment_date} ${v.appointment_frame}`

      // goods img
      try{
        v.goods_img = (JSON.parse(goods.goods_image)).url;
      }catch(e){
        v.goods_img = v.goods_image;
      }

      // goods name
      let s = this.serviceList.filter(service => service.storegc_id == goods.goods_spec)[0];
      v.goods_name = s ? s.storegc_name : '';

      v.stylist = goods.goods_name;

      // change order status
      v.canChange = v.order_state_id == 20;
    },

    // request
    async getList(){
      this.isLoading = true;
      let res = await api.getOrderList(this.param, this);

      if(res && res.data){
        res.data.forEach(this.format);

        this.list = res.data;
      }else{
        this.list = [];
      }

      this.total = res.pagination ? res.pagination.total : 0;
      // console.error('get list res: ', res, this.list);
      this.isLoading = false;

      delete this.param.search;
      delete this.param.starttime;
      delete this.param.endtime; 
      delete this.param.order_state; 
      delete this.param.store_id; 
    },

    async saveUser(param){
      let res = this.isAdd ? await api.setUser(param, this) : await api.updateUser(this.formData.admin_id, param, this);

      this.isShowForm = false;
      this.getList();
    },

    async deleteItem(item){
      let res = await api.deleteOrder(item.order_id, null, this);

      this.getList();
    },

    async getServiceList(){
      let res = await api.getServiceList(null, this);

      if(res && res.data){
        this.serviceList = res.data;
      }
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
    //     this.headConfig.selectList[1] = res.data.map(v => { return { id: v.store_id, name: v.store_name } });
    //   }
    // },
  },

  created(){
    // this.initOfficeHours();
    this.getServiceList();
  }

}
</script>