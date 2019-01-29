import api from './api'

export default {
  components: {
  },

  data(){
    return {
      dialogConfig_1: {
        isCustom: true,
        isDisabled: true,
        width: '80%',    
        canSubmit: true,
        classList: [],
        // addList: [
        //   { key: '门店名字', value: 'store_name', isText: true, },
        //   { key: '门店图片', value: 'store_img', limit: 5, isImg: true, },
        //   { key: '营业时间', value: 'store_time', isMultiSelect: true, id: 'id', name: 'value', list: [] },
        //   { key: '门店地址', value: 'store_address', isText: true, },
        //   { key: '门店描述', value: 'store_detail', isText: true, },
        // ],
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
      isShowForm_1: false,
      isAdd_1: false,

      // Table config
      tableConfig_1: {
        showOperate: true,
        updateTitle: '编辑',
        // lookTitle: '查看',
        // judge: ['isUp', '下架', '上架'],
        showDelete: true,
      },
      classList_1: [
      ],
      list_1: [],
      param_1: {
        page: 1,
        limit: 10,
      },
      total_1: 0,
      isLoading_1: false,
    }
  },

  methods: {
    showForm_1(item) {
      this.isShowForm_1 = true; 
      this.isAdd_1 = !item;

      this.dialogConfig_1.classList = item ? this.dialogConfig.updateList || this.dialogConfig.addList : this.dialogConfig.addList;
      this.initForm(item);
    },
    hideForm_1(){ this.isShowForm_1 = false; },
    change_1(v){
      this.param.page = v.page;
      this.param.limit = v.limit;
      this.getList();
    },

    showStylist(){
      this.isShowForm_1 = true;
      this.tableConfig_1 = {
        showOperate: true,
        updateTitle: '编辑',
        judge: ['isUp', '下架', '上架'],
        showDelete: true,
      };
    },

    showService(){
      this.isShowForm_1 = true;

      // Config
      this.headConfig_1 = {

      };
      this.tableConfig_1 = {
        showOperate: true,
        updateTitle: '编辑',
        showDelete: true,
      };
      this.classList_1 = [
        { key: '服务名字', value: 'store_name' },
      ];

      this.getList_1();
    },

    showComment(){
      this.isShowForm_1 = true;
      this.tableConfig_1 = {
        showOperate: true,
        showDetail: true,
        showDelete: true,
      };
      this.getList_1();
    },

    // request
    async getList_1(){
      this.isLoading_1 = true;
      let res = await api.getUserList(this.param, this);

      if(res && res.data){
        res.data.forEach(v => {
          v.admin_limits.forEach(k => v[k] = 1);
        });

        this.list_1 = res.data;
        this.list_1.push({ store_name: 'ajksdfjosdjfisdjfl',
          store_img: [{url: "http://admin-1256953590.cos.ap-shanghai.myqcloud.com/1547108788492icon_fanhui%402x.png"}],
          store_time: [2, 5], store_address: 'aaa', isUp: true });

        this.total_1 = res.pagination ? res.pagination.total : 0;
      }
      // console.error('get list res: ', res, this.list);
      this.isLoading_1 = false;
    },

    // async saveUser(param){
    //   let res = this.isAdd ? await api.setUser(param, this) : await api.updateUser(this.formData.admin_id, param, this);

    //   this.isShowForm = false;
    //   this.getList();
    // },

    async deleteItem_1(item){
      let res = await api.deleteUser(item.admin_id, null, this);

      this.getList_1();
    },
  },

}