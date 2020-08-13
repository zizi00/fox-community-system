<template>
    <div class="article">
        <div class="search-wrapper">
            <el-form :inline="true" ref="search_data" :model="articleForm">
                <el-form-item label="关键词:">
                    <el-input v-model="articleForm.key" size="small" placeholder="标题/用户昵称搜索"></el-input>
                </el-form-item>
                <el-form-item label="状态:">
                    <el-select v-model="articleForm.state" placeholder="请选择" size="small" clearable>
                        <!-- <el-option key="1"  label="资料未完成" value="1"></el-option>
                        <el-option key="2"  label="待认证" value="2"></el-option>
                        <el-option key="3"  label="认证完成" value="3"></el-option>
                        <el-option key="4"  label="认证失败" value="4"></el-option>
                        <el-option key="5"  label="审核中" value="5"></el-option>
                        <el-option key="10"  label="封号" value="10"></el-option> -->
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="地区:">
                    <el-select v-model="usersForm.isValid" placeholder="请选择" size="small" clearable>
                        <el-option key="1"  label="有效" value="1"></el-option>
                        <el-option key="0"  label="已禁用" value="0"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="地区:">
                    <el-input v-model="articleForm.city" size="small" placeholder="请输入地区"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-form-item label="时间:">
                    <el-date-picker
                        v-model="articleForm.startDate"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="pickerOptions"
                        placeholder="选择开始时间">
                    </el-date-picker> --
                    <el-date-picker
                        v-model="articleForm.endDate"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="pickerOptions"
                        placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-button type="primary" size="small" icon="search" @click="onSearch()">搜索</el-button>
                </el-form-item>
            </el-form>
            <el-button type="primary" size="middle" @click="addArticle">+ 发布内容</el-button>
        </div>
        <div class="table_container">
            <el-table :data="tableData" border style="width: 100%">
                <!-- <el-table-column type="index" label="序号" align="center" width="100"></el-table-column> -->
                <el-table-column prop="phone" label="头像" align="center"></el-table-column>
                <el-table-column prop="nickname" label="用户昵称" align="center"></el-table-column>
                <el-table-column prop="city" label="标题" align="center"></el-table-column>
                <el-table-column prop="career" label="地址" align="center"></el-table-column>
                <el-table-column prop="age" label="联系方式" align="center"></el-table-column>
                <el-table-column prop="qq" label="价格" align="center"></el-table-column>
                <el-table-column prop="wechat" label="年龄" align="center"></el-table-column>
                <el-table-column prop="state" label="备注" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{stateMap[scope.row.state]}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="发布时间" align="center"></el-table-column>
                <el-table-column prop="isValid" label="状态" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{isValidMap[scope.row.isValid]}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="operation" align="center" label="操作" fixed="right" width="200">
                <template slot-scope="scope">
                    <el-button
                    type="text"
                    size="small"
                    plain
                    @click="onDetail(scope.row.id,scope.row.money,scope.row.isValid)"
                    >通过 |</el-button>
                    <el-button
                    type="text"
                    size="small"
                    plain
                    @click="onDeleteClassify(scope.row,scope.$index)"
                    >上架 |</el-button>
                    <el-button
                    v-if="scope.row.isValid == 1"
                    type="text"
                    size="small"
                    plain
                    @click="onChangeValid(scope.row.id,0)"
                    >驳回</el-button>
                    <el-button
                    v-if="scope.row.isValid == 0"
                    type="text"
                    size="small"
                    plain
                    @click="onChangeValid(scope.row.id,1)"
                    >下架</el-button>
                    <el-button
                    v-if="scope.row.isValid == 0"
                    type="text"
                    size="small"
                    plain
                    @click="onChangeValid(scope.row.id,1)"
                    >删除</el-button>
                </template>
                </el-table-column>
            </el-table>
            <el-row>
                <el-col :span="24">
                    <div class="pagination" v-if="total > 10">
                        <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="10"
                        background
                        layout="total, prev, pager, next, jumper"
                        :total="total">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!-- 弹出弹窗 -->
        <el-dialog
            :visible.sync="articleDialog"
            width="1200px"
            center
            :before-close="handleClose">
            <div class="article-wrapper">
                
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getDynamic } from '@/api/article.js'
export default {
    name: "article",
    data () {
        return {
            articleDialog: false,
            articleForm: {
                page: 1,
                pageSize: 10,
                state: "",
                title: "",
                city: "",
                beginDate: "",
                endDate: ""
            },
            tableData: [],
            total: 0, //分页
            currentPage: 1,
            stateMap: {
                1: "资料未完成",
                2: "待认证",
                3: "认证完成",
                4: "认证失败",
                5: "审核中",
                10: "封号"
            },
            detailData: [],
            photoList: [],
            pickerOptions: {
                disabledDate(time) {
                return time.getTime() > Date.now();
                },
            },
        }
    },
    methods: {
        initData() {
          // let param = {
          //   dynamicPageReq: this.articleForm
          // }
            getDynamic(this.articleForm).then(res =>{
                if(res.code === 1) {
                    this.tableData = res.data
                    this.total = res.count
                }
            })
        },
        handleCurrentChange(val) {
            this.usersForm.page = val
            this.initData()
        },
        onSearch () {
            this.currentPage = 1
            this.usersForm.page = 1
            this.initData()

        },
        // 查看详情
        onDetail (id,money,isValid) {
            this.photoList = []
            this.detailDialog = true
            let params = {
                userId: id
            }
            getByUserId(params).then(res => {
                if(res.code === 1) {
                    this.detailData = res.data
                    this.detailData.money = money
                    this.detailData.isValid = isValid
                    if(res.data.images.length>0) {
                        for(let i = 0; i<res.data.images.length; i++) {
                            this.photoList.push('http://foxcommunity.oss-cn-beijing.aliyuncs.com' +res.data.images[i].files.filePath)
                        }
                    }
                }
            })
        },
        onDeleteClassify () {

        },
        // 禁用或启用
        onChangeValid(userid, num) {
            let params = {
                id: userid,
                isValid : num
            }
            forbiddenUser(params).then(res => {
                if(res.code === 1) {
                    this.initData()
                }
            }) 
        },
        addArticle() {
            this.$router.push({name: 'addArticle'})
        },
        handleClose () {
            this.articleDialog = false
        }
    },
    created () {
        this.initData()
    }
}
</script>
<style lang="less" scoped>
.article {
    margin-top: 57px;
    padding: 10px;
    min-height: calc(100% - 80px);
    background-color: #f0f2f6;
    .search-wrapper {
        min-height: 50px;
        padding: 5px 0px;
        box-sizing: border-box;
        text-align: left;
        padding-left: 10px;
        background-color: #ffffff;
        .el-form--inline {
            min-height: 40px;
        }
    }
    .table_container {
        margin-top: 20px;
        padding: 10px;
        background-color: #ffffff;
        /deep/.el-table thead {
            background-color: #f9fafd;
        }
        /deep/.el-th {
            background-color: #f9fafd;
        }
        /deep/.el-table th>.cell {
            color: #000000;
            
        }
        .pagination{
            text-align: right;
            margin-top: 10px;
        }
    }
    .article-wrapper {
        
    }
}
</style>