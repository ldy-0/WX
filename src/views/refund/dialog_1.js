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
        // ],
        // rules: {
        //   'store_name': [ 
        //     { required: true, message: '请输入门店名称!', trigger: 'blur' },
        //     // { message: '门店名称必须是6~15位!', min: 6, max: 15 } 
        //   ],
        //   'store_time': [ 
        //     { required: true, message: '请选择营业时间!', trigger: 'change' },
        //   ],
        // }
      },
      isShowForm_1: false,
      isAdd_1: false,

      // config
      headConfig_1: {},
      tableConfig_1: {},
      classList_1: [],

      list_1: [],
      param_1: {
        page: 1,
        limit: 10,
      },
      total_1: 0,
      isLoading_1: false,
      type_1: null,
    }
  },

  methods: {
    // Dialog handle
    showForm_1(item) {
      this.isShowForm_1 = true; 
      this.isAdd_1 = !item;

      this.dialogConfig_1.classList = item ? this.dialogConfig.updateList || this.dialogConfig.addList : this.dialogConfig.addList;
      this.initForm(item);
    },
    hideForm_1(){ this.isShowForm_1 = false; },
    // Head Handle
    getKeyword_1(v){
      this.param_1.search = v;
      // this.getList_1();
    },
    getDate_1(v){
      this.param_1.search = v;
      this.getList_1();
    },
    // Table handle
    change_1(v){
      this.param.page = v.page;
      this.param.limit = v.limit;
      this.getList();
    },

    // Show Stylist/显示发型师信息
    showStylist(){
      this.isShowForm_1 = true;

      this.headConfig_1 = {
        placeHolder: '发型师名字搜索'
      };
      this.tableConfig_1 = {
        showOperate: true,
        updateTitle: '编辑',
        judge: ['isUp', '下架', '上架'],
        showDelete: true,
      };
      this.classList_1 = [
        { key: '图片', value: 'stylist_image', isImg: true },
        { key: '名字', value: 'stylist_name' },
        { key: '价格(¥)', value: 'stylist_price' },
        { key: '价格(¥)', value: 'stylist_price' },
        { key: '签名', value: 'stylist_sign' },
        { key: '账号', value: 'service_type' },
      ];

      this.getList_1(this.type_1 = 'stylist');
    },

    showService(){
      this.isShowForm_1 = true;

      // Config
      this.headConfig_1 = null;
      this.tableConfig_1 = {
        showOperate: true,
        updateTitle: '编辑',
        showDelete: true,
      };
      this.classList_1 = [
        { key: '服务名字', value: 'service_name' },
      ];

      this.getList_1(this.type_1 = 'service');
    },

    showComment(){
      this.isShowForm_1 = true;

      this.headConfig_1 = {
        dateWidth: '400px',
      };
      this.tableConfig_1 = {
        showOperate: true,
        showDetail: true,
        showDelete: true,
      };
      this.classList_1 = [
        { key: '头像', value: 'comment_image', isImg: true },
        { key: '昵称', value: 'comment_name' },
        { key: '星级', value: 'comment_level', isRate: true },
        { key: '服务', value: 'service_name' },
        { key: '价格(¥)', value: 'price' },
        { key: '购买时间', value: 'buy_time' },
        { key: '评论时间', value: 'comment_time' },
        { key: '类型', value: 'service_type' },
      ],

      this.getList_1(this.type_1 = 'comment');
    },

    
    // request
    async getList_1(type){
      this.isLoading_1 = true;
      let res = {data: [{ 
          [`${type}_name`]: 'ajksdfjosdjfisdjfl',
          [`${type}_img`]: [{url: "http://admin-1256953590.cos.ap-shanghai.myqcloud.com/1547108788492icon_fanhui%402x.png"}],
          [`${type}_time`]: [1, 3], 
          comment_level: 2,
          appoinment_time: ['2018/11/11 12:11:32'],
          detailList: [{ service_id: 10, service_name: 'ssdkflskfjf4', price: 12 },{ service_id: 12, service_name: 'ssdkflskfjf4', price: 12 } ],
        }]};// await api.getUserList(this.param, this);

      if(res && res.data){
        res.data.forEach(v => {
          v[`${type}_image`] = v[`${type}_img`][0].url;
        });

        this.list_1 = res.data;
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