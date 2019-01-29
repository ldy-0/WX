<style lang="stylus">
  .notice
    .header
      margin-top 20px
</style>

<template>
<div>

<el-container class="notice">

  <el-header class="header">

    <custom-head :config='headConfig' @add='addForm'></custom-head> 

  </el-header>

  <custom-table :config='tableConfig' 
                :data='list' 
                :classList='classList' 
                :total='total' 
                :isLoading='isLoading' 
                @update='updateForm'
                @delete='deleteBanner'
                @change='change'></custom-table>

  <!-- add banner -->
  <div v-if='isShowForm'>
    <custom-dialog :config='dialogConfig'
                  :visible='true'
                  :detail='formData'
                  @changebanner_type='changeType'
                  @submit='submit'
                  @cancel='hideForm'>

      <div>
        <el-upload action='' list-type="picture-card" :auto-upload="false"
            :limit='1'
            :file-list='detailList' 
            :on-remove='changeImgs'
            :on-change="changeImgs"
            v-if='formData.banner_type === 1'>

            <i class="el-icon-plus"></i>

        </el-upload>
      </div>

    </custom-dialog>
  </div>

</el-container>
</div>
</template>
<script>

import uploadImg from '@/utils/aahbs'
import api from './api.js'
import base from './base.js'
import auth from './auth.js'

export default {
  mixins: [base, auth],

  data() {
    return {
      headConfig: {
        showAdd: true,
        title: '添加轮播图',
      },
      dialogConfig: {
        width: '80%',    
        canSubmit: true,
        classList: [],
        addList: [
          { key: '图片', value: 'banner_pic', isImg: true, limit: 1 },
          { key: '标题', value: 'banner_title', isText: true },
          { key: '跳转类型', value: 'banner_type', isSelect: true, id: 'id', name: 'value', list: [ 
              { id: 0, value: '无' },
              { id: 1, value: '跳转图片' }
            ] 
          },
          { key: '跳转图片', value: 'banner_url', isHide: true, isDetail: true },
        ],
        // updateList: [],
        rules: {
          'title': [ 
            // { required: true, message: '请输入标题!', trigger: 'blur' },
            // { message: '标题必须是6~15位!', min: 6, max: 15 } 
          ],
          'banner_type': [ { required: true, message: '请选择跳转类型!', trigger: 'change' } ],
        }
      },
      formData: {},
      isAdd: true,
      tableConfig: {
        showOperate: true,
        showDelete: true,
        updateTitle: '编辑'
      },
      classList: [
        { key: '图片', value: 'img', isImg: true },
        { key: '标题', value: 'banner_title' },
        { key: '跳转类型', value: 'type' },
      ],
      detailList: []
    }
  },

  methods: {
    changeType(id){
      this.dialogConfig.addList.forEach(v => { if(v.value === 'banner_url'){ v.isHide = id !== 1; } }); 
    },
    changeImgs(file, fileList){ this.detailList = fileList; },

    initForm(item){
      let o = {};

      if(item){
        this.detailList = item.banner_url || [];
        return this.formData = item;
      }

      this.detailList = [];
      this.dialogConfig.addList.forEach(v => {
        if(v.value === 'banner_url') v.isHide = true;
        o[v.value] = v.isImg ? [] : '';
      });
      this.formData = o;
    },

    addForm(){
      this.list.length > 5 
      ? this.$message.error('轮播图最多只能有5张')
      : this.showForm();
    },

    updateForm(item){
      this.dialogConfig.addList.forEach(v => { if(v.value === 'banner_url'){ v.isHide = item.banner_type !== 1; } }); 
      this.showForm(item);
    },

    async submit(imgs){
      let o = this.formData,
          param;

      if(!imgs.length) return this.$message.error('请选择一张图片!');

      this.dialogConfig.canSubmit = false;

      let detailImg = await uploadImg(this.detailList.filter(v => v.raw).map(v => v.raw)),
          detail = this.detailList.filter(v => !v.raw).concat(detailImg.map(v => { return { url: v } }));

      param = {
        banner_pic: JSON.stringify(imgs),
        banner_title: o.banner_title,
        banner_type: o.banner_type,
      };
      if(o.banner_type === 1) param.banner_url = JSON.stringify(detail);

      console.error(this.formData, 'user param : ', param);
      this.save(param);
    },

    // request
    async getList(){
      this.isLoading = true;
      let res = await api.getBannerList(this.param, this);

      if(res && res.data){
        res.data.forEach(v => {
          v.banner_pic = JSON.parse(v.banner_pic);
          if(v.banner_url) v.banner_url = JSON.parse(v.banner_url);
          v.img = v.banner_pic[0] && v.banner_pic[0].url;
          v.type = v.banner_type === 0 ? '不跳转' : '跳转图片'
        });

        this.list = res.data;
        this.total = res.pagination ? res.pagination.total : 0;
      }
      // console.error('get list res: ', res, this.list);
      this.isLoading = false;
    },

    async save(param){
      let res = this.isAdd ? await api.setBanner(param, this) : await api.updateBanner(this.formData.banner_id, param, this);

      this.isShowForm = false;
      this.getList();
    },

    async deleteBanner(item){
      let res = await api.deleteBanner(item.banner_id, null, this);

      this.getList();
    },
  },


}
</script>