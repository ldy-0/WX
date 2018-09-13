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
    <el-button type="primary" icon="el-icon-edit" @click="toAddSubject">添加题目</el-button>
    <el-button type="primary" icon="document" @click="toGetSubList">批量导入</el-button>
    <el-button type="primary" icon="document" @click="toExport">导出</el-button>

    <el-dialog title="添加题目" :visible.sync="dialogFormVisible">
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
        <div slot="footer" class="dialog-footer">
            <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
            <el-button type="primary" v-if="!isShowEdit"  @click="toYesAdd">确 定</el-button>
            <el-button type="primary" v-if="isShowEdit" @click="yesEdit">编 辑</el-button>
        </div>
    </el-dialog>
    <div style="width:20px;height: 30px;"></div>

    <div class="input-search">
        <el-input v-model="input" placeholder="题目搜索"></el-input>
        <div style="width:1px;height: 30px;"></div>
        <el-button slot="append" icon="el-icon-search"></el-button>
    </div>
    <div style="width:20px;height: 30px;"></div>

    <el-select v-model="classVal" value-key="id" placeholder="请选择">
      <el-option v-for="item in options" :label="item.label" :key="item.id"  :value="item"></el-option>
    </el-select>
        <div style="width:1px;height: 30px;"></div>
    <el-button slot="append" icon="el-icon-search"></el-button>

    </div>

<el-container class="notice">
<el-main>
    <el-table
      :data="tableData"
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
          <el-button size="mini" type="info" @click="toEdit(scope.$index)">编辑</el-button>
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
      isShowEdit: false, 
      editId: null,
      isAddAws: false,
      dialogFormVisible: false,
      form: {
        name: "",
        value: "",
        awsA: "",
        awsB: "",
        awsC: "",
        awsD: "",
      },
      classVal: "",
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
      formLabelWidth: "120px",

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
    toAddSubject: function() {
      this.dialogFormVisible = true;
      this.isShowEdit = false;
      this.form.name = "";
      this.form.value = "";
      this.form.awsA = "";
      this.form.awsB = "";
      this.form.awsC = "";
      this.form.awsD = "";
    },
    toYesAdd: function() {
      console.log(this.form.value.id);
      this.dialogFormVisible = false;
      this.tableData.push({
        title: this.form.name,
        awsA: this.form.awsA,
        awsB: this.form.awsB,
        awsC: this.form.awsC,
        awsD: this.form.awsD,
        class: this.form.value.label
      });
      console.log(this.tableData);
    },
    yesEdit:function(){
      this.dialogFormVisible = false;
      var edited = this.tableData[this.editId];
      edited.title = this.form.name;
      edited.class = this.form.value.label;
      edited.awsA = this.form.awsA;
      edited.awsB = this.form.awsB;
      edited.awsC = this.form.awsC;
      edited.awsD = this.form.awsD;
    },

    toGetSubList: function() {},
    toExport: function() {},

    toClose: function() {
      this.isAddAws = false;
    },
    toEdit(id) {
      this.editId = id;
      this.dialogFormVisible = true;
      this.isAddAws = true;
      this.isShowEdit = true;
      var list = this.tableData[id];
      this.form.name = list.title;
      this.form.value = list.class;
      this.form.awsA = list.awsA;
      this.form.awsB = list.awsB;
      this.form.awsC = list.awsC;
      this.form.awsD = list.awsD;
      console.log("class",this.form.value);
    },
    toDelete(id) {
      this.tableData.splice(id, 1);
    }
  }
};
</script>