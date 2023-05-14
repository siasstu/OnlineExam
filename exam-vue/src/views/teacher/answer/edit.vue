<template>
  <div style="overflow: hidden;">
    <el-row style="display: flex">
      <el-card style="height: 200px; width: 500px; padding: 10px 0">
        <p>
          <span>试卷名称：{{ tableData.examName }}</span>
        </p>
        <p style="margin: 15px 0">
          <span>所属课程：{{ tableData.courseName }}</span>
        </p>
        <p style="margin: 15px 0">
          <span>考试时间：{{ tableData.limitTime }}</span>
        </p>
        <p style="margin: 15px 0">
          <span>考试时长：{{ tableData.time }}(分钟)</span>
        </p>
        <p>
          <span>试卷总分：{{ tableData.paperCount }}</span>
        </p>
      </el-card>
      <el-card
        style="height: 200px; width: 100%; margin-left: 50px; padding: 10px 0"
      >
        <div style="display: flex;position: absolute;width: 100%;" >
          <div style="width:150px; height: 200px">
            <p>
              <span>考试班级：{{ tableData.gradeName }}</span>
            </p>
            <p style="margin: 15px 0">
              <span>题目总数：{{ tableData.questionCount }}</span>
            </p>
            <p style="margin: 15px 0">
              <span>应考试人数：{{ tableData.examCount }}</span>
            </p>
            <p style="margin: 15px 0">
              <span>以考试人数：{{ tableData.finishedCount }}</span>
            </p>
            <p>
              <span>待批改人数：{{ tableData.correctCount }}</span>
            </p>
          </div>
          <div id="echarts-pie" style=" width: 65%; height: 190px;position: relative;"></div>
        </div>
      </el-card>
    </el-row>
    <el-row style="margin-top: 10px">
      <el-form :model="queryParam" ref="queryForm" :inline="true">
        <el-form-item label="考试状态：">
          <el-select v-model="queryParam.status" clearable>
            <el-option
              v-for="item in statusType"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学号：">
          <el-input v-model="queryParam.idcard" placeholder="学号" clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">查询</el-button>
        </el-form-item>
      </el-form>
      <el-scrollbar style="height: calc(100vh - 400px)">
        <el-table
          :data="tableData.list"
          border
          fit
          highlight-current-row
        >
          <el-table-column v-if="false" prop="id" label="Id" width="100" />
          <el-table-column label="Id" width="50">
            <template scope="scope">
              {{
                (queryParam.pageIndex - 1) * queryParam.pageSize +
                (scope.$index + 1)
              }}
            </template>
          </el-table-column>
          <el-table-column prop="idcard" label="学号" width="140px"/>
          <el-table-column prop="realName" label="真实姓名" />
          <el-table-column prop="doTime" label="用时" width="130px" />
          <el-table-column
            prop="questionCorrect"
            label="答对数量"
            width="100px"
          />
          <el-table-column prop="userScore" label="得分" width="100px" />
          <el-table-column prop="status" label="状态" width="100px" />
          <el-table-column
            prop="createTime"
            label="提交时间"
            align="center"
            width="170px"
          />
          <el-table-column label="操作" align="center" width="160px">
            <template slot-scope="{ row }">
              <router-link
                target="_blank"
                :to="{
                  path: '/answer/correct',
                  query: {
                    id: row.id,
                    status: row.status,
                    gradeId: queryParam.gradeId,
                    examGradeId: queryParam.examGradeId
                  }
                }"
              >
                <el-button v-if="row.status == '待批改'"> 去批改 </el-button>
                <el-button v-if="row.status == '完成'"> 查看详情 </el-button>
              </router-link>
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
    </el-row>
  </div>
</template>

<script >
import Pagination from '@/components/Pagination'
import api from '@/api/teacher'
import * as echarts from 'echarts'

export default {
  components: { Pagination },
  data() {
    return {
      queryParam: {
        id: null,
        pageIndex: 1,
        pageSize: 5,
        status: null
      },
      tableData: [],
      total: 0,
      statusType: [
        { id: 1, name: '待批改' },
        { id: 2, name: '以批改' },
        { id: 3, name: '未参与' }
      ],
      myChart: null
    }
  },
  created() {
    this.queryParam.gradeId = this.$route.query.gradeId
    this.queryParam.examGradeId = this.$route.query.examGradeId
    this.search()
  },
  methods: {
    search() {
      api.selectStudentPageAnswers(this.queryParam).then((re) => {
        this.tableData = re.data
        this.total = re.data.total
        this.myChart.setOption(
          this.option(
            re.data.errorCountList,
            re.data.errorQuestionIdList
          )
        )
      })
    },
    submitForm() {
      this.queryParam.pageIndex = 1
      this.search()
    },
    option(label, data) {
      return {
        title: {
          text: '错题分布折线图',
          x: 'center',
          y: 'top',
          textAlign: 'center'
        },
        grid: {
          x: 50,
          y: 5,
          x2: 30,
          y2: 50
        },
        tooltip: {},
        xAxis: {
          data: data
        },
        yAxis: {
          data: ['0', '2', '4', '6', '8', '10']
        },
        series: [
          {
            name: '题目/答错人数',
            type: 'line',
            data: label
          }
        ]
      }
    }
    // return {
    //   tooltip: {
    //     trigger: 'item'
    //   },
    //   series: [
    //     {
    //       type: 'pie',
    //       radius: '50%',
    //       data: [
    //         { name: '28', value: 66 },
    //         { name: '29', value: 50 },
    //         { name: '30', value: 30},
    //         { name: '38', value: 80 },
    //         { name: '40', value: 100 },
    //         { name: '50', value: 40 },
    //         { name: '60', value: 108 },
    //       ]
    //     }
    //   ]
    // }
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById('echarts-pie'))
  }
}
</script>
