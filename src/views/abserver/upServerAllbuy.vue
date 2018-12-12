<style lang="stylus">
.notice {
  .header {
    margin-top: 20px;
  }
}

.graphic {
  border: solid #d5dbe7 1px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 30px 0;
  width: 60%;
}

.grade-txt {
  font-size: 20px;
  padding-left: 20px;
}
</style>

<template>
  <div>
    <!-- 编辑和添加共用 -->
    <el-dialog title="添加团购商品" :visible.sync="addNewShow" width="80%">
      <el-container class="notice">
        <el-header class="header">
          <el-form :inline="true" :model="formInline" class="form">
            <el-form-item>
              <el-input style="width: 340px;" placeholder="请输入商品名称、编码" v-model="listQuery2.search"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="search2">查询</el-button>
            </el-form-item>
            <el-form-item label="分类" :label-width="formLabelWidth">
              <el-select v-model="listQuery2.storegc_id" placeholder="请选择">
                <el-option
                  v-for="item in industryList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-header>
        <el-container>
          <el-main>
            <el-table
              :data="tableData2"
              stripe
              v-loading="listLoading"
              element-loading-text="给我一点时间"
              style="width: 100%"
            >
              <el-table-column label="商品图片">
                <template slot-scope="scope">
                  <div style="width:100px;height:100px;align-items:center;display:flex;">
                    <img :src="scope.row.goodsImage" alt style="width:100px">
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="商品名" prop="goodsName"></el-table-column>
              <el-table-column label="类型" prop="is_virtualTXT"></el-table-column>
              <el-table-column label="编号" prop="goodsNum"></el-table-column>
              <el-table-column label="价格" prop="goodsPrice"></el-table-column>
              <el-table-column label="操作" min-width="300px">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="editItem(scope.$index, scope.row)"
                  >选择</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
        <el-footer>
          <el-pagination
            background
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
            :current-page="listQuery2.page"
            :page-sizes="[10,20,30, 50]"
            :page-size="listQuery2.limit"
            layout="total, sizes, prev, pager, next"
            :total="total2"
          ></el-pagination>
        </el-footer>
      </el-container>
    </el-dialog>
    <el-dialog
        :title="QisAddItem?'新增团购':'团购详情'"
        :visible.sync="QaddNewShow"
        width="90%"
        append-to-body
      >
        <el-form :model="QformForNotive" ref="qruleForm" :rules="Qrules">
          <el-row style="margin-bottom:20px">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-form-item label="商品名字" :label-width="formLabelWidth">
                  <p class="hbs-no-margin-p">{{QformForNotive.goods_name}}</p>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-form-item label="商品价格" :label-width="formLabelWidth">
                  <p class="hbs-no-margin-p">{{QformForNotive.goods_price}}</p>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <div class="grid-content bg-purple">
              <el-form-item label="商品图片" :label-width="formLabelWidth">
                <img :src="QformForNotive.goods_image" alt="商品图" style="width:100px">
              </el-form-item>
            </div>
          </el-row>
          <el-form-item label="团购时限" :label-width="formLabelWidth" prop="group_limit_hour">
            <el-input
              v-model.number="QformForNotive.group_limit_hour"
              auto-complete="off"
              style="width: 200px"
              type="number"
              :disabled="!QisAddItem"
            ></el-input>小时
          </el-form-item>
          <el-form-item label="成团数量限制" :label-width="formLabelWidth" prop="group_limit">
            <el-input
              v-model.number="QformForNotive.group_limit"
              auto-complete="off"
              style="width: 200px"
              type="number"
              :disabled="!QisAddItem"
            ></el-input>个
          </el-form-item>
          <el-form-item label="限购量" :label-width="formLabelWidth" prop="limit">
            <el-input
              v-model.number="QformForNotive.limit"
              auto-complete="off"
              style="width: 200px"
              type="number"
              :disabled="!QisAddItem"
            ></el-input>
          </el-form-item>
          <el-form-item label="访问量" :label-width="formLabelWidth" prop="view">
            <el-input
              v-model.number="QformForNotive.view"
              auto-complete="off"
              style="width: 200px"
              type="number"
              :disabled="!QisAddItem"
            ></el-input>
          </el-form-item>
          <el-form-item label="分享数" :label-width="formLabelWidth" prop="view">
            <el-input
              v-model.number="QformForNotive.share"
              auto-complete="off"
              style="width: 200px"
              type="number"
              :disabled="!QisAddItem"
            ></el-input>
          </el-form-item>
          <!-- 这里添加动态图文个数开始 -->
          <el-form-item label="新增团购(最多设置五个等级团购，达到等级后自动升级)" label-width="360px" v-if="QisAddItem">
            <el-button size="mini" type="success" :disabled="!QisAddItem" @click="addGraphic()">添加</el-button>
          </el-form-item>
          
          <!-- 这里添加动态图文个数结束 -->
          <!-- 图文模块部分开始 -->
          <div
            v-for="(formItem,index) of QformForNotive.rank"
            :key="index"
            @click="getIndex(index)"
          >
            <el-form :model="formItem" :rules="Qrules">
              <el-row :gutter="20" class="graphic">
                <el-col :span="24">
                  <p class="grade-txt">团购等级{{index+1}}</p>
                  <div class="grid-content bg-purple">
                    <el-form-item label="团购价格" label-width="130px" prop="goods_price">
                      <el-input
                        v-model.number="formItem.goods_price"
                        type="number"
                        style="width: 200px"
                        autosize
                        placeholder="请输入团购价格"
                        :disabled="!QisAddItem"
                      ></el-input>元
                    </el-form-item>
                    <el-form-item label="团购人数" label-width="130px" prop="limit_num">
                      <el-input
                        v-model.number="formItem.limit_num"
                        type="number"
                        style="width: 200px"
                        autosize
                        placeholder="请输入团购人数"
                        :disabled="!QisAddItem"
                      ></el-input>人
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                    <el-form-item label="团购赠品(1张)" label-width="130px" prop="gift_images">
                      <el-upload
                        action
                        list-type="picture-card"
                        accept="image/*"
                        :limit="1"
                        :auto-upload="false"
                        :file-list="formItem.gift_images"
                        :on-change="handleImgChange_detail"
                        :on-remove="handleRemove_detail"
                        :disabled="!QisAddItem"
                      >
                        <i class="el-icon-plus"></i>
                      </el-upload>
                    </el-form-item>
                    <el-form-item label="文字介绍" label-width="130px" prop="gift_title">
                      <el-input
                        v-model="formItem.gift_title"
                        type="textarea"
                        autosize
                        placeholder="请输入内容"
                        :disabled="!QisAddItem"
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>

                <el-col :span="24" style="margin-left: 130px;" v-if="QisAddItem">
                  <div>
                    <el-button type="danger" @click="deleteModule(index)">删除</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer" v-if="QisAddItem">
          <el-button @click="QaddNewShow=false">取消</el-button>
          <el-button
            type="primary"
            @click="QaddOne('ruleForm')"
            :disabled="QwaitAddNotice"
          >确 定</el-button>
        </span>
      </el-dialog>
    <el-container class="notice">
      <el-header class="header">
        <el-form :inline="true" :model="formInline" class="form">
          <el-form-item>
            <el-button type="primary" icon="el-icon-edit-outline" @click="addItem">添加团购商品</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <el-table
          :data="tableData"
          stripe
          v-loading="listLoading"
          element-loading-text="给我一点时间"
          style="width: 100%"
        >
          <el-table-column label="商品图片">
            <template slot-scope="scope">
              <div style="width:100px;height:100px;align-items:center;display:flex;">
                <img :src="scope.row.image" alt style="width:100px">
              </div>
            </template>
          </el-table-column>
          <el-table-column label="ID" prop="id"></el-table-column>
          <el-table-column label="商品名" prop="name"></el-table-column>
          <el-table-column label="价格" prop="price"></el-table-column>
          <el-table-column label="操作" min-width="300px">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="Headdetails(scope.$index, scope.row)">详情</el-button>
              <el-button size="mini" type="danger" @click="deleteItem(scope.$index, scope.row)">取消团购</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listQuery.page"
          :page-sizes="[10,20,30, 50]"
          :page-size="listQuery.limit"
          layout="total, sizes, prev, pager, next"
          :total="total"
        ></el-pagination>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
