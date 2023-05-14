<template>
  <div>
    <handle-button @handleEdit="handleDialogOpen" />
    <el-table
      :data="tableData"
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
      />
      <el-table-column prop="className" label="班级名称" width="230" />
      <el-table-column prop="subjectName" label="所属课程" width="150" />
      <el-table-column
        prop="classCount"
        align="center"
        label="班级人数"
        width="180"
      />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column prop="remark" label="简介" />
      <el-table-column fixed="right" label="操作" align="center" width="330">
        <template slot-scope="scope">
          <el-button
            @click="handleStuDialogOpen(scope.row.id)"
            type="success"
            size="mini"
            icon="el-icon-s-tools"
            plain
            >查看班级</el-button
          >
          <el-button
            type="success"
            style="margin-left: 5px"
            icon="el-icon-edit"
            size="mini"
            @click="handleDialogOpen(scope.row.id)"
          ></el-button>
          <el-popconfirm
            title="您确定要删除这条记录吗？"
            @confirm="handleDelete(scope.row.id)"
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
    <class-dialog
      :id="id"
      :subjectList="subjectList"
      :dialogTitle="dialogTitle"
      :showClassDialog="showClassDialog"
      @initClassList="search"
      @close="handleDialogClose"
    />
    <stu-dialog
      :showStuDialog="showStuDialog"
      :id="id"
      @close="handleStuDialogClose"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import api from '@/api/teacher'
import HandleButton from './components/handleButton.vue'
import ClassDialog from './components/classDialog.vue'
import stuDialog from './components/stuDialog.vue'
export default {
  components: { Pagination, HandleButton, ClassDialog, stuDialog },
  data() {
    return {
      tableData: [],
      queryParam: {
        pageIndex: 1,
        pageSize: 10
      },
      ids: [],
      total: 0,
      showClassDialog: false,
      dialogTitle: '',
      showStuDialog: false,
      id: null,
      subjectList:[]
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
      api.getMyTeachCourseClass(this.queryParam).then((resp) => {
        if (resp.code === 200) {
          this.tableData = resp.data.list
          this.total = resp.data.total
        }
      })
      api.getMyTeachCourseList().then(resp => {
        this.subjectList = resp.data
      })
    },
    handleDelete(id) {
      if (id != null) {
        if (this.ids.findIndex((item) => item === id) == -1) {
          this.ids.push(id)
        }
      }
      if (this.ids.length === 0) {
        this.$message.error('请先选择删除班级信息！！')
        return false
      }
      eduApi.removeSubjectByIds(this.ids).then((resp) => {
        if (resp.code == 200) {
          this.$message.success('删除成功')
          this.search()
          this.ids = []
        } else {
          this.$message.error(resp.message)
        }
      })
    },
    handleStuDialogOpen(id) {
      this.id = id
      this.showStuDialog = true
    },
    handleDialogOpen(id) {
      if (id) {
        this.id = id
        this.dialogTitle = '修改班级信息'
      } else {
        this.id = -1
        this.dialogTitle = '添加班级信息'
      }
      this.showClassDialog = true
    },
    handleDialogClose() {
      this.id = null
      this.showClassDialog = false
    },
    handleStuDialogClose() {
      this.search(null)
      this.showStuDialog = false
    },
    handleSelectionChange(val) {
      this.ids = val.map((item) => item.id)
    },
    checkSelectable() {
      return true
    }
  }
}
</script>