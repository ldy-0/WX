<style scoped>
page {
  background: #fff;
}

.container {
  font: 28rpx 'PingFang-SC-Regular';
}

.flex {
  display: flex;
  align-items: center;
}
.flex image {
  margin-left: 20rpx;
}

.arrow {
  width: 16rpx;
  height: 26rpx;
}

.icon {
  width: 30rpx;
  height: 30rpx;
  margin-right: 25rpx;
}

.slide_title{
  position: relative;
  padding: 30rpx 30rpx 10rpx;
}
.slide_ctn{
  padding: 20rpx 30rpx;
}

.border{
  border-bottom: 2rpx solid #e5e5e5;
}

.pt20{
  padding: 20rpx 0 0;
}
.img_wrap{
  position: relative;
  width: 116rpx;
  height: 116rpx;
  line-height: 116rpx;
  margin: 20rpx 0 0;
  border: 2rpx solid #ccc;
  border-radius: 2rpx;
  font-size: 96rpx;
  text-align: center;
}
.img{
  width: 116rpx;
  height: 116rpx;
  margin: 0 16rpx 0 0;
}
.i_close{
  position: absolute;
  top: 0;
  right: 0;
  width: 24rpx;
  height: 24rpx;
}

.goto_wrap{
  padding: 25rpx 0 20rpx;
}
.select_wrap{
  flex-grow: 1;
  margin-left: 10rpx;
}
.select{
  height: 48rpx; 
}

.slide_add_wrap{
  margin: 20rpx 0 0;
  justify-content: center; 
}
.add_wrap{
  width: 60rpx;
  height: 40rpx;
  margin-right: 4rpx;
  border-radius: 10rpx;
}
.i_add{
  width: 25rpx;
  height: 25rpx;
}

.submit_btn{
  width: 690rpx;
  height: 88rpx;
  margin: 300rpx auto 0;
  line-height: 88rpx;
  border-radius: 10rpx;
  font-size: 36rpx;
  text-align: center;
}

.slide_close{
  top: calc(50% - 12rpx);
  right: 20rpx;
}

.mt20{
  margin: 20rpx 0 0;
}

