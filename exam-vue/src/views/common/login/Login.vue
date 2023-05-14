<template>
  <div
    class="app-register"
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: column;
    "
  >
    <div
      style="
        width: 500px;
        height: 320px;
        background-color: #f7f7f7;
        border-radius: 10px;
        padding: 15px 50px 30px 50px;
      "
    >
      <div style="font-size: 30px; text-align: center; margin-bottom: 30px">
        登 录
      </div>
      <el-form :model="loginForm" ref="loginForm" :rules="rules" status-icon>
        <el-form-item prop="username">
          <el-input
            type="text"
            prefix-icon="el-icon-s-custom"
            style="font-size: 20px !important"
            v-model="loginForm.username"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            prefix-icon="el-icon-lock"
            style="font-size: 20px !important"
            show-password
            v-model="loginForm.password"
            clearable
          ></el-input>
        </el-form-item>
        <el-checkbox v-model="loginForm.rememberMe" style="margin-bottom: 10px"
          >记住密码</el-checkbox
        >
        <div>
          <el-button style="width: 100%" type="primary" @click="submitForm"
            >登录</el-button
          >
        </div>
      </el-form>
    </div>
    <div style="margin-top: 300px">
      <p style="text-align: center">2022-2023@sias.com</p>
    </div>
  </div>
</template>

<script>
import userApi from '@/api/index'
import { Icon } from 'element-ui'
import Cookies from 'js-cookie'
import { encrypt, decrypt } from '@/utils/jsencrypt'

import qs from 'qs'
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        rememberMe: false
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    if (JSON.parse(localStorage.getItem('first'))) {
      location.reload()
      localStorage.setItem('first', false)
    }
    this.getCookie()
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate((valid) => {
        if (this.loginForm.rememberMe) {
          Cookies.set('username', this.loginForm.username, { expires: 30 })
          Cookies.set('password', encrypt(this.loginForm.password), {
            expires: 30
          })
          Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 })
        } else {
          // 否则移除
          Cookies.remove('username')
          Cookies.remove('password')
          Cookies.remove('rememberMe')
        }
        if (valid) {
          userApi.login(qs.stringify(this.loginForm)).then((resp) => {
            if (resp.code === 200) {
              this.$store.commit('SET_TOKEN', resp.data.token)
              this.$store.commit('SET_MENULIST', resp.data.menuList)
              this.$store.commit('SET_USERINFO', resp.data.userInfo)
              this.$store.commit('SET_ROUTERS', resp.data.menuList)
              this.$store.commit('SET_ROUTES_STATE', true)
              let role = resp.data.userInfo.roles
              if (role === '学生') {
                this.$store.commit('SET_ROLE', role)
              } else {
                this.$store.commit('SET_ROLE', null)
              }
              this.$router.push({ path: '/dashboard' }).catch(() => {})
            } else {
              this.$message.error(resp.message)
            }
          })
        }
      })
    },
    register() {
      this.$router.push('/register')
    },
    getCookie() {
      const username = Cookies.get('username')
      const password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password:
          password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      }
    }
  },
  components: { Icon }
}
</script>