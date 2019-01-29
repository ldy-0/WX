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
                @recommend='recommend'
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

            <el-form-item class='detail_item' label-width='100px' label='服务类型' prop='storegc_id'>
              <div v-text='item.storegc_name'></div>
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
          { key: '设计师名字', value: 'goods_name', isText: true, },
          { key: '图片', value: 'goods_image', limit: 1, isImg: true, },
          { key: '工作时间', value: 'appoinment_day', isMultiSelect: true, id: 'id', name: 'value', list: [] },
          { key: '可预约时间', value: 'appoinment_time', text: '添加时间', isMultiTime: true },
          { key: '签名', value: 'goods_advword', isText: true, },
          { key: '价格', value: 'detailList', placeholder: '添加服务', isDetail: true, id: 'storegc_id', name: 'storegc_name', list: [] },
        ],
        rules: {
          'goods_name': [ 
            { required: true, message: '请输入设计师名字!', trigger: 'blur' },
            { message: '设计师名字必须是1~15位!', min: 1, max: 15 } 
          ],
          'appoinment_day': [ { required: true, message: '请选择营业时间!', trigger: 'change' }, ],
        }
      },
      formData: {},
      isAdd: true,
      tableConfig: {
        showOperate: true,
        updateTitle: '编辑',
        // custom: '大屏推荐',
        showRecommend: true,
        judge: ['goods_state', '下架', '上架'],
        showDelete: true,
      },
      classList: [
        { key: '图片', value: 'stylist_img', isImg: true },
        { key: '名字', value: 'goods_name' },
        // { key: '价格(¥)', value: 'stylist_price' },
        // { key: '价格(¥)', value: 'stylist_price' },
        { key: '签名', value: 'goods_advword' },
        // { key: '账号', value: 'service_type' },
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
        { id: 0, value: '周日' },
      ];
    },
    getKeyword(v){
      if(v) this.param.search = v;
      this.getList();
    },
    async initForm(item){
      let o = {},
          addList = this.dialogConfig.addList;

      this.dialogConfig.canSubmit = true;
      // service
      let service = await api.getServiceList(null, this);

      addList[addList.length - 1].list = service;

      if(item){
        let serviceList = this.dialogConfig.addList[this.dialogConfig.addList.length - 1].list,
            goods = await api.getStylist(item.goods_commonid, { goodscommonId: item.goods_commonid}, this);

        this.detailList = goods.SKUList.map(v => { 
          let id, name;

          // serviceList.forEach(service => { if(service.storegc_name === v.goods_spec) id = service.storegc_id });
          serviceList.forEach(service => { if(service.storegc_id == v.goods_spec) name = service.storegc_name });

          return { storegc_id: parseInt(v.goods_spec), storegc_name: name, price: v.goods_price, }; 
        });

        goods.detailList = this.detailList.map(v => v.storegc_id);

        return this.formData = this.format(goods);
      }

      this.detailList = [];
      addList.forEach(v => o[v.value] = v.isImg || v.isMultiSelect || v.isMultiTime || v.isDetail ? [] : '');
      this.formData = o;
      console.error(o);
    },
    
    addDetail(arr){
      let serviceList = this.dialogConfig.addList[this.dialogConfig.addList.length - 1].list,
          detailList = this.detailList,
          new_arr;

      detailList = detailList.filter(v => arr.indexOf(v.storegc_id) !== -1 );

      new_arr = arr.filter(id => !detailList.some(v => v.storegc_id === id));

      this.detailList = detailList.concat(new_arr.map(v => { 
        let storegc_name;

        serviceList.forEach(service => { if(service.storegc_id === v) storegc_name = service.storegc_name });
        return { storegc_id: v, storegc_name, price: null }; 
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
      this.dialogConfig.canSubmit = false;

      if(!imgs.length) return this.showError('请选择图片');
      // Validate DetailList
      let o = this.formData,
          arr = this.$refs.detail || [],
          error = null;

      for(let i = 0, len = arr.length; i < len; i++){
        let res = await arr[i].validate();
        if(!res) return ;
      }

      error = this.detailList.some(v => v.price <= 0 ? true : false);
      if(error) return this.showError('价格必须大于零');

      if(!o.appoinment_time.length) return this.showError('请添加预约时间点');

      if(!this.detailList.length) return this.showError('请添加服务');

      let param = {
            goods_name: o.goods_name,
            goods_image: imgs.map(v => JSON.stringify(v)),
            goods_advword: o.goods_advword,
            goods_body: o.goods_advword,
            appointment_date: o.appoinment_day,
            // appointment_frame: o.appoinment_time.map(v => v.toString()),
            appointment_frame: o.appoinment_time.map(v => `${(v.getHours() < 10 ? '0' : '') + v.getHours()}:${(v.getMinutes() < 10 ? '0' : '') + v.getMinutes()}`),
            spec: this.detailList.map(v => { return { price: v.price, marketprice: v.price, sp_value: v.storegc_id, stock: 9e8 }; }),
            spec_value: this.detailList.map(v => v.storegc_name),
            goods_price: 0,
            marketprice: 0,
            goods_freight: 0,
          };

      console.error(imgs, this.formData, 'user param : ', param);
      this.save(param);
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
    async recommend(item){
      let param = { 
        goods_commonid: [ item.goods_commonid ],
        type: item.goods_commend == 1 ? 'notrecommend' : 'recommend'
      };

      let res = await api.updateStylistState(item.goods_commonid, param, this);

      this.getList();
    },
    async judge(item){
      let param = { 
        goods_commonid: [ item.goods_commonid ],
        type: item.goods_state == 1 ? 'offline' : 'online'
      };

      let res = await api.updateStylistState(item.goods_commonid, param, this);

      this.getList();
    },

    // util
    format(v){
      let img = JSON.parse(v.goods_image),
          o = v.SKUList ? v.SKUList[0] : null;

      v.goods_image = [img];
      v.stylist_img = img.url;

      if(o){
        v.appoinment_day = o.appointment_date; 
        // v.appoinment_time = o.appointment_frame;
        v.appoinment_time = o.appointment_frame.map(v => { let arr = v.split(':'); return new Date(new Date().setHours(arr[0], arr[1])); });
      }
      
      return v;      
    },
    showError(str){
      this.dialogConfig.canSubmit = true;
      this.$message.error(str);
    },

    // request
    async getList(){
      this.isLoading = true;
      let res = await api.getStylistList(this.param, this);

      if(res && res.data){
        res.data.forEach(this.format);

        this.list = res.data;
        this.total = res.pagination ? res.pagination.total : 0;
      }
      // console.error('get list res: ', res, this.list);
      this.isLoading = false;
      delete this.param.search;
    },

    async save(param){
      let res = this.isAdd ? await api.setStylist(param, this) : await api.updateStylist(this.formData.goods_commonid, param, this);

      this.isShowForm = false;
      this.dialogConfig.canSubmit = true;
      this.getList();
    },

    async deleteItem(item){
      let res = await api.deleteStylist(item.goods_commonid, null, this);

      this.getList();
    },
  },

  created(){
    this.initOfficeHours();
  }

}
</script>