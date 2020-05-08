<style>
::-webkit-scrollbar {
	width: 0 !important;
	height: 0 !important;
	color: #4CD964 !important;
}
</style>
<style scoped>
.nav_wrap{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	box-sizing: border-box;
	z-index: 998;
}
.search_wrap{
	width: 630rpx;
	height: 60rpx;
	line-height: 60rpx;
	margin: 0 0 0 30rpx;
	border-radius: 30rpx;
}

.classify_left {
	flex-shrink: 0;
	width: 200rpx;
	height: 100vh;
	background-color: #F7F7F7;
}

.item_left {
	position: relative;
	font-size: 28rpx;
	text-align: center;
}
.item_content {
	height: 90rpx;
	line-height: 90rpx;
	border-bottom: 1rpx solid #EEEEEE;
}
.checked::after{
	content: '';
	position: absolute;
	top: 0;
	right: 0;
	width: 8rpx;
	height: 100%;
	background: #48DEB6;
}

.content_warpper {
	display: flex;
}

.classify_right {
	flex: 1;
	box-sizing: border-box;
}
.two_list_wrap{
	flex-wrap: wrap;
}

.item-right {
	border-bottom: 2rpx solid #eee;
	text-align: center;
}

.classify_wrap{
	padding: 0 34rpx;
	text-align: center;
}
.classify_img{
	display: block;
	width: 112rpx;
	height: 112rpx;
	border-radius: 50%;
}
.classify_name {
	font-size: 24rpx;
}

::-webkit-scrollbar {
	width: 0 !important;
	height: 0 !important;
	color: #4CD964 !important;
}

.mine_goods::after{
	content: '';
	width: 125rpx;
	display: block;
}
.classify-pic{
	width: 480rpx;
	height: 150rpx;
}
.classify-pic>image{
	width: 480rpx;
	height: 150rpx;
	display: block;
}

  .s_fc_10{ color: #262626; }
  .s_fc_11{ color: #707070; }
</style>
<template>
	<view class="page_wrap" :style="{ paddingTop: navBarHeight + 'px', }">
		<!-- 导航栏 -->
		<view class="nav_wrap flex s_bg_main" :style="{ height: navBarHeight + 'px', paddingTop: statusHeight + 'px', }">
			<search class="search_wrap" :config="searchConfig" @emit="goSearch"></search>
		</view>

		<view class="content_warpper">
			<!-- left -->
			<view class="classify_left">
				<scroll-view style="height: 100vh" scroll-y="true">
					<view>
						<view :class="['item_left',now==index?'self s_bg_f ':'' ]" v-for="(item,index) in classifyFirst" :key="index" @tap="handleClick(index,item.storegc_id)">
							<!-- <view :class="['item_left_bar',now==index?'self':'']"></view> -->
							<view :class="['item_content',now==index?'checked s_fc_main':'s_fc_10']">{{item.storegc_name}}</view>
						</view>
					</view>
				</scroll-view>
			</view>

			<!-- right -->
			<view class="classify_right s_bg_f">
				<scroll-view style="height:calc(100vh - 20rpx)" scroll-y="true">
					<view class="two_list_wrap flex">
						<!-- <view class="classify-pic" >
							<image :src="firstPic" mode=""></image>
						</view> -->
						<view class="classify_wrap mt60" v-for="(item,index) in mainList" :key="index" @tap="goGoodsList(item)">
							<!-- <view>{{item.storegc_name}}</view> -->
							<view class="" >
								<!-- <view class="warpper" v-for="(goodsItme,goodsIndex) in item.son" :key="goodsIndex" @tap="goGoodsList(goodsItme.storegc_id,'threeClassify')"> -->
									<view>
										<image class="classify_img" :src="item.storegc_pic" mode=""></image>
									</view>
									<view class="classify_name mt20 s_fc_11">{{item.storegc_name}}</view>
								<!-- </view> -->
							</view>
						</view>

					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
import goodsApi from '@/api/goods';
import search from '@/components/common/search.vue'

export default {
	components:{
		search,
	},

	data() {
		return {
			searchConfig: {
				color: '#CFCFCF',
				background: 'rgba(255, 255, 255, 1)',
				placeholder: '商品名称',
				disabled: true,
			},

			now: 0,
			classifyFirst:[],
			mainList:[],
			firstPic:'',
			firstId:'',
				
		}
	},

	computed: {
		navBarHeight(){ return this.navBar; },
		statusHeight(){ return this.statusBar; },
	},

	onLoad(){
		this.getList();
	},
	onShow(){
	},
	methods: {
		goSearch() {
			uni.showLoading({ title: 'Loading...', mask: true, });

			uni.navigateTo({ url: `/pages/classify/search`, });
		},

		// 获取一级分类
		async getList(){
			uni.showLoading({ title:'Loading', mask:true })

			const res = await goodsApi.getClassList({ page: 1, limit: 1000, parent_id: 0 });
			uni.hideLoading();
			if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取分类信息失败!', icon: 'none', });

			if(res.data){
				this.classifyFirst=res.data;
				this.firstId=res.data[0].storegc_id;
				this.firstPic=res.data[0].storegc_pic;
				
				this.getTwoClassList();
			}
		},

		// 默认查询第一个一级分类的  二级，三级分类
		async getTwoClassList(){
			uni.showLoading({ title:'Loading', mask:true });

			const res = await goodsApi.getClassList({parent_id:this.firstId});
			uni.hideLoading();
			if(!res || typeof res === 'string' || res.error) return uni.showToast({ title: res ? res.error || res : '获取分类信息失败!', icon: 'none', });

			if(res.status==0){
				if(res.data&&res.data.length>0){
					this.mainList=this.mainList.concat(res.data);
				}
			}
		},

		// 点击一级分类
		handleClick(index,id) {
			if(id==this.firstId){ return false; }

			this.now = index;
			this.firstId=id;
			this.firstPic=this.classifyFirst[index].storegc_pic;

			this.mainList=[];
			this.getTwoClassList();
		},

		goGoodsList(item){
			let url = `/pages/classify/list?id=${item.storegc_id}&title=${item.storegc_name}`;

			uni.navigateTo({ url, });
		}
	}
}
</script>
