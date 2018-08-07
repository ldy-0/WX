<template>
  <div>
    <aaaboutus></aaaboutus>
  </div>
</template>

<script>
const aaaboutus  = () => import("@/pages/index/aaaboutus")
export default {
  components: {
    aaaboutus
  },
  data() {
    return {}
  },
  created() {},
  mounted() {
    console.log("aboutus mounted!");
  },
  methods: {}
};
</script>
<style>
</style>
