<template>
  <div>
    <el-row class="header">
      <el-button
        type="success"
        size="mini"
        class="el-icon-plus"
        @click="handleDialogValue(null)"
        >新增</el-button
      >
    </el-row>
    <el-scrollbar
      style="height: calc(100vh - 155px); width: 100%; background-color: #fff"
    >
      <el-table
        :data="tableData"
        row-key="id"
        stripe
        style="width: 100%"
        border
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="name" label="菜单名称" width="200" />
        <el-table-column prop="icon" label="图标" width="70" align="center">
          <template v-slot="scope">
            <i :class="scope.row.icon"></i>
          </template>
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="排序"
          width="70"
          align="center"
        />
        <el-table-column prop="perms" label="权限标识" width="200" />
        <el-table-column prop="path" label="路由路径" width="180" />
        <el-table-column prop="component" label="组件路径" width="220" />
        <el-table-column
          prop="menuType"
          label="菜单类型"
          width="120"
          align="center"
        >
          <template v-slot="scope">
            <el-tag
              size="small"
              v-if="scope.row.menuType === 'M'"
              type="danger"
              effect="dark"
              >目录</el-tag
            >
            <el-tag
              size="small"
              v-else-if="scope.row.menuType === 'C'"
              type="success"
              effect="dark"
              >菜单</el-tag
            >
            <el-tag
              size="small"
              v-else-if="scope.row.menuType === 'F'"
              type="warning"
              effect="dark"
              >按钮</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center" />
        <el-table-column prop="remark" label="备注" align="center" />
        <el-table-column
          prop="action"
          label="操作"
          width="250"
          fixed="right"
          align="center"
        >
          <template v-slot="scope">
            <el-button
              type="primary"
              size="mini"
              class="el-icon-edit"
              @click="handleDialogValue(scope.row.id)"
            />
            <el-popconfirm
              title="您确定要删除这条记录吗？"
              @confirm="handleDelete(scope.row.id)"
            >
              <template #reference>
                <el-button type="danger" size="mini" class="el-icon-delete" />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <menu-dialog
      :id="id"
      :showDialog="showDialog"
      :dialogTitle="dialogTitle"
      :data="tableData"
      @close="handleClose"
      @initMenuList="search"
    />
  </div>
</template>

<script >
import userApi from '@/api'
import MenuDialog from './components/menuDialog.vue'
export default {
  components: { MenuDialog },
  data() {
    return {
      tableData: [],
      showDialog: false,
      id: null,
      dialogTitle:''
    }
  },
  created() {
    this.search()
  },
  methods: {
    search() {
      userApi.munuList().then((resp) => {
        this.tableData = resp.data
      })
    },
    handleDialogValue(id) {
      if (id != null) {
        this.dialogTitle = '修改菜单'
        this.id = id
      } else {
        this.dialogTitle = '添加菜单'
        this.id = -1
      }
      this.showDialog = true
    },
    handleClose() {
      this.id = null
      this.showDialog = false
    },
    handleDelete(id) {
      userApi.removeMenu(id).then((resp) => {
        if (resp.code === 200) {
          this.$message.success('删除成功')
          this.search()
        } else {
          this.$message.error(resp.message)
        }
      })
    },
  }
}
</script>
