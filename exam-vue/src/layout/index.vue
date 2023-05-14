<template>
  <div class="app-container">
    <el-container>
      <sidebar />
      <el-container>
        <el-header style="padding: 0">
          <navbar />
          <tags-view />
        </el-header>
        <el-main>
          <app-main  style="margin-top: 20px"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { AppMain, Navbar, Sidebar, TagsView } from './components'
export default {
  name: 'Layout',
  components: {
    AppMain,
    Sidebar,
    TagsView,
    Navbar
  },
  beforeCreate() {
    if (JSON.parse(localStorage.getItem('first'))) {
      location.reload()
      localStorage.setItem('first', false)
    }
  }
}
</script>
