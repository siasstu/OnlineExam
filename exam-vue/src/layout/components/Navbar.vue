<template>
  <div style="display: flex;box-shadow: 0 2px  2px #f1f1f1;height: 50px;line-height: 50px;" >
    <breadcrumb style="flex: 1;"/>
    <div class="right-menu">
      <el-dropdown trigger="click" style="cursor: pointer;">
        <div style="display: flex; padding-right: 20px;">
          <el-avatar :size="50" :src="'http://localhost:8088/image/userAvatar/'+user.avatar"></el-avatar>
          <span style="display: block;padding-left: 10px;">{{user.realName}}
            <i class="el-icon-caret-bottom" />
          </span>
        </div>
        <el-dropdown-menu slot="dropdown" >
          <router-link to="/userInfo">
            <el-dropdown-item>个人信息</el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>主页</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="logout"  divided>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import userApi from '@/api'
export default {
  components: {
    Breadcrumb,
  },
  data() {
    return {
      user: this.$store.state.userInfo,
    }
  },
  methods: {
    logout() {
      userApi.logout().then(resp => {
        if (resp.code == 200) {
          this.$store.commit('RESET_TAGS')
          this.$store.dispatch('logout')
        }
      })
    }
  }
}
</script>