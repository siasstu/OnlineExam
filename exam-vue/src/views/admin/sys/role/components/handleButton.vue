<template>
  <el-row >
    <el-form :model="queryParam" ref="queryForm" :inline="true">
      <el-form-item label="角色名称：">
        <el-input
          v-model="queryParam.name"
          size="medium"
          placeholder="角色名称"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="handleSelect">查询</el-button>
        <el-button type="primary" size="medium" @click="handleRoleDialogValue()"
          >新增</el-button
        >
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
      this.$emit('initRoleList', this.queryParam)
    },
    handleRoleDialogValue() {
      this.$emit('handleEdit', null)
    },
    handleDelete() {
      this.$emit('handleDelete', null)
    },
  }
}
</script>

<style scoped>
</style>