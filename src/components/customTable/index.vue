<template>
  <div>

    <el-table :data="data" stripe v-loading="isLoading" element-loading-text="给我一点时间" style="width: 100%" >

      <el-table-column :label="item.key" :prop="item.value" v-for='(item, index) in classList' :key='index'>
        <template slot-scope="scope">
          
          <img class='thumb_img' :src='scope.row[item.value]' v-if='item.isImg' />

          <div v-else-if='item.isIcon'>
            <i class='el-icon-check' v-if='scope.row[item.value]'></i>
            <i class='el-icon-close' v-else></i>
          </div>

          <div v-else>{{scope.row[item.value]}}</div>

        </template>
      </el-table-column>

      <el-table-column label="操作" v-if='config.showOperate'>
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="text" @click="showDialog(scope.$index, scope.row)" v-if='showEdit'>编辑</el-button> -->
          <el-button size="mini" type="text" 
                    @click="changeState(scope.$index, scope.row)" 
                    v-if="config.showDeliver && scope.row.order_state === '已支付'">{{scope.row.payment_name === '在线付款' ? '发货' : '结算'}}</el-button>
          <el-button size="mini" type="text" @click="showDetail(scope.$index, scope.row)" v-if='config.showDetail'>详情</el-button>
          <!-- <el-button size="mini" type="text" @click="showDeleteDialog(scope.$index, scope.row)" v-if='showDelete'>删除</el-button> -->
        </template>
      </el-table-column>

    </el-table>

    <el-pagination background @size-change="changeSize" @current-change="changePage" :current-page="query.page" :page-sizes="[10,2,30, 50]" :page-size="query.limit" layout="total, sizes, prev, pager, next" :total="total">
    </el-pagination>
    
  </div>
</template>

<script>
export default {
  name: 'customTable',

  props: {
    config: {
      type: Object,
      default: function() {
        return {
        }
      }
    },
    data: {
      type: Array,
    },
    classList: {
      type: Array,
    },
    isLoading: {
      type: Boolean,
    },
    total: {
      type: Number,
    }
  },

  data() {
    return {
      query: {
        limit: null,
        page: 1,
        keyWord: '',
      }
    }
  },
  
  methods: {
    showDetail(index, row){
      this.$emit('showDetail', row);
    },
    changeState(index, row){
      this.$emit('changeState', row);
    },
    changeSize(val){
      this.query.limit = val;
      this.$emit('change', this.query);
    },
    changePage(val){
      this.query.page = val;
      this.$emit('change', this.query);
    },
    init(){
      console.log('table init ...')
      this.query.page = 1;
      this.query.keyWord = '';
    }
  }
}
</script>

<style scoped>

</style>
