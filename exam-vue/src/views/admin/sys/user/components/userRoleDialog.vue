<template>
  <div>
    <el-dialog
      title="分配角色"
      width="30%"
      :visible.sync="showDialog"
      :before-close="handleClose"
    >
      <el-form :model="form" label-width="100px">
        <el-checkbox-group v-model="form.checkedRoles">
          <el-checkbox
            v-for="role in form.roleList"
            :key="role.id"
            :label="role.id"
            name="checkedRoles"
            >{{ role.name }}</el-checkbox
          >
        </el-checkbox-group>
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
    showDialog: {
      type: Boolean,
      default: false,
      required: true
    },
    userRoleList: {
      type: Array
    }
  },
  data() {
    return {
      form: {
        id: -1,
        roleList: [],
        checkedRoles: []
      }
    }
  },
  watch: {
    id: function (newVal, oldVal) {
      if (newVal != -1) {
        this.search(newVal)
      }
    },
    userRoleList: {
      handler(newVal, oldVal) {
        newVal.forEach((item) => {
          this.form.checkedRoles.push(item.id)
        })
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    search() {
      userApi.roleList().then((resp) => {
        if (resp.code==200) {
          this.form.roleList = resp.data.roleList
        } else {
          this.$message.error(resp.message)
          this.handleClose()
        }
      })
    },
    handleClose() {
      this.form.checkedRoles=[]
      this.$emit('close')
    },
    handleConfirm() {
      userApi.editUserRole(this.id, this.form.checkedRoles).then((resp) => {
        if (resp.code == 200) {
          this.$message.success('修改成功')
          this.$emit('initUserList')
          this.handleClose()
        } else {
          this.$message.error(resp.message)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>