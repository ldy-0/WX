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
    async initForm_2(item){
      let o = {},
          addList = this.dialogConfig_2.addList;

      // get Service
      let serviceList = await api.getServiceList(null, this);

      serviceList = serviceList.data;
      addList[addList.length - 1].list = serviceList;

      if(item){
        if(this.type_1 === 'stylist'){

          let goods = await api.getStylist(item.goods_commonid, { goodscommonId: item.goods_commonid}, this);

          this.detailList_2 = goods.SKUList.map(v => { 
            let id = null;

            // serviceList.forEach(service => { if(service.storegc_name === v.goods_spec) id = service.storegc_id });
            serviceList.forEach(service => { if(service.storegc_id == v.goods_spec) name = service.storegc_name });

            return { storegc_id: parseInt(v.goods_spec), storegc_name: name, price: v.goods_price, }; 

          });

          goods.detailList = this.detailList_2.map(v => v.storegc_id);

          // console.error('detail 2', this.detailList_2, goods.detailList);
          return this.formData_2 = this.format_2(goods);

        }else if(this.type_1 === 'comment'){

          return this.formData_2 = item;

        }

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
      let serviceList = this.dialogConfig_2.addList[this.dialogConfig_2.addList.length - 1].list,
          detailList = this.detailList_2,
          new_arr;

      detailList = detailList.filter(v => arr.indexOf(v.storegc_id) !== -1 );

      new_arr = arr.filter(id => !detailList.some(v => v.storegc_id === id));

      this.detailList_2 = detailList.concat(new_arr.map(v => { 
        let service_name;

        serviceList.forEach(service => { if(service.storegc_id === v) service_name = service.storegc_name });
        return { storegc_id: v, storegc_name: service_name, price: null }; 
      }));
      console.error(this.detailList_2);
    },
    // Edit Service/修改服务
    updateForm_1(item){
      let dateList = [
              { id: 1, value: '周一' }, 
              { id: 2, value: '周二' }, 
              { id: 3, value: '周三' },
              { id: 4, value: '周四' },
              { id: 5, value: '周五' },
              { id: 6, value: '周六' },
              { id: 7, value: '周日' },
      ];

      this.dialogConfig_2 = {
        width: '80%',    
        canSubmit: true,
        classList: [],
        addList: [
          { key: '设计师名字', value: 'goods_name', isText: true, },
          { key: '图片', value: 'goods_image', limit: 1, isImg: true, },
          { key: '工作时间', value: 'appoinment_day', isMultiSelect: true, id: 'id', name: 'value', list: dateList },
          { key: '可预约时间', value: 'appoinment_time', text: '添加时间', isMultiTime: true },
          { key: '签名', value: 'goods_body', isText: true, },
          { key: '价格', value: 'detailList', placeholder: '添加服务', isDetail: true, id: 'storegc_id', name: 'storegc_name', list: [] },
        ],
        rules: {
          'goods_name': [ 
            { required: true, message: '请输入设计师名字!', trigger: 'blur' },
            { message: '设计师名字必须是1~15位!', min: 1, max: 15 } 
          ],
          'appoinment_day': [ { required: true, message: '请选择营业时间!', trigger: 'change' }, ],
        }
      };
      this.detailRule_2 = {
        'price': [ 
          { required: true, message: '请输入价格!', trigger: 'blur' },
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
          { key: '头像', value: 'member_avatar', isImg: true },
          { key: '昵称', value: 'member_truename', isText: true },
          { key: '星级', value: 'score', isRate: true },
          { key: '门店', value: 'store_id', isSelect: true, id: 'store_id', name: 'store_name', list: [] },
          { key: '服务', value: 'storegc_id', isSelect: true, id: 'storegc_id', name: 'storegc_name', list: [] },
          // { key: '价格(¥)', value: 'price', isNumber: true },
          { key: '评论时间', value: 'add_time', dateType: 'datetime' },
          { key: '评论内容', value: 'content', isTexts: true, },
        ],
        // [
        //   { key: '头像', value: 'comment_img', isImg: true },
        //   { key: '昵称', value: 'comment_name', isText: true },
        //   { key: '星级', value: 'comment_level', isRate: true },
        //   { key: '门店', value: 'store_name', isSelect: true, id: 'id', name: 'store_name', list: [] },
        //   { key: '服务', value: 'service_name', isSelect: true, id: 'id', name: 'service_name', list: [] },
        //   { key: '价格(¥)', value: 'price', isNumber: true },
        //   { key: '评论时间', value: 'comment_time', dateType: 'datetime' },
        //   { key: '评论内容', value: 'comment_content', isTexts: true, },
        // ],
      }

      this.showForm_2(item); 
    },

    // Save Edit/保存修改
    async submit_2(imgs){
      let o = this.formData_2,
          param;

      this.dialogConfig_2.canSubmit = false;

      if(this.type_1 === 'service'){
        param = {
          service_name: o.service_name
        }
      }else if(this.type_1 === 'stylist'){

        if(!imgs.length) return this.showError('请选择图片');
        // Validate DetailList
        let o = this.formData_2,
            detailList = this.detailList_2,
            arr = this.$refs.detail || [],
            error = null;

        for(let i = 0, len = arr.length; i < len; i++){
          let res = await arr[i].validate();
          if(!res) return ;
        }

        error = detailList.some(v => v.price <= 0 ? true : false);
        if(error) return this.showError('价格必须大于零');

        if(!o.appoinment_time.length) return this.showError('请添加预约时间点');

        if(!detailList.length) return this.showError('请添加服务');

        param = {
          goods_name: o.goods_name,
          goods_image: imgs.map(v => JSON.stringify(v)),
          goods_body: o.goods_body,
          appointment_date: o.appoinment_day,
          // appointment_frame: o.appoinment_time.map(v => v.toString()),
          appointment_frame: o.appoinment_time.map(v => `${(v.getHours() < 10 ? '0' : '') + v.getHours()}:${(v.getMinutes() < 10 ? '0' : '') + v.getMinutes()}`),
          spec: detailList.map(v => { return { price: v.price, marketprice: v.price, sp_value: v.storegc_id, stock: 9e8 }; }),
          spec_value: detailList.map(v => v.storegc_name),
          goods_price: 0,
          marketprice: 0,
          goods_freight: 0,
        };

      }

      console.error(imgs, param);
      this.saveItem_2(param);
    },

    // util
    format_2(v){
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
      let res;

      if(this.type_1 === 'stylist'){
        res = this.isAdd_2 ? await api.setStylist(param, this) : await api.updateStylist(this.formData_2.goods_commonid, param, this);
      }

      this.isShowForm = false;
      this.dialogConfig_2.canSubmit = true;
      this.getList();
    },

    async deleteItem_2(item){
      let res = await api.deleteUser(item.admin_id, null, this);

      this.getList_2();
    },
  },

}