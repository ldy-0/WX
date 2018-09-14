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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
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
            <el-form-item label="题库">
                <el-select v-model="form.libName" value-key="id" placeholder="请选择">
                <el-option v-for="item in options" :label="item.label" :key="item.id"  :value="item.label"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="题库数量">
                <el-input v-model="libNum" :disabled="true" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="答题数量">
                <el-input v-model="form.awsNum" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="答题起止时间">
              <el-time-select
                placeholder="起始时间"
                v-model="form.startTime"
                :picker-options="{
                  start: '00:00',
                  step: '00:30',
                  end: '22:30'
                }">
              </el-time-select>
              <el-time-select
                placeholder="结束时间"
                v-model="form.endTime"
                :picker-options="{
                  start: '00:00',
                  step: '00:30',
                  end: '23:00',
                  minTime: form.startTime
                }">
              </el-time-select>
            </el-form-item>
            <el-form-item label="活动规则">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 5}"
                placeholder="请输入内容"
                v-model="form.rule">
              </el-input>
            </el-form-item>
            <el-form-item label="奖品">
              <div style="margin: 20px 0;"></div>
              <el-button @click="addDomain">新增</el-button>
              <div style="margin: 20px 0;"></div>
               <el-form-item
                  v-for="(domain, index) in form.domains"
                  
                  :key="domain.key"
                  :prop="'domains.' + index + '.value'"
                >
                  <el-input v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>
                  <div style="margin: 20px 0;"></div>

                  <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success="handUpSuccess">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                  <div style="margin: 20px 0;"></div>
              </el-form-item>

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
      dialogImageUrl: "",
      libNum: "",
      startEndTime: [
        new Date(2018, 9, 10, 8, 40),
        new Date(2018, 9, 10, 9, 40)
      ],
      editId: null,
      dialogFormVisible: false,
      dialogVisible: false,
      isAdd: false,
      form: {
        name: "",
        libName: "",
        awsNum: "",
        startTime: "",
        endTime: "",
        rule: "",
        domains: [
          {
            value: "",
            key: Date.now(),
            imageUrl: ""
          }
        ]
      },

      formLabelWidth: "150px",

      tableData: [
        { id: 0, name: "语文", time: "12:23 - 13:00", lib: "tikuyi" },
        { id: 2, name: "科学", time: "12:23 - 13:00", lib: "tikuyi" },
        { id: 9, name: "生活", time: "12:23 - 13:00", lib: "tikuyi" },
        { id: 3, name: "外语", time: "12:23 - 13:00", lib: "tikuyi" }
      ],
      
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
      urlArr: []
    };
  },
  methods: {
    toAddClass: function() {
      //新增房间入口
      this.dialogFormVisible = true;
      this.isAdd = false;
      this.form.name = "";
      this.form.libName = "";
      this.form.awsNum = "";
      this.form.startTime = "";
      this.form.endTime = "";
      this.form.rule = "";
      this.form.domains[0].value = "";
      this.form.domains[0].key = Date.now();
      this.form.domains[0].imageUrl = "";
      this.form.domains.splice(1, this.form.domains.length - 1);
    },
    yesClass: function() {
      //对话框下角的确定添加按钮
      console.log(this.form);
      this.tableData.push({
        lib: this.form.libName,
        id: this.tableData.length,
        name: this.form.name,
        time: this.form.startTime + " - " + this.form.endTime
      });
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
    },
    removeDomain(item) {
      //删除奖品选项
      var index = this.form.domains.indexOf(item);
      if (index !== -1) {
        this.form.domains.splice(index, 1);
      }
    },
    addDomain() {
      //添加奖品
      this.form.domains.push({
        value: "",
        key: Date.now(),
        imageUrl: ""
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handUpSuccess: function(response, file, fileList) {
      console.log(fileList[0].url);
      // var urlArr = [];
      this.urlArr.push(fileList[0].url);
      for (var i = 0; i < this.form.domains.length; i++) {
        this.form.domains[i].imageUrl = this.urlArr[i];
      }
    }
  }
};
</script>