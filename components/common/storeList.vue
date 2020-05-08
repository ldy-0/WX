<template>
	<view>
		<view class="list_wrap" :style="{ 
									margin: config.margin || 0, 
									padding: config.padding || 0,
									background: config.background || '#fff',
								}">
								
			<view class="list_title_wrap between" v-if="config.title">
				<!-- <view v-if="isArray"> -->
					<view class="list_title s_fc_3"
							:class="{ z_sel: true }" v-for="(title, tIndex) in config.title" :key="tIndex">
							<view>{{title}}</view>
					</view>
				<!-- </view> -->
				<!-- <view class="list_title s_fc_3" v-else>{{config.title}}</view> -->
				
				<view class="more_btn flex s_fc_9" v-if="config.more" @tap="clickMore">
					<view>{{config.more}}</view>
					<image :style="{ 
								width: config.moreWidth, 
								height: config.moreHeight,
								margin: config.moreMargin,
							}" :src="config.moreIcon" v-if="config.moreIcon" ></image>
				</view>
			</view>
			
			<view class="item" v-for="(item, index) in config.list || list" :key="index">
				<slot :item="item" :index="index"></slot>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			config: { type: Object, },
		},
		
		data() {
			return {
				list: [],
				style: {},
			};
		},
		
		computed: {
			// isArray(){ return typeof this.config.title === 'object'; },
		},
		
		methods: {
			clickMore(){ this.$emit('more', this.config); }
		}
		
	}
</script>

<style>
.list_wrap{
	/* padding: 0 24rpx; */
}
.list_title_wrap{
}
.list_title{
	padding: 18rpx 0;
	font-size: 32rpx;
	font-weight: bold;
}
.more_btn{
	font-size: 24rpx;
}

.z_sel{
	position: relative;
	font-weight: bold;
}
.z_sel{
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 8rpx;
}
</style>
