import api from './api'

export default {
  components: {
  },

  data(){
    return {
      // config
      headConfig_2: {},
      tableConfig_2: {},
      classList_2: [],
      dialogConfig_2: {
        // rules: {
        //   'store_name': [ 
        //     { required: true, message: '请输入门店名称!', trigger: 'blur' },
        //     // { message: '门店名称必须是6~15位!', min: 6, max: 15 } 
        //   ],
        //   'store_time': [ 
        //     { required: true, message: '请选择营业时间!', trigger: 'change' },
        //   ],
        //   'store_address': [ 
        //     { required: true, message: '请输入门店地址!', trigger: 'blur' },
        //   ],
        // }
      },

      formData_2: {},
      detailList_2: [],
      detailRule_2: [],
      isShowForm_2: false,
      isAdd_2: false,

      list_2: [],
      param_2: {
        page: 1,
        limit: 10,
      },
      total_2: 0,
      isLoading_2: false,
    }
  },

  methods: {
    showForm_2(item) {
      this.isShowForm_2 = true; 
      this.isAdd_2 = !item;

      this.dialogConfig_2.classList = item ? this.dialogConfig_2.updateList || this.dialogConfig_2.addList : this.dialogConfig_2.addList;
      this.initForm_2(item);
    },
    initForm_2(item){
      let o = {},
          addList = this.dialogConfig_2.addList;

      // FIXME: Service
      let service = [
        { service_id: 10, service_name: 'ssdfksjfojfoadakf开始大批饭卡手动阀噶色哦高房价恐怕是的顾客豆腐干1' },
        { service_id: 11, service_name: 'sssdfksjfojfoadakf开始大批饭卡手动阀噶色哦高房价恐怕是的顾客豆腐干12' },
        { service_id: 12, service_name: 'sssdfksjfojfoadakf开始大批饭卡手动阀噶色哦高房价恐怕是的顾客豆腐干13' },
        { service_id: 13, service_name: 's4' },
      ];

      addList[addList.length - 1].list = service;

      if(item){
        if(this.type_1 === 'stylist'){
          this.detailList_2 = item.detailList;
          item.detailList = item.detailList.map(v => v.service_id);
        }

        return this.formData_2 = item;
      }

      this.detailList_2 = [];
      this.dialogConfig.addList.forEach(v => o[v.value] = v.isImg ? [] : '');
      this.formData = o;
    },
    hideForm_2(){ this.isShowForm_2 = false; },
    getDate_2(v){
      this.param_2.search = v;
      this.getList_2();
    },
    change_2(v){
      this.param_2.page = v.page;
      this.param_2.limit = v.limit;
      this.getList_2();
    },
    
    addDetail_2(arr){
      // if(true){

      // }
      let serviceList = this.dialogConfig_2.addList[this.dialogConfig.addList.length - 1].list,
          detailList = this.detailList_2,
          new_arr;

      detailList = detailList.filter(v => arr.indexOf(v.service_id) !== -1 );

      new_arr = arr.filter(id => !detailList.some(v => v.service_id === id));

      this.detailList_2 = detailList.concat(new_arr.map(v => { 
        let service_name;

        serviceList.forEach(service => { if(service.service_id === v) service_name = service.service_name });
        return { service_id: v, service_name, price: null }; 
      }));
    },
    // Edit Service/修改服务
    updateForm_1(item){
      this.dialogConfig_2 = {
        width: '80%',    
        canSubmit: true,
        classList: [],
        addList: [
          { key: '设计师名字', value: 'stylist_name', isText: true, },
          { key: '图片', value: 'stylist_img', limit: 1, isImg: true, },
          { key: '工作时间', value: 'stylist_time', isMultiSelect: true, id: 'id', name: 'value', list: [
              { id: 1, value: '周一' }, 
              { id: 2, value: '周二' }, 
              { id: 3, value: '周三' },
              { id: 4, value: '周四' },
              { id: 5, value: '周五' },
              { id: 6, value: '周六' },
              { id: 7, value: '周日' },
            ] 
          },
          { key: '可预约时间', value: 'appoinment_time', text: '添加时间', isMultiTime: true },
          { key: '签名', value: 'stylist_sign', isText: true, },
          { key: '价格', value: 'detailList', placeholder: '添加服务', isDetail: true, id: 'service_id', name: 'service_name', list: [] },
        ],
        rules: {
          'stylist_name': [ 
            { required: true, message: '请输入设计师名字!', trigger: 'blur' },
            { message: '设计师名字必须是1~15位!', min: 1, max: 15 } 
          ],
          'stylist_time': [ 
            { required: true, message: '请选择营业时间!', trigger: 'change' },
          ],
          'stylist_address': [ 
            { required: true, message: '请输入门店地址!', trigger: 'blur' },
          ],
        }
      };
      this.detailRule_2 = {
        'price': [ 
          { required: true, message: '请输入价格!', trigger: 'blur' },
        ],
        'service_id': [ 
          { required: true, message: '请选择营业时间!', trigger: 'change' },
        ],
      }

      this.showForm_2(item);
    },
    // Look Comment Detail/查看评论详情
    showDetail_1(item){
      this.dialogConfig_2 = {
        isDisabled: true,
        width: '80%',    
        classList: [],
        addList: [
          { key: '头像', value: 'comment_img', isImg: true },
          { key: '昵称', value: 'comment_name', isText: true },
          { key: '星级', value: 'comment_level', isRate: true },
          { key: '门店', value: 'store_name', isSelect: true, id: 'id', name: 'store_name', list: [] },
          { key: '服务', value: 'service_name', isSelect: true, id: 'id', name: 'service_name', list: [] },
          { key: '价格(¥)', value: 'price', isNumber: true },
          { key: '评论时间', value: 'comment_time', dateType: 'datetime' },
          { key: '评论内容', value: 'comment_content', isTexts: true, },
        ],
      }

      this.showForm_2(item); 
    },

    // Save Edit/保存修改
    submit_2(imgs){
      let o = this.formData_2,
          param;

      this.dialogConfig_2.canSubmit = false;

      if(this.type_1 === 'service'){
        param = {
          service_name: o.service_name
        }
      }else if(this.type_1 === 'stylist'){
        param = {
          stylist_name: o.stylist_name,
          stylist_time: o.stylist_time,
          appoinment_time: o.appoinment_time,
          detailList: this.detailList_2,
        };
      }

      console.error(imgs, param);
      this.dialogConfig_2.canSubmit = true;
    },

    // request
    // async getList_2(type){
    //   this.isLoading_2 = true;
    //   let res = {data: [{ 
    //       [`${type}_name`]: 'ajksdfjosdjfisdjfl',
    //       [`${type}_img`]: [{url: "http://admin-1256953590.cos.ap-shanghai.myqcloud.com/1547108788492icon_fanhui%402x.png"}],
    //       [`${type}_time`]: [1, 3], 
    //     }]};// await api.getUserList(this.param, this);

    //   if(res && res.data){
    //     res.data.forEach(v => {
    //       v[`${type}_image`] = v[`${type}_img`][0].url;
    //     });

    //     this.list_2 = res.data;
    //     this.total_2 = res.pagination ? res.pagination.total : 0;
    //   }
    //   // console.error('get list res: ', res, this.list);
    //   this.isLoading_2 = false;
    // },

    async saveItem_2(param){
      let res = this.isAdd ? await api.setUser(param, this) : await api.updateUser(this.formData.admin_id, param, this);

      this.isShowForm = false;
      this.getList();
    },

    async deleteItem_2(item){
      let res = await api.deleteUser(item.admin_id, null, this);

      this.getList_2();
    },
  },

}