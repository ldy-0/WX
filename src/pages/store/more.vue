<style scoped>
.tips {
  width: 100%;
  text-align: center;
  line-height: 100rpx;
  font-size: 30rpx;
}

.link-list > navigator {
  position: relative;
  margin: 5rpx 0;
  padding-right: 50rpx;
  line-height: 88rpx;
  background: white;
}

.link-list text {
  display: block;
  text-indent: 20rpx;
  font-size: 32rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.link-list image {
  width: 16rpx;
  height: 25rpx;
  margin-top: -12rpx;
  position: absolute;
  right: 20rpx;
  top: 50%;
}

.search {
  overflow: hidden;
  height: 108rpx;
  font: 28rpx PingFang-SC-Medium;
  color: #969696;
  background: #fff;
  text-align: center;
}
.search .search_content {
  width: 690rpx;
  line-height: 68rpx;
  margin: 20rpx auto;
  border-radius: 34rpx;
  background: #f2f2f2;
}

.search_text {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-search {
  width: 40rpx;
  height: 40rpx;
}

.nodata {
  margin-top: 50%;
  font-size: 38rpx;
  text-align: center;
}

.wire-gray {
  height: 20rpx;
  width: 100%;
  background: #f4f4f4;
}

.container {
  font: 32rpx PingFang-SC-Medium;
  background: #f4f4f4;
  width: 100%;
  overflow: hidden;
}

.bodycontent {
  width: 100%;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 23rpx 17rpx;
  display: flex;
  background: #fff;
}
.bodycontent .redlist {
  background: #fff;
  width: 345rpx;
  height: 340rpx;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 10rpx 10rpx 0 0;
  margin-right: 20rpx;
  margin-bottom: 19rpx;
  border: solid 1px #f6f6f6;
}
.bodycontent .title_page {
  width: 100%;
  height: 240rpx;
  background: #e1e1e1;
}
.bodycontent .redinfo {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0rpx 14rpx 0rpx 11rpx;
}
.bodycontent .redinfo .prdname {
  width: 100%;
  font-size: 28rpx;
  height: 80rpx;
  color: #666666;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.modal_wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: gray;
}
.modal_wrap .modal {
  color: #fff;
  padding: 50rpx 100rpx;
  position: relative;
}
.modal_wrap .modal .modal_btn {
  color: #fff;
  margin: 15rpx 0 0;
  font-size: 36rpx;
  padding: none;
  border: none;
  width: 808rpx;
  height: 732rpx;
}
.modal_wrap .modal .modal_btn image {
  width: 87%;
  height: 86%;
}
</style>

<template>
  <view class="container">
       <view class="bodycontent">
        <repeat for="{{materialList}}" key="index" index="index" item="item">   
         <view class="redlist" @tap="gotoCase({{item.dynamic_id}})"> 
             <image class="title_page" src="{{item.dynamic_images[0].url}}" mode="aspectFill"></image>  
            <view class="redinfo">
              <text class="prdname">{{item.dynamic_title}}</text>
            </view>
        </view>
       </repeat> 
    </view>
   </view>
</template>

<script>
import wepy from "wepy";
import dayjs from "dayjs";
import { getCode } from "../../utils/user-tools";
import { shttp } from "../../utils/http";
import {
  showSuccessToast,
  showFailToast,
  exploitToast
} from "../../utils/tools";
export default class Home extends wepy.page {
  config = {
    enablePullDownRefresh: true,
    navigationBarTitleText: "案例展示"
  };
  data = {
    materialList: [], //案例列表
    //分类id
    classId: 0,
    //当前页数
    page: 1
  };

  components = {};
  onLoad(options) {
    wx.showLoading({
      title: "加载中"
    });
    this.getMaterialList();
  }
  onShow() {}

  methods = {
    //进入商品详情
    gotoCase(id) {
      // console.log(id)
      wx.navigateTo({
        url: `../article/caseDetail?id=${id}`
      });
    }
  };
  //获取案例列表
  async getMaterialList() {
    const res = await shttp
      .get(`/api/v2/member/dynamic`)
      .query({
        dynamic_type: "material",
        limit: 8,
        page: this.page,
      })
      .end();
    if (res.status === 0) {
      wx.hideLoading();
      if (res.data != null && res.data.length != 0) {
        res.data.forEach((element, idx) => {
          res.data[idx].dynamic_images = JSON.parse(
            res.data[idx].dynamic_images
          );
        });
        this.materialList  = this.materialList.concat(res.data);
      }
    } else {
      wx.hideLoading();
    }
    
    console.log(this.materialList);

    this.$apply();
  }
  //上拉加载更多
  onReachBottom() {
    this.page = this.page + 1;
    this.getMaterialList();
  }
}
</script>
