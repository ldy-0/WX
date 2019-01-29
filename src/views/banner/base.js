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
      isAdd: true, // Create Item Flag
      isShowForm: false, // Show Dialog Flag
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

      this.isShowForm = config.canSubmit = true; 
      this.isAdd = !item;

      config.classList = item ? config.updateList || config.addList : config.addList;

      this.initForm(item);
    },
    hideForm(){ this.isShowForm = false; },
    change(v){
      this.param.page = v.page;
      this.param.limit = v.limit;
      this.getList();
    },
  },

  created(){ this.getList(); }
}