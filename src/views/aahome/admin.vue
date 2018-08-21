<template>
    <h1>欢迎 {{role==="agent"?"代理":"平台"}}管理员 登录</h1>
</template>
<script>
import { getAgent } from '@/utils/auth' // getToken from cookie


export default {
  data(){
      return {
          role:''
      }
  },
  created() {
    if(getAgent()){
        this.role = "agent"
    }else{
        this.role = "admin"
    }
  },
}
</script>
