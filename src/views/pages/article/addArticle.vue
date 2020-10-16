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
        <el-form-item label="昵称" class="nickname"
        :prop="'domains.' + index + '.nickname'"
        :rules="{
          required: true, message: '昵称不能为空', trigger: 'blur'
        }"
        >
          <el-input v-model="domain.nickname"></el-input>
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
          label="内容"
          :prop="'domains.' + index + '.content'"
          :rules="{
            required: true, message: '内容不能为空', trigger: 'blur'
          }"
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
        <el-button type="primary" :disabled="btnDisabled" @click="submitForm('dynamicForm')">提交全部</el-button>
        <el-button @click="addDomain" v-if="dynamicForm.domains.length<10">新增数据</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addDynamic, uploadPhoto } from '@/api/article.js'
import mapData from '../../../static/json/map.json'
import Exif from 'exif-js'
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
            nickname: '',
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
      isSuccess: false,
      btnDisabled: false,
      files: {
        name: "",
        type: ""
      },
      headerImage: null,
      picValue: null,
    }
  },
  methods: {
     submitForm (formName) {
       let that = this
      this.$refs[formName].validate(
        async function(valid) {
          if (valid) {
            that.btnDisabled = true
            let domainsData = that.dynamicForm.domains
            for(let j=0;j<domainsData.length;j++) {
              if(!domainsData[j].wechatId && !domainsData[j].qq && !domainsData[j].phone) {
                that.$message({
                    message: '微信，手机号码，QQ需选填一个',
                    type: 'error'
                  });
                  that.btnDisabled = false
                  return false
              }
              if(domainsData[j].city.length == 0) {
                that.$message({
                    message: '地区不能为空',
                    type: 'error'
                  });
                  that.btnDisabled = false
                  return false
              }
            }
            for(let i=0;i<that.dynamicForm.domains.length;i++) {
                let arr = []
                for(let j=0;j<that.imgFileList.length;j++) {
                  if(that.imgFileList[j].index == i) {
                    var formData = new FormData()
                    formData.append('img', that.imgFileList[j].file);
                    let data = await uploadPhoto(formData)
                      if(data.data.code === 1) {
                        arr.push ({
                          imgId: data.data.data.id
                        })
                      }else {
                        that.btnDisabled = false
                      }
                  }
                }
                if(arr[0]) {
                  that.dynamicForm.domains[i].imagesJson = JSON.stringify(arr)
                }else {
                  that.dynamicForm.domains[i].imagesJson = ""
                }
                if(that.dynamicForm.domains[i].syncUser) {
                  that.dynamicForm.domains[i].syncUser = 1
                }else {
                  that.dynamicForm.domains[i].syncUser = 0
                }
                that.dynamicForm.domains[i].county = that.dynamicForm.domains[i].city[2]
                that.dynamicForm.domains[i].city = that.dynamicForm.domains[i].city[1]

                let data = await addDynamic (that.dynamicForm.domains[i])
                  if(data.code == 1) {
                    that.isSuccess = true
                  }
              }
              if(that.isSuccess) {
                that.btnDisabled = false
                that.$notify({
                  title: '提示',
                  message: '内容添加成功'
                });
                that.$router.push({name: 'article'})
              }else {
                that.btnDisabled = false
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
        nickname: '',
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
      this.files.name = file.file.name; // 获取文件名
      this.files.type = file.file.type; // 获取类型
      this.picValue = file.file; // 文件流
      this.imgPreview(this.picValue);

    },

    // 处理图片
    imgPreview(file) {
      let self = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function () {
        Orientation = Exif.getTag(this, "Orientation");
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function () {
          // console.log(this.result);
          let result = this.result;
          let img = new Image();
          img.src = result;
          //判断图片是否大于1MB,是就直接上传，反之压缩图片
          if (this.result.length < 1024 * 1024) {
            self.headerImage = this.result;
            // self.postImg();
            let file = self.dataURLtoFile(self.headerImage);
            self.imgFileList.push({
              index: self.domainIndex,
              file: file
            })
          } else {
            img.onload = function () {
              let data = self.compress(img, Orientation);
              self.headerImage = data;
              let file = self.dataURLtoFile(self.headerImage);
              self.imgFileList.push({
                index: self.domainIndex,
                file: file
              })
            };
          }

          

        };
      }
    },

    // 压缩图片
    compress(img, Orientation) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      //瓦片canvas
      let tCanvas = document.createElement("canvas");
      let tctx = tCanvas.getContext("2d");
      // let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio;
      if ((ratio = (width * height) / 4000000) > 1) {
        // console.log("大于400万像素");
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      } else {
        ratio = 1;
      }
      canvas.width = width;
      canvas.height = height;
      //    铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //如果图片像素大于100万则使用瓦片绘制
      let count;
      if ((count = (width * height) / 1000000) > 1) {
        // console.log("超过100W像素");
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
        //      计算每块瓦片的宽和高
        let nw = ~~(width / count);
        let nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }
      //修复ios上传图片的时候 被旋转的问题
      if (Orientation != "" && Orientation != 1) {
        switch (Orientation) {
          case 6: //需要顺时针（向左）90度旋转
            this.rotateImg(img, "left", canvas);
            break;
          case 8: //需要逆时针（向右）90度旋转
            this.rotateImg(img, "right", canvas);
            break;
          case 3: //需要180度旋转
            this.rotateImg(img, "right", canvas); //转两次
            this.rotateImg(img, "right", canvas);
            break;
        }
      }
      //进行最小压缩
      let ndata = canvas.toDataURL("image/jpeg", 0.8);
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
      return ndata;
    },

    // 旋转图片
    rotateImg(img, direction, canvas) {
      //最小与最大旋转方向，图片旋转4次后回到原方向
      const min_step = 0;
      const max_step = 3;
      if (img == null) return;
      //img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height;
      let width = img.width;
      let step = 2;
      if (step == null) {
        step = min_step;
      }
      if (direction == "right") {
        step++;
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step);
      } else {
        step--;
        step < min_step && (step = max_step);
      }
      //旋转角度以弧度值为参数
      let degree = (step * 90 * Math.PI) / 180;
      let ctx = canvas.getContext("2d");
      switch (step) {
        case 0:
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0);
          break;
        case 1:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height);
          break;
        case 2:
          canvas.width = width;
          canvas.height = height;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, -height);
          break;
        case 3:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, 0);
          break;
      }
    },

    //将base64转换为文件
    dataURLtoFile(dataurl) {
      let arr = dataurl.split(","),
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], this.files.name, {
        type: this.files.type
      });
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
      .nickname {
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