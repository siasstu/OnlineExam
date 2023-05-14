<template>
  <el-scrollbar
    style="
      height: calc(100vh - 120px);
      width: 100%;
      background-color: #fff;
      padding-top: 20px;
    "
  >
    <el-form :model="form" ref="form" :rules="rulers" label-width="100px">
      <el-form-item label="课程：" prop="courseId">
        <el-select v-model="form.courseId" clearable>
          <el-option
            v-for="item in courseType"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="试卷名称：" prop="name">
        <el-input v-model="form.name" style="width: 99%" />
      </el-form-item>
      <el-form-item
        :key="index"
        :label="'标题' + (index + 1) + '：'"
        v-for="(titleItem, index) in form.titleItems"
        prop="titleItems.name"
      >
        <el-select v-model="titleItem.name" clearable>
          <el-option
            v-for="item in questionType"
            :key="item.id"
            :value="item.name"
            :label="item.name"
          >
          </el-option>
        </el-select>
        每题分数：
        <el-select v-model="titleItem.score" prop="score" clearable>
          <el-option
            v-for="index of 10"
            :key="index"
            :value="index"
            :label="index"
          >
          </el-option>
        </el-select>

        <el-button
          type="text"
          class="link-left"
          style="margin-left: 20px"
          size="mini"
          @click="addQuestion(titleItem)"
        >
          添加题目
        </el-button>
        <el-button
          type="text"
          class="link-left"
          size="mini"
          @click="form.titleItems.splice(index, 1)"
          >删除</el-button
        >
        <el-card
          class="exampaper-item-box"
          v-if="titleItem.questionItems.length !== 0"
          style="width: 99%"
        >
          <el-form-item
            :key="questionIndex"
            :label="'题目' + (questionIndex + 1) + '：'"
            v-for="(questionItem, questionIndex) in titleItem.questionItems"
            style="margin-bottom: 15px"
          >
            <el-row>
              <el-col :span="23">
                <h3 style="margin-right: 10px">{{ questionItem.title }}</h3>
                <span
                  style="padding: 0 15px 0 5px"
                  v-for="(item, index) in questionItem.items"
                  :key="index"
                >
                  <span style="font-weight: 600"> {{ item.prefix }} </span> ：
                  {{ item.content }}
                </span>
              </el-col>
              <el-col :span="1">
                <el-button
                  type="text"
                  size="mini"
                  @click="titleItem.questionItems.splice(questionIndex, 1)"
                  >删除
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-card>
      </el-form-item>
      <el-form-item label="建议时长：" prop="suggestTime">
        <el-input
          v-model="form.suggestTime"
          placeholder="分钟"
          style="width: 99%"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button type="success" @click="addTitle">添加标题</el-button>
        <el-button @click="$router.push('/teacher/paper')">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="questionPage.showDialog" width="70%">
      <el-form :model="questionPage.queryParam" :inline="true">
        <el-form-item label="ID：">
          <el-input v-model="questionPage.queryParam.id" clearable></el-input>
        </el-form-item>
        <el-form-item label="题型：">
          <el-select v-model="questionPage.queryParam.questionType" clearable>
            <el-option
              v-for="item in questionType"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryForm">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="tableData"
        @selection-change="handleSelectionChange"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column prop="id" label="Id" width="60px" />
        <el-table-column prop="questionType" label="题型" width="70px">
          <template slot-scope="scope">
            <span v-if="scope.row.questionType == 1">单选题</span>
            <span v-if="scope.row.questionType == 2">多选题</span>
            <span v-if="scope.row.questionType == 3">判断题</span>
            <span v-if="scope.row.questionType == 4">填空题</span>
            <span v-if="scope.row.questionType == 5">简答题</span>
          </template>
        </el-table-column>
        <el-table-column prop="shortTitle" label="题干" show-overflow-tooltip />
      </el-table>
      <pagination
        v-show="questionPage.total > 0"
        :total="questionPage.total"
        :page.sync="questionPage.queryParam.pageIndex"
        :limit.sync="questionPage.queryParam.pageSize"
        @pagination="search"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="questionPage.showDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmQuestionSelect"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </el-scrollbar>
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
        courseId: null,
        limitDateTime: [],
        name: '',
        suggestTime: null,
        titleItems: []
      },
      questionType: [
        { id: 1, name: '单选题' },
        { id: 2, name: '多选题' },
        { id: 3, name: '判断题' },
        { id: 4, name: '填空题' },
        { id: 5, name: '简答题' }
      ],
      courseType: [],
      questionPage: {
        multipleSelection: [],
        queryParam: {
          id: null,
          courseId: 1,
          questionType: null,
          pageIndex: 1,
          pageSize: 5
        },
        total: 0,
        showDialog: false
      },
      tableData: [],
      currentTitleItem: null,
      rulers: {
        courseId: [
          { required: true, message: '请选择课程', trigger: 'change' }
        ],
        suggestTime: [
          { required: true, message: '请输入建议时长', trigger: 'blur' }
        ],
        name: [{ required: true, message: '请输入试卷名称', trigger: 'blur' }]
      }
    }
  },
  created() {
    let id = this.$route.query.id
    api.getMyTeachCourseList().then((resp) => (this.courseType = resp.data))
    if (id && parseInt(id) !== 0) {
      api.getPaperById(id).then((resp) => {
        this.form = resp.data
      })
    }
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          api.paperEdit(this.form).then((re) => {
            if (re.code === 200) {
              this.$message.success('添加成功')
              this.$router.push('/admin/paper')
            }
          })
        }
      })
    },
    addTitle() {
      this.form.titleItems.push({
        name: '',
        questionItems: []
      })
    },
    addQuestion(titleItem) {
      this.currentTitleItem = titleItem
      this.questionPage.showDialog = true
      this.search()
    },
    removeTitleItem(titleItem) {
      this.form.titleItems.remove(titleItem)
    },
    removeQuestion(titleItem, questionItem) {
      titleItem.questionItems.remove(questionItem)
    },
    queryForm() {
      this.questionPage.queryParam.pageIndex = 1
      this.search()
    },
    confirmQuestionSelect() {
      this.questionPage.multipleSelection.forEach((q) => {
        api.getQuestionById(q.id).then((re) => {
          this.currentTitleItem.questionItems.push(re.data)
        })
      })
      this.questionPage.showDialog = false
    },
    search() {
      this.questionPage.queryParam.courseId = this.form.courseId
      api.questionPage(this.questionPage.queryParam).then((data) => {
        const re = data.data
        this.tableData = re.list
        this.questionPage.total = re.total
        this.questionPage.queryParam.pageIndex = re.pageNum
      })
    },
    handleSelectionChange(val) {
      this.questionPage.multipleSelection = val
    }
  }
}
</script>
