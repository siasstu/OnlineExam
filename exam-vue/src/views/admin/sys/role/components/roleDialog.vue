<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      center
      :visible.sync="showDialog"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="form" :inline="true" label-width="100px">
        <el-form-item label="角色名称：" label-width="100px">
          <el-input v-model="form.name" style="width: 365px"></el-input>
        </el-form-item>
        <el-form-item label="权限字符：" label-width="100px">
          <el-input v-model="form.code" style="width: 365px"></el-input>
        </el-form-item>
        <el-form-item label="备注：" label-width="100px" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            style="width: 365px"
            :rows="2"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleConfirm">确定</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import userApi from '@/api'
export default {
  props: ['showDialog', 'id', 'dialogTitle'],
  data() {
    return {
      form: { id: -1, name: '', code: '', remark: '' }
    }
  },
  watch: {
    id: function (newVal, oldVal) {
      if (newVal != -1 && newVal) {
        this.search(newVal)
      } else {
        this.form = {
          id: -1,
          name: '',
          code: '',
          remark: ''
        }
      }
    }
  },
  methods: {
    search() {
      userApi.getRoleById(this.id).then((resp) => {
        this.form = resp.data
      })
    },
    handleClose() {
      this.$emit('close')
    },
    handleConfirm() {
      userApi.roleEdit(this.form).then((resp) => {
        if (resp.code == 200) {
          this.$message.success('修改成功')
          this.$emit('initRoleList')
          this.handleClose()
        } else {
          this.$message.error(resp.message)
        }
      })
    }
  }
}
</script>