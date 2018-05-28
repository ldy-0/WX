<style lang="sass" scoped>
.content_list
    .content_row
      display: flex
</style>

<template>
    <view class="content_list">
        <repeat for="{{list}}" item="item">
            <view class="content_row">
                <repeat for="{{item}}">
                    <slot name="item"></slot>
                </repeat>
            </view>
        </repeat>
    </view>
</template>

<script>
  import wepy from "wepy";
  
  export default class List extends wepy.component {
    props = {
      list: {
        type: Array,
      },
    };
    
    computed = {
      /* getList(){ return this.$root.data.faceList; } */
    };
    
  }
</script>