<template>

  <div>
    <div :class='{ map: map }' id='map'></div>
  </div>
  
</template>

<script>
export default {
  name: 'Geocoder',

  props: {
    address: {
      type: String,
      // required: true
    },
  },

  computed: {

  },

  data(){
    return {
      map: null,
      coder: null,
      timer: null,
    }
  },

  watch: {
    address(v1, v2){
      if(!this.map) return ;

      if(this.timer) clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        let _this = this;

        this.coder.getPoint(v1 || '北京天安门', function(v){
          if(v){
            _this.map.clearOverlays();

            _this.map.centerAndZoom(v, 16);

            _this.map.addOverlay(new BMap.Marker(v));
            
            _this.$emit('get', v);
          }
        });

      }, 1000)
      
    }
  },

  methods: {
    initMap(){
      let map = new BMap.Map('map');

      map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);

      map.enableScrollWheelZoom(true);
      map.enableDoubleClickZoom(true);

      map.addControl(new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT}));
      map.addControl(new BMap.NavigationControl());
      // map.addControl(new BMap.NavigationControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,type:BMAP_NAVIGATION_CONTROL_SMALL}));
      // map.addControl(new BMap.MapTypeControl()); 
      
      this.map = map;
      this.coder = new BMap.Geocoder();

      this.coder.getPoint(this.address, v => {
          if(v){
            this.map.centerAndZoom(v, 16);
            this.map.addOverlay(new BMap.Marker(v));
          }
      });
    },
  },

  mounted(){
    if(BMap) this.initMap();
  },

  beforeDestroy(){
    this.timer && clearTimeout(this.timer);
  }

}
</script>

<style scoped>
.map{
  width: 100%;
  height: 300px;
  margin: 10px 0;
}
</style>
