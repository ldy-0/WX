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

.el-form {
  width: 750px;
}
.el-form-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: nowrap;
}
</style>

<template>
    <div class="div">
<div class="el-div">
    <el-button type="primary" icon="el-icon-edit" @click="toAddClass">新增房间</el-button>

    <el-dialog title="添加房间" :visible.sync="dialogFormVisible">
        <el-form  class="el-form" :model="form">
            <el-form-item label="房间名称">
                <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="房间名称">
                <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="房间名称">
                <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="房间名称">
                <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
            <el-button type="primary" v-if="!isAdd" @click="yesClass">添 加</el-button>
            <el-button type="primary" v-if="isAdd" @click="editClass">编 辑</el-button>
        </div>
    </el-dialog>
    <div style="width:20px;height: 30px;"></div>
    </div>

<el-container class="notice">
<el-main>
    <el-table
      :data="tableData"
      style="width: 100%" >
      <el-table-column
        label="房间名称" 
        prop="name"
        >
      </el-table-column>
      <el-table-column
        label="答题时间" 
        prop="time"
        >
      </el-table-column>
      <el-table-column
        label="选用题库" 
        prop="lib"
        >
      </el-table-column>
      <el-table-column
        label="操作" 
        >
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="toEdit(scope.$index)">编辑</el-button>
          <el-button size="mini" type="danger" @click="toStop(scope.$index)">停用</el-button>
          <el-button size="mini" type="danger" @click="toDelete(scope.$index)">删除</el-button>
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
      editId: null,
      dialogFormVisible: false,
      isAdd: false,
      form: [
          {name: "语文", time: "12:23", lib: "tikuyi"}
      ],

      formLabelWidth: "80px",

      tableData: [
        { id: 0, name: "语文", time: "12:23", lib: "tikuyi" },
        { id: 2, name: "科学", time: "12:23", lib: "tikuyi" },
        { id: 9, name: "生活", time: "12:23", lib: "tikuyi" },
        { id: 3, name: "外语", time: "12:23", lib: "tikuyi" }
      ]
    };
  },
  methods: {
    toAddClass: function() {
      //新增房间入口
      this.dialogFormVisible = true;
      this.isAdd = false;
      this.name = "";
    },
    yesClass: function() {
      //对话框下角的确定添加按钮
      console.log(this.name);
      this.tableData.push({ class: this.name, id: this.tableData.length });
      this.dialogFormVisible = false;
    },
    editClass: function() {
      //对话框确定编辑
      console.log("editClassID", this.editId);
      this.tableData[this.editId].class = this.name;
      this.dialogFormVisible = false;
    },
    toDelete: function(id) {
      //列表单条删除
      this.tableData.splice(id, 1);
    },
    toEdit: function(id) {
      // 列表单条编辑
      this.editId = id;
      this.dialogFormVisible = true;
      this.isAdd = true;
      this.name = this.tableData[id].class;
    },
    toStop: function(id) {
      //列表停用
      this.$message({
        showClose: true,
        message: "第" + id + "房间停止成功",
        type: "success"
      });
    }
  }
};
</script>