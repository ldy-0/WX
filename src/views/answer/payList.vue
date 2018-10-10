<style>
@import url("//unpkg.com/element-ui@2.4.6/lib/theme-chalk/index.css");
.div {
  margin: 20px;
  display: flex;
  flex-direction: column;
}
.el-div {
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
  width: 500px;
}
</style>
<template>
<div class="div">
    <div class="el-div">
    <el-button type="primary" icon="document" :loading="downloadLoading" @click="toExport">导出</el-button> 
    <div class="input-search">
        <div class="block">
            <el-date-picker
                  v-model="inputTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
            </el-date-picker>
        </div>
        <el-button slot="append" icon="el-icon-search" @click="searchTime"></el-button>
    </div>
    <div style="width:20px;height: 30px;"></div>
    <div class="input-search">
        <el-input v-model="inputRoomTitle" placeholder="房间名搜索"></el-input>
        <div style="width:1px;height: 30px;"></div>
        <el-button slot="append" icon="el-icon-search" @click="searchRoomTitle"></el-button>
    </div>
    </div>
<el-main>
    <el-table
      :data="tableData"
      style="width: 100%" >
      <el-table-column
        label="时间" 
        prop="addtime"
        >
      </el-table-column>
      <el-table-column
        label="金额" 
        prop="cost"
        >
      </el-table-column>
      <el-table-column
        label="用户" 
        prop="subscriber_name"
        >
      </el-table-column>
      <el-table-column
        label="联系方式" 
        prop="subscriber_phone"
        >
      </el-table-column>
      <el-table-column
        label="订单状态" 
        prop="order_type"
        >
      </el-table-column>
    </el-table>
</el-main>
</div>
</template>
<script>
export default {
  data() {
    return {
      downloadLoading: false,
      tableData: [
        {
          order_id: 7, //订单id
          subscriber_name: "微客立小苹果", //支付用户
          cost: 10, //支付金额
          subscriber_phone: "12345613010", //联系方式
          addtime: 3, //时间
          order_type: "已支付" //订单状态
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
    toExport: async function() {
      //导出
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = ["时间", "金额", "用户", "联系方式", "订单状态"];
        const filterVal = [
          "addtime",
          "cost",
          "subscriber_name",
          "subscriber_phone",
          "order_type"
        ];
        const tableDataAll = this.tableData;
        const data = this.formatJson(filterVal, tableDataAll);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "付费用户列表"
        });
        this.downloadLoading = false;
      });
    }
  }
};
</script>
