<template>
  <div>
    <handle-button
      :ids="ids"
      @handleEdit="handleUserDialogValue"
      @handleDelete="handleDelete"
      @clearSelection="clearSelection"
      @initUserList="search"
    />
    <el-table
      :data="tableData"
      ref="multipleTable"
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
      border
      style="width: 100%"
      row-key="id"
    >
      <el-table-column
        reserve-selection
        type="selection"
        width="39 "
        style="text-align: center"
        :selectable="checkSelectable"
      />
      <el-table-column fixed prop="createTime" label="注册日期" width="160" />
      <el-table-column
        prop="username"
        label="用户名(学号/工号)"
        align="center"
        width="150"
      />
      <el-table-column
        prop="realName"
        label="姓名"
        align="center"
        width="100"
      />
      <el-table-column prop="sex" label="性别" align="center" width="50" />
      <el-table-column prop="email" label="邮箱" width="180" />
      <el-table-column prop="phoneNumber" label="手机号" width="115" />
      <el-table-column prop="roles" label="用户角色" width="180">
        <template slot-scope="{ row }">
          <el-tag
            size="small"
            type="warning"
            v-for="(item, index) in row.roleList"
            :key="index"
            >{{ item.name }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="status" align="center" label="状态" width="150">
        <template slot-scope="{ row }">
          <el-switch
            v-model="row.status"
            @change="statusChangeHanle(row)"
            active-text="正常"
            inactive-text="禁用"
            active-color="green"
            inactive-color="red"
            active-value="0"
            inactive-value="1"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="235" />
      <el-table-column fixed="right" label="操作" align="center" width="320">
        <template slot-scope="scope">
          <el-button
            @click="handleUserRoleDialogValue(scope.row)"
            type="success"
            size="mini"
            icon="el-icon-s-tools"
            plain
            >分配角色</el-button
          >
          <el-button
            type="success"
            style="margin-left: 5px"
            icon="el-icon-edit"
            size="mini"
            @click="handleUserDialogValue(scope.row.id)"
          ></el-button>
          <el-popconfirm
            v-if="scope.row.id != 1"
            title="您确定要删除这条记录吗？"
            @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button
                size="mini"
                style="margin-left: 5px"
                type="danger"
                icon="el-icon-delete-solid"
              />
            </template>
          </el-popconfirm>
          <el-popconfirm
            v-if="scope.row.id != 1"
            title="您确定要对这个用户重置密码吗？"
            @confirm="handleRestPassword(scope.row.id)"
          >
            <template #reference>
              <el-button
                size="mini"
                style="margin-left: 5px"
                type="warning"
                icon="el-icon-refresh-left"
                >重置密码</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :queryParam="queryParam"
      :pageIndex.sync="queryParam.pageIndex"
      :pageSize.sync="queryParam.pageSize"
      @pagination="search"
    />
    <user-dialog
      :showDialog="userDialog"
      :dialogTitle="dialogTitle"
      :id="id"
      @close="userDialogClose"
      @initUserList="search"
    />
    <user-role-dialog
      :showDialog="roleDialog"
      :id="userId"
      :userRoleList="userRoleList"
      @close="roleDialogClose"
      @initUserList="search"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import userApi from '@/api'
import userDialog from './components/userDialog.vue'
import UserRoleDialog from './components/userRoleDialog.vue'
import handleButton from './components/handleButton.vue'

export default {
  components: { Pagination, userDialog, UserRoleDialog, handleButton },
  data() {
    return {
      tableData: [],
      queryParam: {
        pageIndex: 1,
        pageSize: 10
      },
      total: 0,
      userDialog: false,
      id: -1,
      dialogTitle: '',
      roleDialog: false,
      userId: -1,
      userRoleList: [],
      ids: []
    }
  },
  created() {
    this.search()
  },
  methods: {
    /**
     * 用户搜索
     */
    search(query) {
      if (query != null) {
        this.queryParam = query
      }
      userApi.userPage(this.queryParam).then((resp) => {
        if (resp.code === 200) {
          this.tableData = resp.data.list
          this.total = resp.data.total
        } else {
          this.$message.error(resp.message)
        }
      })
    },
    /**
     * 修改用户状态
     */
    statusChangeHanle(row) {
      userApi.statusUpdade(row.id, row.status).then((resp) => {
        if (resp.code === 200) {
          this.$message.success('修改成功')
        } else {
          this.$message.error(resp.message)
        }
        this.search()
      })
    },
    /**
     * 选中用户id
     */
    handleSelectionChange(val) {
      this.ids = val.map((item) => item.id)
    },
    /**
     * 是否能够多选
     */
    checkSelectable(row) {
      return row.id === 1 ? false : true
    },
    /**
     * 删除用户
     */
    handleDelete(id) {
      if (id != null) {
        if (this.ids.findIndex((item) => item === id) == -1) {
          this.ids.push(id)
        }
      }
      if (this.ids.length === 0) {
        this.$message.error('请先选择删除用户！！')
        return false
      }
      userApi.removeUserByIds(this.ids).then((resp) => {
        if (resp.code == 200) {
          this.$message.success('删除成功')
          this.search()
          this.clearSelection()
        } else {
          this.$message.error(resp.message)
        }
      })
    },
    /**
     * 重置密码
     */
    handleRestPassword(id) {
      userApi.resetPassword(id).then((resp) => {
        if (resp.code == 200) {
          this.$message.success('修改成功')
          this.search()
        } else {
          this.$message.error(resp.message)
        }
      })
    },
    /**
     * 清除多选
     */
    clearSelection() {
      this.$refs.multipleTable.clearSelection()
      this.ids = []
    },
    /**
     * 用户信息dialog关闭打开
     */
    userDialogClose() {
      this.id = null
      this.userDialog = false
    },
    handleUserDialogValue(id) {
      if (id) {
        this.id = id
        this.dialogTitle = '修改用户信息'
      } else {
        this.id = -1
        this.dialogTitle = '添加用户'
      }
      this.userDialog = true
    },
    /**
     * 分配角色dialog关闭打开
     */
    handleUserRoleDialogValue(row) {
      if (row) {
        this.userId = row.id
        this.userRoleList = row.roleList
      } else {
        this.userId = -1
      }
      this.roleDialog = true
    },
    roleDialogClose() {
      this.userId = -1
      this.roleDialog = false
    }
  }
}
</script>