<template>
	<div class="app-container">
		<!--预览图片开始 -->
		<el-dialog :visible.sync="dialogVisible">
			<img style="height: 300px; width: 300px;" :src="dialogImageUrl" alt="">
		</el-dialog>
		<!--预览图片结束 -->
		<!--顶部菜单开始 -->
		<div class="filter-container">
			<el-input style="width: 340px;" placeholder="请输入手机号" v-model="listQuery.name"></el-input>
			<el-button type="primary" icon="el-icon-search" @click="tableListSearch()">查询</el-button>
		</div>
		<!--顶部菜单结束 -->
		<!--中间表格开始 -->
		<el-table :data="tableData" style="width: 100%">
			<el-table-column type="index" width="50">
			</el-table-column>
			<el-table-column label="用户头像">
				<template slot-scope="scope">
					<img :src="scope.row.member_avatar" style="width:50px;height: 50px;">
				</template>
			</el-table-column>
			<el-table-column label="昵称" prop="member_nickname">
			</el-table-column>
			<el-table-column label="手机号" prop="member_telephone">
			</el-table-column>
		</el-table>
		<!--中间表格结束 -->
		<!-- 表格分页开始 -->
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
		 :page-sizes="[10,20,30]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next" background>
		</el-pagination>
		<!--表格分页结束 -->
	</div>

</template>
<script>
// import { getMemberList_api } from "@/api/distribution";
export default {
  created() {
    //获取列表
    this.getMemberList();
  },
  data() {
    return {
      //会员列表
      tableData: [],
      //分页（请求参数）
      listQuery: {
        page: 1,
        limit: 10,
        name: ""
      },
      //图片预览弹框是否打开
      dialogVisible: false,
      //要预览的图片
      dialogImageUrl: "",
      //正在查询
      isloading: false
    };
  },
  methods: {
    //预览图片
    handlePictureCardPreview(file) {
      console.log(file);
      this.dialogImageUrl = file;
      this.dialogVisible = true;
    },
    //保存内容
    onSubmit(form) {},
    //改变每页条数
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getMemberList();
    },
    //选择哪一页
    handleCurrentChange(val) {
      console.log(val);
      this.listQuery.page = val;
      this.getMemberList();
    },
    //查询
    tableListSearch() {
      if (!this.listQuery.name) return;
      this.getMemberList();
    },
    //以下为api操作
    getMemberList() {
      let getData = Object.assign({}, this.listQuery);
      getMemberList_api(getData).then(res => {
        this.tableData = res.data;
      });
    }
  }
};
</script>
