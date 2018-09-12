<style>
@import url("//unpkg.com/element-ui@2.4.6/lib/theme-chalk/index.css");
.div {
  margin: 20px;
  display: flex;
  flex-direction: column;
}
.el-div {
  /* margin: 20px; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-flow: nowrap;
}
.input-search {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 320px;
}

.el-form{
  width: 750px;    
}
.el-form-item{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: nowrap;
}
</style>

<template>
    <div class="div">
<div class="el-div">
    <el-button type="primary" icon="el-icon-edit" @click="dialogFormVisible = true">添加题目</el-button>
    <el-button type="primary" icon="document" @click="dialogFormVisible = true">批量导入</el-button>
    <el-button type="primary" icon="document" @click="handleDownload" :loading="downloadLoading">{{exportExcelStatus}}</el-button>

    <el-dialog title="添加题目" :visible.sync="dialogFormVisible">
        <el-form :model="form" class="el-form">
            <el-form-item label="题目">
                <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="分类" >
            <el-select v-model="form.value" value-key="id" placeholder="请选择">
                <el-option v-for="item in form.options" :label="item.label" :key="item.id"  :value="item"></el-option>
            </el-select>
            </el-form-item>

            <el-form-item label="答案一" >
                <el-input v-model="form.aws[0]" auto-complete="off" suffix-icon="el-icon-date"></el-input>
                <!-- <i class="el-icon-delete"></i> -->
            </el-form-item>

            <el-form-item label="答案二" >
                <el-input v-model="form.aws[1]" auto-complete="off"></el-input>
                <!-- <i class="el-icon-delete"></i> -->
            </el-form-item>

            <el-form-item label="答案三" >
                <el-input v-model="form.aws[2]" auto-complete="off"></el-input>
                <!-- <i class="el-icon-delete"></i> -->
            </el-form-item>

            <el-form-item label="答案四" >
                <el-input v-model="form.aws[3]" auto-complete="off"></el-input>
                <!-- <i class="el-icon-delete"></i> -->
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
    </el-dialog>
    <div style="width:20px;height: 30px;"></div>

    <div class="input-search">
        <el-input v-model="input" placeholder="题目搜索"></el-input>
        <div style="width:1px;height: 30px;"></div>
        <el-button slot="append" icon="el-icon-search"></el-button>
    </div>
    <div style="width:20px;height: 30px;"></div>

    <el-select v-model="select" slot="prepend" placeholder="请选择分类">
      <el-option label="餐厅名" value="1"></el-option>
      <el-option label="订单号" value="2"></el-option>
      <el-option label="用户电话" value="3"></el-option>
    </el-select>
        <div style="width:1px;height: 30px;"></div>
    <el-button slot="append" icon="el-icon-search"></el-button>

    </div>

<el-container class="notice">
<el-main>
    <el-table
      :data="tableData"
      stripe 
      v-loading="listLoading" element-loading-text="给我一点时间"
      style="width: 100%" >

      <el-table-column
        label="题目"
        prop="title"
        >
      </el-table-column>

      <el-table-column
        label="答案一" 
        prop="awsA"
        >
      </el-table-column>

        <el-table-column
        label="答案二"
        prop="awsB"
        >
      </el-table-column>
      <el-table-column
        label="答案三" 
        prop="awsC"
        >
      </el-table-column>

      <el-table-column
        label="答案四" 
        prop="awsD"
        >
      </el-table-column>
      <el-table-column
        label="分类" 
        prop="class"
        >
      </el-table-column>
      <el-table-column
        label="操作" 
        >
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="toEdit">编辑</el-button>
          <el-button size="mini" type="danger" @click="toDelete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
</el-main>
<!-- <el-footer>
  <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next" :total="total">
  </el-pagination>
</el-footer> -->
</el-container>
    </div>
    
</template>
<script>
export default {
  data() {
    return {
      //excel
      tableDataAll: "",
      autoWidth: true,
      filename: "实物订单Excel",
      exportExcelStatus: "导出",
      downloadLoading: false,

      dialogFormVisible: false,
      form: {
        name: "",
        options: [{
          id: '选项1',
          label: '黄金糕'
        }, {
          id: '选项2',
          label: '双皮奶'
        }, {
          id: '选项3',
          label: '蚵仔煎'
        }, {
          id: '选项4',
          label: '龙须面'
        }, {
          id: '选项5',
          label: '北京烤鸭'
        }],
        value:"",
        aws: []
      },
      formLabelWidth: "80px",

      input: "",
      tableData: [
        {
          title: "1111111",
          awsA: "1212",
          awsB: "qwqw",
          awsC: "21211",
          awsD: "12212",
          class: "212"
        },
        {
          title: "1111111",
          awsA: "1212",
          awsB: "qwqw",
          awsC: "21211",
          awsD: "12212",
          class: "212"
        }
      ]
    };
  },
  methods: {
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    async handleDownload() {
      this.downloadLoading = true;
      // let allRes = await this.getList(true).catch(e=>{
      //   this.$notify({
      //       title: '失败',
      //       message: '操作失败:'+e.toString(),
      //       type: 'error'
      //     })
      //   return 0
      // })
      // console.log('allRes',allRes)
      // if(!allRes){
      //   this.downloadLoading = false
      //   return console.log('获取数据失败:handleDownload')
      // }
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = [
          "订单ID",
          "订单金额",
          "订单号",
          "订单状态",
          "交易日期"
        ];
        const filterVal = ["id", "money", "num", "state", "time"];
        const tableDataAll = this.tableDataAll;
        const data = this.formatJson(filterVal, tableDataAll);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth
        });
        this.downloadLoading = false;
      });
    }
  }

  // foot
  //   handleSizeChange(val) {
  //     this.listQuery.limit = val;
  //     this.getList();
  //   },
  //   handleCurrentChange(val) {
  //     this.listQuery.page = val;
  //     this.getList();
  //   }
};
</script>