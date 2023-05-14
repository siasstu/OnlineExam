<template>
  <div>
    <el-row>
      <el-col :lg="7" :xs="8" :sm="8" :md="8" style="padding: 0 10px">
        <el-card style="margin-bottom: 20px">
          <div slot="header">
            <span style="font-size: 16px">关于我</span>
          </div>
          <div>
            <div class="box-center">
              <avator :currentUser="form" />
            </div>
            <div class="user-role text-center text-muted">
              {{ form.realName }}
            </div>
          </div>
          <div class="user-bio">
            <div class="user-bio-section">
              <div class="user-bio-section-header"><span>个人简介</span></div>
              <div>
                <div class="text-muted">注册时间：{{ dateFormat(form.createTime) }}</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="17" :xs="14" :sm="14" :md="14" style="padding: 0 10px">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane label="资料修改" name="first">
              <el-form
                :model="form"
                ref="form"
                label-width="100px"
                :rules="rules"
              >
                <el-form-item label="用户名：" prop="userName" required>
                  <el-input v-model="form.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="真实姓名：" prop="realName" required>
                  <el-input v-model="form.realName"></el-input>
                </el-form-item>
                <el-form-item label="手机号：" prop="phoneNumber" required>
                  <el-input v-model="form.phoneNumber"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：" prop="email" required>
                  <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="性别：" required>
                  <el-select v-model="form.sex" placeholder="性别" clearable>
                    <el-option
                      v-for="item in sexEnum"
                      :key="item.key"
                      :value="item.value"
                      :label="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="出生日期：" required>
                  <el-date-picker
                    v-model="form.birthDay"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm">更新</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="密码修改" name="second">
              <el-form
                :model="passwordForm"
                ref="form"
                label-width="100px"
                :rules="rules"
              >
                <el-form-item label="旧密码：" prop="password" required>
                  <el-input v-model="passwordForm.password"></el-input>
                </el-form-item>
                <el-form-item label="新密码：" prop="newPassword" required>
                  <el-input v-model="passwordForm.newPassword"></el-input>
                </el-form-item>
                <el-form-item
                  label="确认密码："
                  prop="confirmPassword"
                  required
                >
                  <el-input v-model="passwordForm.confirmPassword"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="modifyPasswordForm"
                    >更新</el-button
                  >
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userApi from '@/api/index'
import avator from './avator.vue'
export default {
  components: { avator },
  data() {
    return {
      form: {},
      sexEnum: [
        { key: true, value: '男' },
        { key: false, value: '女' }
      ],
      rules: {
        realName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '请输入真实姓名', trigger: 'change' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, message: '密码长度不小于6个字符', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, message: '密码长度不小于6个字符', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      passwordForm: {},

      activeName: 'first'
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.form = this.$store.state.userInfo
    },
    submitForm() {
      userApi.userInfoEdit(this.form).then((resp) => {
        if (resp.code === 200) {
          this.$message.success('修改成功')
          this.$store.commit('SET_USERINFO', resp.data)
          this.getUser()
        } else {
          this.$message.error(resp.message)
        }
      })
    },
    modifyPasswordForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (
            this.passwordForm.newPassword !== this.passwordForm.confirmPassword
          ) {
            this.$message.error('两次密码不同,请确认')
          } else {
            userApi.passwordEdit(this.passwordForm).then((resp) => {
              if (resp.code === 200) {
                this.$store.commit('REMOVE_INFO')
                this.$router.push('/login')
                this.$message.success('修改成功,请重新登录')
              } else {
                this.$message.error(resp.message)
              }
            })
          }
        }
      })
    },
    dateFormat(val) {
      console.log(val)
      if (val > 0) {
        var date = new Date(Number(val)) 
        var Y = date.getFullYear() + '-'
        var M =
          (date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1) + '-'
        var D = date.getDate() + ' '
        var h = date.getHours() + ':'
        var m = date.getMinutes() + ':'
        var s =
          date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        return Y + M + D + h + m + s
      } else {
        return val
      }
    }
  }
}
</script>

<style scoped>
.box-center {
  margin: 0 auto;
  width: 100px;
  margin-top: 10px;
  height: 100px;
  border-radius: 100%;
}

.text-muted {
  color: #777;
}
.user-name {
  font-weight: bold;
  font-size: 20px;
  color: #111;
}

.box-center {
  padding-top: 10px;
}
.user-role {
  padding-top: 10px;
  font-weight: 400;
  font-size: 14px;
}
.text-center {
  text-align: center;
}

.user-bio {
  margin-top: 20px;
  color: #606266;
}

span {
  padding-left: 4px;
}

.user-bio-section {
  font-size: 14px;
  padding: 15px 0;
}
.user-bio-section-header {
  border-bottom: 1px solid #dfe6ec;
  padding-bottom: 10px;
  margin-bottom: 10px;
  font-weight: bold;
}
</style>