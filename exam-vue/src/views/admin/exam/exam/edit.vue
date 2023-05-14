<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <!-- <el-form-item label="课程：" prop="courseId">
        <el-select v-model="form.courseId" placeholder="课程" clearable>
          <el-option
            v-for="item in courseType"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="班级：" prop="gradeId">
        <el-select v-model="form.gradeId" placeholder="班级" clearable>
          <el-option
            v-for="item in gradeType"
            :key="item.id"
            :value="item.id"
            :label="item.className"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题：" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="考试时长：" prop="time">
        <el-input v-model="form.time" placeholder="分钟" />
      </el-form-item>
      <el-form-item label="时段限制：" prop="limitDateTime">
        <el-date-picker
          v-model="form.limitDateTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="试卷：" prop="paperId">
        <el-table
          :data="paperItems"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column
            prop="courseId"
            label="课程"
            :formatter="courseFormatter"
            width="120px"
          />
          <el-table-column prop="name" label="试卷名称" />
          <el-table-column prop="createTime" label="创建时间" width="160px" />
          <el-table-column label="操作" align="center" width="160px">
            <template slot-scope="{ row }">
              <el-button
                size="mini"
                type="danger"
                @click="removePaper(row)"
                class="link-left"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button type="success" @click="addPaper">添加试卷</el-button>
        <el-button @click="$router.push('/teacher/exam/list')">取 消</el-button>
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="paperPage.showDialog" width="70%">
      <el-form :model="paperPage.queryParam" :inline="true">
        <el-form-item label="课程：">
          <el-select v-model="paperPage.queryParam.courseId" clearable>
            <el-option
              v-for="item in courseType"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="examPaperSubmitForm"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
      <el-table
        :data="paperPage.tableData"
        @selection-change="handleSelectionChange"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column prop="id" label="Id" width="90px" />
        <el-table-column
          prop="courseId"
          label="课程"
          :formatter="courseFormatter"
          width="120px"
        />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="questionCount" label="题目数量" width="120px" />
        <el-table-column prop="score" label="总分" width="120px" />
        <el-table-column prop="suggestTime" label="建议时长" width="120px" />
        <el-table-column prop="createTime" label="创建时间" width="160px" />
      </el-table>
      <pagination
        v-show="paperPage.total > 0"
        :total="paperPage.total"
        :page.sync="paperPage.queryParam.pageIndex"
        :limit.sync="paperPage.queryParam.pageSize"
        @pagination="search"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="paperPage.showDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmPaperSelect">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import api from '@/api/teacher'

export default {
  components: { Pagination },
  data() {
    return {
      form: {
        id: null,
        gradeId: null,
        title: '',
        paperId: null,
        limitDateTime: [],
        time: null
      },
      paperItems: [],
      courseType: [],
      gradeType: [],
      paperPage: {
        multipleSelection: {},
        showDialog: false,
        queryParam: {
          courseId: null,
          pageIndex: 1,
          pageSize: 5
        },
        tableData: [],
        total: 0
      },
      rules: {
        gradeId: [{ required: true, message: '请选择班级', trigger: 'change' }],
        title: [{ required: true, message: '请输入考试名', trigger: 'blur' }],
        courseId: [
          { required: true, message: '请选择课程', trigger: 'change' }
        ],
        time: [{ required: true, message: '请输入考试时长', trigger: 'blur' }],
        limitDateTime: [
          { required: true, message: '请考试时间', trigger: 'blur' }
        ],
        paperId: [{ required: true, message: '请选择试卷', trigger: 'change' }]
      }
    }
  },
  created() {
    let id = this.$route.query.id
    api.getMyTeachCourseList().then((resp) => (this.courseType = resp.data))
    api.getMyCourseClassList().then((resp) => (this.gradeType = resp.data))
    if (id && parseInt(id) !== 0) {
      api.getReleaseExamById(id).then((re) => {
        this.form = re.data
        this.getPaperById(this.form.paperId)
      })
    }
  },
  methods: {
    addPaper() {
      this.paperPage.showDialog = true
      this.search()
    },
    confirmPaperSelect() {
      this.paperItems = this.paperPage.multipleSelection
      this.form.paperId = this.paperPage.multipleSelection[0].id
      this.paperPage.showDialog = false
    },
    search() {
      this.paperPage.showDialog = true
      api.paperPage(this.paperPage.queryParam).then((resp) => {
        const re = resp.data
        console.log(re)
        this.paperPage.tableData = re.list
        this.paperPage.total = re.total
        this.paperPage.queryParam.pageIndex = re.pageNum
      })
    },
    getPaperById(id) {
      api.getPaperById(id).then((resp) => {
        this.paperItems.push(resp.data)
      })
    },
    handleSelectionChange(val) {
      this.paperPage.multipleSelection = val
    },
    examPaperSubmitForm() {
      this.paperPage.queryParam.pageIndex = 1
      this.search()
    },
    removePaper(row) {
      this.paperItems = []
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          api.releaseExamEdit(this.form).then((resp) => {
            this.$message.success('发布成功')
            this.$router.push('/admin/exam/list')
          })
        }
      })
    },
    courseFormatter(row) {
      return this.courseTypeQ(this.courseType, row.courseId)
    },
    gradeFormatter(row) {
      return this.courseTypeQ(this.gradeType, row.gradeType)
    },
    courseTypeQ(array, key) {
      for (let item of array) {
        if (item.id === key) {
          return item.name
        }
      }
    }
  }
}
</script>
