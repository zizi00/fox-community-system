<template>
    <div class="login">
        <div class="login-wrapper">
            <div class="login-form">
                <el-card class="box-card">
                    <p class="title">狐狸社区业务管理系统</p>
                    <el-form ref="loginform" :model="loginform" class="form-wrapper" :rules="rules">
                        <el-form-item prop="username">
                            <el-input v-model="loginform.username" placeholder="请输入用户账号" clearable>
                                <i slot="prefix" class="el-input__icon el-icon-s-custom"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="loginform.password" placeholder="请输入登录密码" show-password clearable>
                                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </div>
        </div>
    </div>
</template>
<script>
import { login } from '@/api/aggregate.js'
let validUsername=(rule, value,callback)=>{
        if (!value){
            callback(new Error("用户账号不能为空"))
        }
        callback()
  };
let validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error("密码不能为空"));
        }
        callback()
      };
export default {
    name: "login",
    data () {
        return {
            loginform:{},
            rules: {
                username: [
                    { validator: validUsername, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        onSubmit() {
            this.$refs.loginform.validate(valid => {
                if(valid) {
                    let params = this.loginform
                    login(params).then(res => {
                        if(res.code === 1) {
                            let userInfo = JSON.parse(res.data)
                            // 把token存到本地
                            localStorage.setItem('token', userInfo.token)
                            localStorage.setItem('userName', userInfo.user.nickname)
                            console.log(userInfo)
                            // 存储数据
                            let user = {}
                            user.nickname = userInfo.user.nickname
                            this.$store.dispatch("setIsAutnenticated", !this.isEmpty(user));
                            this.$store.dispatch("setUser", user);
                            // 页面跳转
                            this.$router.push("/index");
                        }
                    })
                }else {
                    console.log("error submit!!");
                    // return false;
                }
            })
            
        },
        isEmpty(value) {
            return (
                value === undefined ||
                value === null ||
                (typeof value === "object" && Object.keys(value).length === 0) ||
                (typeof value === "string" && value.trim().length === 0)
            );
        }
    }
}
</script>
<style lang="less" scoped>
.login {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    .login-wrapper {
        width: 100%;
        height: 200px;
        background-color: #409EFF;
        .login-form {
            margin: 0 auto;
            margin-top: -102.5px;
            width: 370px;
            height: 410px;
            // border: 1px solid red;
            .box-card {
                width: 100%;
                height: 100%;
                .title{
                    padding: 12px 0;
                    color: #409EFF;
                    font-weight: bold;
                    font-size: 24px;
                }
                .form-wrapper{
                    margin: 0 auto;
                    margin-top: 60px;
                    width: 300px;
                    .el-input{
                        font-size: 16px;
                    }
                    .el-input--prefix .el-input__inner{
                        padding-left: 34px;
                    }
                    .el-input__prefix{
                        left: 7px;
                    }
                    .el-button--primary{
                        margin-top: 20px;
                        width: 100%;
                        font-size: 18px;
                    }
                }
            }
        }
    }
}
</style>
