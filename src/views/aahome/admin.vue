<template>
    <h1>欢迎 {{role==="agentAdmin"?"分公司":"平台"}}管理员 登录</h1>
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
      console.log(getAgent(),!!getAgent())
    if(getAgent()==="agentAdmin"){
        this.role = "agentAdmin"
    }else{
        this.role = "admin"
    }
  },
}
</script>
