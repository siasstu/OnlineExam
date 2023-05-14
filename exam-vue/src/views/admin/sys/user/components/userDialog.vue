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
        <el-form-item label="学号/工号：" prop="username">
          <el-input
            v-model="form.username"
            @change="checkUsername"
            style="width: 365px"
            :disabled="form.id == null ? false : 'disabled'"
          />
          <el-alert
            v-if="form.id == null"
            :title="alert.title"
            :closable="false"
            style="line-height: 10px"
            :type="alert.type"
          >
          </el-alert>
        </el-form-item>
        <el-form-item label="姓名：" label-width="100px">
          <el-input v-model="form.realName" style="width: 365px"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" label-width="100px">
          <el-input v-model="form.phoneNumber" style="width: 365px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" label-width="100px">
          <el-input v-model="form.email" style="width: 365px"></el-input>
        </el-form-item>
        <el-form-item label="状态：" label-width="100px" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="'0'">正常</el-radio>
            <el-radio :label="'1'">禁用</el-radio>
          </el-radio-group>
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
  props: ['id', 'dialogTitle', 'showDialog'],
  data() {
    return {
      form: {
        id: null,
        username: null,
        password: '123456',
        status: '0',
        phoneNumber: null,
        realName: null,
        email: null,
        remark: null
      },
      alert: {
        title: '默认初始密码：123456',
        type: 'success'
      }
    }
  },
  watch: {
    id: function (newVal, oldVal) {
      if (newVal != -1 && newVal) {
        this.search(newVal)
      } else {
        this.form = {
          id: null,
          username: null,
          password: '123456',
          status: '0',
          phoneNumber: null,
          realName: null,
          email: null,
          remark: null
        }
      }
    }
  },
  methods: {
    search(id) {
      userApi.getUserByid(id).then((resp) => {
        this.form = resp.data
      })
    },
    handleClose() {
      this.$emit('close')
    },
    handleConfirm() {
      userApi.userInfoEdit(this.form).then((resp) => {
        if (resp.code == 200) {
          this.$message.success(resp.data)
          this.$emit('initUserList')
          this.handleClose()
        } else {
          this.$message.error(resp.message)
        }
      })
    },
    checkUsername() {
      userApi.checkUsername(this.form).then((resp) => {
        if (resp.code !== 200) {
          this.alert.title = resp.message
          this.alert.type = 'error'
        } else {
          this.alert.title = '默认初始密码：123456'
          this.alert.type = 'success'
        }
      })
    }
  }
}
</script>