<template>
  <el-dialog
    top="10vh"
    :title="subjectDialogTitle"
    center
    v-model="form"
    :visible.sync="subjectDialog"
    :before-close="handleSubjectDialogClose"
    width="30%"
  >
    <el-form :model="form" label-width="100px">
      <el-form-item label="课程名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>

      <el-form-item label="所属学期：" prop="semesterId">
        <el-select size="medium" v-model="form.semesterId" clearable>
          <el-option
            v-for="item in semesterList"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          >
          </el-option>
        </el-select>
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
      <el-form-item
        label="创建人"
        prop="createUser"
        v-if="form.createUser != null"
      >
        <el-input v-model="form.createUser" disabled />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleConfirm">确认</el-button>
        <el-button @click="handleSubjectDialogClose">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import eduApi from '@/api/admin'
export default {
  props: ['id', 'subjectDialog', 'subjectDialogTitle', 'semesterList'],
  data() {
    return {
      form: {}
    }
  },
  watch: {
    id: function (newVal, oldVal) {
      if (newVal != -1 && newVal) {
        this.search(newVal)
      } else {
        this.form = {}
      }
    }
  },
  methods: {
    search(id) {
      eduApi.getSubjectByid(id).then((resp) => {
        this.form = resp.data
      })
    },
    handleSubjectDialogClose() {
      this.$emit('close')
    },
    handleConfirm() {
      eduApi.subjectEdit(this.form).then((resp) => {
        if (resp.code == 200) {
          this.$message.success(resp.message)
          this.$emit('initSubjectList')
          this.handleSubjectDialogClose()
        } else {
          this.$message.error(resp.message)
        }
      })
    }
  }
}
</script>