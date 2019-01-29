<style lang="css">

  .header{
    margin-top: 20px;
  }
  
  .detail{
    position: relative;
    margin: 20px 0 0;
    border: 1px solid #c0c4cc;
  }

  .detail_close{
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    padding: 10px 20px;
  }
  .detail_item{
    margin: 20px 0;
  }
  .detail_input{
    width: 400px;
  }


.page{
  width: 750px;
  /* height: 1334px;*/
  border: 1px solid gray;
  transition: width 6s;
}
.page:hover{ width: 300px; }
.adaption{
  position: relative;
  width: 100%;
  padding-top: 178%;
  /* background: green; */
}

.content{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.company_wrap{
  position: relative;
  width: 100%;
  height: 9.5%; /* 128/1334 */
  border-radius: 0 0 4% 4% / 0 0 23.4% 23.4%;
}
.company_logo{
  position: absolute;
  top: 23.4%;
  left: 4%;
  width: 31.2%; /* 234/750 */
  height: 55%; /* 70/128  */
  background: gray;
}
.i_logo{
  width: 30%; /* 70/234 */
  height: 100%;
  background: gray;
}

.company_info{
  position: absolute;
  top: 23.4%;
  right: 4%;
  /* width: 29.8%; 224/750 */
  /* height: 60.9%;  78/128 */
}
.company_address{
  margin-left: 10px;
  font-size: 13px; 
}
.i_address{
  width: 16px;
  height: 18px;
  background: gray;
}
.company_time{
  margin: 10px 0 0;
  font-size: 11px;
}

.comment{
  position: relative;
  width:94.6%; /* 710/750 */
  height: 8.2%; /* 110/1334 */
  margin: 2.7% auto 0;
  padding: 7px 10px;
  border-radius: 7% / 45.4%;
}
.comment_avatar{
  width: 11.3%; /* 80/710 */
  height: 72.7%; /* 80/110 */
  margin-right: 10px;
  /* border-radius: 50%; */
  background: gray;
}
.comment_name{
  font-size: 14px;
}
.comment_content{
  margin: 4px 0 0;
  font-size: 11px;
}
.comment_time{
  position: absolute;
  top: 5px;
  right: 5.6%; /* 40/710 */
  font-size: 10px;
}

.main_wrap{
  position: relative;
  width: 94.6%;
  height: 40.1%; /* 535/1334 */
  margin: 2.7% auto 0;
  border-radius: 4.2% / 5.6% ;
  overflow: hidden;
}
.activity{
  width: 64.9%; /* 460/710 */
  height: 11.2%; /* 60/535 */
  margin: 15px auto 0;
  font-size: 14px;
  border-radius: 5px;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);
}
.activity_title{
  display: inline-block;
  padding: 7px 12px;
  border-radius: 5px;
  transform: skewX(-8deg);
}
.activity_value{
  display: inline-block;
  padding: 6px 10px 6px 0;
  transform: skewX(-8deg);
}
.activity_inner{
  display: inline-block;
  transform: skewX(8deg);
}

.price{
  width: 44.6%; /* 317/710 */
  height: 15.5%; /* 83/535 */
  margin: 15px auto 0;
  font-size: 55px; 
}
.price_before{
  position: relative;
  top: -0.3em;
  font-size: 0.47em; /* 26/55 */
}
.price_after{
  position: relative;
  bottom: -1em;
  font-size: 0.25em; /* 14/55 */
}
.price_desc{
  /* position: absolute;
  left: 24.7%; */
  width: 58.5%; /* 352/710 */
  margin: 8px auto 0;
  font-size: 10px;
  letter-spacing: -1px;
}
.qrcode_img{
  /* position: absolute;
  left: 39.5%; */
  display: block;
  width: 21.5%; /* 153/710 */
  height: 28.5%; /* 153/535 */
  margin: 10px auto 0;
  background: gray;
}

.qrcode_desc{
  width: 36.1%; /* 256/710 */
  height: 5.6%; /* 30/535 */
  margin: 15px auto 0;
  font-size: 13px;
}
.i_scan{
  width: 15px;
  height: 15px;
  margin: -1px 0 0;
  vertical-align: middle;
  background: gray;
}

