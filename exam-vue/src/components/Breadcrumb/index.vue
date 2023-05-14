<template>
  <div style="display: flex; align-items: center">
    <div
      style="padding: 0 10px; font-size: 20px; cursor: pointer"
      @click="Collapse"
    >
      <span v-show="isCollapse" class="el-icon-s-fold"></span>
      <span v-show="!isCollapse" class="el-icon-s-unfold"></span>
    </div>
    <el-breadcrumb>
      <template v-for="(item, index) in breadcrumbList">
        <el-breadcrumb-item
          class="root"
          v-if="parentName && index > 0"
          :key="item.parentName"
        >
          {{ parentName }}</el-breadcrumb-item
        >
        <el-breadcrumb-item
          v-if="
            index == breadcrumbList.length - 1 && item.path !== '/dashboard'
          "
          :key="item.name"
          >{{ item.name }}
        </el-breadcrumb-item>
        <el-breadcrumb-item
          class="root"
          v-else-if="item.path !== '/dashboard'"
          :key="item.path"
          >{{ item.name }}</el-breadcrumb-item
        >
      </template>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbList: [],
      parentName: null,
      isCollapse: true
    }
  },
  watch: {
    $route() {
      this.initBreadcrumbList()
    }
  },
  methods: {
    initBreadcrumbList() {
      this.breadcrumbList = this.$route.matched
      this.parentName = this.$route.meta.parentName
    },
    Collapse() {
      this.isCollapse = !this.isCollapse
      this.$bus.$emit('Collapse')
    }
  },
  created() {
    this.initBreadcrumbList()
  }
}
</script>

<style scoped>
.root {
  color: #666;
  font-weight: 600!important;
}
</style>
