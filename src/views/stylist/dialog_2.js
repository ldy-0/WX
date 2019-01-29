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
      let o = {};

      if(item){
        return this.formData_2 = item;
      }

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
    

    // Edit Service/修改服务
    updateForm_1(item){
      this.dialogConfig_2 = {
        width: '80%',    
        canSubmit: true,
        classList: [],
        addList: [
          { key: '昵称', value: 'service_name', isText: true },
          // { key: '价格(¥)', value: 'price', isNumber: true },
        ],
      };

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
      this.dialogConfig_2.canSubmit = false;

      let o = this.formData_2,
          param = this.type_1 === 'service' ? {
            service_name: o.service_name
          } : {

          };

      console.error(imgs, param);
      this.dialogConfig_2.canSubmit = true;
    },

    // request
    async getList_2(type){
      this.isLoading_2 = true;
      let res = {data: [{ 
          [`${type}_name`]: 'ajksdfjosdjfisdjfl',
          [`${type}_img`]: [{url: "http://admin-1256953590.cos.ap-shanghai.myqcloud.com/1547108788492icon_fanhui%402x.png"}],
          [`${type}_time`]: '2018/111', 
        }]};// await api.getUserList(this.param, this);

      if(res && res.data){
        res.data.forEach(v => {
          v[`${type}_image`] = v[`${type}_img`][0].url;
        });

        this.list_2 = res.data;
        this.total_2 = res.pagination ? res.pagination.total : 0;
      }
      // console.error('get list res: ', res, this.list);
      this.isLoading_2 = false;
    },

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