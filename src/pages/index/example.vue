<template>
  <div>
    <aaexample></aaexample>
  </div>
</template>

<script>
const aaexample  = () => import("@/pages/index/aaexample")
export default {
  components: {
    aaexample
  },
  data() {
    return {}
  },
  created() {},
  mounted() {
    console.log("example mounted!");
  },
  methods: {}
};
</script>
<style>
</style>