// getList 接口 获取
// addNotice 接口 添加
import {
  getGoodsList_api,
  getAllBuyList_api,
  addAllBuy_api,
  getEntryList_api,
  editAllBuy_api,
  deleteAllBuy_api
} from "@/api/seller";
import uploadFn from "@/utils/aahbs";
const QformForNotive = {
  id: "",
  goods_name: "",
  goods_price: "",
  goods_image: "",
  group_limit_hour: "",
  group_limit: "",
  limit: "",
  view: "",
  share: "",
  rank: [
    {
      goods_price: "",
      limit_num: "",
      gift_images: [],
      gift_title: ""
    }
  ]
};

export default {
  data() {
    return {
      // out Q
      // out
      QrulesChild: {},
      QisAddItem: false,
      QwaitAddNotice: false,
      QaddNewShow: false,
      QformForNotive: Object.assign({}, QformForNotive),
      Qrules: {
        price: [
          {
            required: true,
            message: "请输入价格,不少于0",
            trigger: "blur",
            min: 0,
            type: "number"
          }
        ],
        goods_price: [
          {
            required: true,
            message: "请输入价格,不少于0",
            trigger: "blur",
            min: 0,
            type: "number"
          }
        ],
        limit: [
          {
            required: true,
            message: "限购量,不少于0",
            trigger: "blur",
            min: 0,
            type: "number"
          }
        ],
        limit_num: [
          {
            required: true,
            message: "请输入团购人数,不少于2",
            trigger: "blur",
            min: 2,
            type: "number"
          }
        ],
        group_limit_hour: [
          {
            required: true,
            message: "团购小时数",
            trigger: "blur",
            min: 1,
            type: "integer"
          }
        ],
        group_limit: [
          {
            required: true,
            message: "成团数量限制不少于1",
            trigger: "blur",
            min: 1,
            type: "integer"
          }
        ]
      },

      Q_outData: "",
      Q_Aid: "",

      Qlistshow: false,
      inline: true,
      QtableData: [],
      QlistLoading: false,
      QlistQuery: {
        page: 1,
        limit: 10,
        search: "",
        time: ""
      },
      Qtotal: 1,
      //out
      addNewShow: false,
      formInline: {},
      listQuery2: {
        page: 1,
        limit: 10,
        search: "",
        time: ""
      },
      total2: 1,
      tableData2: [
        {
          goodsImage: "",
          goodsName: "",
          goodsType: "",
          goodsNum: "",
          goodsState: "",
          goodsPrice: "",
          goodsTotal: "",
          goodsSell: ""
          //   opera: '查看123'
        },
        {
          goodsImage: "",
          goodsName: "",
          goodsType: "",
          goodsNum: "",
          goodsState: "",
          goodsPrice: "",
          goodsTotal: "",
          goodsSell: ""
          //   opera: '查看123'
        }
      ],
      listLoading2: false,
      dialogImageUrl: "",
      imgLimit1: 1,
      dialogVisible: false,
      fileList1: [
        {
          url: ""
        }
      ],
      fileList2: [
        {
          url: ""
        }
      ],
      industryList: [],

      isAddItem: true,
      waitAddNotice: false,
      // ---------------------
      formForNotive: {
        name: "奥术大师",
        value: "100"
      },
      addNewShow: false,
      formLabelWidth: "120px",
      //header
      industry: "",
      formInline: {},
      // body
      listLoading: false,
      tableData: [
        {
          image: "",
          goodsName: "",
          goodsPrice: ""
        }
      ],
      // footer
      listQuery: {
        page: 1,
        limit: 20,
        search: "",
        time: ""
      },
      total: 1,
      //动态模块当前索引
      moddele_idx: "",
      goodsList: []
    };
  },
  async created() {
    await this.getindustryList(); //自定义分类
    this.getList();
  },
  methods: {
    // Q
    //获取当前模块索引值
    getIndex(index) {
      this.moddele_idx = index;
    },
    HeditItem(row) {
      this.QisAddItem = true
      this.QformForNotive = Object.assign({}, QformForNotive);
      this.QformForNotive.goods_name = row.goodsName;
      this.QformForNotive.goods_price = row.goodsPrice;
      this.QformForNotive.goods_image = row.goodsImage;
      this.QformForNotive.id = row.id;
      this.QaddNewShow = true;
    },
    Headdetails(index, row) {
      let detail = this.goodsList[index];
      this.QformForNotive = Object.assign({}, QformForNotive);
      this.QformForNotive = {
        id: row.id,
        goods_name: row.name,
        goods_price: row.price,
        goods_image: row.image,
        group_limit_hour: detail.group_limit_hour,
        group_limit: detail.group_limit,
        limit: detail.limit,
        view: detail.view,
        share: detail.share,
        rank: detail.rank
      };
      this.QisAddItem = false
      this.QaddNewShow = true;
    },
    //添加图片模块
    addGraphic() {
      this.QformForNotive = Object.assign({}, this.QformForNotive);
      if (this.QformForNotive.rank.length >= 5) {
        this.$notify({
          title: "失败",
          message: "最多设置五个等级团购",
          type: "error"
        });
      } else {
        this.QformForNotive.rank.push({
          goods_price: "",
          limit_num: "",
          gift_images: [],
          gift_title: ""
        });
      }
    },
    //删除某个图文模块
    deleteModule(idx) {
      this.QformForNotive = Object.assign({}, this.QformForNotive);
      this.QformForNotive.rank.splice(idx, 1);
    },
    //加图
    async handleImgChange_detail(file, fileLis) {
      let imgurl = await uploadFn(file.raw);
      console.log(imgurl);
      this.QformForNotive.rank[this.moddele_idx].gift_images.push({
        url: imgurl[0]
      });
    },
    //删图
    handleRemove_detail(file, fileList) {
      let that = this;
      setTimeout(function() {
        that.QformForNotive.rank[that.moddele_idx].gift_images.splice(0, 1);
      }, 50);
    },
    // out Q
    // out
    async QaddOne() {
      this.QeditOne();
    },
    async QeditOne() {
      let res = await new Promise((res, rej) => {
        this.$refs["qruleForm"].validate(valid => {
          if (valid) {
            res(true);
          } else {
            res(false);
          }
        });
      });
      if (!res) {
        return;
      }
      this.QwaitAddNotice = true;

      let sendData = {
        goods_commonid: this.QformForNotive.id,
        group_limit_hour: this.QformForNotive.group_limit_hour,
        rank: this.QformForNotive.rank,
        view: this.QformForNotive.view,
        limit: this.QformForNotive.limit,
        share: this.QformForNotive.share,
        group_limit: this.QformForNotive.group_limit
      };
      editAllBuy_api(sendData)
        .then(data => {
          if (data && data.status === 0) {
            this.$notify({
              title: "成功",
              message: "操作成功",
              type: "success"
            });
            this.getList();
            this.QaddNewShow = false;
            this.addNewShow = false;
          } else {
            this.$notify({
              title: "失败",
              message: data.error,
              type: "error"
            });
          }
        })
        .catch(e => {
          console.error("manageShop:editAllBuy_api 接口错误");
        });
    },
    QdeleteAA(index) {
      this.QformForNotiveChildList.splice(index, 1);
    },
    QaddAA() {
      this.QformForNotiveChildList.push({});
    },
    // head
    QaddItem() {
      //显示 弹框
      this.QisAddItem = true;
      this.QaddNewShow = true;
      this.QformForNotive = Object.assign({}, QformForNotive);
    },
    // body

    QgetList() {
      this.QlistLoading = true;
      let sendData = Object.assign({}, this.QlistQuery);
      sendData.id = this.Q_Aid;
      getQList_api(sendData)
        .then(response => {
          if (response && response.status == "success") {
            let result = response.result;
            let tempTableData = [];
            result.forEach(aData => {
              tempTableData.push({
                id: aData.examinationId, //试卷id
                QID: aData.id, //题目id
                title: aData.title, //问题
                order: aData.order, //序号
                answer: aData.answer //答案
              });
            });
            this.QtableData = tempTableData;
          }
          // this.list = response
          this.Qtotal =
            response.paging && response.paging.total
              ? response.paging.total
              : 0;
          this.QlistLoading = false;
        })
        .catch(e => {
          console.error(e);
          this.QlistLoading = false;
        });
    },
    QeditItem(index, rowData) {
      // this.editLoading = true
      this.QformForNotive = Object.assign({}, rowData);
      let answerList = JSON.parse(rowData.answer);
      this.QformForNotiveChildList = Object.assign([], answerList);
      this.QisAddItem = false;
      this.QaddNewShow = true;
    },
    QdeleteNewNotice(id, QID) {
      let sendData = {
        examinationId: id,
        questionId: QID // 父亲(外层)id
      };
      deleteQOne_api(sendData)
        .then(res => {
          if (res && res.status === "success") {
            this.$notify({
              title: "成功",
              message: "操作成功",
              type: "success"
            });
            this.QgetList();
          } else {
            this.$notify({
              title: "错误",
              message: "操作失败",
              type: "error"
            });
          }
        })
        .catch(err => {
          console.error("deleteAdmin_api");
        });
    },
    QdeleteItem(index, row) {
      let QID = row.QID;
      let id = row.id;
      this.$confirm(`此操作将删除该条目, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.QdeleteNewNotice(id, QID);
        })
        .catch(() => {
          this.$notify.info({
            title: "消息",
            message: "已取消"
          });
        });
    },
    Qsave() {},
    // foot
    QhandleSizeChange(val) {
      this.QlistQuery.limit = val;
      this.getList();
    },
    QhandleCurrentChange(val) {
      this.QlistQuery.page = val;
      this.getList();
    },

    search2() {
      this.listQuery2.page = 1;
      this.getList2();
    },
    handleSizeChange2(val) {
      this.listQuery2.limit = val;
      this.getList2();
    },
    handleCurrentChange2(val) {
      this.listQuery2.page = val;
      this.getList2();
    },
    //out
    getindustryList() {
      return new Promise((res, rej) => {
        getEntryList_api({ limit: 0 })
          .then(data => {
            if (data.status === 0) {
              let tempData = [{ label: "全部分类", value: null }];
              for (let i = 0, len = data.data.length; i < len; i++) {
                tempData.push({
                  label: data.data[i].storegc_name,
                  value: data.data[i].storegc_id
                });
              }
              this.industryList = tempData;
              res();
            } else {
              console.error("manageShop:getEntryList_api 状态码为1");
              rej(data);
            }
          })
          .catch(e => {
            console.error("manageShop:getEntryList_api 接口错误");
            rej();
          });
      });
    },
    addDetailItem() {
      this.formForNotive.goodsDetail.push({
        fileList: [],
        title: "xxx",
        content: "cccxxx"
      });
    },
    //file upload
    onsuccess() {
      console.log("sucess----", arguments);
    },
    beforere() {
      console.log("beforere----", arguments);
    },
    beforeup() {
      console.log("beforeup----", arguments);
    },
    remove() {
      console.log("remove----", arguments);
    },
    change() {
      console.log("change----", arguments);
    },
    preview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log("preview----", arguments);
    },

    getList_detail() {
      console.log("getList_detail 暂时留白");
    },
    handleSizeChange_detail(val) {
      this.listQuery_detail.limit = val;
      this.getList_detail();
    },
    handleCurrentChange_detail(val) {
      this.listQuery_detail.page = val;
      this.getList_detail();
    },
    addNewNotice() {
      this.waitAddNotice = true;
      setTimeout(() => {
        //发送成功该做的事情
        this.waitAddNotice = false;
        this.addNewShow = false;
        this.form = {};
        this.$notify({
          title: "发送成功",
          message: "这是一条成功的提示消息",
          type: "success"
        });
        //如果失败
        // this.waitAddNotice = false
      }, 2000);
    },
    addItem() {
      this.isAddItem = true;
      this.addNewShow = true;
      this.QformForNotive = Object.assign({}, QformForNotive);
      this.getList2();
    },

    getList2() {
      this.listLoading2 = true;
      let sendData = Object.assign({}, this.listQuery2);
      sendData.goods_state = 1;
      sendData.is_pintuan = 0;
      getGoodsList_api(sendData)
        .then(response => {
          // 这里由于结构做了调整，导致编辑页面需要的数据无法从列表获取，这里只需要给tableData额外传一个id
          if (response && response.status == 0) {
            let result = response.data;
            let tempTableData = [];
            result.forEach(aData => {
              let temp_fileList1 = [];
              let temp_fileList2 = [];
              if (aData.goods_image) {
                temp_fileList1.push({ url: aData.goods_image });
              }
              if (aData.id_card_front) {
                temp_fileList2.push({ url: aData.id_card_front });
              }
              if (aData.id_card_behind) {
                temp_fileList2.push({ url: aData.id_card_behind });
              }
              // goodstotal 库存 前后端不一致 需要特殊处理
              let goodsTotal = 0;
              if (aData.spec_name === "one") {
                goodsTotal = aData.goods_storage;
              } else {
                goodsTotal = aData.goods_storage;
              }
              //对  mutil类型的表单 处理

              // ！！！！！这里暂停工作 因为暂时没有接口

              tempTableData.push({
                //后端生成
                id: aData.goods_commonid,
                isUp: aData.goods_state,
                //前后统一
                goodsImage: aData.goods_image, //显示
                goodsType: aData.is_appoint ? 1 : 0,
                is_virtualTXT: aData.is_virtual ? "虚拟" : "实体", //显示补充，实际无用
                goodsName: aData.goods_name, //显示
                goodsPrice: aData.goods_price, //显示
                goodsNum: aData.goods_serial //显示
              });
            });
            this.tableData2 = tempTableData;
            this.total2 =
              response.pagination && response.pagination.total
                ? response.pagination.total
                : 1;
          } else {
          }
          // this.list = response
          this.listLoading2 = false;
        })
        .catch(e => {
          this.listLoading2 = false;
        });
    },
    //body
    editNewNotice(id) {
      let sendData = {
        goods_commonid: id,
        pin_token: "join"
      };
      addAllBuy_api(sendData)
        .then(res => {
          if (res && res.status === 0) {
            this.$notify({
              title: "成功",
              message: "操作成功",
              type: "success"
            });
            this.getList();
          } else {
            this.$notify({
              title: "错误",
              message: "操作失败",
              type: "error"
            });
          }
        })
        .catch(err => {
          console.error("addAllBuy_api");
        });
    },

    editItem(index, row) {
      this.HeditItem(row); //弹出表单
    },
    deleteNewNotice(id) {
      let sendData = {
        goods_commonid: id,
        pin_token: "wipe"
      };
      deleteAllBuy_api(sendData)
        .then(res => {
          if (res && res.status === 0) {
            this.$notify({
              title: "成功",
              message: "操作成功",
              type: "success"
            });
            this.getList();
          } else {
            this.$notify({
              title: "错误",
              message: "操作失败",
              type: "error"
            });
          }
        })
        .catch(err => {
          console.error("deleteAdmin_api");
        });
    },
    deleteItem(index, row) {
      let id = row.id;
      this.$confirm(`此操作将删除该条目, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteNewNotice(id);
        })
        .catch(() => {
          this.$notify.info({
            title: "消息",
            message: "已取消"
          });
        });
    },
    searchByDate() {
      if (
        !this.dataRange ||
        !this.dataRange.length ||
        this.dataRange.length !== 2
      ) {
        return console.log("日期错误");
      }
      let dateS = this.dataRange[0];
      let dateE = this.dataRange[1];
      let Sstr =
        dateS.getFullYear() +
        "-" +
        (dateS.getMonth() + 1 > 9
          ? dateS.getMonth() + 1
          : "0" + dateS.getMonth()) +
        "-" +
        (dateS.getDate() + 1 > 9 ? dateS.getDate() + 1 : "0" + dateS.getDate());
      let Estr =
        dateE.getFullYear() +
        "-" +
        (dateE.getMonth() + 1 > 9
          ? dateE.getMonth() + 1
          : "0" + dateE.getMonth()) +
        "-" +
        (dateE.getDate() + 1 > 9 ? dateE.getDate() + 1 : "0" + dateE.getDate());
      this.listQuery.time = Sstr + "," + Estr;
      this.listQuery.page = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    getList() {
      this.listLoading = true;
      let sendData = Object.assign({}, this.listQuery);
      sendData.rank = 1;
      getAllBuyList_api(sendData)
        .then(response => {
          // 这里由于结构做了调整，导致编辑页面需要的数据无法从列表获取，这里只需要给tableData额外传一个id
          if (response && response.status == 0) {
            let result = response.data;
            this.goodsList = result;
            let tempTableData = [];
            result.forEach(aData => {
              tempTableData.push({
                //后端生成
                id: aData.goods_commonid,
                image: aData.goodscommon.goods_image,
                name: aData.goodscommon.goods_name,
                price: aData.goodscommon.goods_price
              });
            });
            this.tableData = tempTableData;
            this.total =
              response.pagination && response.pagination.total
                ? response.pagination.total
                : 0;
          } else {
          }
          console.log("getAllBuyList_api", response);
          // this.list = response
          this.listLoading = false;
        })
        .catch(e => {
          this.listLoading = false;
        });
    }
  }
};
</script>