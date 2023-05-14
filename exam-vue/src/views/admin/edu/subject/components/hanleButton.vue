<template>
  <el-row>
    <el-form :model="queryParam" ref="queryForm" :inline="true">
      <el-form-item label="所属学期：" prop="semesterId">
        <el-select size="medium" v-model="queryParam.semesterId" clearable>
          <el-option
            v-for="item in semesterList"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="课程名称：">
        <el-input
          v-model="queryParam.name"
          placeholder="课程名称"
          size="medium"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="handleSelect">查询</el-button>
        <el-button type="primary" @click="handleDialogValue(null)" size="medium"
          >新增</el-button
        >
        <el-popconfirm
          title="您确定批量删除这些记录吗？"
          @confirm="handleDelete"
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
  props: ["semesterList"],
  data() {
    return {
      queryParam: {
        pageIndex: 1,
        pageSize: 10
      },
    }
  },
  methods: {
    handleDialogValue(val) {
      this.$emit('handleEdit', val)
    },
    handleDelete() {
      this.$emit('handleDelete', null)
    },
    handleSelect(){
      this.$emit('initList', this.queryParam)
    }
  }
}
</script>