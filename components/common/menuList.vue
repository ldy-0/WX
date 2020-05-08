<template>
	<view class="menu_wrap" :style="{ width: config.width || '100%', padding: config.padding || 0, }">
		<view class="row flex" v-for="(row, rowIndex) in config.list || moduleList" :key="rowIndex">
			<view class="item" v-for="(item, index) in row" :key="index">
				<slot :item="item" :index="index" :rowIndex="rowIndex"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			config: { type: Object },
		},
		
		data() {
			return {
				moduleList: null,
			};
		},
		
		methods: {
			
		},
		
		
	}
</script>

<style>
.menu_wrap{
	box-sizing: border-box;
}
</style>
