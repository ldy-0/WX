<template>
  <div>
    <aaintroduction></aaintroduction>
  </div>
</template>

<script>
const aaintroduction  = () => import("@/pages/index/aaintroduction")
export default {
  components: {
    aaintroduction
  },
  data() {
    return {}
  },
  created() {},
  mounted() {
    console.log("introduction mounted!");
  },
  methods: {}
};
</script>
<style>
</style>
