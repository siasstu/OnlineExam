<template>
  <div>
    <handle-button
      @handleEdit="handleRoleDialogValue"
      @handleDelete="handleDelete"
      @clearSelection="clearSelection"
      @initRoleList="search"
    />
    <el-table
      ref="multipleTable"
      :data="tableData"
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
      row-key="id"
      style="width: 100%"
    >
      <el-table-column
        :selectable="checkSelectable"
        reserve-selection
        type="selection"
        width="50 "
        align="center"
        style="text-align: center"
      />
      <el-table-column prop="name" label="角色名称" width="200" />
      <el-table-column prop="code" label="权限字符" width="130" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column prop="remark" label="备注" />
      <el-table-column fixed="right" label="操作" align="center" width="330">
        <template slot-scope="scope">
          <el-button
            @click="handleMenuDialogValue(scope.row.id)"
            type="success"
            size="mini"
            icon="el-icon-s-tools"
            plain
            >分配权限</el-button
          >
          <el-button
            type="success"
            style="margin-left: 5px"
            icon="el-icon-edit"
            size="mini"
            @click="handleRoleDialogValue(scope.row.id)"
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
    <role-per-dialog
      :id="rolePerId"
      :showPerDialog="showPerDialog"
      @close="rolePerDialogClose"
      @initRoleList="search"
    />
    <role-dialog
      :id="roleId"
      :showDialog="showDialog"
      :dialogTitle="dialogTitle"
      @close="roleDialogClose"
      @initRoleList="search"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import userApi from '@/api'
import RoleDialog from './components/roleDialog.vue'
import RolePerDialog from './components/RolePerDialog.vue'
import handleButton from './components/handleButton.vue'

export default {
  components: { Pagination, RoleDialog, RolePerDialog, handleButton },
  data() {
    return {
      tableData: [],
      queryParam: {
        pageIndex: 1,
        pageSize: 10
      },
      total: 0,
      ids: [],
      showDialog: false,
      showPerDialog: false,
      roleId: -1,
      rolePerId: -1,
      dialogTitle: ''
    }
  },
  created() {
    this.search()
  },
  methods: {
    search(query) {
      if (query != null) {
        this.queryParam = query
      }
      userApi.rolePage(this.queryParam).then((resp) => {
        if (resp.code === 200) {
          this.tableData = resp.data.list
          this.total = resp.data.total
        } else {
          this.$message.error(resp.message)
        }
      })
    },
    checkSelectable(row) {
      return row.id === 1 ? false : true
    },
    clearSelection() {
      this.$refs.multipleTable.clearSelection()
      this.ids = []
    },
    handleSelectionChange(val) {
      this.ids = val.map((item) => item.id)
    },
    handleRoleDialogValue(id) {
      if (id) {
        this.roleId = id
        this.dialogTitle = '角色修改'
      } else {
        this.roleId = -1
        this.dialogTitle = '角色添加'
      }
      this.showDialog = true
    },
    roleDialogClose() {
      this.roleId = null
      this.showDialog = false
    },
    handleDelete(id) {
      if (id != null) {
        if (this.ids.findIndex((item) => item === id) == -1) {
          this.ids.push(id)
        }
      }
      if (this.ids.length === 0) {
        this.$message.error('请先选择删除角色！！')
        return false
      }
      userApi.removeRoleByIds(this.ids).then((resp) => {
        if (resp.code == 200) {
          this.$message.success('删除')
          this.search()
          this.clearSelection()
        } else {
          this.$message.error(resp.message)
        }
      })
    },
    handleMenuDialogValue(id) {
      this.rolePerId = id
      this.showPerDialog = true
    },
    rolePerDialogClose() {
      this.showPerDialog = false
    }
  }
}
</script>
<style>