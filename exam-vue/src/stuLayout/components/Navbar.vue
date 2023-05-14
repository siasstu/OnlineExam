<template>
  <div
    style="
      display: flex;
      box-shadow: 0 2px 2px #f1f1f1;
      height: 60px;
      line-height: 60px;
    "
  >
    <router-link to="/">
      <div
        style="
          color: #000;
          background-color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: cursive;
          cursor: pointer;
        "
      >
        <span>
          <img width="59px" src="@/assets/logo2.png" alt="iexams" />
        </span>
        <span style="margin-left: 10px">考试管理系统</span>
      </div>
    </router-link>

    <div style="flex: 1"></div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      background-color="#fff"
      mode="horizontal"
      active-color="#ffd04b"
    >
      <el-menu-item
        v-for="item in menuList"
        :index="item.path"
        :key="item.path"
        style="padding: 0"
      >
        <router-link :to="item.path" style="display: block; padding: 0 20px">
          {{ item.name }}
        </router-link>
      </el-menu-item>
      <el-menu-item
        index="/userInfo"
        style="width: 120px; text-align: center; padding: 0"
      >
        <el-dropdown trigger="click">
          <span
            class="el-dropdown-link span"
            style="display: block; padding: 0 0 0 20px"
          >
            个人中心
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <span @click="$router.push('/userInfo')">
              <el-dropdown-item>个人信息</el-dropdown-item></span
            >
            <span @click="logout"
              ><el-dropdown-item>退出系统</el-dropdown-item></span
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import userApi from '@/api'

export default {
  data() {
    return {
      user: this.$store.state.userInfo,
      activeIndex: this.$store.state.menuList[0].path,
      menuList: this.$store.state.menuList
    }
  },
  created() {
    this.activeIndex = this.$route.path
  },
  methods: {
    logout() {
      userApi.logout().then((resp) => {
        if (resp.code == 200) {
          this.$store.commit('RESET_TAGS')
          this.$store.dispatch('logout')
        }
      })
    }
  }
}
</script>