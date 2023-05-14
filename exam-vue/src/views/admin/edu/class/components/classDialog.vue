<template>
  <div>
    <el-dialog
      top="10vh"
      :title="dialogTitle"
      center
      :visible.sync="showClassDialog"
      :before-close="handleConfirm"
      width="30%"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="班级名称" prop="className">
          <el-input v-model="form.className" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" />
        </el-form-item>
        <el-form-item
          label="创建时间"
          prop="createTime"
          v-if="form.createTime != null"
        >
          <el-date-picker
            v-model="form.createTime"
            type="date"
            placeholder="选择日期"
            disabled
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleConfirm">确认</el-button>
          <el-button @click="handleDialogClose">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/admin'
export default {
  data() {
    return {
      form: {}
    }
  },
  props: ['id', 'showClassDialog', 'dialogTitle'],
  watch: {
    id: {
      handler(newVal, oldVal) {
        if (newVal != -1  && newVal) {
          this.search(newVal)
        } else {
          this.form = {}
        }
      }
    }
  },
  methods: {
    search(id) {
      api.getClassInfo(id).then((resp) => {
        this.form = resp.data
      })
    },
    knowsEdit(data) {
      // this.showDialog = true
    },
    handleConfirm() {
      this.$emit('close')
    },
    handleDialogClose() {
      this.$emit('close')
    }
  }
}
</script>