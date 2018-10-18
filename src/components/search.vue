<template>
    <div class='search_wrap s-fc-2' 
        :style="{ fontSize: config.size + 'rpx',
                  width: config.width || '610rpx',
                  height: config.height || '76rpx',
                  border: config.border || '1rpx solid #eee',
                  borderRadius: config.borderRadius || '8rpx'
                 }">

        <input class='search' @input='search' @focus='focus' @blur='blur' v-model="content" />

        <div class='search_desc' :style="{ justifyContent: config.canClear && 'space-between' }">

          <div class='search_main'>
            <image class='search_icon' :src='config.searchImg' v-if='!content && !isFocus' />
            <div class='search_content' v-if='!content && !isFocus' >{{config.placeholder}}</div>
          </div>

          <div class='search_close_wrap' @click='clear' v-if='config.canClear && content'>
            <image class='search_close' :src='config.closeImg' />
          </div>

        </div>

    </div>
</template>

<script>
export default {
  // props: ['text']
  props: {
    config: 'object',
    content: 'string'
  },

  data () {
    return {
      interval: null,
      isFocus: false
    }
  },

  methods: {
    search (e) {
      this.interval && clearTimeout(this.interval)
      this.interval = setTimeout(() => this.$emit('search', e.mp.detail.value), 800)
      console.log(`emit search`)
    },
    focus () {
      console.log('focus ---')
      this.isFocus = true
    },
    blur () {
      console.log('blur ---')
      this.isFocus = false
    },
    clear () {
      console.log(`emit search clear`)
      this.interval && clearInterval(this.interval)
      this.$emit('clear')
    },
    init () {
      console.log('init search component--')
    }
  },

  created () {
    console.log('created search component --')
  }
}
</script>

<style scoped>

.search_wrap{
  position: relative;
  margin: 30rpx auto 0;
}

.search{
  width: calc(100% - 50rpx);
  height: 100%;
}

.search_desc{
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; 
  height: 100%;
}

.search_main{
  display: flex;
  align-items: center;
  margin-left: 20rpx;
}

.search_close_wrap{
  line-height: 1;
  padding-right: 20rpx;
}
.search_close{
  width: 30rpx;
  height: 30rpx;
}
.search_icon{
  width: 28rpx;
  height: 28rpx;
  margin-right: 10rpx;
}
.search_content{
  font-size: 28rpx;
}

.s-fc-2{
  color: #999;
}
</style>