.pay_desc{
  width: 19.2%; /* 115/710 */
  height: 5%; /* 27/535 */
  margin: 7px auto 0;
  font-size: 10px;
}
.i_pay{
  width: 13px;
  height: 13px;
  margin: -1px 0 0;
  vertical-align: top;
  background: gray;
}

.user_wrap{
  position: relative;
  width: 94.6%;
  height: 33%; /* 440/1334 */
  margin: 2.7% auto 0;
  border-radius: 4.2% / 5.6% ;
}
.user_title_wrap{
  position: relative;
  left: 37%;
  width: 27%; /* 185/710 */
  height: 18.1%; /* 80/440 */
}
.i_user{
  width: 15.1%; /* 28/185 */
  height: 37.5%; /* 30/80 */
  background: gray;
}
.user_title{
  margin-left: 10px;
  font-size: 14px;
}
.user_list{
  width: 100%;
  height: 72.7%; /* 320/440 */
}
.user_item{
  width: 97.1%; /* 690/710 */
  height: 31.2%; /* 100/320 */
  margin-left: 1.4%; 
  border-radius: 5px;
  border: 1px solid;
}
.stylist_img{
  width: 14.5%; /* 100/690 */ 
  height: 100%;
  margin-right: 2px;
  border-radius: 5px;
  background: gray;
}
.stylist_name{
  font-size: 14px;
}
.stylist_time{
  margin: 8px 0 0;
  font-size: 11px;
}

.stylist_price{
  margin-left: 6.9%; /* 48/690 */
  font-size: 15px;
}

.user_img{
  width: 8.6%; /* 60/690 */
  height: 60%; /* 60/100 */
  margin-right: 2px;
  border-radius: 50%;
  background: gray;
}
.user_name{
  font-size: 12px;
}
.user_time{
  margin: 6px 0 0;
  font-size: 10px;
}


.footer{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.7%; /* 10/1334 */
  line-height: 1.2;
  font-size: 10px;
  text-align: center;
}
.i_phone{
  width: 4%; /* 30/750 */
  height: 2.2%; /* 30/1334 */
  margin-right: 10px;
  background: gray;
}

