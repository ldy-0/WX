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
    <el-button type="primary" icon="el-icon-edit" @click="toAddClass">添加题库</el-button>

    <el-dialog title="题库" :visible.sync="dialogFormVisible">
        <el-form  class="el-form">
            <el-form-item label="题库">
                <el-input v-model="name" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
            <el-button type="primary" v-if="!isAdd" @click="yesClass">添 加</el-button>
            <el-button type="primary" v-if="isAdd" @click="editClass">确定修改</el-button>
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
        label="题库" 
        prop="class"
        >
      </el-table-column>
      <el-table-column
        label="操作" 
        >
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="toEdit(scope.$index)">修改名称</el-button>
          <!-- <el-button size="mini" type="info" @click="toEdit(scope.$index)">编辑</el-button> -->
          <el-button size="mini" type="danger" @click="toDelete(scope.$index)">删  除</el-button>
        <!-- <el-dropdown  @command="toCheckEdit(scope.$index)"> -->
        <el-dropdown  @command="toCheckEdit">
            <el-button type="primary" size="mini">
              编 辑<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="up">单独上传</el-dropdown-item>
              <el-dropdown-item command="check">从列表选择</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <el-dialog
            title="单独上传"
            :visible.sync="dialogUP"
            width="30%">

            <el-form :model="form" class="el-form">
            <el-form-item label="题目">
                <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="分类" >
            <el-select v-model="form.value" value-key="id" placeholder="请选择">
                <el-option v-for="item in options" :label="item.label" :key="item.id"  :value="item"></el-option>
            </el-select>
            </el-form-item>

            <el-button type="primary" @click="isAddAws = true">添加答案</el-button>
            <div style="width:20px;height: 30px;"></div>

            <el-form-item label="答案一" >
                <el-input v-model="form.awsA" auto-complete="off"></el-input>
                <!-- <i class="el-icon-delete"></i> -->
            </el-form-item>

            <el-form-item label="答案二" >
                <el-input v-model="form.awsB" auto-complete="off"></el-input>
                <!-- <i class="el-icon-delete"></i> -->
            </el-form-item>

            <el-form-item label="答案三" >
                <el-input v-model="form.awsC" auto-complete="off"></el-input>
                <!-- <i class="el-icon-delete"></i> -->
            </el-form-item>

            <el-form-item label="答案四" v-if="isAddAws">
                <el-input v-model="form.awsD" auto-complete="off">
                  <el-button slot="append" icon="el-icon-error" @click="toClose"></el-button>
                </el-input>
                <!-- <i class="el-icon-delete"></i> -->
            </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogUP = false">取 消</el-button>
                <el-button type="primary" @click="dialogUP = false">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="提示"
            :visible.sync="dialogCheck"
            width="30%">

            <span>dialogCheckdialogCheckdialogCheckdialogCheck</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogCheck = false">取 消</el-button>
                <el-button type="primary" @click="dialogCheck = false">确 定</el-button>
            </span>
        </el-dialog>

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
      isAddAws: false,

      dialogUP: false,
      dialogCheck: false,

      editId: null,
      dialogFormVisible: false,
      isAdd: false,
      name: "",
      formLabelWidth: "100px",
      form: {
        name: "",
        value: {id:0,label:"未选择"},
        awsA: "",
        awsB: "",
        awsC: "",
        awsD: ""
      },
      options: [
        {
          id: 121,
          label: "语文"
        },
        {
          id: 2,
          label: "数学"
        },
        {
          id: 3,
          label: "科学"
        },
        {
          id: 4,
          label: "生活"
        },
        {
          id: 5,
          label: "音乐"
        }
      ],

      tableData: [
        { class: "语文", id: 0 },
        { class: "科学", id: 2 },
        { class: "生活", id: 9 },
        { class: "外语", id: 3 }
      ]
    };
  },
  methods: {
    toClose: function() {
      //答案四关闭
      this.isAddAws = false;
      this.form.awsD = "";
    },
    toCheckEdit: function(command) {
      console.log("command", command);
      if (command === "up") {
        this.dialogUP = true;
      } else {
        this.dialogCheck = true;
      }
    },
    toAddClass: function() {
      this.dialogFormVisible = true;
      this.isAdd = false;
      this.name = "";
    },
    yesClass: function() {
      console.log(this.name);
      this.tableData.push({ class: this.name, id: this.tableData.length });
      this.dialogFormVisible = false;
    },
    editClass: function() {
      console.log("editClassID", this.editId);
      this.tableData[this.editId].class = this.name;
      this.dialogFormVisible = false;
    },
    toDelete: function(id) {
      // console.log(this.tableData[id].class);
      this.tableData.splice(id, 1);
    },
    toEdit: function(id) {
      this.editId = id;
      this.dialogFormVisible = true;
      this.isAdd = true;
      this.name = this.tableData[id].class;
    }
  }
};
</script>