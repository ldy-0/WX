<template>
  <div>
    <aabusiness></aabusiness>
  </div>
</template>

<script>
const aabusiness  = () => import("@/pages/index/aabusiness")
export default {
  components: {
    aabusiness
  },
  data() {
    return {}
  },
  created() {},
  mounted() {
    console.log("business mounted!");
  },
  methods: {}
};
</script>
<style>
</style>
