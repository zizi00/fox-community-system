<template>
    <div class="domains">
        <div class="search-wrapper">
            <el-form :inline="true" ref="search_data" :model="articleForm">
                <el-form-item label="关键词:">
                    <el-input v-model="articleForm.title" size="small" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="状态:">
                    <el-select v-model="articleForm.audit" placeholder="请选择" size="small" clearable>
                        <el-option key="0"  label="待审核" value="0"></el-option>
                        <el-option key="10"  label="已发布" value="10"></el-option>
                        <el-option key="20"  label="驳回" value="20"></el-option>
                        <el-option key="30"  label="下架" value="30"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地区:">
                    <el-input v-model="articleForm.city" size="small" placeholder="请输入城市"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-form-item label="时间:">
                    <el-date-picker
                        v-model="articleForm.beginDate"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择开始时间">
                    </el-date-picker> --
                    <el-date-picker
                        v-model="articleForm.endDate"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
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
                <el-table-column prop="pic" label="头像" align="center">
                  <template slot-scope="scope">
                    <img style="width:50px;height:50px" :src="'http://foxcommunity.oss-cn-beijing.aliyuncs.com/'+scope.row.pic" alt="图片错误">
                  </template>
                </el-table-column>
                <el-table-column prop="nickname" label="用户昵称" align="center"></el-table-column>
                <el-table-column prop="title" label="标题" align="center"></el-table-column>
                <el-table-column prop="address" label="地址" align="center"></el-table-column>
                <el-table-column prop="age" label="联系方式" align="center"></el-table-column>
                <el-table-column prop="price" label="价格(元)" align="center"></el-table-column>
                <el-table-column prop="age" label="年龄" align="center"></el-table-column>
                <el-table-column prop="remark" label="备注" align="center"></el-table-column>
                <el-table-column prop="createTime" label="发布时间" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{scope.row.createTime | parseTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="audit" label="状态" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{auditMap[scope.row.audit]}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="operation" align="center" label="操作" fixed="right" width="200">
                <template slot-scope="scope">
                    <el-button
                    type="text"
                    size="small"
                    plain
                    v-if="scope.row.audit==0 || scope.row.audit==20"
                    @click="onDetail(scope.row)"
                    >通过 |</el-button>
                    <el-button
                    type="text"
                    size="small"
                    plain
                    v-if="scope.row.audit==30"
                    @click="onUp(scope.row.id)"
                    >上架 |</el-button>
                    <el-button
                    v-if="scope.row.audit==0"
                    type="text"
                    size="small"
                    plain
                    @click="onFailed(scope.row)"
                    >驳回</el-button>
                    <el-button
                    v-if="scope.row.audit==10"
                    type="text"
                    size="small"
                    plain
                    @click="onDown(scope.row.id)"
                    >下架</el-button>
                    <el-button
                    v-if="scope.row.audit==20 || scope.row.audit==30"
                    type="text"
                    size="small"
                    plain
                    @click="onDelete(scope.row)"
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
                <el-form :model="userData" ref="dynamicForm" label-width="100px" :inline="true" class="article-form">
                    <el-form-item
                    label="微信"
                    >
                    <el-input v-model="userData.wechatId"></el-input>
                    </el-form-item>
                    <el-form-item
                    label="手机"
                    >
                    <el-input v-model="userData.phone"></el-input>
                    </el-form-item>
                    <el-form-item
                    label="QQ"
                    >
                    <el-input v-model="userData.qq"></el-input>
                    </el-form-item>
                    <el-form-item
                    label="价格"
                    :rules="{
                        required: true, message: '价格不能为空', trigger: 'blur'
                    }"
                    >
                    <el-input v-model="userData.price"></el-input>
                    </el-form-item>
                    <el-form-item
                    label="年龄"
                    :rules="{
                        required: true, message: '年龄不能为空', trigger: 'blur'
                    }"
                    >
                    <el-input v-model="userData.age"></el-input>
                    </el-form-item>
                    <el-form-item
                    label="地址"
                    >
                    <el-cascader
                        v-model="userData.city"
                        :options="options"></el-cascader>
                    </el-form-item>
                    <el-form-item
                    label="标题"
                    :rules="{
                        required: true, message: '标题不能为空', trigger: 'blur'
                    }"
                    >
                    <el-input v-model="userData.title" style="width: 500px" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item
                    class="content"
                    label="备注"
                    >
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="userData.content" style="width: 500px;"></el-input>
                    </el-form-item>
                    <el-form-item class="upload-item" label="图片">
                    <!-- <div class="hide-div" @click="recordIndex(index)">
                        <el-upload
                        action=""
                        :http-request="httpRequest"
                        list-type="picture-card"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                        </el-upload>
                    </div> -->
                    </el-form-item>
                    <el-form-item label="" class="checkbox">
                    <el-checkbox v-model="userData.syncUser">同步到女用户表</el-checkbox>
                    </el-form-item>
                
                <el-form-item class="submit">
                    <el-button type="primary" :disabled="btnDisabled" @click="submitForm('dynamicForm')">提交全部</el-button>
                </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <!-- 驳回 -->
        <el-dialog
            title="审核确认"
            :visible.sync="failedDialog"
            width="450px"
            :before-close="handleClose">
            <span>确定拒绝通过</span><span style="color:#409EFF;">{{userData.nickname}}</span><span>的动态内容吗？</span>
            <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="failedMessage">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="onSubmitFailed(userData.id, userData.nickname)">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 删除 -->
        <el-dialog
            title="审核确认"
            :visible.sync="deleteDialog"
            width="450px"
            :before-close="handleClose">
            <span>确定删除当前动态内容吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="onSubmitDelete(userData.id)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getDynamic, updateAudit, updateDynamic } from '@/api/article.js'
