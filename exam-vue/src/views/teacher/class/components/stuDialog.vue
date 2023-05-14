<template>
  <div>
    <el-dialog
      top="10vh"
      title="班级学生详情"
      center
      :visible.sync="showStuDialog"
      :before-close="handleDialogClose"
    >
      <el-form :model="queryParam" ref="queryForm" :inline="true">
        <el-form-item label="姓名：">
          <el-input placeholder="姓名" v-model="queryParam.realName" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="学号：">
          <el-input placeholder="学号" v-model="queryParam.username" clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search(null)">查询</el-button>
          <el-button type="primary" @click="addStudentForm">添加学生</el-button>
          <el-button type="primary" @click="addStudentWithClass"
            >按班级导入</el-button
          >
        </el-form-item>
      </el-form>
      <el-scrollbar style="height: calc(100vh - 405px)">
        <el-table
          :data="tableData"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column label="Id" width="40">
            <template scope="scope">
              {{
                (queryParam.pageIndex - 1) * queryParam.pageSize +
                (scope.$index + 1)
              }}
            </template>
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
            align="center"
            width="140"
          />
          <el-table-column
            prop="realName"
            label="真实姓名"
            align="center"
            width="130"
          />
          <el-table-column
            prop="phoneNumber"
            label="手机号"
            align="center"
            width="120"
          />
          <el-table-column prop="email" label="邮箱" />
          <el-table-column label="操作" align="center" width="160px">
            <template slot-scope="{ row }">
              <el-button
                size="mini"
                type="danger"
                class="link-left"
                @click="removeStudent(row.username)"
                >移出</el-button
              >
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
      </el-scrollbar>
    </el-dialog>

    <el-dialog
      :visible.sync="studentPage.showDialog"
      title="添加学生"
      top="3vh"
      width="60%"
    >
      <el-form :model="studentPage.queryParam" :inline="true">
        <el-form-item label="学号：">
          <el-input v-model="studentPage.queryParam.username"></el-input>
        </el-form-item>

        <el-form-item label="姓名：">
          <el-input v-model="studentPage.queryParam.realName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="studentSearch(null)"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
      <el-table
        :data="studentPage.tableData"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column label="Id" width="50">
          <template scope="scope">
            {{
              (studentPage.queryParam.pageIndex - 1) *
                studentPage.queryParam.pageSize +
              (scope.$index + 1)
            }}
          </template>
        </el-table-column>
        <el-table-column prop="username" label="学号" width="130" />
        <el-table-column prop="realName" label="真实姓名" width="130" />
        <el-table-column prop="phoneNumber" label="手机号" width="130" />
        <el-table-column prop="phoneNumber" label="邮箱" width="130" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" align="center" width="160px">
          <template slot-scope="{ row }">
            <el-button
              size="mini"
              type="success"
              @click="addStudents(row.username)"
              class="link-left"
              >添加</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="studentPage.total > 0"
        :total="studentPage.total"
        :queryParam="studentPage.queryParam"
        :page.sync="studentPage.queryParam.pageIndex"
        :limit.sync="studentPage.queryParam.pageSize"
        @pagination="studentSearch"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="studentPage.showDialog = false">取 消</el-button>
        <el-button type="primary" @click="studentPage.showDialog = false"
          >确定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog :visible.sync="showClassDialog" title="选择班级" width="30%">
      <el-form :model="form" label-width="100px">
        <el-checkbox-group v-model="form.classList">
          <el-checkbox
            v-for="item in classList"
            :key="item.id"
            :label="item.id"
            name="checkedRoles"
            >{{ item.className }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="handleConfirm">确认</el-button>
          <el-button @click="handleClose">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/admin'
import teachApi from '@/api/teacher'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      queryParam: {
        pageIndex: 1,
        pageSize: 10
      },
      showClassDialog: false,
      tableData: [],
      total: 0,
      studentPage: {
        tableData: [],
        queryParam: {
          roleId: 22,
          pageIndex: 1,
          pageSize: 10
        },
        total: 0,
        showDialog: false
      },
      classList: [],
      form: {
        classList: []
      }
    }
  },
  props: ['id', 'showStuDialog'],
  watch: {
    id: {
      handler(newVal, oldVal) {
        this.search()
      }
    }
  },
  methods: {
    search(query) {
      if (query != null) {
        this.queryParam = query
      }
      this.queryParam.classId = this.id
      teachApi.getMyTeachCourseClassStudents(this.queryParam).then((resp) => {
        this.tableData = resp.data.list
        this.total = resp.data.total
      })
    },
    removeStudent(username) {
      teachApi.removeStudentFromClass(username, this.id).then((resp) => {
        this.search()
        this.$message.success('操作成功')
      })
    },
    addStudents(username) {
      teachApi.addStudentToClass(username, this.id).then((resp) => {
        this.search()
        this.$message.success('操作成功')
      })
    },
    handleDialogClose() {
      this.$emit('close')
    },

    addStudentForm() {
      this.studentSearch()
      this.studentPage.showDialog = true
    },
    studentSearch(query) {
      if (query != null) {
        this.studentPage.queryParam = query
      }
      api.getStudentsByRole(this.studentPage.queryParam).then((resp) => {
        this.studentPage.tableData = resp.data.list
        this.studentPage.total = resp.data.total
      })
    },
    addStudentWithClass() {
      teachApi.getClassList().then((resp) => {
        this.classList = resp.data
      })
      this.showClassDialog = true
    },
    handleConfirm() {
      teachApi
        .addStudentWithClass(this.form.classList, this.id)
        .then((resp) => {
          this.form.classList = []
          this.search()
          this.showClassDialog = false
          this.$message.success('导入成功')
        })
    },
    handleClose() {
      this.showClassDialog = false
    }
  }
}
</script>