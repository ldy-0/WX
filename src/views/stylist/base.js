import customHead from '@/components/customHead'
import customTable from '@/components/customTable'
import customDialog from '@/components/customDialog'

export default {
  components: {
    customHead,
    customTable,
    customDialog,
  },

  data(){
    return {
      isShowForm: false,
      list: [],
      param: {
        page: 1,
        limit: 10,
      },
      total: 0,
      isLoading: false,
      name: 'base'
    }
  },

  methods: {
    showForm(item) {
      let config = this.dialogConfig;

      this.isShowForm = true; 
      this.isAdd = !item;

      config.classList = item ? config.updateList || config.addList : config.addList;
      this.initForm(item);
    },
    cancel(){ this.isShowForm = false; },
    change(v){
      this.param.page = v.page;
      this.param.limit = v.limit;
      this.getList();
    },
  },

  created(){ this.getList(); }
}