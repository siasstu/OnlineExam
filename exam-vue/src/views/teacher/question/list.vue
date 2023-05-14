<template>
  <div>
    <el-form :model="queryParam" ref="queryForm" :inline="true">
      <el-form-item label="题干：">
        <el-input v-model="queryParam.id" size="medium" clearable></el-input>
      </el-form-item>
      <el-form-item label="课程：">
        <el-select v-model="queryParam.courseId" size="medium" clearable>
          <el-option
            v-for="item in courseType"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题型：">
        <el-select v-model="queryParam.questionType" size="medium" clearable>
          <el-option
            v-for="item in questionType"
            :key="item.id"
            :value="item.id"
            :label="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" size="medium" style="margin-right: 15px"
          >查询</el-button
        >
        <el-popover placement="bottom" trigger="click">
          <el-button
            type="warning"
            size="mini"
            v-for="item in editUrlEnum"
            :key="item.key"
            @click="$router.push({ path: item.value })"
            >{{ item.name }}
          </el-button>
          <el-button slot="reference" type="primary" size="medium" class="link-left"
            >添加</el-button
          >
        </el-popover>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column prop="id" label="Id" width="70px" />
      <el-table-column
        prop="courseId"
        label="课程名称"
        width="140px"
        :formatter="courseTypeFormatter"
      />
      <el-table-column
        prop="questionType"
        label="题型"
        :formatter="questionTypeFormatter"
        width="70px"
      />
      <el-table-column prop="shortTitle" label="题干" show-overflow-tooltip />
      <el-table-column prop="createUser" label="创建人" width="160px" />
      <el-table-column prop="createTime" label="创建时间" width="160px" />
      <el-table-column label="操作" align="center" width="160px">
        <template slot-scope="{ row }">
          <el-button size="mini" @click="editQuestion(row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteQuestion(row)"
            class="link-left"
            >删除</el-button
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
  </div>
</template>

<script>
import pagination from '@/components/Pagination/index.vue'
import api from '@/api/teacher'
export default {
  components: { pagination },
  data() {
    return {
      tableData: [],
      queryParam: {
        id: null,
        questionType: null,
        courseId: null,
        pageIndex: 1,
        pageSize: 10
      },
      courseType: [],
      total: 0,
      questionType: [
        { id: 1, value: '单选题' },
        { id: 2, value: '多选题' },
        { id: 3, value: '判断题' },
        { id: 4, value: '填空题' },
        { id: 5, value: '简答题' }
      ],
      editUrlEnum: [
        { key: 1, value: '/question/edit/singleChoice', name: '单选题' },
        { key: 2, value: '/question/edit/multipleChoice', name: '多选题' },
        { key: 3, value: '/question/edit/trueFalse', name: '判断题' },
        { key: 4, value: '/question/edit/gapFilling', name: '填空题' },
        { key: 5, value: '/question/edit/shortAnswer', name: '简答题' }
      ]
    }
  },
  created() {
    api.getCourseList().then((resp) => {
      this.courseType = resp.data
    })
    this.search()
  },
  methods: {
    submitForm() {
      this.queryParam.pageIndex = 1
      this.search()
    },
    search() {
      api.questionPage(this.queryParam).then((data) => {
        const resp = data.data
        this.tableData = resp.list
        this.total = resp.total
        this.queryParam.pageIndex = resp.pageNum
      })
    },
    editQuestion(row) {
      let url = this.getUrl(this.editUrlEnum, row.questionType)
      this.$router.push({ path: url, query: { id: row.id } })
    },
    deleteQuestion(row) {
      api.delQuestionById(row.id).then((data) => {
        this.$message.success('删除成功')
        this.search()
      })
    },
    questionTypeFormatter(row) {
      return this.questionTypeQ(this.questionType, row.questionType)
    },
    courseTypeFormatter(row) {
      return this.courseTypeQ(this.courseType, row.courseId)
    },
    questionTypeQ(array, key) {
      for (let item of array) {
        if (item.id === key) {
          return item.value
        }
      }
    },
    courseTypeQ(array, key) {
      for (let item of array) {
        if (item.id === key) {
          return item.name
        }
      }
    },
    getUrl(array, key) {
      for (let item of array) {
        if (item.key === key) {
          return item.value
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>