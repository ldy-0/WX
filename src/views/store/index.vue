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
                @look='look'
                @judge='judge'
                @delete='deleteItem'
                @change='change'></custom-table>

  <div v-if='isShowForm'>
    <custom-dialog :config='dialogConfig'
                  :visible='isShowForm'
                  :detail='formData'
                  @getLocation='getLocation'
                  @submit='submit'
                  @cancel='cancel'>
                  
      <el-button @click='showStylist'>查看发型师</el-button>
      <!-- <el-button @click='showService'>查看服务</el-button> -->
      <el-button @click='showComment'>查看评论</el-button>

    </custom-dialog>
  </div>


  <!-- 查看发型师/服务/评论 -->
  <custom-dialog :config='dialogConfig_1'
                  :visible='isShowForm_1'
                  @cancel='hideForm_1'>

      <el-header class="header" v-if='headConfig_1'>

        <custom-head :config='headConfig_1' @add='showForm' @search='getKeyword_1' @searchByDate='getDate_1'></custom-head> 

      </el-header>

      <custom-table :config='tableConfig_1' 
                    :data='list_1' 
                    :classList='classList_1' 
                    :total='total_1' 
                    :isLoading='isLoading_1' 
                    @show='showDetail_1'
                    @update='updateForm_1'
                    @delete='deleteItem_1'
                    @change='change_1'></custom-table>

  </custom-dialog>

  <div v-if='isShowForm_2'>
        <custom-dialog :config='dialogConfig_2'
                      :visible='isShowForm_2'
                      :detail='formData_2'
                      @select='addDetail_2'
                      @submit='submit_2'
                      @cancel='hideForm_2'>
                      
          <div class='detail_wrap'>
            <el-form class='detail' v-for='(item, index) in detailList_2' :key='index' :model='item' ref='detail' :rules='detailRule_2'>

              <el-form-item class='detail_item' label-width='100px' label='服务类型' prop='service_id'>
                <div v-text='item.service_name'></div>
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
        title: '添加门店',
        placeHolder: '门店名称搜索'
      },
      dialogConfig: {
        width: '80%',    
        canSubmit: true,
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
        rules: {
          'store_name': [ 
            { required: true, message: '请输入门店名称!', trigger: 'blur' },
          ],
          'store_member_name': [ 
            { required: true, message: '请输入门店账号!', trigger: 'blur' },
            { message: '门店账号必须是6~15位!', min: 6, max: 15 } 
          ],
          'store_day': [ 
            { required: true, message: '请选择营业时间!', trigger: 'change' },
          ],
          'store_time': [ 
            { required: true, message: '请设置营业时间点!', trigger: 'change' },
          ],
          'store_address': [ 
            { required: true, message: '请输入门店地址!', trigger: 'blur' },
          ],
        }
      },
      formData: {},
      isAdd: true,
      tableConfig: {
        showOperate: true,
        updateTitle: '编辑',
        lookTitle: '查看',
        judge: ['isup', '下架', '上架'],
        showDelete: true,
      },
      classList: [
        { key: '门店名字', value: 'store_name', },
        { key: '营业时间', value: 'worktime', isMulti: true },
        { key: '地址', value: 'store_address' },
      ],
      dateList: [
        { id: 1, value: '周一' }, 
        { id: 2, value: '周二' }, 
        { id: 3, value: '周三' },
        { id: 4, value: '周四' },
        { id: 5, value: '周五' },
        { id: 6, value: '周六' },
        { id: 7, value: '周日' },
      ],
      location: {}, // 
    }
  },

  methods: {
    initOfficeHours(){
      this.dialogConfig.addList[3].list = this.dateList;
    },
    getKeyword(v){
      this.param.search = v;
      this.getList();
    },
    async initForm(item){
      let o = {};

      this.dialogConfig.canSubmit = true;

      if(item){
        
        let res = await api.getStore(item.store_id, null, this);

        this.location = { lng: item.store_longitude, lat: item.store_latitude };
        return this.formData = this.format(res[0], 'edit');
      }

      this.dialogConfig.addList.forEach(v => o[v.value] = v.isImg ? [] : '');
      this.formData = o;
    },
    getLocation(v){
      this.location = v;
    },
    submit(imgs){
      let o = this.formData,
          param;

      this.dialogConfig.canSubmit = false;

      param = {
        store_name: o.store_name,
        store_member_name: o.store_member_name,
        seller_name: o.store_member_name,
        store_images: imgs,
        store_workingtime: `${o.store_day.join(',')}|${o.store_time}`,
        store_address: o.store_address,
        store_longitude: this.location.lng,
        store_latitude: this.location.lat,
        store_description: o.store_description,
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
    look(item){
      this.dialogConfig.isCustom = true;
      this.dialogConfig.isDisabled = true;
      this.showForm(item);
    },
    
    // util
    format(v, type){
      let time = v.store_workingtime.split('|');

      v.worktime = time[0].split(',').map(v => this.dateList.filter(date => date.id == v)[0].value );
      v.store_day = time[0].split(',').map(v => parseInt(v));
      v.store_time = time[1] ? time[1].split(',').map(v => new Date(v)) : '';

      v.store_member_name = v.seller_name;

      // store state / 上下架状态(store_state 1上架状态 2下架状态)
      v.isup = v.store_state == 1 ? true : false;

      // imgs
      if(type === 'edit'){
        v.store_images = v.images.map(v => { return { url: v } });
      }

      return v;
    },

    // request
    async getList(){
      this.isLoading = true;
      let res = await api.getStoreList(this.param, this);
      // {data: [{ 
      //     store_name: 'ajksdfjosdjfisdjfl',
      //     store_img: [{url: "http://admin-1256953590.cos.ap-shanghai.myqcloud.com/1547108788492icon_fanhui%402x.png"}],
      //     store_time: [2, 5], 
      //     store_address: '武汉', 
      //     isUp: true }]}; 

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
      let res = this.isAdd ? await api.setStore(param, this) : await api.updateStore(this.formData.store_id, param, this);

      this.isShowForm = false;
      this.dialogConfig.canSubmit = true;
      this.getList();
    },

    async judge(item){
      // console.error('judge', typeof item.store_state);
      let res = await api.updateStoreState(item.store_id, { store_state: item.store_state == 1 ? 2 : 1 }, this);

      this.getList();
    },

    async deleteItem(item){
      let res = await api.deleteStore(item.store_id, null, this);

      this.getList();
    },
  },

  mounted(){
    this.initOfficeHours();
  }

}
</script>