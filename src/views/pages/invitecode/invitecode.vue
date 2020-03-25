<template>
    <div class="invite-code">
        <div class="search-wrapper">
            <el-button type="primary" size="small" icon="search" @click="addCode()">添加邀请码</el-button>
        </div>
        <div class="table_container">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
                <el-table-column prop="categoryName" label="管理人" align="center"></el-table-column>
                <el-table-column prop="status" label="邀请码" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{statusMap[scope.row.status]}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createAt" label="联系电话" align="center"></el-table-column>
                <el-table-column prop="createAt" label="邀请男用户数" align="center"></el-table-column>
                <el-table-column prop="createAt" label="邀请女用户数" align="center"></el-table-column>
                <el-table-column prop="createAt" label="最近邀请时间" align="center"></el-table-column>
                <el-table-column prop="createAt" label="生成时间" align="center"></el-table-column>
                <el-table-column prop="createAt" label="状态" align="center"></el-table-column>
                <el-table-column prop="operation" align="center" label="操作" fixed="right" width="300">
                <template slot-scope="scope">
                    <el-button
                    type="text"
                    size="small"
                    plain
                    @click="onEditClassify(scope.row,scope.$index)"
                    >禁用</el-button>
                </template>
                </el-table-column>
            </el-table>
            </div>
        <el-dialog
            title="添加邀请码"
            :visible.sync="dialogVisible"
            width="40%"
            :before-close="handleClose">
            <div class="content">
                <el-form ref="form" :model="codeForm" label-width="80px">
                    <el-form-item label="邀请码:">
                        <div class="code">3535353553</div>
                    </el-form-item>
                    <el-form-item label="管理人">
                        <el-input v-model="codeForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <el-input v-model="codeForm.phone"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
            </el-dialog>
    </div>
</template>
<script>
export default {
    name: "invite-code",
    data () {
        return {
            codeForm: {
                name: "",
                phone: ""
            },
            tableData: [],
            dialogVisible: false
        }
    },
    methods: {
        addCode () {
            this.dialogVisible = true
        },
        handleClose () {
            this.dialogVisible = false
        },
        onEditClassify () {
            
        }
    }
}
</script>
<style lang="less" scoped>
.invite-code {
    padding: 10px;
    height: 100%;
    background-color: #f0f2f6;
    .search-wrapper {
        height: 50px;
        padding: 5px 0px;
        box-sizing: border-box;
        text-align: left;
        padding-left: 10px;
        background-color: #ffffff;
        .el-form--inline {
            height: 40px;
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
    }
    .content {
        .el-dialog__header {
            text-align: left;
        }
        .el-form-item__content {
            width: 300px;
        }
        .code {
            text-align: left;
        }
    }
}
</style>