.s_fc_8{ color: #888; }
.s_fc_f{ color: #fff; }
.s_fc_c{ color: #CCC; }
.s_fc_35{ color: #353535; }

.s_bg_1{ background: #fff; }
.s_bg_f4{ background: #f4f4f4; }
.s_bg_10{ background: #4fb84a; }
</style>

<template>
  <view class="container">

    <view class=''>
      <repeat for="{{list}}">

        <view class='slide_title s_fc_35 s_bg_f4'>
          <view>{{title + (index + 1)}}</view>
          <image class='i_close slide_close' src='{{closeURL}}' @tap='delSlide({{index}})' />
        </view>
        <view class='slide_ctn s_bg_1'>
          <view class=''>
            <view class='s_fc_8'>上传图片</view>

            <view class='img_wrap' wx:if="{{item.img}}">
              <image class='img' src='{{item.img}}' mode='aspectFill' />
              <image class='i_close' src='{{closeURL}}' @tap="closeImg({{index}}, 0)" />
            </view>
            <view class='img_wrap s_fc_c' @tap='addImg({{index}}, 0)' wx:else>+</view>
          </view>

          <view class='goto_wrap border flex'>
            <view class='s_fc_8'>跳转页面</view>
            <view class='select_wrap'>
                <select class='select' :obj.sync='item' :list='goToList' @change.user='changeType'></select>
            </view>
          </view>

          <view class='pt20' wx:if="{{item.type === 'img'}}">
            <view class='s_fc_8'>跳转图片</view>

            <view class='img_wrap' wx:if="{{item.targetImg}}">
              <image class='img' src='{{item.targetImg}}' mode='aspectFill' />
              <image class='i_close' src='{{closeURL}}' @tap="closeImg({{index}}, 1)" />
            </view>
            <view class='img_wrap s_fc_c' @tap='addImg({{index}}, 1)' wx:else>+</view>
          </view>

          <view class='goto_wrap pt20 flex' style='align-items: flex-start;' wx:if="{{item.type === 'goods'}}">
            <view class='s_fc_8'>跳转商品</view>
            <view class='select_wrap'>
              <firstClassSelect class='select' key='firstClass' :index.sync='index' :obj.sync='item' :list.sync='firstClassList' @change.user='changeFirstClass'></firstClassSelect>
              <twoClassSelect class='select mt20' key='twoClass' :index.sync='index' :obj.sync='item' :list.sync='twoClassList' @click.user='updateTwoClass' @change.user='changeTwoClass'></twoClassSelect>
              <thirdClassSelect class='select mt20' key='thirdClass' :index.sync='index' :obj.sync='item' :list.sync='thirdClassList' @click.user='updateThirdClass' @change.user='changeThirdClass'></thirdClassSelect>
              <goodsSelect class='select mt20' key='goods' :index.sync='index' :obj.sync='item' :list.sync='goodsList' @click.user='updateGoods' @change.user='changeGoods'></goodsSelect>
            </view>
          </view>

        </view>

      </repeat>

      <view class='slide_add_wrap flex s_fc_35'>
        <view class='add_wrap s_bg_10' @tap='addSlide'>
          <image class='i_add' src='../../../images/card/add.png' />
        </view>
        <view class='' @tap='addSlide'>添加轮播</view>
      </view>

      <view class='submit_btn s_bg_10 s_fc_f' @tap='submit'>保存</view>
    </view>


  </view>
</template>

<script>
import wepy from "wepy";
import select from "../../../components/select";
import { shttp } from "../../../utils/http";
import mp from "../../../utils/wx";

export default class Mine extends wepy.page {
  config = {
    navigationBarTitleText: "轮播图管理"
  };
  data = {
    addImgUrl: '../../../images/order/upload.png',
    closeURL: '../../../images/order/close.png',
    title: '轮播图',
    imgConfig: {
      url: 'https://up-z2.qiniup.com',
      cdnUrl: 'https://cdn.health.healthplatform.xyz/',
      body: {}
    },
    list: [],
    goToList: [
      { title: '不跳转', type: 'none' },
      { title: '跳转图片', type: 'img', img: '' },
      { title: '跳转商品', type: 'goods' },
    ],
    classObj: {},
    firstClassList: [],
    twoClassList: [],
    thirdClassList: [],
    goodsList: [],
    memberInfo: null,
    clicked: false,
  };

  components = {
    select,
    firstClassSelect: select,
    twoClassSelect: select,
    thirdClassSelect: select,
    goodsSelect: select,
  };

  onLoad(options) {
    this.memberInfo = wx.getStorageSync('memberInfo');

    this.getUploadToken();
    this.getInfo();
    this.getClassList();
    let str = 'abcd', arr = ['a', 'b', 'c'];
    console.error(str.indexOf('c', -1), str.indexOf('c', -2), str.lastIndexOf('c', -1), str.lastIndexOf('c', -2), arr.indexOf('b', -1), arr.indexOf('b', -2));
  }

  onShow(){}

  methods = {
    addSlide(){
      let list = this.list,
          index = list.length + 1;

      list.push({ img: '', title: '不跳转', type: 'none', titleKey: 'title', valueKey: 'type', showList: false });
    },
    delSlide(index){
      let list = this.list;
          
      list.splice(index, 1);
    },
    async addImg(index, type){
      let item = this.list[index];

      let res = await mp.chooseImg();

      if(res){
        let imgs = res[1].tempFilePaths;

        type === '1' ? item.targetImg = imgs[0] : item.img = imgs[0] ; 
      }

      this.$apply();
    },
    closeImg(index, type){
      let item = this.list[index];

      type === '1' ? item.targetImg = '' : item.img = '';
    },
    // 选择轮播图类型
    changeType(o, item){
      o.type = item.type;
      o.title = item.title;

      if(item.type === 'img') o.targetImg = '';

      if(item.type === 'goods'){
        o.firstClass = { storegc_name: '', storegc_id: '', titleKey: 'storegc_name', valueKey: 'storegc_id', showList: false, };
        o.twoClass = { storegc_name: '', storegc_id: '', titleKey: 'storegc_name', valueKey: 'storegc_id', showList: false, };
        o.thirdClass = { storegc_name: '', storegc_id: '', titleKey: 'storegc_name', valueKey: 'storegc_id', showList: false, };
        o.goods = { goods_name: '', goods_commonid: '', titleKey: 'goods_name', valueKey: 'goods_commonid', showList: false, };
      }
    },
    // 选择一级分类
    changeFirstClass(o, item, index){
      let v = this.list[index];

      o.storegc_name = item.storegc_name;
      o.storegc_id = item.storegc_id;

      v.twoClass.storegc_name = '';
      v.twoClass.storegc_id = '';
      v.thirdClass.storegc_name = '';
      v.thirdClass.storegc_id = '';
      v.goods.goods_commonid = '';
      v.goods.goods_name = '';
      this.thirdClassList = [];
      this.goodsList = [];

      this.getNextClassList('twoClassList', v.firstClass.storegc_id);
    },
    // 选择二级分类
    changeTwoClass(o, item, index){
      let v = this.list[index];

      o.storegc_name = item.storegc_name;
      o.storegc_id = item.storegc_id;

      v.thirdClass.storegc_name = '';
      v.thirdClass.storegc_id = '';
      v.goods.goods_commonid = '';
      v.goods.goods_name = '';
      this.goodsList = [];

      this.getNextClassList('thirdClassList', v.twoClass.storegc_id);
    },
    // 选择三级分类
    changeThirdClass(o, item, index){
      let v = this.list[index];

      o.storegc_name = item.storegc_name;
      o.storegc_id = item.storegc_id;

      v.goods.goods_commonid = '';
      v.goods.goods_name = '';

      this.getGoodsList(item.storegc_id);
    },
    changeGoods(o, item, index){
      o.goods_commonid = item.goods_commonid;
      o.goods_name = item.goods_name;
    },
    updateTwoClass(o, index){
      let item = this.list[index];

      this.getNextClassList('twoClassList', item.firstClass.storegc_id);
    },
    updateThirdClass(o, index){
      let item = this.list[index];

      this.getNextClassList('thirdClassList', item.twoClass.storegc_id);
    },
    updateGoods(o, index){
      let item = this.list[index];

      this.getGoodsList(item.thirdClass.storegc_id);
    },
    async submit(){
      let param, res,
          list = this.list,
          remoteURL = /^https:/;

      if(this.clicked) return ;

      if(this.validate()) return ;
      console.error(this.list);

      this.clicked = true;

      for(let i = 0, len = list.length; i < len; i++){
        let item = list[i];

        if(!remoteURL.test(item.img)){
          res = await mp.uploadImg(this.imgConfig.url, item.img, null, this.imgConfig.body);

          if(res.data) item.img = `${this.imgConfig.cdnUrl}${JSON.parse(res.data).hash}`;
        }

        // 跳转商品
        if(item.type === 'img' && !/^https:/g.test(item.targetImg)){
          res = await mp.uploadImg(this.imgConfig.url, item.targetImg, null, this.imgConfig.body);

          if(res.data) item.targetImg = `${this.imgConfig.cdnUrl}${JSON.parse(res.data).hash}`;
        }

      }

      param = {
        card_banner: list,
      };

      this.save(param);
    }
  };

  validate(){
    let errorStr, res;

    res = this.list.some((v, i) => {
      if(!v.img) errorStr = `轮播图${i + 1}未设置图片`; 

      if(v.type === 'img' && !v.targetImg) errorStr = `轮播图${i + 1}跳转图片未设置`;

      if(v.type === 'goods' && (!v.goods || !v.goods.goods_commonid)) errorStr = `轮播图${i + 1}跳转商品未设置`;

      return errorStr;
    });

    if(res) wx.showModal({ content: errorStr, showCancel: false });

    return res;
  }

  async save(param){
    console.error(param);
    let str,
        res = await shttp.post(`/api/v2/member/card`).send(param).end();

    if(res && res.data) str = '提交成功';

    if(res.error) str = res.error;

    wx.showModal({ content: str, showCancel: false });

    this.clicked = false;
    this.getInfo();
  }

  async getInfo(){
    wx.showLoading({ title: 'Loading...' });

    let param = {
      member_id: this.memberInfo.member_id, 
    };

    let res = await shttp.get(`/api/v2/member/card`).query(param).end();
    
    if(res && res.data){
      this.list = res.data.card_banner || [];
    }

    wx.hideLoading();
    this.$apply();

    if(res.error) return wx.showModal({ content: res.error, showCancel: false });

  }

  async getGoodsList(gc_id){
    let param = {
      gc_id,
    };

    let res = await shttp.get(`/api/v2/member/goodscommon`).query(param).end();

    if(res && res.data){
      this.goodsList = res.data;
    }
    
    this.$apply();

    if(res.error) wx.showModal({ content: res.error, showCancel: false });
  }

  getNextClassList(listKey, id){
    let list = this.classObj[id].map(v => v[1]);

    this[listKey] = list;
  }

  async getClassList() {
    let res = await shttp.get(`/api/v2/member/storegc`).query({}).end();

    if (res.status === 0){
      this.classObj = res.data;
      this.firstClassList = this.classObj[0].map(v => v[1]);
    }

    this.$apply();
  }

  async getUploadToken(){
    let url = `/api/v2/common/imgkeyqiniu`;
    let res = await shttp.get(url).end();

    if(typeof res === 'string' || res.error) return wx.showModal({ content: `getUploadToken: ${res.error || res}`, showCancel: false });

    this.imgConfig.body.token = res.data;
    this.imgConfig.body.config = "{ useCdnDomain: true }";
  }

}
</script>