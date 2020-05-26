<style scoped>
.flex{
  display: flex;
  align-items: center;
}
.between{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.input_wrap{
  position: relative;
}

.title{
  flex-shrink: 0;
}

.s_fc_6{ color: #666; }
.s_fc_10{ color: #ff0000; }
</style>

<template>

  <view class='input_wrap flex' style="height: {{obj.height}}rpx; font-size: {{obj.fontSize || 28}}rpx; color: {{obj.color || '#666'}};">
    <view class='title between' style="width: {{obj.width}}rpx;">
      <repeat for="{{obj.title || obj.name}}">

        <view>{{item}}</view>

      </repeat>
    </view>

  </view>
  
</template>

<script>
import wepy from "wepy";

export default class Title extends wepy.component {
  props = {
    obj: Object,
  };

  data = {
    
  };

  computed = {
  }

  methods = {
    input(e){ 
      let v = e.detail.value,
          o = this.obj;

      o.value = v;

      // if(this.required && !v) return o.alert = `请输入${o.title || o.name}`;

      // o.alert = null;
    },
  };
}
</script>