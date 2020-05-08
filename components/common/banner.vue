<template>
	<view :style="{ width: config.width, height: config.height }">
		<swiper class="swiper" :circular="config.circular" 
							  :indicator-dots="config.dot" 
							  :autoplay="config.autoplay" 
							  :interval="config.interval || 2000" 
							  :duration="config.duration || 600"
                @change="changeIndex">
			<swiper-item v-for="(item, index) in config.list" :key="index">
				<image class='img' :src="item[vk] || item" @tap="emit(item)"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: {
			config: Object,
		},
		
		data() {
			return {
				
			};
		},
		
		computed: {
			vk(){ return this.config.valueKey || 'src' },
		},
		
		methods: {
      changeIndex(e) {
        let index = e.detail.current;

        this.config.index = index;
      },

			emit(param, e) {
				this.$emit('emit', param);
			},
		}
	}
</script>

<style>
.swiper{
	width: 100%;
	height: 100%;
}
</style>
