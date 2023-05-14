<template>
  <div style="height: calc(100vh); border: 0; background-color: #545c64">
    <div
      style="
        height: 50px;
        color: #fff;
        background-color: #545c50;
        text-align: center;
        line-height: 50px;
        font-size: 18px;
        font-family: cursive;
      "
    >
      <span>
        <img width="40px" src="@/assets/logo2.png" alt="" />
      </span>
      <el-collapse-transition>
        <span style="margin-left: 10px" v-show="!isCollapse">考试管理系统</span>
      </el-collapse-transition>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="border: 0"
      :collapse="isCollapse"
    >
      <router-link to="/">
        <el-menu-item :index="dashboard.path">
          <template>
            <i :class="dashboard.icon"></i>
            <span v-show="!isCollapse">{{ dashboard.name }}</span>
          </template>
        </el-menu-item>
      </router-link>

      <el-submenu
        :index="menu.path"
        v-for="(menu, index) in menuList"
        :key="index"
      >
        <template slot="title">
          <i :class="menu.icon"></i>
          <span>{{ menu.name }}</span>
        </template>
        <router-link
          v-for="(item, index) in menu.children"
          :key="index"
          :to="item.path"
        >
          <el-menu-item :index="item.path">
            <template>
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
          </el-menu-item>
        </router-link>
      </el-submenu>
      <el-menu-item :index="out.path" @click="logout">
        <template>
          <i :class="out.icon"></i>
          <span>{{ out.name }}</span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import userApi from '@/api'
export default {
  data() {
    return {
      menuList: [],
      isCollapse: false,
      out: {},
      dashboard: {}
    }
  },
  mounted() {
    this.menuList = this.$store.state.menuList

    let index = this.menuList.findIndex((t) => t.name === '退出系统')
    this.out = this.menuList[index]
    this.menuList.splice(index, 1)
    let dashboard = this.menuList.findIndex((t) => t.name === '首页')
    this.dashboard = this.menuList[dashboard]
    this.menuList.splice(dashboard, 1)
    this.$bus.$on('Collapse', this.Collapse)
  },
  methods: {
    Collapse() {
      this.isCollapse = !this.isCollapse
    },
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

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
</style>