import mapData from '../../../static/json/map.json'
export default {
    name: "domians",
    data () {
        return {
            articleDialog: false,
            articleForm: {
                page: 1,
                pageSize: 10,
                audit: "",
                title: "",
                city: "",
                beginDate: "",
                endDate: ""
            },
            tableData: [],
            total: 0, //分页
            currentPage: 1,
            auditMap: {
                0: "待审核",
                10: "已发布",
                20: "驳回",
                30: "下架"
            },
            detailData: [],
            photoList: [],
            userData: [],
            failedDialog: false,
            failedMessage: "",
            deleteDialog: false,
            options: [],
            btnDisabled: false
        }
    },
    methods: {
        initData() {
            getDynamic(this.articleForm).then(res =>{
                if(res.code === 1) {
                    let arr = []
                    arr = res.data
                    for(let i=0;i<arr.length;i++) {
                        arr[i].address=arr[i].city+arr[i].county
                    }
                    this.tableData = arr
                    this.total = res.count
                }
            })
        },
        handleCurrentChange(val) {
            this.articleForm.page = val
            this.initData()
        },
        onSearch () {
            this.currentPage = 1
            this.articleForm.page = 1
            this.initData()

        },
        // 查看详情
        onDetail (row) {
            this.userData.wechatId = row.wechatId
            this.userData.qq = row.qq
            this.userData.phone = row.phone
            this.userData.price = row.price
            this.userData.age = row.age
            this.userData.city = row.city
            this.userData.title = row.title
            this.userData.content = row.content
            this.userData.syncUser = row.syncUser
            this.articleDialog = true
            console.log(this.userData)
        },
        addArticle() {
            this.$router.push({name: 'addArticle'})
        },
        handleClose () {
            this.failedDialog = false
            this.deleteDialog = false
            this.articleDialog = false
        },
        // 驳回
        onFailed (row) {
            this.userData = row
            this.failedDialog = true
        },
        // 删除
        onDelete (row) {
            this.userData = row
            this.deleteDialog = true
        },
         // 确认驳回
        onSubmitFailed(id,nickname) {
            // 调用接口
            let params = {
                id: id,
                audit : 20,
                content: this.failedMessage
            }
            updateAudit(params).then(res => {
                if(res.code === 1) {
                    this.failedDialog = false
                    this.$notify({
                        title: '操作成功',
                        message: '已驳回'+ nickname +'的动态',
                        type: 'warning'
                        });
                    this.initData()
                }
            })
        },
        // 确认删除
        onSubmitDelete(id) {
            let params = {
                id: id,
                audit : -1,
                content: ""
            }
            updateAudit(params).then(res => {
                if(res.code === 1) {
                    this.deleteDialog = false
                    this.$notify({
                        title: '操作成功',
                        message: '已删除的动态',
                        type: 'warning'
                        });
                    this.initData()
                }
            })
        },
        // 上架
        onUp(id) {
            let params = {
                id: id,
                audit : 10,
                content: ""
            }
            updateAudit(params).then(res => {
                if(res.code === 1) {
                    this.initData()
                }
            })
        },
        // 下架
        onDown(id) {
            let params = {
                id: id,
                audit : 30,
                content: ""
            }
            updateAudit(params).then(res => {
                if(res.code === 1) {
                    this.initData()
                }
            })
        },
        // 审核内容
        submitForm (formName) {
            updateDynamic(this.userData).then(res=>{
                console.log(res)
            })
        }
    },
    created () {
        this.initData()
    },
    mounted() {
        this.options = mapData
    }
}
</script>
<style lang="less" scoped>
.domains {
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
    /deep/.el-dialog__header {
        text-align: left;
        background-color: #fcfcfc;
        border-bottom: 1px solid #f5f5f5;
    }
    /deep/.el-dialog__body {
        padding: 50px 20px;
        text-align: left;
    }
    /deep/.el-dialog__footer {
        padding: 15px 20px;
        border-top: 1px solid #f5f5f5;
    }
    /deep/.el-textarea__inner {
        margin-top: 10px;
    }
}
</style>