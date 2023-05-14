<template>
  <el-row>
    <el-form :model="queryParam" ref="queryForm" :inline="true">
      <el-form-item label="工号/学号：">
        <el-input
          v-model="queryParam.username"
          size="medium"
          placeholder="工号/学号"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="handleSelect">查询</el-button>
        <el-popconfirm
          title="您确定批量删除这些记录吗？"
          @confirm="handleDelete(null)"
        >
          <template #reference>
            <el-button type="danger" style="margin-left: 10px" size="medium"
              >批量删除</el-button
            >
          </template>
        </el-popconfirm>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      queryParam: {
        pageIndex: 1,
        pageSize: 10
      },
    }
  },
  methods: {
    handleSelect() {
      this.$emit('initList', this.queryParam)
    },
    handleDelete() {
      this.$emit('handleDelete', null)
    },
  }
}
</script>

<style scoped>
</style>