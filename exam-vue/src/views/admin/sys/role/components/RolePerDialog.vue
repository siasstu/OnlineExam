<template>
  <div>
    <el-dialog
      top="5px"
      title="分配权限"
      center
      :visible.sync="showPerDialog"
      width="30%"
       :before-close="handleClose"
    >
      <el-form :model="menuForm" label-width="100px">
        <el-tree
          :data="treeData"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :check-strictly="true"
          :props="defaultProps"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>{{ data.remark }}</span>
          </span>
        </el-tree>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="handleConfirm">确认</el-button>
          <el-button @click="handleClose">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import userApi from '@/api'
export default {
  props: {
    id: {
      type: Number,
      default: -1,
      required: true
    },
    showPerDialog: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      treeData: [],
      menuForm: { id: null },
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  watch: {
    id: function (newVal, oldVal) {
      this.search(newVal)
    }
  },
  methods: {
    search(id) {
      userApi.munuList().then((resp) => {
        this.treeData = resp.data
      })
      userApi.roleMenuList(id).then((resp) => {
        this.$refs.tree.setCheckedKeys(resp.data)
      })
    },
    handleClose() {
      this.$emit('close')
    },
    handleConfirm() {
      let list = this.$refs.tree.getCheckedKeys()
      userApi.editRoleMenu(this.id, list).then((resp) => {
        if (resp.code == 200) {
          this.$message.success('修改成功')
          this.$emit('initRoleList')
          this.handleClose()
        } else {
          this.$message.error(resp.message)
        }
      })
    },
  }
}
</script>
<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>