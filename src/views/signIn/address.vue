<style lang="stylus">
  .notice
    .header
      margin-top 20px
    .big-icon
      font-size 30px
      color #409EFF
    .big-icon-no
      font-size 30px
      color #b19999
      // color #F56C6C
</style>

<template>
<div>

<el-container class="notice">

  <el-header class='header'>
    <el-form :inline="true" class="form">
      <el-form-item>
        <el-button type="primary" icon="el-icon-edit-outline" @click="showForm">添加教学点</el-button>
      </el-form-item>

      <el-form-item>
          <el-input style="width: 340px;" placeholder="请输入教学点" v-model="addressListConfig.keyword"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="searchAddress">查询</el-button>
      </el-form-item>
    </el-form>
  </el-header>

  <el-main>

    <el-table :data="addressList" stripe v-loading="loadAddress" element-loading-text="给我一点时间" style="width: 100%" >
      <el-table-column label='名称' prop='name'></el-table-column>
      <el-table-column label='地址' prop='address'></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="showForm(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteAddress(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination background 
                  @size-change="addressSizeChange" 
                  @current-change="addressPageChange" 
                  :current-page="addressListConfig.page" 
                  :page-sizes="[10,2,30, 50]" 
                  :page-size="addressListConfig.limit" 
                  layout="total, sizes, prev, pager, next" :total="addressTotal">
    </el-pagination>

  </el-main>

</el-container>
<!-- form -->
<el-dialog :title="isAdd ? '新增教学点' : '修改教学点' " :visible.sync="canShowForm" width="30%" :before-close='clearForm'>

  <el-form :model="addressForm"  ref="ruleForm" :rules="rules">
    <!-- 名称 -->
    <el-form-item label="名称" :label-width="formLabelWidth"  prop="name">
      <el-input v-model="addressForm.name" auto-complete="off"></el-input>
    </el-form-item>

    <!-- 地址 -->
    <el-form-item label="地址" :label-width="formLabelWidth" prop='address'>
      <el-input v-model="addressForm.address" auto-complete="off"></el-input>
    </el-form-item>

  </el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="canShowForm = false; addressForm = {};" >取消</el-button>
    <el-button type="primary" :disabled="!canSubmit" :loading="!canSubmit" @click="addAddress('ruleForm')" v-if='isAdd'>确 定</el-button>
    <el-button type="primary" :disabled="!canSubmit" :loading="!canSubmit" @click="editAddress('ruleForm')" v-else>确认修改</el-button>
  </span>
</el-dialog>

</div>
</template>
<script>

import {getAuthList_api,deleteAuth_api,addAuth_api,editAuth_api} from '@/api/seller' 
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

export default {
  components: {
    UploadExcelComponent
  },
  created(){
    this.getList()
  },
  data() {
    return {
      formLabelWidth:'80px',
      isAdd: true,
      canSubmit: true,
      rules: {
        name: [ { required: true, message: '请输入名称' } ],
        address: [ { required: true, message: '请输入地址详情' } ],
      },
      addressForm: {
        name: '',
        address: '',
      },
      addressListConfig: { 
        page: 1,
        limit: 10,
        keyword: '',
      },
      canShowForm: false,
      loadAddress: false,
      addressList: [],
      addressTotal: null,
    }
  },
  methods: {
      searchAddress(){
        console.log('search ', this.addressListConfig.keyword);
      },
      showForm(index, row){
        this.canShowForm = true;

        if(typeof index !== 'number'){
          return this.isAdd = true;
        } 

        this.isAdd = false;
        this.addressForm = row;
      },
      clearForm(done){
        this.addressForm = {};
        done();
      },
      async addAddress(rule){
        let res = await this.$refs[rule].validate().catch(e => e);
        if(!res){
          return 
        }
        this.canSubmit = false;
        console.log('add address', this.addressForm);
        this.canSubmit = true;
      },
      async editAddress(){
        let res = await this.$refs[rule].validate().catch(e => e);
        if(!res){
          return 
        }
        this.canSubmit = false;
        console.log('edit address', this.addressForm);
        this.canSubmit = true;
      },
      deleteAddress(index, row){
        let id = row.id
        this.$confirm(`此操作将删除该条目, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('delete ');
        }).catch(()=>{ this.$notify.info({ title: '消息', message: '已取消' }); })
      },
      //
      getList() { //获取列表
        this.loadAddress = true;

        // let sendData = Object.assign({},this.listQuery)
        
        this.addressList = [
          { name: 'k1', address: '双方的破碎的卡佛的感觉卡佛大哥可连拍速度过快v发动攻击看dfjioj', phone: 10, parentName: 'skfjkdsf看视频低空飞过佛i给fig水平高奋斗过v佛光v就' },
          { name: 'k1sdfkjsdfgdp', phone: 10, parentName: 'skfjkdsf看视频低空飞过佛i给fig水平高奋斗过v佛光v就' },
        ];
        this.addressTotal = this.addressList.length;
        this.loadAddress = false;
      },
      
      delete(id){
        let sendData = {
          seller_id:id,
        }
        deleteAuth_api(sendData).then(res=>{
          if(res&&res.status===0){
            this.$notify({ title: '成功', message: '操作成功', type:'success' });
            this.getList()
          }else{
            this.$notify({
              title: '错误',
              message: '操作失败',
              type:'error'
            });
          }
        }).catch(err=>{
          console.error('deleteseller_api')
        })
        
      },
    addressSizeChange(val) {
      this.addressListConfig.limit = val
      this.getList()
    },
    addressPageChange(val) {
      this.addressListConfig.page = val
      this.getList()
    },
    coulseSizeChange(val){
      console.log('coulse size change', val);
    },
    coulsePageChange(val){
      
      console.log('coulse page change', val);
    }
    
  }
}
</script>