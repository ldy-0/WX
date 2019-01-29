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
      if(v) this.param_1.search = v;
      this.getList_1(this.type_1);
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
        judge: ['goods_state', '下架', '上架'],
        showDelete: true,
      };
      this.classList_1 = [
        { key: '图片', value: 'stylist_img', isImg: true },
        { key: '名字', value: 'goods_name' },
        // { key: '价格(¥)', value: 'stylist_price' },
        // { key: '价格(¥)', value: 'stylist_price' },
        { key: '签名', value: 'goods_advword' },
        // { key: '账号', value: 'service_type' },
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
        { key: '服务名字', value: 'storegc_name' },
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
        { key: '头像', value: 'comment_img', isImg: true },
        { key: '昵称', value: 'geval_frommembername' },
        { key: '星级', value: 'geval_scores', isRate: true },
        { key: '服务', value: 'comment_service' },
        // { key: '价格(¥)', value: 'price' },
        { key: '购买时间', value: 'payment_time' },
        { key: '评论时间', value: 'comment_time' },
        // { key: '类型', value: '' },
      ],

      this.getList_1(this.type_1 = 'comment');
    },

    // util
    format_1(v){
      if(this.type_1 === 'comment'){
        let t = new Date(v.geval_addtime * 1000);

        try{
          v.member_avatar = JSON.parse(v.geval_frommemberavatar); 
          v.comment_img = v.member_avatar[0] && v.member_avatar[0].url;
        }catch(e){
          v.member_avatar = [];
        }

        // nick name
        v.member_truename = v.geval_frommembername;

        // score
        v.score = v.geval_scores;

        // store
        v.store_id = v.geval_storename;

        // service
        let storegc = this.serviceList.filter(o => o.storegc_id == v.geval_goodsspec)[0];
        v.storegc_id = v.comment_service = storegc ? storegc.storegc_name : '';

        // comment Time
        v.add_time = t;
        v.comment_time = `${t.toLocaleString()}`;

        v.content = v.geval_content;

      }else if(this.type_1 === 'stylist'){

        let img = JSON.parse(v.goods_image), 
            o = v.SKUList ? v.SKUList[0] : null;

        v.goods_image = [img];
        v.stylist_img = img.url;

        if(o){
          v.appoinment_day = o.appointment_date; 
          v.appoinment_time = o.appointment_frame;
        }
        
      }

    },

    
    // request
    async getList_1(type){
      let res,
          param;

      this.isLoading_1 = true;

      param = {
        page: this.param_1.page,
        limit: this.param_1.limit,
        store_id: this.formData.store_id,
      };

      param.search = this.param_1.search;
      delete this.param_1.search;

      if(type === 'comment'){
        res = await api.getCommentList(param, this);
      }else if(type === 'stylist'){
        res = await api.getStylistList(param, this);
      }
      // let res = {data: [{ 
      //     [`${type}_name`]: 'ajksdfjosdjfisdjfl',
      //     [`${type}_img`]: [{url: "http://admin-1256953590.cos.ap-shanghai.myqcloud.com/1547108788492icon_fanhui%402x.png"}],
      //     [`${type}_time`]: [1, 3], 
      //     comment_level: 2,
      //     appoinment_time: ['2018/11/11 12:11:32'],
      //     detailList: [{ service_id: 10, service_name: 'ssdkflskfjf4', price: 12 },{ service_id: 12, service_name: 'ssdkflskfjf4', price: 12 } ],
      //   }]};

      if(res && res.data){
        res.data.forEach(this.format_1);

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
      if(this.type_1 === 'stylist'){
        let res = await api.deleteStylist(item.goods_commonid, null, this);
      }

      this.getList_1(this.type_1);
    },

    // judge Stylist/发型师上下架
    async judge_1(item){
      let param = { 
        goods_commonid: [ item.goods_commonid ],
        type: item.goods_state == 1 ? 'offline' : 'online'
      };
      // return console.error(/);

      let res = await api.updateStylistState(item.goods_commonid, param, this);

      this.getList_1(this.type_1);
    },
  },

}