<template>
  <div class="add-article">
    <el-form :model="dynamicForm" ref="dynamicForm" label-width="100px" :inline="true" class="article-form">
      <div v-for="(domain, index) in dynamicForm.domains" :key="index">
        <el-form-item
          label="微信"
        >
          <el-input v-model="domain.wechatId"></el-input>
        </el-form-item>
        <el-form-item
          label="手机"
          :prop="'domains.' + index + '.phone'"
          :rules="{
            required: true, message: '手机不能为空', trigger: 'blur'
          }"
        >
          <el-input v-model="domain.phone"></el-input>
        </el-form-item>
        <el-form-item
          label="QQ"
        >
          <el-input v-model="domain.qq"></el-input>
        </el-form-item>
        <el-form-item
          label="价格"
          :prop="'domains.' + index + '.price'"
          :rules="{
            required: true, message: '价格不能为空', trigger: 'blur'
          }"
        >
          <el-input v-model="domain.price"></el-input>
        </el-form-item>
        <el-form-item
          label="年龄"
          :prop="'domains.' + index + '.age'"
          :rules="{
            required: true, message: '年龄不能为空', trigger: 'blur'
          }"
        >
          <el-input v-model="domain.age"></el-input>
        </el-form-item>
        <el-form-item
          label="地址"
        >
          <el-cascader
            v-model="domain.city"
            :options="options"></el-cascader>
        </el-form-item>
        <el-form-item
          label="标题"
          :prop="'domains.' + index + '.title'"
          :rules="{
            required: true, message: '标题不能为空', trigger: 'blur'
          }"
        >
          <el-input v-model="domain.title" style="width: 500px" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item
          class="content"
          label="备注"
        >
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="domain.content" style="width: 500px;"></el-input>
        </el-form-item>
        <el-form-item class="upload-item" label="图片">
          <div class="hide-div" @click="recordIndex(index)">
            <el-upload
              action=""
              :http-request="httpRequest"
              list-type="picture-card"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="" class="checkbox">
          <el-checkbox v-model="domain.syncUser">同步到女用户表</el-checkbox>
        </el-form-item>
        <el-button @click.prevent="removeDomain(index)" class="delete" type="danger">删除本条数据</el-button>
        <div class="line"></div>
      </div>
      
      <el-form-item class="submit">
        <el-button type="primary" @click="submitForm('dynamicForm')">提交全部</el-button>
        <el-button @click="addDomain" v-if="dynamicForm.domains.length<10">新增数据</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addDynamic, uploadPhoto } from '@/api/article.js'
import mapData from '../../../static/json/map.json'
export default {
  name: "add-article",
  data () {
    return {
      // mapJson:'../../../static/json/map.json',
      dynamicForm: {
        domains:[
          {
            wechatId: '',
            phone: '',
            qq: '',
            price: '',
            age: '',
            city: '',
            county: '',
            title: '',
            content: '',
            imagesJson: [],
            syncUser: false
          }
        ]
      },
      imgFileList:[],
      domainIndex: 0,
      options: [],
      isSuccess: false
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) =>{
         if (valid) {
           for(let i=0;i<this.dynamicForm.domains.length;i++) {
              let arr = []
              for(let j=0;j<this.imgFileList.length;j++) {
                if(this.imgFileList[j].index == i) {
                  var formData = new FormData()
                  formData.append('img', this.imgFileList[j].file);
                  uploadPhoto(formData).then((res) =>{
                    let imgData = res.data.data
                    if(res.data.code === 1) {
                      arr.push ({
                        imgPath: imgData.filePath,
                        imgId: imgData.id
                      })
                    }
                  })
                }
              }
              if(arr[0]) {
                this.dynamicForm.domains[i].imagesJson = JSON.stringify(arr)
              }else {
                this.dynamicForm.domains[i].imagesJson = ""
              }
              if(this.dynamicForm.domains[i].syncUser) {
                this.dynamicForm.domains[i].syncUser = 1
              }else {
                this.dynamicForm.domains[i].syncUser = 0
              }
              this.dynamicForm.domains[i].county = this.dynamicForm.domains[i].city[2]
              this.dynamicForm.domains[i].city = this.dynamicForm.domains[i].city[1]
              addDynamic(this.dynamicForm.domains[i]).then((res) =>{
                if(res.data.code === 1) {
                  this.isSuccess = true
                }
                  
              })
              // let data = await addDynamic (this.dynamicForm.domains[i])
            } 
            if(this.isSuccess) {
              this.$notify({
                title: '提示',
                message: '内容添加成功'
              });
            }
         }else {
           console.log('error submit!!');
            return false;
         }
      })
      
    },
    addDomain () {
      this.dynamicForm.domains.push({
        wechatId: '',
        phone: '',
        qq: '',
        price: '',
        age: '',
        city: '',
        county: '',
        title: '',
        content: '',
        imagesJson: [],
        syncUser: false
      })
    },
    removeDomain (index) {
      this.dynamicForm.domains.splice(index,1)
    },
    recordIndex (index) {
      this.domainIndex = index
    },
    httpRequest (file) {
      this.imgFileList.push({
        index: this.domainIndex,
        file: file.file
      })
    },
    handleRemove(file) {
      let arr = this.imgFileList
      for(let i=0;i<this.imgFileList.length;i++) {
        if(this.imgFileList[i].file == file.raw) {
          arr.splice(i,1);
        }
      }
        this.imgFileList = arr
      },
  },
  mounted() {
    this.options = mapData
  }
}
</script>
<style lang="less" scoped>
.add-article {
    margin-top: 57px;
    padding: 10px;
    min-height: calc(100% - 80px);
    background-color: #fff;
    .article-form {
      width: 1000px;
      text-align: left;
      .content {
        display: block;
      }
      .checkbox {
        display: block;
        margin-left: 98px;
      }
      .delete {
        display: block;
        margin-left: 98px;
        margin-top: 5px;
        margin-bottom: 10px;
      }
      .line {
        border-bottom: 1px solid #cccccc;
        margin-bottom: 10px;
      }
      .submit {
        margin-left: 98px;
        margin-top: 20px;
      }
    }
}
</style>