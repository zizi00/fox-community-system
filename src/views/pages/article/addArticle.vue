<template>
  <div class="add-article">
    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" :inline="true">
      <div v-for="(domain, index) in dynamicValidateForm.domains" :key="index">
        <el-form-item
          label="微信"
          :prop="'domains.' + index + '.weixin'"
        >
          <el-input v-model="domain.weixin"></el-input>
        </el-form-item>
        <el-form-item
          label="手机"
          :prop="'domains.' + index + '.phone'"
        >
          <el-input v-model="domain.phone"></el-input>
        </el-form-item>
        <el-form-item
          label="QQ"
          :prop="'domains.' + index + '.qq'"
        >
          <el-input v-model="domain.qq"></el-input>
        </el-form-item>
        <el-form-item
          label="价格"
          :prop="'domains.' + index + '.price'"
        >
          <el-input v-model="domain.price"></el-input>
        </el-form-item>
        <el-form-item
          label="年龄"
          :prop="'domains.' + index + '.age'"
        >
          <el-input v-model="domain.age"></el-input>
        </el-form-item>
        <el-form-item
          label="地址"
          :prop="'domains.' + index + '.address'"
        >
          <el-input v-model="domain.address"></el-input>
        </el-form-item>
        <el-form-item
          label="标题"
          :prop="'domains.' + index + '.title'"
        >
          <el-input v-model="domain.title"></el-input>
        </el-form-item>
        <el-form-item
          label="备注"
          :prop="'domains.' + index + '.content'"
        >
          <el-input v-model="domain.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-button @click.prevent="removeDomain(index)">删除</el-button>
      </div>
      
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="addDomain">新增</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "add-article",
  data () {
    return {
      dynamicValidateForm: {
          domains: [{
            weixin: '',
            phone: '',
            qq: '',
            price: '',
            age: '',
            address: '',
            title: '',
            content: '',
            dialogImageUrl: '',
            dialogVisible: false
          }],
          email: ''
        }
    }
  },
  methods: {
    removeDomain () {

    },
    submitForm () {

    },
    addDomain () {

    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>
<style lang="less" scoped>

</style>