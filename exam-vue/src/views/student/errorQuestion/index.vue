<template>
  <div style="padding-top: 15px; width: 80%; margin: 0 auto">
    <el-row>
      <el-col :span="16" style="padding: 0 20px 0 0">
        <el-table
          :data="tableData"
          fit
          highlight-current-row
          style="width: 100%"
          @row-click="itemSelect"
        >
          <el-table-column
            prop="questionVM.titleContent"
            label="题干"
            show-overflow-tooltip
          />
          <el-table-column prop="questionType" label="题型" :formatter="questionTypeFormatter" width="70" />
          <el-table-column prop="courseId" label="学科"  :formatter="courseTypeFormatter" width="120" />
          <el-table-column prop="createTime" label="做题时间" width="170" />
        </el-table>
        <pagination
          v-show="total > 0"
          :total="total"
          :background="false"
          :queryParam="queryParam"
          :page.sync="queryParam.pageIndex"
          :limit.sync="queryParam.pageSize"
          @pagination="search"
          style="margin-top: 20px"
        />
      </el-col>
      <el-col :span="8" style="padding: 0 0 0 20px">
        <el-card>
          <el-empty
            v-if="selectItem.questionVM.titleContent==null"
            description="暂无数据"
          ></el-empty>
          <div v-else>
            <p style="font-size: 20px; margin: 10px 0">
              题目：{{ selectItem.questionVM.titleContent }}
            </p>

            <div
              v-if="
                selectItem.questionType === 1 || selectItem.questionType === 3
              "
            >
              <el-radio-group v-model="selectItem.answer">
                <el-radio
                  v-for="(item, index) in selectItem.questionVM
                    .questionEditItemVMS"
                  :key="index"
                  :label="item.prefix"
                  >{{ item.prefix }}.{{ item.content }}
                </el-radio>
              </el-radio-group>
            </div>

            <div v-if="selectItem.questionType === 2">
              <el-checkbox-group v-model="selectItem.answerList">
                <el-checkbox
                  v-for="(item, index) in selectItem.questionVM
                    .questionEditItemVMS"
                  :key="index"
                  :label="item.prefix"
                  >{{ item.prefix }}.{{ item.content }}
                </el-checkbox>
              </el-checkbox-group>
            </div>

            <div v-if="selectItem.questionType === 4">
              <el-input v-model="selectItem.answer" />
            </div>
            <div v-if="selectItem.questionType === 5">
              <el-input v-model="selectItem.answer" />
            </div>

            <div style="margin-top: 10px">
              <p>正确答案：{{ selectItem.correct }}</p>
              <p>
                结果：
                <el-button type="danger" size="mini">错误</el-button>
              </p>
              <p>得分：{{ selectItem.score }}</p>
              <p>题分：{{ selectItem.questionScore }}</p>
            </div>
          </div>
          <div
            style="
              background-color: #8cbda4;
              border-radius: 10px;
              color: #fff;
              width: 100px;
              height: 30px;
              text-align: center;
              line-height: 32px;
              font-size: 20px;
              position: absolute;
              right: -15px;
              top: 0px;
            "
          >
            答题详情
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from '@/api/student'
import teacherApi from '@/api/teacher'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      queryParam: {
        pageIndex: 1,
        pageSize: 10,
        courseId: null
      },
      tableData: [],
      total: 0,
      selectItem: {},
      questionType: [
        { id: 1, name: '单选题' },
        { id: 2, name: '多选题' },
        { id: 3, name: '判断题' },
        { id: 4, name: '填空题' },
        { id: 5, name: '简答题' }
      ],
      courseList:[]
    }
  },
  created() {
    teacherApi.getCourseList().then(resp => {
      this.courseList = resp.data
    })
    this.search()
  },
  methods: {
    search() {
      api.getErrorQuestion(this.queryParam).then((resp) => {
        this.tableData = resp.data.list
        this.total = resp.data.total
        if (resp.data.total > 0) {
          this.selectItem = resp.data.list[0]
        } else {
          this.selectItem = { questionVM: { titleContent: null } }
        }
      })
    },
    itemSelect(row, column, event) {
      this.selectItem = row
    },
    questionTypeFormatter(row) {
      return this.questionTypeQ(this.questionType, row.questionType)
    },
    courseTypeFormatter(row) {
      return this.questionTypeQ(this.courseList, row.courseId)
    },
    questionTypeQ(array, key) {
      for (let item of array) {
        if (item.id === key) {
          return item.name
        }
      }
    },
  }
}
</script>