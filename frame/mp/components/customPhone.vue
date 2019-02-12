<template>
    <div class='phone_btn s-fc-3' @click='showRegisterPhone'>
            <image class='phone_icon' src='/static/phone.png' mode='aspectFill' />
            <div>使用手机号绑定</div>
    </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default: function () {
        return {

        }
      }
    }
  },

  data () {
    return {

    }
  },

  methods: {
    showRegisterPhone () { console.log('emit customPhone click :', this.$emit('show')) }
  }

}
</script>

<style>
.phone_btn{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 258rpx;
  margin: 40rpx auto 0;
  font-size: 26rpx;
}
.phone_icon{
  width: 56rpx;
  height: 56rpx;
}


.s-fc-2{
  color: #dedede; 
}
.s-fc-3{ color: #333; }

.s-bg-2{
  background: #dedede; 
}
</style>
