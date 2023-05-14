<template>
  <div>
    <HanleButton
      @handleEdit="handleSubjectDialogOpen"
      @handleDelete="handleSubjectDelete"
      :semesterList="semesterList"
      @initList="search"
    />
    <el-table
      :data="tableData"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      row-key="id"
      stripe
      style="width: 100%"
    >
      <el-table-column
        reserve-selection
        type="selection"
        align="center"
        width="60"
        style="text-align: center"
        :selectable="checkSelectable"
      ></el-table-column>
      <el-table-column prop="semesterName" label="学期" width="180" />
      <el-table-column prop="name" label="课程名称" width="180" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column prop="createUser" label="教师" width="180" />
      <el-table-column prop="remark" label="说明" />

      <el-table-column fixed="right" label="操作" align="center" width="330">
        <template slot-scope="scope">
          <el-button
            @click="handleKnowsDialogOpen(scope.row.id)"
            type="success"
            size="mini"
            icon="el-icon-s-tools"
            plain
            >查看课程</el-button
          >
          <el-button
            type="success"
            style="margin-left: 5px"
            icon="el-icon-edit"
            size="mini"
            @click="handleSubjectDialogOpen(scope.row.id)"
          ></el-button>
          <el-popconfirm
            title="您确定要删除这条记录吗？"
            @confirm="handleSubjectDelete(scope.row.id)"
          >
            <template #reference>
              <el-button
                size="mini"
                style="margin-left: 5px"
                type="danger"
                icon="el-icon-delete-solid"
              />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :queryParam="queryParam"
      :page.sync="queryParam.pageIndex"
      :limit.sync="queryParam.pageSize"
      @pagination="search"
    />
    <knows-dialog
      :id="id"
      :knowsDialog="knowsDialog"
      @close="handleknowsDialogClose"
    />
    <subject-dialog
      :id="subjectId"
      :semesterList="semesterList"
      :subjectDialog="subjectDialog"
      :subjectDialogTitle="subjectDialogTitle"
      @initSubjectList="search"
      @close="handleSubjectDialogClose"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import eduApi from '@/api/admin'
import HanleButton from './components/hanleButton.vue'
import knowsDialog from './components/knowsDialog.vue'
import SubjectDialog from './components/subjectDialog.vue'
export default {
  components: { knowsDialog, SubjectDialog, HanleButton, Pagination },
  data() {
    return {
      tableData: [],
      knowsDialog: false,
      subjectDialog: false,
      subjectId: -1,
      subjectDialogTitle: '',
      id: null,
      queryParam: {
        pageIndex: 1,
        pageSize: 10
      },
      ids: [],
      total: 0,
      semesterList: []
    }
  },
  created() {
    this.search()
  },
  methods: {
    search(query) {
      if (query != null) {
        this.queryParam = query
      }
      eduApi.subjectPage(this.queryParam).then((resp) => {
        if (resp.code === 200) {
          this.tableData = resp.data.list
          this.total = resp.data.total
        }
      }),
        eduApi.semesterList().then((resp) => {
          this.semesterList = resp.data
        })
    },
    handleSubjectDelete(id) {
      if (id != null) {
        if (this.ids.findIndex((item) => item === id) == -1) {
          this.ids.push(id)
        }
      }
      if (this.ids.length === 0) {
        this.$message.error('请先选择删除课程信息！！')
        return false
      }
      eduApi.removeSubjectByIds(this.ids).then((resp) => {
        if (resp.code == 200) {
          this.$message.success('删除成功')
          this.search()
          this.clearSelection()
        } else {
          this.$message.error(resp.message)
        }
      })
    },
    handleKnowsDialogOpen(id) {
      this.id = id
      this.knowsDialog = true
    },
    handleknowsDialogClose() {
      this.knowsDialog = false
    },
    handleSubjectDialogOpen(id) {
      if (id) {
        this.subjectId = id
        this.subjectDialogTitle = '修改课程信息'
      } else {
        this.subjectId = -1
        this.subjectDialogTitle = '添加课程信息'
      }
      this.subjectDialog = true
    },
    handleSubjectDialogClose() {
      this.subjectId = null
      this.subjectDialog = false
    },
    handleSelectionChange(val) {
      this.ids = val.map((item) => item.id)
    },
    checkSelectable() {
      return true
    },
    clearSelection() {
      this.$refs.multipleTable.clearSelection()
      this.ids = []
    },
  }
}
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>