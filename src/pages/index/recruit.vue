<template>
  <div>
    <aarecruit></aarecruit>
  </div>
</template>

<script>
const aarecruit  = () => import("@/pages/index/aarecruit")
export default {
  components: {
    aarecruit
  },
  data() {
    return {}
  },
  created() {},
  mounted() {
    console.log("recuit mounted!");
  },
  methods: {}
};
</script>
<style>
</style>
