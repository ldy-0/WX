<template>
	<view class="input_wrap" :style="{ color: config.color, background: config.background, }" @tap="emit">
		<image class="i_search" src='../../static/common/search.png'></image>

		<input confirm-type="search" class="input" type="text" :placeholder="config.placeholder || ''" placeholder-class="input_placeholder" :value="name" :disabled="config.disabled"
		       @input="setName" @confirm="confirm">
	</view>
</template>

<script>
	import uniIcons from "../uni-icons/uni-icons.vue";
	
	export default {
		props: {
			config: Object,
		},

		components: {
			uniIcons
		},	

		data() {
			return {
				name: '',

				timeout: null,
			};
		},
		
		computed: {
			
		},
		
		methods: {
			setName(e) {
				this.name = e.detail.value;

				if(this.timeout) clearTimeout(this.timeout);

				this.timeout = setTimeout(() => {
          this.$emit('confirm', this.name);
				}, 600);
			},

			emit(){ this.$emit('emit'); },

			confirm() {
				this.$emit('confirm', this.name);
			}
		},
		
	}
</script>

<style>
.input_wrap {
	/* #ifndef APP-PLUS-NVUE */
	display: flex;
	/* #endif */
	align-items: center;
	height: inherit;
	padding: 0 26rpx;
	border-radius: 25rpx;
	box-sizing: border-box;
}

.i_search{
	width: 32rpx;
	height: 32rpx;
}

.input {
	flex-grow: 1;
	height: inherit;
	padding: 0 5px;
	font-size: 28rpx;
	line-height: inherit;
}
.input_placeholder{
	color: #CFCFCF;
}
</style>