.flex{
  display: flex;
  align-items: center;
}
.between{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.s-fc-1{ color: #fff; }
.s-fc-2{ color: #10325f; }
.s-fc-3{ color: #fffefe; }
.s-fc-4{ color: #8e939a; }
.s-fc-5{ color: #222; }
.s-fc-6{ color: #999; }
.s-fc-7{ color: #fe6e13; }

.s-bg-1{ background: #fff; }
.s-bg-2{ background: #10325f; }
.s-bg-3{ background: #f4f4f4; }
.s-bg-4{ background: #fe6e13; }
</style>

<template>
<div class='page'>

  <div class='adaption'>

    <div class='content s-bg-3'>

      <div class='company_wrap s-bg-2'>

        <div class='company_logo'>
          <image class='i_logo' src='' />
          <span></span>
        </div>

        <div class='company_info s-fc-3'>
          <div class='flex'>
            <img class='i_address' />
            <div class='company_address'>国际企业峰汇店</div>
          </div>
          <div class='company_time'>营业时间:10:00-21:00</div>
        </div>

      </div>

      <div class='comment flex s-bg-1'>
        <img class='comment_avatar' />
        <div class=''>
          <div class='comment_name s-fc-5'>秒美如画</div>
          <div class='comment_content s-fc-6'>服务很不错，服务很不错，服务很不错，服务很不错</div>
        </div>
        <div class='comment_time s-fc-4'>2018/12/12 08:00</div>
      </div>

      <div class='main_wrap s-bg-1'>
        <div class='activity'>
          <span class='activity_title s-fc-1 s-bg-4'><span class='activity_inner'>优惠</span></span>
          <span class='activity_value s-fc-7 s-bg-1'><span class='activity_inner'>新用户扫码下单立减5元！</span></span>
        </div>
        <div class='price flex s-fc-2'>
          <span class='price_before'>¥</span><span>39.8</span><span class='price_after'>起</span>
        </div>
        <div class='price_desc s-fc-7'>*高低峰价格会有所变动请以店内价格为准</div>
        <img class='qrcode_img' />
        <div class='qrcode_desc s-fc-2'>
          <img class='i_scan' />
          <span>手机扫码 完成支付</span>
        </div>
        <div class='pay_desc s-fc-5'>
          <img class='i_pay' />
          <span class='pay_content'>微信支付</span>
        </div>
      </div>

      <div class='user_wrap s-bg-1'>
        <div class='user_title_wrap flex'>
          <img class='i_user' />
          <div class='user_title'>店内发型师</div>
        </div>

        <div class='user_list'>
          <div class='user_item flex'>
            <img class='stylist_img' />

            <div class=''>
              <div class='stylist_name s-fc-2'>张三</div>
              <div class='stylist_time s-fc-6'>可约 13:40</div>
            </div>

            <div class='stylist_price s-fc-2'>¥39.8</div>

            <img class='user_img' />

            <div class=''>
              <div class='user_name s-fc-2'>张三</div>
              <div class='user_time s-fc-6'>13:40</div>
            </div>
            
          </div>
        </div>
      </div>

      <div class='footer s-fc-2'>
        <img class='i_phone' src='' />
        <span>客服电话：400-555-5555（9:00-21:00 周一至周日）</span>
      </div>

    </div>

  </div>

<el-container class="notice">

  <!-- <el-header class="header">

    <custom-head :config='headConfig' @add='updateForm' @search='getKeyword'></custom-head> 

  </el-header> -->

  <custom-table :config='tableConfig' 
                :data='list' 
                :classList='classList' 
                :total='total' 
                :isLoading='isLoading' 
                @update='updateForm'
                @look='look'
                @delete='deleteItem'
                @change='change'></custom-table>

  <div v-if='isShowForm'>
    <custom-dialog :config='dialogConfig'
                  :visible='isShowForm'
                  :detail='formData'
                  @submit='submit'
                  @cancel='cancel'>
                  
      <el-button @click='showStylist'>查看发型师</el-button>
      <el-button @click='showService'>查看服务</el-button>
      <el-button @click='showComment'>查看评论</el-button>

    </custom-dialog>
  </div>


  <!-- 查看发型师/服务/评论 -->
  <!-- <custom-dialog :config='dialogConfig_1'
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
  </div> -->

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
          { key: '门店账号', value: 'store_nick', isText: true, },
          { key: '门店密码', value: 'store_password', isText: true, },
          { key: '门店图片', value: 'store_img', limit: 5, isImg: true, },
          { key: '营业时间', value: 'store_time', isMultiSelect: true, id: 'id', name: 'value', list: [] },
          { key: '门店地址', value: 'store_address', isAddress: true, },
          { key: '门店描述', value: 'store_detail', isTexts: true, },
        ],
        rules: {
          'store_name': [ 
            { required: true, message: '请输入门店名称!', trigger: 'blur' },
            // { message: '门店名称必须是6~15位!', min: 6, max: 15 } 
          ],
          'store_time': [ 
            { required: true, message: '请选择营业时间!', trigger: 'change' },
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
        judge: ['isUp', '下架', '上架'],
        showDelete: true,
      },
      classList: [
        { key: '门店名字', value: 'store_name', },
        { key: '营业时间', value: 'store_time', isMulti: true },
        { key: '地址', value: 'store_address' },
      ],
    }
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
        { id: 7, value: '周日' },
      ];
    },
    getKeyword(v){
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
      this.showForm();
    },

    // request
    async getList(){
      this.isLoading = true;
      let res = {data: [{ 
          store_name: 'ajksdfjosdjfisdjfl',
          store_img: [{url: "http://admin-1256953590.cos.ap-shanghai.myqcloud.com/1547108788492icon_fanhui%402x.png"}],
          store_time: [2, 5], 
          store_address: '武汉', 
          isUp: true }]}; //await api.getUserList(this.param, this);

      if(res && res.data){
        res.data.forEach(v => {
          // v.admin_limits.forEach(k => v[k] = 1);
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
  },

  created(){
    this.initOfficeHours();
  }

}
</script>