<template>
  <div class="profit-set">
    <div class="title">
      <p>基础设置</p>
    </div>
    <div class="main">
      <div v-for="(item,index) in profitSet" :key="index">
        <div class="item-set">
          <span>{{item.name}}</span>
          <el-input v-model="item.divide" :disabled="item.disabled"></el-input>
          <span>%</span>
          <el-button type="primary" size="small" class="setBtn" v-if="item.btnType==0" @click="changeType(index)">编辑</el-button>
          <el-button type="primary" size="small" class="setBtn" v-else @click="onSubmit(index)">提交</el-button>
        </div>
       </div>
    </div>
  </div>
</template>
<script>
import { getConfigList, configUpdate } from '@/api/profit.js'
export default {
  name: "profit-set",
  data() {
      return {
          profitSet: []
      }
    },
  methods: {
    initData() {
      let param = {
        type: 2 // 分佣
      }
      getConfigList(param).then(res =>{
        if(res.code === 1) {
          let profitData = res.data
          for(let i=0;i<profitData.length;i++) {
            this.profitSet.push({
              name: profitData[i].name,
              grade: profitData[i].grade,
              divide: profitData[i].divide,
              id: profitData[i].id,
              btnType: 0,
              disabled: true
            })
          }
        }
      })
    },
    changeType(index) {
      let data = this.profitSet
      for(let i=0;i<data.length;i++) {
        if(i==index) {
          data[i].disabled = false
          data[i].btnType = 1
        }
      }
    },
    onSubmit (index) {
      let params = {}
      let data = this.profitSet
      for(let i=0;i<data.length;i++) {
        if(i==index) {
          params.id = data[i].id
          params.divide = data[i].divide
        }
      }
    configUpdate(params).then(res=>{
        if(res.code === 1) {
          this.$message({
          showClose: true,
          message: '设置成功',
          type: 'success'
        });
          this.initData()
        }else {
          this.initData()
        }
        let data = this.profitSet
        for(let i=0;i<data.length;i++) {
          this.profitSet[i].disabled=true
          this.profitSet[i].btnType = 0
        }
      })
    }
  },
  created() {
    this.initData()
  }
}
</script>
<style lang="less" scoped>
.profit-set {
  margin-top: 57px;
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
    .item-set {
      text-align: left;
      margin: 18px 0px;
      /deep/.el-input {
        display: inline-block;
        vertical-align: middle;
        vertical-align: top;
        width: 20%;
      }
      span {
        display: inline-block;
        vertical-align: middle;
        margin-left: 10px;
        margin-right: 10px;
        padding-top: 10px;
      }
      .setBtn {
        display: inline-block;
        vertical-align: sub;
        margin-left: 20px;
      }
    }
    
  }
}
</style>