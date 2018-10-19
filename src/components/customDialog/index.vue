<template>
 <!-- <el-dialog :visible.sync='isShowDialog'> -->
 <el-dialog :visible='visible' :before-close='cancel'>

    <el-form label-width="80px" :disabled='config.isDisabled' :model='detail' ref='ruleForm' :rules='config.rules'>

      <el-form-item :label="item.key"  v-for='(item, index) in config.classList' :key='index' v-if='!item.isHide' :prop='item.value'>

        <!-- input -->
        <el-input v-model="detail[item.value]" auto-complete="off" v-if='item.isText'></el-input>
        <el-input v-model.number="detail[item.value]" auto-complete="off" v-if='item.isNumber'></el-input>

        <!-- textarea -->
        <el-input type='textarea' v-model="detail[item.value]" auto-complete="off" :disabled='true' v-if='item.isTexts'></el-input>


        <div v-if='item.isCreateQrcode'>
          <el-button type='primary' size='mini' @click='getQrcode'>生成二维码</el-button>

          <img class='detail_img' :src='detail[item.value]' />

          <el-button type='primary' size='mini'><a :href='detail[item.value]'>下载</a></el-button>
        </div>

        <!-- img -->
        <el-upload action=''
            list-type="picture-card"
            :auto-upload="false"
            :limit='3'
            :file-list='detail[item.value]' 
            :on-remove='removeImg'
            :on-change="changeImgs"
            v-if='item.isImg'>

            <i class="el-icon-plus"></i>

        </el-upload>

        <!-- imgs -->
        <img class='detail_imgs' :src='v' v-for='(v, i) in detail[item.value]' :key='i' v-if='item.isImgs' />


        <!-- radio -->
        <el-radio-group v-model='detail[item.value]' v-if='item.isRadio'>
          <el-radio label=1>是</el-radio>
          <el-radio label=0>否</el-radio>
        </el-radio-group>

      </el-form-item>
      
    </el-form>

    <span slot="footer" class="dialog-footer" v-if='!config.isDisabled'>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" :disabled="!config.canSubmit" :loading="!config.canSubmit" @click="submitForm('ruleForm')">确 定</el-button>
    </span>

  </el-dialog> 
</template>

<script>
export default {
  name: 'dialog',

  props: {
    config: {
      type: Object,
      default: function () {
        return {
          labelWidth: '50px'
        }
      }
    },
    detail: {
      type: Object,
    },
    visible: {
      type: Boolean,
    }, 
  },

  data() {
    return {
      imgs: [],
      labelWidth: '80rpx',
      rules: {
          'seller_name': [
            { required: true, message: '请输入名字', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          // 'seller_id': [
          //   { required: true, message: '编号不能为空' },
          //   { type: 'number', message: '编号必须为数字值'}
          // ]
        },
    }
  },
  
  methods: {
    cancel(){
      console.log('cancel dialog --');
      this.$emit('cancel');
    },
    async submitForm(form){
      let res = await this.$refs['ruleForm'].validate().catch(e => e);
      if(!res) return ;

      console.log('submit dialog --');
      this.$emit('submit', this.imgs);
    },
    getQrcode(){
      // this.detail.qrcode = [ { url: 'http://admin-1256953590.cos.ap-shanghai.myqcloud.com/1539331723928tab_fenxiangzhuan%402x.png'}];  
      // this.detail.qrcode = 'http://admin-1256953590.cos.ap-shanghai.myqcloud.com/1539331723928tab_fenxiangzhuan%402x.png';  
      // console.log('param --', this.detail, this.appUrl)
      this.$emit('getQrcode')
    },
    changeImgs(e, list){
      console.log('change img--', list)
      this.imgs = list;
    },
    removeImg(file, list){
      console.log('remove', list)
      this.imgs = list;
    },
    blur(v){
      if(!v) this.$message.error({ message: '内容不能为空!' })
    },
    input(item, v){
      console.log('input --', item, v)

      if(item.isNumber && isNaN(Number(v)) ){
        console.log('--:-')
        this.$message.error({ message: '请输入数字!' })
      }

    } 
  }
}
</script>

<style scoped>
  
</style>
