<template>
  <div class="profit-set">
    <div class="title">
      <p>基础设置</p>
    </div>
    <div class="main">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="一级分佣">
          <el-input v-model="form.first"></el-input>
          <span>%</span>
        </el-form-item>
        <el-form-item label="二级分佣">
          <el-input v-model="form.second"></el-input>
          <span>%</span>
        </el-form-item>
        <el-form-item label="三级分佣">
          <el-input v-model="form.third"></el-input>
          <span>%</span>
        </el-form-item>
        <el-form-item label="四级分佣">
          <el-input v-model="form.forth"></el-input>
          <span>%</span>
        </el-form-item>
        <el-form-item label="五级分佣">
          <el-input v-model="form.fifth"></el-input>
          <span>%</span>
        </el-form-item>
        <el-form-item label="六级分佣">
          <el-input v-model="form.sixth"></el-input>
          <span>%</span>
        </el-form-item>
        <el-form-item label="七级分佣">
          <el-input v-model="form.seventh"></el-input>
          <span>%</span>
        </el-form-item>
        <el-form-item label="八级分佣">
          <el-input v-model="form.eighth"></el-input>
          <span>%</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">设置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "profit-set",
  data() {
      return {
        form: {
          first: '',
          second: '',
          third: '',
          forth: '',
          fifth: '',
          sixth: '',
          seventh: '',
          eighth: ''
        }
      }
    },
  methods: {
    onSubmit () {
      
    }
  }
}
</script>
<style lang="less" scoped>
.profit-set {
  padding: 10px;
  min-height: calc(100% - 80px);
  background-color: #f0f2f6;
  .title {
    padding: 10px 0px;
    padding-left: 10px;
    text-align: left;
    background-color: #ffffff;
  }
  .main {
    margin-top: 10px;
    padding: 10px 0;
    background-color: #ffffff;
    /deep/.el-form {
      width: 400px;
      /deep/.el-input {
        display: inline-block;
        vertical-align: top;
        width: 91%;
      }
      span {
        margin-left: 10px;
      }
      .el-form-item__content {
        text-align: left;
      }
    }
  }
}
</style>